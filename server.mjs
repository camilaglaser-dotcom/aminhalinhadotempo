import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const publicFiles = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/manus-routes.json", { file: "manus-routes.json", type: "application/json; charset=utf-8" }],
  ["/favicon.svg", { file: "favicon.svg", type: "image/svg+xml; charset=utf-8" }]
]);

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { "Allow": "GET, HEAD", "Cache-Control": "no-store" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  } catch {
    response.writeHead(400, { "Cache-Control": "no-store" });
    response.end("Requisição inválida.");
    return;
  }

  const asset = publicFiles.get(pathname);
  if (!asset) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    response.end("Não encontrado.");
    return;
  }

  try {
    const body = await readFile(join(root, asset.file));
    response.writeHead(200, {
      "Content-Type": asset.type,
      "Content-Length": body.length,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    response.end("Não foi possível carregar o site.");
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, "0.0.0.0", () => {
  console.log(`Minha Linha do Tempo disponível na porta ${port}.`);
});
