/// <reference types="bun-types" />

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

let server;

try {
  server = Bun.serve({
    port: port,
    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url);
      const publicPath = isProd ? "./dist" : ".";
      let filePath = publicPath + url.pathname;

      if (url.pathname === "/") {
        filePath = publicPath + "/index.html";
      }

      const file = Bun.file(filePath);

      if (await file.exists()) {
        const ext = filePath.split('.').pop();
        
        // Transpile TypeScript/JSX files on-the-fly
        if (ext === 'tsx' || ext === 'ts') {
          const transpiled = await Bun.build({
            entrypoints: [filePath],
            target: 'browser',
            format: 'esm',
            minify: false,
            sourcemap: 'inline',
          });

          if (transpiled.outputs.length > 0) {
            const output = transpiled.outputs[0];
            const text = await output.text();
            return new Response(text, {
              headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'no-cache',
              },
            });
          }
        }

        // Serve other files normally
        const mimeTypes: Record<string, string> = {
          'html': 'text/html',
          'css': 'text/css',
          'js': 'application/javascript',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'gif': 'image/gif',
          'svg': 'image/svg+xml',
        };
        
        const contentType = mimeTypes[ext || ''] || 'application/octet-stream';
        
        return new Response(file, {
          headers: {
            'Content-Type': contentType,
          },
        });
      }

      // SPA Fallback for non-asset links
      if (!url.pathname.includes(".")) {
        const index = Bun.file(publicPath + "/index.html");
        return new Response(index, {
          headers: {
            'Content-Type': 'text/html',
          },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`🚀 Costitufy rodando em http://localhost:${server.port}`);
} catch (error: any) {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Erro: Porta ${port} já está em uso!`);
    console.log(`\n💡 Soluções:`);
    console.log(`   1. Execute: bun run kill-port`);
    console.log(`   2. Execute: bun run dev:clean`);
    console.log(`   3. Execute: ./kill-port.sh\n`);
    process.exit(1);
  } else {
    throw error;
  }
}
