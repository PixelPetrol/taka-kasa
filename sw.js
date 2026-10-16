// TAKA KASA — service worker: praca offline po pierwszym uruchomieniu.
// Najpierw sieć (żeby nowa wersja z serwera wchodziła od razu), przy braku sieci — pamięć podręczna.
const CACHE = 'takakasa-79f3584d72';
const ASSETS = ["./","./fonts/19f9c92546.woff2","./fonts/1a189eb997.woff2","./fonts/2317fa4bb2.woff2","./fonts/4866787fc9.woff2","./fonts/5bb66d8319.woff2","./fonts/684ad5b531.woff2","./fonts/6894439694.woff2","./fonts/824f485b5d.woff2","./fonts/8fa40e5d24.woff2","./fonts/cd88009990.woff2","./fonts/d39b60889a.woff2","./ikona-192.png","./ikona-512.png","./ikona-maskable-512.png","./index.html","./js/01-piktogramy.50678bc646.js","./js/02-dane-demo-formatery-plain.a21dadc067.js","./js/03-dane-programowania-menu-programowanie.dfcb62d8a7.js","./js/04-qrcode.18ae399f81.js","./js/05-dane-demonstracyjne-raportow-paragony.5d7dceed6c.js","./js/06-tweaks-panel-jsx.887b17b4fc.js","./js/07-wspolne-komponenty-ui.808b3c7baa.js","./js/08-ekran-logowania.4a85577634.js","./js/09-panele-programowalnych-kafelkow-6.f4cf255814.js","./js/10-karta-towaru-nowy-edycja.45d81933d6.js","./js/11-widoki-lewej-strefy-klawiatura.33745a8355.js","./js/12-programowanie-formularz-arkusz-z.22983b5f8f.js","./js/13-programowanie-dane-sklepu-stopka.dfe6aab3a1.js","./js/14-raporty-miesieczny-okresowy-kasjerskie.d72fd82681.js","./js/15-novicloud-okno-komunikacji-log.4a8b0bdcfb.js","./js/16-menu-novicloud-administracja-programowanie.70c107cdc4.js","./js/17-prawa-strona-pasek-sumy.267d58ad1c.js","./js/18-platnosc-razem-z-platnoscia.0740acb58f.js","./js/19-plan-sali-model-sale.830a2a1235.js","./js/20-tryb-gastro-zakladka-gastro.aa14ccdbc3.js","./js/21-ekran-sprzedazy-logika-kasy.b4921ab906.js","./js/22-root-ramka-urzadzenia-10.55bdc76413.js","./js/react-dom.production.min.35f4f974f4.js","./js/react.production.min.d949f1c368.js","./manifest.json"];
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
