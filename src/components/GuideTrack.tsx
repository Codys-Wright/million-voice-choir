import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

const VIDEO_URL = '/media/guide-video.mp4'
const POSTER_URL = '/media/guide-poster.jpg'

/**
 * The segment everyone sings, with the guide audio and on-screen lyrics.
 * Shows a poster with a big play button until the first play, then hands
 * control to the native player.
 */
export function GuideTrack() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [missing, setMissing] = useState(false)

  const start = () => {
    setStarted(true)
    void videoRef.current?.play()
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-stage">
      {missing ? (
        <p className="p-6 text-cream-dim sm:p-8">
          The guide video isn't up yet. Check back soon — or follow along once
          it lands here.
        </p>
      ) : (
        <>
          <div className="relative">
            <video
              ref={videoRef}
              src={VIDEO_URL}
              poster={POSTER_URL}
              controls={started}
              controlsList="nodownload"
              preload="metadata"
              playsInline
              className="aspect-2/1 w-full bg-ink"
              onError={() => setMissing(true)}
            >
              Your browser can't play this video.
            </video>
            {!started && (
              <button
                type="button"
                onClick={start}
                aria-label="Play the guide video"
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="absolute inset-0 transition group-hover:bg-ink/10"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(11, 14, 26, 0.55), transparent 40%)',
                  }}
                />
                <span className="relative grid size-16 place-items-center rounded-full bg-gold text-ink shadow-[0_8px_40px_rgba(232,180,76,0.45)] transition group-hover:scale-105 group-hover:bg-gold-soft sm:size-20">
                  <Play className="size-7 translate-x-0.5 sm:size-8" fill="currentColor" />
                </span>
                <span className="absolute bottom-4 left-5 text-left sm:bottom-5 sm:left-6">
                  <span className="block font-display text-base text-cream sm:text-lg">
                    El Artista Eres Tú
                  </span>
                  <span className="block text-xs text-cream-dim sm:text-sm">
                    Guide video · 1:25
                  </span>
                </span>
              </button>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-display text-lg text-cream">
              The segment you'll sing
            </p>
            <p className="mt-1 text-sm text-cream-dim">
              Sing with this exact recording — it keeps a million takes in time
              with each other. The lyrics are on screen.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
