import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function uploadWithProgress(params: {
  file: File;
  onProgress: (percent: number) => void;
  signal?: AbortSignal;
}) {
  const { file, onProgress, signal } = params;

  return await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/files");

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300) resolve(json);
        else reject(Object.assign(new Error(json?.error || "Upload failed"), { status: xhr.status }));
      } catch {
        reject(new Error("Invalid server response"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.onabort = () => reject(new Error("Aborted"));

    if (signal) {
      if (signal.aborted) xhr.abort();
      signal.addEventListener("abort", () => xhr.abort(), { once: true });
    }

    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}