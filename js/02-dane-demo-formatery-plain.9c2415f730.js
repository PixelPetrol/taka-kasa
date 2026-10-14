/* TAKA KASA — dane demo + formatery (plain JS) */
(function () {
  // Marka: domyślnie TAKA KASA; w paczkach można podmienić przez <meta name="np-brand" content="TAKA|KASA">
  const bm = document.querySelector('meta[name="np-brand"]');
  const [ba, bb] = bm ? bm.content.split('|') : ['NEXT', 'PRO'];
  window.NP_BRAND = { a: ba, b: bb, full: bm ? ba + ' ' + bb : 'TAKA KASA' };
  if (bm) {
    document.title = window.NP_BRAND.full;
    const pl = document.querySelector('.np-preload .np-logo');
    if (pl) pl.innerHTML = ba + '<b>' + bb + '</b>';
  }
  const ean13 = (b) => { let s = 0; for (let i = 0; i < 12; i++) s += (+b[i]) * (i % 2 ? 3 : 1); return b + ((10 - (s % 10)) % 10); };
  const VAT = { A: '23%', B: '8%', C: '5%', Z: '—' };
  const GROUPS = [
    { id: 'pieczywo', label: 'Pieczywo', icon: 'croissant' },
    { id: 'nabial', label: 'Nabiał', icon: 'milk' },
    { id: 'napoje', label: 'Napoje', icon: 'cup-soda' },
    { id: 'warzywa', label: 'Warzywa i owoce', icon: 'carrot' },
    { id: 'slodycze', label: 'Słodycze', icon: 'candy' },
    { id: 'spozywcze', label: 'Spożywcze', icon: 'wheat' },
    { id: 'mieso', label: 'Mięso i wędliny', icon: 'ham' },
    { id: 'chemia', label: 'Chemia i dom', icon: 'spray-can' },
    { id: 'kaucje', label: 'Kaucje', icon: 'recycle' },
  ];
  // [PLU, nazwa, cena, VAT, grupa, j.m., ikona]
  const RAW = [
    [1, 'Chleb wiejski 500 g', 4.99, 'C', 'pieczywo', 'szt', 'wheat'],
    [2, 'Chleb żytni razowy 600 g', 6.49, 'C', 'pieczywo', 'szt', 'wheat'],
    [3, 'Bułka kajzerka', 0.79, 'C', 'pieczywo', 'szt', 'croissant'],
    [4, 'Bagietka francuska', 3.99, 'C', 'pieczywo', 'szt', 'wheat'],
    [5, 'Rogal maślany', 2.49, 'C', 'pieczywo', 'szt', 'croissant'],
    [6, 'Chałka z kruszonką', 5.99, 'C', 'pieczywo', 'szt', 'cake-slice'],
    [7, 'Pączek z różą', 2.99, 'C', 'pieczywo', 'szt', 'donut'],
    [10, 'Mleko 2% 1 l', 3.49, 'C', 'nabial', 'szt', 'milk'],
    [11, 'Masło ekstra 200 g', 7.99, 'C', 'nabial', 'szt', 'milk'],
    [12, 'Jogurt naturalny 400 g', 3.29, 'C', 'nabial', 'szt', 'milk'],
    [13, 'Ser gouda', 34.9, 'C', 'nabial', 'kg', 'milk'],
    [14, 'Jajka M 10 szt.', 11.99, 'C', 'nabial', 'szt', 'egg'],
    [15, 'Śmietana 18% 400 g', 4.59, 'C', 'nabial', 'szt', 'milk'],
    [16, 'Twaróg półtłusty 250 g', 4.29, 'C', 'nabial', 'szt', 'milk'],
    [17, 'Kefir 1 l', 4.19, 'C', 'nabial', 'szt', 'milk'],
    [20, 'Woda mineralna gazowana 1,5 l', 2.19, 'C', 'napoje', 'szt', 'droplets'],
    [21, 'Woda niegazowana 0,5 l', 1.49, 'C', 'napoje', 'szt', 'glass-water'],
    [22, 'Sok pomarańczowy 100% 1 l', 6.99, 'C', 'napoje', 'szt', 'citrus'],
    [23, 'Napój energetyczny 250 ml', 5.99, 'A', 'napoje', 'szt', 'cup-soda'],
    [24, 'Cola 0,5 l', 4.49, 'A', 'napoje', 'szt', 'cup-soda'],
    [25, 'Herbata mrożona brzoskwinia 0,5 l', 3.99, 'A', 'napoje', 'szt', 'cup-soda'],
    [26, 'Piwo jasne pełne 0,5 l', 3.79, 'A', 'napoje', 'szt', 'beer'],
    [27, 'Wino czerwone wytrawne 0,75 l', 24.99, 'A', 'napoje', 'szt', 'wine'],
    [28, 'Wódka czysta 0,5 l', 32.99, 'A', 'napoje', 'szt', 'martini'],
    [30, 'Banany', 5.99, 'C', 'warzywa', 'kg', 'banana'],
    [31, 'Jabłka Ligol', 3.49, 'C', 'warzywa', 'kg', 'apple'],
    [32, 'Pomidory malinowe', 12.99, 'C', 'warzywa', 'kg', 'salad'],
    [33, 'Ogórki gruntowe', 6.99, 'C', 'warzywa', 'kg', 'leafy-green'],
    [34, 'Ziemniaki młode', 2.49, 'C', 'warzywa', 'kg', 'sprout'],
    [35, 'Cytryny', 8.99, 'C', 'warzywa', 'kg', 'citrus'],
    [36, 'Pomidorki koktajlowe 500 g', 7.44, 'C', 'warzywa', 'szt', 'cherry'],
    [37, 'Marchew', 2.99, 'C', 'warzywa', 'kg', 'carrot'],
    [38, 'Winogrona białe', 14.99, 'C', 'warzywa', 'kg', 'grape'],
    [39, 'Brokuł', 4.99, 'C', 'warzywa', 'szt', 'broccoli'],
    [40, 'Baton czekoladowy 40 g', 2.79, 'C', 'slodycze', 'szt', 'candy'],
    [41, 'Czekolada mleczna 100 g', 4.99, 'C', 'slodycze', 'szt', 'candy'],
    [42, 'Ciastka maślane 200 g', 6.49, 'C', 'slodycze', 'szt', 'cookie'],
    [43, 'Żelki owocowe 175 g', 4.29, 'C', 'slodycze', 'szt', 'candy'],
    [44, 'Wafelek 50 g', 1.99, 'C', 'slodycze', 'szt', 'cookie'],
    [45, 'Lody waniliowe 500 ml', 12.99, 'C', 'slodycze', 'szt', 'ice-cream-cone'],
    [50, 'Kawa ziarnista arabica 250 g', 24.99, 'C', 'spozywcze', 'szt', 'coffee'],
    [51, 'Herbata czarna 100 torebek', 12.99, 'C', 'spozywcze', 'szt', 'leaf'],
    [52, 'Makaron spaghetti 500 g', 4.49, 'C', 'spozywcze', 'szt', 'wheat'],
    [53, 'Ryż biały 1 kg', 5.99, 'C', 'spozywcze', 'szt', 'wheat'],
    [54, 'Mąka pszenna typ 450 1 kg', 3.29, 'C', 'spozywcze', 'szt', 'wheat'],
    [55, 'Cukier biały 1 kg', 4.49, 'C', 'spozywcze', 'szt', 'package'],
    [56, 'Sól himalajska 500 g', 9.99, 'C', 'spozywcze', 'szt', 'package'],
    [57, 'Olej rzepakowy 1 l', 8.99, 'C', 'spozywcze', 'szt', 'droplet'],
    [60, 'Szynka konserwowa', 39.9, 'C', 'mieso', 'kg', 'ham'],
    [61, 'Kiełbasa śląska', 24.9, 'C', 'mieso', 'kg', 'beef'],
    [62, 'Filet z kurczaka', 26.99, 'C', 'mieso', 'kg', 'drumstick'],
    [63, 'Parówki wieprzowe 250 g', 6.99, 'C', 'mieso', 'szt', 'beef'],
    [64, 'Łosoś wędzony 100 g', 9.99, 'C', 'mieso', 'szt', 'fish'],
    [70, 'Płyn do naczyń 500 ml', 5.99, 'A', 'chemia', 'szt', 'bubbles'],
    [71, 'Papier toaletowy 8 rolek', 14.99, 'A', 'chemia', 'szt', 'house'],
    [72, 'Mydło w płynie 500 ml', 7.49, 'A', 'chemia', 'szt', 'hand'],
    [73, 'Proszek do prania 1,5 kg', 24.99, 'A', 'chemia', 'szt', 'washing-machine'],
    [74, 'Reklamówka', 1.0, 'A', 'chemia', 'szt', 'shopping-bag'],
    [80, 'Kaucja — butelka PET', 0.5, 'Z', 'kaucje', 'szt', 'recycle'],
    [81, 'Kaucja — puszka', 0.5, 'Z', 'kaucje', 'szt', 'recycle'],
    [82, 'Kaucja — butelka szklana', 1.0, 'Z', 'kaucje', 'szt', 'recycle'],
  ];
  const PRODUCTS = RAW.map(([plu, name, price, vat, group, unit, icon]) => ({
    plu: String(plu), ean: ean13('5904811' + String(plu).padStart(5, '0')), name, price, vat, group, unit, icon,
  }));

  // ── Baza towarów (edytowalna, zapis w localStorage: nextpro.products) ──
  const PRODUCT_TYPES = ['Towar', 'Opakowanie', 'Usługa', 'Doładowanie', 'Paliwo', 'Winietka', 'Zestaw', 'Receptura'];
  const PRICE_MODES = ['Otwarta', 'Zamknięta', 'Tylko w górę', 'Tylko w dół'];
  const GTU = ['(brak)'].concat(Array.from({ length: 13 }, (_, i) => 'GTU_' + String(i + 1).padStart(2, '0')));
  const UNITS = ['szt', 'kg', 'l', 'm', 'opak'];
  const UNIT_PREC = { szt: 1, kg: 0.001, l: 0.001, m: 0.01, opak: 1 };
  const PRECS = [['jm', 'zdefiniowana w jednostce miary'], ['1', '1 — tylko całe sztuki'], ['0.1', '0,1'], ['0.01', '0,01'], ['0.001', '0,001 — towar na wagę']];
  const withDefaults = (p) => Object.assign({
    priceH: '', priceN: '', priceD: '', type: p.group === 'kaucje' ? 'Opakowanie' : 'Towar', priceMode: 'Otwarta', pkwiu: '', gtu: '(brak)',
    prec: 'jm', pack: null, packN: 1, desc: ['', '', '', '', ''], printers: { kasa: false, e1: false, e2: false, e3: false }, attrs: '', stock: 0,
    excise: p.group === 'napoje' && /piwo|wino|wódka/i.test(p.name), weighed: p.unit === 'kg', mpp: false, active: true,
  }, p);
  try {
    const st = JSON.parse(localStorage.getItem('nextpro.products') || 'null');
    if (Array.isArray(st) && st.length) { const base = PRODUCTS.slice(); PRODUCTS.length = 0; st.forEach((p) => PRODUCTS.push(p)); base.forEach((b) => { if (!st.some((x) => x.plu === b.plu)) PRODUCTS.push(b); }); }
  } catch (e) {}
  for (let i = 0; i < PRODUCTS.length; i++) PRODUCTS[i] = withDefaults(PRODUCTS[i]);
  // piktogramy asortymentów ustawione przez użytkownika
  try { const gi = JSON.parse(localStorage.getItem('nextpro.groupIcons') || '{}') || {}; GROUPS.forEach((g) => { if (gi[g.id]) g.icon = gi[g.id]; }); } catch (e) {}
  const BY = {};
  const reindex = () => { Object.keys(BY).forEach((k) => delete BY[k]); PRODUCTS.forEach((p) => { BY[p.plu] = p; }); };
  reindex();
  let ver = 0;
  const NP_DB = {
    get: (plu) => BY[plu],
    all: () => PRODUCTS,
    ver: () => ver,
    precOf: (p) => (p.prec && p.prec !== 'jm' ? +p.prec : (UNIT_PREC[p.unit] || 1)),
    blank: () => withDefaults({ plu: '', ean: '', name: '', price: '', vat: 'A', group: GROUPS[0].id, unit: 'szt', icon: null }),
    nextPlu: () => String(Math.max(0, ...PRODUCTS.map((p) => +p.plu || 0)) + 1),
    genEan: (plu) => ean13('5904811' + String(plu || '0').padStart(5, '0').slice(-5)),
    groupIcon: (id) => { const g = GROUPS.find((x) => x.id === id); return g ? g.icon : null; },
    // piktogram towaru: własny (pict) → z asortymentu
    pictOf: (p) => (p && p.pict && p.pict !== 'none' ? p.pict : null),
    listIcon: (p) => (p && p.pict && p.pict !== 'none' ? p.pict : (p && p.icon) || NP_DB.groupIcon(p && p.group) || 'package'),
    saveGroupIcon(id, icon) {
      const g = GROUPS.find((x) => x.id === id); if (!g) return;
      g.icon = icon || g.icon;
      try { const gi = JSON.parse(localStorage.getItem('nextpro.groupIcons') || '{}') || {}; gi[id] = g.icon; localStorage.setItem('nextpro.groupIcons', JSON.stringify(gi)); } catch (e) {}
      ver++; window.dispatchEvent(new Event('np-products'));
    },
    save(p) {
      const i = PRODUCTS.findIndex((x) => x.plu === p.plu);
      if (i >= 0) PRODUCTS[i] = p; else PRODUCTS.push(p);
      reindex(); ver++;
      try { localStorage.setItem('nextpro.products', JSON.stringify(PRODUCTS)); } catch (e) {}
      window.dispatchEvent(new Event('np-products'));
    },
  };
  window.NP_DB = NP_DB;

  // Funkcje — f = numer funkcji F, tile = podpis na kafelku
  const FUNCS = [
    { id: 'rabat10', f: 1, name: 'Rabat 10%', tile: 'Rabat\n10%', icon: 'percent', color: 'red', cat: 'Rabaty' },
    { id: 'rabatLista', f: 2, name: 'Rabat z listy', tile: 'Rabat\nz listy', icon: 'badge-percent', color: 'red', cat: 'Rabaty' },
    { id: 'rabatDok', f: 28, name: 'Rabat / narzut na paragon', tile: 'Rabat\nna paragon', icon: 'badge-percent', color: 'red', cat: 'Rabaty' },
    { id: 'rabat10zl', f: 3, name: 'Rabat 10 zł na paragon', tile: 'Rabat\n10 zł', icon: 'tag', color: 'red', cat: 'Rabaty' },
    { id: 'narzut', f: 4, name: 'Narzut %', tile: 'Narzut', icon: 'trending-up', color: 'red', cat: 'Rabaty' },
    { id: 'storno', f: 5, name: 'Storno pozycji', tile: 'Storno', icon: 'undo-2', color: 'graphite', cat: 'Paragon' },
    { id: 'anuluj', f: 6, name: 'Anuluj paragon', tile: 'Anuluj\nparagon', icon: 'circle-x', color: 'graphite', cat: 'Paragon' },
    { id: 'nip', f: 7, name: 'NIP nabywcy', tile: 'NIP\nnabywcy', icon: 'file-text', color: 'graphite', cat: 'Paragon' },
    { id: 'faktura', f: 8, name: 'Faktura', tile: 'Faktura', icon: 'receipt', color: 'graphite', cat: 'Paragon' },
    { id: 'kopia', f: 9, name: 'Kopia paragonu', tile: 'Kopia\nparagonu', icon: 'printer-check', color: 'graphite', cat: 'Paragon' },
    { id: 'gotowka', f: 10, name: 'Gotówka (szybka płatność)', tile: 'Gotówka', icon: 'banknote', color: 'green', cat: 'Płatności' },
    { id: 'karta', f: 11, name: 'Karta (szybka płatność)', tile: 'Karta\npłatnicza', icon: 'credit-card', color: 'green', cat: 'Płatności' },
    { id: 'blik', f: 12, name: 'BLIK (szybka płatność)', tile: 'BLIK', icon: 'smartphone', color: 'green', cat: 'Płatności' },
    { id: 'skan', f: 13, name: 'Skanuj kod', tile: 'Skanuj\nkod', icon: 'scan-barcode', color: 'orange', cat: 'Towar' },
    { id: 'waga', f: 14, name: 'Waga', tile: 'Waga', icon: 'scale', color: 'orange', cat: 'Towar' },
    { id: 'cena', f: 15, name: 'Sprawdź cenę', tile: 'Sprawdź\ncenę', icon: 'search', color: 'orange', cat: 'Towar' },
    { id: 'zwrot', f: 16, name: 'Zwrot opakowań', tile: 'Zwrot\nopakowań', icon: 'recycle', color: 'orange', cat: 'Towar' },
    { id: 'szuflada', f: 17, name: 'Otwórz szufladę', tile: 'Otwórz\nszufladę', icon: 'archive', color: 'blue', cat: 'Kasa' },
    { id: 'wplata', f: 18, name: 'Wpłata do kasy', tile: 'Wpłata\ndo kasy', icon: 'arrow-down-to-line', color: 'blue', cat: 'Kasa' },
    { id: 'wyplata', f: 19, name: 'Wypłata z kasy', tile: 'Wypłata\nz kasy', icon: 'arrow-up-from-line', color: 'blue', cat: 'Kasa' },
    { id: 'stan', f: 20, name: 'Stan kasy', tile: 'Stan\nkasy', icon: 'wallet', color: 'blue', cat: 'Kasa' },
    { id: 'rdob', f: 21, name: 'Raport dobowy', tile: 'Raport\ndobowy', icon: 'calendar-clock', color: 'teal', cat: 'Raporty' },
    { id: 'rokr', f: 22, name: 'Raport okresowy', tile: 'Raport\nokresowy', icon: 'calendar-days', color: 'teal', cat: 'Raporty' },
    { id: 'rkas', f: 23, name: 'Raport kasjera', tile: 'Raport\nkasjera', icon: 'file-chart-column', color: 'teal', cat: 'Raporty' },
    { id: 'kasjer', f: 24, name: 'Zmiana kasjera', tile: 'Zmiana\nkasjera', icon: 'users', color: 'blue', cat: 'Kasa' },
    { id: 'blokada', f: 25, name: 'Blokada kasy', tile: 'Blokada\nkasy', icon: 'lock', color: 'blue', cat: 'Kasa' },
    { id: 'wysuw', f: 26, name: 'Wysuw papieru', tile: 'Wysuw\npapieru', icon: 'printer', color: 'blue', cat: 'Kasa' },
    { id: 'wyjscie', f: 27, name: 'ESC Wyjście', tile: 'ESC\nWyjście', icon: 'log-out', color: 'graphite', cat: 'Kasa' },
  ];
  const TILE_COLORS = ['gray', 'red', 'orange', 'green', 'blue', 'teal', 'graphite'];

  const P = (id) => ({ t: 'p', id: String(id) });
  const F = (id) => ({ t: 'f', id });
  const fill = (a) => { const r = a.slice(0, 30); while (r.length < 30) r.push(null); return r; };
  const _ = null;
  const DEFAULT_PAGES = [
    { name: 'Szybkie', slots: fill([
      F('rabat10'), F('rabatLista'), F('skan'), F('waga'), F('gotowka'), F('karta'),
      P(1), P(3), P(10), P(11), P(14), F('blik'),
      P(30), P(32), P(34), P(31), P(20), F('storno'),
      P(50), P(40), P(23), P(24), P(74), F('anuluj'),
      F('rabat10zl'), F('cena'), F('zwrot'), F('nip'), F('szuflada'), F('rdob'),
    ]) },
    { name: 'Pieczywo i nabiał', slots: fill([P(1), P(2), P(3), P(4), P(5), P(6), P(7), _, _, _, _, _, P(10), P(11), P(12), P(13), P(14), P(15), P(16), P(17)]) },
    { name: 'Napoje i słodycze', slots: fill([P(20), P(21), P(22), P(23), P(24), P(25), P(26), P(80), P(81), P(82), P(27), P(28), P(40), P(41), P(42), P(43), P(44), P(45)]) },
    { name: 'Warzywa, owoce, mięso', slots: fill([P(30), P(31), P(32), P(33), P(34), P(35), P(36), P(37), P(38), P(39), _, _, P(60), P(61), P(62), P(63), P(64)]) },
    { name: 'Strona 5', slots: fill([]) },
  ];
  const DEFAULT_FAVS = ['1', '3', '10', '14', '30', '50', '23', '74'];
  const DEFAULT_FPAGES = [
    { name: 'Funkcje', slots: fill(FUNCS.map((f) => F(f.id))) },
    { name: 'Funkcje · strona 2', slots: fill([]) },
  ];
  const DEFAULT_KBROW = [F('storno'), F('rabatLista'), F('waga'), F('cena'), F('gotowka'), F('karta')];
  const DEFAULT_QPAY = [F('gotowka'), F('karta'), F('blik')];
  // Klawisz F → 3×3 (układ jak blok cyfr 7-8-9 / 4-5-6 / 1-2-3)
  const DEFAULT_FKEY = [F('storno'), F('rabatLista'), F('anuluj'), F('nip'), F('cena'), F('zwrot'), F('szuflada'), F('kopia'), F('kasjer')];

  // Menu — układ jak w kasie NEXT (NoviCloud / Administracja / Programowanie / Raporty)
  const MENU = [
    { id: 'cloud', label: 'NoviCloud', icon: 'cloud', color: 'blue', items: [
      { label: 'Status połączenia', icon: 'wifi', action: 'conn' },
      { label: 'Synchronizuj teraz', icon: 'refresh-cw', action: 'sync' },
      { label: 'Ponowny import wykazów', icon: 'download', action: 'cloudImport' },
      { label: 'Ponowny eksport paragonów', icon: 'upload', action: 'cloudExport' },
      { label: 'Archiwizacja na serwer', icon: 'server', action: 'archive' },
      { label: 'Odzyskanie z serwera', icon: 'history', action: 'restoreServer' },
      { label: 'Eksport raportów dobowych', icon: 'file-chart-column', action: 'exportReports' },
    ] },
    { id: 'admin', label: 'Administracja', icon: 'settings', color: 'graphite', items: [
      { label: 'Archiwizacja na serwer', icon: 'server', action: 'archive' },
      { label: 'Archiwizacja na pendrive', icon: 'usb', action: 'pendrive' },
      { label: 'Odzyskanie z pendrive', icon: 'package-open', action: 'restorePendrive' },
      { label: 'Ustawienia', icon: 'sliders-horizontal', action: 'settings' },
      { label: 'Czyszczenie bazy danych', icon: 'eraser', action: 'cleanDb' },
      { label: 'Przeglądaj logi', icon: 'clipboard-list', action: 'list:logs' },
      { label: 'Przeglądaj PDF-y', icon: 'file-search', action: 'list:pdfs' },
      { label: 'Wyszukaj aktualizacje', icon: 'cloud-upload', badge: '1', action: 'update' },
      { label: 'Status połączenia', icon: 'wifi', action: 'conn' },
      { label: 'Moduły dodatkowe', icon: 'puzzle', action: 'list:modules' },
      { label: 'Naprawy', icon: 'wrench', action: 'repairs' },
      { label: 'Operacje serwisowe', icon: 'key', action: 'service' },
      { label: 'O programie', icon: 'info', action: 'about' },
      { label: 'Auto-raport dobowy', icon: 'calendar-clock', action: 'autoReport' },
      { label: 'Pomoc zdalna', icon: 'headset', action: 'remoteHelp', color: 'blue' },
    ] },
    { id: 'prog', label: 'Programowanie', icon: 'grid-3x3', color: 'orange', items: [
      { label: 'Dane sklepu', icon: 'store', action: 'list:shop' },
      { label: 'Stopka paragonu', icon: 'receipt', action: 'list:footer' },
      { label: 'Kod QR', icon: 'qr-code', action: 'list:qr' },
      { label: 'Licznik dokumentów', icon: 'list-ordered', action: 'list:counters' },
      { label: 'Stawki VAT', icon: 'percent', action: 'list:vat' },
      { label: 'Jednostki miary', icon: 'ruler', action: 'list:units' },
      { label: 'Formy płatności', icon: 'wallet-cards', action: 'list:payments' },
      { label: 'Waluty', icon: 'coins', action: 'list:currencies' },
      { label: 'Asortymenty', icon: 'boxes', action: 'list:groups' },
      { label: 'Towary', icon: 'package', action: 'goods' },
      { label: 'Formaty kodów wagowych', icon: 'barcode', action: 'list:scalecodes' },
      { label: 'Usługi gastro', icon: 'utensils', action: 'list:gastro' },
      { label: 'Klienci', icon: 'users', action: 'list:clients' },
      { label: 'Operatorzy', icon: 'user-cog', action: 'list:operators' },
      { label: 'Profile uprawnień', icon: 'shield-check', action: 'list:profiles' },
      { label: 'Formaty kart rabatowych', icon: 'id-card', action: 'list:cards' },
      { label: 'Frazy', icon: 'quote', action: 'list:phrases' },
      { label: 'Rabaty', icon: 'badge-percent', action: 'list:discounts' },
      { label: 'Reguły', icon: 'clipboard-list', action: 'list:rules' },
      { label: 'Kafelki panelu', icon: 'grid-3x3', action: 'editTiles' },
      { label: 'Funkcje', icon: 'fkey', action: 'goF' },
      { label: 'Klawisz F', icon: 'keyboard', action: 'editF' },
      { label: 'Układ ekranu', icon: 'monitor-smartphone', action: 'layout' },
    ] },
    { id: 'rap', label: 'Raporty', icon: 'chart-column', color: 'teal', items: [
      { label: 'Raport dobowy', icon: 'calendar-clock', action: 'f:rdob' },
      { label: 'Raport miesięczny', icon: 'calendar-days', action: 'rep:Raport miesięczny' },
      { label: 'Raport okresowy', icon: 'calendar-range', action: 'f:rokr' },
      { label: 'Raporty kasjerskie', icon: 'users', action: 'f:rkas' },
      { label: 'Raport sprzedaży', icon: 'chart-column', action: 'rep:Raport sprzedaży' },
      { label: 'Raport opakowań', icon: 'recycle', action: 'rep:Raport opakowań' },
      { label: 'Raport paragonów', icon: 'receipt', action: 'rep:Raport paragonów' },
      { label: 'Raport faktur', icon: 'file-text', action: 'rep:Raport faktur' },
      { label: 'Pamięć chroniona', icon: 'lock', action: 'rep:Pamięć chroniona' },
    ] },
  ];

  // Ustawienia (Administracja › Ustawienia) — typ: toggle | num | select | info
  const SETTINGS = [
    { id: 'ogolne', label: 'Parametry ogólne', icon: 'sliders-horizontal', color: 'graphite', params: [
      { id: 'theme', label: 'Motyw', type: 'select', def: 'Jasny', options: ['Jasny', 'Ciemny'], desc: 'Jasny (domyślnie) – jasne tło, najlepiej czytelny w dobrze oświetlonym sklepie. Ciemny – ciemne tło i jasny tekst; mniej razi wieczorem i w słabym świetle.' },
      { id: 'uiScale', label: 'Wielkość interfejsu', type: 'select', def: '100% (standard)', options: ['90% — więcej miejsca', '100% (standard)', '110%', '120%'], desc: 'Powiększa lub pomniejsza cały ekran: kafelki, klawisze, teksty i odstępy razem, w tych samych proporcjach. Przy większych wartościach mieści się mniej pozycji naraz.' },
      { id: 'textScale', label: 'Wielkość tekstu', type: 'select', def: '100% (standard)', options: ['90%', '100% (standard)', '110%', '120%'], desc: 'Zmienia tylko wielkość napisów. Duże liczby (suma, kwota do zapłaty) i układ ekranu zostają bez zmian, długie nazwy są skracane wielokropkiem.' },
      { id: 'nrKasy', label: 'Numer kasy', type: 'num', def: 1, max: 3, desc: 'Numer kasy, pod jakim będą zapisywane dokumenty w bazie. Służy również do identyfikacji kasy dla zewnętrznych programów.' },
      { id: 'tilePrices', label: 'Ceny na kafelkach towarów', type: 'toggle', def: false, desc: 'WYŁ (domyślnie) – kafelek pokazuje tylko nazwę towaru, większą i czytelniejszą. WŁ – pod nazwą wyświetlana jest cena.' },
      { id: 'paySummary', label: 'Podsumowanie po zakończeniu paragonu', type: 'toggle', def: true, desc: 'WŁ (domyślnie) – po wydruku pokazuje podsumowanie: suma, formy płatności, reszta. WYŁ – po informacji o drukowaniu kasa od razu przechodzi do nowego paragonu (przy reszcie do wydania i tak ją pokaże).' },
      { id: 'kontrolaStanow', label: 'Kontrola stanów mag.', type: 'toggle', def: false, desc: 'WYŁ (domyślnie) – program pozwoli na sprzedaż poniżej zerowego stanu magazynowego. WŁ – w karcie towaru należy najpierw wprowadzić niezerowy stan magazynowy. Przy sprzedaży program będzie za każdym razem ściągał sprzedaną ilość ze stanu.' },
      { id: 'obcinacz', label: 'Obcinacz drukarki', type: 'select', def: 'Częściowe cięcie', options: ['Pełne cięcie', 'Częściowe cięcie', 'Wyłączony'], desc: 'Sposób obsługi obcinacza drukarki.' },
      { id: 'infoKopiaFv', label: 'Informacja o wydruku kopii FV', type: 'toggle', def: false, desc: 'Informacja o wydruku między wydrukami faktury FV.' },
      { id: 'szuflada', label: 'Sterowanie szufladą', type: 'toggle', def: false, desc: 'WYŁ – program kasy nie steruje szufladą. Przy takim ustawieniu włącz parametr 2.2.6 Opcje systemowe – Auto. Otw. Szuflady w programie Konsola. WŁ (domyślnie) – program kasy odpowiada za otwieranie szuflady. Wyłącz parametr Auto.Otw.Szuflady w programie Konsola.' },
      { id: 'trybOnline', label: 'Tryb ONLINE drukarki', type: 'toggle', def: true, hidden: true, desc: 'Decyduje o trybie wydruku drukarki fiskalnej. WŁ (domyślnie) – linie paragonu drukowane natychmiast po wysłaniu. WYŁ – linie paragonu drukowane na końcu.' },
      { id: 'osobnyWatek', label: 'Osobny wątek drukowania', type: 'toggle', def: false, desc: 'Wydruk realizowany w osobnym wątku – program nie czeka na zakończenie wydruku przed kolejną operacją.' },
    ] },
    { id: 'lojalnosc', label: 'Systemy lojalnościowe', icon: 'badge-percent', color: 'red', desc: 'Konfiguracja systemu lojalnościowego.', params: [
      { id: 'lojSystem', label: 'System lojalnościowy', type: 'select', def: 'Brak', options: ['Brak', 'Novitus Loyalty', 'Zewnętrzny (API)'], desc: 'Wybór systemu naliczania punktów dla klientów.' },
      { id: 'lojPunkty', label: 'Złotych za 1 punkt', type: 'num', def: 10, max: 4, desc: 'Co ile złotych sprzedaży klient otrzymuje 1 punkt.' },
      { id: 'lojWydruk', label: 'Wydruk punktów na paragonie', type: 'toggle', def: true, desc: 'Drukuje stan punktów klienta w stopce paragonu.' },
    ] },
    { id: 'bony', label: 'Bony', icon: 'gift', color: 'orange', desc: 'Konfiguracja serwisów bonów.', params: [
      { id: 'bonyObsluga', label: 'Obsługa bonów', type: 'toggle', def: true, desc: 'Pozwala przyjmować bony jako formę płatności.' },
      { id: 'bonySerwis', label: 'Serwis bonów', type: 'select', def: 'Bony papierowe', options: ['Bony papierowe', 'Novitus Bony', 'Zewnętrzny (API)'], desc: 'Sposób weryfikacji bonów.' },
      { id: 'bonyReszta', label: 'Reszta z bonu', type: 'select', def: 'Nie wydawaj', options: ['Nie wydawaj', 'Gotówką', 'Nowym bonem'], desc: 'Co zrobić, gdy wartość bonu jest wyższa niż kwota paragonu.' },
    ] },
    { id: 'gastro', label: 'Gastronomia', icon: 'chef-hat', color: 'teal', desc: 'Konfiguracja parametrów gastronomicznych.', params: [
      { id: 'gastroTryb', label: 'Tryb gastronomiczny', type: 'toggle', def: false, desc: 'Włącza obsługę stolików, rachunków i bonów kuchennych.' },
      { id: 'gastroStoliki', label: 'Liczba stolików', type: 'num', def: 20, max: 3, desc: 'Liczba stolików dostępnych na planie sali.' },
      { id: 'gastroBony', label: 'Wydruk bonów na kuchnię', type: 'toggle', def: false, desc: 'Drukuje zamówienie na drukarce kuchennej po zatwierdzeniu.' },
      { id: 'gastroDrukarka', label: 'Drukarka kuchenna', type: 'select', def: 'Brak', options: ['Brak', 'Drukarka sieciowa 1', 'Drukarka sieciowa 2'], desc: 'Drukarka, na którą trafiają bony kuchenne.' },
    ] },
    { id: 'urzadzenia', label: 'Urządzenia', icon: 'monitor-smartphone', color: 'blue', desc: 'Konfiguracja urządzeń zewnętrznych.', params: [
      { id: 'devDrukarka', label: 'Drukarka fiskalna', type: 'select', def: 'Wbudowana', options: ['Wbudowana', 'Zewnętrzna RS-232', 'Zewnętrzna TCP/IP'], desc: 'Urządzenie drukujące paragony i faktury.' },
      { id: 'devSkaner', label: 'Skaner kodów', type: 'select', def: 'USB (HID)', options: ['USB (HID)', 'Wbudowany', 'Wyłączony'], desc: 'Źródło kodów kreskowych.' },
      { id: 'devWaga', label: 'Waga', type: 'select', def: 'RS-232', options: ['Brak', 'RS-232', 'USB'], desc: 'Waga do towarów sprzedawanych na kilogramy.' },
      { id: 'devTerminal', label: 'Terminal płatniczy', type: 'select', def: 'eService', options: ['Brak', 'eService', 'Pekao', 'Polcard'], desc: 'Terminal obsługujący płatności kartą i BLIK.' },
      { id: 'devWyswietlacz', label: 'Wyświetlacz klienta', type: 'toggle', def: true, desc: 'Pokazuje klientowi pozycje i sumę paragonu.' },
    ] },
    { id: 'wymiana', label: 'Wymiana danych', icon: 'arrow-left-right', color: 'green', desc: 'Konfiguracja wymiany danych z zewnętrznymi programami.', params: [
      { id: 'wdFormat', label: 'Kanał wymiany', type: 'select', def: 'NoviCloud', options: ['NoviCloud', 'Pliki CSV', 'FTP'], desc: 'Sposób przesyłania towarów i sprzedaży.' },
      { id: 'wdAuto', label: 'Eksport automatyczny', type: 'toggle', def: true, desc: 'Sprzedaż wysyłana automatycznie w tle.' },
      { id: 'wdInterwal', label: 'Interwał eksportu', type: 'select', def: '15 min', options: ['5 min', '15 min', '60 min'], desc: 'Jak często wysyłać dane.' },
      { id: 'wdImportStart', label: 'Import cennika przy starcie', type: 'toggle', def: false, desc: 'Pobiera aktualne ceny przy każdym uruchomieniu kasy.' },
    ] },
    { id: 'ksm', label: 'KSManager', icon: 'cloud', color: 'graphite', desc: 'Konfiguracja modułu KSManagera.', params: [
      { id: 'ksmModul', label: 'Moduł KSManager', type: 'toggle', def: false, desc: 'Włącza komunikację z programem KSManager.' },
      { id: 'ksmAdres', label: 'Adres serwera', type: 'info', def: 'ksm.novitus.pl', desc: 'Adres serwera KSManagera.' },
      { id: 'ksmPort', label: 'Port', type: 'num', def: 8080, max: 5, desc: 'Port komunikacji.' },
    ] },
  ];

  // Listy programowania i administracji: [etykieta, wartość, opis]
  const LISTS = {
    shop: { title: 'Dane sklepu', rows: [['Nazwa', 'Sklep „Pod Lipami”'], ['Adres', 'ul. Lipowa 12'], ['Kod i miasto', '00-950 Warszawa'], ['NIP', '525-000-11-09'], ['Telefon', '22 123 45 67'], ['E-mail', 'kontakt@podlipami.pl']] },
    footer: { title: 'Stopka paragonu', rows: [['Linia 1', 'Dziękujemy za zakupy!'], ['Linia 2', 'Zapraszamy ponownie'], ['Linia 3', 'Zwroty do 14 dni z paragonem'], ['Linia 4', '—']] },
    qr: { title: 'Kod QR', rows: [['Kod QR na paragonie', 'Włączony'], ['Treść', 'podlipami.pl/opinia'], ['Rozmiar', 'Średni'], ['Opis pod kodem', 'Oceń nasze zakupy']] },
    counters: { title: 'Licznik dokumentów', rows: [['Paragony', '0143'], ['Faktury', '12/10/2026'], ['Raporty dobowe', '0287'], ['Wpłaty do kasy', '0008'], ['Wypłaty z kasy', '0003']] },
    vat: { title: 'Stawki VAT', rows: [['A', '23%'], ['B', '8%'], ['C', '5%'], ['D', '0%'], ['E', 'zw.'], ['F', 'nieaktywna'], ['G', 'nieaktywna']] },
    units: { title: 'Jednostki miary', rows: [['szt', 'Sztuka', 'ilość całkowita'], ['kg', 'Kilogram', '3 miejsca po przecinku'], ['l', 'Litr', '3 miejsca po przecinku'], ['m', 'Metr', '2 miejsca po przecinku'], ['opak', 'Opakowanie', 'ilość całkowita']] },
    payments: { title: 'Formy płatności', rows: [['Gotówka', 'aktywna'], ['Karta płatnicza', 'aktywna'], ['BLIK', 'aktywna'], ['Bon', 'aktywna'], ['Przelew', 'aktywna'], ['Kredyt', 'nieaktywna']] },
    currencies: { title: 'Waluty', rows: [['PLN', 'waluta podstawowa'], ['EUR', 'kurs 4,32'], ['USD', 'kurs 3,98']] },
    scalecodes: { title: 'Formaty kodów wagowych', rows: [['Prefiks 20', 'PLU 5 cyfr + waga', '20 PPPPP WWWWW K'], ['Prefiks 21', 'PLU 5 cyfr + cena', '21 PPPPP CCCCC K'], ['Prefiks 29', 'PLU 5 cyfr + ilość', '29 PPPPP IIIII K']] },
    gastro: { title: 'Usługi gastro', rows: [['Na miejscu', 'VAT 8%'], ['Na wynos', 'VAT 5%'], ['Dostawa', 'VAT 8% · opłata 9,99 zł']] },
    clients: { title: 'Klienci', rows: [['Kowalski Budownictwo sp. z o.o.', 'NIP 521-301-77-12', 'ul. Polna 3, Warszawa'], ['Apteka Zdrowie', 'NIP 113-245-00-91', 'ul. Długa 15, Warszawa'], ['Jan Nowak', 'karta 9900 0001', 'klient lojalnościowy']] },
    profiles: { title: 'Profile uprawnień', rows: [['Kierownik', 'pełne uprawnienia', 'raporty, programowanie, storno, rabaty'], ['Kasjer', 'sprzedaż', 'zwroty do 50 zł, rabaty do 10%'], ['Praktykant', 'sprzedaż', 'bez rabatów i storna']] },
    cards: { title: 'Formaty kart rabatowych', rows: [['Karta stałego klienta', 'rabat 5%', 'prefiks 9900'], ['Karta pracownicza', 'rabat 10%', 'prefiks 9910']] },
    phrases: { title: 'Frazy', rows: [['1', 'Dziękujemy za zakupy'], ['2', 'Zapraszamy ponownie'], ['3', 'Promocja tygodnia: pieczywo −20%']] },
    discounts: { title: 'Rabaty', rows: [['Rabat 10%', 'na pozycję'], ['Rabat z listy', '5–50%'], ['Rabat 10 zł', 'na paragon'], ['Happy hours', '−15% pieczywo, 15:00–17:00']] },
    rules: { title: 'Reguły', rows: [['Pieczywo po 19:00', '−30%'], ['Jogurty 3 za 2', 'aktywna'], ['Kaucja do napojów', 'doliczana automatycznie']] },
    logs: { title: 'Przeglądaj logi', rows: [['08:02', 'Uruchomienie programu', 'wersja 2.4.0'], ['08:03', 'Połączono z NoviCloud'], ['08:05', 'Logowanie kasjera', 'Anna Wójcik'], ['09:41', 'Synchronizacja cennika', '63 towary'], ['12:10', 'Archiwizacja na serwer', 'zakończona']] },
    pdfs: { title: 'Przeglądaj PDF-y', rows: [['Raport dobowy 0287.pdf', 'wczoraj, 21:58'], ['Raport miesięczny 09-2026.pdf', '01.10.2026'], ['Faktura 11-10-2026.pdf', '11.10.2026']] },
    modules: { title: 'Moduły dodatkowe', rows: [['Lojalność', 'aktywny'], ['Waga etykietująca', 'aktywny'], ['Kuchnia (KDS)', 'nieaktywny'], ['Zamówienia online', 'nieaktywny']] },
  };

  const CASHIERS = [
    // auth: 'pin' = hasło tylko z cyfr (klawiatura numeryczna), 'pass' = hasło alfanumeryczne (pełna klawiatura)
    { id: 1, name: 'Anna Wójcik', role: 'Kierownik zmiany', admin: true, auth: 'pin', pin: '1234', card: '10010001', color: '#2E6B72' },
    { id: 2, name: 'Tomasz Lewandowski', role: 'Kasjer', auth: 'pass', pass: 'kasa1', card: '10010002', color: '#F07A1A' },
    { id: 3, name: 'Katarzyna Nowak', role: 'Kasjer', auth: 'pin', pin: '1234', card: '10010003', color: '#22BF6F' },
    { id: 4, name: 'Piotr Zieliński', role: 'Kasjer · praktykant', auth: 'pass', pass: 'nowy2', card: '10010004', color: '#0A7CFF' },
  ];
  const SHOP = { name: 'Sklep „Pod Lipami”', addr: 'ul. Lipowa 12, 00-950 Warszawa', kasa: 'Kasa nr 2', nip: 'NIP 525-000-11-09' };

  // ── formatery ──
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const group3 = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  const money = (n) => { const neg = n < -0.0001; const [i, d] = Math.abs(round2(n)).toFixed(2).split('.'); return (neg ? '−' : '') + group3(i) + ',' + d; };
  const qty = (q, unit) => {
    const a = Math.abs(q), s = q < 0 ? '−' : '';
    if (unit === 'kg') return s + a.toFixed(3).replace('.', ',');
    return s + (Number.isInteger(a) ? String(a) : String(+a.toFixed(3)).replace('.', ','));
  };
  const parseNum = (s) => { const v = parseFloat(String(s).replace(',', '.')); return isFinite(v) ? v : 0; };
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const dateLong = (d) => cap(d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }));
  const dateFull = (d) => cap(d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  const time = (d) => d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  const nip = (s) => s.length === 10 ? `${s.slice(0, 3)}-${s.slice(3, 6)}-${s.slice(6, 8)}-${s.slice(8)}` : s;
  let _uid = Date.now() % 100000;
  const uid = () => 'l' + (++_uid).toString(36);

  window.NP_DATA = { PRODUCT_TYPES, PRICE_MODES, GTU, UNITS, PRECS, PRODUCTS, GROUPS, FUNCS, TILE_COLORS, DEFAULT_PAGES, DEFAULT_FAVS, DEFAULT_FPAGES, DEFAULT_KBROW, DEFAULT_FKEY, DEFAULT_QPAY, MENU, SETTINGS, LISTS, CASHIERS, SHOP, VAT };
  window.NPF = { round2, money, qty, parseNum, norm, dateLong, dateFull, time, nip, uid };
})();
