// TAKA KASA — service worker: praca offline po pierwszym uruchomieniu.
// Najpierw sieć (żeby nowa wersja z serwera wchodziła od razu), przy braku sieci — pamięć podręczna.
const CACHE = 'takakasa-4ec8fb4690';
const ASSETS = ["./","./fonts/19f9c92546.woff2","./fonts/1a189eb997.woff2","./fonts/2317fa4bb2.woff2","./fonts/4866787fc9.woff2","./fonts/5bb66d8319.woff2","./fonts/684ad5b531.woff2","./fonts/6894439694.woff2","./fonts/824f485b5d.woff2","./fonts/8fa40e5d24.woff2","./fonts/cd88009990.woff2","./fonts/d39b60889a.woff2","./ikona-192.png","./ikona-512.png","./ikona-maskable-512.png","./index.html","./js/01-piktogramy.50678bc646.js","./js/02-dane-demo-formatery-plain.231309eb7c.js","./js/03-tweaks-panel-jsx.887b17b4fc.js","./js/04-wspolne-komponenty-ui.eb7260f169.js","./js/05-ekran-logowania.f81cac53f2.js","./js/06-panele-programowalnych-kafelkow-6.389fd06b3e.js","./js/07-karta-towaru-nowy-edycja.0f50c494da.js","./js/08-widoki-lewej-strefy-klawiatura.682ef79317.js","./js/09-menu-novicloud-administracja-programowanie.6df032e925.js","./js/10-prawa-strona-pasek-sumy.267d58ad1c.js","./js/11-platnosc-razem-z-platnoscia.8827d2563b.js","./js/12-plan-sali-model-sale.c7e1190452.js","./js/13-tryb-gastro-zakladka-gastro.126d72a4a0.js","./js/14-ekran-sprzedazy-logika-kasy.09348248d5.js","./js/15-root-ramka-urzadzenia-10.e9a8283121.js","./js/react-dom.production.min.35f4f974f4.js","./js/react.production.min.d949f1c368.js","./manifest.json"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Strona i manifest zawsze z serwera, z pominięciem pamięci HTTP (nowa wersja od razu)
const swieza = (req) => {
  const p = new URL(req.url).pathname;
  return (req.mode === 'navigate' || /\/$|\.html$|\.json$/.test(p)) ? new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : req;
};
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (new URL(req.url).pathname.endsWith('.apk')) return; // APK prosto z serwera, bez pamięci podręcznej
  e.respondWith(
    fetch(swieza(req)).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
  );
});
