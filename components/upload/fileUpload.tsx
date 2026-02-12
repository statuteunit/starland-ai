"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { cn } from "@/utils/tools";
import { detectKind, formatBytes, MAX_BYTES } from "./fileTypes";
import { uploadWithProgress } from "@/utils/tools";

type UploadedItem = {
  id: string;
  name: string;
  size: number;
  mime: string;
  kind: "image" | "pdf" | "doc";
  url: string;
  createdAt: string;
};

type FileUploadProps = {
  onUploaded?: (item: UploadedItem) => void;
  variant?: "default" | "chat";
};

export function FileUpload(props: FileUploadProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const acceptAttr = useMemo(
    () => ["image/*", "application/pdf", ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"].join(","),
    []
  );

  const validate = (file: File) => {
    const kind = detectKind(file.type);
    if (!kind) return { ok: false as const, error: "不支持的文件类型" };
    if (file.size > MAX_BYTES) return { ok: false as const, error: `文件过大（上限 ${formatBytes(MAX_BYTES)}）` };
    return { ok: true as const, kind };
  };

  const handleFiles = async (files: FileList | File[]) => {
    const file = Array.isArray(files) ? files[0] : files.item(0);
    if (!file) return;

    const v = validate(file);
    if (!v.ok) {
      setError(v.error);
      return;
    }

    setError(null);
    setProgress(0);
    try {
      const res = await uploadWithProgress({
        file,
        onProgress: (p) => setProgress(p),
      });
      setProgress(null);
      props.onUploaded?.(res.item as UploadedItem);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e: any) {
      setProgress(null);
      setError(e?.message || "上传失败");
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "w-full",
          dragOver ? "bg-white/5" : ""
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
          e.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(Array.from(e.dataTransfer.files || []));
        }}
      >
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            const text = message.trim();
            if (!text) return;
            sessionStorage.setItem("starland:pending-chat-message", text);
            setMessage("");
            router.push("/chat");
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={acceptAttr}
            placeholder={"上传文件"}
            aria-label="Upload file"
            onChange={(e) => void handleFiles(e.currentTarget.files ?? [])}
          />

          <textarea
            className={cn("w-full resize-none mb-10 lg:mb-14 bg-transparent border-0 text-primary focus:outline-none")}
            placeholder="输入内容…"
            aria-label="Message input"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />

          <button
            type="button"
            className="absolute left-0 bottom-2 h-9 w-9 rounded-[10px] border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center"
            onClick={() => inputRef.current?.click()}
            aria-label="Upload file"
          >
            <Upload className="w-5 text-secondary" />
          </button>

          <button
            type="submit"
            className={cn(
              "absolute right-0 bottom-2 h-9 px-3 rounded-[10px] lg:rounded-2xl bg-primary-gradient text-white",
              !message.trim() ? "opacity-60" : "hover:opacity-90"
            )}
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>

        {progress !== null && (
          <div className="mt-3 w-full">
            <div className="flex items-center justify-between text-xs text-secondary mb-2">
              <span>上传中</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-primary-accent" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 flex items-center justify-between rounded-[10px] border border-danger-accent/40 bg-danger-accent/10 px-4 py-3">
            <span className="text-sm text-danger-accent">{error}</span>
            <button type="button" className="text-danger-accent" onClick={() => setError(null)} aria-label="Dismiss error">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
