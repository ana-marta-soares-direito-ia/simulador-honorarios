const CACHE = "simulador-honorarios-20261029";
const FICHEIROS = [
  "./", "index.html", "manifest.webmanifest",
  "icone-192.png", "icone-512.png", "apple-touch-icon.png",
  "fonts/fraunces-600.woff2", "fonts/inter-400.woff2", "fonts/inter-500.woff2", "fonts/inter-600.woff2"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHEIROS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("simulador-honorarios-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== "GET") return;
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
