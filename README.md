# Kaushal Diwakar — portfolio

A scroll-driven portfolio site styled like an editing suite:

1. A timecode loader, then a 3D hero where the camera flies through a tunnel of real video frames (three.js).
2. About text that lights up word by word, with animated stats.
3. **The reel**: a pinned horizontal gallery of featured work. Click a card to play it from Google Drive.
4. **More cuts**: a filterable grid (performance ads / AI video / social).
5. **Same script, two pipelines**: the "Without AI" and "With AI" edits side by side, plus the AI pipeline.
6. Services, then **the timeline**: career history as an NLE sequence with a scroll-driven playhead.
7. Toolkit marquee, Behance archive, contact, and a live IST clock.

No build step. Libraries come from CDNs: three.js, GSAP + ScrollTrigger, Lenis.

## Run locally

```bash
python -m http.server 5179
```

Then open http://localhost:5179 (it must be served over HTTP for the modules to load).

## Editing content

All videos, the Behance projects and the job history are data arrays at the top of `main.js`
(`FEATURED`, `CUTS`, `BEHANCE`, `JOBS`). To add a video:

1. In Drive, set the file to "Anyone with the link can view" and copy its file id (the part after `/file/d/`).
2. Save a thumbnail to `assets/thumbs/<name>.jpg`
   (`https://drive.google.com/thumbnail?id=<ID>&sz=w900` works for public files).
3. Add an entry to `FEATURED` or `CUTS`.

When you change `main.js` or `style.css`, bump the `?v=` number on their links in `index.html`.

## Files

- `index.html`, `style.css`, `main.js`
- `assets/thumbs/`: video frames (also used as the 3D hero textures)
- `assets/behance/`: Behance project covers
- `assets/Kaushal-Diwakar-Resume.pdf`: the resume behind the "Download resume" button
- `assets/og.jpg`: link preview image for LinkedIn/WhatsApp
