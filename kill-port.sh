#!/bin/bash

# Script para matar processo na porta 3000

PORT=${1:-3000}

echo "🔍 Procurando processo na porta $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Porta $PORT está livre!"
else
    echo "⚠️  Matando processo $PID na porta $PORT..."
    kill -9 $PID
    echo "✅ Porta $PORT liberada!"
fi

