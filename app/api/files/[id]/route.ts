import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), ".uploads");

async function findItem(id: string) {
  const indexPath = path.join(UPLOAD_DIR, "index.json");
  const data = await fs.readFile(indexPath, "utf8").then((s) => JSON.parse(s)).catch(() => ({ items: [] as any[] }));
  return (data.items as any[]).find((x) => x.id === id) ?? null;
}

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const item = await findItem(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const filePath = path.join(UPLOAD_DIR, item.storedName);
  const buf = await fs.readFile(filePath);

  return new NextResponse(buf, {
    headers: {
      "Content-Type": item.mime || "application/octet-stream",
      "Content-Disposition": `inline; filename="${encodeURIComponent(item.name)}"`,
    },
  });
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const indexPath = path.join(UPLOAD_DIR, "index.json");
  const data = await fs.readFile(indexPath, "utf8").then((s) => JSON.parse(s)).catch(() => ({ items: [] as any[] }));
  const items = data.items as any[];
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [item] = items.splice(idx, 1);
  await fs.writeFile(indexPath, JSON.stringify({ items }), "utf8").catch(() => {});
  await fs.unlink(path.join(UPLOAD_DIR, item.storedName)).catch(() => {});

  return NextResponse.json({ ok: true });
}