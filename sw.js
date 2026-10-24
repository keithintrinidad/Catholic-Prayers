/* Prayers for Catholics – service worker.
   Change VERSION whenever any file changes so installed copies update. */
const VERSION = "pfc-v3.4";
// All the apps share one origin (keithintrinidad.github.io) and so one pool of caches:
// only ever remove this app's own old caches, never another app's.
const CACHE_PREFIX = "pfc-";

// The app cannot open offline without these, so installation waits for them.
const CORE = ["./", "index.html"];

// Nice to have. If you change one of these files, give it a new file name,
// because files already saved are reused rather than downloaded again.
// Each is fetched on its own, so one slow or failed file on a
// weak connection no longer stops the whole offline copy from being saved.
const EXTRAS = [
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "fonts/cormorant-garamond-latin-500-normal.woff2",
  "fonts/cormorant-garamond-latin-500-italic.woff2",
  "fonts/cormorant-garamond-latin-600-normal.woff2",
  "fonts/spectral-latin-400-normal.woff2",
  "fonts/spectral-latin-400-italic.woff2",
  "fonts/spectral-latin-600-normal.woff2"
];

// How long to wait for the network when there is no saved copy to fall back on.
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Copy files the previous version already saved, so an update on a weak
    // connection only has to download what actually changed.
    const old = (await caches.keys()).filter(k => k.startsWith(CACHE_PREFIX) && k !== VERSION);
    for (const key of old) {
      const oldCache = await caches.open(key);
      for (const path of EXTRAS) {
        const hit = await oldCache.match(path);
        if (hit) await cache.put(path, hit);
      }
    }
    await cache.addAll(CORE);
    await Promise.all(EXTRAS.map(async path => {
      if (await cache.match(path)) return;
      try { await cache.add(path); } catch (err) { /* fetched later, on first use */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Lets the About page show which offline copy the phone is running.
self.addEventListener("message", e => {
  if (e.data === "version" && e.source) e.source.postMessage({ version: VERSION });
});

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))
  ]);
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  // Pages: open straight from the saved copy and refresh it quietly in the background.
  if (req.mode === "navigate") {
    const refresh = fetch(req).then(async res => {
      if (res.ok && !res.redirected) {
        const cache = await caches.open(VERSION);
        await cache.put("index.html", res.clone());
      }
      return res;
    });
    e.waitUntil(refresh.catch(() => {}));
    e.respondWith((async () => {
      const saved = await caches.match("index.html", { ignoreSearch: true });
      if (saved) return saved;
      try { return await withTimeout(refresh, NETWORK_TIMEOUT_MS); }
      catch (err) { return (await caches.match("./")) || Response.error(); }
    })());
    return;
  }

  // Icons, fonts and other files: saved copy first; anything missing is
  // fetched and saved the first time it is needed.
  e.respondWith((async () => {
    const saved = await caches.match(req, { ignoreSearch: true });
    if (saved) return saved;
    const res = await fetch(req);
    if (res.ok) {
      const copy = res.clone();
      e.waitUntil(caches.open(VERSION).then(c => c.put(req, copy)));
    }
    return res;
  })());
});
