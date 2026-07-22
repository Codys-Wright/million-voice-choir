import { useState } from 'react'
import { Download, Music, Video } from 'lucide-react'

const VIDEO_URL = '/media/guide-video.mp4'
const AUDIO_URL = '/media/guide-track.mp3'

/**
 * The segment everyone sings: 2:17–3:43 of "El Artista Eres Tú".
 * The video carries the guide audio and on-screen lyrics; the mp3 is the
 * same segment, audio only, for practicing anywhere.
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
            preload="metadata"
            playsInline
            className="aspect-2/1 w-full bg-ink"
            onError={() => setMissing(true)}
          >
            Your browser can't play this video. Download it below instead.
          </video>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div>
              <p className="font-display text-lg text-cream">
                The segment you'll sing
              </p>
              <p className="mt-1 text-sm text-cream-dim">
                Sing with this exact recording — it keeps a million takes in
                time with each other. The lyrics are on screen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={VIDEO_URL}
                download="million-voice-choir-guide-video.mp4"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition hover:border-gold hover:text-gold"
              >
                <Video className="size-4" />
                <Download className="size-4" />
                Download the video
              </a>
              <a
                href={AUDIO_URL}
                download="million-voice-choir-guide-track.mp3"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition hover:border-gold hover:text-gold"
              >
                <Music className="size-4" />
                <Download className="size-4" />
                Download audio only
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
