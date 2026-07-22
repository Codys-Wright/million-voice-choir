import { useCallback, useRef, useState } from 'react'
import { CheckCircle2, FileVideo, UploadCloud, X } from 'lucide-react'

type PendingFile = {
  file: File
  status: 'queued' | 'uploading' | 'done' | 'error'
}

const ACCEPT = 'video/*'
const MAX_MB = 500

/**
 * Where a singer hands over their take. `uploadFile` is the single seam for
 * the storage provider (Drive, Dropbox, S3, …) — swap its body, keep the UI.
 */
async function uploadFile(
  _file: File,
  onProgress: (pct: number) => void,
): Promise<void> {
  // Storage provider not wired yet — simulate so the UI flow is testable.
  for (let pct = 0; pct <= 100; pct += 10) {
    await new Promise((r) => setTimeout(r, 120))
    onProgress(pct)
  }
}

export function UploadDrop() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<Array<PendingFile>>([])
  const [progress, setProgress] = useState<Record<string, number>>({})

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return
    const incoming = Array.from(list)
      .filter((f) => f.type.startsWith('video/'))
      .filter((f) => f.size <= MAX_MB * 1024 * 1024)
      .map((file): PendingFile => ({ file, status: 'queued' }))
    if (incoming.length === 0) return
    setFiles((prev) => [...prev, ...incoming])
    for (const item of incoming) {
      const key = item.file.name
      setFiles((prev) =>
        prev.map((p) => (p.file === item.file ? { ...p, status: 'uploading' } : p)),
      )
      uploadFile(item.file, (pct) =>
        setProgress((prev) => ({ ...prev, [key]: pct })),
      )
        .then(() =>
          setFiles((prev) =>
            prev.map((p) => (p.file === item.file ? { ...p, status: 'done' } : p)),
          ),
        )
        .catch(() =>
          setFiles((prev) =>
            prev.map((p) => (p.file === item.file ? { ...p, status: 'error' } : p)),
          ),
        )
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload your video"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
          dragging
            ? 'border-gold bg-stage-soft'
            : 'border-line bg-stage hover:border-gold/60'
        }`}
      >
        <UploadCloud
          className={`size-9 transition ${dragging ? 'text-gold' : 'text-cream-dim'}`}
        />
        <div>
          <p className="text-cream">
            Drop your video here, or <span className="text-gold">browse</span>
          </p>
          <p className="mt-1 text-sm text-cream-dim">
            Any video format, up to {MAX_MB} MB. Keep the guide track audible
            in your recording.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((item, i) => (
            <li
              key={`${item.file.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-stage px-4 py-3"
            >
              <FileVideo className="size-5 shrink-0 text-cream-dim" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-cream">{item.file.name}</p>
                {item.status === 'uploading' && (
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-gold transition-[width]"
                      style={{ width: `${progress[item.file.name] ?? 0}%` }}
                    />
                  </div>
                )}
                {item.status === 'error' && (
                  <p className="text-xs text-ember">
                    Upload failed — check your connection and try again.
                  </p>
                )}
              </div>
              {item.status === 'done' ? (
                <CheckCircle2 className="size-5 shrink-0 text-gold" />
              ) : (
                <button
                  type="button"
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() =>
                    setFiles((prev) => prev.filter((p) => p !== item))
                  }
                  className="text-cream-dim transition hover:text-cream"
                >
                  <X className="size-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
