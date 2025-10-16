# 🚀 Guia de Deploy

## GitHub

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com/new)
2. Escolha um nome: `costitufy`
3. Mantenha como **público** (ou privado, se preferir)
4. **NÃO** marque "Initialize with README" (já temos um)
5. Clique em "Create repository"

### 2. Conectar Repositório Local

No terminal, execute:

```bash
# Adicionar remote do GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/costitufy.git

# Verificar remote
git remote -v

# Push do código
git branch -M main
git push -u origin main
```

### 3. Verificar

Acesse `https://github.com/SEU-USUARIO/costitufy` e confirme que os arquivos estão lá!

---

## Netlify

### Opção 1: Deploy via GitHub (Recomendado)

1. **Conecte o GitHub ao Netlify**
   - Acesse [Netlify](https://app.netlify.com)
   - Faça login ou crie uma conta
   - Clique em "Add new site" → "Import an existing project"
   - Escolha "GitHub"
   - Autorize o Netlify a acessar seus repositórios

2. **Selecione o Repositório**
   - Procure por `costitufy`
   - Clique nele

3. **Configurações de Build**
   - O Netlify detectará automaticamente o `netlify.toml`
   - Verifique se está assim:
     - **Build command**: (já configurado no netlify.toml)
     - **Publish directory**: `dist`
   - Clique em "Deploy"

4. **Aguarde o Deploy**
   - Primeiro deploy leva ~2-3 minutos
   - Netlify instalará o Bun e fará o build

5. **Acesse seu Site**
   - URL será algo como: `https://costitufy-abc123.netlify.app`
   - Configure um domínio customizado se desejar

### Opção 2: Deploy Manual (sem GitHub)

1. **Build Local**
   ```bash
   cd /Users/leosimon/Downloads/copy-of-costitufy
   bun run build:css
   bun run build
   cp index.html dist/
   cp output.css dist/
   ```

2. **Deploy via Netlify CLI**
   ```bash
   # Instalar Netlify CLI
   npm install -g netlify-cli
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Ou arraste e solte**
   - Acesse [Netlify Drop](https://app.netlify.com/drop)
   - Arraste a pasta `dist`
   - Pronto!

---

## Configurações Adicionais no Netlify

### Domínio Customizado

1. No painel do Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar DNS

### Variáveis de Ambiente

Se precisar adicionar variáveis de ambiente:

1. No painel do Netlify, vá em "Site settings"
2. Clique em "Environment variables"
3. Adicione suas variáveis (ex: `GEMINI_API_KEY`)

### Deploy Previews

Cada Pull Request no GitHub gera automaticamente um deploy preview!

---

## Atualizações Futuras

### Desenvolvimento Local
```bash
# Fazer alterações
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push
```

### Deploy Automático
- Netlify detecta o push automaticamente
- Build e deploy acontecem automaticamente
- Seu site atualiza em ~2 minutos

---

## Troubleshooting

### Build Falha no Netlify

**Erro: "bun: command not found"**
- Verifique se o `netlify.toml` está correto
- O comando de build deve instalar o Bun primeiro

**Erro: "output.css not found"**
- Certifique-se de que `bun run build:css` está no comando de build
- Verifique se o arquivo está sendo copiado para `dist/`

**Erro: Página em branco**
- Verifique se `index.html` está na pasta `dist`
- Confirme que os redirects estão configurados no `netlify.toml`

### Outros Problemas

1. **Limpar cache do Netlify**
   - Site settings → Build & deploy → Clear cache and retry deploy

2. **Verificar logs**
   - Vá em "Deploys" e clique no último deploy
   - Analise os logs de build

3. **Testar build local**
   ```bash
   bun run build
   # Se falhar aqui, falhará no Netlify também
   ```

---

## 📞 Suporte

- [Documentação Netlify](https://docs.netlify.com)
- [Documentação Bun](https://bun.sh/docs)
- [Issues do Projeto](https://github.com/SEU-USUARIO/costitufy/issues)

---

**Boa sorte com o deploy! 🚀**

