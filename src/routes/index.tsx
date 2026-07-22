import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Headphones, Upload, Video } from 'lucide-react'

import { GuideTrack } from '#/components/GuideTrack'
import { UploadDrop } from '#/components/UploadDrop'
import { VoiceWall } from '#/components/VoiceWall'

export const Route = createFileRoute('/')({ component: Home })

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const STEPS = [
  {
    icon: Headphones,
    title: 'Listen',
    body: 'Play the guide track below until the melody sits in your ear. Download it so you can sing with it anywhere.',
  },
  {
    icon: Video,
    title: 'Record',
    body: 'Film yourself singing along — phone camera is perfect. Wear headphones or let the track play out loud; both work.',
  },
  {
    icon: Upload,
    title: 'Upload',
    body: 'Send us the video. We line every take up against the guide track and weave it into one performance.',
  },
]

function Home() {
  return (
    <main>
      {/* Hero — the wall of voices */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        <VoiceWall className="absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-ink) 0%, transparent 35%, transparent 60%, var(--color-ink) 100%)',
          }}
        />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
          <span className="font-display text-lg tracking-wide text-cream">
            Million Voice Choir
          </span>
          <a
            href="#join"
            className="rounded-full border border-line px-4 py-2 text-sm text-cream transition hover:border-gold hover:text-gold"
          >
            Add your voice
          </a>
        </header>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl font-display text-5xl leading-[1.05] font-medium text-cream sm:text-7xl md:text-8xl"
          >
            One song.
            <br />
            <em className="font-light text-gold italic">A million voices.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg text-cream-dim"
          >
            Record yourself singing along to one shared song. Every take joins
            a single, world-sized choir.
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            href="#join"
            className="mt-10 rounded-full bg-gold px-8 py-3.5 font-medium text-ink transition hover:bg-gold-soft"
          >
            Add your voice
          </motion.a>
        </div>
      </section>

      {/* How it works — a real sequence, so the numbers mean something */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <motion.h2 {...fadeUp} className="font-display text-3xl text-cream sm:text-4xl">
          How your voice gets in
        </motion.h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.12 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-stage-soft text-gold">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-cream-dim">
                  {i + 1} / 3
                </span>
              </div>
              <h3 className="font-display text-xl text-cream">{step.title}</h3>
              <p className="text-cream-dim">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The guide track */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            Learn the song
          </h2>
          <p className="mt-3 mb-8 text-cream-dim">
            This is the recording every single voice sings against.
          </p>
          <GuideTrack />
        </motion.div>
      </section>

      {/* Upload */}
      <section id="join" className="mx-auto max-w-3xl scroll-mt-12 px-6 py-24 sm:px-10">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            Add your voice
          </h2>
          <p className="mt-3 mb-8 text-cream-dim">
            One video of you, singing along. That's the whole ask.
          </p>
          <UploadDrop />
        </motion.div>
      </section>

      <footer className="border-t border-line px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-cream-dim">Million Voice Choir</span>
          <span className="text-sm text-cream-dim">
            Every light on this page is a voice. One of them is yours.
          </span>
        </div>
      </footer>
    </main>
  )
}
