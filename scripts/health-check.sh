#!/bin/sh

PORT="${PORT:-3000}"

curl -sf "http://localhost:${PORT}/health" > /dev/null || exit 1
