// TAKA KASA — service worker: praca offline po pierwszym uruchomieniu.
// Najpierw sieć (żeby nowa wersja z serwera wchodziła od razu), przy braku sieci — pamięć podręczna.
const CACHE = 'takakasa-c9e7014008';
const ASSETS = ["./","./fonts/01f94d674d.woff2","./fonts/0b60bbe04e.woff2","./fonts/1404ca348b.woff2","./fonts/14f23757c6.woff2","./fonts/19f9c92546.woff2","./fonts/1a189eb997.woff2","./fonts/1c6486a3a5.woff2","./fonts/2317fa4bb2.woff2","./fonts/2addf2d86d.woff2","./fonts/308f763acd.woff2","./fonts/3c9dec1a3e.woff2","./fonts/3e6b22d217.woff2","./fonts/4052cc0b0f.woff2","./fonts/481dd0c01e.woff2","./fonts/4866787fc9.woff2","./fonts/4cc0d52e0f.woff2","./fonts/5bb66d8319.woff2","./fonts/684ad5b531.woff2","./fonts/6894439694.woff2","./fonts/6d72c2150c.woff2","./fonts/7569711939.woff2","./fonts/7cb4281a0c.woff2","./fonts/7f21d061a9.woff2","./fonts/824f485b5d.woff2","./fonts/8fa40e5d24.woff2","./fonts/97fbf7bd0b.woff2","./fonts/a4f562a288.woff2","./fonts/abf79b1a28.woff2","./fonts/b81cd55177.woff2","./fonts/cd88009990.woff2","./fonts/cedb374b05.woff2","./fonts/d39b60889a.woff2","./fonts/d8d0c88eea.woff2","./fonts/ec7769b089.woff2","./fonts/f2ab3c15c7.woff2","./ikona-192.png","./ikona-512.png","./ikona-maskable-512.png","./index.html","./js/01-piktogramy.50678bc646.js","./js/02-dane-demo-formatery-plain.a502cd36a5.js","./js/03-dane-programowania-menu-programowanie.5aebc2d3b5.js","./js/04-qrcode.18ae399f81.js","./js/05-dane-demonstracyjne-raportow-paragony.c5d7d17e64.js","./js/06-tweaks-panel-jsx.887b17b4fc.js","./js/07-wspolne-komponenty-ui.de52d01f9c.js","./js/08-ekran-logowania.f9ebbdcb30.js","./js/09-panele-programowalnych-kafelkow-6.620006dc86.js","./js/10-karta-towaru-nowy-edycja.6a210ea375.js","./js/11-widoki-lewej-strefy-klawiatura.4100f56f3c.js","./js/12-programowanie-formularz-arkusz-z.ea7da5e99f.js","./js/13-programowanie-dane-sklepu-stopka.04ee8e581e.js","./js/14-raporty-miesieczny-okresowy-kasjerskie.eb1dee3c45.js","./js/15-novicloud-okno-komunikacji-log.33fa79e138.js","./js/16-menu-novicloud-administracja-programowanie.acbb101e27.js","./js/17-prawa-strona-pasek-sumy.9bab9097da.js","./js/18-platnosc-razem-z-platnoscia.3ede026c34.js","./js/19-plan-sali-model-sale.6a91a2248d.js","./js/20-tryb-gastro-zakladka-gastro.5f0040c40f.js","./js/21-ekran-sprzedazy-logika-kasy.7a2cc51163.js","./js/22-root-ramka-urzadzenia-10.d8a09a1bee.js","./js/react-dom.production.min.35f4f974f4.js","./js/react.production.min.d949f1c368.js","./manifest.json"];
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
