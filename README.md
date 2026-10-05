# Prayers for Catholics – PWA

**▶ Open the app:** [https://keithintrinidad.github.io/Catholic-Prayers/](https://keithintrinidad.github.io/Catholic-Prayers/)  
Install it from your phone's browser menu to use it offline.

A companion for everyday Catholic prayer in English. It holds a growing collection of traditional prayers, works offline once installed, and runs entirely in the browser as static files: no build step, no server code.

## About this app

This app was built by **Claude**, an AI model created by **Anthropic**, using material provided to it and under the guidance of **Keith Francis** ([keithintrinidad](https://github.com/keithintrinidad)).

- **Source material.** The starting point was the *Prayers for Catholics* leaflet of the **Parish of the Assumption**, supplied by Keith Francis. All 15 of its prayers are included, with small corrections, and the Angelus has its standard closing versicle restored.
- **Additions.** Eleven traditional prayers have since been added at his direction, and the collection will continue to grow beyond the original leaflet: the Morning Offering, Guardian Angel Prayer, Acts of Faith, Hope and Love, Regina Caeli, Fatima Prayer, Prayer to St. Michael, Graces before and after Meals, Eternal Rest, and the Act of Spiritual Communion.
- **Design and build.** Keith Francis directed the app's content, features, and packaging through conversation with Claude, but did not write the code directly.

It is a companion to [Rosary Helper](https://keithintrinidad.github.io/rosary-helper/) ([repo](https://github.com/keithintrinidad/Rosary-Helper)) and [Bread of the Presence](https://keithintrinidad.github.io/Bread-of-the-Presence/) ([repo](https://github.com/keithintrinidad/Bread-of-the-Presence)), made the same way.

## What's in the package

| File | Purpose |
|---|---|
| `index.html` | The app (prayers, search, stars, text size, light/dark, About page with credits and licence) |
| `manifest.webmanifest` | Name, colours and icons used when installed |
| `sw.js` | Service worker: caches everything so the app works offline |
| `icons/` | App icons (192, 512, maskable 512, Apple touch, favicon) |
| `fonts/` | Cormorant Garamond and Spectral, self-hosted (SIL OFL licences included) |
| `LICENSE.md` | The terms this project is shared under (see below) |

## Deploying

Upload the folder contents as-is to any static host that serves **HTTPS** (service workers require it). All paths are relative, so it works at a domain root or in a subfolder.

- **Netlify:** drag the unzipped folder onto app.netlify.com/drop.
- **Cloudflare Pages:** Create project → Direct upload → select the folder.
- **GitHub Pages:** push the files to the repo root, then Settings → Pages → deploy from the `main` branch, root folder. For this repo the app is at [https://keithintrinidad.github.io/Catholic-Prayers/](https://keithintrinidad.github.io/Catholic-Prayers/).
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

## License & authorship

[Prayers for Catholics](https://keithintrinidad.github.io/Catholic-Prayers/) ([repo](https://github.com/keithintrinidad/Catholic-Prayers)) is free to share and adapt, but never to sell, and any version made from it must stay free too. It is licensed under **CC BY-NC-SA 4.0**.

It was built by Claude (Anthropic) using material provided by, and under the guidance of, **Keith Francis** (keithintrinidad). Any copy or derivative must keep that credit. The prayer texts themselves are traditional, and the fonts carry their own SIL Open Font License. Full terms are in `LICENSE.md`.
