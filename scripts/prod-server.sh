#!/usr/bin/env bash
set -euo pipefail

# ==============================================================
# DSA 生产环境服务管理脚本
# ==============================================================
# 与 dev-server.sh 的关键差异：
#   1. 使用独立端口（8080），与开发端口（8000）区分
#   2. 直接启动 uvicorn（多 workers），不经过 main.py 的 daemon 线程
#   3. 不使用 Vite 开发服务器，前端以静态文件方式提供服务
#   4. 无 --reload 热重载
#   5. 启动时自动构建前端（如果静态文件不存在或显式指定 --build）
# ==============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

PID_FILE="/tmp/dsa-prod.pid"
LOG_FILE="/tmp/dsa-prod.log"

# 生产端口，与开发端口 8000 区分
PORT_PRODUCTION=8080

# uvicorn workers（建议设为 CPU 核数 × 2 + 1）
UVICORN_WORKERS=4

build_frontend() {
  log "构建前端..."
  cd "$ROOT_DIR/apps/dsa-web"
  npm ci
  npm run build
  log "前端构建完成 → $ROOT_DIR/static/"
}

check_frontend() {
  if [[ ! -f "${ROOT_DIR:-}/static/index.html" ]]; then
    warn "静态文件未构建（未找到 ${ROOT_DIR:-}/static/index.html）"
    return 1
  fi
  return 0
}

log()  { echo -e "\033[1;34m[prod]\033[0m $1"; }
warn() { echo -e "\033[1;33m[prod]\033[0m $1" >&2; }
err()  { echo -e "\033[1;31m[prod]\033[0m $1" >&2; }

check_port() {
  local port=$1 name=$2
  if lsof -i :"$port" >/dev/null 2>&1; then
    warn "$name ($port) 端口已被占用"
  fi
}

pid_alive() {
  local pid_file=$1
  [[ -f "$pid_file" ]] || return 1
  local pid
  pid="$(cat "$pid_file")"
  kill -0 "$pid" 2>/dev/null
}

start_server() {
  if pid_alive "$PID_FILE"; then
    log "服务已在运行 (PID $(cat "$PID_FILE"))"
    return 0
  fi
  check_port "$PORT_PRODUCTION" "后端"

  # 检查静态文件，缺失则自动构建
  if ! check_frontend; then
    build_frontend
  fi

  log "启动生产服务 (port $PORT_PRODUCTION, workers $UVICORN_WORKERS)..."
  cd "$ROOT_DIR"

  # 生产环境取消 reload，并设置独立端口
  export WEBUI_PORT=$PORT_PRODUCTION
  export API_PORT=$PORT_PRODUCTION
  export ENV=production

  nohup uv run python -m uvicorn \
    --app-dir "$ROOT_DIR" \
    --host 0.0.0.0 \
    --port "$PORT_PRODUCTION" \
    --workers "$UVICORN_WORKERS" \
    --log-level info \
    --no-use-colors \
    "api.app:app" \
    > "$LOG_FILE" 2>&1 &

  echo $! > "$PID_FILE"
  sleep 3
  if pid_alive "$PID_FILE"; then
    log "服务已启动 (PID $(cat "$PID_FILE")) — http://localhost:$PORT_PRODUCTION"
  else
    err "服务启动失败，请检查日志: $LOG_FILE"
    tail -10 "$LOG_FILE"
    return 1
  fi
}

stop_server() {
  local pid=""
  if pid_alive "$PID_FILE"; then
    pid="$(cat "$PID_FILE")"
    log "停止服务 (PID $pid)..."
    # 先发 SIGTERM 等待优雅退出，超时后 SIGKILL
    kill "$pid" 2>/dev/null || true
    for i in $(seq 1 10); do
      if ! kill -0 "$pid" 2>/dev/null; then
        break
      fi
      sleep 1
    done
    if kill -0 "$pid" 2>/dev/null; then
      warn "服务未在 10s 内优雅退出，强制终止..."
      kill -9 "$pid" 2>/dev/null || true
    fi
  fi
  # 清理端口残留（包括 uvicorn 子进程）
  local port_pids
  port_pids="$(lsof -ti :"$PORT_PRODUCTION" 2>/dev/null)" || true
  if [[ -n "$port_pids" ]]; then
    echo "$port_pids" | xargs kill 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
  log "服务已停止"
}

cmd_start() {
  log "启动生产服务..."
  start_server
}

cmd_stop() {
  log "停止生产服务..."
  stop_server
}

cmd_restart() {
  cmd_stop
  sleep 2
  cmd_start
}

cmd_status() {
  local alive=false
  echo ""
  if pid_alive "$PID_FILE"; then
    echo -e "  生产服务  \033[1;32m● 运行中\033[0m  (PID $(cat "$PID_FILE"))  http://localhost:$PORT_PRODUCTION"
    alive=true
  else
    echo -e "  生产服务  \033[1;31m○ 已停止\033[0m"
  fi
  echo ""
  if $alive; then
    echo -e "  状态: \033[1;32m● 运行中\033[0m"
    # 健康检查
    if command -v curl &>/dev/null; then
      local health
      health="$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT_PRODUCTION/api/health" 2>/dev/null || true)"
      if [[ "$health" == "200" ]]; then
        echo -e "  健康: \033[1;32m通过\033[0m (HTTP $health)"
      else
        echo -e "  健康: \033[1;31m异常\033[0m (HTTP ${health:-N/A})"
      fi
    fi
  else
    echo -e "  状态: \033[1;90m已停止\033[0m"
  fi
  echo ""
}

cmd_build() {
  build_frontend
}

# --- 入口 ---
case "${1:-}" in
  start)   cmd_start ;;
  stop)    cmd_stop ;;
  restart) cmd_restart ;;
  status)  cmd_status ;;
  build)   cmd_build ;;
  *)
    echo "DSA 生产服务管理脚本"
    echo ""
    echo "用法: $0 {start|stop|restart|status|build}"
    echo ""
    echo "   start   启动生产后端服务（前端缺失时自动构建）"
    echo "   stop    停止生产后端服务"
    echo "   restart 重启生产后端服务"
    echo "   status  查看运行状态（含健康检查）"
    echo "   build   仅构建前端（不启动服务）"
    echo ""
    echo "端口: $PORT_PRODUCTION （与开发端口 8000 隔离）"
    echo "workers: $UVICORN_WORKERS"
    exit 1
    ;;
esac
