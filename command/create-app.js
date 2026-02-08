const fs = require("fs/promises");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");
const CONFIG_PATH = path.join(__dirname, "config.json");

function toPascalCase(routePath) {
  const last = routePath
    .replace(/[\[\]\(\)]/g, "")
    .split(/[\/\\]/)
    .filter(Boolean)
    .pop() || "index";

  return last
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("") || "Index";
}
async function writeIfMissing(file, content) {
  try {
    await fs.stat(file);
  } catch {
    await fs.writeFile(file, content, "utf-8");
  }
}

async function main() {
  const raw = await fs.readFile(CONFIG_PATH, "utf-8");
  const cfg = JSON.parse(raw);

  if (!Array.isArray(cfg.routes) || cfg.routes.length === 0) {
    throw new Error("config.json: routes 不能为空");
  }

  for (const r of cfg.routes) {
    const routePath = typeof r === "string" ? r : r.path;
    if (!routePath || typeof routePath !== "string") continue;

    const dir = path.join(APP_DIR, routePath.replace(/^\//, ""));
    await fs.mkdir(dir, { recursive: true });

    const pageFile = path.join(dir, "page.tsx");
    const layoutFile = path.join(dir, "layout.tsx");

    const base = toPascalCase(routePath);
    const pageName = `${base}Page`;
    const layoutName = `${base}Layout`;

    const pageContent = `
export default function ${pageName}() {
  return <div>${routePath} page</div>;
}
`.trim();

    const layoutContent = `
import ${pageName} from "./page";
export default function ${layoutName}() {
  return <${pageName} />;
}
`.trim();

    await writeIfMissing(pageFile, pageContent);
    await writeIfMissing(layoutFile, layoutContent);
    console.log("generated:", routePath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});