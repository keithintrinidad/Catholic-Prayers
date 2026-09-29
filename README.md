# Prayers for Catholics – PWA

Parish of the Assumption prayer app. Static files only: no build step, no server code.

## What's in the package

| File | Purpose |
|---|---|
| `index.html` | The app (26 prayers, search, stars, text size, light/dark) |
| `manifest.webmanifest` | Name, colours and icons used when installed |
| `sw.js` | Service worker: caches everything so the app works offline |
| `icons/` | App icons (192, 512, maskable 512, Apple touch, favicon) |
| `fonts/` | Cormorant Garamond and Spectral, self-hosted (SIL OFL licences included) |

## Deploying

Upload the folder contents as-is to any static host that serves **HTTPS** (service workers require it). All paths are relative, so it works at a domain root or in a subfolder.

- **Netlify:** drag the unzipped folder onto app.netlify.com/drop.
- **Cloudflare Pages:** Create project → Direct upload → select the folder.
- **GitHub Pages:** push the files to a repo, then Settings → Pages → deploy from the main branch.
- **Existing site:** copy into a subfolder, e.g. `/prayers/`.

## Installing on a phone

- **Android (Chrome):** open the link → menu → *Install app* / *Add to Home screen*.
- **iPhone (Safari):** open the link → Share → *Add to Home Screen*.

After the first visit the app works fully offline.

## Updating the app

1. Edit `index.html` (prayers live in the `PRAYERS` array near the bottom).
2. In `sw.js`, change `VERSION` (e.g. `pfc-v1` → `pfc-v2`). Do this every release or installed copies may keep the old files.
3. Upload the changed files. Users get the update the next time they open the app while online.

## Testing locally

Service workers need `https://` or `localhost`, so opening the file directly won't register it:

```
python3 -m http.server 8080
```

then visit http://localhost:8080.
