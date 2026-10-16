/* TAKA KASA — dane demonstracyjne raportów (paragony, faktury, zmiany kasjerów, raporty dobowe, pamięć chroniona) */
(() => {
  const DAY = 864e5;
  const iso = (d) => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  const fromIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmtD = (d) => { const x = new Date(d); return String(x.getDate()).padStart(2, '0') + '.' + String(x.getMonth() + 1).padStart(2, '0') + '.' + x.getFullYear(); };
  const fmtDT = (d, sec) => { const x = new Date(d); return fmtD(x) + ' ' + String(x.getHours()).padStart(2, '0') + ':' + String(x.getMinutes()).padStart(2, '0') + (sec ? ':' + String(x.getSeconds()).padStart(2, '0') : ''); };
  const dur = (ms) => { const m = Math.max(0, Math.round(ms / 6e4)); return Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); };
  const durLong = (ms) => { const s = Math.max(0, Math.round(ms / 1e3)); return `${Math.floor(s / 3600)} h ${Math.floor((s % 3600) / 60)} min ${s % 60} s`; };
  const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  let cache = null;
  function build() {
    const R = rng(20261016);
    const pick = (a) => a[Math.floor(R() * a.length)];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const all = (window.NP_DB ? NP_DB.all() : []).filter((p) => p.active !== false && p.price > 0);
    const goods = all.filter((p) => p.group !== 'kaucje' && p.type !== 'Opakowanie');
    const packs = all.filter((p) => p.group === 'kaucje' || p.type === 'Opakowanie');
    const cashiers = (window.NP_DATA ? NP_DATA.CASHIERS : []).filter((c) => c.level === 'kasjer' || c.level === 'nadzorca');
    const forms = window.NP_PROG ? NP_PROG.get('payments') : [{ id: 'cash', name: 'Gotówka', kind: 'Gotówka', icon: 'banknote' }];
    const fw = (f) => ({ cash: 46, card: 30, blik: 12, bon: 3 })[f.id] || 1.5;
    const totalW = forms.reduce((s, f) => s + fw(f), 0);
    const pickForm = () => { let x = R() * totalW; for (const f of forms) { x -= fw(f); if (x <= 0) return f; } return forms[0]; };
    const clients = window.NP_PROG ? NP_PROG.get('clients') : [];
    const docs = [], shifts = [], reports = [];
    let no = 1, sys = 15201, fv = 15180, rep = 1, jpk = 15300;
    for (let k = 45; k >= 0; k--) {
      const day = new Date(today.getTime() - k * DAY);
      if (day.getDay() === 0 && k) continue; // niedziela — sklep zamknięty
      const n = k === 0 ? 4 + Math.floor(R() * 3) : 3 + Math.floor(R() * 9);
      const dayCash = cashiers.slice(0, 1 + Math.floor(R() * Math.min(3, cashiers.length)));
      const now = Date.now();
      dayCash.forEach((c, ci) => {
        let st = day.getTime() + (7 + ci * 4) * 36e5 + Math.floor(R() * 40) * 6e4;
        if (st > now) { if (ci) return; st = now - 2 * 36e5; } // dziś: tylko zmiany już rozpoczęte
        let en = st + (5 + R() * 4) * 36e5;
        const open = k === 0 && en > now;
        shifts.push({ id: 's' + shifts.length, no: shifts.length + 1, cashier: c.id, name: c.name, start: st, end: open ? null : en, open, cash0: ci === 0 ? 200 : 0, dep: R() < 0.3 ? 100 : 0, wd: ci === 0 && R() < 0.25 ? 100 : 0 });
      });
      for (let i = 0; i < n; i++) {
        const dsh = shifts.filter((s) => iso(s.start) === iso(day)); if (!dsh.length) break;
        const sh = pick(dsh);
        const t0 = sh.start + Math.floor(R() * ((sh.end || Date.now()) - sh.start));
        if (t0 > Date.now()) continue;
        const lines = []; const cnt = 1 + Math.floor(R() * 6);
        for (let j = 0; j < cnt; j++) {
          const p = pick(goods); if (!p) break;
          const qty = p.unit === 'kg' ? r2(0.2 + R() * 1.6) : 1 + Math.floor(R() * 3);
          lines.push({ plu: p.plu, name: p.name, ean: p.ean, unit: p.unit, qty, price: p.price, val: r2(qty * p.price), vat: p.vat });
        }
        const pk = [];
        if (packs.length && R() < 0.18) { const p = pick(packs); const q = 1 + Math.floor(R() * 3); pk.push({ plu: p.plu, name: p.name, qty: q, val: r2(q * p.price), dir: R() < 0.7 ? 'out' : 'in' }); }
        const storno = R() < 0.08 ? 1 : 0;
        const cancelled = R() < 0.04;
        const kind = R() < 0.03 ? 'zwrot' : R() < 0.02 ? 'zaliczka' : 'paragon';
        const disc = R() < 0.12 ? r2(lines.reduce((s, l) => s + l.val, 0) * 0.05) : 0;
        const total = r2(lines.reduce((s, l) => s + l.val, 0) + pk.reduce((s, x) => s + (x.dir === 'out' ? x.val : -x.val), 0) - disc);
        const f = pickForm();
        const split = total > 60 && R() < 0.15 && forms.length > 1;
        const pays = split ? [{ form: 'cash', name: 'Gotówka', amount: r2(total / 2) }, { form: f.id === 'cash' ? 'card' : f.id, name: (forms.find((x) => x.id === (f.id === 'cash' ? 'card' : f.id)) || f).name, amount: r2(total - r2(total / 2)) }] : [{ form: f.id, name: f.name, amount: total }];
        const inv = !cancelled && R() < 0.14;
        const cl = (inv || R() < 0.1) && clients.length ? pick(clients) : null;
        const d = { id: 'd' + docs.length, no: no++, sys: sys++, jpk: jpk++, t: t0, cashier: sh.cashier, cashierName: sh.name, shift: sh.id, lines, packs: pk, total, disc, discPct: disc > 0, pays, cancelled, kind, storno, fiscal: true, marza: R() < 0.02, nip: cl ? cl.nip : '', client: cl ? cl.name : '', invoice: inv ? 'F0' + fv++ : null };
        docs.push(d);
      }
      if (k > 0) {
        const t = day.getTime() + 21 * 36e5 + 58 * 6e4;
        const ds = docs.filter((x) => iso(x.t) === iso(day) && !x.cancelled);
        reports.push({ id: 'r' + rep, no: rep, jpk: jpk++, t, receipts: ds.length, gross: r2(ds.reduce((s, x) => s + x.total, 0)) }); rep++;
      }
    }
    docs.sort((a, b) => a.t - b.t);
    // numeracja w kolejności czasu: paragony, numery systemowe, faktury i JPK (dokumenty + raporty dobowe)
    // ostatnie dni: kilka faktur z kontrahentem, żeby Raport faktur nie był pusty w bieżącym tygodniu
    const recent = docs.filter((d) => !d.cancelled && Date.now() - d.t < 6 * DAY);
    if (clients.length) recent.filter((_, i) => i % 4 === 1).forEach((d) => { const cl = clients[d.no % clients.length]; d.invoice = 'F'; d.client = cl.name; d.nip = cl.nip; });
    let fno = 15180;
    docs.forEach((d, i) => { d.no = i + 1; d.sys = 15201 + i; if (d.invoice) d.invoice = 'F0' + fno++; });
    let j = 15300;
    docs.map((d) => [d.t, d]).concat(reports.map((r) => [r.t, r])).sort((a, b) => a[0] - b[0]).forEach(([, o]) => { o.jpk = j++; });
    return { docs, shifts, reports };
  }
  const get = () => (cache || (cache = build()));
  const PRESETS = [['today', 'Dzisiejsze'], ['week', 'Od początku tygodnia'], ['month', 'Od początku miesiąca'], ['all', 'Wszystkie']];
  function preset(id) {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    if (id === 'today') return { from: iso(t), to: iso(t), preset: id };
    if (id === 'week') { const w = new Date(t.getTime() - ((t.getDay() + 6) % 7) * DAY); return { from: iso(w), to: iso(t), preset: id }; }
    if (id === 'month') return { from: iso(new Date(t.getFullYear(), t.getMonth(), 1)), to: iso(t), preset: id };
    const d = get().docs; return { from: d.length ? iso(d[0].t) : iso(t), to: iso(t), preset: 'all' };
  }
  const inRange = (t, p) => { const s = iso(t); return s >= p.from && s <= p.to; };
  window.NP_REP = { get, preset, PRESETS, inRange, iso, fromIso, fmtD, fmtDT, dur, durLong, reset: () => { cache = null; } };
})();
