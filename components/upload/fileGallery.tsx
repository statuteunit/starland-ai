"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { cn } from "@/utils/tools";
import { formatBytes } from "./fileTypes";

type Item = {
  id: string;
  name: string;
  size: number;
  mime: string;
  kind: "image" | "pdf" | "doc";
  url: string;
  createdAt: string;
};

export function FileGallery(props: { appended?: Item | null; variant?: "default" | "compact" }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [preview, setPreview] = useState<Item | null>(null);
  const compact = props.variant === "compact";

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/files");
      const json = await res.json();
      setItems(json.items ?? []);
    } catch (e: any) {
      setErr(e?.message || "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!props.appended) return;
    setItems((prev) => [props.appended!, ...prev]);
  }, [props.appended]);

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("删除失败");
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      setErr(e?.message || "删除失败");
    }
  };

  if (loading) return <div className="text-muted">Loading...</div>;
  if (err) return <div className="text-danger-accent">{err}</div>;

  return (
    <>
      {compact ? (
        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <div key={it.id} className="group flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-2 py-2">
              <button
                type="button"
                className="flex items-center gap-2 min-w-0"
                aria-label="Preview"
                onClick={() => {
                  if (it.kind === "image") setPreview(it);
                  else window.open(it.url, "_blank", "noopener,noreferrer");
                }}
                title={it.name}
              >
                {it.kind === "image" ? (
                  <img
                    src={it.url}
                    alt={it.name}
                    className="h-10 w-10 rounded-[8px] object-cover border border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-[8px] border border-white/10 bg-[rgba(15,23,42,0.4)] flex items-center justify-center text-xs text-secondary">
                    {it.kind.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs text-primary truncate max-w-[160px]">{it.name}</div>
                  <div className="text-[11px] text-muted">{formatBytes(it.size)}</div>
                </div>
              </button>

              <button
                type="button"
                className="h-9 w-9 rounded-[10px] hover:bg-white/10 flex items-center justify-center text-secondary"
                aria-label="Delete"
                onClick={() => void remove(it.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={cn("grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3")}>
          {items.map((it) => (
            <div key={it.id} className="rounded-[12px] border border-white/10 bg-[rgba(15,23,42,0.4)] overflow-hidden">
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-primary text-sm font-medium truncate">{it.name}</div>
                  <div className="text-muted text-xs mt-1">{formatBytes(it.size)}</div>
                </div>

                <button
                  type="button"
                  className="p-2 rounded-[10px] hover:bg-white/5 text-secondary"
                  aria-label="Delete"
                  onClick={() => void remove(it.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="border-t border-white/10">
                {it.kind === "image" && (
                  <button
                    type="button"
                    className="w-full"
                    aria-label="Preview image"
                    onClick={() => setPreview(it)}
                  >
                    <img
                      src={it.url}
                      alt={it.name}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                  </button>
                )}

                {it.kind === "pdf" && (
                  <div className="p-4">
                    <a className="text-primary-accent underline" href={it.url} target="_blank" rel="noreferrer">
                      预览 PDF
                    </a>
                  </div>
                )}

                {it.kind === "doc" && (
                  <div className="p-4">
                    <a className="text-primary-accent underline" href={it.url} target="_blank" rel="noreferrer">
                      预览文件
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-6"
          role="dialog"
          aria-label="Image preview"
          onClick={() => setPreview(null)}
        >
          <div
            className="max-w-[95vw] max-h-[90vh] rounded-[12px] border border-white/10 bg-[rgba(15,23,42,0.8)] p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-sm text-secondary truncate">{preview.name}</div>
              <button
                type="button"
                className="h-9 w-9 rounded-[10px] border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center"
                aria-label="Close preview"
                onClick={() => setPreview(null)}
              >
                <X className="w-4 h-4 text-secondary" />
              </button>
            </div>
            <img
              src={preview.url}
              alt={preview.name}
              className="max-w-[90vw] max-h-[78vh] object-contain rounded-[10px]"
            />
          </div>
        </div>
      )}
    </>
  );
}
