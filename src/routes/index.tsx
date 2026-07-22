import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Headphones, HeartHandshake, Smartphone, Upload, Video } from 'lucide-react'

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
    body: 'Play the guide video below until the melody sits in your ear. Download it so you can sing with it anywhere.',
  },
  {
    icon: Video,
    title: 'Record',
    body: 'Film yourself singing along — your phone camera is perfect. Wear headphones or let the track play out loud; both work.',
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
              'linear-gradient(to bottom, var(--color-ink) 0%, transparent 30%, transparent 55%, var(--color-ink) 100%)',
          }}
        />

        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-6">
          <span className="font-display text-base tracking-wide text-cream sm:text-lg">
            Million Voice Choir
          </span>
          <a
            href="#join"
            className="rounded-full border border-line px-4 py-2 text-sm text-cream transition hover:border-gold hover:text-gold"
          >
            Add your voice
          </a>
        </header>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-20 text-center sm:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl font-display text-[2.75rem] leading-[1.05] font-medium text-cream sm:text-7xl md:text-8xl"
          >
            A million voices,
            <br />
            <em className="font-light text-gold italic">singing one song.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-base text-cream-dim sm:text-lg"
          >
            Record yourself singing along to one shared song, right on your
            phone. Every take joins a single, world-sized choir — and supports
            the children of the Dominican Republic. 🇩🇴
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#join"
              className="rounded-full bg-gold px-8 py-3.5 font-medium text-ink transition hover:bg-gold-soft"
            >
              Add your voice
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-cream-dim">
              <Smartphone className="size-4 text-gold" />
              All you need is your smartphone
            </span>
          </motion.div>
        </div>
      </section>

      {/* The cause */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-10 sm:py-20">
        <motion.div
          {...fadeUp}
          className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-stage p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10"
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-stage-soft text-3xl sm:size-16">
            🇩🇴
          </span>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-gold uppercase">
              <HeartHandshake className="size-4" />
              Sing for Casa Segura
            </p>
            <p className="mt-2 max-w-3xl font-display text-xl leading-snug text-cream sm:text-2xl">
              Just by joining us in this song, you're supporting Casa Segura
              and helping the children of the Dominican Republic.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How it works — a real sequence, so the numbers mean something */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-10 sm:py-20">
        <motion.div {...fadeUp}>
          <p className="text-sm font-medium tracking-wide text-gold uppercase">
            It's easy
          </p>
          <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
            How your voice gets in
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.12 }}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-stage p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-stage-soft text-gold">
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
      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-10 sm:py-20">
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
      <section
        id="join"
        className="mx-auto w-full max-w-5xl scroll-mt-12 px-5 py-16 sm:px-10 sm:py-20"
      >
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

      <footer className="border-t border-line px-5 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <span className="font-display text-cream-dim">
            Million Voice Choir · for Casa Segura 🇩🇴
          </span>
          <span className="text-sm text-cream-dim">
            Every light on this page is a voice. One of them is yours.
          </span>
        </div>
      </footer>
    </main>
  )
}
