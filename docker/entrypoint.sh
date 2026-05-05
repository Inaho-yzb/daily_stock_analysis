#!/usr/bin/env bash
set -euo pipefail

echo "[entrypoint] 编译前端..."
cd /app/apps/dsa-web
npm run build
echo "[entrypoint] 前端编译完成 → /app/static/"

exec "$@"
