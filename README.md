# Million Voice Choir

Landing page for the Million Voice Choir — everyone records themselves singing
along to one shared song, and every take joins a single world-sized choir.

Built with [TanStack Start](https://tanstack.com/start), React 19, and
Tailwind CSS v4. Deploys to Vercel or Netlify via the Nitro adapter.

## Develop

```bash
nix develop        # or direnv allow — provides node 22, pnpm, gh
pnpm install
pnpm dev           # http://localhost:3000
```

## Build

```bash
pnpm build         # outputs .output/ (Nitro server + static client)
node .output/server/index.mjs   # serve the production build locally
```

## Content

- **Guide track** — drop the audio at `public/media/guide-track.mp3`; the
  front-page player and download button pick it up automatically. Until then
  the player shows a "not up yet" message.
- **Uploads** — `src/components/UploadDrop.tsx` owns the upload UI. The single
  seam for wiring a storage provider (Google Drive, Dropbox, S3, …) is the
  `uploadFile(file, onProgress)` function at the top of that file; it currently
  simulates progress so the flow is testable.

## Structure

- `src/routes/index.tsx` — the landing page (hero, steps, guide track, upload)
- `src/components/VoiceWall.tsx` — the animated canvas of lights behind the hero
- `src/components/GuideTrack.tsx` — audio player + download
- `src/components/UploadDrop.tsx` — drag-and-drop video upload
- `src/styles.css` — theme tokens (palette + type)
