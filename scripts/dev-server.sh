#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

BACKEND_PID_FILE="/tmp/dsa-backend.pid"
FRONTEND_PID_FILE="/tmp/dsa-frontend.pid"
BACKEND_LOG="/tmp/dsa-backend.log"
FRONTEND_LOG="/tmp/dsa-frontend.log"

PORT_BACKEND=12222
PORT_FRONTEND=5173

log()  { echo -e "\033[1;32m[dev]\033[0m $1"; }
warn() { echo -e "\033[1;33m[dev]\033[0m $1" >&2; }
err()  { echo -e "\033[1;31m[dev]\033[0m $1" >&2; }

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

start_backend() {
  if pid_alive "$BACKEND_PID_FILE"; then
    log "后端已在运行 (PID $(cat "$BACKEND_PID_FILE"))"
    return 0
  fi
  check_port "$PORT_BACKEND" "后端"
  log "启动后端 (port $PORT_BACKEND)..."
  cd "$ROOT_DIR"
  nohup uv run python main.py --serve-only --port "$PORT_BACKEND" > "$BACKEND_LOG" 2>&1 &
  echo $! > "$BACKEND_PID_FILE"
  sleep 3
  if pid_alive "$BACKEND_PID_FILE"; then
    log "后端已启动 (PID $(cat "$BACKEND_PID_FILE"))"
  else
    err "后端启动失败，请检查日志: $BACKEND_LOG"
    tail -10 "$BACKEND_LOG"
    return 1
  fi
}

start_frontend() {
  if pid_alive "$FRONTEND_PID_FILE"; then
    log "前端已在运行 (PID $(cat "$FRONTEND_PID_FILE"))"
    return 0
  fi
  check_port "$PORT_FRONTEND" "前端"
  log "启动前端 (port $PORT_FRONTEND)..."
  cd "$ROOT_DIR/apps/dsa-web"
  nohup ./node_modules/.bin/vite --host 0.0.0.0 > "$FRONTEND_LOG" 2>&1 &
  echo $! > "$FRONTEND_PID_FILE"
  sleep 3
  if pid_alive "$FRONTEND_PID_FILE"; then
    log "前端已启动 (PID $(cat "$FRONTEND_PID_FILE"))"
  else
    err "前端启动失败，请检查日志: $FRONTEND_LOG"
    tail -10 "$FRONTEND_LOG"
    return 1
  fi
}

stop_backend() {
  local pid=""
  if pid_alive "$BACKEND_PID_FILE"; then
    pid="$(cat "$BACKEND_PID_FILE")"
    log "停止后端 (PID $pid)..."
    kill "$pid" 2>/dev/null || true
  fi
  # 清理端口上残留的进程（即使无 PID 文件）
  local port_pids
  port_pids="$(lsof -ti :"$PORT_BACKEND" 2>/dev/null)" || true
  if [[ -n "$port_pids" ]]; then
    echo "$port_pids" | xargs kill 2>/dev/null || true
  fi
  rm -f "$BACKEND_PID_FILE"
  log "后端已停止"
}

stop_frontend() {
  local pid=""
  if pid_alive "$FRONTEND_PID_FILE"; then
    pid="$(cat "$FRONTEND_PID_FILE")"
    log "停止前端 (PID $pid)..."
    kill "$pid" 2>/dev/null || true
  fi
  local port_pids
  port_pids="$(lsof -ti :"$PORT_FRONTEND" 2>/dev/null)" || true
  if [[ -n "$port_pids" ]]; then
    echo "$port_pids" | xargs kill 2>/dev/null || true
  fi
  rm -f "$FRONTEND_PID_FILE"
  log "前端已停止"
}

cmd_start() {
  log "启动开发服务..."
  start_backend
  start_frontend
  log "后端: http://localhost:$PORT_BACKEND"
  log "前端: http://localhost:$PORT_FRONTEND"
  log "API 文档: http://localhost:$PORT_BACKEND/docs"
}

cmd_stop() {
  log "停止开发服务..."
  stop_frontend
  stop_backend
  log "已全部停止"
}

cmd_restart() {
  cmd_stop
  sleep 1
  cmd_start
}

cmd_status() {
  local backend_alive=false frontend_alive=false

  echo ""
  if pid_alive "$BACKEND_PID_FILE"; then
    echo -e "  后端  \033[1;32m● 运行中\033[0m  (PID $(cat "$BACKEND_PID_FILE"))  http://localhost:$PORT_BACKEND"
    backend_alive=true
  else
    echo -e "  后端  \033[1;31m○ 已停止\033[0m"
  fi

  if pid_alive "$FRONTEND_PID_FILE"; then
    echo -e "  前端  \033[1;32m● 运行中\033[0m  (PID $(cat "$FRONTEND_PID_FILE"))  http://localhost:$PORT_FRONTEND"
    frontend_alive=true
  else
    echo -e "  前端  \033[1;31m○ 已停止\033[0m"
  fi

  echo ""
  if $backend_alive && $frontend_alive; then
    echo -e "  状态: \033[1;32m全部运行中\033[0m"
  elif $backend_alive || $frontend_alive; then
    echo -e "  状态: \033[1;33m部分运行\033[0m"
  else
    echo -e "  状态: \033[1;90m已停止\033[0m"
  fi
  echo ""
}

# --- 入口 ---
case "${1:-}" in
  start)   cmd_start ;;
  stop)    cmd_stop ;;
  restart) cmd_restart ;;
  status)  cmd_status ;;
  *)
    echo "DSA 开发服务管理脚本"
    echo ""
    echo "用法: $0 {start|stop|restart|status}"
    echo ""
    echo "   start   启动后端 + 前端开发服务器"
    echo "   stop    停止后端 + 前端"
    echo "   restart 重启全部服务"
    echo "   status  查看运行状态"
    exit 1
    ;;
esac
