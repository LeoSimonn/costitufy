#!/bin/bash

# Script para configurar o Bun no PATH
# Execute com: source setup-bun.sh

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

echo "✅ Bun configurado no PATH desta sessão!"
echo "🚀 Agora você pode usar: bun run dev"
echo ""
echo "Para tornar permanente, adicione estas linhas ao seu ~/.zshrc:"
echo 'export BUN_INSTALL="$HOME/.bun"'
echo 'export PATH="$BUN_INSTALL/bin:$PATH"'

