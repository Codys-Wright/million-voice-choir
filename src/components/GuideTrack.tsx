import { useState } from 'react'

const VIDEO_URL = '/media/guide-video.mp4'

/**
 * The segment everyone sings, with the guide audio and on-screen lyrics.
 * Plays right here on the page — no downloads for now.
 */
export function GuideTrack() {
  const [missing, setMissing] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-stage">
      {missing ? (
        <p className="p-6 text-cream-dim sm:p-8">
          The guide video isn't up yet. Check back soon — or follow along once
          it lands here.
        </p>
      ) : (
        <>
          <video
            src={VIDEO_URL}
            controls
            controlsList="nodownload"
            preload="metadata"
            playsInline
            className="aspect-2/1 w-full bg-ink"
            onError={() => setMissing(true)}
          >
            Your browser can't play this video.
          </video>

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
