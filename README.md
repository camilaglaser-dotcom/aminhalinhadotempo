# Minha Linha do Tempo

Site pessoal em português brasileiro para apresentar uma jornada cronológica e editá-la diretamente no navegador.

## Executar

Requer Node.js 22 ou compatível, sem dependências externas:

```sh
node server.mjs
```

O servidor escuta em `0.0.0.0:3000` por padrão e respeita a variável `PORT`. Ele publica somente a página, o manifesto de rotas e o favicon.

## Publicação estática

```sh
node scripts/build.mjs
```

O comando copia os arquivos públicos para `dist/`.

## Dados

Os dados editados são guardados no `localStorage` do navegador atual. A função Exportar baixa uma cópia JSON. Não há contas, API, banco de dados ou sincronização entre dispositivos.
