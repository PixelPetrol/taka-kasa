// TAKA KASA — service worker: praca offline po pierwszym uruchomieniu.
// Najpierw sieć (żeby nowa wersja z serwera wchodziła od razu), przy braku sieci — pamięć podręczna.
const CACHE = 'takakasa-caca067abd';
const ASSETS = ["./","./fonts/01f94d674d.woff2","./fonts/0b60bbe04e.woff2","./fonts/1404ca348b.woff2","./fonts/14f23757c6.woff2","./fonts/19f9c92546.woff2","./fonts/1a189eb997.woff2","./fonts/1c6486a3a5.woff2","./fonts/2317fa4bb2.woff2","./fonts/2addf2d86d.woff2","./fonts/308f763acd.woff2","./fonts/3c9dec1a3e.woff2","./fonts/3e6b22d217.woff2","./fonts/4052cc0b0f.woff2","./fonts/481dd0c01e.woff2","./fonts/4866787fc9.woff2","./fonts/4cc0d52e0f.woff2","./fonts/5bb66d8319.woff2","./fonts/684ad5b531.woff2","./fonts/6894439694.woff2","./fonts/6d72c2150c.woff2","./fonts/7569711939.woff2","./fonts/7cb4281a0c.woff2","./fonts/7f21d061a9.woff2","./fonts/824f485b5d.woff2","./fonts/8fa40e5d24.woff2","./fonts/97fbf7bd0b.woff2","./fonts/a4f562a288.woff2","./fonts/abf79b1a28.woff2","./fonts/b81cd55177.woff2","./fonts/cd88009990.woff2","./fonts/cedb374b05.woff2","./fonts/d39b60889a.woff2","./fonts/d8d0c88eea.woff2","./fonts/ec7769b089.woff2","./fonts/f2ab3c15c7.woff2","./ikona-192.png","./ikona-512.png","./ikona-maskable-512.png","./index.html","./js/01-piktogramy.50678bc646.js","./js/02-kasa-next-max-uklad.c590ef048f.js","./js/03-dane-demo-formatery-plain.e180a79a10.js","./js/04-dane-programowania-menu-programowanie.a82f12e624.js","./js/05-qrcode.18ae399f81.js","./js/06-dane-demonstracyjne-raportow-paragony.c5d7d17e64.js","./js/07-tweaks-panel-jsx.887b17b4fc.js","./js/08-wspolne-komponenty-ui.1f57bfad8f.js","./js/09-ekran-logowania.f9ebbdcb30.js","./js/10-panele-programowalnych-kafelkow-6.ef588c5264.js","./js/11-karta-towaru-nowy-edycja.4e3f5bb267.js","./js/12-widoki-lewej-strefy-klawiatura.ffb176f87f.js","./js/13-programowanie-formularz-arkusz-z.9f98c53b16.js","./js/14-programowanie-dane-sklepu-stopka.db5fbc02d2.js","./js/15-raporty-miesieczny-okresowy-kasjerskie.5bae4c14af.js","./js/16-novicloud-okno-komunikacji-log.56da9869f0.js","./js/17-menu-novicloud-administracja-programowanie.c41fb818a9.js","./js/18-prawa-strona-pasek-sumy.0f447bf661.js","./js/19-platnosc-razem-z-platnoscia.917f658490.js","./js/20-plan-sali-model-sale.6a91a2248d.js","./js/21-tryb-gastro-zakladka-gastro.5f0040c40f.js","./js/22-ekran-sprzedazy-logika-kasy.dedefdd51c.js","./js/23-root-ramka-urzadzenia-10.5b2f95a3e8.js","./js/react-dom.production.min.35f4f974f4.js","./js/react.production.min.d949f1c368.js","./manifest.json"];
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
