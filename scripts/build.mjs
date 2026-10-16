import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const files = ["index.html", "manus-routes.json", "favicon.svg"];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of files) {
  copyFileSync(join(root, file), join(output, file));
}
console.log(`Publicação estática preparada em ${output}.`);
