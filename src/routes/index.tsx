import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Smartphone } from 'lucide-react'

import { DominicanFlag } from '#/components/DominicanFlag'
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
            the children of the Dominican Republic{' '}
            <DominicanFlag className="inline-block size-[1.1em] align-[-0.15em]" />
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

      {/* It's easy */}
      <section className="mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-10 sm:py-20">
        <motion.div {...fadeUp}>
          <p className="text-sm font-medium tracking-wide text-gold uppercase">
            It's easy
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-display text-2xl leading-snug text-cream sm:text-4xl">
            Learn the segment below, press record on your phone, sing your
            heart out, and send it in.{' '}
            <em className="text-gold italic">That's the whole thing.</em>
          </p>
        </motion.div>
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

        {/* Lyrics */}
        <motion.div
          {...fadeUp}
          className="mt-8 rounded-2xl border border-line bg-stage p-7 sm:p-10"
        >
          <p className="text-sm font-medium tracking-wide text-gold uppercase">
            Lyrics
          </p>
          <p className="mt-4 font-display text-base text-cream-dim italic">
            Clap along during the instrumental
          </p>
          <div className="mt-8">
            <p className="text-xs font-medium tracking-widest text-gold uppercase">
              Bridge
            </p>
            <p className="mt-3 font-display text-lg leading-relaxed text-cream sm:text-xl">
              El Artista Eres Tú{' '}
              <span className="text-base text-cream-dim">× 3</span>
            </p>
          </div>
          <div className="mt-8">
            <p className="text-xs font-medium tracking-widest text-gold uppercase">
              Chorus
            </p>
            <p className="mt-3 font-display text-lg leading-relaxed text-cream sm:text-xl">
              El artista eres tú, Señor
              <br />
              Tú eres el artista
              <br />
              Gran poeta, gran escritor
              <br />
              Pintor y concertista
              <br />
              De toda obra eres autor
              <br />
              Con tu mente infinita
              <br />
              El Artista eres tú, Señor
            </p>
          </div>
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
          <span className="inline-flex items-center gap-2 font-display text-cream-dim">
            Million Voice Choir · for Casa Segura
            <DominicanFlag className="size-4" />
          </span>
          <span className="text-sm text-cream-dim">
            Every light on this page is a voice. One of them is yours.
          </span>
        </div>
      </footer>
    </main>
  )
}
