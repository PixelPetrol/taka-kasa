/* TAKA KASA — dane programowania (Menu › Programowanie): domyślne wartości + magazyn NP_PROG */
(() => {
  const PAY_KINDS = ['Gotówka', 'Karta płatnicza', 'Karta kredytowa', 'BLIK', 'Bon', 'Przelew', 'Czek', 'Inna płatność'];
  // Kategoria dla statystyk i zachowania: cash (szybkie kwoty), card/blik (terminal), bon, other
  const kindBucket = (k) => ({ 'Gotówka': 'cash', 'Karta płatnicza': 'card', 'Karta kredytowa': 'card', 'BLIK': 'blik', 'Bon': 'bon' })[k] || 'other';
  const PAY_ICONS = ['banknote', 'credit-card', 'smartphone', 'gift', 'ticket', 'euro', 'wallet', 'receipt', 'user', 'coins', 'piggy-bank', 'wallet-cards', 'circle-dollar-sign'];
  const pf = (id, name, kind, reszta, icon, active = true) => ({ id, name, kind, reszta, icon, active });
  const PAYMENTS = [
    pf('cash', 'Gotówka', 'Gotówka', true, 'banknote'),
    pf('card', 'Karta', 'Karta płatnicza', false, 'credit-card'),
    pf('blik', 'BLIK', 'BLIK', false, 'smartphone'),
    pf('bon', 'Bon', 'Bon', true, 'gift'),
    pf('przelew', 'Przelew', 'Przelew', false, 'wallet'),
    pf('czek', 'Czek', 'Czek', true, 'receipt', false),
    pf('kredyt', 'Kredyt', 'Karta kredytowa', true, 'wallet-cards'),
    pf('konto', 'Konto klienta', 'Inna płatność', true, 'user'),
    pf('eur', 'EUR', 'Inna płatność', true, 'euro', false),
    pf('mobilna', 'Mobilna', 'Inna płatność', false, 'smartphone', false),
    pf('voucher', 'Voucher', 'Inna płatność', true, 'ticket'),
  ];
  const UNITS = [
    { id: 'u1', name: 'szt', prec: '1', active: true },
    { id: 'u2', name: 'kg', prec: '0,001', active: true },
    { id: 'u3', name: 'opak', prec: '1', active: true },
    { id: 'u4', name: 'PCE', prec: '1', active: true },
    { id: 'u5', name: 'l', prec: '0,001', active: true },
    { id: 'u6', name: 'm', prec: '0,01', active: false },
  ];
  const PERMS = ['Edycja walut', 'Edycja klientów', 'Edycja operatorów', 'Edycja profili operatorów', 'Edycja form płatności', 'Edycja asortymentów', 'Edycja towarów', 'Edycja stawek VAT', 'Edycja jednostek miary',
    'Storno pozycji', 'Anulowanie paragonu', 'Rabaty i narzuty', 'Zmiana ceny', 'Zwroty opakowań', 'Wpłata i wypłata z kasy', 'Otwarcie szuflady', 'Raport dobowy', 'Raporty okresowe', 'Ustawienia kasy', 'Archiwizacja i odzyskiwanie'];
  const PERM_VALS = ['Dostępne', 'Niedostępne', 'Autoryzacja'];
  const allP = (v) => Object.fromEntries(PERMS.map((p) => [p, v]));
  const PROFILES = [
    { id: 'kasjer', name: 'Kasjer', perms: { ...allP('Niedostępne'), 'Storno pozycji': 'Dostępne', 'Anulowanie paragonu': 'Autoryzacja', 'Rabaty i narzuty': 'Autoryzacja', 'Zmiana ceny': 'Autoryzacja', 'Zwroty opakowań': 'Dostępne', 'Otwarcie szuflady': 'Autoryzacja', 'Wpłata i wypłata z kasy': 'Autoryzacja', 'Edycja klientów': 'Dostępne' } },
    { id: 'nadzorca', name: 'Nadzorca', perms: { ...allP('Dostępne'), 'Edycja profili operatorów': 'Niedostępne', 'Ustawienia kasy': 'Niedostępne', 'Archiwizacja i odzyskiwanie': 'Niedostępne' } },
    { id: 'manager', name: 'Menadżer', perms: allP('Dostępne') },
    { id: 'serwis', name: 'Serwisant', perms: allP('Dostępne') },
  ];
  const lvl2prof = { kasjer: 'kasjer', nadzorca: 'nadzorca', manager: 'manager', serwis: 'serwis' };
  const OPERATORS = (window.NP_DATA ? NP_DATA.CASHIERS : []).map((c, i) => {
    const [first, ...rest] = c.name.split(' ');
    return { id: 'o' + c.id, nr: String(i + 1), first, last: rest.join(' '), profile: lvl2prof[c.level] || 'kasjer', login: c.name, card: c.card, desc: c.role, active: true };
  }).concat([{ id: 'o90', nr: '7', first: 'Ewa', last: 'Mazur', profile: 'kasjer', login: 'Ewa Mazur', card: '', desc: 'Umowa zakończona', active: false }]);
  const ctr = (no, name, sub, street, house, flat, zip, city, extra = {}) => ({ id: 'c' + no, name, short: '', nip: sub, street, house, flat, zip, city, post: city, country: 'Polska', phone: '', email: '', account: '', taxStatus: '', taxDate: '', ksefRole: 'Brak', ksefId: '', disc: '0', kinds: { staly: false, odbiorca: true, producent: false, dostawca: false, siec: false, magazyn: false }, ...extra });
  const CLIENTS = [
    ctr(1, '„Codziennik” Dostawca Prasy', '123-65-56-567', 'Prasowa', '4', '', '30-001', 'Kraków', { kinds: { dostawca: true } }),
    ctr(2, 'FIRMA JANTAD UPH S.C. B.T. CUDZIŁO', '7591003435', 'Długa', '15', '2', '00-238', 'Warszawa'),
    ctr(3, '„Gospodarz” Gospodarstwo Rolne', '213-243-24-11', 'Polna', '3', '', '32-020', 'Wieliczka', { kinds: { dostawca: true, producent: true } }),
    ctr(4, 'COMP SPÓŁKA AKCYJNA', '5220001694', 'Jutrzenki', '116', '', '02-230', 'Warszawa'),
    ctr(5, 'EUROCASH SERWIS Sp. z o.o.', '7772304755', 'Wiśniowa', '11', '', '62-052', 'Komorniki', { kinds: { dostawca: true } }),
    ctr(6, 'F.P.H.U. Józef Kowalczyk', '987-98-98-999', 'Lipowa', '8', '', '31-123', 'Kraków'),
    ctr(7, 'Firma Handlowo-Usługowa „Tęcza”', '777-12-23-154', 'Warszawska', '77', '', '31-205', 'Kraków', { email: 'salon@tecza.com', kinds: { staly: true, odbiorca: true, dostawca: true } }),
  ];
  const CARD_FORMATS = [
    { id: 'k1', name: 'Karta rabatowa', prefix: '201', exp: 'RR', client: '5', level: true, other: 'brak', check: true, auto: true, order: ['exp', 'client', 'level', 'other'] },
    { id: 'k2', name: 'Karta pracownicza', prefix: '209', exp: 'RRMMDD', client: 'brak', level: true, other: '5', check: false, auto: true, order: ['level', 'other', 'exp', 'client'] },
  ];
  const DISC_TABLE = [0, 5, 10, 15, 20, 25, 30, 0, 0, 0];
  const COUNTERS = [
    ['par', 'Paragon', 12], ['fvp', 'Faktura do paragonu', 0], ['fvpn', 'Faktura do paragonu z NIP', 0], ['fv', 'Faktura VAT', 0], ['fvm', 'Faktura VAT MPP', 0],
    ['park', 'Paragon zaparkowany', 9], ['wpl', 'Wpłata', 0], ['wyp', 'Wypłata', 0], ['otw', 'Otwarcie zmiany', 2], ['zam', 'Zamknięcie zmiany', 0],
    ['kuch', 'Zamówienie kuchenne', 0, '0–98, zerowane po raporcie dobowym', 98], ['opak', 'Obrót opakowaniami', 0],
  ].map(([id, name, v, note, max]) => ({ id, name, v, note, max }));
  const SHOP = { name: 'Sklep „Pod Lipami”', city: 'Warszawa', zip: '00-950', street: 'Lipowa', house: '12', flat: '', nip: '5250001109', phone: '22 123 45 67', bank: '', account: '', service: '' };
  const FOOTER = { lines: ['Dziękujemy. Zapraszamy ponownie.', '', '', ''], barcode: false };
  const QR = { on: false, text: 'HTTPS://PODLIPAMI.PL/P/@systemNo' };

  const DEF = { payments: PAYMENTS, units: UNITS, profiles: PROFILES, operators: OPERATORS, clients: CLIENTS, cardFormats: CARD_FORMATS, discTable: DISC_TABLE, discDefault: { on: true, id: 1 }, counters: COUNTERS, shop: SHOP, footer: FOOTER, qr: QR };
  const cache = {};
  const VER = { payments: 2, cardFormats: 2 };
  const sk = (k) => 'nextpro.prog.' + k + (VER[k] ? '.v' + VER[k] : '');
  const NP_PROG = {
    get(k) {
      if (k in cache) return cache[k];
      let v; try { v = JSON.parse(localStorage.getItem(sk(k)) || 'null'); } catch (e) {}
      return (cache[k] = v == null ? JSON.parse(JSON.stringify(DEF[k])) : v);
    },
    set(k, v) {
      cache[k] = v;
      try { localStorage.setItem(sk(k), JSON.stringify(v)); } catch (e) {}
      window.dispatchEvent(new CustomEvent('np-prog', { detail: k }));
    },
    reset() { Object.keys(cache).forEach((k) => delete cache[k]); },
    payForms() { return NP_PROG.get('payments').filter((p) => p.active); },
    bucket: kindBucket,
  };
  window.addEventListener('storage', () => NP_PROG.reset());
  window.NP_PROG = NP_PROG;
  window.NP_PROG_DATA = { PAY_KINDS, PAY_ICONS, PERMS, PERM_VALS, PRECS: ['1', '0,1', '0,01', '0,001'] };
})();
