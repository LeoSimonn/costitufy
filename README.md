# Costitufy - AI Cost Estimator

<div align="center">

![Bun](https://img.shields.io/badge/Bun-1.3-black?style=for-the-badge&logo=bun)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Calculadora de custos para serviços de IA (OpenAI, Google AI)**

[Demo](https://costitufy.netlify.app) · [Reportar Bug](https://github.com/seu-usuario/costitufy/issues) · [Solicitar Feature](https://github.com/seu-usuario/costitufy/issues)

</div>

---

## 🚀 Tecnologias

- **Bun** - Runtime JavaScript ultra-rápido + Bundler + Transpiler
- **React** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca de gráficos

## ⚡ Como Funciona

- **Servidor Bun** transpila TypeScript/JSX automaticamente em tempo real
- **Tailwind CSS** é pré-compilado para `output.css`
- **Hot reload** ativado no modo desenvolvimento
- **Zero configuração** de build tools - Bun cuida de tudo!

## 📋 Pré-requisitos

- Bun instalado ([instalar Bun](https://bun.sh))

## ⚠️ Configuração Inicial do Bun

Se você receber o erro `command not found: bun`, precisa adicionar o Bun ao PATH.

**Escolha uma opção:**

### Opção 1: Usar o Script (Mais Fácil)
```bash
source setup-bun.sh
```

### Opção 2: Configuração Permanente
Adicione ao seu `~/.zshrc`:
```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

Depois execute: `source ~/.zshrc`

📖 **Veja mais detalhes em [INSTRUCOES.md](./INSTRUCOES.md)**

## 🛠️ Instalação

```bash
# Instalar dependências
bun install

# Compilar CSS do Tailwind
bun run build:css
```

## 🎮 Executando o Projeto

### Modo Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
bun run dev
```

O servidor estará disponível em `http://localhost:3000`

### Modo Produção

```bash
# Build para produção
bun run build

# Executar em produção
bun run start
```

## 📦 Scripts Disponíveis

- `bun run dev` - Compila CSS e inicia servidor de desenvolvimento
- `bun run dev:clean` - Mata porta 3000 e inicia servidor (use se a porta estiver ocupada)
- `bun run dev:server` - Inicia apenas o servidor (sem compilar CSS)
- `bun run kill-port` - Mata processo na porta 3000
- `bun run build:css` - Compila CSS do Tailwind
- `bun run watch:css` - Assiste mudanças no CSS e recompila automaticamente
- `bun run build` - Build completo para produção
- `bun run start` - Inicia servidor em modo produção

## 🌐 Deploy no Netlify

O projeto já está configurado para deploy no Netlify:

1. Conecte seu repositório no Netlify
2. O arquivo `netlify.toml` já está configurado
3. O deploy será automático após cada push

### Configuração Manual no Netlify

Se preferir configurar manualmente:

- **Build command**: `curl -fsSL https://bun.sh/install | bash && export PATH=$HOME/.bun/bin:$PATH && bun install && bun run build && cp index.html dist/ && cp output.css dist/`
- **Publish directory**: `dist`

## 🎨 Tema

O projeto usa um tema customizado com Tailwind CSS configurado em `tailwind.config.js`. As cores são baseadas em tons de azul e slate para um visual moderno e profissional.

## 📝 Estrutura do Projeto

```
copy-of-costitufy/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI reutilizáveis
│   └── ...             # Componentes específicos
├── hooks/              # Custom hooks React
├── lib/                # Funções utilitárias e dados
│   └── costs/          # Cálculos de custos
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada
├── index.css           # CSS base (com Tailwind)
├── server.ts           # Servidor Bun
└── tailwind.config.js  # Configuração do Tailwind
```

## 🐛 Troubleshooting

### Servidor não inicia
- Verifique se a porta 3000 está disponível
- Execute `bun install` novamente

### CSS não está carregando
- Execute `bun run build:css` para recompilar
- Verifique se o arquivo `output.css` foi gerado

### Erros de TypeScript
- Execute `bun install` para garantir que todas as tipagens estão instaladas
- Verifique se está usando a versão correta do TypeScript

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 👥 Autores

- **Seu Nome** - *Trabalho Inicial* - [seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Inspirado nas calculadoras de custo de APIs de IA
- Comunidade Bun pelo runtime incrível
- Tailwind CSS pela facilidade de estilização

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma [issue](https://github.com/seu-usuario/costitufy/issues).

---

<div align="center">
  Feito com ❤️ usando Bun
</div>
