# Guia de Contribuição

Obrigado por considerar contribuir com o Costitufy! 🎉

## 🚀 Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma [issue](https://github.com/seu-usuario/costitufy/issues) incluindo:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. comportamento atual
- Screenshots (se aplicável)
- Versão do Bun e sistema operacional

### Sugerindo Melhorias

Adoramos sugestões! Abra uma [issue](https://github.com/seu-usuario/costitufy/issues) com:

- Descrição detalhada da feature
- Por que seria útil
- Exemplos de uso (se possível)

### Pull Requests

1. **Fork o repositório**
   ```bash
   git clone https://github.com/seu-usuario/costitufy.git
   cd costitufy
   ```

2. **Configure o ambiente**
   ```bash
   bun install
   bun run build:css
   ```

3. **Crie uma branch**
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-bug
   ```

4. **Faça suas alterações**
   - Siga o estilo de código existente
   - Adicione comentários quando necessário
   - Teste suas alterações localmente

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
   
   Usamos [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Apenas documentação
   - `style:` - Formatação, ponto e vírgula, etc
   - `refactor:` - Refatoração de código
   - `test:` - Adição de testes
   - `chore:` - Manutenção

6. **Push para sua branch**
   ```bash
   git push origin feature/minha-feature
   ```

7. **Abra um Pull Request**
   - Descreva suas mudanças
   - Referencie issues relacionadas
   - Adicione screenshots (se aplicável)

## 📋 Checklist do PR

Antes de submeter seu PR, certifique-se:

- [ ] O código compila sem erros (`bun run build`)
- [ ] CSS foi recompilado se necessário (`bun run build:css`)
- [ ] O código segue o estilo do projeto
- [ ] Comentários foram adicionados onde necessário
- [ ] README foi atualizado (se necessário)
- [ ] Nenhum arquivo sensível foi incluído

## 🎨 Padrões de Código

### TypeScript
- Use tipos explícitos quando possível
- Evite `any`, use `unknown` se necessário
- Use interfaces para objetos complexos

### React
- Componentes funcionais com hooks
- Props tipadas
- Extraia lógica complexa para custom hooks

### CSS/Tailwind
- Use classes utilitárias do Tailwind
- Mantenha consistência com o tema existente
- Evite CSS inline quando possível

## 🧪 Testando Localmente

```bash
# Desenvolvimento
bun run dev

# Build de produção
bun run build

# Testar build
bun run start
```

## 📚 Estrutura do Projeto

```
costitufy/
├── components/      # Componentes React
│   ├── ui/         # Componentes base reutilizáveis
│   └── ...         # Componentes específicos
├── hooks/          # Custom hooks
├── lib/            # Utilitários e lógica de negócio
│   └── costs/      # Cálculos de custos
├── App.tsx         # Componente principal
├── index.tsx       # Entry point
└── server.ts       # Servidor Bun
```

## ❓ Dúvidas?

Não hesite em abrir uma [issue](https://github.com/seu-usuario/costitufy/issues) com suas dúvidas!

## 📜 Código de Conduta

- Seja respeitoso e construtivo
- Aceite feedback de forma positiva
- Foque no que é melhor para a comunidade

---

Obrigado por contribuir! 🙏

