"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
/* KASA NEXT PRO — wspólne komponenty UI */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef,
    useCallback = _React.useCallback;

  // ── Szyna klawiszy: klawiatura ekranowa (1:1 z fizyczną) + klawiatura PC ──
  var NPKeys = function () {
    var seq = 0;
    var stack = [];
    var listeners = new Set();
    return {
      push: function push(fn) {
        var prio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var e = {
          fn: fn,
          prio: prio,
          s: seq++
        };
        stack.push(e);
        stack.sort(function (a, b) {
          return a.prio - b.prio || a.s - b.s;
        });
        return function () {
          var i = stack.indexOf(e);
          if (i >= 0) stack.splice(i, 1);
        };
      },
      press: function press(k, src) {
        listeners.forEach(function (l) {
          return l(k, src);
        });
        for (var i = stack.length - 1; i >= 0; i--) {
          if (stack[i].fn(k) !== false) return;
        }
      },
      onPress: function onPress(l) {
        listeners.add(l);
        return function () {
          listeners["delete"](l);
        };
      }
    };
  }();
  var PC_MAP = {
    Enter: 'OK',
    NumpadEnter: 'OK',
    Escape: 'ESC',
    Backspace: 'BACK',
    Delete: 'BACK',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT'
  };
  function pcToKey(e) {
    var k = e.key;
    if (/^[0-9]$/.test(k)) return k;
    if (k === '.' || k === '.' || k === 'Decimal') return '.';
    if (PC_MAP[k]) return PC_MAP[k];
    var l = (k || '').toLowerCase();
    if (l === 'x' || k === '*') return 'X';
    if (l === 'c') return 'CENA';
    if (l === 'k') return 'KOD';
    if (l === 'r' || k === '+') return 'RAZEM';
    if (l === 'f') return 'F';
    if (l === 'p') return 'FEED';
    if (l === 'm') return 'MENU';
    if (l === 's') return 'SCAN';
    return null;
  }
  if (!window.__npKeysBound) {
    window.__npKeysBound = true;
    window.addEventListener('keydown', function (e) {
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = pcToKey(e);
      if (!k) return;
      e.preventDefault();
      NPKeys.press(k, 'pc');
    });
  }
  function useKeys(handler) {
    var prio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var active = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var ref = useRef(handler);
    ref.current = handler;
    useEffect(function () {
      if (!active) return undefined;
      return NPKeys.push(function (k) {
        return ref.current(k);
      }, prio);
    }, [active, prio]);
  }

  // ── Stan trwały (localStorage, prefiks nextpro.) ──
  // Zapis do localStorage z opóźnieniem 300 ms; zaległe zapisy są wypychane przy odmontowaniu i zamknięciu strony
  var NP_PENDING = new Map();
  var npWrite = function npWrite(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };
  function npFlushStored() {
    if (window.__npNoFlush) return;
    NP_PENDING.forEach(function (v, k) {
      return npWrite(k, v);
    });
    NP_PENDING.clear();
  }
  if (!window.__npFlushBound) {
    window.__npFlushBound = true;
    window.addEventListener('pagehide', npFlushStored);
    window.addEventListener('beforeunload', npFlushStored);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) npFlushStored();
    });
  }
  function useStored(key, init) {
    var full = 'nextpro.' + key;
    var _useState = useState(function () {
        try {
          var s = localStorage.getItem(full);
          if (s != null) return JSON.parse(s);
        } catch (e) {}
        return typeof init === 'function' ? init() : init;
      }),
      _useState2 = _slicedToArray(_useState, 2),
      v = _useState2[0],
      setV = _useState2[1];
    var first = useRef(true);
    useEffect(function () {
      if (first.current) {
        first.current = false;
        return undefined;
      }
      NP_PENDING.set(full, v);
      var t = setTimeout(function () {
        if (NP_PENDING.get(full) === v) {
          NP_PENDING["delete"](full);
          npWrite(full, v);
        }
      }, 300);
      return function () {
        return clearTimeout(t);
      };
    }, [full, v]);
    useEffect(function () {
      return function () {
        if (NP_PENDING.has(full) && !window.__npNoFlush) {
          npWrite(full, NP_PENDING.get(full));
          NP_PENDING["delete"](full);
        }
      };
    }, [full]);
    return [v, setV];
  }
  function npResetStorage(keys) {
    window.__npNoFlush = true;
    NP_PENDING.clear();
    Object.keys(localStorage).filter(function (k) {
      return k.startsWith('nextpro.') && (!keys || keys.includes(k.slice(9)));
    }).forEach(function (k) {
      return localStorage.removeItem(k);
    });
    location.reload();
  }
  // Wersja bazy towarów — widoki przerysowują się po zapisaniu towaru
  function useProductsVer() {
    var _useState3 = useState(function () {
        return NP_DB.ver();
      }),
      _useState4 = _slicedToArray(_useState3, 2),
      v = _useState4[0],
      setV = _useState4[1];
    useEffect(function () {
      var h = function h() {
        return setV(NP_DB.ver());
      };
      window.addEventListener('np-products', h);
      return function () {
        return window.removeEventListener('np-products', h);
      };
    }, []);
    return v;
  }
  // Stabilny callback wywołujący zawsze najnowszą wersję funkcji (dla React.memo)
  function useEvent(fn) {
    var r = useRef(fn);
    r.current = fn;
    return useCallback(function () {
      return r.current.apply(r, arguments);
    }, []);
  }
  // Zegar odświeżany raz na minutę, wyrównany do pełnej minuty (pokazujemy tylko HH:MM)
  function useMinute() {
    var _useState5 = useState(function () {
        return new Date();
      }),
      _useState6 = _slicedToArray(_useState5, 2),
      n = _useState6[0],
      setN = _useState6[1];
    useEffect(function () {
      var t;
      var next = function next() {
        return 60000 - Date.now() % 60000 + 30;
      };
      var _tick = function tick() {
        setN(new Date());
        t = setTimeout(_tick, next());
      };
      t = setTimeout(_tick, next());
      return function () {
        return clearTimeout(t);
      };
    }, []);
    return n;
  }
  function LoginClock() {
    var now = useMinute();
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "np-login-time"
    }, NPF.time(now)), /*#__PURE__*/React.createElement("div", {
      className: "np-login-date"
    }, NPF.dateFull(now)));
  }
  function useNow() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    var _useState7 = useState(function () {
        return new Date();
      }),
      _useState8 = _slicedToArray(_useState7, 2),
      n = _useState8[0],
      setN = _useState8[1];
    useEffect(function () {
      var t = setInterval(function () {
        return setN(new Date());
      }, ms);
      return function () {
        return clearInterval(t);
      };
    }, [ms]);
    return n;
  }

  // ── Ikony: Lucide z pictograms.js + kilka prostych uzupełnień ──
  var S = function S(d) {
    var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"".concat(extra, ">").concat(d, "</svg>");
  };
  var EXTRA_ICONS = {
    menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    'chevron-down': S('<path d="m6 9 6 6 6-6"/>'),
    landmark: S('<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4Z"/>'),
    unlink: S('<path d="m18.84 12.25 1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71"/><path d="M8 2v3M2 8h3M16 22v-3M22 16h-3"/>'),
    'ticket-percent': S('<path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 9h.01"/><path d="m15 9-6 6"/><path d="M15 15h.01"/>'),
    database: S('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>'),
    'cloud-ok': S('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m9.5 13.5 2 2 3.5-3.5"/>'),
    'file-check': S('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>'),
    battery: S('<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/>'),
    'layout-grid': S('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>'),
    'corner-down-left': S('<path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/>'),
    'sticky-note': S('<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>'),
    'user-x': S('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 8 5 5M22 8l-5 5"/>'),
    'bookmark-plus': S('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><path d="M12 7v6M9 10h6"/>'),
    image: S('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
    move: S('<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>'),
    'corner-down-right': S('<path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>'),
    'circle-minus': S('<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>'),
    'circle-plus': S('<circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>'),
    'chevron-up': S('<path d="m18 15-6-6-6 6"/>'),
    headset: S('<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M21 19a3 3 0 0 1-3 3h-4"/>'),
    cloud: S('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'),
    'refresh-cw': S('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'),
    download: S('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'),
    upload: S('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>'),
    server: S('<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>'),
    usb: S('<rect x="7" y="9" width="10" height="13" rx="2"/><path d="M9 9V3h6v6M11 5v1M13 5v1"/>'),
    info: S('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    store: S('<path d="M3 9 5 3h14l2 6"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8M10 21v-5h4v5"/>'),
    'list-ordered': S('<path d="M10 12h11M10 18h11M10 6h11M4 10h2M4 6h1v4M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>'),
    'id-card': S('<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M14 10h4M14 14h4M5 16c.5-1.5 1.7-2 3-2s2.5.5 3 2"/>'),
    quote: S('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1v3c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>'),
    'sliders-horizontal': S('<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>'),
    'monitor-smartphone': S('<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-4M7 19h5"/><rect x="16" y="12" width="6" height="10" rx="2"/>'),
    'arrow-left-right': S('<path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>'),
    history: S('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>'),
    'file-search': S('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/>'),
    'shield-check': S('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    'calendar-range': S('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M3 10h18M8 2v4M17 14h-6M13 18H7"/>'),
    eye: S('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    'eye-off': S('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>'),
    x: S('<path d="M18 6 6 18M6 6l12 12"/>'),
    'chevron-left': S('<path d="m15 18-6-6 6-6"/>'),
    'chevron-right': S('<path d="m9 18 6-6-6-6"/>'),
    backspace: S('<path d="M10 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9l-7-7z"/><path d="m17 9-6 6M11 9l6 6"/>'),
    power: S('<path d="M12 3v9"/><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>'),
    enter: S('<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="m10 16 4-4-4-4"/><path d="M14 12H3"/>'),
    link: S('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    roll: S('<circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="1.5"/><path d="M15 9v11H8"/>'),
    fkey: S('<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M10 17V7h5M10 12h4"/>'),
    dots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="5" r="1.7"/><circle cx="9" cy="5" r="1.7"/><circle cx="14" cy="5" r="1.7"/><circle cx="19" cy="5" r="1.7"/><circle cx="6.5" cy="10" r="1.7"/><circle cx="11.5" cy="10" r="1.7"/><circle cx="16.5" cy="10" r="1.7"/><circle cx="9" cy="15" r="1.7"/><circle cx="14" cy="15" r="1.7"/><circle cx="11.5" cy="20" r="1.7"/></svg>'
  };
  var iconCache = {};
  function iconSvg(name) {
    if (!name) return null;
    if (EXTRA_ICONS[name]) return EXTRA_ICONS[name];
    if (iconCache[name] !== undefined) return iconCache[name];
    var p = (window.PICTOGRAMS || []).find(function (x) {
      return x.slug === name || x.slug.replace(/-[0-9a-f]{8}$/, '') === name;
    });
    return iconCache[name] = p ? p.svg : null;
  }
  function Icon(_ref) {
    var name = _ref.name,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style;
    var svg = iconSvg(name);
    if (!svg) return null;
    return /*#__PURE__*/React.createElement("span", {
      className: 'np-ico ' + className,
      style: style,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: {
        __html: svg
      }
    });
  }

  // Pasek statusu: przeciągnięcie w dół (albo dotknięcie ikon) wysuwa panel z opisem stanu kasy
  var crkErr = function crkErr() {
    try {
      return localStorage.getItem('nextpro.crkState') === 'err';
    } catch (e) {
      return false;
    }
  };
  var SB_ITEMS = function SB_ITEMS(now) {
    return [{
      id: 'cloud',
      icon: 'link',
      tone: 'ok',
      title: 'NoviCloud',
      val: 'Połączono',
      sub: 'Synchronizacja ' + NPF.time(new Date(now - 4 * 60000)) + ' · konto wtest'
    }, crkErr() ? {
      id: 'crk',
      icon: 'database',
      tone: 'err',
      title: 'Repozytorium (CRK)',
      val: 'Brak komunikacji',
      sub: 'Ostatnia udana wysyłka ' + NPF.time(new Date(now - 95 * 60000)) + ' · ponawianie co 5 min'
    } : {
      id: 'crk',
      icon: 'database',
      tone: 'ok',
      title: 'Repozytorium (CRK)',
      val: 'Komunikacja OK',
      sub: 'Ostatnia wysyłka ' + NPF.time(new Date(now - 11 * 60000))
    }, {
      id: 'jpk',
      icon: 'file-check',
      tone: 'ok',
      title: 'JPK / eDokumenty',
      val: 'Wysłano 142 z 142',
      sub: 'Brak dokumentów w kolejce',
      bar: 1
    }, {
      id: 'net',
      icon: 'wifi',
      tone: 'ok',
      title: 'Internet',
      val: 'Wi‑Fi „Sklep_5G”',
      sub: 'Sygnał dobry · IP 192.168.1.24'
    }, {
      id: 'eur',
      icon: 'ticket-percent',
      tone: 'info',
      title: 'EuroPlatform',
      val: '12 promocji aktywnych',
      sub: 'Wielopaki i rabaty od Organizatora Sieci · aktualizacja ' + NPF.time(new Date(now - 26 * 60000))
    }, {
      id: 'pwr',
      icon: 'plug',
      tone: 'ok',
      title: 'Zasilanie',
      val: 'Ładowarka podłączona',
      sub: 'Zasilanie sieciowe'
    }, {
      id: 'bat',
      icon: 'battery',
      tone: 'ok',
      title: 'Bateria',
      val: '78%',
      sub: 'Ładowanie · pełna za ok. 40 min',
      batt: 78
    }, {
      id: 'eft',
      icon: 'credit-card',
      tone: 'ok',
      title: 'Terminal płatniczy',
      val: 'Gotowy',
      sub: 'Połączenie przez Wi‑Fi'
    }];
  };
  function StatusPanel(_ref2) {
    var now = _ref2.now,
      drag = _ref2.drag,
      onClose = _ref2.onClose;
    useKeys(function (k) {
      if (k === 'ESC') {
        onClose();
        return true;
      }
      return true;
    }, 90);
    var S = useRef({}).current;
    var _useState9 = useState(0),
      _useState0 = _slicedToArray(_useState9, 2),
      dy = _useState0[0],
      setDy = _useState0[1];
    var down = function down(e) {
      var sc = e.currentTarget.getBoundingClientRect().height / e.currentTarget.offsetHeight || 1;
      Object.assign(S, {
        y0: e.clientY,
        sc: sc,
        mv: false
      });
      var move = function move(ev) {
        var d = (ev.clientY - S.y0) / S.sc;
        if (Math.abs(d) > 6) S.mv = true;
        setDy(Math.min(0, d));
      };
      var _up = function up(ev) {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', _up);
        window.removeEventListener('pointercancel', _up);
        var d = (ev.clientY - S.y0) / S.sc;
        if (d < -60 || !S.mv) onClose();else setDy(0);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', _up);
      window.addEventListener('pointercancel', _up);
    };
    var y = drag != null ? drag : dy;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-sbp-wrap",
      onPointerDown: function onPointerDown(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-sbp' + (drag != null || dy ? ' drag' : ''),
      style: {
        transform: 'translateY(' + y + 'px)'
      },
      onPointerDown: down
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-sbp-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-sbp-time"
    }, NPF.time(new Date(now)), /*#__PURE__*/React.createElement("span", null, NPF.dateLong(new Date(now)))), function () {
      var bad = SB_ITEMS(now).filter(function (x) {
        return x.tone === 'err';
      });
      return bad.length ? /*#__PURE__*/React.createElement("span", {
        className: "np-sbp-ok err"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "circle-alert"
      }), bad.length === 1 ? bad[0].title + ': ' + bad[0].val.toLowerCase() : 'Problemy: ' + bad.length) : /*#__PURE__*/React.createElement("span", {
        className: "np-sbp-ok"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      }), "Kasa dzia\u0142a prawid\u0142owo");
    }()), /*#__PURE__*/React.createElement("div", {
      className: "np-sbp-grid"
    }, SB_ITEMS(now).map(function (it) {
      return /*#__PURE__*/React.createElement("div", {
        key: it.id,
        className: 'np-sbp-it t-' + it.tone
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-sbp-ic"
      }, it.batt ? /*#__PURE__*/React.createElement("span", {
        className: "np-batt big"
      }, /*#__PURE__*/React.createElement("i", {
        style: {
          width: it.batt + '%'
        }
      })) : /*#__PURE__*/React.createElement(Icon, {
        name: it.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-sbp-tx"
      }, /*#__PURE__*/React.createElement("small", null, it.title), /*#__PURE__*/React.createElement("b", null, it.val), /*#__PURE__*/React.createElement("em", null, it.sub), it.bar && /*#__PURE__*/React.createElement("i", {
        className: "np-sbp-bar"
      }, /*#__PURE__*/React.createElement("s", {
        style: {
          width: it.bar * 100 + '%'
        }
      }))));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-sbp-grip"
    }, /*#__PURE__*/React.createElement("i", null))));
  }
  function StatusBar() {
    var now = useMinute();
    var _useState1 = useState(crkErr),
      _useState10 = _slicedToArray(_useState1, 2),
      crk = _useState10[0],
      setCrk = _useState10[1];
    useEffect(function () {
      var h = function h() {
        return setCrk(crkErr());
      };
      window.addEventListener('np-status', h);
      window.addEventListener('storage', h);
      return function () {
        window.removeEventListener('np-status', h);
        window.removeEventListener('storage', h);
      };
    }, []);
    var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      open = _useState12[0],
      setOpen = _useState12[1];
    var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      drag = _useState14[0],
      setDrag = _useState14[1];
    var S = useRef({}).current;
    var H = 560;
    var down = function down(e) {
      if (e.target.closest('.np-logo') || e.target.closest('.np-sbp-wrap')) return; // zdarzenia z panelu nie otwierają go ponownie
      var el = e.currentTarget;
      var sc = el.getBoundingClientRect().height / el.offsetHeight || 1;
      Object.assign(S, {
        y0: e.clientY,
        sc: sc,
        mv: false
      });
      var move = function move(ev) {
        var d = (ev.clientY - S.y0) / S.sc;
        if (d > 8) {
          S.mv = true;
          setDrag(Math.min(0, d - H));
        }
      };
      var _up2 = function up(ev) {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', _up2);
        var d = (ev.clientY - S.y0) / S.sc;
        if (S.mv) {
          setDrag(null);
          setOpen(d > 70);
        } else setOpen(true);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', _up2);
      window.addEventListener('pointercancel', _up2);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-status' + (open || drag != null ? ' open' : ''),
      onPointerDown: down
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-logo",
      onPointerDown: function onPointerDown(e) {
        var el = e.currentTarget;
        clearTimeout(el.__lp);
        el.__lp = setTimeout(function () {
          if (document.querySelector('.np-login-card')) window.dispatchEvent(new Event('np-svc-code'));
        }, 900);
      },
      onPointerUp: function onPointerUp(e) {
        return clearTimeout(e.currentTarget.__lp);
      },
      onPointerLeave: function onPointerLeave(e) {
        return clearTimeout(e.currentTarget.__lp);
      }
    }, NP_BRAND.a, /*#__PURE__*/React.createElement("b", null, NP_BRAND.b)), /*#__PURE__*/React.createElement("div", {
      className: "np-status-date"
    }, /*#__PURE__*/React.createElement("span", null, NPF.dateLong(now)), NPF.time(now)), /*#__PURE__*/React.createElement("div", {
      className: "np-status-icons"
    }, /*#__PURE__*/React.createElement("span", {
      title: "EuroPlatform: promocje aktywne"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ticket-percent"
    })), /*#__PURE__*/React.createElement("span", {
      title: "NoviCloud"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "link"
    })), crk && /*#__PURE__*/React.createElement("span", {
      className: "np-sb-err",
      title: "Repozytorium (CRK): brak komunikacji"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "database"
    })), /*#__PURE__*/React.createElement(Icon, {
      name: "plug"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi"
    }), /*#__PURE__*/React.createElement("span", {
      className: "np-batt"
    }, /*#__PURE__*/React.createElement("i", null))), (open || drag != null) && /*#__PURE__*/React.createElement(StatusPanel, {
      now: +now,
      drag: drag,
      onClose: function onClose() {
        return setOpen(false);
      }
    }));
  }
  function Toast(_ref3) {
    var toast = _ref3.toast;
    if (!toast) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: toast.id,
      className: 'np-toast t-' + (toast.tone || 'info')
    }, toast.icon && /*#__PURE__*/React.createElement(Icon, {
      name: toast.icon
    }), /*#__PURE__*/React.createElement("span", null, toast.text));
  }
  function Sheet(_ref4) {
    var onClose = _ref4.onClose,
      _ref4$className = _ref4.className,
      className = _ref4$className === void 0 ? '' : _ref4$className,
      style = _ref4.style,
      children = _ref4.children;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-sheet-bg",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget && onClose) onClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-sheet ' + className,
      style: style
    }, children));
  }
  var TONE_GLYPH = {
    success: /*#__PURE__*/React.createElement(Icon, {
      name: "check"
    }),
    error: /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }),
    power: /*#__PURE__*/React.createElement(Icon, {
      name: "power"
    }),
    warning: '!',
    question: '?',
    info: 'i'
  };
  function Dialog(_ref5) {
    var _ref5$tone = _ref5.tone,
      tone = _ref5$tone === void 0 ? 'info' : _ref5$tone,
      title = _ref5.title,
      desc = _ref5.desc,
      rows = _ref5.rows,
      _ref5$actions = _ref5.actions,
      actions = _ref5$actions === void 0 ? [] : _ref5$actions,
      progress = _ref5.progress,
      onClose = _ref5.onClose,
      _ref5$prio = _ref5.prio,
      prio = _ref5$prio === void 0 ? 30 : _ref5$prio,
      children = _ref5.children,
      _ref5$className = _ref5.className,
      className = _ref5$className === void 0 ? '' : _ref5$className;
    useKeys(function (k) {
      if (progress) return true;
      if (k === 'OK' || k === 'RAZEM') {
        var a = actions.find(function (x) {
          return x.primary;
        }) || actions[actions.length - 1];
        if (a && !a.disabled) a.onClick();
      } else if (k === 'ESC') {
        var _a = actions.find(function (x) {
          return x.cancel;
        });
        if (_a) _a.onClick();else if (onClose) onClose();
      }
      return true;
    }, prio);
    return /*#__PURE__*/React.createElement(Sheet, {
      onClose: progress ? null : onClose,
      className: 'np-dialog ' + className
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-dlg-ico t-' + (progress ? 'progress' : tone)
    }, progress ? /*#__PURE__*/React.createElement("span", {
      className: "np-spinner"
    }) : TONE_GLYPH[tone]), /*#__PURE__*/React.createElement("div", {
      className: "np-dlg-title"
    }, title), desc && /*#__PURE__*/React.createElement("div", {
      className: "np-dlg-desc"
    }, desc), rows && rows.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-dlg-rows"
    }, rows.map(function (_ref6, i) {
      var _ref7 = _slicedToArray(_ref6, 2),
        l = _ref7[0],
        v = _ref7[1];
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "np-dlg-row"
      }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("b", null, v));
    })), children, progress && /*#__PURE__*/React.createElement("div", {
      className: "np-progress"
    }, /*#__PURE__*/React.createElement("i", null)), !progress && actions.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-dlg-actions"
    }, actions.map(function (a, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        className: 'np-btn ' + (a.tone || (a.primary ? 'green' : '')),
        disabled: a.disabled,
        onClick: a.onClick
      }, a.label);
    })));
  }

  // Układ jak na kasie: 7-8-9 u góry
  var PAD_MONEY = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', 'BACK']];
  var PAD_INT = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['C', '0', 'BACK']];
  function NumPad(_ref8) {
    var onKey = _ref8.onKey,
      _ref8$keys = _ref8.keys,
      keys = _ref8$keys === void 0 ? PAD_MONEY : _ref8$keys,
      _ref8$className = _ref8.className,
      className = _ref8$className === void 0 ? '' : _ref8$className,
      _ref8$labels = _ref8.labels,
      labels = _ref8$labels === void 0 ? {} : _ref8$labels;
    var last = useRef({
      t: 0,
      id: -1
    });
    var pd = function pd(e, k) {
      if (e.button && e.button > 0 || !k) return;
      var now = performance.now(); // ten sam palec / zdublowane zdarzenie w <35 ms — pomiń
      if (e.pointerId === last.current.id && now - last.current.t < 35) return;
      last.current = {
        t: now,
        id: e.pointerId
      };
      onKey(k);
    };
    var cl = function cl(e, k) {
      if (e.detail === 0 && k) onKey(k);
    }; // tylko Enter/Spacja z klawiatury
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-numpad ' + className
    }, keys.flat().map(function (k, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        className: 'np-nk' + (k === 'OK' ? ' ok' : k === 'BACK' || k === 'C' || labels[k] ? ' muted' : '') + (k === '' ? ' blank' : ''),
        disabled: k === '',
        onPointerDown: function onPointerDown(e) {
          return pd(e, k);
        },
        onClick: function onClick(e) {
          return cl(e, k);
        }
      }, k === 'BACK' ? /*#__PURE__*/React.createElement(Icon, {
        name: "backspace"
      }) : labels[k] || k);
    }));
  }
  function applyAmountKey(cur, k) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'money';
    var maxLen = arguments.length > 3 ? arguments[3] : undefined;
    if (k === 'BACK') return cur.slice(0, -1);
    if (k === 'C') return '';
    if (mode === 'digits' || mode === 'percent') {
      if (!/^[0-9]$/.test(k)) return cur;
      var lim = mode === 'percent' ? 2 : maxLen || 13;
      if (cur.length >= lim) return cur;
      return (cur === '0' ? '' : cur) + k;
    }
    var dec = mode === 'qty' ? 3 : 2;
    if (k === '.') {
      if (cur.includes('.')) return cur;
      return (cur || '0') + '.';
    }
    if (!/^[0-9]$/.test(k)) return cur;
    var _cur$split = cur.split('.'),
      _cur$split2 = _slicedToArray(_cur$split, 2),
      i = _cur$split2[0],
      d = _cur$split2[1];
    if (d !== undefined) {
      if (d.length >= dec) return cur;
      return cur + k;
    }
    if (i.length >= 7) return cur;
    return (cur === '0' ? '' : cur) + k;
  }
  function AmountSheet(_ref9) {
    var title = _ref9.title,
      desc = _ref9.desc,
      _ref9$mode = _ref9.mode,
      mode = _ref9$mode === void 0 ? 'money' : _ref9$mode,
      maxLen = _ref9.maxLen,
      _ref9$initial = _ref9.initial,
      initial = _ref9$initial === void 0 ? '' : _ref9$initial,
      suffix = _ref9.suffix,
      presets = _ref9.presets,
      _ref9$confirmLabel = _ref9.confirmLabel,
      confirmLabel = _ref9$confirmLabel === void 0 ? 'Zatwierdź' : _ref9$confirmLabel,
      _ref9$confirmTone = _ref9.confirmTone,
      confirmTone = _ref9$confirmTone === void 0 ? 'green' : _ref9$confirmTone,
      validate = _ref9.validate,
      format = _ref9.format,
      onCancel = _ref9.onCancel,
      onConfirm = _ref9.onConfirm,
      _ref9$prio = _ref9.prio,
      prio = _ref9$prio === void 0 ? 30 : _ref9$prio;
    var _useState15 = useState(initial),
      _useState16 = _slicedToArray(_useState15, 2),
      v = _useState16[0],
      setV = _useState16[1];
    var err = v !== '' && validate ? validate(v) : null;
    var ok = v !== '' && !err;
    var submit = function submit() {
      if (ok) onConfirm(mode === 'digits' ? v : NPF.parseNum(v));
    };
    var push = function push(k) {
      return setV(function (c) {
        return applyAmountKey(c, k, mode, maxLen);
      });
    };
    useKeys(function (k) {
      if (/^[0-9]$/.test(k) || k === 'BACK' || k === '.' && mode !== 'digits' && mode !== 'percent') push(k);else if (k === 'OK' || k === 'RAZEM') submit();else if (k === 'ESC') {
        if (v) setV('');else onCancel();
      }
      return true;
    }, prio);
    var shown = v === '' ? null : format ? format(v) : v;
    var sfx = suffix !== undefined ? suffix : mode === 'money' ? 'zł' : mode === 'percent' ? '%' : mode === 'qty' ? '' : '';
    return /*#__PURE__*/React.createElement(Sheet, {
      onClose: onCancel,
      className: "np-amount"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, title), desc && /*#__PURE__*/React.createElement("div", {
      className: "np-amount-desc"
    }, desc), presets && /*#__PURE__*/React.createElement("div", {
      className: "np-presets"
    }, presets.map(function (p) {
      return /*#__PURE__*/React.createElement("button", {
        key: p.label,
        className: v === p.value ? 'on' : '',
        onClick: function onClick() {
          return p.instant ? onConfirm(NPF.parseNum(p.value)) : setV(p.value);
        }
      }, p.label);
    })), /*#__PURE__*/React.createElement("div", {
      className: 'np-amount-field' + (err ? ' err' : '')
    }, shown != null ? /*#__PURE__*/React.createElement("span", null, shown) : /*#__PURE__*/React.createElement("span", {
      className: "ph"
    }, mode === 'money' ? '0.00' : mode === 'percent' ? '0' : '—'), sfx && /*#__PURE__*/React.createElement("small", null, sfx)), /*#__PURE__*/React.createElement("div", {
      className: "np-amount-err"
    }, err || ''), /*#__PURE__*/React.createElement(NumPad, {
      onKey: push,
      keys: mode === 'digits' || mode === 'percent' ? PAD_INT : PAD_MONEY,
      className: "on-gray"
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-sheet-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: 'np-btn ' + confirmTone,
      disabled: !ok,
      onClick: submit
    }, confirmLabel)));
  }

  // Klawiatura ekranowa (wyszukiwarka) — przyciski nie zabierają fokusu z pola
  // Standardowy układ QWERTY: Shift (dotknij = jedna wielka litera, 2× = Caps Lock), ?123 = znaki specjalne,
  // przytrzymanie litery = polskie znaki (a→ą, c→ć, e→ę, l→ł, n→ń, o→ó, s→ś, z→ż ź), przytrzymanie ⌫ = kasowanie ciągłe
  var OSK_L = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  var OSK_S = ['-/:;()&@"\'', '.,?!%*+=#_', '[]{}<>\\|~€'];
  var OSK_ACC = {
    a: 'ą',
    c: 'ć',
    e: 'ę',
    l: 'ł',
    n: 'ń',
    o: 'ó',
    s: 'ś',
    z: 'żź',
    x: 'ź'
  };
  var ShiftIco = function ShiftIco(_ref0) {
    var lock = _ref0.lock;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 15v-4H5l7-7 7 7h-4v4H9z",
      fill: lock ? 'currentColor' : 'none'
    }), lock && /*#__PURE__*/React.createElement("path", {
      d: "M8.5 19.5h7",
      strokeLinecap: "round"
    }));
  };
  function OSK(_ref1) {
    var onKey = _ref1.onKey,
      onHide = _ref1.onHide,
      onEnter = _ref1.onEnter,
      _ref1$enterLabel = _ref1.enterLabel,
      enterLabel = _ref1$enterLabel === void 0 ? 'OK' : _ref1$enterLabel,
      _ref1$extra = _ref1.extra,
      extra = _ref1$extra === void 0 ? '' : _ref1$extra;
    var _useState17 = useState('off'),
      _useState18 = _slicedToArray(_useState17, 2),
      shift = _useState18[0],
      setShift = _useState18[1]; // off | on | lock
    var _useState19 = useState(false),
      _useState20 = _slicedToArray(_useState19, 2),
      sym = _useState20[0],
      setSym = _useState20[1];
    var _useState21 = useState(null),
      _useState22 = _slicedToArray(_useState21, 2),
      pop = _useState22[0],
      setPopRaw = _useState22[1]; // { opts, sel, x, y, w }
    var popRef = useRef(null);
    var setPop = function setPop(p) {
      popRef.current = p;
      setPopRaw(p);
    };
    var shiftRef = useRef(shift);
    shiftRef.current = shift;
    var T = useRef({});
    var h = useRef(null);
    var stopT = function stopT() {
      clearTimeout(T.current.lp);
      clearTimeout(T.current.rd);
      clearInterval(T.current.rep);
    };
    useEffect(function () {
      return stopT;
    }, []);
    var keep = function keep(e) {
      return e.preventDefault();
    };
    var fire = function fire(k) {
      return k === '__enter' ? onEnter && onEnter() : k === '__hide' ? onHide && onHide() : onKey(k);
    };
    var press = function press(e, d) {
      var k = d.k,
        t = d.t;
      if (t === 'shift') {
        var now = Date.now(),
          s = shiftRef.current;
        setShift(s === 'lock' ? 'off' : s === 'on' ? now - (T.current.ls || 0) < 320 ? 'lock' : 'off' : 'on');
        T.current.ls = now;
        return;
      }
      if (t === 'sym') {
        setSym(function (v) {
          return !v;
        });
        return;
      }
      if (t === 'char') {
        var upper = shiftRef.current !== 'off' && !sym;
        onKey(upper ? k.toUpperCase() : k);
        if (shiftRef.current === 'on') setShift('off');
        var acc = !sym && OSK_ACC[k];
        if (acc) {
          var b = e.currentTarget;
          T.current.lp = setTimeout(function () {
            onKey('BACK');
            setPop({
              opts: acc.split('').map(function (c) {
                return upper ? c.toUpperCase() : c;
              }),
              sel: 0,
              x: b.offsetLeft + b.offsetWidth / 2,
              y: b.offsetTop,
              w: b.offsetWidth
            });
          }, 420);
        }
        return;
      }
      fire(k);
      if (k === 'BACK') T.current.rd = setTimeout(function () {
        T.current.rep = setInterval(function () {
          return onKey('BACK');
        }, 70);
      }, 450);
    };
    var pd = function pd(e, d) {
      e.preventDefault();
      if (e.button && e.button > 0) return;
      h.current = d.k;
      stopT();
      press(e, d);
    };
    var pm = function pm(e) {
      var p = popRef.current;
      if (!p) return;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var a = el && el.closest && el.closest('[data-acc]');
      if (a && +a.dataset.acc !== p.sel) setPop(_objectSpread(_objectSpread({}, p), {}, {
        sel: +a.dataset.acc
      }));
    };
    var pu = function pu() {
      stopT();
      var p = popRef.current;
      if (p) {
        onKey(p.opts[p.sel]);
        setPop(null);
      }
    };
    var cl = function cl(d) {
      if (h.current === d.k) {
        h.current = null;
        return;
      }
      press({
        currentTarget: null
      }, _objectSpread(_objectSpread({}, d), {}, {
        t: d.t === 'char' ? 'plain' : d.t
      }));
    };
    var K = function K(d) {
      return /*#__PURE__*/React.createElement("button", {
        key: d.id || d.k,
        className: 'np-osk-k ' + (d.cls || ''),
        onPointerDown: function onPointerDown(e) {
          return pd(e, d);
        },
        onPointerMove: pm,
        onPointerUp: pu,
        onPointerCancel: pu,
        onMouseDown: keep,
        onClick: function onClick() {
          return cl(d);
        }
      }, d.label || d.k, d.acc && /*#__PURE__*/React.createElement("i", {
        className: "np-osk-acc"
      }, d.acc));
    };
    var caps = shift !== 'off';
    var letter = function letter(c) {
      return K({
        k: c,
        t: 'char',
        label: caps ? c.toUpperCase() : c,
        acc: OSK_ACC[c] ? caps ? OSK_ACC[c][0].toUpperCase() : OSK_ACC[c][0] : null
      });
    };
    var symKey = function symKey(c) {
      return K({
        k: c,
        t: 'char'
      });
    };
    var back = K({
      k: 'BACK',
      cls: 'wide alt',
      label: /*#__PURE__*/React.createElement(Icon, {
        name: "backspace"
      })
    });
    var ext = extra.split('').filter(function (c) {
      return !',.'.includes(c);
    });
    var rows = sym ? OSK_S : OSK_L;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-osk"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-osk-row"
    }, '1234567890'.split('').map(function (c) {
      return K({
        k: c,
        cls: 'alt'
      });
    }), ext.map(function (c) {
      return K({
        k: c,
        cls: 'alt'
      });
    })), rows.map(function (r, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: (sym ? 's' : 'l') + i,
        className: "np-osk-row"
      }, i === 2 && !sym && K({
        k: '__shift',
        t: 'shift',
        cls: 'wide alt' + (shift !== 'off' ? ' on' : ''),
        label: /*#__PURE__*/React.createElement(ShiftIco, {
          lock: shift === 'lock'
        })
      }), r.split('').map(sym ? symKey : letter), i === 2 && back);
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-osk-row"
    }, K({
      k: '__sym',
      t: 'sym',
      cls: 'wide alt',
      label: sym ? 'ABC' : '?123'
    }), onEnter ? K({
      k: 'CLEAR',
      cls: 'wide alt',
      label: 'Wyczyść'
    }) : K({
      k: '__hide',
      cls: 'wide alt',
      label: 'Ukryj'
    }), K({
      k: '.'
    }), K({
      k: ' ',
      cls: 'space',
      label: 'spacja'
    }), K({
      k: '.'
    }), onEnter ? K({
      k: '__enter',
      cls: 'wide enter',
      label: enterLabel
    }) : K({
      k: 'CLEAR',
      cls: 'wide alt',
      label: 'Wyczyść'
    })), pop && /*#__PURE__*/React.createElement("div", {
      className: "np-osk-pop",
      style: {
        left: pop.x,
        top: pop.y,
        '--kw': pop.w + 'px'
      }
    }, pop.opts.map(function (o, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: o,
        "data-acc": i,
        className: i === pop.sel ? 'on' : '',
        onPointerUp: function onPointerUp() {
          setPop(null);
          onKey(o);
        }
      }, o);
    })));
  }
  function Avatar(_ref10) {
    var c = _ref10.c,
      _ref10$size = _ref10.size,
      size = _ref10$size === void 0 ? 52 : _ref10$size;
    var ini = c.name.split(' ').map(function (s) {
      return s[0];
    }).join('').slice(0, 2);
    return /*#__PURE__*/React.createElement("span", {
      className: "np-avatar",
      style: {
        width: size,
        height: size,
        background: c.color,
        fontSize: Math.round(size * 0.36)
      }
    }, ini);
  }

  // Obszar przewijany z własnym wskaźnikiem (pasek z uchwytem, wygaszenie krawędzi, przycisk „więcej”)
  function ScrollArea(_ref11) {
    var _ref11$className = _ref11.className,
      className = _ref11$className === void 0 ? '' : _ref11$className,
      _ref11$variant = _ref11.variant,
      variant = _ref11$variant === void 0 ? '' : _ref11$variant,
      _ref11$more = _ref11.more,
      more = _ref11$more === void 0 ? true : _ref11$more,
      children = _ref11.children,
      innerRef = _ref11.innerRef;
    var ref = useRef(null);
    var _useState23 = useState({
        can: false,
        top: 0,
        h: 0,
        atTop: true,
        atEnd: true
      }),
      _useState24 = _slicedToArray(_useState23, 2),
      st = _useState24[0],
      setSt = _useState24[1];
    var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      active = _useState26[0],
      setActive = _useState26[1];
    var T = useRef({});
    var measure = function measure() {
      var el = ref.current;
      if (!el) return;
      var sh = el.scrollHeight,
        ch = el.clientHeight,
        sTop = el.scrollTop;
      var can = sh > ch + 2;
      var track = ch - 16,
        h = can ? Math.max(40, track * (ch / sh)) : 0;
      var top = can ? sTop / (sh - ch) * (track - h) : 0;
      setSt(function (p) {
        return p.can === can && Math.abs(p.top - top) < 0.5 && Math.abs(p.h - h) < 0.5 && p.atTop === sTop < 4 && p.atEnd === sTop > sh - ch - 4 ? p : {
          can: can,
          top: top,
          h: h,
          atTop: sTop < 4,
          atEnd: sTop > sh - ch - 4
        };
      });
    };
    useEffect(function () {
      var el = ref.current;
      if (!el) return undefined;
      if (innerRef) innerRef.current = el;
      var raf = 0;
      var onScroll = function onScroll() {
        if (!raf) raf = requestAnimationFrame(function () {
          raf = 0;
          measure();
        });
        if (!T.current.on) {
          T.current.on = true;
          setActive(true);
        }
        clearTimeout(T.current.a);
        T.current.a = setTimeout(function () {
          T.current.on = false;
          setActive(false);
        }, 900);
      };
      el.addEventListener('scroll', onScroll, {
        passive: true
      });
      var ro = new ResizeObserver(measure);
      ro.observe(el);
      Array.from(el.children).forEach(function (c) {
        return ro.observe(c);
      });
      var mo = new MutationObserver(function () {
        measure();
        Array.from(el.children).forEach(function (c) {
          return ro.observe(c);
        });
      });
      mo.observe(el, {
        childList: true,
        subtree: true
      });
      measure();
      return function () {
        el.removeEventListener('scroll', onScroll);
        ro.disconnect();
        mo.disconnect();
        clearTimeout(T.current.a);
      };
    }, []);
    useEffect(measure);
    var drag = function drag(e) {
      var el = ref.current;
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      var sc = el.getBoundingClientRect().height / el.offsetHeight || 1;
      var y0 = e.clientY,
        s0 = el.scrollTop,
        range = el.scrollHeight - el.clientHeight,
        track = el.clientHeight - 16 - st.h;
      setActive(true);
      var mv = function mv(ev) {
        el.scrollTop = s0 + (ev.clientY - y0) / sc * (range / Math.max(1, track));
      };
      var _up3 = function up() {
        window.removeEventListener('pointermove', mv);
        window.removeEventListener('pointerup', _up3);
        T.current.a = setTimeout(function () {
          return setActive(false);
        }, 600);
      };
      window.addEventListener('pointermove', mv);
      window.addEventListener('pointerup', _up3);
    };
    var page = function page() {
      var el = ref.current;
      if (el) el.scrollBy({
        top: el.clientHeight * 0.8,
        behavior: 'smooth'
      });
    };
    var cls = 'np-sa' + (variant ? ' v-' + variant : '') + (st.can ? ' can' : '') + (active ? ' active' : '') + (st.can && !st.atTop ? ' fade-t' : '') + (st.can && !st.atEnd ? ' fade-b' : '');
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: className + ' np-sa-in'
    }, children), /*#__PURE__*/React.createElement("div", {
      className: "np-sa-bar"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        height: st.h,
        transform: "translateY(".concat(st.top, "px)")
      },
      onPointerDown: drag
    })), more && st.can && !st.atEnd && /*#__PURE__*/React.createElement("button", {
      className: "np-sa-more",
      onClick: page,
      "aria-label": "Przewi\u0144 w d\xF3\u0142"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    }), "wi\u0119cej"));
  }

  // Dopasowanie napisów na kafelkach: długie pojedyncze słowa nie mogą wychodzić poza kafelek —
  // zmniejszamy czcionkę etykiety krokami 0,5px (min. 10px), aż słowo się zmieści.
  var FIT_SEL = '.np-tile-label, .np-mi-label';
  // Kafelki: duża czcionka bez zmniejszania; jeśli nazwa się nie mieści — ucinamy na pełnej linii z „…”
  var NP_MEASURE = document.createElement('canvas').getContext('2d');
  function clampTileLabel(el) {
    el.style.webkitLineClamp = '';
    el.style.maxHeight = '';
    el.style.fontSize = '';
    el.style.overflowWrap = '';
    el.classList.remove('tr');
    el.removeAttribute('data-trunc');
    if (!el.clientWidth) return;
    // słowo dłuższe niż kafelek: ucinamy je z „…” (bez łamania w środku wyrazu); tekst pokazuje ::after, React dalej zarządza <span>
    if (el.scrollWidth > el.clientWidth + 1) {
      var span = el.firstElementChild;
      var full = (span ? span.textContent : el.textContent) || '';
      var cs = getComputedStyle(el);
      NP_MEASURE.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var avail = el.clientWidth - 1,
        W = function W(t) {
          return NP_MEASURE.measureText(t).width;
        };
      var out = '';
      var _iterator = _createForOfIteratorHelper(full.split(/(\s+)/)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var w = _step.value;
          if (!w || /^\s+$/.test(w)) {
            out += w;
            continue;
          }
          if (W(w) <= avail) {
            out += w;
            continue;
          }
          var lo = 1,
            hi = w.length;
          while (lo < hi) {
            var mid = lo + hi + 1 >> 1;
            if (W(w.slice(0, mid) + '…') <= avail) lo = mid;else hi = mid - 1;
          }
          out += w.slice(0, lo) + '…';
          break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      el.setAttribute('data-trunc', out.trim());
      el.classList.add('tr');
    }
    if (el.scrollHeight > el.clientHeight + 1) {
      var lh = parseFloat(getComputedStyle(el).lineHeight) || 18;
      var lines = Math.max(1, Math.floor((el.clientHeight + 1) / lh));
      el.style.webkitLineClamp = String(lines);
      el.style.maxHeight = lines * lh + 'px';
    }
  }
  function fitLabel(el) {
    if (el.classList.contains('np-tile-label')) {
      clampTileLabel(el);
      return;
    }
    el.style.fontSize = '';
    el.style.webkitLineClamp = '';
    el.style.maxHeight = '';
    el.style.overflowWrap = '';
    if (!el.clientWidth) return;
    var over = function over() {
      return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    };
    var fs = parseFloat(getComputedStyle(el).fontSize) || 14,
      n = 0;
    while (over() && fs > 10 && n++ < 30) {
      fs -= 0.5;
      el.style.fontSize = fs + 'px';
    }
    // ostateczność: słowo dłuższe niż kafelek nawet przy 10px — łamiemy je, zamiast ucinać
    if (el.scrollWidth > el.clientWidth + 1) el.style.overflowWrap = 'anywhere';
    // gdy nadal się nie mieści w pionie: obcinamy na pełnej linii (wielokropek), nigdy w połowie wiersza
    if (el.scrollHeight > el.clientHeight + 1) {
      var lh = parseFloat(getComputedStyle(el).lineHeight) || fs * 1.15;
      var lines = Math.max(1, Math.floor((el.clientHeight + 1) / lh));
      el.style.webkitLineClamp = String(lines);
      el.style.maxHeight = lines * lh + 'px';
    }
  }
  function useAutoFitLabels(ref) {
    useEffect(function () {
      var root = ref.current;
      if (!root) return undefined;
      var pend = new Set();
      var all = true,
        t = 0;
      var flush = function flush() {
        var els = all ? Array.from(root.querySelectorAll(FIT_SEL)) : Array.from(pend);
        all = false;
        pend.clear();
        els.forEach(function (el) {
          if (el.isConnected) fitLabel(el);
        });
      };
      var schedule = function schedule() {
        clearTimeout(t);
        t = setTimeout(flush, 80);
      };
      var runAll = function runAll() {
        all = true;
        schedule();
      };
      var mo = new MutationObserver(function (list) {
        var hit = false;
        var _iterator2 = _createForOfIteratorHelper(list),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var m = _step2.value;
            var n = m.target.nodeType === 1 ? m.target : m.target.parentElement;
            if (!n) continue;
            var lab = n.closest(FIT_SEL);
            if (lab) {
              pend.add(lab);
              hit = true;
              continue;
            }
            if (m.type === 'childList') m.addedNodes.forEach(function (a) {
              if (a.nodeType !== 1) return;
              if (a.matches(FIT_SEL)) {
                pend.add(a);
                hit = true;
              }
              a.querySelectorAll(FIT_SEL).forEach(function (e) {
                pend.add(e);
                hit = true;
              });
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (hit) schedule();
      });
      mo.observe(root, {
        childList: true,
        subtree: true,
        characterData: true
      });
      var ro = new ResizeObserver(runAll);
      ro.observe(root);
      window.addEventListener('np-settings', runAll);
      window.addEventListener('resize', runAll);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(runAll);
      runAll();
      return function () {
        mo.disconnect();
        ro.disconnect();
        clearTimeout(t);
        window.removeEventListener('np-settings', runAll);
        window.removeEventListener('resize', runAll);
      };
    }, []);
  }
  Object.assign(window, {
    useProductsVer: useProductsVer,
    useEvent: useEvent,
    useMinute: useMinute,
    LoginClock: LoginClock,
    npFlushStored: npFlushStored,
    NPKeys: NPKeys,
    useAutoFitLabels: useAutoFitLabels,
    ScrollArea: ScrollArea,
    useKeys: useKeys,
    useStored: useStored,
    npResetStorage: npResetStorage,
    useNow: useNow,
    Icon: Icon,
    StatusBar: React.memo(StatusBar),
    Toast: Toast,
    Sheet: Sheet,
    Dialog: Dialog,
    NumPad: NumPad,
    PAD_MONEY: PAD_MONEY,
    PAD_INT: PAD_INT,
    applyAmountKey: applyAmountKey,
    AmountSheet: AmountSheet,
    OSK: OSK,
    Avatar: Avatar
  });
})();