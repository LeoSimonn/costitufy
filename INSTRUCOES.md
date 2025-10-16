# 🚀 Instruções para Rodar o Projeto

## ⚠️ Problema: "command not found: bun"

Você vê esse erro porque o Bun não está no PATH do seu terminal atual.

## ✅ Soluções

### **Opção 1: Usar o Script de Setup (Recomendado)**

Em cada novo terminal, execute:

```bash
source setup-bun.sh
```

Depois pode rodar normalmente:

```bash
bun run dev
```

### **Opção 2: Adicionar Bun ao PATH Permanentemente**

Abra o arquivo `~/.zshrc` com um editor de texto e adicione estas linhas no final:

```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

Depois, recarregue o terminal:

```bash
source ~/.zshrc
```

### **Opção 3: Executar com PATH Inline**

Execute diretamente com o PATH:

```bash
export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && bun run dev
```

## 🎮 Comandos para Rodar o Projeto

Depois de configurar o PATH:

```bash
# Desenvolvimento (compila CSS + inicia servidor)
bun run dev

# Apenas compilar CSS
bun run build:css

# Build para produção
bun run build
```

## 🌐 Acesse a Aplicação

Após rodar `bun run dev`, acesse:

👉 **http://localhost:3000**

## 📦 Se Precisar Reinstalar

```bash
# Remover node_modules e lockfile
rm -rf node_modules bun.lockb

# Reinstalar
bun install

# Compilar CSS
bun run build:css

# Rodar
bun run dev
```

## 🐛 Problemas Comuns

### CSS não carrega
```bash
bun run build:css
```

### Porta 3000 ocupada

**Opção 1 - Usar o script npm:**
```bash
bun run dev:clean
```

**Opção 2 - Usar o script shell:**
```bash
./kill-port.sh
```

**Opção 3 - Comando manual:**
```bash
bun run kill-port
```

### Bun não encontrado mesmo após setup
```bash
# Verificar se Bun está instalado
ls -la ~/.bun/bin/bun

# Se não estiver, reinstalar
curl -fsSL https://bun.sh/install | bash
```

## 🎨 Tema e Aparência

O projeto já está configurado com:
- ✅ Tailwind CSS compilado
- ✅ Tema moderno com cores azul e slate
- ✅ Fonte Inter do Google Fonts
- ✅ Responsivo para mobile e desktop

## 🚀 Deploy no Netlify

1. Crie uma conta no [Netlify](https://netlify.com)
2. Conecte seu repositório Git
3. O arquivo `netlify.toml` já está configurado
4. Deploy automático! 🎉

