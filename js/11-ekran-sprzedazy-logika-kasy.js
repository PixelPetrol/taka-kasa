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
/* TAKA KASA — ekran sprzedaży: logika kasy, funkcje, arkusze */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef,
    useMemo = _React.useMemo;
  var _NP_DATA = NP_DATA,
    PRODUCTS = _NP_DATA.PRODUCTS,
    FUNCS = _NP_DATA.FUNCS,
    DEFAULT_PAGES = _NP_DATA.DEFAULT_PAGES,
    DEFAULT_FAVS = _NP_DATA.DEFAULT_FAVS,
    SHOP = _NP_DATA.SHOP;
  var PBY = Object.fromEntries(PRODUCTS.map(function (p) {
    return [p.plu, p];
  }));
  var FBY = Object.fromEntries(FUNCS.map(function (f) {
    return [f.id, f];
  }));
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
  function appendEntry(e, k) {
    if (k === ',') return e.includes(',') ? e : (e || '0') + ',';
    if (e.includes(',')) return e.split(',')[1].length >= 3 ? e : e + k;
    return e.length >= 13 ? e : (e === '0' ? '' : e) + k;
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
    var _useStored1 = useStored('stats', STATS0),
      _useStored10 = _slicedToArray(_useStored1, 2),
      stats = _useStored10[0],
      setStats = _useStored10[1];
    var _useStored11 = useStored('pages', DEFAULT_PAGES),
      _useStored12 = _slicedToArray(_useStored11, 2),
      pages = _useStored12[0],
      setPages = _useStored12[1];
    var _useStored13 = useStored('fpages', NP_DATA.DEFAULT_FPAGES),
      _useStored14 = _slicedToArray(_useStored13, 2),
      fpages = _useStored14[0],
      setFPages = _useStored14[1];
    var _useStored15 = useStored('fpage', 0),
      _useStored16 = _slicedToArray(_useStored15, 2),
      fpage = _useStored16[0],
      setFPage = _useStored16[1];
    var _useStored17 = useStored('kbRow', NP_DATA.DEFAULT_KBROW),
      _useStored18 = _slicedToArray(_useStored17, 2),
      kbRow = _useStored18[0],
      setKbRow = _useStored18[1];
    var _useStored19 = useStored('fKey', NP_DATA.DEFAULT_FKEY),
      _useStored20 = _slicedToArray(_useStored19, 2),
      fKey = _useStored20[0],
      setFKey = _useStored20[1];
    var _useStored21 = useStored('qPay', NP_DATA.DEFAULT_QPAY),
      _useStored22 = _slicedToArray(_useStored21, 2),
      qPay = _useStored22[0],
      setQPay = _useStored22[1];
    var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      fOpen = _useState4[0],
      setFOpen = _useState4[1]; // false | 'run' | 'edit'
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
    var _useStored23 = useStored('favs', DEFAULT_FAVS),
      _useStored24 = _slicedToArray(_useStored23, 2),
      favs = _useStored24[0],
      setFavs = _useStored24[1];
    var _useStored25 = useStored('tab', 'panele'),
      _useStored26 = _slicedToArray(_useStored25, 2),
      tab = _useStored26[0],
      setTab = _useStored26[1];
    var _useStored27 = useStored('page', 0),
      _useStored28 = _slicedToArray(_useStored27, 2),
      page = _useStored28[0],
      setPage = _useStored28[1];
    var _useState5 = useState(BUF0),
      _useState6 = _slicedToArray(_useState5, 2),
      buf = _useState6[0],
      setBufState = _useState6[1];
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
    var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      lastEvent = _useState8[0],
      setLastEventRaw = _useState8[1];
    var _useState9 = useState(null),
      _useState0 = _slicedToArray(_useState9, 2),
      selId = _useState0[0],
      setSelId = _useState0[1];
    var _useState1 = useState(false),
      _useState10 = _slicedToArray(_useState1, 2),
      edit = _useState10[0],
      setEdit = _useState10[1];
    var _useState11 = useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      editSlot = _useState12[0],
      setEditSlot = _useState12[1];
    var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      sheet = _useState14[0],
      setSheet = _useState14[1];
    var _useState15 = useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      toast = _useState16[0],
      setToast = _useState16[1];
    var _useState17 = useState(null),
      _useState18 = _slicedToArray(_useState17, 2),
      flashId = _useState18[0],
      setFlashId = _useState18[1];
    var _useState19 = useState(false),
      _useState20 = _slicedToArray(_useState19, 2),
      scanFlash = _useState20[0],
      setScanFlash = _useState20[1];
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
    var pageC = Math.min(page, pages.length - 1);
    var fpageC = Math.min(fpage, fpages.length - 1);

    // ── sumy ──
    var lineTotal = function lineTotal(l) {
      return NPF.round2(l.qty * l.price * (1 - (l.adj || 0) / 100));
    };
    var subtotal = NPF.round2(lines.reduce(function (s, l) {
      return s + lineTotal(l);
    }, 0));
    var rdAmt = rcptDisc && subtotal > 0 ? Math.min(subtotal, rcptDisc.type === 'amt' ? rcptDisc.v : NPF.round2(subtotal * rcptDisc.v / 100)) : 0;
    var total = NPF.round2(subtotal - rdAmt);
    var counts = useMemo(function () {
      var m = {};
      lines.forEach(function (l) {
        if (l.qty > 0) m[l.pid] = (m[l.pid] || 0) + l.qty;
      });
      Object.keys(m).forEach(function (k) {
        var p = PBY[k];
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
    var goTab = function goTab(t) {
      if (t === 'menu' && linesRef.current.length) {
        say(menuLockedMsg, 'err', 'lock');
        return;
      }
      setTab(t);
      setEdit(false);
      setFOpen(false);
    };
    useEffect(function () {
      if (tab === 'menu' && lines.length) setTab('panele');
    }, [tab, lines.length]);
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
    var doSell = function doSell(p, src, code) {
      var _bufRef$current = bufRef.current,
        qty = _bufRef$current.qty,
        priceOv = _bufRef$current.priceOv,
        mode = _bufRef$current.mode;
      var L = linesRef.current;
      var q = qty ? qty.v : null;
      var fromScale = false;
      if (q == null && p.unit === 'kg') {
        q = readScale();
        fromScale = true;
      }
      if (q == null) q = 1;
      if (p.unit === 'szt' && !Number.isInteger(q)) {
        err("\u201E".concat(p.name, "\u201D sprzedawany jest na sztuki"));
        return;
      }
      var sign = mode === 'return' ? -1 : 1;
      var price = priceOv != null ? priceOv : p.price;
      var i = p.unit === 'szt' ? L.findIndex(function (l) {
        return l.pid === p.plu && l.price === price && !l.adj && Math.sign(l.qty) === sign;
      }) : -1;
      var id;
      if (i >= 0) {
        id = L[i].id;
        commit(L.map(function (l, j) {
          return j === i ? _objectSpread(_objectSpread({}, l), {}, {
            qty: l.qty + sign * q
          }) : l;
        }));
      } else {
        id = NPF.uid();
        commit([].concat(_toConsumableArray(L), [{
          id: id,
          pid: p.plu,
          name: p.name,
          unit: p.unit,
          qty: sign * q,
          price: price,
          adj: 0,
          ov: priceOv != null
        }]));
      }
      flash(id);
      setSelId(null);
      var qTxt = NPF.qty(q, p.unit) + (p.unit === 'kg' ? ' kg' : '');
      setLastEvent({
        kind: fromScale ? 'waga' : src,
        code: code || null,
        text: "".concat(sign < 0 ? 'Zwrot · ' : '').concat(p.name, " \xB7 ").concat(qTxt, " \xD7 ").concat(M(price)).concat(fromScale ? ' (waga)' : '')
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
            doSell(p, 'kod', p.ean);
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
      doSell(p, src, code);
    };
    var findCode = function findCode(c) {
      return PRODUCTS.find(function (x) {
        return x.plu === c || x.ean === c;
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
      sell(p, src, c);
    };
    var scan = function scan() {
      var pool = PRODUCTS.filter(function (x) {
        return x.group !== 'kaucje';
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
        text: "".concat(pct > 0 ? "Rabat ".concat(pct, "%") : "Narzut ".concat(-pct, "%"), " \xB7 ").concat(t.name)
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
          qty: x.qty + d
        }) : x;
      }).filter(function (x) {
        return x.qty !== 0;
      }));
    };
    var resetReceipt = function resetReceipt() {
      commit([]);
      setRcptDisc(null);
      setNip('');
      setInvoice(false);
      setSelId(null);
      setReceiptNo(function (n) {
        return n + 1;
      });
      clearBuf();
    };
    var onLineAction = function onLineAction(kind, l) {
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

    // ── płatność ──
    var openPay = function openPay() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cash';
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
            text: 'Rabat 10,00 zł na paragon'
          });
          return;
        case 'narzut':
          {
            var t = target();
            if (!t) {
              err('Brak pozycji na paragonie');
              return;
            }
            var _v = Math.round(NPF.parseNum(e));
            if (e && _v > 0 && _v < 100) {
              applyAdj(-_v);
              return;
            }
            amount({
              title: 'Narzut na pozycję',
              desc: t.name,
              mode: 'percent',
              confirmLabel: 'Dodaj narzut',
              confirmTone: 'ink',
              validate: function validate(x) {
                return +x > 0 && +x < 100 ? null : 'Wartość od 1 do 99%';
              },
              onConfirm: function onConfirm(x) {
                close();
                applyAdj(-x, t.id);
              }
            });
            return;
          }
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
                setLastEvent({
                  kind: 'storno',
                  text: "Paragon ".concat(npPad4(no), " anulowany")
                });
              }
            }]
          });
          return;
        case 'nip':
          amount({
            title: 'NIP nabywcy',
            desc: 'Zostanie wydrukowany na paragonie',
            mode: 'digits',
            maxLen: 10,
            initial: nip,
            format: NPF.nip,
            suffix: '',
            confirmLabel: 'Zapisz NIP',
            validate: function validate(v) {
              return v.length === 10 ? null : 'NIP ma 10 cyfr';
            },
            onConfirm: function onConfirm(v) {
              close();
              setNip(v);
              say('NIP nabywcy dodany do paragonu', 'ok', 'check');
            }
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
            title: 'Wykonać raport dobowy?',
            desc: 'Raport zamyka dzień sprzedaży i zostanie wysłany do CRK.',
            actions: [{
              label: 'Anuluj',
              cancel: true,
              onClick: close
            }, {
              label: 'Wykonaj raport',
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
            }, {
              label: 'Wyjdź',
              primary: true,
              onClick: function onClick() {
                close();
                onLogout();
              }
            }]
          });
          return;
        case 'blokada':
          clearBuf();
          onLock();
          return;
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
      onLogout();
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
      if (menuOnly && ['editTiles', 'goF', 'goGoods', 'editF'].includes(a)) {
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
            rows: [['Wersja aplikacji', '2.4.0 · prototyp'], ['Ekran', '10,1″ · 1280 × 800'], ['Sklep', SHOP.name], [SHOP.kasa, SHOP.nip]],
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

    // ── klawiatura kasy (ekranowa / fizyczna / PC) ──
    useKeys(function (k) {
      var _bufRef$current2 = bufRef.current,
        entry = _bufRef$current2.entry,
        qty = _bufRef$current2.qty,
        priceOv = _bufRef$current2.priceOv,
        fMode = _bufRef$current2.fMode,
        mode = _bufRef$current2.mode;
      if (/^[0-9]$/.test(k) || k === ',') {
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
          if (entry || qty || priceOv != null || fMode || mode) clearBuf();else if (selId) setSelId(null);else if (lastEvent) setLastEvent(null);
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
                unit: entry.includes(',') ? 'kg' : 'szt'
              },
              entry: ''
            });
          } else weigh();
          break;
        case 'CENA':
          if (entry) {
            var _v2 = NPF.parseNum(entry);
            if (!(_v2 > 0)) {
              err('Nieprawidłowa cena');
              break;
            }
            setBuf({
              priceOv: _v2,
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
          setFOpen('run');
          break;
        case 'FEED':
          feed();
          break;
        case 'MENU':
          goTab('menu');
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
        var p = PBY[slot.id];
        if (p) sell(p, 'tile');
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
      return (w.src === 'kbrow' ? kbRow[w.s] : w.src === 'fkey' ? fKey[w.s] : w.src === 'qpay' ? qPay[w.s] : (w.src === 'fpages' ? fpages : pages)[w.p].slots[w.s]) || null;
    };
    // Rozmiar kafelka tylko na Panelach i w Funkcjach (siatka); ograniczony krawędzią strony
    var maxSizeOf = function maxSizeOf(w) {
      return w.src === 'pages' || w.src === 'fpages' ? {
        w: Math.min(2, gc - w.s % gc),
        h: Math.min(2, gr - Math.floor(w.s / gc))
      } : null;
    };
    var whereLabel = function whereLabel(w) {
      return w.src === 'kbrow' ? "Rz\u0105d nad klawiatur\u0105 \xB7 pole ".concat(w.s + 1) : w.src === 'fkey' ? "Klawisz F \xB7 pole ".concat(w.s + 1) : w.src === 'qpay' ? "Szybka p\u0142atno\u015B\u0107 \xB7 pole ".concat(w.s + 1) : "".concat(w.src === 'fpages' ? 'Funkcje' : 'Panele', " \xB7 strona ").concat(w.p + 1, " \xB7 pole ").concat(w.s + 1);
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
        total: total,
        count: lines.length,
        receiptNo: receiptNo,
        initialMethod: props.method,
        initialTender: props.tender,
        auto: !!props.auto,
        onCancel: close,
        onDone: payDone
      });
      if (type === 'rabat') {
        var line = lines.find(function (x) {
          return x.id === props.lineId;
        }) || null;
        return /*#__PURE__*/React.createElement(RabatSheet, {
          key: k,
          line: line,
          onCancel: close,
          onApply: function onApply(scope, pct) {
            close();
            if (scope === 'line' && line) applyAdj(pct, line.id);else {
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
              desc: scope === 'line' && line ? line.name : 'Procent od sumy paragonu',
              mode: 'percent',
              confirmLabel: 'Udziel rabatu',
              confirmTone: 'red',
              validate: function validate(x) {
                return +x > 0 && +x < 100 ? null : 'Wartość od 1 do 99%';
              },
              onConfirm: function onConfirm(x) {
                close();
                if (scope === 'line' && line) applyAdj(x, line.id);else {
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
    if (menuOnly) {
      var now = new Date();
      return /*#__PURE__*/React.createElement("div", {
        className: 'np-sale' + (tweaks.receipt === 'right' ? '' : ' rl')
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-left"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-work",
        key: "menu"
      }, /*#__PURE__*/React.createElement(MenuView, {
        cashier: cashier,
        onAction: menuAction,
        onLogout: onLogout,
        exitLabel: "Wyj\u015Bcie",
        ui: {
          amount: amount,
          dialog: dialog,
          close: close,
          say: say,
          progressThen: progressThen
        }
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
      }), /*#__PURE__*/React.createElement("span", null, "Wyj\u015Bcie"))), sheet && renderSheet(), /*#__PURE__*/React.createElement(Toast, {
        toast: toast
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-sale' + (tweaks.receipt === 'right' ? '' : ' rl')
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-work",
      key: tab
    }, tab === 'klawiatura' && /*#__PURE__*/React.createElement(KeyboardView, {
      hints: tweaks.hints,
      onLongEsc: powerDialog,
      row: kbRow,
      n: gc,
      onTile: onTile,
      counts: counts,
      onEditRow: function onEditRow(s) {
        return setEditSlot({
          src: 'kbrow',
          s: s
        });
      }
    }), tab === 'panele' && /*#__PURE__*/React.createElement(PanelsView, {
      pages: pages,
      setPages: setPages,
      page: pageC,
      setPage: setPage,
      cols: gc,
      rows: gr,
      edit: edit,
      setEdit: setEdit,
      onTile: onTile,
      counts: counts,
      onEditSlot: function onEditSlot(at) {
        return setEditSlot(_objectSpread({
          src: 'pages'
        }, at));
      }
    }), tab === 'towary' && /*#__PURE__*/React.createElement(GoodsView, {
      onSell: function onSell(p) {
        return sell(p, 'list');
      },
      favs: favs,
      setFavs: setFavs,
      counts: counts
    }), tab === 'funkcjeF' && /*#__PURE__*/React.createElement(PanelsView, {
      pages: fpages,
      setPages: setFPages,
      page: fpageC,
      setPage: setFPage,
      cols: gc,
      rows: gr,
      edit: edit,
      setEdit: setEdit,
      onTile: onTile,
      counts: counts,
      onEditSlot: function onEditSlot(at) {
        return setEditSlot(_objectSpread({
          src: 'fpages'
        }, at));
      }
    }), tab === 'menu' && /*#__PURE__*/React.createElement(MenuView, {
      cashier: cashier,
      onAction: menuAction,
      onLogout: tryLogout,
      ui: {
        amount: amount,
        dialog: dialog,
        close: close,
        say: say,
        progressThen: progressThen
      }
    }), fOpen && /*#__PURE__*/React.createElement(FSheet, {
      key: fOpen,
      slots: fKey,
      initialEdit: fOpen === 'edit',
      counts: counts,
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
      tab: tab,
      setTab: goTab,
      disabled: {
        menu: lines.length > 0
      }
    })), /*#__PURE__*/React.createElement(ReceiptPane, {
      cashier: cashier,
      receiptNo: receiptNo,
      lines: lines,
      selId: selId,
      setSelId: setSelId,
      flashId: flashId,
      onQty: onQty,
      onRemove: storno,
      onLineAction: onLineAction,
      total: total,
      subtotal: subtotal,
      rdAmt: rdAmt,
      rcptDisc: rcptDisc,
      onClearRcptDisc: function onClearRcptDisc() {
        return setRcptDisc(null);
      },
      nip: nip,
      invoice: invoice,
      scanFlash: scanFlash,
      buf: _objectSpread(_objectSpread({}, buf), {}, {
        lastEvent: lastEvent
      }),
      onPay: function onPay() {
        return openPay('cash');
      },
      quick: /*#__PURE__*/React.createElement(TileRow, {
        className: "np-qpay",
        slots: qPay,
        n: 3,
        onTile: onTile,
        onEdit: function onEdit(i) {
          return setEditSlot({
            src: 'qpay',
            s: i
          });
        },
        counts: {}
      })
    }), sheet && renderSheet(), editSlot && /*#__PURE__*/React.createElement(TileEditor, {
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