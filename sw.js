const CACHE = "ps-hub-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./index.html","./css/style.css"]))); });
self.addEventListener("fetch", (e) => { e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); });

