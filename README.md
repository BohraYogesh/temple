# Wedding Invitation – React + Vite + Tailwind

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
Requires Node 18+.

## Reuse for a new client
1. Edit **`src/weddingConfig.js`** – names, date, events, venue, RSVP WhatsApp number, story, theme colors, texts.
2. Replace images in **`public/images/`** keeping the same file names (or change the paths in the config):
   `hero.jpg`, `venue-bg.jpg`, `couple-frame.jpg`, `footer-temple.jpg`, `event-1.jpg` … `event-4.jpg`.
   Missing/broken images show a themed placeholder automatically.
3. Optional music: put `music.mp3` in `public/audio/`. If absent, the play button hides itself.
4. Add or remove events by editing the `events` array – the carousel adapts.

## Notes
- The starter images are cropped from your reference screenshot, so they are low resolution. Replace them with high-quality artwork for production.
- RSVP opens a pre-filled WhatsApp message to `rsvp.whatsappNumber`.
- Fonts load from Google Fonts (Cinzel, Great Vibes, Cormorant Garamond, Poppins).
- Deploy `dist/` to Netlify, Vercel or any static host.

## Structure
```
src/weddingConfig.js   all content & theme
src/components/        Hero, Invite, Events, Venue, Story, Rsvp, Social, Countdown, SmartImage, Reveal
public/images/         replaceable images
```
