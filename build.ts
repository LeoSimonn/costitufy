/// <reference types="bun-types" />

// Script de build para produção (Netlify)
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

console.log('🏗️  Iniciando build para produção...\n');

// 1. Limpar pasta dist
console.log('🧹 Limpando pasta dist...');
await Bun.$`rm -rf dist`;
await mkdir('dist', { recursive: true });

// 2. Compilar CSS
console.log('🎨 Compilando Tailwind CSS...');
await Bun.$`tailwindcss -i ./index.css -o ./output.css --minify`;

// 3. Copiar CSS
console.log('📄 Copiando CSS...');
await Bun.$`cp output.css dist/`;

// 4. Copiar e ajustar HTML
console.log('📄 Copiando e ajustando HTML...');
const html = await Bun.file('index.html').text();
const adjustedHtml = html.replace('/index.tsx', '/index.js');
await Bun.write('dist/index.html', adjustedHtml);

// 5. Transpilar arquivos TypeScript
console.log('⚙️  Transpilando TypeScript...');

const filesToBuild = [
  './index.tsx',
  './App.tsx',
  './hooks/useCostCalculator.ts',
  './lib/data.ts',
  './lib/costs/formulas.ts',
  './types.ts',
  './components/Alerts.tsx',
  './components/AssumptionsPanel.tsx',
  './components/CostBreakdown.tsx',
  './components/FixedCosts.tsx',
  './components/Icons.tsx',
  './components/StepCard.tsx',
  './components/ui/Button.tsx',
  './components/ui/Card.tsx',
  './components/ui/Input.tsx',
  './components/ui/Select.tsx',
];

for (const file of filesToBuild) {
  const transpiled = await Bun.build({
    entrypoints: [file],
    target: 'browser',
    format: 'esm',
    minify: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom/client', 'recharts'],
  });

  if (transpiled.outputs.length > 0) {
    const output = transpiled.outputs[0];
    let text = await output.text();
    
    // Substituir imports por CDN
    text = text.replace(/from\s*["']react["']/g, 'from "https://esm.sh/react@18.3.1"');
    text = text.replace(/from\s*["']react-dom\/client["']/g, 'from "https://esm.sh/react-dom@18.3.1/client"');
    text = text.replace(/from\s*["']react\/jsx-runtime["']/g, 'from "https://esm.sh/react@18.3.1/jsx-runtime"');
    text = text.replace(/from\s*["']react\/jsx-dev-runtime["']/g, 'from "https://esm.sh/react@18.3.1/jsx-dev-runtime"');
    text = text.replace(/from\s*["']recharts["']/g, 'from "https://esm.sh/recharts@2.12.7"');
    
    // Substituir imports locais relativos
    text = text.replace(/from\s*["']\.\/([^"']+)\.tsx?["']/g, 'from "./$1.js"');
    text = text.replace(/from\s*["']\.\.\/([^"']+)\.tsx?["']/g, 'from "../$1.js"');
    
    // Criar estrutura de pastas
    const outputPath = file.replace(/^\.\//, '').replace(/\.tsx?$/, '.js');
    const outputDir = join('dist', outputPath.split('/').slice(0, -1).join('/'));
    
    if (outputDir !== 'dist') {
      await mkdir(outputDir, { recursive: true });
    }
    
    // Escrever arquivo
    await Bun.write(join('dist', outputPath), text);
    console.log(`  ✅ ${file} -> dist/${outputPath}`);
  }
}

console.log('\n✨ Build concluído com sucesso!');
console.log('📦 Arquivos gerados em: ./dist');

