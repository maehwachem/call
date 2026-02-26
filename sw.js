const CACHE_NAME = "attend-pwa-v3"; // ← 숫자 올리기(중요)
const ASSETS = [
  "/call/?home=1",
  "/call/",
  "/call/index.html",
  "/call/manifest.webmanifest",
  "/call/icon-192.png",
  "/call/icon-512.png",
  "/call/sw.js"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
