"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* TAKA KASA — ekran logowania */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;
  var PAD_PIN = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['C', '0', 'BACK']];
  var PAD_CARD = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['BACK', '0', 'OK']];
  function LoginScreen(_ref) {
    var onLogin = _ref.onLogin,
      preselect = _ref.preselect,
      locked = _ref.locked,
      onOpenMenu = _ref.onOpenMenu;
    var _NP_DATA = NP_DATA,
      CASHIERS = _NP_DATA.CASHIERS,
      SHOP = _NP_DATA.SHOP;
    var _useState = useState(function () {
        return CASHIERS.find(function (c) {
          return c.id === preselect;
        }) || null;
      }),
      _useState2 = _slicedToArray(_useState, 2),
      who = _useState2[0],
      setWho = _useState2[1];
    var _useState3 = useState('secret'),
      _useState4 = _slicedToArray(_useState3, 2),
      method = _useState4[0],
      setMethod = _useState4[1]; // secret = PIN/hasło | card = karta kasjera
    var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      val = _useState6[0],
      setValRaw = _useState6[1];
    var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      show = _useState8[0],
      setShow = _useState8[1];
    var _useState9 = useState('idle'),
      _useState0 = _slicedToArray(_useState9, 2),
      state = _useState0[0],
      setState = _useState0[1]; // idle | err | ok
    var _useState1 = useState(false),
      _useState10 = _slicedToArray(_useState1, 2),
      reading = _useState10[0],
      setReading = _useState10[1];
    var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      menuMode = _useState12[0],
      setMenuMode = _useState12[1]; // wejście do Menu z ekranu logowania (tylko konta z uprawnieniami kierownika)
    var list = menuMode ? CASHIERS.filter(function (c) {
      return c.admin;
    }) : CASHIERS;
    var valRef = useRef('');
    var stRef = useRef('idle');
    stRef.current = state;
    var setVal = function setVal(v) {
      valRef.current = v;
      setValRaw(v);
    };
    var isPin = !!who && who.auth === 'pin';
    var alnum = !!who && method === 'secret' && !isPin;
    var maxLen = method === 'card' ? 8 : isPin ? 4 : 16;
    var secretName = isPin ? 'PIN' : 'hasło';
    var pick = function pick(c) {
      setWho(c);
      setVal('');
      setState('idle');
      setMethod('secret');
      setShow(false);
    };
    var switchMethod = function switchMethod(m) {
      if (m === method) return;
      setMethod(m);
      setVal('');
      setState('idle');
      setShow(false);
    };
    var check = function check(v) {
      return method === 'card' ? v === who.card : isPin ? v === who.pin : v.toLowerCase() === who.pass.toLowerCase();
    };
    var submit = function submit() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : valRef.current;
      if (!v || stRef.current !== 'idle') return;
      if (check(v)) {
        setState('ok');
        setTimeout(function () {
          return onLogin(who, {
            menu: menuMode
          });
        }, 420);
      } else {
        setState('err');
        setTimeout(function () {
          setVal('');
          setState('idle');
        }, 750);
      }
    };
    var type = function type(k) {
      if (stRef.current !== 'idle') return;
      var cur = valRef.current;
      if (k === 'BACK') return setVal(cur.slice(0, -1));
      if (k === 'C' || k === 'CLEAR') return setVal('');
      if (k === 'OK') return submit();
      if (cur.length >= maxLen) return;
      var n = cur + k;
      setVal(n);
      if (isPin && method === 'secret' && n.length === 4) setTimeout(function () {
        return submit(n);
      }, 140);
    };
    var simulateCard = function simulateCard() {
      if (reading || stRef.current !== 'idle') return;
      setReading(true);
      setTimeout(function () {
        setReading(false);
        setVal(who.card);
        submit(who.card);
      }, 900);
    };
    useKeys(function (k) {
      if (!who) {
        if (k === 'ESC' && menuMode) {
          setMenuMode(false);
          return true;
        }
        if (k === 'MENU' && onOpenMenu) {
          onOpenMenu();
          return true;
        }
        var c = list[+k - 1];
        if (c) pick(c);
        return true;
      }
      if (k === 'ESC') {
        if (valRef.current) setVal('');else if (!locked) setWho(null);
        return true;
      }
      if (alnum) {
        if (k === 'OK') submit();else if (k === 'BACK') type(k);else if (/^[0-9]$/.test(k)) type(k);
        return true;
      }
      if (/^[0-9]$/.test(k) || k === 'BACK' || k === 'OK') type(k);
      return true;
    }, 0);

    // Hasło alfanumeryczne z fizycznej klawiatury (litery nie należą do klawiszy kasy)
    useEffect(function () {
      if (!alnum) return undefined;
      var h = function h(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var k = null;
        if (e.key.length === 1) k = e.key;else if (e.key === 'Backspace') k = 'BACK';else if (e.key === 'Enter') k = 'OK';else if (e.key === 'Escape') k = 'ESC';
        if (!k) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (k === 'ESC') {
          if (valRef.current) setVal('');else if (!locked) setWho(null);
        } else type(k);
      };
      window.addEventListener('keydown', h, true);
      return function () {
        return window.removeEventListener('keydown', h, true);
      };
    }, [alnum, who, locked]);
    var msg = state === 'err' ? method === 'card' ? 'Nieznana karta' : isPin ? 'Nieprawidłowy PIN' : 'Nieprawidłowe hasło' : who && (method === 'card' ? "Karta demo: ".concat(who.card) : isPin ? "PIN demo: ".concat(who.pin) : "Has\u0142o demo: ".concat(who.pass));
    return /*#__PURE__*/React.createElement("div", {
      className: "np-login"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-login-left"
    }, /*#__PURE__*/React.createElement(LoginClock, null), /*#__PURE__*/React.createElement("div", {
      className: "np-login-shop"
    }, /*#__PURE__*/React.createElement("b", null, SHOP.name), /*#__PURE__*/React.createElement("span", null, SHOP.addr), /*#__PURE__*/React.createElement("span", null, SHOP.kasa, " \xB7 ", SHOP.nip), /*#__PURE__*/React.createElement("div", {
      className: "np-login-status"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pill"
    }, /*#__PURE__*/React.createElement("i", null), "NoviCloud po\u0142\u0105czono"), /*#__PURE__*/React.createElement("span", {
      className: "np-pill"
    }, /*#__PURE__*/React.createElement("i", null), "Drukarka gotowa")))), /*#__PURE__*/React.createElement("div", {
      className: "np-login-card"
    }, !who ? /*#__PURE__*/React.createElement("div", {
      className: "np-login-list",
      key: "list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-login-titlerow"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "np-login-title"
    }, menuMode ? 'Wejście do Menu' : 'Zaloguj się'), /*#__PURE__*/React.createElement("div", {
      className: "np-login-sub"
    }, menuMode ? 'Zaloguj się kontem z uprawnieniami kierownika' : 'Wybierz kasjera lub wpisz jego numer')), menuMode ? /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setMenuMode(false);
      },
      "aria-label": "Anuluj wej\u015Bcie do Menu"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    })) : /*#__PURE__*/React.createElement("button", {
      className: "np-menu-btn",
      onClick: onOpenMenu,
      "aria-label": "Menu"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "menu"
    }), /*#__PURE__*/React.createElement("span", null, "Menu"))), /*#__PURE__*/React.createElement("div", {
      className: "np-cashiers"
    }, list.map(function (c, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: c.id,
        className: "np-cashier",
        onClick: function onClick() {
          return pick(c);
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        c: c,
        size: 54
      }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "np-cashier-name"
      }, c.name), /*#__PURE__*/React.createElement("span", {
        className: "np-cashier-role"
      }, c.role)), /*#__PURE__*/React.createElement("span", {
        className: "np-cashier-num"
      }, i + 1), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      }));
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "np-pin",
      key: 'pin' + who.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pin-head"
    }, !locked && /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setWho(null);
      },
      "aria-label": "Wr\xF3\u0107"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement(Avatar, {
      c: who,
      size: 54
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-pin-who"
    }, /*#__PURE__*/React.createElement("b", null, who.name), /*#__PURE__*/React.createElement("span", null, locked ? 'Kasa zablokowana' : menuMode ? 'Wejście do Menu · ' + who.role : who.role))), /*#__PURE__*/React.createElement("div", {
      className: "np-seg full np-login-seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: method === 'secret' ? 'on' : '',
      onClick: function onClick() {
        return switchMethod('secret');
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round"
    }), isPin ? 'PIN' : 'Hasło'), /*#__PURE__*/React.createElement("button", {
      className: method === 'card' ? 'on' : '',
      onClick: function onClick() {
        return switchMethod('card');
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "credit-card"
    }), "Karta kasjera")), method === 'card' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: 'np-card-read' + (reading ? ' reading' : ''),
      onClick: simulateCard
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "nfc"
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, reading ? 'Odczytywanie karty…' : 'Przyłóż kartę do czytnika'), /*#__PURE__*/React.createElement("span", null, "albo wpisz numer karty \xB7 dotknij, aby zasymulowa\u0107"))), /*#__PURE__*/React.createElement("div", {
      className: 'np-pass-field ' + state
    }, /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, val ? val.replace(/(\d{4})(?=\d)/g, '$1 ') : /*#__PURE__*/React.createElement("span", {
      className: "ph"
    }, "Numer karty"))), /*#__PURE__*/React.createElement("div", {
      className: 'np-pin-msg' + (state === 'err' ? ' err' : '')
    }, msg), /*#__PURE__*/React.createElement(NumPad, {
      onKey: type,
      keys: PAD_CARD
    })) : isPin ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-pin-label"
    }, locked ? 'Wpisz PIN, aby odblokować kasę' : menuMode ? 'Wpisz PIN, aby wejść do Menu' : 'Wpisz PIN'), /*#__PURE__*/React.createElement("div", {
      className: 'np-pin-dots ' + state
    }, [0, 1, 2, 3].map(function (i) {
      return /*#__PURE__*/React.createElement("i", {
        key: i,
        className: i < val.length ? 'on' : ''
      });
    })), /*#__PURE__*/React.createElement("div", {
      className: 'np-pin-msg' + (state === 'err' ? ' err' : '')
    }, msg), /*#__PURE__*/React.createElement(NumPad, {
      onKey: type,
      keys: PAD_PIN
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-pin-label"
    }, locked ? 'Wpisz hasło, aby odblokować kasę' : menuMode ? 'Wpisz hasło, aby wejść do Menu' : 'Wpisz hasło'), /*#__PURE__*/React.createElement("div", {
      className: 'np-pass-field ' + state
    }, /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, val ? show ? val : '•'.repeat(val.length) : /*#__PURE__*/React.createElement("span", {
      className: "ph"
    }, "Has\u0142o"), /*#__PURE__*/React.createElement("i", {
      className: "np-caret"
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-pass-eye",
      onClick: function onClick() {
        return setShow(!show);
      },
      "aria-label": show ? 'Ukryj hasło' : 'Pokaż hasło'
    }, /*#__PURE__*/React.createElement(Icon, {
      name: show ? 'eye-off' : 'eye'
    }))), /*#__PURE__*/React.createElement("div", {
      className: 'np-pin-msg' + (state === 'err' ? ' err' : '')
    }, msg), /*#__PURE__*/React.createElement(OSK, {
      onKey: type,
      onEnter: function onEnter() {
        return submit();
      },
      enterLabel: "Zaloguj"
    })))));
  }
  function OffScreen(_ref2) {
    var onBoot = _ref2.onBoot;
    useKeys(function (k) {
      if (k === 'ESC') onBoot();
      return true;
    }, 50);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-off",
      onClick: onBoot
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "power"
    }), "Naci\u015Bnij ESC, aby uruchomi\u0107 kas\u0119"));
  }
  function BootScreen() {
    useKeys(function () {
      return true;
    }, 50);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-boot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-logo big"
    }, NP_BRAND.a, /*#__PURE__*/React.createElement("b", null, NP_BRAND.b)), /*#__PURE__*/React.createElement("div", {
      className: "np-boot-bar"
    }, /*#__PURE__*/React.createElement("i", null)));
  }
  Object.assign(window, {
    LoginScreen: LoginScreen,
    OffScreen: OffScreen,
    BootScreen: BootScreen
  });
})();