// TAKA KASA — service worker: praca offline po pierwszym uruchomieniu.
// Najpierw sieć (żeby nowa wersja z serwera wchodziła od razu), przy braku sieci — pamięć podręczna.
const CACHE = 'takakasa-3e5bfb2071';
const ASSETS = ["./","./fonts/19f9c92546aa.woff2","./fonts/1a189eb997c3.woff2","./fonts/2317fa4bb293.woff2","./fonts/4866787fc952.woff2","./fonts/5bb66d8319ba.woff2","./fonts/684ad5b531f8.woff2","./fonts/689443969494.woff2","./fonts/824f485b5d26.woff2","./fonts/8fa40e5d2482.woff2","./fonts/cd8800999070.woff2","./fonts/d39b60889a94.woff2","./ikona-192.png","./ikona-512.png","./ikona-maskable-512.png","./index.html","./js/01-piktogramy.js","./js/02-dane-demo-formatery-plain.js","./js/03-tweaks-panel-jsx.js","./js/04-wspolne-komponenty-ui.js","./js/05-ekran-logowania.js","./js/06-panele-programowalnych-kafelkow-6.js","./js/07-widoki-lewej-strefy-klawiatura.js","./js/08-menu-novicloud-administracja-programowanie.js","./js/09-prawa-strona-pasek-sumy.js","./js/10-platnosc-razem-z-platnoscia.js","./js/11-ekran-sprzedazy-logika-kasy.js","./js/12-root-ramka-urzadzenia-10.js","./js/react-dom.production.min.js","./js/react.production.min.js","./manifest.json"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (new URL(req.url).pathname.endsWith('.apk')) return; // APK prosto z serwera, bez pamięci podręcznej
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
  );
});
