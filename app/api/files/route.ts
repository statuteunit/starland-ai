import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), ".uploads");

function safeExt(name: string) {
  const ext = path.extname(name || "").toLowerCase();
  const ok = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt"]);
  return ok.has(ext) ? ext : "";
}

function kindFromMime(mime: string) {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  return "doc";
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!file.type) return NextResponse.json({ error: "Unknown file type" }, { status: 400 });

  const ext = safeExt(file.name);
  if (!ext) return NextResponse.json({ error: "Unsupported file extension" }, { status: 400 });

  const maxBytes = 20 * 1024 * 1024;
  if (file.size > maxBytes) return NextResponse.json({ error: "File too large" }, { status: 413 });

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const id = crypto.randomUUID();
  const storedName = `${id}${ext}`;
  const storedPath = path.join(UPLOAD_DIR, storedName);

  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(storedPath, buf);

  const item = {
    id,
    name: file.name,
    size: file.size,
    mime: file.type,
    kind: kindFromMime(file.type),
    url: `/api/files/${id}`,
    createdAt: new Date().toISOString(),
  };

  const indexPath = path.join(UPLOAD_DIR, "index.json");
  const prev = await fs.readFile(indexPath, "utf8").then((s) => JSON.parse(s)).catch(() => ({ items: [] as any[] }));
  prev.items.unshift({ ...item, storedName });
  await fs.writeFile(indexPath, JSON.stringify(prev), "utf8");

  return NextResponse.json({ item });
}

export async function GET() {
  const indexPath = path.join(UPLOAD_DIR, "index.json");
  const data = await fs.readFile(indexPath, "utf8").then((s) => JSON.parse(s)).catch(() => ({ items: [] as any[] }));
  const items = (data.items as any[]).map(({ storedName, ...rest }) => rest);
  return NextResponse.json({ items });
}