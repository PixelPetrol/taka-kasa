"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* KASA NEXT PRO — Programowanie: Dane sklepu, Stopka, Kod QR, Liczniki, Jednostki, Formy płatności, Klienci, Operatorzy, Profile, Karty rabatowe */
(function () {
  var _React = React,
    useState = _React.useState;
  var D = function D() {
    return NP_PROG_DATA;
  };
  var nipOk = function nipOk(s) {
    if (!/^\d{10}$/.test(s)) return false;
    var w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    var c = w.reduce(function (a, x, i) {
      return a + x * +s[i];
    }, 0) % 11;
    return c === +s[9];
  };
  var nipFmt = function nipFmt(s) {
    return /^\d{10}$/.test(s || '') ? NPF.nip(s) : s || '';
  };
  var cnt = function cnt(n, a, b, c) {
    return n + ' ' + (n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? b : c);
  };
  var uid = function uid(p) {
    return p + Date.now().toString(36) + Math.floor(Math.random() * 99);
  };
  var Chk = function Chk(_ref) {
    var on = _ref.on;
    return on ? /*#__PURE__*/React.createElement("span", {
      className: "np-tbl-ok"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check"
    })) : /*#__PURE__*/React.createElement("span", {
      className: "np-tbl-no"
    }, "\u2014");
  };
  var settings = function settings() {
    try {
      return JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
    } catch (e) {
      return {};
    }
  };
  var setSetting = function setSetting(k, v) {
    var s = _objectSpread(_objectSpread({}, settings()), {}, _defineProperty({}, k, v));
    try {
      localStorage.setItem('nextpro.settings', JSON.stringify(s));
    } catch (e) {}
    window.dispatchEvent(new Event('np-settings'));
  };

  // ── Dane sklepu ──
  function ShopForm(_ref2) {
    var onClose = _ref2.onClose,
      ui = _ref2.ui;
    var _useProg = useProg('shop'),
      _useProg2 = _slicedToArray(_useProg, 2),
      shop = _useProg2[0],
      setShop = _useProg2[1];
    return /*#__PURE__*/React.createElement(FormSheet, {
      title: "Dane sklepu",
      sub: "* pola wymagane",
      initial: shop,
      onCancel: onClose,
      validate: function validate(f) {
        return {
          nip: f.nip && !nipOk(f.nip) ? 'Nieprawidłowy NIP (suma kontrolna)' : null,
          zip: f.zip && !/^\d{2}-\d{3}$/.test(f.zip) ? 'Format: 00-000' : null
        };
      },
      onSave: function onSave(f) {
        setShop(f);
        onClose();
        ui.say('Dane sklepu zapisane', 'ok', 'check');
      },
      schema: [[{
        title: 'Sklep',
        fields: [{
          id: 'name',
          label: 'Nazwa sklepu',
          req: true,
          span: true,
          max: 40,
          count: true
        }, {
          id: 'nip',
          label: 'NIP',
          type: 'int',
          req: true,
          max: 10,
          hint: function hint(f) {
            return f.nip && f.nip.length === 10 ? nipFmt(f.nip) : '10 cyfr, bez kresek';
          }
        }, {
          id: 'phone',
          label: 'Numer telefonu',
          max: 20
        }]
      }, {
        title: 'Adres',
        fields: [{
          id: 'street',
          label: 'Ulica',
          span: true,
          max: 40
        }, {
          id: 'house',
          label: 'Nr domu',
          max: 8
        }, {
          id: 'flat',
          label: 'Nr lokalu',
          max: 8
        }, {
          id: 'zip',
          label: 'Kod pocztowy',
          req: true,
          max: 6,
          filter: function filter(x) {
            var d = x.replace(/[^0-9]/g, '').slice(0, 5);
            return d.length > 2 ? d.slice(0, 2) + '-' + d.slice(2) : d;
          }
        }, {
          id: 'city',
          label: 'Miasto',
          req: true,
          max: 30
        }]
      }], [{
        title: 'Bank',
        fields: [{
          id: 'bank',
          label: 'Nazwa banku',
          span: true,
          max: 40
        }, {
          id: 'account',
          label: 'Numer konta',
          type: 'int',
          span: true,
          max: 26,
          mono: true,
          hint: 'Drukowany na fakturach'
        }]
      }, {
        title: 'Kontakt serwisowy',
        fields: [{
          id: 'service',
          label: 'Telefon',
          span: true,
          max: 20,
          hint: 'Numer telefonu do osoby odpowiedzialnej za opiekę serwisową nad kasą.'
        }]
      }]]
    });
  }

  // ── Stopka paragonu ──
  function FooterForm(_ref3) {
    var onClose = _ref3.onClose,
      ui = _ref3.ui;
    var _useProg3 = useProg('footer'),
      _useProg4 = _slicedToArray(_useProg3, 2),
      ft = _useProg4[0],
      setFt = _useProg4[1];
    var _useProg5 = useProg('qr'),
      _useProg6 = _slicedToArray(_useProg5, 1),
      qr = _useProg6[0];
    var init = {
      l0: ft.lines[0] || '',
      l1: ft.lines[1] || '',
      l2: ft.lines[2] || '',
      l3: ft.lines[3] || '',
      barcode: !!ft.barcode
    };
    return /*#__PURE__*/React.createElement(FormSheet, {
      title: "Stopka paragonu",
      sub: "Tekst drukowany pod paragonem \xB7 max. 40 znak\xF3w w linii",
      initial: init,
      onCancel: onClose,
      onSave: function onSave(f) {
        setFt({
          lines: [f.l0, f.l1, f.l2, f.l3],
          barcode: f.barcode
        });
        onClose();
        ui.say('Stopka zapisana · obowiązuje od następnego raportu dobowego', 'ok', 'check');
      },
      schema: [[{
        title: 'Tekst stopki',
        fields: [0, 1, 2, 3].map(function (i) {
          return {
            id: 'l' + i,
            label: 'Linia ' + (i + 1),
            span: true,
            max: 40,
            count: true,
            ph: i ? '(pusta)' : 'np. Dziękujemy. Zapraszamy ponownie.'
          };
        }).concat([{
          type: 'note',
          span: true,
          tone: 'warn',
          icon: 'clock',
          text: 'Zmieniona stopka będzie drukowana dopiero po raporcie fiskalnym dobowym.'
        }])
      }, {
        title: 'Kod pod paragonem',
        fields: [{
          id: 'barcode',
          type: 'check',
          span: true,
          label: 'Numer systemowy w formie kodu kreskowego'
        }, {
          type: 'note',
          span: true,
          icon: 'qr-code',
          tone: qr.on ? 'warn' : '',
          text: function text(f) {
            return qr.on && f.barcode ? 'Włączony jest wydruk kodu QR — kod kreskowy nie zostanie wydrukowany. Pod paragonem drukowany jest tylko jeden rodzaj kodu.' : 'Pod paragonem drukowany jest tylko jeden rodzaj kodu: kreskowy albo QR. Kod QR ma pierwszeństwo.';
          }
        }]
      }], [{
        title: 'Podgląd',
        fields: [{
          type: 'custom',
          span: true,
          render: function render(_, __, _ref4) {
            var f = _ref4.f;
            return /*#__PURE__*/React.createElement("div", {
              className: "np-rcpt foot"
            }, /*#__PURE__*/React.createElement("i", null, "\u2026 pozycje paragonu \u2026"), /*#__PURE__*/React.createElement("span", {
              className: "sum"
            }, "SUMA PLN ", /*#__PURE__*/React.createElement("b", null, "24,99")), [f.l0, f.l1, f.l2, f.l3].filter(function (x) {
              return x.trim();
            }).map(function (x, i) {
              return /*#__PURE__*/React.createElement("span", {
                key: i
              }, x);
            }), f.barcode && !qr.on && /*#__PURE__*/React.createElement("span", {
              className: "bars"
            }), qr.on && /*#__PURE__*/React.createElement("span", {
              className: "qrph"
            }, /*#__PURE__*/React.createElement(Icon, {
              name: "qr-code"
            })));
          }
        }]
      }]]
    });
  }

  // ── Kod QR ──
  var QR_VARS = [['@systemNo', 'numer systemowy paragonu', '0143'], ['@accountName', 'nazwa konta NoviCloud (identyfikator sklepu)', 'WTEST'], ['@ecrNo', 'numer kasy (identyfikator kasy)', '2']];
  var QR_OK = /^[0-9A-Z $%*+\-./:]*$/;
  var qrResolve = function qrResolve(t) {
    return QR_VARS.reduce(function (s, _ref5) {
      var _ref6 = _slicedToArray(_ref5, 3),
        v = _ref6[0],
        ex = _ref6[2];
      return s.split(v).join(ex);
    }, t || '');
  };
  function QrSvg(_ref7) {
    var text = _ref7.text;
    if (!window.qrcode || !text) return /*#__PURE__*/React.createElement("span", {
      className: "np-qr-empty"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "qr-code"
    }));
    try {
      var q = window.qrcode(0, 'M');
      q.addData(text);
      q.make();
      return /*#__PURE__*/React.createElement("span", {
        className: "np-qr-img",
        dangerouslySetInnerHTML: {
          __html: q.createSvgTag(4, 8)
        }
      });
    } catch (e) {
      return /*#__PURE__*/React.createElement("span", {
        className: "np-qr-empty"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "qr-code"
      }));
    }
  }
  function QrForm(_ref8) {
    var onClose = _ref8.onClose,
      ui = _ref8.ui;
    var _useProg7 = useProg('qr'),
      _useProg8 = _slicedToArray(_useProg7, 2),
      qr = _useProg8[0],
      setQr = _useProg8[1];
    var bad = function bad(t) {
      var rest = QR_VARS.reduce(function (s, _ref9) {
        var _ref0 = _slicedToArray(_ref9, 1),
          v = _ref0[0];
        return s.split(v).join('');
      }, t || '');
      var b = _toConsumableArray(new Set(rest.split('').filter(function (c) {
        return !QR_OK.test(c);
      })));
      return b;
    };
    return /*#__PURE__*/React.createElement(FormSheet, {
      title: "Kod QR",
      sub: "W\u0142asny kod QR drukowany pod paragonem",
      initial: qr,
      onCancel: onClose,
      validate: function validate(f) {
        var b = bad(f.text);
        return {
          text: b.length ? 'Niedozwolone znaki: ' + b.map(function (c) {
            return c === ' ' ? 'spacja' : c;
          }).join(' ') : f.on && !f.text ? 'Wpisz tekst kodu' : null
        };
      },
      onSave: function onSave(f) {
        setQr(f);
        onClose();
        ui.say(f.on ? 'Kod QR będzie drukowany pod paragonem' : 'Wydruk kodu QR wyłączony', 'ok', 'check');
      },
      schema: [[{
        fields: [{
          id: 'on',
          type: 'check',
          span: true,
          label: 'Drukuj kod QR pod paragonem',
          hint: 'Gdy włączony, kod kreskowy numeru systemowego (Stopka paragonu) nie jest drukowany.'
        }, {
          id: 'text',
          label: 'Tekst kodu',
          type: 'area',
          rows: 2,
          span: true,
          max: 120,
          count: true,
          mono: true,
          extra: '$%*+-./:@',
          hint: 'Zmienne poprzedzone znakiem @ są podmieniane przy wydruku'
        }, {
          type: 'custom',
          span: true,
          label: 'Wstaw zmienną',
          render: function render(_, __, _ref1) {
            var f = _ref1.f,
              set = _ref1.set;
            return /*#__PURE__*/React.createElement("div", {
              className: "np-qr-vars"
            }, QR_VARS.map(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
                v = _ref11[0],
                d = _ref11[1];
              return /*#__PURE__*/React.createElement("button", {
                key: v,
                onClick: function onClick() {
                  return set('text', ((f.text || '') + v).slice(0, 120));
                }
              }, /*#__PURE__*/React.createElement("b", null, v), /*#__PURE__*/React.createElement("small", null, d));
            }));
          }
        }]
      }, {
        title: 'Dopuszczalne znaki',
        fields: [{
          type: 'custom',
          span: true,
          render: function render() {
            return /*#__PURE__*/React.createElement("div", {
              className: "np-qr-chars"
            }, ['0 … 9', 'A … Z', 'spacja', '$', '%', '*', '+', '-', '.', '/', ':'].map(function (c) {
              return /*#__PURE__*/React.createElement("span", {
                key: c
              }, c);
            }), /*#__PURE__*/React.createElement("small", null, "Ma\u0142e litery s\u0105 dozwolone tylko w nazwach zmiennych. Maksymalna d\u0142ugo\u015B\u0107 kodu: 120 znak\xF3w."));
          }
        }]
      }], [{
        title: 'Podgląd wydruku',
        fields: [{
          type: 'custom',
          span: true,
          render: function render(_, __, _ref12) {
            var f = _ref12.f;
            return /*#__PURE__*/React.createElement("div", {
              className: 'np-qr-prev' + (f.on ? '' : ' off')
            }, /*#__PURE__*/React.createElement(QrSvg, {
              text: bad(f.text).length ? '' : qrResolve(f.text)
            }), /*#__PURE__*/React.createElement("code", null, qrResolve(f.text) || '—'), !f.on && /*#__PURE__*/React.createElement("small", null, "Wydruk kodu wy\u0142\u0105czony"));
          }
        }]
      }]]
    });
  }

  // ── Licznik dokumentów ──
  function CountersView(_ref13) {
    var onBack = _ref13.onBack,
      ui = _ref13.ui;
    var _useProg9 = useProg('counters'),
      _useProg0 = _slicedToArray(_useProg9, 2),
      rows = _useProg0[0],
      setRows = _useProg0[1];
    var edit = function edit(r) {
      return ui.amount({
        title: r.name,
        desc: 'Kolejny dokument będzie miał numer o 1 większy od ustalonego',
        mode: 'digits',
        maxLen: r.max ? 2 : 7,
        initial: String(r.v),
        suffix: '',
        confirmLabel: 'Zapisz',
        validate: function validate(x) {
          return r.max && +x > r.max ? "Zakres 0\u2013".concat(r.max) : null;
        },
        onConfirm: function onConfirm(x) {
          ui.close();
          setRows(rows.map(function (y) {
            return y.id === r.id ? _objectSpread(_objectSpread({}, y), {}, {
              v: +x || 0
            }) : y;
          }));
          ui.say("".concat(r.name, ": nast\u0119pny numer ").concat((+x || 0) + 1), 'ok', 'check');
        }
      });
    };
    return /*#__PURE__*/React.createElement(ProgTable, {
      title: "Licznik dokument\xF3w",
      sub: "Dotknij, aby zmieni\u0107 numeracj\u0119",
      onBack: onBack,
      rows: rows,
      onRow: edit,
      top: /*#__PURE__*/React.createElement("div", {
        className: "np-prog-info"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "list-ordered"
      }), /*#__PURE__*/React.createElement("span", null, "Pozwala na zmian\u0119 numeracji dokument\xF3w. Kolejny utworzony dokument b\u0119dzie mia\u0142 numer o 1 wi\u0119kszy od ustalonego.")),
      cols: [{
        label: 'Rodzaj dokumentu',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, r.name), r.note && /*#__PURE__*/React.createElement("small", null, r.note));
        }
      }, {
        label: 'Licznik',
        w: '120px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return r.v;
        }
      }, {
        label: 'Następny',
        w: '120px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return /*#__PURE__*/React.createElement("em", null, r.v + 1);
        }
      }]
    });
  }

  // ── Jednostki miary ──
  function UnitsView(_ref14) {
    var onBack = _ref14.onBack,
      ui = _ref14.ui;
    var _useProg1 = useProg('units'),
      _useProg10 = _slicedToArray(_useProg1, 2),
      rows = _useProg10[0],
      setRows = _useProg10[1];
    var _useState = useState('a'),
      _useState2 = _slicedToArray(_useState, 2),
      tab = _useState2[0],
      setTab = _useState2[1];
    var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      ed = _useState4[0],
      setEd = _useState4[1];
    var list = rows.filter(function (r) {
      return tab === 'a' ? r.active : !r.active;
    });
    var save = function save(f) {
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, f), {}, {
        id: uid('u')
      })]) : rows.map(function (r) {
        return r.id === f.id ? f : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Jednostka \u201E".concat(f.name, "\u201D zapisana"), 'ok', 'check');
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Jednostki miary",
      sub: cnt(list.length, 'jednostka', 'jednostki', 'jednostek'),
      onBack: onBack,
      rows: list,
      onRow: function onRow(r) {
        return setEd(r);
      },
      tabs: [['a', 'Aktywne'], ['n', 'Nieaktywne']],
      tab: tab,
      setTab: setTab,
      addLabel: "Nowa jednostka",
      onAdd: function onAdd() {
        return setEd({
          isNew: true,
          name: '',
          prec: '1',
          active: true
        });
      },
      empty: tab === 'a' ? 'Brak aktywnych jednostek' : 'Brak nieaktywnych jednostek',
      cols: [{
        label: 'Nazwa jednostki miary',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("b", null, r.name);
        }
      }, {
        label: 'Precyzja',
        w: '200px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return r.prec;
        }
      }]
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      wide: false,
      title: ed.isNew ? 'Nowa jednostka miary' : 'Jednostka miary',
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      validate: function validate(f) {
        return {
          name: rows.some(function (r) {
            return r.id !== f.id && r.name.toLowerCase() === f.name.trim().toLowerCase();
          }) ? 'Taka jednostka już istnieje' : null
        };
      },
      schema: [{
        fields: [{
          id: 'name',
          label: 'Nazwa jednostki',
          req: true,
          span: true,
          max: 6,
          hint: 'Drukowana na paragonie, np. szt, kg, l'
        }, {
          id: 'prec',
          label: 'Precyzja (najmniejsza sprzedawana ilość)',
          type: 'select',
          seg: true,
          span: true,
          options: D().PRECS
        }, {
          id: 'active',
          type: 'check',
          span: true,
          label: 'Jednostka aktywna',
          hint: 'Nieaktywnej nie można wybrać w karcie towaru'
        }]
      }]
    }));
  }

  // ── Formy płatności ──
  function PaymentsView(_ref15) {
    var onBack = _ref15.onBack,
      ui = _ref15.ui;
    var _useProg11 = useProg('payments'),
      _useProg12 = _slicedToArray(_useProg11, 2),
      rows = _useProg12[0],
      setRows = _useProg12[1];
    var _useState5 = useState('a'),
      _useState6 = _slicedToArray(_useState5, 2),
      tab = _useState6[0],
      setTab = _useState6[1];
    var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      ed = _useState8[0],
      setEd = _useState8[1];
    var _useState9 = useState(function () {
        return settings().payTiles || '8';
      }),
      _useState0 = _slicedToArray(_useState9, 2),
      tiles = _useState0[0],
      setTiles = _useState0[1];
    var list = rows.filter(function (r) {
      return tab === 'a' ? r.active : !r.active;
    });
    var nAct = rows.filter(function (r) {
      return r.active;
    }).length;
    var move = function move(r, d) {
      var i = rows.indexOf(r);
      var j = i + d;
      if (j < 0 || j >= rows.length) return;
      var nv = _toConsumableArray(rows);
      var _ref16 = [nv[j], nv[i]];
      nv[i] = _ref16[0];
      nv[j] = _ref16[1];
      setRows(nv);
    };
    var save = function save(f) {
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, f), {}, {
        id: uid('p')
      })]) : rows.map(function (r) {
        return r.id === f.id ? f : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Forma p\u0142atno\u015Bci \u201E".concat(f.name, "\u201D zapisana"), 'ok', 'check');
    };
    var seg = function seg(v) {
      setTiles(v);
      setSetting('payTiles', v);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Formy p\u0142atno\u015Bci",
      sub: "".concat(nAct, " aktywnych \xB7 na ekranie p\u0142atno\u015Bci ").concat(+tiles >= nAct ? 'wszystkie' : +tiles - 1 + ' + „Więcej”'),
      onBack: onBack,
      rows: list,
      onRow: function onRow(r) {
        return setEd(r);
      },
      tabs: [['a', 'Aktywne'], ['n', 'Nieaktywne']],
      tab: tab,
      setTab: setTab,
      addLabel: "Nowa forma",
      onAdd: function onAdd() {
        return setEd({
          isNew: true,
          name: '',
          kind: 'Inna płatność',
          reszta: false,
          icon: 'wallet',
          active: true
        });
      },
      top: /*#__PURE__*/React.createElement("div", {
        className: "np-prog-bar"
      }, /*#__PURE__*/React.createElement("span", null, "Kafelki na ekranie p\u0142atno\u015Bci"), /*#__PURE__*/React.createElement("div", {
        className: "np-seg"
      }, ['4', '8', '12'].map(function (v) {
        return /*#__PURE__*/React.createElement("button", {
          key: v,
          className: tiles === v ? 'on' : '',
          onClick: function onClick() {
            return seg(v);
          }
        }, v);
      })), /*#__PURE__*/React.createElement("small", null, "Kolejno\u015B\u0107 kafelk\xF3w = kolejno\u015B\u0107 na li\u015Bcie (strza\u0142ki).")),
      cols: [{
        label: 'Nazwa',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("span", {
            className: "np-tbl-ico"
          }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
            name: r.icon
          })), /*#__PURE__*/React.createElement("b", null, r.name.toUpperCase()));
        }
      }, {
        label: 'Rodzaj',
        w: '220px',
        get: function get(r) {
          return r.kind;
        }
      }, {
        label: 'Reszta',
        w: '90px',
        align: 'c',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(Chk, {
            on: r.reszta
          });
        }
      }, {
        label: 'Kolejność',
        w: '110px',
        align: 'c',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("span", {
            className: "np-tbl-ord",
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          }, /*#__PURE__*/React.createElement("i", {
            role: "button",
            onClick: function onClick() {
              return move(r, -1);
            },
            "aria-label": "Wy\u017Cej"
          }, /*#__PURE__*/React.createElement(Icon, {
            name: "chevron-up"
          })), /*#__PURE__*/React.createElement("i", {
            role: "button",
            onClick: function onClick() {
              return move(r, 1);
            },
            "aria-label": "Ni\u017Cej"
          }, /*#__PURE__*/React.createElement(Icon, {
            name: "chevron-down"
          })));
        }
      }]
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      wide: false,
      title: ed.isNew ? 'Nowa forma płatności' : 'Forma płatności',
      sub: ed.isNew ? null : ed.name,
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      validate: function validate(f) {
        return {
          active: !f.active && rows.filter(function (r) {
            return r.active && r.id !== f.id;
          }).length === 0 ? 'Musi zostać co najmniej jedna aktywna forma płatności' : null
        };
      },
      schema: [{
        fields: [{
          id: 'name',
          label: 'Nazwa',
          req: true,
          max: 16,
          count: true,
          span: true,
          hint: 'Na kafelku ekranu płatności i na paragonie'
        }, {
          id: 'kind',
          label: 'Rodzaj',
          type: 'select',
          span: true,
          options: D().PAY_KINDS,
          hint: 'Karta i BLIK są wysyłane do terminala płatniczego'
        }, {
          id: 'icon',
          label: 'Ikona kafelka',
          type: 'custom',
          span: true,
          render: function render(v, set) {
            return /*#__PURE__*/React.createElement("div", {
              className: "np-pf-icons"
            }, D().PAY_ICONS.map(function (ic) {
              return /*#__PURE__*/React.createElement("button", {
                key: ic,
                className: v === ic ? 'on' : '',
                onClick: function onClick() {
                  return set(ic);
                }
              }, /*#__PURE__*/React.createElement(Icon, {
                name: ic
              }));
            }));
          }
        }, {
          id: 'reszta',
          type: 'check',
          span: true,
          label: 'Wydawanie reszty',
          hint: 'Klient może zapłacić więcej niż do zapłaty — kasa pokaże resztę do wydania gotówką'
        }, {
          id: 'active',
          type: 'check',
          span: true,
          label: 'Forma aktywna',
          hint: 'Widoczna na ekranie płatności'
        }]
      }]
    }));
  }

  // ── Klienci ──
  var KSEF_ROLES = ['Brak', 'Faktor', 'Odbiorca', 'Podmiot pierwotny', 'Dodatkowy nabywca', 'Wystawca faktury', 'Dokonujący płatności', 'JST – wystawca', 'JST – odbiorca', 'Członek grupy VAT – wystawca', 'Członek grupy VAT – odbiorca'];
  var COUNTRIES = ['Polska', 'Niemcy', 'Czechy', 'Słowacja', 'Litwa', 'Ukraina', 'Inny kraj'];
  function ClientsView(_ref17) {
    var onBack = _ref17.onBack,
      ui = _ref17.ui;
    var _useProg13 = useProg('clients'),
      _useProg14 = _slicedToArray(_useProg13, 2),
      rows = _useProg14[0],
      setRows = _useProg14[1];
    var _useState1 = useState('name'),
      _useState10 = _slicedToArray(_useState1, 2),
      by = _useState10[0],
      setBy = _useState10[1];
    var _useState11 = useState(''),
      _useState12 = _slicedToArray(_useState11, 2),
      q = _useState12[0],
      setQ = _useState12[1];
    var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      osk = _useState14[0],
      setOsk = _useState14[1];
    var _useState15 = useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      ed = _useState16[0],
      setEd = _useState16[1];
    var nq = NPF.norm(q);
    var list = rows.filter(function (r) {
      return !q || (by === 'nip' ? (r.nip || '').replace(/-/g, '').startsWith(q.replace(/-/g, '')) : NPF.norm(r.name).includes(nq));
    }).sort(function (a, b) {
      return a.name.replace(/[„"”]/g, '').localeCompare(b.name.replace(/[„"”]/g, ''), 'pl');
    });
    var key = function key(k) {
      return setQ(function (c) {
        return k === 'BACK' ? c.slice(0, -1) : k === 'CLEAR' || k === 'C' ? '' : k === 'ENTER' ? c : c + k;
      });
    };
    var save = function save(f) {
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, f), {}, {
        id: uid('c')
      })]) : rows.map(function (r) {
        return r.id === f.id ? f : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Klient \u201E".concat(f.name, "\u201D zapisany"), 'ok', 'check');
    };
    var del = function del() {
      setRows(rows.filter(function (r) {
        return r.id !== ed.id;
      }));
      setEd(null);
      ui.say('Klient usunięty', 'info', 'trash-2');
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Klienci",
      sub: cnt(list.length, 'kontrahent', 'kontrahentów', 'kontrahentów'),
      onBack: onBack,
      rows: list,
      onRow: function onRow(r) {
        setOsk(false);
        setEd(r);
      },
      addLabel: "Nowy klient",
      onAdd: function onAdd() {
        setOsk(false);
        setEd({
          isNew: true,
          name: '',
          "short": '',
          nip: '',
          street: '',
          house: '',
          flat: '',
          zip: '',
          city: '',
          post: '',
          country: 'Polska',
          phone: '',
          email: '',
          account: '',
          taxStatus: '',
          taxDate: '',
          ksefRole: 'Brak',
          ksefId: '',
          disc: '0',
          kinds: {
            odbiorca: true
          }
        });
      },
      empty: q ? 'Brak klientów pasujących do wyszukiwania' : 'Brak klientów',
      top: /*#__PURE__*/React.createElement("div", {
        className: "np-prog-search"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-seg"
      }, [['name', 'Nazwa'], ['nip', 'NIP']].map(function (_ref18) {
        var _ref19 = _slicedToArray(_ref18, 2),
          k = _ref19[0],
          l = _ref19[1];
        return /*#__PURE__*/React.createElement("button", {
          key: k,
          className: by === k ? 'on' : '',
          onClick: function onClick() {
            setBy(k);
            setQ('');
          }
        }, l);
      })), /*#__PURE__*/React.createElement("button", {
        className: 'np-prog-q' + (osk ? ' focus' : ''),
        onClick: function onClick() {
          return setOsk(true);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "search"
      }), /*#__PURE__*/React.createElement("span", {
        className: q ? '' : 'ph'
      }, q || (by === 'nip' ? 'Wpisz początek NIP-u' : 'Wpisz część nazwy')), osk && /*#__PURE__*/React.createElement("i", {
        className: "np-caret"
      })), q && /*#__PURE__*/React.createElement("button", {
        className: "np-pill-btn",
        onClick: function onClick() {
          return setQ('');
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x"
      }), "Wyczy\u015B\u0107")),
      bottom: osk && (by === 'nip' ? /*#__PURE__*/React.createElement("div", {
        className: "np-prog-osk num"
      }, /*#__PURE__*/React.createElement(NumPad, {
        onKey: key,
        keys: PAD_INT,
        className: "on-gray"
      }), /*#__PURE__*/React.createElement("button", {
        className: "np-btn green",
        onClick: function onClick() {
          return setOsk(false);
        }
      }, "Gotowe")) : /*#__PURE__*/React.createElement("div", {
        className: "np-prog-osk"
      }, /*#__PURE__*/React.createElement(OSK, {
        onKey: key,
        onHide: function onHide() {
          return setOsk(false);
        },
        onEnter: function onEnter() {
          return setOsk(false);
        },
        extra: ",.-"
      }))),
      cols: [{
        label: 'Nazwa',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, r.name), /*#__PURE__*/React.createElement("small", null, [r.street && r.street + ' ' + [r.house, r.flat].filter(Boolean).join('/'), r.city].filter(Boolean).join(', ')));
        }
      }, {
        label: 'NIP',
        w: '190px',
        mono: true,
        get: function get(r) {
          return nipFmt(r.nip);
        }
      }]
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      title: ed.isNew ? 'Nowy klient' : 'Kontrahent',
      sub: ed.isNew ? 'Uzupełnij dane i zapisz' : ed.name,
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      saveLabel: ed.isNew ? 'Dodaj klienta' : 'Zapisz',
      onDelete: ed.isNew ? null : del,
      deleteLabel: "Usu\u0144 klienta",
      validate: function validate(f) {
        return {
          nip: f.nip && f.nip !== ed.nip && f.country === 'Polska' && !nipOk(f.nip.replace(/-/g, '')) ? 'Nieprawidłowy NIP (suma kontrolna)' : null,
          email: f.email && !/^\S+@\S+\.\S+$/.test(f.email) ? 'Nieprawidłowy adres e-mail' : null
        };
      },
      schema: [[{
        title: 'Dane',
        fields: [{
          id: 'name',
          label: 'Nazwa',
          req: true,
          span: true,
          max: 120
        }, {
          id: 'short',
          label: 'Nazwa skrócona',
          max: 40
        }, {
          id: 'nip',
          label: 'NIP',
          type: 'int',
          max: 10
        }]
      }, {
        title: 'Dane adresowe',
        fields: [{
          id: 'street',
          label: 'Ulica',
          span: true,
          max: 40
        }, {
          id: 'house',
          label: 'Nr domu',
          max: 8
        }, {
          id: 'flat',
          label: 'Nr lokalu',
          max: 8
        }, {
          id: 'zip',
          label: 'Kod pocztowy',
          max: 6,
          filter: function filter(x) {
            var d = x.replace(/[^0-9]/g, '').slice(0, 5);
            return d.length > 2 ? d.slice(0, 2) + '-' + d.slice(2) : d;
          }
        }, {
          id: 'city',
          label: 'Miejscowość',
          max: 30
        }, {
          id: 'post',
          label: 'Poczta',
          max: 30
        }, {
          id: 'country',
          label: 'Kraj',
          type: 'select',
          options: COUNTRIES
        }]
      }, {
        title: 'Charakter kontaktów',
        fields: [{
          id: 'kinds',
          type: 'checks',
          span: true,
          items: [['staly', 'Stały klient'], ['odbiorca', 'Odbiorca'], ['producent', 'Producent'], ['dostawca', 'Dostawca'], ['siec', 'Sklep w sieci'], ['magazyn', 'Magazyn centralny']]
        }]
      }], [{
        title: 'Kontakt',
        fields: [{
          id: 'phone',
          label: 'Telefon',
          max: 20
        }, {
          id: 'email',
          label: 'Adres e-mail',
          max: 60,
          extra: '@.-_'
        }, {
          id: 'account',
          label: 'Numer konta',
          type: 'int',
          span: true,
          max: 26,
          mono: true
        }]
      }, {
        title: 'Status podatnika VAT',
        sub: 'z Białej listy Ministerstwa Finansów',
        fields: [{
          id: 'taxStatus',
          label: 'Status podatnika',
          ro: true,
          ph: '—'
        }, {
          id: 'taxDate',
          label: 'Ostatnia aktualizacja',
          ro: true,
          ph: '—'
        }, {
          type: 'custom',
          span: true,
          render: function render(_, __, _ref20) {
            var f = _ref20.f,
              set = _ref20.set;
            return /*#__PURE__*/React.createElement("button", {
              className: "np-btn blue np-pf-btn",
              onClick: function onClick() {
                if (!nipOk((f.nip || '').replace(/-/g, ''))) {
                  ui.say('Najpierw wpisz prawidłowy NIP', 'err', 'x');
                  return;
                }
                set('taxStatus', 'Czynny');
                set('taxDate', new Date().toLocaleDateString('pl-PL'));
                ui.say('Status pobrany: podatnik VAT czynny', 'ok', 'check');
              }
            }, /*#__PURE__*/React.createElement(Icon, {
              name: "refresh-cw"
            }), "Pobierz status");
          }
        }]
      }, {
        title: 'KSeF',
        fields: [{
          id: 'ksefRole',
          label: 'Rola podmiotu trzeciego',
          type: 'select',
          span: true,
          options: KSEF_ROLES
        }, {
          id: 'ksefId',
          label: 'Identyfikator wewnętrzny z NIP',
          span: true,
          max: 20,
          when: function when(f) {
            return f.ksefRole !== 'Brak';
          }
        }]
      }, {
        title: 'Dane lojalnościowe',
        fields: [{
          id: 'disc',
          label: 'Rabat odbiorcy',
          type: 'money',
          suffix: '%',
          max: 5,
          hint: 'Naliczany automatycznie po wybraniu klienta'
        }]
      }]]
    }));
  }

  // ── Operatorzy ──
  function OperatorsView(_ref21) {
    var onBack = _ref21.onBack,
      ui = _ref21.ui;
    var _useProg15 = useProg('operators'),
      _useProg16 = _slicedToArray(_useProg15, 2),
      rows = _useProg16[0],
      setRows = _useProg16[1];
    var _useProg17 = useProg('profiles'),
      _useProg18 = _slicedToArray(_useProg17, 1),
      profiles = _useProg18[0];
    var _useState17 = useState('a'),
      _useState18 = _slicedToArray(_useState17, 2),
      tab = _useState18[0],
      setTab = _useState18[1];
    var _useState19 = useState(null),
      _useState20 = _slicedToArray(_useState19, 2),
      ed = _useState20[0],
      setEd = _useState20[1];
    var list = rows.filter(function (r) {
      return tab === 'a' ? r.active : !r.active;
    });
    var pn = function pn(id) {
      return (profiles.find(function (p) {
        return p.id === id;
      }) || {}).name || id;
    };
    var save = function save(f) {
      var out = _objectSpread({}, f);
      delete out.pass2;
      if (!out.pass) delete out.pass;
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, out), {}, {
        id: uid('o')
      })]) : rows.map(function (r) {
        return r.id === f.id ? _objectSpread(_objectSpread({}, r), out) : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Operator ".concat(f.first, " ").concat(f.last, " zapisany"), 'ok', 'check');
    };
    var nextNr = String(Math.max.apply(Math, [0].concat(_toConsumableArray(rows.map(function (r) {
      return +r.nr || 0;
    })))) + 1);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Operatorzy",
      sub: cnt(list.length, 'operator', 'operatorów', 'operatorów'),
      onBack: onBack,
      rows: list,
      onRow: function onRow(r) {
        return setEd(_objectSpread(_objectSpread({}, r), {}, {
          pass: '',
          pass2: ''
        }));
      },
      tabs: [['a', 'Aktywni'], ['n', 'Nieaktywni']],
      tab: tab,
      setTab: setTab,
      addLabel: "Nowy operator",
      onAdd: function onAdd() {
        return setEd({
          isNew: true,
          nr: nextNr,
          first: '',
          last: '',
          profile: 'kasjer',
          login: '',
          pass: '',
          pass2: '',
          card: '',
          desc: '',
          active: true
        });
      },
      cols: [{
        label: 'Nr',
        w: '64px',
        mono: true,
        get: function get(r) {
          return r.nr;
        }
      }, {
        label: 'Imię i nazwisko',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, [r.first, r.last].filter(Boolean).join(' ')), r.desc && /*#__PURE__*/React.createElement("small", null, r.desc));
        }
      }, {
        label: 'Uprawnienia',
        w: '170px',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("span", {
            className: 'np-tbl-pill p-' + r.profile
          }, pn(r.profile));
        }
      }, {
        label: 'Karta',
        w: '130px',
        mono: true,
        get: function get(r) {
          return r.card || '—';
        }
      }]
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      title: ed.isNew ? 'Nowy operator' : 'Operator',
      sub: ed.isNew ? null : "nr ".concat(ed.nr, " \xB7 ").concat(ed.first, " ").concat(ed.last),
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      saveLabel: ed.isNew ? 'Dodaj operatora' : 'Zapisz',
      validate: function validate(f) {
        return {
          nr: rows.some(function (r) {
            return r.id !== f.id && r.nr === f.nr;
          }) ? 'Numer zajęty przez innego operatora' : null,
          pass: ed.isNew && !f.pass ? 'Ustaw hasło' : null,
          pass2: f.pass !== f.pass2 ? 'Hasła różnią się' : null,
          card: f.card && rows.some(function (r) {
            return r.id !== f.id && r.card === f.card;
          }) ? 'Karta przypisana innemu operatorowi' : null
        };
      },
      schema: [[{
        title: 'Dane operatora',
        fields: [{
          id: 'nr',
          label: 'Numer',
          type: 'int',
          req: true,
          max: 3
        }, {
          id: 'profile',
          label: 'Profil uprawnień',
          type: 'select',
          options: profiles.map(function (p) {
            return [p.id, p.name];
          })
        }, {
          id: 'first',
          label: 'Imię',
          max: 20
        }, {
          id: 'last',
          label: 'Nazwisko',
          req: true,
          max: 30
        }, {
          id: 'desc',
          label: 'Opis',
          span: true,
          max: 40
        }, {
          id: 'active',
          type: 'check',
          span: true,
          label: 'Operator aktywny',
          hint: 'Nieaktywny nie może się zalogować'
        }]
      }], [{
        title: 'Logowanie',
        fields: [{
          id: 'login',
          label: 'Login',
          req: true,
          span: true,
          max: 30
        }, {
          id: 'pass',
          label: 'Hasło',
          pw: true,
          max: 20,
          ph: ed.isNew ? 'Hasło' : '•••• (bez zmian)',
          hint: 'Same cyfry = logowanie PIN-em'
        }, {
          id: 'pass2',
          label: 'Powtórz hasło',
          pw: true,
          max: 20,
          ph: 'Powtórz hasło'
        }, {
          id: 'card',
          label: 'Kod karty identyfikacyjnej',
          type: 'int',
          span: true,
          max: 13,
          mono: true,
          after: function after(v, set) {
            return /*#__PURE__*/React.createElement("button", {
              className: "np-pe-gen np-pf-scan",
              onClick: function onClick() {
                return set(String(10010000 + Math.floor(Math.random() * 9000)));
              },
              "aria-label": "Przy\u0142\xF3\u017C kart\u0119"
            }, /*#__PURE__*/React.createElement(Icon, {
              name: "scan-barcode"
            }));
          },
          hint: 'Przyciskiem obok — odczyt z czytnika kart'
        }]
      }]]
    }));
  }

  // ── Profile uprawnień ──
  function PermsEditor(_ref22) {
    var perms = _ref22.perms,
      set = _ref22.set;
    var _D = D(),
      PERMS = _D.PERMS,
      PERM_VALS = _D.PERM_VALS;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-perms"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-perms-all"
    }, /*#__PURE__*/React.createElement("span", null, "Ustaw wszystkie na:"), PERM_VALS.map(function (v) {
      return /*#__PURE__*/React.createElement("button", {
        key: v,
        className: 'pv-' + PERM_VALS.indexOf(v),
        onClick: function onClick() {
          return set(Object.fromEntries(PERMS.map(function (p) {
            return [p, v];
          })));
        }
      }, v);
    })), PERMS.map(function (p) {
      return /*#__PURE__*/React.createElement("div", {
        key: p,
        className: "np-perm"
      }, /*#__PURE__*/React.createElement("b", null, p), /*#__PURE__*/React.createElement("div", {
        className: "np-seg"
      }, PERM_VALS.map(function (v, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: v,
          className: (perms[p] || 'Niedostępne') === v ? 'on pv-' + i : '',
          onClick: function onClick() {
            return set(_objectSpread(_objectSpread({}, perms), {}, _defineProperty({}, p, v)));
          }
        }, v);
      })));
    }));
  }
  function ProfilesView(_ref23) {
    var onBack = _ref23.onBack,
      ui = _ref23.ui;
    var _useProg19 = useProg('profiles'),
      _useProg20 = _slicedToArray(_useProg19, 2),
      rows = _useProg20[0],
      setRows = _useProg20[1];
    var _useProg21 = useProg('operators'),
      _useProg22 = _slicedToArray(_useProg21, 1),
      ops = _useProg22[0];
    var _useState21 = useState(null),
      _useState22 = _slicedToArray(_useState21, 2),
      ed = _useState22[0],
      setEd = _useState22[1];
    var sum = function sum(r) {
      var c = {
        Dostępne: 0,
        Niedostępne: 0,
        Autoryzacja: 0
      };
      D().PERMS.forEach(function (p) {
        c[r.perms[p] || 'Niedostępne']++;
      });
      return c;
    };
    var save = function save(f) {
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, f), {}, {
        id: uid('pr')
      })]) : rows.map(function (r) {
        return r.id === f.id ? f : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Profil \u201E".concat(f.name, "\u201D zapisany"), 'ok', 'check');
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Profile uprawnie\u0144",
      sub: "Dotknij profil, aby ustawi\u0107 uprawnienia",
      onBack: onBack,
      rows: rows,
      onRow: function onRow(r) {
        return setEd(r);
      },
      addLabel: "Nowy profil",
      onAdd: function onAdd() {
        return setEd({
          isNew: true,
          name: '',
          perms: _objectSpread({}, rows[0].perms)
        });
      },
      cols: [{
        label: 'Typ',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("b", null, r.name);
        }
      }, {
        label: 'Operatorów',
        w: '120px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return ops.filter(function (o) {
            return o.profile === r.id && o.active;
          }).length;
        }
      }, {
        label: 'Uprawnienia',
        w: '400px',
        get: function get(r) {
          var c = sum(r);
          return /*#__PURE__*/React.createElement("span", {
            className: "np-perm-sum"
          }, /*#__PURE__*/React.createElement("i", {
            className: "pv-0"
          }, c.Dostępne), "dost\u0119pne", /*#__PURE__*/React.createElement("i", {
            className: "pv-2"
          }, c.Autoryzacja), "autoryzacja", /*#__PURE__*/React.createElement("i", {
            className: "pv-1"
          }, c.Niedostępne), "niedost\u0119pne");
        }
      }]
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      title: ed.isNew ? 'Nowy profil operatora' : "Profil operatora [".concat(ed.name, "]"),
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      schema: [{
        one: true,
        fields: [{
          id: 'name',
          label: 'Nazwa profilu',
          req: true,
          span: true,
          max: 20,
          ro: !ed.isNew && ['kasjer', 'nadzorca', 'manager', 'serwis'].includes(ed.id)
        }, {
          type: 'note',
          span: true,
          icon: 'info',
          text: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Dost\u0119pne"), " \u2013 operator mo\u017Ce wykona\u0107 operacj\u0119. ", /*#__PURE__*/React.createElement("b", null, "Niedost\u0119pne"), " \u2013 operator nie wykona operacji. ", /*#__PURE__*/React.createElement("b", null, "Autoryzacja"), " \u2013 operacja wymaga zatwierdzenia przez operatora z uprawnieniem.")
        }, {
          id: 'perms',
          type: 'custom',
          span: true,
          render: function render(v, set) {
            return /*#__PURE__*/React.createElement(PermsEditor, {
              perms: v,
              set: set
            });
          }
        }]
      }]
    }));
  }

  // ── Formaty kart rabatowych + tabela rabatów ──
  // Kod karty: przedrostek + 4 pozycje (każda: brak / dane) + cyfra kontrolna. Pozycje mogą zostać puste.
  var EXP = [['RR', 'rok (RR)'], ['RRMM', 'rok, miesiąc (RRMM)'], ['MMRR', 'miesiąc, rok (MMRR)'], ['RRMMDD', 'pełna data (RRMMDD)']];
  var EXPF = {
    RR: 'yy',
    RRMM: 'yymm',
    MMRR: 'mmyy',
    RRMMDD: 'yymmdd'
  };
  var NUMS = function NUMS(n) {
    return Array.from({
      length: n
    }, function (_, i) {
      return [String(i + 1), "".concat(i + 1, " ").concat(i ? i < 4 ? 'cyfry' : 'cyfr' : 'cyfra')];
    });
  };
  var SEGS = {
    exp: ['Data ważności', 'd'],
    client: ['Kod klienta', 'k'],
    level: ['Poziom rabatu', 'r'],
    other: ['Inna wartość', 'o']
  };
  var NSLOT = 4;
  // zgodność ze starym zapisem (order + exp/client/other 'brak' + level)
  var slotsOf = function slotsOf(f) {
    if (Array.isArray(f.slots)) return [].concat(_toConsumableArray(f.slots), [null, null, null, null]).slice(0, NSLOT);
    var on = function on(k) {
      return k === 'level' ? !!f.level : f[k] && f[k] !== 'brak';
    };
    var o = (f.order || ['exp', 'client', 'level', 'other']).filter(function (k) {
      return SEGS[k] && on(k);
    });
    return [].concat(_toConsumableArray(o), [null, null, null, null]).slice(0, NSLOT);
  };
  var normCard = function normCard(f) {
    return _objectSpread(_objectSpread({}, f), {}, {
      slots: slotsOf(f),
      exp: EXPF[f.exp] ? f.exp : 'RRMMDD',
      client: +f.client > 0 ? f.client : '6',
      other: +f.other > 0 ? f.other : '4'
    });
  };
  var segStr = function segStr(f, k) {
    return k === 'exp' ? EXPF[f.exp] || 'yymmdd' : k === 'client' ? 'k'.repeat(+f.client || 6) : k === 'level' ? 'r' : k === 'other' ? '?'.repeat(+f.other || 4) : '';
  };
  var cardFmt = function cardFmt(f0) {
    var f = normCard(f0);
    return (f.prefix || '') + f.slots.map(function (k) {
      return segStr(f, k);
    }).join('') + (f.check ? 'x' : '');
  };
  // formularz trzyma pozycje jako s0..s3
  var toForm = function toForm(r) {
    var f = normCard(r);
    var o = _objectSpread({}, f);
    f.slots.forEach(function (k, i) {
      o['s' + i] = k || 'none';
    });
    return o;
  };
  var fromForm = function fromForm(f) {
    var o = _objectSpread(_objectSpread({}, f), {}, {
      slots: Array.from({
        length: NSLOT
      }, function (_, i) {
        return f['s' + i] && f['s' + i] !== 'none' ? f['s' + i] : null;
      })
    });
    for (var i = 0; i < NSLOT; i++) delete o['s' + i];
    delete o.order;
    delete o.level;
    delete o.isNew;
    return o;
  };
  var used = function used(f, k) {
    return Array.from({
      length: NSLOT
    }, function (_, i) {
      return f['s' + i];
    }).includes(k);
  };
  var slotOpts = function slotOpts(i) {
    return function (f) {
      return [['none', 'Brak (pozycja pusta)']].concat(Object.keys(SEGS).filter(function (k) {
        return f['s' + i] === k || !used(f, k);
      }).map(function (k) {
        return [k, SEGS[k][0]];
      }));
    };
  };
  function CardsView(_ref24) {
    var onBack = _ref24.onBack,
      ui = _ref24.ui;
    var _useProg23 = useProg('cardFormats'),
      _useProg24 = _slicedToArray(_useProg23, 2),
      rows = _useProg24[0],
      setRows = _useProg24[1];
    var _useProg25 = useProg('discTable'),
      _useProg26 = _slicedToArray(_useProg25, 2),
      tbl = _useProg26[0],
      setTbl = _useProg26[1];
    var _useProg27 = useProg('discDefault'),
      _useProg28 = _slicedToArray(_useProg27, 2),
      def = _useProg28[0],
      setDef = _useProg28[1];
    var _useState23 = useState(null),
      _useState24 = _slicedToArray(_useState23, 2),
      ed = _useState24[0],
      setEd = _useState24[1];
    var save = function save(f0) {
      var f = fromForm(f0);
      var nv = ed.isNew ? [].concat(_toConsumableArray(rows), [_objectSpread(_objectSpread({}, f), {}, {
        id: uid('k')
      })]) : rows.map(function (r) {
        return r.id === f.id ? f : r;
      });
      setRows(nv);
      setEd(null);
      ui.say("Format \u201E".concat(f.name, "\u201D zapisany"), 'ok', 'check');
    };
    var editDisc = function editDisc(i) {
      return ui.amount({
        title: "Rabat ID ".concat(i),
        desc: 'Poziom rabatu odczytany z karty (znak r w formacie)',
        mode: 'money',
        initial: tbl[i] ? String(tbl[i]).replace('.', ',') : '',
        suffix: '%',
        confirmLabel: 'Zapisz',
        validate: function validate(x) {
          return NPF.parseNum(x) >= 100 ? 'Rabat musi być mniejszy niż 100%' : null;
        },
        onConfirm: function onConfirm(x) {
          ui.close();
          setTbl(tbl.map(function (v, j) {
            return j === i ? NPF.parseNum(x) : v;
          }));
        }
      });
    };
    var pickDef = function pickDef() {
      return ui.dialog({
        tone: 'question',
        title: 'Rabat domyślny',
        desc: 'Stosowany, gdy format karty nie zawiera poziomu rabatu',
        className: 'np-choose',
        children: /*#__PURE__*/React.createElement("div", {
          className: "np-choices"
        }, tbl.map(function (v, i) {
          return /*#__PURE__*/React.createElement("button", {
            key: i,
            className: def.id === i ? 'on' : '',
            onClick: function onClick() {
              setDef(_objectSpread(_objectSpread({}, def), {}, {
                id: i
              }));
              ui.close();
            }
          }, /*#__PURE__*/React.createElement("span", null, "ID ", i, " \xB7 ", NPF.money(v).replace(',00', ''), "%"), def.id === i && /*#__PURE__*/React.createElement(Icon, {
            name: "check"
          }));
        })),
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: ui.close
        }]
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Formaty kart rabatowych",
      sub: "Formaty kod\xF3w kart i tabela rabat\xF3w",
      onBack: onBack,
      rows: rows,
      onRow: function onRow(r) {
        return setEd(toForm(r));
      },
      addLabel: "Dodaj format kodu",
      onAdd: function onAdd() {
        return setEd(_objectSpread(_objectSpread({}, toForm({
          name: '',
          prefix: '',
          slots: [null, null, null, null],
          check: false,
          auto: true
        })), {}, {
          isNew: true
        }));
      },
      cols: [{
        label: 'Format',
        w: '260px',
        mono: true,
        get: function get(r) {
          return cardFmt(r);
        }
      }, {
        label: 'Nazwa',
        get: function get(r) {
          return /*#__PURE__*/React.createElement("b", null, r.name);
        }
      }, {
        label: 'Auto',
        w: '80px',
        align: 'c',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(Chk, {
            on: r.auto
          });
        }
      }],
      bottom: /*#__PURE__*/React.createElement("div", {
        className: "np-disc"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-disc-h"
      }, /*#__PURE__*/React.createElement("b", null, "Tabela rabat\xF3w"), /*#__PURE__*/React.createElement("small", null, "Dotknij poziom, aby zmieni\u0107 warto\u015B\u0107"), /*#__PURE__*/React.createElement("div", {
        className: "np-disc-def"
      }, /*#__PURE__*/React.createElement("button", {
        className: 'np-check' + (def.on ? ' on' : ''),
        onClick: function onClick() {
          return setDef(_objectSpread(_objectSpread({}, def), {}, {
            on: !def.on
          }));
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), "Rabat domy\u015Blny"), /*#__PURE__*/React.createElement("button", {
        className: "np-set-val",
        disabled: !def.on,
        onClick: pickDef
      }, "ID ", def.id, " \xB7 ", NPF.money(tbl[def.id] || 0).replace(',00', ''), "%", /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "np-disc-grid"
      }, tbl.map(function (v, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: i,
          className: def.on && def.id === i ? 'def' : '',
          onClick: function onClick() {
            return editDisc(i);
          }
        }, /*#__PURE__*/React.createElement("small", null, "ID ", i), /*#__PURE__*/React.createElement("b", null, NPF.money(v), "%"));
      })))
    }), ed && /*#__PURE__*/React.createElement(FormSheet, {
      title: ed.isNew ? 'Nowy format kodu karty' : 'Edycja formatu kodu karty',
      sub: ed.isNew ? null : ed.name,
      initial: ed,
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      onDelete: ed.isNew ? null : function () {
        setRows(rows.filter(function (r) {
          return r.id !== ed.id;
        }));
        setEd(null);
        ui.say('Format usunięty', 'info', 'trash-2');
      },
      deleteLabel: "Usu\u0144 format",
      validate: function validate(f) {
        var c = cardFmt(fromForm(f));
        return {
          prefix: c.length > 20 ? 'Kod dłuższy niż 20 znaków' : !c.replace(/x$/, '') ? 'Wpisz przedrostek albo przypisz dane do co najmniej jednej pozycji' : null
        };
      },
      schema: [[{
        title: 'Format',
        fields: [{
          id: 'name',
          label: 'Nazwa',
          req: true,
          span: true,
          max: 30
        }, {
          id: 'prefix',
          label: 'Przedrostek',
          type: 'int',
          span: true,
          max: 6,
          mono: true,
          hint: 'Stałe cyfry na początku kodu karty'
        }, {
          id: 'check',
          type: 'check',
          span: true,
          label: 'Cyfra kontrolna'
        }, {
          id: 'auto',
          type: 'check',
          span: true,
          label: 'Automatyczne rozpoznawanie kart rabatowych',
          hint: 'Zeskanowana karta jest rozpoznawana bez wybierania funkcji'
        }]
      }], [{
        title: 'Pozycje w kodzie',
        sub: 'po przedrostku, w tej kolejności · pozycja może zostać pusta',
        fields: [].concat(_toConsumableArray(Array.from({
          length: NSLOT
        }, function (_, i) {
          return {
            id: 's' + i,
            label: 'Pozycja ' + (i + 1),
            type: 'select',
            options: slotOpts(i)
          };
        })), [{
          id: 'exp',
          label: 'Format daty ważności',
          type: 'select',
          options: EXP,
          when: function when(f) {
            return used(f, 'exp');
          }
        }, {
          id: 'client',
          label: 'Długość kodu klienta',
          type: 'select',
          options: NUMS(10),
          when: function when(f) {
            return used(f, 'client');
          }
        }, {
          id: 'other',
          label: 'Długość innej wartości',
          type: 'select',
          options: NUMS(8),
          when: function when(f) {
            return used(f, 'other');
          }
        }, {
          type: 'note',
          span: true,
          icon: 'info',
          when: function when(f) {
            return used(f, 'level');
          },
          text: 'Poziom rabatu = 1 cyfra, ID z tabeli rabatów.'
        }])
      }, {
        title: 'Wynikowy format kodu',
        fields: [{
          type: 'custom',
          span: true,
          render: function render(_, __, _ref25) {
            var f = _ref25.f;
            var s = cardFmt(fromForm(f));
            var cls = function cls(c) {
              return /\d/.test(c) ? 'p' : 'ymd'.includes(c) ? 'd' : c === 'k' ? 'k' : c === 'r' ? 'r' : c === '?' ? 'o' : 'x';
            };
            return /*#__PURE__*/React.createElement("div", {
              className: "np-cardfmt"
            }, /*#__PURE__*/React.createElement("div", {
              className: "np-cardfmt-code"
            }, s ? s.split('').map(function (c, i) {
              return /*#__PURE__*/React.createElement("span", {
                key: i,
                className: 'c-' + cls(c)
              }, c);
            }) : /*#__PURE__*/React.createElement("em", null, "\u2014")), /*#__PURE__*/React.createElement("small", null, s.length, " znak\xF3w"), /*#__PURE__*/React.createElement("div", {
              className: "np-cardfmt-leg"
            }, [['p', 'cyfry przedrostka'], ['k', 'znaki kodu klienta'], ['d', 'y, m, d – znaki daty ważności'], ['r', 'poziom rabatu'], ['o', '? – znaki innej wartości'], ['x', 'cyfra kontrolna']].map(function (_ref26) {
              var _ref27 = _slicedToArray(_ref26, 2),
                k = _ref27[0],
                l = _ref27[1];
              return /*#__PURE__*/React.createElement("span", {
                key: k
              }, /*#__PURE__*/React.createElement("i", {
                className: 'c-' + k
              }), l);
            })));
          }
        }]
      }]]
    }));
  }
  var PROG_FORMS = {
    shop: ShopForm,
    footer: FooterForm,
    qr: QrForm
  };
  var PROG_VIEWS = {
    counters: CountersView,
    units: UnitsView,
    payments: PaymentsView,
    clients: ClientsView,
    operators: OperatorsView,
    profiles: ProfilesView,
    cards: CardsView
  };
  Object.assign(window, {
    PROG_FORMS: PROG_FORMS,
    PROG_VIEWS: PROG_VIEWS
  });
})();