import { useEffect, useRef, useState } from 'react'
import { Download, Pause, Play } from 'lucide-react'

const TRACK_URL = '/media/guide-track.mp3'

function fmt(s: number) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, '0')}`
}

/**
 * Player for the guide track everyone sings along to. Drop the audio file at
 * public/media/guide-track.mp3 and this lights up; until then it says so.
 */
export function GuideTrack() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [ready, setReady] = useState(false)
  const [missing, setMissing] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onMeta = () => {
      setDuration(a.duration)
      setReady(true)
    }
    const onTime = () => setTime(a.currentTime)
    const onEnd = () => setPlaying(false)
    const onErr = () => setMissing(true)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnd)
    a.addEventListener('error', onErr)
    return () => {
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('error', onErr)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      void a.play()
      setPlaying(true)
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-stage p-6 sm:p-8">
      <audio ref={audioRef} src={TRACK_URL} preload="metadata" />

      {missing ? (
        <p className="text-cream-dim">
          The guide track isn't up yet. Check back soon — or follow along once
          it lands here.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              disabled={!ready}
              aria-label={playing ? 'Pause guide track' : 'Play guide track'}
              className="grid size-14 shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:bg-gold-soft disabled:opacity-40"
            >
              {playing ? (
                <Pause className="size-6" fill="currentColor" />
              ) : (
                <Play className="size-6 translate-x-0.5" fill="currentColor" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg text-cream">The guide track</p>
              <p className="text-sm text-cream-dim">
                Sing with this exact recording — it keeps a million takes in
                time with each other.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-10 text-right font-mono text-xs tabular-nums text-cream-dim">
              {fmt(time)}
            </span>
            <input
              type="range"
              className="seek flex-1"
              min={0}
              max={duration || 1}
              step={0.1}
              value={time}
              aria-label="Seek within the guide track"
              onChange={(e) => {
                const a = audioRef.current
                if (!a) return
                a.currentTime = Number(e.target.value)
                setTime(a.currentTime)
              }}
            />
            <span className="w-10 font-mono text-xs tabular-nums text-cream-dim">
              {fmt(duration)}
            </span>
          </div>

          <a
            href={TRACK_URL}
            download="million-voice-choir-guide-track.mp3"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition hover:border-gold hover:text-gold"
          >
            <Download className="size-4" />
            Download the guide track
          </a>
        </div>
      )}
    </div>
  )
}
