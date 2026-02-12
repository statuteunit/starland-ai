export type AllowedKind = "image" | "pdf" | "doc";

// 最大20M
export const MAX_BYTES = 20 * 1024 * 1024;

export const ACCEPT = {
  image: ["image/png", "image/jpeg", "image/webp", "image/gif"],
  pdf: ["application/pdf"],
  doc: [
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
} as const;

export function detectKind(mime: string): AllowedKind | null {
  if (ACCEPT.image.includes(mime as any)) return "image";
  if (ACCEPT.pdf.includes(mime as any)) return "pdf";
  if (ACCEPT.doc.includes(mime as any)) return "doc";
  return null;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}