/* Paddock: funciona sin conexión y siempre busca la última versión.
   Sube el número de versión al cambiar la app. */
const CACHE = "paddock-v7";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./datos-iniciales.json",
  "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon-32.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE)
    .then((c) => Promise.all(ASSETS.map((a) => fetch(a, { cache: "no-store" }).then((r) => (r.ok ? c.put(a, r) : null)).catch(() => null))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.hostname === "api.anthropic.com") return;
  const own = url.origin === self.location.origin;
  if (req.mode === "navigate" || (own && /\.(html|json|webmanifest)$|\/$/.test(url.pathname))) {
    /* La app y sus datos: siempre de internet si hay conexión; si no, la copia guardada. */
    e.respondWith(fetch(req, { cache: "no-store" }).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req.mode === "navigate" ? "./index.html" : req, copy)); }
      return res;
    }).catch(() => caches.match(req.mode === "navigate" ? "./index.html" : req).then((hit) => hit || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok && (own || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com"))) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  })));
});
