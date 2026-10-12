"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* TAKA KASA — wspólne komponenty UI */
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
    if (k === ',' || k === '.' || k === 'Decimal') return ',';
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
    var _useState3 = useState(function () {
        return new Date();
      }),
      _useState4 = _slicedToArray(_useState3, 2),
      n = _useState4[0],
      setN = _useState4[1];
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
    var _useState5 = useState(function () {
        return new Date();
      }),
      _useState6 = _slicedToArray(_useState5, 2),
      n = _useState6[0],
      setN = _useState6[1];
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
  function StatusBar() {
    var now = useMinute();
    return /*#__PURE__*/React.createElement("div", {
      className: "np-status"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-logo"
    }, NP_BRAND.a, /*#__PURE__*/React.createElement("b", null, NP_BRAND.b)), /*#__PURE__*/React.createElement("div", {
      className: "np-status-date"
    }, /*#__PURE__*/React.createElement("span", null, NPF.dateLong(now)), NPF.time(now)), /*#__PURE__*/React.createElement("div", {
      className: "np-status-icons"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "link"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "plug"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi"
    }), /*#__PURE__*/React.createElement("span", {
      className: "np-batt"
    }, /*#__PURE__*/React.createElement("i", null))));
  }
  function Toast(_ref2) {
    var toast = _ref2.toast;
    if (!toast) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: toast.id,
      className: 'np-toast t-' + (toast.tone || 'info')
    }, toast.icon && /*#__PURE__*/React.createElement(Icon, {
      name: toast.icon
    }), /*#__PURE__*/React.createElement("span", null, toast.text));
  }
  function Sheet(_ref3) {
    var onClose = _ref3.onClose,
      _ref3$className = _ref3.className,
      className = _ref3$className === void 0 ? '' : _ref3$className,
      style = _ref3.style,
      children = _ref3.children;
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
  function Dialog(_ref4) {
    var _ref4$tone = _ref4.tone,
      tone = _ref4$tone === void 0 ? 'info' : _ref4$tone,
      title = _ref4.title,
      desc = _ref4.desc,
      rows = _ref4.rows,
      _ref4$actions = _ref4.actions,
      actions = _ref4$actions === void 0 ? [] : _ref4$actions,
      progress = _ref4.progress,
      onClose = _ref4.onClose,
      _ref4$prio = _ref4.prio,
      prio = _ref4$prio === void 0 ? 30 : _ref4$prio,
      children = _ref4.children,
      _ref4$className = _ref4.className,
      className = _ref4$className === void 0 ? '' : _ref4$className;
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
    }, rows.map(function (_ref5, i) {
      var _ref6 = _slicedToArray(_ref5, 2),
        l = _ref6[0],
        v = _ref6[1];
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
  var PAD_MONEY = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], [',', '0', 'BACK']];
  var PAD_INT = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['C', '0', 'BACK']];
  function NumPad(_ref7) {
    var onKey = _ref7.onKey,
      _ref7$keys = _ref7.keys,
      keys = _ref7$keys === void 0 ? PAD_MONEY : _ref7$keys,
      _ref7$className = _ref7.className,
      className = _ref7$className === void 0 ? '' : _ref7$className,
      _ref7$labels = _ref7.labels,
      labels = _ref7$labels === void 0 ? {} : _ref7$labels;
    var h = useRef(null);
    var pd = function pd(e, k) {
      if (e.button && e.button > 0 || !k) return;
      h.current = k;
      onKey(k);
    };
    var cl = function cl(k) {
      if (h.current === k) {
        h.current = null;
        return;
      }
      if (k) onKey(k);
    };
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
        onClick: function onClick() {
          return cl(k);
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
    if (k === ',') {
      if (cur.includes(',')) return cur;
      return (cur || '0') + ',';
    }
    if (!/^[0-9]$/.test(k)) return cur;
    var _cur$split = cur.split(','),
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
  function AmountSheet(_ref8) {
    var title = _ref8.title,
      desc = _ref8.desc,
      _ref8$mode = _ref8.mode,
      mode = _ref8$mode === void 0 ? 'money' : _ref8$mode,
      maxLen = _ref8.maxLen,
      _ref8$initial = _ref8.initial,
      initial = _ref8$initial === void 0 ? '' : _ref8$initial,
      suffix = _ref8.suffix,
      presets = _ref8.presets,
      _ref8$confirmLabel = _ref8.confirmLabel,
      confirmLabel = _ref8$confirmLabel === void 0 ? 'Zatwierdź' : _ref8$confirmLabel,
      _ref8$confirmTone = _ref8.confirmTone,
      confirmTone = _ref8$confirmTone === void 0 ? 'green' : _ref8$confirmTone,
      validate = _ref8.validate,
      format = _ref8.format,
      onCancel = _ref8.onCancel,
      onConfirm = _ref8.onConfirm,
      _ref8$prio = _ref8.prio,
      prio = _ref8$prio === void 0 ? 30 : _ref8$prio;
    var _useState7 = useState(initial),
      _useState8 = _slicedToArray(_useState7, 2),
      v = _useState8[0],
      setV = _useState8[1];
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
      if (/^[0-9]$/.test(k) || k === 'BACK' || k === ',' && mode !== 'digits' && mode !== 'percent') push(k);else if (k === 'OK' || k === 'RAZEM') submit();else if (k === 'ESC') {
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
    }, mode === 'money' ? '0,00' : mode === 'percent' ? '0' : '—'), sfx && /*#__PURE__*/React.createElement("small", null, sfx)), /*#__PURE__*/React.createElement("div", {
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
  var OSK_ROWS = ['1234567890', 'ąćęłńóśźż', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  function OSK(_ref9) {
    var onKey = _ref9.onKey,
      onHide = _ref9.onHide,
      onEnter = _ref9.onEnter,
      _ref9$enterLabel = _ref9.enterLabel,
      enterLabel = _ref9$enterLabel === void 0 ? 'OK' : _ref9$enterLabel;
    var keep = function keep(e) {
      return e.preventDefault();
    };
    var h = useRef(null);
    var fire = function fire(k) {
      return k === '__enter' ? onEnter && onEnter() : k === '__hide' ? onHide && onHide() : onKey(k);
    };
    var pd = function pd(e, k) {
      e.preventDefault();
      if (e.button && e.button > 0) return;
      h.current = k;
      fire(k);
    };
    var cl = function cl(k) {
      if (h.current === k) {
        h.current = null;
        return;
      }
      fire(k);
    };
    var K = function K(_ref0) {
      var k = _ref0.k,
        _ref0$cls = _ref0.cls,
        cls = _ref0$cls === void 0 ? '' : _ref0$cls,
        children = _ref0.children;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: 'np-osk-k ' + cls,
        onPointerDown: function onPointerDown(e) {
          return pd(e, k);
        },
        onMouseDown: keep,
        onClick: function onClick() {
          return cl(k);
        }
      }, children || k);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "np-osk"
    }, OSK_ROWS.map(function (r, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "np-osk-row"
      }, r.split('').map(function (c) {
        return K({
          k: c,
          cls: i === 1 || i === 0 ? 'alt' : ''
        });
      }), i === 4 && K({
        k: 'BACK',
        cls: 'wide alt',
        children: /*#__PURE__*/React.createElement(Icon, {
          name: "backspace"
        })
      }));
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-osk-row"
    }, onEnter ? K({
      k: 'CLEAR',
      cls: 'wide alt',
      children: 'Wyczyść'
    }) : K({
      k: '__hide',
      cls: 'wide alt',
      children: 'Ukryj'
    }), K({
      k: ' ',
      cls: 'space',
      children: 'spacja'
    }), onEnter ? K({
      k: '__enter',
      cls: 'wide enter',
      children: enterLabel
    }) : K({
      k: 'CLEAR',
      cls: 'wide alt',
      children: 'Wyczyść'
    })));
  }
  function Avatar(_ref1) {
    var c = _ref1.c,
      _ref1$size = _ref1.size,
      size = _ref1$size === void 0 ? 52 : _ref1$size;
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
  function ScrollArea(_ref10) {
    var _ref10$className = _ref10.className,
      className = _ref10$className === void 0 ? '' : _ref10$className,
      _ref10$variant = _ref10.variant,
      variant = _ref10$variant === void 0 ? '' : _ref10$variant,
      _ref10$more = _ref10.more,
      more = _ref10$more === void 0 ? true : _ref10$more,
      children = _ref10.children,
      innerRef = _ref10.innerRef;
    var ref = useRef(null);
    var _useState9 = useState({
        can: false,
        top: 0,
        h: 0,
        atTop: true,
        atEnd: true
      }),
      _useState0 = _slicedToArray(_useState9, 2),
      st = _useState0[0],
      setSt = _useState0[1];
    var _useState1 = useState(false),
      _useState10 = _slicedToArray(_useState1, 2),
      active = _useState10[0],
      setActive = _useState10[1];
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
      var _up = function up() {
        window.removeEventListener('pointermove', mv);
        window.removeEventListener('pointerup', _up);
        T.current.a = setTimeout(function () {
          return setActive(false);
        }, 600);
      };
      window.addEventListener('pointermove', mv);
      window.addEventListener('pointerup', _up);
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
  function fitLabel(el) {
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
        var _iterator = _createForOfIteratorHelper(list),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var m = _step.value;
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
          _iterator.e(err);
        } finally {
          _iterator.f();
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