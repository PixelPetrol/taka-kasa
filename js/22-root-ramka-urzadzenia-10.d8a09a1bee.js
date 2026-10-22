"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
/* KASA NEXT PRO — root: ramka urządzenia 10,1″, skalowanie, Tweaks */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useLayoutEffect = _React.useLayoutEffect,
    useMemo = _React.useMemo;
  var STANDALONE = !!document.querySelector('meta[name="standalone-mode"]');
  // ?ramka=0 / ?ramka=1 — wymuszenie ramki urządzenia z adresu (np. na serwerze)
  var FRAME_Q = function () {
    try {
      var q = new URLSearchParams(location.search);
      return q.has('ramka') ? q.get('ramka') !== '0' : null;
    } catch (e) {
      return null;
    }
  }();
  // Wersja na serwer (meta pwa-mode): manifest + service worker → instalacja jako aplikacja (pełny ekran), praca offline
  if (document.querySelector('meta[name="pwa-mode"]') && /^https?:$/.test(location.protocol)) {
    var l = document.createElement('link');
    l.rel = 'manifest';
    l.href = 'manifest.json';
    document.head.appendChild(l);
    if ('serviceWorker' in navigator) {
      var reg = function reg() {
        return navigator.serviceWorker.register('sw.js')["catch"](function () {});
      };
      if (document.readyState === 'complete') reg();else window.addEventListener('load', reg);
    }
  }
  var pct = function pct(v) {
    var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var m = String(v || '').match(/(\d+)%/);
    return m ? +m[1] / 100 : def / 100;
  };
  function readUiPrefs() {
    var s = {};
    try {
      s = JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
    } catch (e) {}
    return {
      ui: pct(s.uiScale),
      text: s.bigText === 'Powiększona' ? 1.08 : 1,
      big: s.bigText === 'Powiększona',
      font: s.font === 'Roboto' ? 'roboto' : s.font === 'Geist' ? 'geist' : null,
      qty: s.qtyKeys === 'Pigułki' ? 'pill' : s.qtyKeys === 'Płytki' ? 'slab' : null,
      hl: s.hlLast === 'Brak' ? 'none' : s.hlLast === 'Obramowanie' ? 'border' : s.hlLast === 'Wypełnienie' ? 'fill' : null,
      prices: s.tilePrices === true,
      theme: s.theme === 'Ciemny' ? 'dark' : s.theme === 'Jasny' ? 'light' : null
    };
  }
  // Zapis jednego parametru ustawień kasy (to samo co Menu › Ustawienia)
  function npSetSetting(id, v) {
    var s = {};
    try {
      s = JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
    } catch (e) {}
    s[id] = v;
    try {
      localStorage.setItem('nextpro.settings', JSON.stringify(s));
    } catch (e) {}
    window.dispatchEvent(new Event('np-settings'));
  }
  // Motyw: klasa np-dark na <html>; zmiana z krótkim przenikaniem (View Transitions), jeśli przeglądarka je obsługuje
  function useTheme(dark) {
    var first = React.useRef(true);
    useLayoutEffect(function () {
      var root = document.documentElement;
      var apply = function apply() {
        return root.classList.toggle('np-dark', dark);
      };
      var skip = first.current || !document.startViewTransition || root.classList.contains('np-dark') === dark;
      first.current = false;
      if (skip) apply();else document.startViewTransition(apply);
    }, [dark]);
  }
  function useUiPrefs() {
    var _useState = useState(readUiPrefs),
      _useState2 = _slicedToArray(_useState, 2),
      p = _useState2[0],
      setP = _useState2[1];
    useEffect(function () {
      var h = function h() {
        return setP(readUiPrefs());
      };
      window.addEventListener('np-settings', h);
      window.addEventListener('storage', h);
      return function () {
        window.removeEventListener('np-settings', h);
        window.removeEventListener('storage', h);
      };
    }, []);
    return p;
  }
  function Device(_ref) {
    var frame = _ref.frame,
      children = _ref.children;
    var prefs = useUiPrefs();
    useEffect(function () {
      document.documentElement.classList.toggle('np-big', !!prefs.big);
    }, [prefs.big]);
    var us = prefs.ui;
    var scrRef = React.useRef(null);
    useAutoFitLabels(scrRef);
    var _useState3 = useState(1),
      _useState4 = _slicedToArray(_useState3, 2),
      sc = _useState4[0],
      setSc = _useState4[1];
    var W = frame ? 1336 : 1280,
      H = frame ? 892 : 800,
      M = frame ? 40 : 0;
    useEffect(function () {
      document.body.classList.toggle('np-bare', !frame);
      var fit = function fit() {
        return setSc(Math.max(0.2, Math.min((window.innerWidth - M) / W, (window.innerHeight - M) / H)));
      };
      fit();
      window.addEventListener('resize', fit);
      return function () {
        return window.removeEventListener('resize', fit);
      };
    }, [frame]);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-device' + (frame ? '' : ' bare'),
      style: {
        transform: "translate(-50%, -50%) scale(".concat(sc, ")")
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-screen-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-screen' + (prefs.prices ? ' np-show-prices' : ''),
      ref: scrRef,
      "data-screen-label": "Kasa Next Pro",
      style: {
        width: 1280 / us,
        height: 800 / us,
        transform: us === 1 ? 'none' : "scale(".concat(us, ")"),
        '--np-ts': prefs.text
      }
    }, children)), frame && /*#__PURE__*/React.createElement("div", {
      className: "np-device-label"
    }, NP_BRAND.a, " ", /*#__PURE__*/React.createElement("b", null, NP_BRAND.b))));
  }
  var MENU_USER = {
    id: 0,
    name: 'Menu kasy',
    role: 'bez logowania kasjera',
    color: '#3A3B40'
  };
  function NextProApp(_ref2) {
    var defaults = _ref2.defaults;
    var _useTweaks = useTweaks(defaults),
      _useTweaks2 = _slicedToArray(_useTweaks, 2),
      t = _useTweaks2[0],
      setTweak = _useTweaks2[1];
    var uiP = useUiPrefs();
    var font = uiP.font || t.font || 'geist';
    useEffect(function () {
      document.documentElement.classList.toggle('np-roboto', font === 'roboto');
    }, [font]);
    var tq = useMemo(function () {
      return _objectSpread(_objectSpread({}, t), {}, {
        qtyStyle: uiP.qty || t.qtyStyle || 'slab'
      });
    }, [t, uiP.qty]);
    useEffect(function () {
      var r = document.documentElement;
      var h = uiP.hl || t.hl || 'fill';
      r.classList.toggle('np-hl-none', h === 'none');
      r.classList.toggle('np-hl-border', h === 'border');
    }, [t.hl, uiP.hl]);
    var prefs = useUiPrefs();
    useEffect(function () {
      document.documentElement.classList.toggle('np-big', !!prefs.big);
    }, [prefs.big]);
    var gs = useNpSettings();
    var theme = prefs.theme || (t.theme === 'dark' ? 'dark' : 'light');
    useTheme(theme === 'dark');
    var _useStored = useStored('session', null),
      _useStored2 = _slicedToArray(_useStored, 2),
      session = _useStored2[0],
      setSession = _useStored2[1];
    var _useState5 = useState('on'),
      _useState6 = _slicedToArray(_useState5, 2),
      power = _useState6[0],
      setPower = _useState6[1];
    var menuOnly = !!(session && session.menuOnly);
    var cashier = session && (menuOnly ? MENU_USER : NP_DATA.CASHIERS.find(function (c) {
      return c.id === session.cashierId;
    }));
    var locked = !!(session && session.locked);
    var screen = power !== 'on' ? power : menuOnly ? 'menu' : cashier && !locked ? 'sale' : 'login';
    var boot = function boot() {
      setPower('boot');
      setTimeout(function () {
        return setPower('on');
      }, 1750);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Device, {
      frame: FRAME_Q != null ? FRAME_Q : t.frame && !STANDALONE
    }, screen === 'login' && /*#__PURE__*/React.createElement("div", {
      className: "np-scr",
      key: locked ? 'lock' : 'login',
      "data-screen-label": "Logowanie"
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(LoginScreen, {
      onOpenMenu: function onOpenMenu() {
        return setSession({
          menuOnly: true
        });
      },
      preselect: locked ? session.cashierId : null,
      locked: locked,
      onLogin: function onLogin(c, o) {
        if (o && o.menu) {
          try {
            localStorage.setItem('nextpro.tab', JSON.stringify('menu'));
          } catch (e) {}
        }
        setSession({
          cashierId: c.id
        });
      }
    })), screen === 'menu' && /*#__PURE__*/React.createElement("div", {
      className: "np-scr",
      key: "menu-only",
      "data-screen-label": "Menu (bez logowania)"
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(SaleScreen, {
      menuOnly: true,
      cashier: cashier,
      tweaks: tq,
      onTweak: setTweak,
      onLogout: function onLogout() {
        return setSession(null);
      },
      onLock: function onLock() {
        return setSession(null);
      },
      onPowerOff: function onPowerOff() {
        return setPower('off');
      },
      onRestart: boot
    })), screen === 'sale' && /*#__PURE__*/React.createElement("div", {
      className: "np-scr",
      key: 'sale' + cashier.id,
      "data-screen-label": "Sprzeda\u017C"
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(SaleScreen, {
      cashier: cashier,
      tweaks: tq,
      onTweak: setTweak,
      onLogout: function onLogout() {
        return setSession(null);
      },
      onLock: function onLock() {
        return setSession({
          cashierId: cashier.id,
          locked: true
        });
      },
      onPowerOff: function onPowerOff() {
        return setPower('off');
      },
      onRestart: boot
    })), screen === 'off' && /*#__PURE__*/React.createElement(OffScreen, {
      onBoot: boot
    }), screen === 'boot' && /*#__PURE__*/React.createElement(BootScreen, null)), !STANDALONE && /*#__PURE__*/React.createElement(TweaksPanel, {
      title: 'Tweaks · ' + NP_BRAND.full
    }, /*#__PURE__*/React.createElement(TweakSection, {
      label: "Urz\u0105dzenie"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Ramka urz\u0105dzenia",
      value: t.frame,
      onChange: function onChange(v) {
        return setTweak('frame', v);
      }
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Wygl\u0105d"
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Motyw",
      value: theme,
      options: [{
        value: 'light',
        label: 'Jasny'
      }, {
        value: 'dark',
        label: 'Ciemny'
      }],
      onChange: function onChange(v) {
        setTweak('theme', v);
        npSetSetting('theme', v === 'dark' ? 'Ciemny' : 'Jasny');
      }
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Uk\u0142ad ekranu sprzeda\u017Cy"
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Przyciski \u2212 / + na paragonie",
      value: tq.qtyStyle,
      options: [{
        value: 'slab',
        label: 'Płytki'
      }, {
        value: 'pill',
        label: 'Pigułki'
      }],
      onChange: function onChange(v) {
        setTweak('qtyStyle', v);
        npSetSetting('qtyKeys', v === 'pill' ? 'Pigułki' : 'Płytki');
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Czcionka",
      value: font,
      options: [{
        value: 'geist',
        label: 'Geist'
      }, {
        value: 'roboto',
        label: 'Roboto'
      }],
      onChange: function onChange(v) {
        setTweak('font', v);
        npSetSetting('font', v === 'roboto' ? 'Roboto' : 'Geist');
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Wielko\u015B\u0107 tekstu",
      value: uiP.big ? 'big' : 'std',
      options: [{
        value: 'std',
        label: 'Standardowa'
      }, {
        value: 'big',
        label: 'Powiększona'
      }],
      onChange: function onChange(v) {
        setTweak('textSize', v);
        npSetSetting('bigText', v === 'big' ? 'Powiększona' : 'Standardowa');
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Pod\u015Bwietlenie ostatniej pozycji",
      value: uiP.hl || t.hl || 'fill',
      options: [{
        value: 'none',
        label: 'Brak'
      }, {
        value: 'fill',
        label: 'Wypełnienie'
      }, {
        value: 'border',
        label: 'Obramowanie'
      }],
      onChange: function onChange(v) {
        setTweak('hl', v);
        npSetSetting('hlLast', v === 'none' ? 'Brak' : v === 'border' ? 'Obramowanie' : 'Wypełnienie');
      }
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Menu na pe\u0142nym ekranie (zakrywa paragon)",
      value: t.menuFull !== false,
      onChange: function onChange(v) {
        return setTweak('menuFull', v);
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Paragon",
      value: t.receipt,
      options: [{
        value: 'left',
        label: 'Z lewej'
      }, {
        value: 'right',
        label: 'Z prawej'
      }],
      onChange: function onChange(v) {
        return setTweak('receipt', v);
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Siatka kafelk\xF3w (kolumny \xD7 rz\u0119dy)",
      value: t.grid,
      options: [{
        value: '6x5',
        label: '6 × 5'
      }, {
        value: '5x6',
        label: '5 × 6'
      }],
      onChange: function onChange(v) {
        return setTweak('grid', v);
      }
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Podpowiedzi klawiszy PC",
      value: t.hints,
      onChange: function onChange(v) {
        return setTweak('hints', v);
      }
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Gastronomia"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Tryb gastro (zak\u0142adka Gastro)",
      value: !!gs.gastroTryb,
      onChange: function onChange(v) {
        return npSetSetting('gastroTryb', v);
      }
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Widok stolik\xF3w",
      value: gs.gastroWidok === 'Plan sali' ? 'plan' : 'grid',
      options: [{
        value: 'grid',
        label: 'Siatka'
      }, {
        value: 'plan',
        label: 'Plan sali'
      }],
      onChange: function onChange(v) {
        return npSetSetting('gastroWidok', v === 'plan' ? 'Plan sali' : 'Siatka');
      }
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Eksperymentalne"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Obrazki towar\xF3w",
      value: !!gs.prodImages,
      onChange: function onChange(v) {
        return npSetSetting('prodImages', v);
      }
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Dane demo"
    }), /*#__PURE__*/React.createElement(TweakButton, {
      label: "Poka\u017C ekran logowania",
      secondary: true,
      onClick: function onClick() {
        setPower('on');
        setSession(null);
      }
    }), /*#__PURE__*/React.createElement(TweakButton, {
      label: "Przywr\xF3\u0107 domy\u015Blne kafelki",
      secondary: true,
      onClick: function onClick() {
        return npResetStorage(['pages', 'page', 'fpages', 'fpage', 'kbRow', 'fKey', 'qPay', 'gRow', 'gPlan']);
      }
    }), /*#__PURE__*/React.createElement(TweakButton, {
      label: "Wyczy\u015B\u0107 wszystkie dane",
      secondary: true,
      onClick: function onClick() {
        return npResetStorage();
      }
    })));
  }
  window.NextProApp = NextProApp;
})();