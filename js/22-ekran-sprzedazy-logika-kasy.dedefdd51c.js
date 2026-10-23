"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* KASA NEXT PRO — ekran sprzedaży: logika kasy, funkcje, arkusze */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef,
    useMemo = _React.useMemo,
    useCallback = _React.useCallback;
  var _NP_DATA = NP_DATA,
    PRODUCTS = _NP_DATA.PRODUCTS,
    FUNCS = _NP_DATA.FUNCS,
    DEFAULT_PAGES = _NP_DATA.DEFAULT_PAGES,
    DEFAULT_FAVS = _NP_DATA.DEFAULT_FAVS,
    SHOP = _NP_DATA.SHOP;
  var FBY = Object.fromEntries(FUNCS.map(function (f) {
    return [f.id, f];
  }));
  // Klawisz F: cyfry 7-8-9 / 4-5-6 / 1-2-3 → pola 3×3 funkcji F
  var F_IDX = {
    7: 0,
    8: 1,
    9: 2,
    4: 3,
    5: 4,
    6: 5,
    1: 6,
    2: 7,
    3: 8
  };
  var BUF0 = {
    entry: '',
    qty: null,
    priceOv: null,
    fMode: false,
    mode: null
  };
  var STATS0 = {
    drawer: 200,
    cash: 0,
    card: 0,
    blik: 0,
    bon: 0,
    receipts: 0,
    gross: 0,
    reportNo: 287,
    last: null
  };
  var M = NPF.money;
  var NO_SALE = ['manager', 'serwis'];
  var SALE_TABS = ['klawiatura', 'panele', 'funkcjeF', 'towary']; // manager / serwisant: Towary tylko przez Menu › Programowanie

  function appendEntry(e, k) {
    if (k === '.') return e.includes('.') ? e : (e || '0') + '.';
    if (e.includes('.')) return e.split('.')[1].length >= 3 ? e : e + k;
    return e.length >= 64 ? e : (e === '0' ? '' : e) + k;
  }
  var readScale = function readScale() {
    return Math.round((0.18 + Math.random() * 1.4) * 1000) / 1000;
  };
  function RabatSheet(_ref) {
    var line = _ref.line,
      onApply = _ref.onApply,
      onCustom = _ref.onCustom,
      onCancel = _ref.onCancel;
    var _useState = useState(line ? 'line' : 'rcpt'),
      _useState2 = _slicedToArray(_useState, 2),
      scope = _useState2[0],
      setScope = _useState2[1];
    useKeys(function (k) {
      if (k === 'ESC') onCancel();
      return true;
    }, 30);
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-amount np-rabat",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, "Rabat z listy"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg full"
    }, /*#__PURE__*/React.createElement("button", {
      className: scope === 'line' ? 'on' : '',
      disabled: !line,
      onClick: function onClick() {
        return setScope('line');
      }
    }, "Na pozycj\u0119"), /*#__PURE__*/React.createElement("button", {
      className: scope === 'rcpt' ? 'on' : '',
      onClick: function onClick() {
        return setScope('rcpt');
      }
    }, "Na paragon")), /*#__PURE__*/React.createElement("div", {
      className: "np-amount-desc"
    }, scope === 'line' && line ? line.name : 'Rabat procentowy od sumy paragonu'), /*#__PURE__*/React.createElement("div", {
      className: "np-rabat-grid"
    }, [5, 10, 15, 20, 25, 30, 40, 50].map(function (p) {
      return /*#__PURE__*/React.createElement("button", {
        key: p,
        onClick: function onClick() {
          return onApply(scope, p);
        }
      }, p, "%");
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-sheet-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn ink",
      onClick: function onClick() {
        return onCustom(scope);
      }
    }, "Inna warto\u015B\u0107\u2026")));
  }
  function SaleScreen(_ref2) {
    var cashier = _ref2.cashier,
      tweaks = _ref2.tweaks,
      onTweak = _ref2.onTweak,
      onLogout = _ref2.onLogout,
      onLock = _ref2.onLock,
      onPowerOff = _ref2.onPowerOff,
      onRestart = _ref2.onRestart,
      _ref2$menuOnly = _ref2.menuOnly,
      menuOnly = _ref2$menuOnly === void 0 ? false : _ref2$menuOnly;
    var _useStored = useStored('lines', []),
      _useStored2 = _slicedToArray(_useStored, 2),
      lines = _useStored2[0],
      setLines = _useStored2[1];
    var _useStored3 = useStored('receiptNo', 143),
      _useStored4 = _slicedToArray(_useStored3, 2),
      receiptNo = _useStored4[0],
      setReceiptNo = _useStored4[1];
    var _useStored5 = useStored('rcptDisc', null),
      _useStored6 = _slicedToArray(_useStored5, 2),
      rcptDisc = _useStored6[0],
      setRcptDisc = _useStored6[1];
    var _useStored7 = useStored('nip', ''),
      _useStored8 = _slicedToArray(_useStored7, 2),
      nip = _useStored8[0],
      setNip = _useStored8[1];
    var _useStored9 = useStored('invoice', false),
      _useStored0 = _slicedToArray(_useStored9, 2),
      invoice = _useStored0[0],
      setInvoice = _useStored0[1];
    var _useStored1 = useStored('rcptNote', ''),
      _useStored10 = _slicedToArray(_useStored1, 2),
      rcptNote = _useStored10[0],
      setRcptNote = _useStored10[1];
    var _useStored11 = useStored('noteList', ['Odbiór osobisty', 'Zamówienie telefoniczne', 'Klient stały', 'Dostawa do domu']),
      _useStored12 = _slicedToArray(_useStored11, 2),
      noteList = _useStored12[0],
      setNoteList = _useStored12[1];
    var _useStored13 = useStored('stats', STATS0),
      _useStored14 = _slicedToArray(_useStored13, 2),
      stats = _useStored14[0],
      setStats = _useStored14[1];
    var _useStored15 = useStored('pages', DEFAULT_PAGES),
      _useStored16 = _slicedToArray(_useStored15, 2),
      pages = _useStored16[0],
      setPages = _useStored16[1];
    useEffect(function () {
      // jednorazowo: dodaj na panel „Napoje” kafelki towarów akcyzowych (wino, wódka)
      try {
        if (localStorage.getItem('nextpro.mig.excise')) return;
        localStorage.setItem('nextpro.mig.excise', '1');
      } catch (e) {
        return;
      }
      setPages(function (ps) {
        var has = function has(id) {
          return ps.some(function (pg) {
            return pg.slots.some(function (x) {
              return x && x.t === 'p' && x.id === id;
            });
          });
        };
        var add = ['27', '28'].filter(function (id) {
          return !has(id);
        });
        if (!add.length) return ps;
        var ix = Math.max(0, ps.findIndex(function (pg) {
          return /napoje/i.test(pg.name);
        }));
        return ps.map(function (pg, i) {
          if (i !== ix) return pg;
          var sl = pg.slots.slice();
          add.forEach(function (id) {
            var j = sl.findIndex(function (x) {
              return !x;
            });
            if (j >= 0) sl[j] = {
              t: 'p',
              id: id
            };
          });
          return _objectSpread(_objectSpread({}, pg), {}, {
            slots: sl
          });
        });
      });
    }, []);
    var _useStored17 = useStored('fpages', NP_DATA.DEFAULT_FPAGES),
      _useStored18 = _slicedToArray(_useStored17, 2),
      fpages = _useStored18[0],
      setFPages = _useStored18[1];
    var _useStored19 = useStored('fpage', 0),
      _useStored20 = _slicedToArray(_useStored19, 2),
      fpage = _useStored20[0],
      setFPage = _useStored20[1];
    var _useStored21 = useStored('kbRow', NP_DATA.DEFAULT_KBROW),
      _useStored22 = _slicedToArray(_useStored21, 2),
      kbRow = _useStored22[0],
      setKbRow = _useStored22[1];
    var _useStored23 = useStored('fKey', NP_DATA.DEFAULT_FKEY),
      _useStored24 = _slicedToArray(_useStored23, 2),
      fKey = _useStored24[0],
      setFKey = _useStored24[1];
    var _useStored25 = useStored('qPay', NP_DATA.DEFAULT_QPAY),
      _useStored26 = _slicedToArray(_useStored25, 2),
      qPay = _useStored26[0],
      setQPay = _useStored26[1];
    // ── tryb gastro: rachunki otwarte (ze stolikiem i bez), aktywny rachunek = bieżący paragon ──
    var gset = useNpSettings();
    var gastroOn = !!gset.gastroTryb;
    var gView = gset.gastroWidok === 'Plan sali' ? 'plan' : 'grid';
    var gTables = Math.max(1, Math.min(96, +gset.gastroStoliki || 20));
    var _useStored27 = useStored('bills', []),
      _useStored28 = _slicedToArray(_useStored27, 2),
      bills = _useStored28[0],
      setBills = _useStored28[1];
    var _useStored29 = useStored('curBill', null),
      _useStored30 = _slicedToArray(_useStored29, 2),
      curBill = _useStored30[0],
      setCurBill = _useStored30[1];
    var _useStored31 = useStored('gRow', NP_DATA.DEFAULT_GROW),
      _useStored32 = _slicedToArray(_useStored31, 2),
      gRow = _useStored32[0],
      setGRow = _useStored32[1];
    var _useStored33 = useStored('gPlan', null),
      _useStored34 = _slicedToArray(_useStored33, 2),
      gPlan = _useStored34[0],
      setGPlan = _useStored34[1];
    var _useStored35 = useStored('gNames', {}),
      _useStored36 = _slicedToArray(_useStored35, 2),
      gNames = _useStored36[0],
      setGNames = _useStored36[1];
    var planN = useMemo(function () {
      return NP_PLAN.normPlan(gPlan, gTables);
    }, [gPlan, gTables]);
    var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      planEdit = _useState4[0],
      setPlanEdit = _useState4[1]; // indeks sali w edycji planu
    var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      moveMode = _useState6[0],
      setMoveMode = _useState6[1]; // false | { id } — przenoszenie rachunku na inny stolik
    var _useStored37 = useStored('billsX', []),
      _useStored38 = _slicedToArray(_useStored37, 2),
      billsX = _useStored38[0],
      setBillsX = _useStored38[1]; // anulowane paragony zaparkowane
    var _useStored39 = useStored('parkNo', 0),
      _useStored40 = _slicedToArray(_useStored39, 2),
      parkNo = _useStored40[0],
      setParkNo = _useStored40[1];
    var parkNoRef = useRef(parkNo);
    useEffect(function () {
      // rachunki sprzed numeracji: kolejne numery wg czasu otwarcia
      if (!bills.some(function (b) {
        return !b.no;
      })) return;
      var order = bills.slice().sort(function (x, y) {
        return (x.opened || 0) - (y.opened || 0);
      }).filter(function (b) {
        return !b.no;
      }).map(function (b) {
        return b.id;
      });
      var map = {};
      order.forEach(function (id) {
        map[id] = ++parkNoRef.current;
      });
      setParkNo(parkNoRef.current);
      setBills(function (bs) {
        return bs.map(function (b) {
          return map[b.id] ? _objectSpread(_objectSpread({}, b), {}, {
            no: map[b.id]
          }) : b;
        });
      });
    }, []);
    useEffect(function () {
      // jednorazowo: rząd gastro — „Nowy rachunek” → „Zaparkowane”
      if (gRow.some(function (x) {
        return x && x.id === 'gNowy';
      }) && !gRow.some(function (x) {
        return x && x.id === 'gLista';
      })) setGRow(function (r) {
        return r.map(function (x) {
          return x && x.id === 'gNowy' ? {
            t: 'f',
            id: 'gLista'
          } : x;
        });
      });
    }, []);
    var billsRef = useRef(bills);
    billsRef.current = bills;
    var curRef = useRef(curBill);
    curRef.current = curBill;
    var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      fOpen = _useState8[0],
      setFOpen = _useState8[1]; // false | 'run' | 'edit'
    useEffect(function () {
      if (fpages.some(function (p) {
        return /^Funkcje F/.test(p.name);
      })) setFPages(function (ps) {
        return ps.map(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            name: p.name.replace(/^Funkcje F · z klawiatury: F, numer, OK$/, 'Funkcje').replace(/^Funkcje F/, 'Funkcje')
          });
        });
      });
    }, []);
    var _useStored41 = useStored('favs', DEFAULT_FAVS),
      _useStored42 = _slicedToArray(_useStored41, 2),
      favs = _useStored42[0],
      setFavs = _useStored42[1];
    var _useStored43 = useStored('tab', 'panele'),
      _useStored44 = _slicedToArray(_useStored43, 2),
      tab = _useStored44[0],
      setTab = _useStored44[1];
    var _useStored45 = useStored('page', 0),
      _useStored46 = _slicedToArray(_useStored45, 2),
      page = _useStored46[0],
      setPage = _useStored46[1];
    // Role: manager i serwisant bez sprzedaży. Menu na pełnym ekranie (Tweak) zakrywa paragon; w przeciwnym razie paragon jest wyszarzony
    var noSale = !menuOnly && !!cashier && NO_SALE.includes(cashier.level);
    var menuFull = tweaks.menuFull !== false;
    var menuFullOn = menuFull && (menuOnly || tab === 'menu' || noSale && tab === 'towary');
    var rcptOff = noSale || !menuOnly && tab === 'menu';
    var _useState9 = useState(BUF0),
      _useState0 = _slicedToArray(_useState9, 2),
      buf = _useState0[0],
      setBufState = _useState0[1];
    var bufRef = useRef(buf);
    var setBuf = function setBuf(patch) {
      var cur = bufRef.current;
      var next = _objectSpread(_objectSpread({}, cur), typeof patch === 'function' ? patch(cur) : patch);
      bufRef.current = next;
      setBufState(next);
    };
    var linesRef = useRef(lines);
    linesRef.current = lines;
    var commit = function commit(next) {
      linesRef.current = next;
      setLines(next);
    };
    var _useState1 = useState(null),
      _useState10 = _slicedToArray(_useState1, 2),
      lastEvent = _useState10[0],
      setLastEventRaw = _useState10[1];
    var _useState11 = useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      selId = _useState12[0],
      setSelId = _useState12[1];
    var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      edit = _useState14[0],
      setEdit = _useState14[1];
    var _useState15 = useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      editSlot = _useState16[0],
      setEditSlot = _useState16[1];
    var _useState17 = useState(null),
      _useState18 = _slicedToArray(_useState17, 2),
      prodEdit = _useState18[0],
      setProdEdit = _useState18[1]; // { plu } | { plu: null } = nowy
    var _useState19 = useState(null),
      _useState20 = _slicedToArray(_useState19, 2),
      sheet = _useState20[0],
      setSheet = _useState20[1];
    var _useState21 = useState(null),
      _useState22 = _slicedToArray(_useState21, 2),
      toast = _useState22[0],
      setToast = _useState22[1];
    var _useState23 = useState(null),
      _useState24 = _slicedToArray(_useState23, 2),
      flashId = _useState24[0],
      setFlashId = _useState24[1];
    var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      scanFlash = _useState26[0],
      setScanFlash = _useState26[1];
    var seq = useRef(0);
    var timers = useRef([]);
    var toastT = useRef(null);
    useEffect(function () {
      return function () {
        return timers.current.forEach(clearTimeout);
      };
    }, []);
    var later = function later(fn, ms) {
      return timers.current.push(setTimeout(fn, ms));
    };
    var _ref3 = tweaks.grid === '5x6' ? [5, 6] : [6, 5],
      _ref4 = _slicedToArray(_ref3, 2),
      gc = _ref4[0],
      gr = _ref4[1];
    // strony stolików (tryb gastro) są na końcu Paneli: siatka po 24 stoliki albo jedna strona na salę
    var gN = gastroOn ? gView === 'plan' ? planN.rooms.length : Math.max(1, Math.ceil(gTables / 24)) : 0;
    var pageAll = Math.min(page, pages.length + gN - 1);
    var inGastro = gN > 0 && pageAll >= pages.length;
    var pageC = Math.min(page, pages.length - 1);
    var fpageC = Math.min(fpage, fpages.length - 1);

    // ── sumy ──
    var lineTotal = function lineTotal(l) {
      return NPF.round2(l.qty * l.price * (1 - (l.adj || 0) / 100));
    };
    var subtotal = NPF.round2(lines.reduce(function (s, l) {
      return s + lineTotal(l);
    }, 0));
    var rdBase = rcptDisc && subtotal > 0 ? rcptDisc.type === 'amt' ? rcptDisc.v : NPF.round2(subtotal * rcptDisc.v / 100) : 0;
    var rdAmt = rcptDisc && rcptDisc.up ? -rdBase : Math.min(subtotal, rdBase); // ujemne = narzut
    var total = NPF.round2(subtotal - rdAmt);
    var counts = useMemo(function () {
      var m = {};
      lines.forEach(function (l) {
        if (l.qty > 0) m[l.pid] = (m[l.pid] || 0) + l.qty;
      });
      Object.keys(m).forEach(function (k) {
        var p = NP_DB.get(k);
        m[k] = p && p.unit === 'kg' ? NPF.qty(m[k], 'kg').replace(/0+$/, '').replace(/,$/, '') + ' kg' : String(m[k]);
      });
      return m;
    }, [lines]);
    useEffect(function () {
      if (!lines.length && rcptDisc) setRcptDisc(null);
    }, [lines.length]);

    // ── pomocnicze ──
    var setLastEvent = function setLastEvent(ev) {
      return setLastEventRaw(ev ? _objectSpread(_objectSpread({}, ev), {}, {
        id: ++seq.current
      }) : null);
    };
    var say = function say(text) {
      var tone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var icon = arguments.length > 2 ? arguments[2] : undefined;
      clearTimeout(toastT.current);
      setToast({
        text: text,
        tone: tone,
        icon: icon,
        id: ++seq.current
      });
      toastT.current = setTimeout(function () {
        return setToast(null);
      }, 2600);
    };
    var err = function err(text) {
      say(text, 'err', 'circle-alert');
    };
    // Menu dostępne tylko przy zamkniętym paragonie
    var menuLockedMsg = 'Menu jest dostępne po zamknięciu paragonu';
    var noSaleMsg = "".concat(cashier.role, " nie ma uprawnie\u0144 do sprzeda\u017Cy");
    var goTab = function goTab(t) {
      if (t === 'menu' && linesRef.current.length) {
        say(menuLockedMsg, 'err', 'lock');
        return;
      }
      if (noSale && SALE_TABS.includes(t)) {
        say(noSaleMsg, 'err', 'lock');
        return;
      }
      if (t !== 'panele') setMoveMode(false);
      setTab(t);
      setEdit(false);
      setFOpen(false);
    };
    useEffect(function () {
      if (tab === 'menu' && lines.length && !noSale) setTab('panele');
    }, [tab, lines.length]);
    useEffect(function () {
      if (noSale && SALE_TABS.includes(tab)) setTab('menu');
    }, [noSale]);
    useEffect(function () {
      if (tab === 'gastro') setTab('panele');
    }, [tab]);
    var clearBuf = function clearBuf() {
      return setBuf(BUF0);
    };
    var close = function close() {
      return setSheet(null);
    };
    var dialog = function dialog(props) {
      return setSheet({
        type: 'dialog',
        props: props,
        k: ++seq.current
      });
    };
    var amount = function amount(props) {
      return setSheet({
        type: 'amount',
        props: _objectSpread({
          onCancel: close
        }, props),
        k: ++seq.current
      });
    };
    var progressThen = function progressThen(title, desc, ms, success) {
      dialog({
        progress: true,
        title: title,
        desc: desc
      });
      later(function () {
        return dialog(_objectSpread(_objectSpread({
          tone: 'success'
        }, success), {}, {
          actions: success.actions || [{
            label: 'OK',
            primary: true,
            onClick: close
          }]
        }));
      }, ms);
    };
    var flash = function flash(id) {
      setFlashId(null);
      requestAnimationFrame(function () {
        return setFlashId(id);
      });
      later(function () {
        return setFlashId(function (f) {
          return f === id ? null : f;
        });
      }, 800);
    };
    var target = function target() {
      var L = linesRef.current;
      return L.find(function (l) {
        return l.id === selId;
      }) || L[L.length - 1];
    };
    var drawer = stats.drawer;

    // ── sprzedaż ──
    var r3 = function r3(x) {
      return Math.round(x * 1000) / 1000;
    };
    var ageRef = useRef(false); // wiek klienta potwierdzony na bieżącym paragonie
    var _doSell = function doSell(p, src, code) {
      if (noSale) {
        err(noSaleMsg);
        return;
      }
      if (p.active === false) {
        err("Towar \u201E".concat(p.name, "\u201D jest usuni\u0119ty"));
        return;
      }
      if (p.excise && bufRef.current.mode !== 'return') {
        if (!linesRef.current.length) ageRef.current = false;
        if (!ageRef.current) {
          dialog({
            tone: 'warning',
            title: 'Sprawdź wiek klienta',
            desc: "\u201E".concat(p.name, "\u201D to towar akcyzowy. Upewnij si\u0119, \u017Ce klient ma uko\u0144czone 18 lat. Potwierdzenie obowi\u0105zuje do ko\u0144ca tego paragonu."),
            actions: [{
              label: 'Nie sprzedawaj',
              cancel: true,
              onClick: function onClick() {
                close();
                clearBuf();
                setLastEvent({
                  kind: 'storno',
                  text: "Nie sprzedano \xB7 ".concat(p.name, " (wiek klienta)")
                });
              }
            }, {
              label: 'Klient ma 18 lat',
              primary: true,
              onClick: function onClick() {
                ageRef.current = true;
                close();
                _doSell(p, src, code);
              }
            }]
          });
          return;
        }
      }
      var _bufRef$current = bufRef.current,
        qty = _bufRef$current.qty,
        priceOv = _bufRef$current.priceOv,
        mode = _bufRef$current.mode;
      var L = linesRef.current;
      var q = qty ? qty.v : null;
      var fromScale = false;
      if (q == null && p.weighed) {
        q = readScale();
        fromScale = true;
      }
      if (q == null) q = 1;
      var prec = NP_DB.precOf(p);
      if (Math.abs(q / prec - Math.round(q / prec)) > 1e-6) {
        err(prec >= 1 ? "\u201E".concat(p.name, "\u201D sprzedawany jest tylko w ca\u0142ych ilo\u015Bciach") : "\u201E".concat(p.name, "\u201D: dok\u0142adno\u015B\u0107 sprzeda\u017Cy ").concat(String(prec), " ").concat(p.unit));
        return;
      }
      if (priceOv != null && !bufRef.current.codeOv) {
        if (p.priceMode === 'Zamknięta') {
          err("Cena towaru \u201E".concat(p.name, "\u201D jest zamkni\u0119ta"));
          return;
        }
        if (p.priceMode === 'Tylko w górę' && priceOv < p.price) {
          err("Cen\u0119 \u201E".concat(p.name, "\u201D mo\u017Cna tylko podnie\u015B\u0107"));
          return;
        }
        if (p.priceMode === 'Tylko w dół' && priceOv > p.price) {
          err("Cen\u0119 \u201E".concat(p.name, "\u201D mo\u017Cna tylko obni\u017Cy\u0107"));
          return;
        }
      }
      var price = priceOv != null ? priceOv : p.price;
      if (!(price > 0)) {
        err("Wpisz cen\u0119 towaru \u201E".concat(p.name, "\u201D i naci\u015Bnij CENA"));
        return;
      }
      var sign = mode === 'return' ? -1 : 1;
      var add = function add(arr, prod, qq, pr, ov) {
        var whole = NP_DB.precOf(prod) >= 1 && !prod.weighed;
        var i = whole ? arr.findIndex(function (l) {
          return l.pid === prod.plu && l.price === pr && !l.adj && Math.sign(l.qty) === sign;
        }) : -1;
        if (i >= 0) return [arr.map(function (l, j) {
          return j === i ? _objectSpread(_objectSpread({}, l), {}, {
            qty: r3(l.qty + sign * qq)
          }) : l;
        }), arr[i].id];
        var nid = NPF.uid();
        return [[].concat(_toConsumableArray(arr), [{
          id: nid,
          pid: prod.plu,
          name: prod.name,
          unit: prod.unit,
          qty: r3(sign * qq),
          price: pr,
          adj: 0,
          ov: ov
        }]), nid];
      };
      var id;
      var _add = add(L, p, q, price, priceOv != null);
      var _add2 = _slicedToArray(_add, 2);
      L = _add2[0];
      id = _add2[1];
      var pk = p.pack && NP_DB.get(p.pack);
      if (pk) {
        var _add3 = add(L, pk, Math.max(1, Math.round((prec >= 1 ? q : 1) * (p.packN || 1))), pk.price, false);
        var _add4 = _slicedToArray(_add3, 1);
        L = _add4[0];
      }
      var sp = p.sup && NP_DB.get(p.sup); // opłata SUP za opakowanie jednorazowe
      if (sp) {
        var _add5 = add(L, sp, Math.max(1, Math.round(prec >= 1 ? q : 1)), sp.price, false);
        var _add6 = _slicedToArray(_add5, 1);
        L = _add6[0];
      }
      commit(L);
      flash(id);
      setSelId(null);
      var qTxt = NPF.qty(q, p.unit) + (p.unit === 'kg' ? ' kg' : '');
      setLastEvent({
        kind: fromScale ? 'waga' : src,
        code: code || null,
        text: "".concat(sign < 0 ? 'Zwrot · ' : '').concat(p.name, " \xB7 ").concat(qTxt, " \xD7 ").concat(M(price)).concat(fromScale ? ' (waga)' : '').concat(pk ? ' + kaucja' : '').concat(sp ? ' + SUP' : '')
      });
      clearBuf();
    };
    var showPrice = function showPrice(p) {
      return dialog({
        tone: 'info',
        title: p.name,
        desc: 'Sprawdzenie ceny — towar nie został dodany do paragonu.',
        rows: [['Cena', "".concat(M(p.price), " z\u0142").concat(p.unit === 'kg' ? ' / kg' : '')], ['Kod PLU', p.plu], ['EAN', p.ean], ['Stawka VAT', NP_DATA.VAT[p.vat]]],
        actions: [{
          label: 'Sprzedaj',
          onClick: function onClick() {
            close();
            _doSell(p, 'kod', p.ean);
          }
        }, {
          label: 'OK',
          primary: true,
          onClick: close
        }]
      });
    };
    var sell = function sell(p) {
      var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tile';
      var code = arguments.length > 2 ? arguments[2] : undefined;
      if (bufRef.current.mode === 'check') {
        setBuf({
          mode: null,
          entry: ''
        });
        showPrice(p);
        return;
      }
      _doSell(p, src, code);
    };
    var findCode = function findCode(c) {
      return NP_DB.all().find(function (x) {
        return x.plu === c || x.ean && x.ean === c || (x.codes || []).some(function (y) {
          return y.code === c;
        });
      });
    };
    var sellByCode = function sellByCode(c) {
      var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'kod';
      var p = findCode(c);
      if (!p) {
        err("Brak towaru o kodzie ".concat(c));
        setLastEvent({
          kind: 'error',
          code: c,
          text: 'Nie znaleziono towaru'
        });
        setBuf({
          entry: ''
        });
        return;
      }
      // kod dodatkowy: własna cena za szt. i mnożnik ilości
      var xc = p.plu !== c && p.ean !== c && (p.codes || []).find(function (y) {
        return y.code === c;
      });
      if (xc && bufRef.current.mode !== 'check') {
        var q0 = bufRef.current.qty ? bufRef.current.qty.v : 1;
        setBuf(_objectSpread({
          entry: '',
          qty: {
            v: q0 * (xc.mult || 1),
            unit: 'szt'
          }
        }, function () {
          var pr = xc.lvl && xc.lvl !== 'own' ? +p[xc.lvl] : xc.price;
          return pr > 0 && bufRef.current.priceOv == null ? {
            priceOv: pr,
            codeOv: true
          } : {};
        }()));
      }
      sell(p, src, c);
    };
    var scan = function scan() {
      var pool = NP_DB.all().filter(function (x) {
        return x.group !== 'kaucje' && x.active !== false && x.price > 0;
      });
      var p = pool[Math.floor(Math.random() * pool.length)];
      setScanFlash(true);
      later(function () {
        return setScanFlash(false);
      }, 560);
      sell(p, 'scan', p.ean);
    };
    var weigh = function weigh() {
      var w = readScale();
      setBuf({
        qty: {
          v: w,
          unit: 'kg'
        }
      });
      setLastEvent({
        kind: 'waga',
        text: "Odczyt z wagi: ".concat(NPF.qty(w, 'kg'), " kg \u2014 wybierz towar")
      });
    };
    var feed = function feed() {
      return say('Wysuw papieru', 'info', 'printer');
    };

    // ── operacje na pozycjach ──
    var applyAdj = function applyAdj(pct, lineId) {
      var t = lineId ? linesRef.current.find(function (x) {
        return x.id === lineId;
      }) : target();
      if (!t) {
        err('Brak pozycji na paragonie');
        return;
      }
      commit(linesRef.current.map(function (x) {
        return x.id === t.id ? _objectSpread(_objectSpread({}, x), {}, {
          adj: pct
        }) : x;
      }));
      flash(t.id);
      clearBuf();
      setLastEvent({
        kind: 'info',
        text: "Rabat ".concat(pct, "% \xB7 ").concat(t.name)
      });
    };
    var storno = function storno(id) {
      var t = id ? linesRef.current.find(function (x) {
        return x.id === id;
      }) : target();
      if (!t) {
        err('Brak pozycji do storna');
        return;
      }
      commit(linesRef.current.filter(function (x) {
        return x.id !== t.id;
      }));
      if (selId === t.id) setSelId(null);
      setLastEvent({
        kind: 'storno',
        text: "Storno \xB7 ".concat(t.name)
      });
    };
    var onQty = function onQty(id, d) {
      return commit(linesRef.current.map(function (x) {
        return x.id === id ? _objectSpread(_objectSpread({}, x), {}, {
          qty: Math.round((x.qty + d) * 1000) / 1000
        }) : x;
      }).filter(function (x) {
        return x.qty !== 0;
      }));
    };
    var resetReceipt = function resetReceipt() {
      commit([]);
      setRcptDisc(null);
      setNip('');
      setRcptNote('');
      setInvoice(false);
      setSelId(null);
      setReceiptNo(function (n) {
        return n + 1;
      });
      clearBuf();
    };
    var onLineAction = function onLineAction(kind, l) {
      if (kind === 'menu') {
        setSheet({
          type: 'lineMenu',
          props: {
            lineId: l.id
          },
          k: ++seq.current
        });
        return;
      }
      if (kind === 'usun') {
        close();
        storno(l.id);
        return;
      }
      if (kind === 'atrybuty') {
        close();
        say('Ten towar nie ma zdefiniowanych atrybutów', 'info');
        return;
      }
      if (kind === 'komentarz') {
        setSheet({
          type: 'lineNote',
          props: {
            lineId: l.id
          },
          k: ++seq.current
        });
        return;
      }
      if (kind === 'rabat') {
        setSheet({
          type: 'rabat',
          props: {
            lineId: l.id
          },
          k: ++seq.current
        });
        return;
      }
      if (kind === 'ilosc') {
        var kg = l.unit === 'kg';
        amount({
          title: 'Zmiana ilości',
          desc: l.name,
          mode: kg ? 'qty' : 'digits',
          maxLen: 4,
          suffix: kg ? 'kg' : 'szt.',
          confirmLabel: 'Zmień ilość',
          validate: function validate(v) {
            return NPF.parseNum(v) > 0 ? null : 'Ilość musi być większa od zera';
          },
          onConfirm: function onConfirm(v) {
            close();
            var q = typeof v === 'string' ? parseInt(v, 10) : v;
            commit(linesRef.current.map(function (x) {
              return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
                qty: (Math.sign(x.qty) || 1) * q
              }) : x;
            }));
            flash(l.id);
          }
        });
        return;
      }
      if (kind === 'cena') {
        amount({
          title: 'Zmiana ceny',
          desc: "".concat(l.name, " \xB7 obecnie ").concat(M(l.price), " z\u0142"),
          mode: 'money',
          confirmLabel: 'Zmień cenę',
          validate: function validate(v) {
            return NPF.parseNum(v) > 0 ? null : 'Cena musi być większa od zera';
          },
          onConfirm: function onConfirm(v) {
            close();
            commit(linesRef.current.map(function (x) {
              return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
                price: v,
                ov: true
              }) : x;
            }));
            flash(l.id);
          }
        });
      }
    };

    // ── gastro: stoliki i rachunki ──
    var newBill = function newBill(table) {
      var L = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var no = ++parkNoRef.current;
      setParkNo(no);
      return {
        id: NPF.uid(),
        no: no,
        table: table,
        name: '',
        guests: 0,
        cashierId: cashier.id,
        opened: Date.now(),
        touched: Date.now(),
        lines: L
      };
    };
    var setCur = function setCur(id) {
      curRef.current = id;
      setCurBill(id);
    };
    var saveCur = function saveCur() {
      // bieżący paragon → do jego rachunku (albo nowy rachunek bez stolika)
      var L = linesRef.current,
        cid = curRef.current;
      if (cid) {
        setBills(function (bs) {
          return bs.map(function (b) {
            return b.id === cid ? _objectSpread(_objectSpread({}, b), {}, {
              lines: L.concat(b.rest || []),
              rest: null,
              touched: Date.now()
            }) : b;
          }).filter(function (b) {
            return b.id !== cid || b.lines.length || b.name || b.guests;
          });
        });
        return;
      }
      if (L.length) setBills(function (bs) {
        return [].concat(_toConsumableArray(bs), [newBill(null, L)]);
      });
    };
    var leaveCur = function leaveCur() {
      commit([]);
      setCur(null);
      setSelId(null);
      clearBuf();
      setRcptDisc(null);
      setNip('');
      setRcptNote('');
      setInvoice(false);
    };
    var loadBill = function loadBill(b) {
      commit((b.lines || []).concat(b.rest || []));
      setBills(function (bs) {
        return bs.map(function (x) {
          return x.id === b.id ? _objectSpread(_objectSpread({}, x), {}, {
            rest: null
          }) : x;
        });
      });
      setCur(b.id);
      setSelId(null);
      clearBuf();
    };
    var openTable = function openTable(n) {
      var cid = curRef.current;
      if (moveMode) {
        var mv = moveMode;
        if (billsRef.current.some(function (b) {
          return b.table === n && b.id !== mv.id;
        })) {
          err("Stolik ".concat(n, " jest zaj\u0119ty"));
          return;
        }
        setBills(function (bs) {
          return bs.map(function (b) {
            return b.id === mv.id ? _objectSpread(_objectSpread({}, b), {}, {
              table: n,
              touched: Date.now()
            }) : b;
          });
        });
        setMoveMode(false);
        say("Rachunek przeniesiony na stolik ".concat(n), 'ok', 'check');
        return;
      }
      var b = billsRef.current.find(function (x) {
        return x.table === n;
      });
      if (b && b.id === cid) return;
      if (!b && !cid && linesRef.current.length) {
        var nb = newBill(n);
        setBills(function (bs) {
          return [].concat(_toConsumableArray(bs), [nb]);
        });
        setCur(nb.id);
        say("Paragon przypisany do stolika ".concat(n), 'ok', 'check');
        return;
      }
      saveCur();
      if (b) {
        loadBill(b);
        setLastEvent({
          kind: 'info',
          text: "Stolik ".concat(n).concat(b.name ? ' · ' + b.name : '', " \xB7 otwarty rachunek")
        });
      } else {
        leaveCur();
        var _nb = newBill(n);
        setBills(function (bs) {
          return [].concat(_toConsumableArray(bs), [_nb]);
        });
        setCur(_nb.id);
        setLastEvent({
          kind: 'info',
          text: "Stolik ".concat(n, " \xB7 nowy rachunek")
        });
      }
    };
    var openBill = function openBill(id) {
      var b = billsRef.current.find(function (x) {
        return x.id === id;
      });
      if (!b || b.id === curRef.current) return;
      saveCur();
      loadBill(b);
      setLastEvent({
        kind: 'info',
        text: "".concat(b.table != null ? 'Stolik ' + b.table : 'Rachunek').concat(b.name ? ' · ' + b.name : '')
      });
    };
    var goTables = function goTables() {
      setTab('panele');
      setEdit(false);
      setFOpen(false);
      if (!inGastro) setPage(pages.length);
    };
    var cancelMove = function cancelMove() {
      return setMoveMode(false);
    };
    var cancelParked = function cancelParked(id) {
      // anulowanie zaparkowanego paragonu → lista „Anulowane”
      var b = billsRef.current.find(function (x) {
        return x.id === id;
      });
      if (!b) return;
      var L = b.id === curRef.current ? linesRef.current : (b.lines || []).concat(b.rest || []);
      setBillsX(function (xs) {
        return [_objectSpread(_objectSpread({}, b), {}, {
          lines: L,
          rest: null,
          cancelled: Date.now(),
          cancelledBy: cashier.id
        })].concat(_toConsumableArray(xs)).slice(0, 200);
      });
      setBills(function (bs) {
        return bs.filter(function (x) {
          return x.id !== id;
        });
      });
      if (b.id === curRef.current) leaveCur();
    };
    var dropCurBill = function dropCurBill() {
      // po płatności: reszta podzielonego rachunku wraca na paragon (i okno podziału), inaczej rachunek znika
      var cid = curRef.current;
      if (!cid) return null;
      var cb = billsRef.current.find(function (x) {
        return x.id === cid;
      });
      if (cb && cb.rest && cb.rest.length) {
        commit(cb.rest);
        setBills(function (bs) {
          return bs.map(function (x) {
            return x.id === cid ? _objectSpread(_objectSpread({}, x), {}, {
              rest: null,
              lines: [],
              touched: Date.now()
            }) : x;
          });
        });
        return cb.split || {
          mode: 'items'
        };
      }
      setBills(function (bs) {
        return bs.filter(function (x) {
          return x.id !== cid;
        });
      });
      setCur(null);
      return null;
    };
    var restoreSplit = function restoreSplit() {
      var cid = curRef.current;
      var cb = cid && billsRef.current.find(function (x) {
        return x.id === cid;
      });
      if (!cb || !cb.rest || !cb.rest.length) return;
      commit(linesRef.current.concat(cb.rest));
      setBills(function (bs) {
        return bs.map(function (x) {
          return x.id === cid ? _objectSpread(_objectSpread({}, x), {}, {
            rest: null,
            split: null
          }) : x;
        });
      });
    };

    // ── płatność ──
    var openPay = function openPay() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cash';
      if (rcptOff) return;
      if (!linesRef.current.length) {
        err('Paragon jest pusty');
        return;
      }
      var entry = bufRef.current.entry;
      if (total < 0) {
        err('Suma paragonu jest ujemna — dodaj towar lub usuń zwrot');
        return;
      }
      var tender = entry && method === 'cash' ? entry : '';
      clearBuf();
      setSelId(null);
      setSheet({
        type: 'pay',
        props: {
          method: method,
          tender: tender
        },
        k: ++seq.current
      });
    };
    var quickPay = function quickPay(method) {
      if (noSale) {
        err(noSaleMsg);
        return;
      }
      if (!linesRef.current.length) {
        err('Paragon jest pusty');
        return;
      }
      if (total < 0) {
        err('Suma paragonu jest ujemna — dodaj towar lub usuń zwrot');
        return;
      }
      var tender = method === 'cash' ? bufRef.current.entry : '';
      if (tender && NPF.parseNum(tender) + 0.0001 < total) {
        err("Wp\u0142ata ".concat(tender, " z\u0142 jest mniejsza ni\u017C suma ").concat(M(total), " z\u0142"));
        return;
      }
      clearBuf();
      setSelId(null);
      setSheet({
        type: 'pay',
        props: {
          method: method,
          tender: tender,
          auto: true
        },
        k: ++seq.current
      });
    };
    var payDone = function payDone(r) {
      linesRef.current.forEach(function (l) {
        var pr = NP_DB.get(l.pid);
        if (!pr) return;
        var val = NPF.round2(l.qty * l.price * (1 - (l.adj || 0) / 100));
        NP_DB.save(_objectSpread(_objectSpread({}, pr), {}, {
          soldQty: r3((pr.soldQty || 0) + l.qty),
          soldVal: NPF.round2((pr.soldVal || 0) + val),
          stock: r3((+pr.stock || 0) - l.qty)
        }));
      });
      var no = receiptNo,
        t = total;
      var by = {
        cash: 0,
        card: 0,
        blik: 0,
        bon: 0
      };
      (r.payments || [{
        method: r.method,
        amount: t
      }]).forEach(function (p) {
        by[p.method] = NPF.round2((by[p.method] || 0) + p.amount);
      });
      setStats(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          receipts: s.receipts + 1,
          gross: NPF.round2(s.gross + t),
          cash: NPF.round2(s.cash + by.cash),
          card: NPF.round2(s.card + by.card),
          blik: NPF.round2(s.blik + by.blik),
          bon: NPF.round2(s.bon + by.bon),
          drawer: NPF.round2(s.drawer + by.cash),
          last: {
            no: no,
            total: t,
            method: r.method
          }
        });
      });
      resetReceipt();
      close();
      var again = dropCurBill();
      if (again) later(function () {
        return setSheet({
          type: 'gsplit',
          props: {
            init: again
          },
          k: ++seq.current
        });
      }, 250);
      setLastEvent({
        kind: 'pay',
        text: "".concat(invoice ? 'Faktura' : 'Paragon', " ").concat(npPad4(no), " zamkni\u0119ty").concat(r.change > 0 ? " \xB7 reszta ".concat(M(r.change), " z\u0142") : '')
      });
    };

    // ── funkcje (kafelki, Funkcje F, F+numer, menu) ──
    var _runFunc = function runFunc(id, ctx) {
      var e = ctx && 'entry' in ctx ? ctx.entry : bufRef.current.entry;
      var mode = bufRef.current.mode;
      var lines = linesRef.current;
      switch (id) {
        case 'szybkiAsort':
          setSheet({
            type: 'quickGroup',
            props: {},
            k: ++seq.current
          });
          return;
        case 'rabat10':
          applyAdj(10);
          return;
        case 'rabatLista':
          {
            if (!lines.length) {
              err('Brak pozycji na paragonie');
              return;
            }
            var v = Math.round(NPF.parseNum(e));
            if (e && v > 0 && v < 100) {
              applyAdj(v);
              return;
            }
            setSheet({
              type: 'rabat',
              props: {
                lineId: (target() || {}).id
              },
              k: ++seq.current
            });
            return;
          }
        case 'rabatDok':
          if (!lines.length) {
            err('Brak pozycji na paragonie');
            return;
          }
          setSheet({
            type: 'docOpts',
            props: {
              tab: 'rabat'
            },
            k: ++seq.current
          });
          return;
        case 'rabat10zl':
          if (!lines.length) {
            err('Brak pozycji na paragonie');
            return;
          }
          setRcptDisc({
            type: 'amt',
            v: 10
          });
          setLastEvent({
            kind: 'info',
            text: 'Rabat 10.00 zł na paragon'
          });
          return;
        case 'storno':
          storno(selId);
          return;
        case 'anuluj':
          if (!lines.length) {
            err('Paragon jest pusty');
            return;
          }
          dialog({
            tone: 'warning',
            title: 'Anulować paragon?',
            desc: "Wszystkie pozycje (".concat(lines.length, ") zostan\u0105 usuni\u0119te. Anulowanie zostanie zapisane w raporcie."),
            actions: [{
              label: 'Nie',
              cancel: true,
              onClick: close
            }, {
              label: 'Anuluj paragon',
              tone: 'red',
              primary: true,
              onClick: function onClick() {
                var no = receiptNo;
                close();
                resetReceipt();
                if (curRef.current) {
                  var cid = curRef.current;
                  setBills(function (bs) {
                    return bs.filter(function (x) {
                      return x.id !== cid;
                    });
                  });
                  setCur(null);
                }
                setLastEvent({
                  kind: 'storno',
                  text: "Paragon ".concat(npPad4(no), " anulowany")
                });
              }
            }]
          });
          return;
        case 'nip':
          setSheet({
            type: 'docOpts',
            props: {
              tab: 'nip'
            },
            k: ++seq.current
          });
          return;
        case 'faktura':
          if (invoice) {
            setInvoice(false);
            say('Dokument: paragon', 'info', 'receipt');
            return;
          }
          setInvoice(true);
          if (!nip) _runFunc('nip');else say('Dokument: faktura', 'ok', 'receipt');
          return;
        case 'kopia':
          if (!stats.last) {
            err('Brak paragonu do skopiowania');
            return;
          }
          progressThen('Drukowanie kopii…', "Paragon ".concat(npPad4(stats.last.no)), 1300, {
            title: 'Kopia wydrukowana',
            desc: "Paragon ".concat(npPad4(stats.last.no), " \xB7 ").concat(M(stats.last.total), " z\u0142")
          });
          return;
        case 'gotowka':
          quickPay('cash');
          return;
        case 'karta':
          quickPay('card');
          return;
        case 'blik':
          quickPay('blik');
          return;
        case 'skan':
          scan();
          return;
        case 'waga':
          weigh();
          return;
        case 'cena':
          if (e) {
            var p = findCode(e);
            setBuf({
              entry: ''
            });
            if (!p) err("Brak towaru o kodzie ".concat(e));else showPrice(p);
            return;
          }
          setBuf(function (b) {
            return {
              mode: b.mode === 'check' ? null : 'check'
            };
          });
          return;
        case 'zwrot':
          if (mode !== 'return') say('Wybierz towar lub kaucję do zwrotu', 'info', 'recycle');
          setBuf(function (b) {
            return {
              mode: b.mode === 'return' ? null : 'return'
            };
          });
          return;
        case 'szuflada':
          say('Szuflada otwarta', 'ok', 'archive');
          return;
        case 'wplata':
          amount({
            title: 'Wpłata do kasy',
            desc: "W szufladzie: ".concat(M(drawer), " z\u0142"),
            mode: 'money',
            confirmLabel: 'Wpłać',
            onConfirm: function onConfirm(v) {
              close();
              setStats(function (s) {
                return _objectSpread(_objectSpread({}, s), {}, {
                  drawer: NPF.round2(s.drawer + v)
                });
              });
              dialog({
                tone: 'success',
                title: 'Wpłata przyjęta',
                rows: [['Kwota', "".concat(M(v), " z\u0142")], ['Kasjer', cashier.name], ['Gotówka w szufladzie', "".concat(M(drawer + v), " z\u0142")]],
                actions: [{
                  label: 'OK',
                  primary: true,
                  onClick: close
                }]
              });
            }
          });
          return;
        case 'wyplata':
          amount({
            title: 'Wypłata z kasy',
            desc: "W szufladzie: ".concat(M(drawer), " z\u0142"),
            mode: 'money',
            confirmLabel: 'Wypłać',
            confirmTone: 'red',
            validate: function validate(v) {
              return NPF.parseNum(v) <= drawer ? null : "W szufladzie jest tylko ".concat(M(drawer), " z\u0142");
            },
            onConfirm: function onConfirm(v) {
              close();
              setStats(function (s) {
                return _objectSpread(_objectSpread({}, s), {}, {
                  drawer: NPF.round2(s.drawer - v)
                });
              });
              dialog({
                tone: 'success',
                title: 'Wypłata wykonana',
                rows: [['Kwota', "".concat(M(v), " z\u0142")], ['Kasjer', cashier.name], ['Gotówka w szufladzie', "".concat(M(drawer - v), " z\u0142")]],
                actions: [{
                  label: 'OK',
                  primary: true,
                  onClick: close
                }]
              });
            }
          });
          return;
        case 'stan':
          dialog({
            tone: 'info',
            title: 'Stan kasy',
            desc: "".concat(cashier.name, " \xB7 ").concat(NPF.time(new Date())),
            rows: [['Gotówka w szufladzie', "".concat(M(stats.drawer), " z\u0142")], ['Karta płatnicza', "".concat(M(stats.card), " z\u0142")], ['BLIK', "".concat(M(stats.blik), " z\u0142")], ['Bony', "".concat(M(stats.bon), " z\u0142")], ['Sprzedaż od raportu', "".concat(M(stats.gross), " z\u0142")], ['Paragony', String(stats.receipts)]],
            actions: [{
              label: 'Drukuj',
              onClick: function onClick() {
                close();
                say('Drukowanie stanu kasy', 'info', 'printer');
              }
            }, {
              label: 'OK',
              primary: true,
              onClick: close
            }]
          });
          return;
        case 'rdob':
          if (lines.length) {
            err('Zamknij paragon przed raportem dobowym');
            return;
          }
          dialog({
            tone: 'question',
            title: 'Raport fiskalny dobowy',
            desc: 'Czy chcesz wykonać raport fiskalny dobowy i czy podana poniżej data i godzina są prawidłowe?',
            rows: [['Data i godzina kasy', new Date().toLocaleString('pl-PL', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', '')], ['Paragony od ostatniego raportu', String(stats.receipts)], ['Sprzedaż brutto', "".concat(M(stats.gross), " z\u0142")]],
            actions: [{
              label: 'Nie',
              cancel: true,
              onClick: close
            }, {
              label: 'Tak, wykonaj',
              primary: true,
              onClick: function onClick() {
                var s = stats;
                progressThen('Drukowanie raportu dobowego…', 'Nie wyłączaj kasy', 2000, {
                  title: 'Raport dobowy wykonany',
                  rows: [['Raport nr', String(s.reportNo + 1).padStart(4, '0')], ['Paragony', String(s.receipts)], ['Sprzedaż brutto', "".concat(M(s.gross), " z\u0142")], ['Gotówka', "".concat(M(s.cash), " z\u0142")], ['Karta i BLIK', "".concat(M(s.card + s.blik), " z\u0142")]]
                });
                setStats(function (x) {
                  return _objectSpread(_objectSpread({}, x), {}, {
                    reportNo: x.reportNo + 1,
                    receipts: 0,
                    gross: 0,
                    cash: 0,
                    card: 0,
                    blik: 0,
                    bon: 0
                  });
                });
              }
            }]
          });
          return;
        case 'rokr':
          {
            var d = new Date();
            var mon = d.toLocaleDateString('pl-PL', {
              month: 'long',
              year: 'numeric'
            });
            progressThen('Drukowanie raportu okresowego…', "1\u2013".concat(d.getDate(), " ").concat(mon), 2200, {
              title: 'Raport okresowy wydrukowany',
              rows: [['Okres', "1\u2013".concat(d.getDate(), " ").concat(mon)], ['Raporty dobowe w okresie', String(Math.max(1, d.getDate() - 1))]]
            });
            return;
          }
        case 'rkas':
          progressThen('Drukowanie raportu kasjera…', cashier.name, 1500, {
            title: 'Raport kasjera wydrukowany',
            rows: [['Kasjer', cashier.name], ['Paragony', String(stats.receipts)], ['Sprzedaż', "".concat(M(stats.gross), " z\u0142")]]
          });
          return;
        case 'kasjer':
          tryLogout();
          return;
        case 'wyjscie':
          if (lines.length) {
            err('Zakończ lub anuluj paragon przed wyjściem z okna sprzedaży');
            return;
          }
          dialog({
            tone: 'question',
            title: 'Czy chcesz wyjść z okna sprzedaży?',
            desc: "Kasjer ".concat(cashier.name, " zostanie wylogowany, nast\u0105pi powr\xF3t do wyboru kasjera."),
            actions: [{
              label: 'Nie',
              cancel: true,
              onClick: close
            }].concat(NP_SHIFT.canShift(cashier) && NP_SHIFT.isOpen(cashier.id) ? [{
              label: 'Zamknij zmianę',
              tone: 'red',
              onClick: function onClick() {
                close();
                NP_SHIFT.close(cashier.id);
                progressThen('Drukowanie raportu zmiany…', cashier.name, 1300, {
                  title: 'Zmiana zamknięta',
                  rows: [['Kasjer', cashier.name]]
                });
                later(onLogout, 1500);
              }
            }] : []).concat([{
              label: 'Wyjdź',
              primary: true,
              onClick: function onClick() {
                close();
                onLogout();
              }
            }])
          });
          return;
        case 'blokada':
          clearBuf();
          onLock();
          return;
        case 'klawiszC':
          escKey();
          return;
        case 'gParkuj':
          {
            if (!lines.length && !curRef.current) {
              err('Paragon jest pusty');
              return;
            }
            var cb = curRef.current && billsRef.current.find(function (x) {
              return x.id === curRef.current;
            });
            var no = cb ? cb.no : parkNoRef.current + 1;
            saveCur();
            leaveCur();
            setMoveMode(false);
            say(cb && cb.table != null ? "Rachunek od\u0142o\u017Cony na stolik ".concat(cb.table) : "Paragon zaparkowany \xB7 nr ".concat(no), 'ok', 'clock');
            return;
          }
        case 'gLista':
          setSheet({
            type: 'park',
            props: {},
            k: ++seq.current
          });
          return;
        case 'gNowy':
          if (lines.length || curRef.current) {
            saveCur();
            leaveCur();
          }
          setMoveMode(false);
          say('Nowy rachunek', 'info', 'plus');
          return;
        case 'gOpisz':
          {
            var cid = curRef.current;
            if (!cid && !lines.length) {
              err('Wybierz stolik lub rachunek');
              return;
            }
            if (!cid) {
              var nb = newBill(null);
              setBills(function (bs) {
                return [].concat(_toConsumableArray(bs), [nb]);
              });
              setCur(nb.id);
              cid = nb.id;
            }
            var b = billsRef.current.find(function (x) {
              return x.id === cid;
            }) || {};
            setSheet({
              type: 'gdesc',
              props: {
                id: cid,
                title: b.table != null ? "Stolik ".concat(b.table, " \xB7 opis") : 'Opis rachunku',
                name: b.name,
                guests: b.guests
              },
              k: ++seq.current
            });
            return;
          }
        case 'gPrzenies':
          if (!curRef.current) {
            err('Najpierw wybierz stolik lub rachunek');
            return;
          }
          if (moveMode) {
            setMoveMode(false);
            return;
          }
          setMoveMode({
            id: curRef.current
          });
          goTables();
          say('Dotknij wolny stolik', 'info', 'log-out');
          return;
        case 'gPodziel':
          if (!lines.length) {
            err('Rachunek jest pusty');
            return;
          }
          setSheet({
            type: 'gsplit',
            props: {},
            k: ++seq.current
          });
          return;
        case 'gKuchnia':
          {
            if (!lines.length) {
              err('Rachunek jest pusty');
              return;
            }
            var nw = lines.filter(function (l) {
              return !l.sent;
            }).length;
            if (!nw) {
              say('Wszystkie pozycje są już w kuchni', 'info', 'chef-hat');
              return;
            }
            commit(lines.map(function (l) {
              return _objectSpread(_objectSpread({}, l), {}, {
                sent: true
              });
            }));
            say("Wys\u0142ano do kuchni: ".concat(nw, " poz."), 'ok', 'chef-hat');
            return;
          }
        case 'wysuw':
          feed();
          return;
        default:
          return;
      }
    };
    var tryLogout = function tryLogout() {
      if (lines.length) {
        err('Zakończ lub anuluj paragon przed zmianą kasjera');
        return;
      }
      if (menuOnly || !NP_SHIFT.canShift(cashier) || !NP_SHIFT.isOpen(cashier.id)) {
        onLogout();
        return;
      }
      dialog({
        tone: 'question',
        title: 'Wylogować kasjera?',
        desc: "".concat(cashier.name, " \xB7 zmiana otwarta od ").concat(NPF.time(new Date(NP_SHIFT.startOf(cashier.id))), ". Po wylogowaniu zmiana mo\u017Ce zosta\u0107 otwarta \u2014 kasjer wr\xF3ci do niej po ponownym zalogowaniu."),
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: close
        }, {
          label: 'Zamknij zmianę',
          tone: 'red',
          onClick: function onClick() {
            close();
            progressThen('Drukowanie raportu zmiany…', cashier.name, 1300, {
              title: 'Zmiana zamknięta',
              rows: [['Kasjer', cashier.name], ['Paragony', String(stats.receipts)], ['Sprzedaż', "".concat(M(stats.gross), " z\u0142")]]
            });
            NP_SHIFT.close(cashier.id);
            later(onLogout, 1500);
          }
        }, {
          label: 'Wyloguj',
          primary: true,
          onClick: function onClick() {
            close();
            onLogout();
          }
        }]
      });
    };
    var powerDialog = function powerDialog() {
      return dialog({
        tone: 'power',
        title: 'Wyłączyć kasę?',
        desc: lines.length ? 'Otwarty paragon zostanie zachowany do ponownego uruchomienia.' : 'Przed wyłączeniem upewnij się, że raport dobowy został wykonany.',
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: close
        }, {
          label: 'Uruchom ponownie',
          onClick: function onClick() {
            close();
            onRestart();
          }
        }, {
          label: 'Wyłącz',
          tone: 'red',
          primary: true,
          onClick: function onClick() {
            close();
            onPowerOff();
          }
        }]
      });
    };
    var menuAction = function menuAction(it) {
      var a = it.action;
      if (!a) {
        say("".concat(it.label, " \u2014 ekran w przygotowaniu"), 'info', 'clock');
        return;
      }
      if (menuOnly && ['editTiles', 'goF', 'goGoods', 'editF', 'gPlanEdit'].includes(a)) {
        say('Dostępne w oknie sprzedaży — zaloguj się jako kasjer', 'info', 'lock');
        return;
      }
      if (a.startsWith('f:')) {
        _runFunc(a.slice(2), {
          entry: ''
        });
        return;
      }
      if (a.startsWith('rep:')) {
        var n = a.slice(4);
        progressThen("Drukowanie: ".concat(n.toLowerCase(), "\u2026"), 'Nie odrywaj wydruku do końca', 1600, {
          title: "".concat(n, " wydrukowany"),
          rows: [['Kasjer', cashier.name], ['Data', NPF.dateFull(new Date())]]
        });
        return;
      }
      switch (a) {
        case 'editTiles':
          setTab('panele');
          setEdit(true);
          return;
        case 'gPlanEdit':
          if (!gastroOn) {
            say('Włącz tryb gastro: Ustawienia › Gastronomia', 'info', 'utensils');
            return;
          }
          if (gView !== 'plan') {
            say('Ustaw „Widok stolików: Plan sali” w Ustawieniach › Gastronomia', 'info', 'utensils');
            return;
          }
          goTables();
          setPlanEdit(0);
          return;
        case 'layout':
          {
            var nx = tweaks.receipt === 'right' ? 'left' : 'right';
            onTweak('receipt', nx);
            say(nx === 'left' ? 'Paragon po lewej stronie ekranu' : 'Paragon po prawej stronie ekranu', 'info', 'monitor');
            return;
          }
        case 'editF':
          setFOpen('edit');
          return;
        case 'goF':
          setTab('funkcjeF');
          return;
        case 'goGoods':
          setTab('towary');
          return;
        case 'sync':
          progressThen('Synchronizacja z NoviCloud…', 'Wysyłanie paragonów i pobieranie cennika', 1800, {
            title: 'Synchronizacja zakończona',
            rows: [['Wysłane paragony', String(stats.receipts)], ['Ostatnia synchronizacja', NPF.time(new Date())]]
          });
          return;
        case 'archive':
          progressThen('Archiwizacja na serwerze…', 'Baza towarów i kopia elektroniczna', 2000, {
            title: 'Archiwizacja zakończona',
            desc: 'Kopia zapisana w NoviCloud.'
          });
          return;
        case 'update':
          progressThen('Wyszukiwanie aktualizacji…', 'Łączenie z serwerem aktualizacji', 1600, {
            title: 'Dostępna aktualizacja',
            desc: 'Wersja 2.4.1 zostanie zainstalowana po raporcie dobowym.'
          });
          return;
        case 'conn':
          dialog({
            tone: 'info',
            title: 'Status połączenia',
            rows: [['Wi‑Fi', 'Połączono'], ['NoviCloud', 'Połączono'], ['CRK', 'Połączono'], ['Terminal płatniczy', 'Gotowy'], ['Waga', 'Gotowa'], ['Skaner kodów', 'Gotowy']],
            actions: [{
              label: 'OK',
              primary: true,
              onClick: close
            }]
          });
          return;
        case 'cloudImport':
          progressThen('Ponowny import wykazów…', 'Towary, asortymenty, operatorzy', 1800, {
            title: 'Wykazy zaimportowane',
            rows: [['Towary', String(NP_DATA.PRODUCTS.length)], ['Asortymenty', String(NP_DATA.GROUPS.length)], ['Operatorzy', String(NP_DATA.CASHIERS.length)]]
          });
          return;
        case 'cloudExport':
          progressThen('Ponowny eksport paragonów…', 'Wysyłanie do NoviCloud', 1800, {
            title: 'Paragony wysłane',
            rows: [['Wysłane paragony', String(stats.receipts)]]
          });
          return;
        case 'restoreServer':
          dialog({
            tone: 'warning',
            title: 'Odzyskać dane z serwera?',
            desc: 'Baza towarów i ustawienia zostaną zastąpione kopią z NoviCloud.',
            actions: [{
              label: 'Anuluj',
              cancel: true,
              onClick: close
            }, {
              label: 'Odzyskaj',
              primary: true,
              onClick: function onClick() {
                return progressThen('Odzyskiwanie z serwera…', 'Pobieranie kopii', 2000, {
                  title: 'Dane odzyskane',
                  desc: 'Kopia z NoviCloud została wczytana.'
                });
              }
            }]
          });
          return;
        case 'exportReports':
          progressThen('Eksport raportów dobowych…', 'Wysyłanie do NoviCloud', 1600, {
            title: 'Raporty dobowe wysłane',
            rows: [['Ostatni raport', String(stats.reportNo).padStart(4, '0')]]
          });
          return;
        case 'pendrive':
          progressThen('Archiwizacja na pendrive…', 'Nie wyjmuj pamięci USB', 1800, {
            title: 'Archiwizacja zakończona',
            desc: 'Kopia zapisana na pendrive.'
          });
          return;
        case 'restorePendrive':
          dialog({
            tone: 'warning',
            title: 'Odzyskać dane z pendrive?',
            desc: 'Baza towarów i ustawienia zostaną zastąpione kopią z pamięci USB.',
            actions: [{
              label: 'Anuluj',
              cancel: true,
              onClick: close
            }, {
              label: 'Odzyskaj',
              primary: true,
              onClick: function onClick() {
                return progressThen('Odzyskiwanie z pendrive…', 'Wczytywanie kopii', 1800, {
                  title: 'Dane odzyskane'
                });
              }
            }]
          });
          return;
        case 'cleanDb':
          dialog({
            tone: 'warning',
            title: 'Wyczyścić bazę danych?',
            desc: 'Zostaną usunięte archiwalne dokumenty sprzedaży starsze niż 2 lata. Towary i ustawienia pozostaną.',
            actions: [{
              label: 'Anuluj',
              cancel: true,
              onClick: close
            }, {
              label: 'Wyczyść',
              tone: 'red',
              primary: true,
              onClick: function onClick() {
                return progressThen('Czyszczenie bazy danych…', 'Nie wyłączaj kasy', 2000, {
                  title: 'Baza wyczyszczona'
                });
              }
            }]
          });
          return;
        case 'repairs':
          progressThen('Sprawdzanie bazy danych…', 'Naprawa indeksów', 1800, {
            title: 'Naprawy zakończone',
            desc: 'Nie znaleziono błędów.'
          });
          return;
        case 'service':
          amount({
            title: 'Operacje serwisowe',
            desc: 'Wpisz PIN serwisowy',
            mode: 'digits',
            maxLen: 6,
            suffix: '',
            confirmLabel: 'Dalej',
            format: function format(v) {
              return '•'.repeat(v.length);
            },
            onConfirm: function onConfirm() {
              close();
              say('Nieprawidłowy PIN serwisowy', 'err', 'key');
            }
          });
          return;
        case 'autoReport':
          dialog({
            tone: 'question',
            title: 'Auto-raport dobowy',
            desc: 'Raport dobowy wykona się automatycznie o 23:55, jeśli nie ma otwartego paragonu.',
            actions: [{
              label: 'Wyłącz',
              onClick: function onClick() {
                close();
                say('Auto-raport wyłączony', 'info', 'calendar-clock');
              }
            }, {
              label: 'Włącz',
              primary: true,
              onClick: function onClick() {
                close();
                say('Auto-raport o 23:55 włączony', 'ok', 'check');
              }
            }]
          });
          return;
        case 'remoteHelp':
          {
            var code = String(Math.floor(100000000 + Math.random() * 900000000)).replace(/(\d{3})(?=\d)/g, '$1 ');
            progressThen('Uruchamianie pomocy zdalnej…', 'Łączenie z serwisem Novitus', 1500, {
              tone: 'info',
              title: 'Pomoc zdalna gotowa',
              desc: 'Podaj serwisantowi poniższy kod. Połączenie wygaśnie po 10 minutach.',
              rows: [['Kod połączenia', code], ['Kasa', SHOP.kasa + ' · ' + SHOP.nip]],
              actions: [{
                label: 'Zakończ sesję',
                tone: 'red',
                onClick: function onClick() {
                  close();
                  say('Sesja pomocy zdalnej zakończona', 'info', 'headset');
                }
              }, {
                label: 'OK',
                primary: true,
                onClick: close
              }]
            });
            return;
          }
        case 'about':
          dialog({
            tone: 'info',
            title: NP_BRAND.full,
            rows: [['Wersja aplikacji', '2.4.0 · prototyp'], ['Ekran', '10.1″ · 1280 × 800'], ['Sklep', SHOP.name], [SHOP.kasa, SHOP.nip]],
            actions: [{
              label: 'OK',
              primary: true,
              onClick: close
            }]
          });
          return;
        default:
          return;
      }
    };

    // Klawisz C (ESC): kasuje wpis / ilość / cenę / tryb, potem zaznaczenie, potem ostatni komunikat
    var escKey = function escKey() {
      var _bufRef$current2 = bufRef.current,
        entry = _bufRef$current2.entry,
        qty = _bufRef$current2.qty,
        priceOv = _bufRef$current2.priceOv,
        fMode = _bufRef$current2.fMode,
        mode = _bufRef$current2.mode;
      if (entry || qty || priceOv != null || fMode || mode) clearBuf();else if (selId) setSelId(null);else if (lastEvent) setLastEvent(null);
    };
    // ── klawiatura kasy (ekranowa / fizyczna / PC) ──
    useKeys(function (k) {
      if (rcptOff && k !== 'MENU') return true; // menu otwarte obok paragonu lub brak uprawnień do sprzedaży — paragon nieaktywny
      var _bufRef$current3 = bufRef.current,
        entry = _bufRef$current3.entry,
        qty = _bufRef$current3.qty,
        priceOv = _bufRef$current3.priceOv,
        fMode = _bufRef$current3.fMode,
        mode = _bufRef$current3.mode;
      if (fMode && /^[1-9]$/.test(k)) {
        var sl = fKey[F_IDX[k]];
        setBuf({
          fMode: false
        });
        if (sl) onTile(sl);else err("Klawisz F".concat(k, " nie ma przypisanej funkcji"));
        return true;
      }
      if (fMode && (k === '0' || k === '.')) return true;
      if (/^[0-9]$/.test(k) || k === '.') {
        setBuf(function (b) {
          return {
            entry: appendEntry(b.entry, k)
          };
        });
        return true;
      }
      switch (k) {
        case 'BACK':
          setBuf(function (b) {
            return {
              entry: b.entry.slice(0, -1)
            };
          });
          break;
        case 'ESC':
          escKey();
          break;
        case 'X':
          if (entry) {
            var v = NPF.parseNum(entry);
            if (!(v > 0)) {
              err('Nieprawidłowa ilość');
              break;
            }
            setBuf({
              qty: {
                v: v,
                unit: entry.includes('.') ? 'kg' : 'szt'
              },
              entry: ''
            });
          } else weigh();
          break;
        case 'CENA':
          if (entry) {
            var _v = NPF.parseNum(entry);
            if (!(_v > 0)) {
              err('Nieprawidłowa cena');
              break;
            }
            setBuf({
              priceOv: _v,
              entry: ''
            });
          } else err('Wpisz nową cenę, a potem naciśnij CENA');
          break;
        case 'KOD':
          if (entry) sellByCode(entry, 'kod');else err('Wpisz kod towaru, a potem naciśnij KOD');
          break;
        case 'OK':
          if (entry) sellByCode(entry, 'kod');else if (selId) setSelId(null);
          break;
        case 'RAZEM':
          openPay('cash');
          break;
        case 'F':
          setBuf({
            fMode: !fMode
          });
          break;
        case 'FEED':
          feed();
          break;
        case 'MENU':
          if (fMode) {
            setBuf({
              fMode: false
            });
            setFOpen('edit');
          } else goTab('menu');
          break;
        case 'SCAN':
          scan();
          break;
        default:
          break;
      }
      return true;
    }, 0);
    var onTile = function onTile(slot) {
      if (slot.t === 'p') {
        var p = NP_DB.get(slot.id);
        if (p) sell(p, 'tile');
        return;
      }
      if (slot.id === 'szybkiAsort') {
        setSheet({
          type: 'quickGroup',
          props: {
            arg: slot.arg
          },
          k: ++seq.current
        });
        return;
      }
      _runFunc(slot.id);
    };
    var saveSlot = function saveSlot(w, draft) {
      if (w.src === 'kbrow') setKbRow(function (r) {
        var n = r.slice();
        n[w.s] = draft;
        return n;
      });else if (w.src === 'fkey') setFKey(function (r) {
        var n = r.slice();
        n[w.s] = draft;
        return n;
      });else if (w.src === 'qpay') setQPay(function (r) {
        var n = r.slice();
        n[w.s] = draft;
        return n;
      });else if (w.src === 'grow') setGRow(function (r) {
        var n = r.slice();
        n[w.s] = draft;
        return n;
      });else (w.src === 'fpages' ? setFPages : setPages)(function (ps) {
        return ps.map(function (pg, i) {
          return i !== w.p ? pg : _objectSpread(_objectSpread({}, pg), {}, {
            slots: pg.slots.map(function (s, j) {
              return j === w.s ? draft : s;
            })
          });
        });
      });
      setEditSlot(null);
    };
    var slotOf = function slotOf(w) {
      return (w.src === 'kbrow' ? kbRow[w.s] : w.src === 'grow' ? gRow[w.s] : w.src === 'fkey' ? fKey[w.s] : w.src === 'qpay' ? qPay[w.s] : (w.src === 'fpages' ? fpages : pages)[w.p].slots[w.s]) || null;
    };
    // Rozmiar kafelka tylko na Panelach i w Funkcjach (siatka); ograniczony krawędzią strony
    var maxSizeOf = function maxSizeOf(w) {
      return w.src === 'pages' || w.src === 'fpages' ? {
        w: Math.min(2, gc - w.s % gc),
        h: Math.min(2, gr - Math.floor(w.s / gc))
      } : null;
    };
    var whereLabel = function whereLabel(w) {
      return w.src === 'kbrow' ? "Rz\u0105d nad klawiatur\u0105 \xB7 pole ".concat(w.s + 1) : w.src === 'grow' ? "Gastro \xB7 rz\u0105d klawiszy \xB7 pole ".concat(w.s + 1) : w.src === 'fkey' ? "Klawisz F \xB7 pole ".concat(w.s + 1) : w.src === 'qpay' ? "Szybka p\u0142atno\u015B\u0107 \xB7 pole ".concat(w.s + 1) : "".concat(w.src === 'fpages' ? 'Funkcje' : 'Panele', " \xB7 strona ").concat(w.p + 1, " \xB7 pole ").concat(w.s + 1);
    };
    var renderSheet = function renderSheet() {
      var type = sheet.type,
        props = sheet.props,
        k = sheet.k;
      if (type === 'dialog') return /*#__PURE__*/React.createElement(Dialog, _extends({
        key: k
      }, props, {
        onClose: props.progress ? null : props.onClose || close
      }));
      if (type === 'amount') return /*#__PURE__*/React.createElement(AmountSheet, _extends({
        key: k
      }, props));
      if (type === 'pay') return /*#__PURE__*/React.createElement(PaySheet, {
        key: k,
        cashier: cashier,
        subtotal: subtotal,
        rdAmt: rdAmt,
        invoice: invoice,
        nip: nip,
        total: total,
        count: lines.length,
        receiptNo: receiptNo,
        initialMethod: props.method,
        initialTender: props.tender,
        auto: !!props.auto,
        onCancel: function onCancel() {
          close();
          restoreSplit();
        },
        onDone: payDone
      });
      if (type === 'gname') return /*#__PURE__*/React.createElement(GastroTextSheet, {
        key: k,
        title: "Stolik ".concat(props.n, " \xB7 sta\u0142a nazwa"),
        value: gNames[props.n] || '',
        placeholder: "np. Okno, Lo\u017Ca",
        sugg: ['Okno', 'Loża', 'Taras', 'Kominek', 'Ogród', 'VIP', 'Scena'],
        onCancel: close,
        onSave: function onSave(v) {
          close();
          setGNames(function (m) {
            var n = _objectSpread({}, m);
            if (v) n[props.n] = v;else delete n[props.n];
            return n;
          });
          say(v ? "Stolik ".concat(props.n, ": \u201E").concat(v, "\u201D") : "Stolik ".concat(props.n, ": bez nazwy"), 'ok', 'check');
        }
      });
      if (type === 'park') return /*#__PURE__*/React.createElement(ParkingSheet, {
        key: k,
        bills: bills,
        cancelled: billsX,
        curId: curBill,
        curLines: lines,
        cashier: cashier,
        tableName: function tableName(n) {
          return gView === 'plan' ? (NP_PLAN.allTables(planN).find(function (t) {
            return t.n === n;
          }) || {}).name || '' : gNames[n] || '';
        },
        onClose: close,
        onOpen: function onOpen(id) {
          close();
          openBill(id);
        },
        onCancelBill: function onCancelBill(id) {
          cancelParked(id);
          say('Paragon zaparkowany anulowany', 'info', 'trash-2');
        },
        onDescribe: function onDescribe(id) {
          var b = billsRef.current.find(function (x) {
            return x.id === id;
          }) || {};
          setSheet({
            type: 'gdesc',
            props: {
              id: id,
              title: b.table != null ? "Stolik ".concat(b.table, " \xB7 opis") : "Paragon zaparkowany nr ".concat(b.no || '', " \xB7 opis"),
              name: b.name,
              guests: b.guests,
              back: 'park'
            },
            k: ++seq.current
          });
        }
      });
      if (type === 'gdesc') return /*#__PURE__*/React.createElement(GastroDescSheet, {
        key: k,
        title: props.title,
        name: props.name,
        guests: props.guests,
        onCancel: function onCancel() {
          return props.back ? setSheet({
            type: 'park',
            props: {},
            k: ++seq.current
          }) : close();
        },
        onSave: function onSave(d) {
          if (props.back) setSheet({
            type: 'park',
            props: {},
            k: ++seq.current
          });else close();
          setBills(function (bs) {
            return bs.map(function (b) {
              return b.id === props.id ? _objectSpread(_objectSpread({}, b), d) : b;
            });
          });
          say('Opis zapisany', 'ok', 'check');
        }
      });
      if (type === 'gsplit') {
        var cb = bills.find(function (x) {
          return x.id === curBill;
        });
        var where = cb ? (cb.table != null ? 'Stolik ' + cb.table : 'Rachunek') + (cb.name ? ' · ' + cb.name : '') : '';
        return /*#__PURE__*/React.createElement(GastroSplitSheet, {
          key: k,
          title: 'Podziel rachunek' + (where ? ' · ' + where : ''),
          lines: lines,
          init: props.init,
          onCancel: close,
          onPayItems: function onPayItems(a, b, plan) {
            close();
            var cid = curRef.current;
            if (b.length) {
              if (!cid) {
                var nb = _objectSpread(_objectSpread({}, newBill(null)), {}, {
                  rest: b,
                  split: plan
                });
                setBills(function (bs) {
                  return [].concat(_toConsumableArray(bs), [nb]);
                });
                setCur(nb.id);
              } else setBills(function (bs) {
                return bs.map(function (x) {
                  return x.id === cid ? _objectSpread(_objectSpread({}, x), {}, {
                    rest: b,
                    split: plan
                  }) : x;
                });
              });
            }
            commit(a);
            later(function () {
              return openPay('cash');
            }, 30);
          },
          onMove: function onMove(a, b) {
            close();
            var nb = newBill(null, a);
            nb.name = where ? where.replace(/^Rachunek · /, '') + ' · część' : 'Część rachunku';
            setBills(function (bs) {
              return [].concat(_toConsumableArray(bs), [nb]);
            });
            commit(b);
            say('Zaznaczone pozycje przeniesione na nowy rachunek', 'ok', 'check');
          },
          onPayEqual: function onPayEqual(payments) {
            close();
            payDone({
              method: payments[0].method,
              payments: payments,
              change: 0
            });
            {
              var n = payments.length;
              say("Rachunek podzielony po r\xF3wno \xB7 ".concat(n, " ").concat(n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'wpłaty' : 'wpłat'), 'ok', 'check');
            }
          }
        });
      }
      if (type === 'docOpts') {
        return /*#__PURE__*/React.createElement(DocOptsSheet, {
          key: k,
          tab: props.tab,
          count: lines.length,
          subtotal: subtotal,
          disc: rcptDisc,
          nip: nip,
          note: rcptNote,
          noteList: noteList,
          setNoteList: setNoteList,
          onCancel: close,
          onApply: function onApply(r) {
            close();
            setRcptDisc(r.disc);
            setNip(r.nip);
            setRcptNote(r.note);
            var ch = [];
            if (JSON.stringify(r.disc) !== JSON.stringify(rcptDisc)) ch.push(r.disc ? r.disc.up ? 'narzut' : 'rabat' : rcptDisc && rcptDisc.up ? 'narzut usunięty' : 'rabat usunięty');
            if (r.nip !== nip) ch.push(r.nip ? 'NIP' : 'NIP usunięty');
            if (r.note !== rcptNote) ch.push(r.note ? 'notatka' : 'notatka usunięta');
            if (ch.length) say('Paragon: ' + ch.join(', '), 'ok', 'check');
          }
        });
      }
      if (type === 'lineMenu') {
        var line = lines.find(function (x) {
          return x.id === props.lineId;
        });
        if (!line) return null;
        return /*#__PURE__*/React.createElement(LineMenuSheet, {
          key: k,
          line: line,
          gastroOn: gastroOn,
          onCancel: close,
          onPick: function onPick(id, l) {
            return onLineAction(id, l);
          }
        });
      }
      if (type === 'quickGroup') return /*#__PURE__*/React.createElement(QuickGroupSheet, {
        key: k,
        arg: props.arg,
        favs: favs,
        counts: counts,
        onCancel: close,
        onSell: function onSell(x) {
          close();
          sell(x, 'tile');
        }
      });
      if (type === 'lineNote') {
        var _line = lines.find(function (x) {
          return x.id === props.lineId;
        });
        if (!_line) return null;
        return /*#__PURE__*/React.createElement(GastroTextSheet, {
          key: k,
          title: 'Komentarz · ' + _line.name,
          value: _line.note || '',
          placeholder: "np. bez cebuli",
          max: 60,
          sugg: ['bez cebuli', 'na wynos', 'bez lodu', 'mniej ostre', 'podać później'],
          onCancel: close,
          onSave: function onSave(v) {
            close();
            commit(linesRef.current.map(function (x) {
              return x.id === _line.id ? _objectSpread(_objectSpread({}, x), {}, {
                note: v || undefined
              }) : x;
            }));
            flash(_line.id);
          }
        });
      }
      if (type === 'rabat') {
        var _line2 = lines.find(function (x) {
          return x.id === props.lineId;
        }) || null;
        return /*#__PURE__*/React.createElement(RabatSheet, {
          key: k,
          line: _line2,
          onCancel: close,
          onApply: function onApply(scope, pct) {
            close();
            if (scope === 'line' && _line2) applyAdj(pct, _line2.id);else {
              setRcptDisc({
                type: 'pct',
                v: pct
              });
              setLastEvent({
                kind: 'info',
                text: "Rabat ".concat(pct, "% na paragon")
              });
            }
          },
          onCustom: function onCustom(scope) {
            return amount({
              title: scope === 'line' ? 'Rabat na pozycję' : 'Rabat na paragon',
              desc: scope === 'line' && _line2 ? _line2.name : 'Procent od sumy paragonu',
              mode: 'percent',
              confirmLabel: 'Udziel rabatu',
              confirmTone: 'red',
              validate: function validate(x) {
                return +x > 0 && +x < 100 ? null : 'Wartość od 1 do 99%';
              },
              onConfirm: function onConfirm(x) {
                close();
                if (scope === 'line' && _line2) applyAdj(x, _line2.id);else {
                  setRcptDisc({
                    type: 'pct',
                    v: x
                  });
                  setLastEvent({
                    kind: 'info',
                    text: "Rabat ".concat(x, "% na paragon")
                  });
                }
              }
            });
          }
        });
      }
      return null;
    };

    // ── stabilne callbacki: React.memo kafelków / pozycji / widoków nie przerysowuje się przy każdym klawiszu ──
    var onTileS = useEvent(onTile);
    var onQtyS = useEvent(onQty);
    var stornoS = useEvent(storno);
    var onLineActionS = useEvent(onLineAction);
    var sellListS = useEvent(function (p) {
      return noSale ? editProduct(p.plu) : sell(p, 'list');
    });
    var powerDialogS = useEvent(powerDialog);
    var menuActionS = useEvent(menuAction);
    var tryLogoutS = useEvent(tryLogout);
    var goTabS = useEvent(goTab);
    var openPayCashS = useEvent(function () {
      return openPay('cash');
    });
    var clearRcptDiscS = useCallback(function () {
      return setRcptDisc(null);
    }, []);
    var openDocMenuS = useEvent(function () {
      return setSheet({
        type: 'docOpts',
        props: {},
        k: ++seq.current
      });
    });
    var toggleSel = useCallback(function (id) {
      return setSelId(function (x) {
        return x === id ? null : id;
      });
    }, []);
    var editKbRow = useCallback(function (i) {
      return setEditSlot({
        src: 'kbrow',
        s: i
      });
    }, []);
    var editPages = useCallback(function (at) {
      return setEditSlot(_objectSpread({
        src: 'pages'
      }, at));
    }, []);
    var editFPages = useCallback(function (at) {
      return setEditSlot(_objectSpread({
        src: 'fpages'
      }, at));
    }, []);
    var editQPay = useCallback(function (i) {
      return setEditSlot({
        src: 'qpay',
        s: i
      });
    }, []);
    var editGRow = useCallback(function (i) {
      return setEditSlot({
        src: 'grow',
        s: i
      });
    }, []);
    var openTableS = useEvent(openTable);
    var openBillS = useEvent(openBill);
    var cancelMoveS = useEvent(cancelMove);
    var renderGastro = function renderGastro(i, active) {
      return /*#__PURE__*/React.createElement(GastroPage, {
        active: active,
        view: gView,
        tables: gTables,
        plan: planN,
        names: gNames,
        bills: bills,
        curId: curBill,
        curLines: lines,
        row: gRow,
        onTile: onTileS,
        onEditRow: editGRow,
        onTable: openTableS,
        moveMode: moveMode,
        onCancelMove: cancelMoveS,
        canEdit: !!cashier.admin,
        onNameTable: nameTableS,
        gp: i
      });
    };
    var gastroBarS = function gastroBarS(i) {
      return gastroBar({
        view: gView,
        plan: planN,
        gp: i,
        count: gN,
        moveMode: moveMode,
        canEdit: !!cashier.admin,
        onCancelMove: cancelMoveS,
        onEditPlan: editPlanS
      });
    };
    var editPlanS = useCallback(function (i) {
      return setPlanEdit(i);
    }, []);
    var nameTableS = useCallback(function (n) {
      return setSheet({
        type: 'gname',
        props: {
          n: n
        },
        k: ++seq.current
      });
    }, []);
    var busyTables = useMemo(function () {
      return Object.fromEntries(bills.filter(function (b) {
        return b.table != null;
      }).map(function (b) {
        return [b.table, true];
      }));
    }, [bills]);
    var uiAmount = useEvent(amount),
      uiDialog = useEvent(dialog),
      uiClose = useEvent(close),
      uiSay = useEvent(say),
      uiProgress = useEvent(progressThen);
    var editProduct = useCallback(function (plu) {
      return setProdEdit({
        plu: plu || null
      });
    }, []);
    var getFavs = useEvent(function () {
      return favs;
    });
    var menuUi = useMemo(function () {
      return {
        amount: uiAmount,
        dialog: uiDialog,
        close: uiClose,
        say: uiSay,
        progressThen: uiProgress,
        editProduct: editProduct,
        getFavs: getFavs
      };
    }, []);
    var saveProduct = function saveProduct(p, fav) {
      NP_DB.save(p);
      setFavs(function (fs) {
        return fav ? fs.includes(p.plu) ? fs : [].concat(_toConsumableArray(fs), [p.plu]) : fs.filter(function (x) {
          return x !== p.plu;
        });
      });
      setProdEdit(null);
      say(p.active === false ? "Towar \u201E".concat(p.name, "\u201D oznaczony jako usuni\u0119ty") : "Towar \u201E".concat(p.name, "\u201D zapisany"), 'ok', 'check');
    };
    var prodSheet = prodEdit && /*#__PURE__*/React.createElement(ProductEditor, {
      key: prodEdit.plu || 'new',
      product: prodEdit.plu ? NP_DB.get(prodEdit.plu) : null,
      isFav: !!prodEdit.plu && favs.includes(prodEdit.plu),
      onCancel: function onCancel() {
        return setProdEdit(null);
      },
      onSave: saveProduct
    });
    var hasLines = lines.length > 0;
    var tabDisabled = useMemo(function () {
      return noSale ? {
        klawiatura: true,
        panele: true,
        funkcjeF: true,
        towary: true
      } : {
        menu: hasLines
      };
    }, [hasLines, noSale]);
    var layoutCls = 'np-sale' + (tweaks.receipt === 'right' ? '' : ' rl') + (menuFullOn ? ' menu-full' : '') + (rcptOff && !menuFullOn ? ' rcpt-off' : '');
    var cbill = curBill ? bills.find(function (b) {
      return b.id === curBill;
    }) : null;
    var place = cbill ? [cbill.table != null ? 'Stolik ' + cbill.table : 'Rachunek' + (cbill.no ? ' nr ' + cbill.no : ''), cbill.name, cbill.guests ? cbill.guests + ' os.' : ''].filter(Boolean).join(' · ') : null;
    if (menuOnly) {
      var now = new Date();
      return /*#__PURE__*/React.createElement("div", {
        className: layoutCls
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-left"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-work",
        key: "menu"
      }, /*#__PURE__*/React.createElement(MenuView, {
        cashier: cashier,
        onAction: menuActionS,
        onLogout: onLogout,
        exitLabel: "Wyj\u015Bcie",
        ui: menuUi
      }))), /*#__PURE__*/React.createElement("div", {
        className: "np-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-sumcard np-menuinfo-head"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-menuinfo-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "menu"
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Menu kasy"), /*#__PURE__*/React.createElement("small", null, "Bez logowania kasjera"))), /*#__PURE__*/React.createElement("div", {
        className: "np-lines-card np-menuinfo"
      }, [['Sklep', SHOP.name], ['Adres', SHOP.addr], ['Kasa', SHOP.kasa + ' · ' + SHOP.nip], ['Data', NPF.dateFull(now)], ['NoviCloud', 'Połączono'], ['Drukarka', 'Gotowa'], ['Wersja', '2.4.0 · prototyp']].map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];
        return /*#__PURE__*/React.createElement("div", {
          key: k,
          className: "np-menuinfo-row"
        }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("b", null, v));
      })), /*#__PURE__*/React.createElement("button", {
        className: "np-razem np-exit",
        onClick: onLogout
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "log-out"
      }), /*#__PURE__*/React.createElement("span", null, "Wyj\u015Bcie"))), sheet && renderSheet(), prodSheet, /*#__PURE__*/React.createElement(Toast, {
        toast: toast
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: layoutCls
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-work",
      key: tab
    }, tab === 'klawiatura' && /*#__PURE__*/React.createElement(KeyboardView, {
      fSlots: buf.fMode ? fKey : null,
      hints: tweaks.hints,
      onLongEsc: powerDialogS,
      row: kbRow,
      n: gc,
      onTile: onTileS,
      onEditRow: editKbRow
    }), tab === 'panele' && /*#__PURE__*/React.createElement(PanelsView, {
      pages: pages,
      setPages: setPages,
      page: pageAll,
      setPage: setPage,
      cols: gc,
      rows: gr,
      edit: edit,
      setEdit: setEdit,
      onTile: onTileS,
      onEditSlot: editPages,
      extra: gN,
      renderExtra: renderGastro,
      extraBar: gastroBarS
    }), tab === 'towary' && /*#__PURE__*/React.createElement(GoodsView, {
      onSell: sellListS,
      favs: favs,
      setFavs: setFavs,
      counts: counts,
      ui: menuUi,
      onEdit: editProduct
    }), tab === 'funkcjeF' && /*#__PURE__*/React.createElement(PanelsView, {
      pages: fpages,
      setPages: setFPages,
      page: fpageC,
      setPage: setFPage,
      cols: gc,
      rows: gr,
      edit: edit,
      setEdit: setEdit,
      onTile: onTileS,
      onEditSlot: editFPages
    }), tab === 'menu' && /*#__PURE__*/React.createElement(MenuView, {
      cashier: cashier,
      onAction: menuActionS,
      onLogout: tryLogoutS,
      ui: menuUi
    }), fOpen && /*#__PURE__*/React.createElement(FSheet, {
      key: fOpen,
      slots: fKey,
      initialEdit: fOpen === 'edit',
      onClose: function onClose() {
        return setFOpen(false);
      },
      onRun: function onRun(sl) {
        setFOpen(false);
        onTile(sl);
      },
      onEdit: function onEdit(i) {
        return setEditSlot({
          src: 'fkey',
          s: i
        });
      }
    })), /*#__PURE__*/React.createElement(TabBar, {
      tab: noSale && tab === 'towary' ? 'menu' : tab,
      setTab: goTabS,
      disabled: tabDisabled
    })), /*#__PURE__*/React.createElement(ReceiptPane, {
      place: place,
      qtyStyle: tweaks.qtyStyle || 'pill',
      cashier: cashier,
      receiptNo: receiptNo,
      lines: lines,
      selId: selId,
      onSelLine: toggleSel,
      flashId: flashId,
      onQty: onQtyS,
      onRemove: stornoS,
      onLineAction: onLineActionS,
      total: total,
      subtotal: subtotal,
      rdAmt: rdAmt,
      rcptDisc: rcptDisc,
      onClearRcptDisc: clearRcptDiscS,
      onDocMenu: openDocMenuS,
      nip: nip,
      note: rcptNote,
      invoice: invoice,
      scanFlash: scanFlash,
      buf: _objectSpread(_objectSpread({}, buf), {}, {
        lastEvent: lastEvent
      }),
      onPay: openPayCashS,
      quick: /*#__PURE__*/React.createElement(TileRow, {
        className: "np-qpay",
        slots: qPay,
        n: 3,
        onTile: onTileS,
        onEdit: editQPay
      })
    }), planEdit != null && /*#__PURE__*/React.createElement(PlanEditor, {
      plan: planN,
      startRoom: planEdit,
      busy: busyTables,
      ui: menuUi,
      onCancel: function onCancel() {
        return setPlanEdit(null);
      },
      onSave: function onSave(p) {
        setGPlan(p);
        setPlanEdit(null);
        say('Plan sali zapisany', 'ok', 'check');
      }
    }), sheet && renderSheet(), prodSheet, editSlot && /*#__PURE__*/React.createElement(TileEditor, {
      key: JSON.stringify(editSlot),
      slot: slotOf(editSlot),
      whereLabel: whereLabel(editSlot),
      maxSize: maxSizeOf(editSlot),
      onCancel: function onCancel() {
        return setEditSlot(null);
      },
      onSave: function onSave(d) {
        return saveSlot(editSlot, d);
      }
    }), /*#__PURE__*/React.createElement(Toast, {
      toast: toast
    }));
  }
  Object.assign(window, {
    SaleScreen: SaleScreen
  });
})();