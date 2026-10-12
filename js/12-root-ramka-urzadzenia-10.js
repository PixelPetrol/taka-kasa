"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* TAKA KASA — root: ramka urządzenia 10,1″, skalowanie, Tweaks */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;
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
  function Device(_ref) {
    var frame = _ref.frame,
      children = _ref.children;
    var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      sc = _useState2[0],
      setSc = _useState2[1];
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
      className: "np-screen",
      "data-screen-label": "Taka Kasa"
    }, children), frame && /*#__PURE__*/React.createElement("div", {
      className: "np-device-label"
    }, NP_BRAND.a, " ", /*#__PURE__*/React.createElement("b", null, NP_BRAND.b))));
  }
  var MENU_USER = {
    id: 0,
    name: 'Menu kasy',
    role: 'bez logowania kasjera',
    color: '#3A3B40'
  };
  function TakaKasaApp(_ref2) {
    var defaults = _ref2.defaults;
    var _useTweaks = useTweaks(defaults),
      _useTweaks2 = _slicedToArray(_useTweaks, 2),
      t = _useTweaks2[0],
      setTweak = _useTweaks2[1];
    var _useStored = useStored('session', null),
      _useStored2 = _slicedToArray(_useStored, 2),
      session = _useStored2[0],
      setSession = _useStored2[1];
    var _useState3 = useState('on'),
      _useState4 = _slicedToArray(_useState3, 2),
      power = _useState4[0],
      setPower = _useState4[1];
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
      tweaks: t,
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
      tweaks: t,
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
      label: "Uk\u0142ad ekranu sprzeda\u017Cy"
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
        return npResetStorage(['pages', 'page', 'fpages', 'fpage', 'kbRow', 'fKey', 'qPay']);
      }
    }), /*#__PURE__*/React.createElement(TweakButton, {
      label: "Wyczy\u015B\u0107 wszystkie dane",
      secondary: true,
      onClick: function onClick() {
        return npResetStorage();
      }
    })));
  }
  window.TakaKasaApp = TakaKasaApp;
})();