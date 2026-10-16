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
/* KASA NEXT PRO — Raporty: miesięczny, okresowy, kasjerskie (zmiany, stan kasy), sprzedaży, opakowań, paragonów, faktur, pamięć chroniona */
(function () {
  var _React = React,
    useState = _React.useState,
    useMemo = _React.useMemo;
  var M = function M(n) {
    return NPF.money(n);
  };
  var R = function R() {
    return NP_REP;
  };
  var MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  var MSHORT = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  var todayIso = function todayIso() {
    return R().iso(new Date());
  };
  var pl = function pl(n, a, b, c) {
    return n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? b : c;
  };
  var fname = function fname(base) {
    return base.toLowerCase().replace(/ /g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l') + '_' + todayIso() + '.pdf';
  };

  // ── wydruk / PDF / e-mail ──
  var printIt = function printIt(ui, name) {
    var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return ui.progressThen("Drukowanie: ".concat(name.toLowerCase(), "\u2026"), 'Nie odrywaj wydruku do końca', 1500, {
      title: "".concat(name, " wydrukowany"),
      rows: rows
    });
  };
  var pdfIt = function pdfIt(ui, name) {
    return ui.progressThen('Generowanie pliku PDF…', name, 1200, {
      title: 'Zapisano plik PDF',
      rows: [['Plik', fname(name)], ['Miejsce', 'Administracja › Przeglądaj PDF-y']]
    });
  };
  function EmailSheet(_ref) {
    var name = _ref.name,
      ui = _ref.ui,
      onClose = _ref.onClose;
    var last = '';
    try {
      last = localStorage.getItem('nextpro.repMail') || '';
    } catch (e) {}
    return /*#__PURE__*/React.createElement(FormSheet, {
      wide: false,
      title: "Wy\u015Blij raport e-mailem",
      sub: name,
      initial: {
        to: last,
        note: ''
      },
      onCancel: onClose,
      saveLabel: "Wy\u015Blij",
      validate: function validate(f) {
        return {
          to: !/^\S+@\S+\.\S+$/.test(f.to.trim()) ? 'Wpisz prawidłowy adres e-mail' : null
        };
      },
      onSave: function onSave(f) {
        try {
          localStorage.setItem('nextpro.repMail', f.to.trim());
        } catch (e) {}
        onClose();
        ui.progressThen('Wysyłanie e-maila…', f.to.trim(), 1400, {
          title: 'Raport wysłany',
          rows: [['Do', f.to.trim()], ['Załącznik', fname(name)]]
        });
      },
      schema: [{
        one: true,
        fields: [{
          id: 'to',
          label: 'Adres e-mail',
          req: true,
          span: true,
          max: 60,
          extra: '@.-_'
        }, {
          id: 'note',
          label: 'Wiadomość (opcjonalnie)',
          type: 'area',
          rows: 2,
          span: true,
          max: 200
        }, {
          type: 'note',
          span: true,
          icon: 'file-text',
          text: 'Raport zostanie dołączony jako plik PDF.'
        }]
      }]
    });
  }
  function RepFoot(_ref2) {
    var tot = _ref2.tot,
      acts = _ref2.acts;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rp-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-tot"
    }, tot.map(function (_ref3, i) {
      var _ref4 = _slicedToArray(_ref3, 2),
        l = _ref4[0],
        v = _ref4[1];
      return /*#__PURE__*/React.createElement("span", {
        key: i
      }, /*#__PURE__*/React.createElement("small", null, l), /*#__PURE__*/React.createElement("b", null, v));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-acts"
    }, acts.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 4),
        l = _ref6[0],
        ic = _ref6[1],
        fn = _ref6[2],
        tone = _ref6[3];
      return /*#__PURE__*/React.createElement("button", {
        key: l,
        className: 'np-btn' + (tone ? ' ' + tone : ''),
        onClick: fn
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic
      }), l);
    })));
  }

  // ── kalendarz ──
  function DateSheet(_ref7) {
    var title = _ref7.title,
      value = _ref7.value,
      min = _ref7.min,
      max = _ref7.max,
      onPick = _ref7.onPick,
      onClose = _ref7.onClose;
    var v = R().fromIso(value);
    var _useState = useState([v.getFullYear(), v.getMonth()]),
      _useState2 = _slicedToArray(_useState, 2),
      ym = _useState2[0],
      setYm = _useState2[1];
    useKeys(function (k) {
      if (k === 'ESC') onClose();
      return true;
    }, 60);
    var off = (new Date(ym[0], ym[1], 1).getDay() + 6) % 7;
    var days = new Date(ym[0], ym[1] + 1, 0).getDate();
    var cells = Array(off).fill(0).concat(Array.from({
      length: days
    }, function (_, i) {
      return i + 1;
    }));
    var mv = function mv(d) {
      var m = ym[1] + d,
        y = ym[0];
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      setYm([y, m]);
    };
    var isoOf = function isoOf(d) {
      return R().iso(new Date(ym[0], ym[1], d));
    };
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-date",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-date-h"
    }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-date-nav"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return mv(-12);
      },
      "aria-label": "Rok wcze\u015Bniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return mv(-1);
      },
      "aria-label": "Miesi\u0105c wcze\u015Bniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("b", null, MONTHS[ym[1]], " ", ym[0]), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return mv(1);
      },
      "aria-label": "Miesi\u0105c p\xF3\u017Aniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return mv(12);
      },
      "aria-label": "Rok p\xF3\u017Aniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-cal"
    }, ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map(function (d) {
      return /*#__PURE__*/React.createElement("span", {
        key: d,
        className: "wd"
      }, d);
    }), cells.map(function (d, i) {
      if (!d) return /*#__PURE__*/React.createElement("span", {
        key: 'e' + i
      });
      var s = isoOf(d);
      var dis = min && s < min || max && s > max;
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        disabled: dis,
        className: (s === value ? 'on' : '') + (s === todayIso() ? ' today' : ''),
        onClick: function onClick() {
          return onPick(s);
        }
      }, d);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-date-f"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: max && todayIso() > max || min && todayIso() < min,
      onClick: function onClick() {
        return onPick(todayIso());
      }
    }, "Dzi\u015B"))));
  }
  function DateBtn(_ref8) {
    var label = _ref8.label,
      value = _ref8.value,
      onClick = _ref8.onClick;
    var d = R().fromIso(value);
    return /*#__PURE__*/React.createElement("button", {
      className: "np-rp-dbtn",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("small", null, label), /*#__PURE__*/React.createElement("b", null, d.getDate(), " ", MSHORT[d.getMonth()], " ", d.getFullYear()), /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-days"
    }));
  }
  function PeriodBar(_ref9) {
    var value = _ref9.value,
      onChange = _ref9.onChange,
      children = _ref9.children;
    var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      pick = _useState4[0],
      setPick = _useState4[1];
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rp-bar"
    }, /*#__PURE__*/React.createElement(DateBtn, {
      label: "Od",
      value: value.from,
      onClick: function onClick() {
        return setPick('from');
      }
    }), /*#__PURE__*/React.createElement(DateBtn, {
      label: "Do",
      value: value.to,
      onClick: function onClick() {
        return setPick('to');
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-rp-pre"
    }, R().PRESETS.map(function (_ref0) {
      var _ref1 = _slicedToArray(_ref0, 2),
        k = _ref1[0],
        l = _ref1[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: value.preset === k ? 'on' : '',
        onClick: function onClick() {
          return onChange(R().preset(k));
        }
      }, l);
    })), children, pick && /*#__PURE__*/React.createElement(DateSheet, {
      title: pick === 'from' ? 'Data początkowa' : 'Data końcowa',
      value: value[pick],
      min: pick === 'to' ? value.from : null,
      max: pick === 'from' ? value.to : todayIso(),
      onPick: function onPick(d) {
        onChange(_objectSpread(_objectSpread({}, value), {}, _defineProperty(_defineProperty({}, pick, d), "preset", null)));
        setPick(null);
      },
      onClose: function onClose() {
        return setPick(null);
      }
    }));
  }
  var usePeriod = function usePeriod(key) {
    var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'week';
    return useStored('rp.' + key, R().preset(def));
  };
  var choose = function choose(ui, title, list, cur, onPick) {
    return ui.dialog({
      tone: 'question',
      title: title,
      className: 'np-choose',
      children: /*#__PURE__*/React.createElement("div", {
        className: "np-choices np-rp-choices"
      }, list.map(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          v = _ref11[0],
          l = _ref11[1];
        return /*#__PURE__*/React.createElement("button", {
          key: String(v),
          className: cur === v ? 'on' : '',
          onClick: function onClick() {
            ui.close();
            onPick(v);
          }
        }, /*#__PURE__*/React.createElement("span", null, l), cur === v && /*#__PURE__*/React.createElement(Icon, {
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
  var cashierList = function cashierList() {
    return [[null, 'Wszyscy kasjerzy']].concat(NP_DATA.CASHIERS.map(function (c) {
      return [c.id, c.name];
    }));
  };

  // ── Raport miesięczny / okresowy (arkusze nad Menu) ──
  function FiscSeg(_ref12) {
    var v = _ref12.v,
      set = _ref12.set;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-rp-fisc"
    }, [['f', 'Fiskalny — pełny'], ['n', 'Niefiskalny — podsumowanie']].map(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
        k = _ref14[0],
        l = _ref14[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: v === k ? 'on' : '',
        onClick: function onClick() {
          return set(k);
        }
      }, l);
    }));
  }
  function MonthReport(_ref15) {
    var onClose = _ref15.onClose,
      ui = _ref15.ui;
    var now = new Date();
    var _useState5 = useState(now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()),
      _useState6 = _slicedToArray(_useState5, 2),
      y = _useState6[0],
      setY = _useState6[1];
    var _useState7 = useState(now.getMonth() === 0 ? 11 : now.getMonth() - 1),
      _useState8 = _slicedToArray(_useState7, 2),
      m = _useState8[0],
      setM = _useState8[1];
    var _useState9 = useState('f'),
      _useState0 = _slicedToArray(_useState9, 2),
      fisc = _useState0[0],
      setFisc = _useState0[1];
    useKeys(function (k) {
      if (k === 'ESC') onClose();
      if (k === 'OK') go();
      return true;
    }, 40);
    var future = function future(mm) {
      return y > now.getFullYear() || y === now.getFullYear() && mm >= now.getMonth();
    };
    var go = function go() {
      if (future(m)) return;
      onClose();
      printIt(ui, fisc === 'f' ? 'Raport fiskalny miesięczny' : 'Podsumowanie miesięczne', [['Miesiąc', "".concat(MONTHS[m], " ").concat(y)], ['Rodzaj', fisc === 'f' ? 'fiskalny — pełny' : 'niefiskalny — podsumowanie']]);
    };
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-sheet",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-sheet-h"
    }, /*#__PURE__*/React.createElement("b", null, "Raport fiskalny miesi\u0119czny"), /*#__PURE__*/React.createElement("small", null, "Wybierz miesi\u0105c")), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-year"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setY(y - 1);
      },
      "aria-label": "Rok wcze\u015Bniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("b", null, y), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setY(y + 1);
      },
      disabled: y >= now.getFullYear(),
      "aria-label": "Rok p\xF3\u017Aniej"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-months"
    }, MONTHS.map(function (n, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        disabled: future(i),
        className: m === i ? 'on' : '',
        onClick: function onClick() {
          return setM(i);
        }
      }, n);
    })), /*#__PURE__*/React.createElement(FiscSeg, {
      v: fisc,
      set: setFisc
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-sheet-f"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      disabled: future(m),
      onClick: go
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj"))));
  }
  function PeriodReport(_ref16) {
    var onClose = _ref16.onClose,
      ui = _ref16.ui;
    var reps = R().get().reports;
    var _useState1 = useState('d'),
      _useState10 = _slicedToArray(_useState1, 2),
      by = _useState10[0],
      setBy = _useState10[1];
    var _useState11 = useState(function () {
        return R().preset('month');
      }),
      _useState12 = _slicedToArray(_useState11, 2),
      p = _useState12[0],
      setP = _useState12[1];
    var _useState13 = useState(function () {
        return {
          a: Math.max(1, reps.length - 6),
          b: reps.length
        };
      }),
      _useState14 = _slicedToArray(_useState13, 2),
      nr = _useState14[0],
      setNr = _useState14[1];
    var _useState15 = useState('f'),
      _useState16 = _slicedToArray(_useState15, 2),
      fisc = _useState16[0],
      setFisc = _useState16[1];
    var _useState17 = useState(null),
      _useState18 = _slicedToArray(_useState17, 2),
      pick = _useState18[0],
      setPick = _useState18[1];
    useKeys(function (k) {
      if (pick) return false;
      if (k === 'ESC') onClose();
      return true;
    }, 40);
    var numEdit = function numEdit(k) {
      return ui.amount({
        title: k === 'a' ? 'Od raportu nr' : 'Do raportu nr',
        mode: 'digits',
        maxLen: 5,
        initial: String(nr[k]),
        suffix: '',
        confirmLabel: 'Zapisz',
        validate: function validate(x) {
          return +x < 1 || +x > reps.length ? "Zakres 1\u2013".concat(reps.length) : k === 'a' && +x > nr.b ? 'Większy niż numer końcowy' : k === 'b' && +x < nr.a ? 'Mniejszy niż numer początkowy' : null;
        },
        onConfirm: function onConfirm(x) {
          ui.close();
          setNr(_objectSpread(_objectSpread({}, nr), {}, _defineProperty({}, k, +x)));
        }
      });
    };
    var go = function go() {
      onClose();
      printIt(ui, fisc === 'f' ? 'Raport fiskalny okresowy' : 'Podsumowanie okresowe', [by === 'd' ? ['Okres', "".concat(R().fmtD(R().fromIso(p.from)), " \u2013 ").concat(R().fmtD(R().fromIso(p.to)))] : ['Raporty dobowe', "nr ".concat(nr.a, " \u2013 ").concat(nr.b)], ['Rodzaj', fisc === 'f' ? 'fiskalny — pełny' : 'niefiskalny — podsumowanie']]);
    };
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-sheet",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-sheet-h"
    }, /*#__PURE__*/React.createElement("b", null, "Raport okresowy"), /*#__PURE__*/React.createElement("small", null, "Zakres raport\xF3w dobowych")), /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, [['d', 'Według dat'], ['n', 'Według numerów']].map(function (_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
        k = _ref18[0],
        l = _ref18[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: by === k ? 'on' : '',
        onClick: function onClick() {
          return setBy(k);
        }
      }, l);
    })), by === 'd' ? /*#__PURE__*/React.createElement("div", {
      className: "np-rp-range"
    }, /*#__PURE__*/React.createElement(DateBtn, {
      label: "Data pocz\u0105tkowa",
      value: p.from,
      onClick: function onClick() {
        return setPick('from');
      }
    }), /*#__PURE__*/React.createElement(DateBtn, {
      label: "Data ko\u0144cowa",
      value: p.to,
      onClick: function onClick() {
        return setPick('to');
      }
    })) : /*#__PURE__*/React.createElement("div", {
      className: "np-rp-range"
    }, ['a', 'b'].map(function (k) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: "np-rp-dbtn",
        onClick: function onClick() {
          return numEdit(k);
        }
      }, /*#__PURE__*/React.createElement("small", null, k === 'a' ? 'Od raportu' : 'Do raportu'), /*#__PURE__*/React.createElement("b", null, "nr ", nr[k]), /*#__PURE__*/React.createElement(Icon, {
        name: "pencil"
      }));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-hint"
    }, by === 'd' ? "".concat(reps.filter(function (r) {
      return R().inRange(r.t, p);
    }).length, " raport\xF3w dobowych w okresie") : "".concat(nr.b - nr.a + 1, " raport\xF3w dobowych \xB7 ").concat(R().fmtD(reps[nr.a - 1].t), " \u2013 ").concat(R().fmtD(reps[nr.b - 1].t))), /*#__PURE__*/React.createElement(FiscSeg, {
      v: fisc,
      set: setFisc
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-sheet-f"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: go
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj")), pick && /*#__PURE__*/React.createElement(DateSheet, {
      title: pick === 'from' ? 'Data początkowa' : 'Data końcowa',
      value: p[pick],
      min: pick === 'to' ? p.from : null,
      max: pick === 'from' ? p.to : todayIso(),
      onPick: function onPick(d) {
        setP(_objectSpread(_objectSpread({}, p), {}, _defineProperty({}, pick, d)));
        setPick(null);
      },
      onClose: function onClose() {
        return setPick(null);
      }
    })));
  }

  // ── zestawienie zmiany / stanu kasy ──
  var TIPS = {
    'Gotówka ze sprzedaży': 'Suma wpłat gotówką z paragonów i faktur, pomniejszona o wydaną resztę.',
    'Wpłaty': 'Wpłaty do kasy wykonane funkcją „Wpłata do kasy”.',
    'Wypłaty': 'Wypłaty z kasy wykonane funkcją „Wypłata z kasy”.',
    'Pozycje towarowe': 'Liczba sprzedanych pozycji (linii paragonów), bez anulowanych.',
    'Anulowane paragony': 'Paragony anulowane przed zakończeniem — liczba i wartość.',
    'Stornowane pozycje': 'Pozycje usunięte z paragonu przed jego zamknięciem.',
    'Rabaty suma': 'Udział rabatów w sprzedaży i ich łączna wartość.',
    'Transakcje z rabatem': 'Udział paragonów, na których udzielono rabatu.',
    'Kaucje DRS (saldo)': 'Kaucje za opakowania zwrotne: sprzedane minus zwrócone.'
  };
  function sumUp(docs, sh) {
    var ok = docs.filter(function (d) {
        return !d.cancelled;
      }),
      cn = docs.filter(function (d) {
        return d.cancelled;
      });
    var forms = NP_PROG.get('payments');
    var byForm = forms.map(function (f) {
      var ps = ok.flatMap(function (d) {
        return d.pays.filter(function (p) {
          return p.form === f.id;
        });
      });
      return {
        id: f.id,
        name: f.name,
        kind: f.kind,
        n: ps.length,
        v: ps.reduce(function (s, p) {
          return s + p.amount;
        }, 0)
      };
    });
    var cash = (byForm.find(function (x) {
      return x.id === 'cash';
    }) || {
      v: 0
    }).v;
    var val = ok.reduce(function (s, d) {
        return s + d.total;
      }, 0),
      pos = ok.reduce(function (s, d) {
        return s + d.lines.length;
      }, 0);
    var disc = ok.reduce(function (s, d) {
        return s + d.disc;
      }, 0),
      withDisc = ok.filter(function (d) {
        return d.disc > 0;
      }).length;
    var pk = ok.flatMap(function (d) {
      return d.packs;
    });
    var out = pk.filter(function (x) {
        return x.dir === 'out';
      }),
      inn = pk.filter(function (x) {
        return x.dir === 'in';
      });
    var q = function q(a) {
        return a.reduce(function (s, x) {
          return s + x.qty;
        }, 0);
      },
      v = function v(a) {
        return a.reduce(function (s, x) {
          return s + x.val;
        }, 0);
      };
    var st = ok.filter(function (d) {
      return d.storno;
    });
    var dep = sh ? sh.dep : docs.length ? 100 : 0,
      wd = sh ? sh.wd : 0,
      start = sh ? sh.cash0 : 200;
    return {
      ok: ok,
      cn: cn,
      byForm: byForm,
      cash: cash,
      val: val,
      pos: pos,
      disc: disc,
      withDisc: withDisc,
      out: out,
      inn: inn,
      q: q,
      v: v,
      st: st,
      dep: dep,
      wd: wd,
      start: start
    };
  }
  function Tbl(_ref19) {
    var head = _ref19.head,
      rows = _ref19.rows;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rp-tbl"
    }, head && /*#__PURE__*/React.createElement("div", {
      className: "np-rp-tr h"
    }, head.map(function (h, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i
      }, h);
    }), /*#__PURE__*/React.createElement("span", null)), rows.filter(Boolean).map(function (_ref20, i) {
      var _ref21 = _slicedToArray(_ref20, 4),
        l = _ref21[0],
        a = _ref21[1],
        b = _ref21[2],
        _ref21$ = _ref21[3],
        o = _ref21$ === void 0 ? {} : _ref21$;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: 'np-rp-tr' + (o.b ? ' bold' : '') + (o.sub ? ' sub' : '') + (o.red ? ' red' : '')
      }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", null, a), /*#__PURE__*/React.createElement("span", null, b), TIPS[l] ? /*#__PURE__*/React.createElement("button", {
        className: "np-rp-tip",
        onClick: function onClick() {
          return o.ui && o.ui.say(TIPS[l], 'info', 'info');
        },
        "aria-label": "Wyja\u015Bnienie"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "info"
      })) : /*#__PURE__*/React.createElement("span", null));
    }));
  }
  function SummarySheet(_ref22) {
    var title = _ref22.title,
      sub = _ref22.sub,
      docs = _ref22.docs,
      sh = _ref22.sh,
      ui = _ref22.ui,
      onClose = _ref22.onClose,
      onCloseShift = _ref22.onCloseShift;
    useKeys(function (k) {
      if (k === 'ESC') onClose();
      return true;
    }, 40);
    var s = useMemo(function () {
      return sumUp(docs, sh);
    }, [docs, sh]);
    var end = sh ? sh.end || Date.now() : Date.now();
    var hrs = sh ? Math.max(0.01, (end - sh.start) / 36e5) : 0;
    var o = {
      ui: ui
    };
    var pct = function pct(a, b) {
      return (b ? Math.round(a / b * 100) : 0) + '%';
    };
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-sum",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("small", null, sub)), sh && /*#__PURE__*/React.createElement("span", {
      className: 'np-tbl-pill ' + (sh.open ? 'p-nadzorca' : '')
    }, sh.open ? 'Zmiana otwarta' : 'Zmiana zamknięta')), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-pe-body",
      more: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-col"
    }, sh && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card one"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pf-ct"
    }, /*#__PURE__*/React.createElement("b", null, "Zmiana")), /*#__PURE__*/React.createElement(Tbl, {
      rows: [['Numer zmiany', '', String(sh.no)], ['Kasjer', '', sh.name], ['Zmianę rozpoczęto', '', R().fmtDT(sh.start, true)], ['Zmianę zakończono', '', sh.end ? R().fmtDT(sh.end, true) : '—'], ['Czas trwania', '', R().durLong(end - sh.start)], ['Transakcji na godzinę', '', (s.ok.length / hrs).toFixed(2).replace('.', ',')], ['Utarg na godzinę', '', M(s.val / hrs)], ['Pozycji na godzinę', '', (s.pos / hrs).toFixed(2).replace('.', ',')]]
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card one"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pf-ct"
    }, /*#__PURE__*/React.createElement("b", null, "Stan \u015Brodk\xF3w w kasie wg form p\u0142atno\u015Bci")), /*#__PURE__*/React.createElement(Tbl, {
      head: ['Forma płatności', 'Il. trans.', 'Wartość'],
      rows: [['Gotówka PLN saldo', String(s.byForm.find(function (x) {
        return x.id === 'cash';
      }) ? s.byForm.find(function (x) {
        return x.id === 'cash';
      }).n : 0), M(s.start + s.cash + s.dep - s.wd), {
        red: true,
        b: true,
        ui: ui
      }]].concat(s.byForm.filter(function (x) {
        return x.id !== 'cash';
      }).map(function (x) {
        return [x.name, String(x.n), M(x.v), o];
      }))
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card one"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pf-ct"
    }, /*#__PURE__*/React.createElement("b", null, "Obr\xF3t got\xF3wki PLN")), /*#__PURE__*/React.createElement(Tbl, {
      head: ['', '', 'Wartość'],
      rows: [['Stan początkowy', '', M(s.start), o], ['Gotówka ze sprzedaży', '', M(s.cash), {
        b: true,
        ui: ui
      }], ['Wpłaty', '', M(s.dep), o], ['Wypłaty', '', M(s.wd), o], ['Gotówka PLN saldo', '', M(s.start + s.cash + s.dep - s.wd), {
        b: true,
        ui: ui
      }]]
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card one"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pf-ct"
    }, /*#__PURE__*/React.createElement("b", null, "Podsumowanie sprzeda\u017Cy")), /*#__PURE__*/React.createElement(Tbl, {
      head: ['', 'Ilość / udział', 'Wartość'],
      rows: [['Paragony i faktury', String(s.ok.length), M(s.val), o], ['Pozycje towarowe', String(s.pos), '', o], ['Anulowane paragony', String(s.cn.length), M(s.cn.reduce(function (a, d) {
        return a + d.total;
      }, 0)), o], ['Stornowane pozycje', String(s.st.length), M(s.st.reduce(function (a, d) {
        return a + (d.lines[0] ? d.lines[0].price : 0);
      }, 0)), o], ['Rabaty suma', pct(s.disc, s.val + s.disc), M(s.disc), o], ['– kwotowe', '', M(0), {
        sub: true
      }], ['– procentowe', '', M(s.disc), {
        sub: true
      }], ['Transakcje z rabatem', pct(s.withDisc, s.ok.length), M(s.disc), o], ['Kaucje DRS (saldo)', String(s.q(s.out) - s.q(s.inn)), M(s.v(s.out) - s.v(s.inn)), o], ['– sprzedane', String(s.q(s.out)), M(s.v(s.out)), {
        sub: true
      }], ['– zwrócone', String(s.q(s.inn)), M(s.v(s.inn)), {
        sub: true
      }], ['Bony DRS (wydane)', '0', M(0), o]]
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot np-rp-sumf"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Zamknij"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return printIt(ui, title, [['Kasjer', sh ? sh.name : 'wszyscy'], ['Sprzedaż', M(s.val) + ' zł']]);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj"), sh && sh.open && onCloseShift && /*#__PURE__*/React.createElement("button", {
      className: "np-btn red",
      onClick: function onClick() {
        return onCloseShift(sh);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "log-out"
    }), "Zamknij zmian\u0119"))));
  }

  // ── Raporty kasjerskie ──
  function CashiersView(_ref23) {
    var onBack = _ref23.onBack,
      ui = _ref23.ui;
    var _usePeriod = usePeriod('cash', 'today'),
      _usePeriod2 = _slicedToArray(_usePeriod, 2),
      p = _usePeriod2[0],
      setP = _usePeriod2[1];
    var _useStored = useStored('rp.cashier', null),
      _useStored2 = _slicedToArray(_useStored, 2),
      cid = _useStored2[0],
      setCid = _useStored2[1];
    var _useStored3 = useStored('rp.closed', {}),
      _useStored4 = _slicedToArray(_useStored3, 2),
      closed = _useStored4[0],
      setClosed = _useStored4[1];
    var _useState19 = useState(null),
      _useState20 = _slicedToArray(_useState19, 2),
      sel = _useState20[0],
      setSel = _useState20[1];
    var _useState21 = useState(false),
      _useState22 = _slicedToArray(_useState21, 2),
      state = _useState22[0],
      setState = _useState22[1];
    var data = R().get();
    var shifts = data.shifts.map(function (s) {
      return closed[s.id] ? _objectSpread(_objectSpread({}, s), {}, {
        open: false,
        end: closed[s.id]
      }) : s.open && !NP_SHIFT.isOpen(s.cashier) ? _objectSpread(_objectSpread({}, s), {}, {
        open: false,
        end: Date.now()
      }) : s;
    }).filter(function (s) {
      return R().inRange(s.start, p) && (cid == null || s.cashier === cid);
    }).reverse();
    var tot = shifts.reduce(function (a, s) {
      return a + ((s.end || Date.now()) - s.start);
    }, 0);
    var closeShift = function closeShift(sh) {
      return ui.dialog({
        tone: 'question',
        title: 'Zamknąć zmianę?',
        desc: "".concat(sh.name, " \xB7 rozpocz\u0119ta ").concat(R().fmtDT(sh.start)),
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: ui.close
        }, {
          label: 'Zamknij zmianę',
          primary: true,
          onClick: function onClick() {
            ui.close();
            setClosed(_objectSpread(_objectSpread({}, closed), {}, _defineProperty({}, sh.id, Date.now())));
            NP_SHIFT.close(sh.cashier);
            setSel(null);
            printIt(ui, 'Raport zamknięcia zmiany', [['Kasjer', sh.name], ['Zmiana nr', String(sh.no)]]);
          }
        }]
      });
    };
    var open = shifts.filter(function (s) {
      return s.open;
    });
    var todayDocs = data.docs.filter(function (d) {
      return R().iso(d.t) === todayIso();
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Raporty kasjerskie",
      sub: "".concat(shifts.length, " ").concat(pl(shifts.length, 'zmiana', 'zmiany', 'zmian'), " \xB7 dotknij, aby zobaczy\u0107 raport zmiany"),
      onBack: onBack,
      rows: shifts,
      onRow: function onRow(s) {
        return setSel(s);
      },
      top: /*#__PURE__*/React.createElement(PeriodBar, {
        value: p,
        onChange: setP
      }, /*#__PURE__*/React.createElement("button", {
        className: "np-rp-dbtn sel",
        onClick: function onClick() {
          return choose(ui, 'Kasjer', cashierList(), cid, setCid);
        }
      }, /*#__PURE__*/React.createElement("small", null, "Kasjer"), /*#__PURE__*/React.createElement("b", null, cid == null ? 'Wszyscy' : (NP_DATA.CASHIERS.find(function (c) {
        return c.id === cid;
      }) || {}).name), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-down"
      }))),
      empty: "Brak zmian w wybranym okresie",
      cols: [{
        label: 'Kasjer',
        get: function get(s) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, s.name), /*#__PURE__*/React.createElement("small", null, "zmiana nr ", s.no));
        }
      }, {
        label: 'Start',
        w: '190px',
        mono: true,
        get: function get(s) {
          return R().fmtDT(s.start);
        }
      }, {
        label: 'Koniec',
        w: '190px',
        mono: true,
        get: function get(s) {
          return s.end ? R().fmtDT(s.end) : '—';
        }
      }, {
        label: 'Czas',
        w: '100px',
        align: 'r',
        mono: true,
        get: function get(s) {
          return R().dur((s.end || Date.now()) - s.start);
        }
      }, {
        label: 'Status',
        w: '130px',
        get: function get(s) {
          return /*#__PURE__*/React.createElement("span", {
            className: 'np-tbl-pill' + (s.open ? ' p-nadzorca' : '')
          }, s.open ? 'Otwarta' : 'Zamknięta');
        }
      }],
      bottom: /*#__PURE__*/React.createElement(RepFoot, {
        tot: [['Razem czas', R().dur(tot)], ['Otwarte zmiany', String(open.length)]],
        acts: [['Stan kasy', 'wallet', function () {
          return setState(true);
        }], ['Zamknij wszystkie', 'log-out', function () {
          return open.length ? ui.dialog({
            tone: 'question',
            title: 'Zamknąć wszystkie otwarte zmiany?',
            desc: open.map(function (s) {
              return s.name;
            }).join(', '),
            actions: [{
              label: 'Anuluj',
              cancel: true,
              onClick: ui.close
            }, {
              label: 'Zamknij wszystkie',
              primary: true,
              onClick: function onClick() {
                ui.close();
                var c = _objectSpread({}, closed);
                open.forEach(function (s) {
                  c[s.id] = Date.now();
                  NP_SHIFT.close(s.cashier);
                });
                setClosed(c);
                ui.say("Zamkni\u0119to ".concat(open.length, " ").concat(pl(open.length, 'zmianę', 'zmiany', 'zmian')), 'ok', 'check');
              }
            }]
          }) : ui.say('Brak otwartych zmian', 'info', 'info');
        }, open.length ? 'red' : '']]
      })
    }), sel && /*#__PURE__*/React.createElement(SummarySheet, {
      title: "Raport zmiany kasjera",
      sub: "".concat(sel.name, " \xB7 zmiana nr ").concat(sel.no),
      docs: data.docs.filter(function (d) {
        return d.shift === sel.id;
      }),
      sh: sel,
      ui: ui,
      onClose: function onClose() {
        return setSel(null);
      },
      onCloseShift: closeShift
    }), state && /*#__PURE__*/React.createElement(SummarySheet, {
      title: "Stan kasy",
      sub: "od ostatniego raportu dobowego \xB7 ".concat(R().fmtD(Date.now())),
      docs: todayDocs,
      ui: ui,
      onClose: function onClose() {
        return setState(false);
      }
    }));
  }

  // ── Filtry raportu sprzedaży / opakowań ──
  var SF0 = {
    cashier: null,
    client: null,
    groups: null,
    forms: null,
    vat: null,
    par: true,
    fv: true,
    discOnly: false,
    q: ''
  };
  var sfCount = function sfCount(f) {
    return Object.keys(SF0).filter(function (k) {
      return JSON.stringify(f[k]) !== JSON.stringify(SF0[k]);
    }).length;
  };
  var docOk = function docOk(d, f) {
    return !d.cancelled && (f.cashier == null || d.cashier === f.cashier) && (f.client == null || d.client === f.client) && (!f.forms || d.pays.some(function (p) {
      return f.forms.includes(p.form);
    })) && (d.invoice ? f.fv : f.par) && (!f.discOnly || d.disc > 0);
  };
  var lineOk = function lineOk(l, f, gset) {
    var p = NP_DB.get(l.plu) || {};
    return (!gset || gset.has(p.group)) && (!f.vat || f.vat.includes(l.vat)) && (!f.q || NPF.norm(l.name).includes(NPF.norm(f.q)));
  };
  var groupSet = function groupSet(f) {
    return f.groups ? new Set(f.groups.flatMap(function (g) {
      return NP_DB.groupSubtree(g);
    })) : null;
  };
  function SalesFilterDrawer(_ref24) {
    var f = _ref24.f,
      setF = _ref24.setF,
      ui = _ref24.ui,
      onClose = _ref24.onClose,
      packs = _ref24.packs;
    var forms = NP_PROG.get('payments');
    var tree = NP_DB.groupTree().filter(function (t) {
      return t.g.active !== false;
    });
    var vats = Object.keys(NP_DATA.VAT);
    var chip = function chip(k, l) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: 'np-fchip' + (f[k] ? ' on' : ''),
        onClick: function onClick() {
          return setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, !f[k])));
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), l);
    };
    var multi = function multi(key, all, id, l, extra) {
      var on = !f[key] || f[key].includes(id);
      return /*#__PURE__*/React.createElement("button", {
        key: id,
        className: 'np-fchip' + (on ? ' on' : ''),
        style: extra,
        onClick: function onClick() {
          var cur = f[key] || all;
          var n = on ? cur.filter(function (x) {
            return x !== id;
          }) : [].concat(_toConsumableArray(cur), [id]);
          setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, key, n.length === all.length ? null : n)));
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), l);
    };
    var sec = function sec(t, kids, act) {
      return /*#__PURE__*/React.createElement("div", {
        className: "np-gf-sec"
      }, /*#__PURE__*/React.createElement("span", null, t, act), /*#__PURE__*/React.createElement("div", {
        className: "np-gf-chips"
      }, kids));
    };
    var allNone = function allNone(key, all) {
      return /*#__PURE__*/React.createElement("span", {
        className: "np-rp-allnone"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, key, null)));
        }
      }, "wszystkie"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, key, [])));
        }
      }, "\u017Cadne"));
    };
    var gIds = tree.map(function (t) {
      return t.g.id;
    });
    var toggleGroup = function toggleGroup(id) {
      var sub = NP_DB.groupSubtree(id);
      var cur = f.groups || gIds;
      var on = cur.includes(id);
      var n = on ? cur.filter(function (x) {
        return !sub.includes(x);
      }) : _toConsumableArray(new Set([].concat(_toConsumableArray(cur), _toConsumableArray(sub))));
      setF(_objectSpread(_objectSpread({}, f), {}, {
        groups: n.length === gIds.length ? null : n
      }));
    };
    var clients = [[null, 'Wszyscy kontrahenci']].concat(NP_PROG.get('clients').map(function (c) {
      return [c.name, c.name];
    }));
    var _useState23 = useState(false),
      _useState24 = _slicedToArray(_useState23, 2),
      osk = _useState24[0],
      setOsk = _useState24[1];
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer np-no-swipe"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer-h"
    }, /*#__PURE__*/React.createElement("b", null, "Filtry"), sfCount(f) > 0 && /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return setF(_objectSpread({}, SF0));
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }), "Wyczy\u015B\u0107"), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Schowaj"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-drawer-b",
      more: false
    }, !packs && /*#__PURE__*/React.createElement("button", {
      className: 'np-prog-q' + (osk ? ' focus' : ''),
      onClick: function onClick() {
        return setOsk(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("span", {
      className: f.q ? '' : 'ph'
    }, f.q || 'Nazwa towaru zawiera…'), f.q && /*#__PURE__*/React.createElement("i", {
      role: "button",
      className: "np-rp-qx",
      onClick: function onClick(e) {
        e.stopPropagation();
        setF(_objectSpread(_objectSpread({}, f), {}, {
          q: ''
        }));
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-rp-dbtn sel",
      onClick: function onClick() {
        return choose(ui, 'Kasjer', cashierList(), f.cashier, function (x) {
          return setF(_objectSpread(_objectSpread({}, f), {}, {
            cashier: x
          }));
        });
      }
    }, /*#__PURE__*/React.createElement("small", null, "Kasjer"), /*#__PURE__*/React.createElement("b", null, f.cashier == null ? 'Wszyscy' : (NP_DATA.CASHIERS.find(function (c) {
      return c.id === f.cashier;
    }) || {}).name), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-rp-dbtn sel",
      onClick: function onClick() {
        return choose(ui, 'Kontrahent', clients, f.client, function (x) {
          return setF(_objectSpread(_objectSpread({}, f), {}, {
            client: x
          }));
        });
      }
    }, /*#__PURE__*/React.createElement("small", null, "Kontrahent"), /*#__PURE__*/React.createElement("b", null, f.client || 'Wszyscy'), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    }))), !packs && /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "Asortyment", allNone('groups', gIds)), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-gtree"
    }, tree.map(function (_ref25) {
      var g = _ref25.g,
        depth = _ref25.depth;
      var on = !f.groups || f.groups.includes(g.id);
      return /*#__PURE__*/React.createElement("button", {
        key: g.id,
        className: 'np-fchip' + (on ? ' on' : ''),
        style: {
          marginLeft: depth * 22
        },
        onClick: function onClick() {
          return toggleGroup(g.id);
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), /*#__PURE__*/React.createElement(Icon, {
        name: g.icon,
        className: "np-rp-gico"
      }), g.label);
    }))), sec('Forma płatności', forms.map(function (p) {
      return multi('forms', forms.map(function (x) {
        return x.id;
      }), p.id, p.name);
    }), allNone('forms', forms.map(function (x) {
      return x.id;
    }))), !packs && sec('Stawka VAT', vats.map(function (k) {
      return multi('vat', vats, k, "".concat(k, " \xB7 ").concat(NP_DATA.VAT[k] === '—' ? 'zw.' : NP_DATA.VAT[k]));
    })), sec('Dokumenty', [chip('par', 'Paragony'), chip('fv', 'Faktury'), chip('discOnly', 'Tylko z rabatem')])), osk && /*#__PURE__*/React.createElement("div", {
      className: "np-rp-dosk"
    }, /*#__PURE__*/React.createElement(OSK, {
      onKey: function onKey(k) {
        return setF(_objectSpread(_objectSpread({}, f), {}, {
          q: k === 'BACK' ? f.q.slice(0, -1) : k === 'CLEAR' || k === 'C' ? '' : k === 'ENTER' ? f.q : (f.q + k).slice(0, 30)
        }));
      },
      onHide: function onHide() {
        return setOsk(false);
      },
      onEnter: function onEnter() {
        return setOsk(false);
      },
      extra: ",.-"
    })));
  }
  var FltBtn = function FltBtn(_ref26) {
    var n = _ref26.n,
      onClick = _ref26.onClick;
    return /*#__PURE__*/React.createElement("button", {
      className: 'np-rp-dbtn sel flt' + (n ? ' on' : ''),
      onClick: onClick
    }, /*#__PURE__*/React.createElement("small", null, "Filtry"), /*#__PURE__*/React.createElement("b", null, n ? "".concat(n, " aktywne") : 'Brak'), /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal"
    }));
  };

  // ── Raport sprzedaży / opakowań ──
  function SortH(_ref27) {
    var id = _ref27.id,
      label = _ref27.label,
      sort = _ref27.sort,
      setSort = _ref27.setSort;
    var on = sort.k === id;
    return /*#__PURE__*/React.createElement("button", {
      className: 'np-rp-sort' + (on ? ' on' : ''),
      onClick: function onClick() {
        return setSort({
          k: id,
          d: on ? -sort.d : id === 'name' ? 1 : -1
        });
      }
    }, label, on && /*#__PURE__*/React.createElement(Icon, {
      name: sort.d > 0 ? 'chevron-up' : 'chevron-down'
    }));
  }
  function SalesView(_ref28) {
    var onBack = _ref28.onBack,
      ui = _ref28.ui;
    var _usePeriod3 = usePeriod('sales'),
      _usePeriod4 = _slicedToArray(_usePeriod3, 2),
      p = _usePeriod4[0],
      setP = _usePeriod4[1];
    var _useStored5 = useStored('rp.salesSort', {
        k: 'name',
        d: 1
      }),
      _useStored6 = _slicedToArray(_useStored5, 2),
      sort = _useStored6[0],
      setSort = _useStored6[1];
    var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      mail = _useState26[0],
      setMail = _useState26[1];
    var _useStored7 = useStored('rp.sflt', SF0),
      _useStored8 = _slicedToArray(_useStored7, 2),
      fs = _useStored8[0],
      setFs = _useStored8[1];
    var f = _objectSpread(_objectSpread({}, SF0), fs);
    var _useState27 = useState(false),
      _useState28 = _slicedToArray(_useState27, 2),
      drawer = _useState28[0],
      setDrawer = _useState28[1];
    var rows = useMemo(function () {
      var m = {};
      var gs = groupSet(f);
      R().get().docs.filter(function (d) {
        return R().inRange(d.t, p) && docOk(d, f);
      }).forEach(function (d) {
        return d.lines.filter(function (l) {
          return lineOk(l, f, gs);
        }).forEach(function (l) {
          var r = m[l.plu] || (m[l.plu] = {
            id: l.plu,
            plu: l.plu,
            name: l.name,
            ean: l.ean,
            unit: l.unit,
            qty: 0,
            val: 0
          });
          r.qty += l.qty;
          r.val += l.val;
        });
      });
      var out = Object.values(m).map(function (r) {
        return _objectSpread(_objectSpread({}, r), {}, {
          stock: (NP_DB.get(r.plu) || {}).stock || 0
        });
      });
      var cmp = {
        name: function name(a, b) {
          return a.name.localeCompare(b.name, 'pl');
        },
        qty: function qty(a, b) {
          return a.qty - b.qty;
        },
        val: function val(a, b) {
          return a.val - b.val;
        }
      }[sort.k];
      return out.sort(function (a, b) {
        return cmp(a, b) * sort.d;
      });
    }, [p, sort, fs]);
    var sq = rows.reduce(function (s, r) {
        return s + r.qty;
      }, 0),
      sv = rows.reduce(function (s, r) {
        return s + r.val;
      }, 0);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Raport sprzeda\u017Cy",
      sub: "Sprzeda\u017C towar\xF3w w okresie \xB7 dotknij nag\u0142\xF3wka, aby sortowa\u0107",
      onBack: onBack,
      rows: rows,
      top: /*#__PURE__*/React.createElement(PeriodBar, {
        value: p,
        onChange: setP
      }, /*#__PURE__*/React.createElement(FltBtn, {
        n: sfCount(f),
        onClick: function onClick() {
          return setDrawer(true);
        }
      })),
      empty: sfCount(f) ? 'Brak sprzedaży dla wybranych filtrów' : 'Brak sprzedaży w wybranym okresie',
      cols: [{
        label: 'Lp.',
        w: '56px',
        align: 'r',
        mono: true,
        get: function get(r, i) {
          return i + 1;
        }
      }, {
        label: /*#__PURE__*/React.createElement(SortH, {
          id: "name",
          label: "Nazwa \xB7 kod",
          sort: sort,
          setSort: setSort
        }),
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, r.name), /*#__PURE__*/React.createElement("small", null, r.ean || r.plu));
        }
      }, {
        label: /*#__PURE__*/React.createElement(SortH, {
          id: "qty",
          label: "Sprzedano \xB7 na magazynie",
          sort: sort,
          setSort: setSort
        }),
        w: '230px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, NPF.qty(r.qty, r.unit), " ", r.unit), /*#__PURE__*/React.createElement("small", {
            className: r.stock < 0 ? 'neg' : ''
          }, NPF.qty(r.stock, r.unit)));
        }
      }, {
        label: /*#__PURE__*/React.createElement(SortH, {
          id: "val",
          label: "Warto\u015B\u0107 \xB7 \u015Br. cena",
          sort: sort,
          setSort: setSort
        }),
        w: '210px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, M(r.val)), /*#__PURE__*/React.createElement("small", null, M(r.val / r.qty)));
        }
      }],
      bottom: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RepFoot, {
        tot: [['Pozycji', String(rows.length)], ['Razem sprzedano', String(+sq.toFixed(3)).replace('.', ',')], ['Wartość', M(sv) + ' zł']],
        acts: [['Drukuj', 'printer', function () {
          return printIt(ui, 'Raport sprzedaży', [['Pozycji', String(rows.length)], ['Wartość', M(sv) + ' zł']].concat(sfCount(f) ? [['Filtry', sfCount(f) + ' aktywne']] : []));
        }], ['PDF', 'file-text', function () {
          return pdfIt(ui, 'Raport sprzedaży');
        }], ['E-mail', 'mail', function () {
          return setMail(true);
        }]]
      }), drawer && /*#__PURE__*/React.createElement("div", {
        className: "np-rp-scrim",
        onPointerDown: function onPointerDown() {
          return setDrawer(false);
        }
      }), drawer && /*#__PURE__*/React.createElement(SalesFilterDrawer, {
        f: f,
        setF: setFs,
        ui: ui,
        onClose: function onClose() {
          return setDrawer(false);
        }
      }))
    }), mail && /*#__PURE__*/React.createElement(EmailSheet, {
      name: "Raport sprzeda\u017Cy",
      ui: ui,
      onClose: function onClose() {
        return setMail(false);
      }
    }));
  }
  function PacksView(_ref29) {
    var onBack = _ref29.onBack,
      ui = _ref29.ui;
    var _usePeriod5 = usePeriod('packs'),
      _usePeriod6 = _slicedToArray(_usePeriod5, 2),
      p = _usePeriod6[0],
      setP = _usePeriod6[1];
    var _useState29 = useState(false),
      _useState30 = _slicedToArray(_useState29, 2),
      mail = _useState30[0],
      setMail = _useState30[1];
    var _useStored9 = useStored('rp.pflt', SF0),
      _useStored0 = _slicedToArray(_useStored9, 2),
      fs = _useStored0[0],
      setFs = _useStored0[1];
    var f = _objectSpread(_objectSpread({}, SF0), fs);
    var _useState31 = useState(false),
      _useState32 = _slicedToArray(_useState31, 2),
      drawer = _useState32[0],
      setDrawer = _useState32[1];
    var rows = useMemo(function () {
      var m = {};
      R().get().docs.filter(function (d) {
        return R().inRange(d.t, p) && docOk(d, f);
      }).forEach(function (d) {
        return d.packs.forEach(function (x) {
          var r = m[x.plu] || (m[x.plu] = {
            id: x.plu,
            name: x.name,
            out: 0,
            inn: 0,
            vo: 0,
            vi: 0
          });
          if (x.dir === 'out') {
            r.out += x.qty;
            r.vo += x.val;
          } else {
            r.inn += x.qty;
            r.vi += x.val;
          }
        });
      });
      return Object.values(m).sort(function (a, b) {
        return a.name.localeCompare(b.name, 'pl');
      });
    }, [p, fs]);
    var n = rows.reduce(function (s, r) {
        return s + r.out - r.inn;
      }, 0),
      v = rows.reduce(function (s, r) {
        return s + r.vo - r.vi;
      }, 0);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: "Raport opakowa\u0144",
      sub: "Opakowania zwrotne i kaucje DRS: wydane i przyj\u0119te",
      onBack: onBack,
      rows: rows,
      top: /*#__PURE__*/React.createElement(PeriodBar, {
        value: p,
        onChange: setP
      }, /*#__PURE__*/React.createElement(FltBtn, {
        n: sfCount(f),
        onClick: function onClick() {
          return setDrawer(true);
        }
      })),
      empty: "Brak obrotu opakowaniami w wybranym okresie",
      cols: [{
        label: 'Lp.',
        w: '56px',
        align: 'r',
        mono: true,
        get: function get(r, i) {
          return i + 1;
        }
      }, {
        label: 'Nazwa',
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, r.name), /*#__PURE__*/React.createElement("small", null, "wydane \xB7 przyj\u0119te"));
        }
      }, {
        label: 'Saldo · wydane · przyjęte',
        w: '250px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, r.out - r.inn), /*#__PURE__*/React.createElement("small", null, r.out, " \xB7 ", r.inn));
        }
      }, {
        label: 'Wartość',
        w: '220px',
        align: 'r',
        mono: true,
        get: function get(r) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, M(r.vo - r.vi)), /*#__PURE__*/React.createElement("small", null, M(r.vo), " \xB7 ", M(r.vi)));
        }
      }],
      bottom: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RepFoot, {
        tot: [['Pozycji', String(rows.length)], ['Saldo sztuk', String(n)], ['Wartość', M(v) + ' zł']],
        acts: [['Drukuj', 'printer', function () {
          return printIt(ui, 'Raport opakowań', [['Saldo', "".concat(n, " szt. \xB7 ").concat(M(v), " z\u0142")]]);
        }], ['PDF', 'file-text', function () {
          return pdfIt(ui, 'Raport opakowań');
        }], ['E-mail', 'mail', function () {
          return setMail(true);
        }]]
      }), drawer && /*#__PURE__*/React.createElement("div", {
        className: "np-rp-scrim",
        onPointerDown: function onPointerDown() {
          return setDrawer(false);
        }
      }), drawer && /*#__PURE__*/React.createElement(SalesFilterDrawer, {
        packs: true,
        f: f,
        setF: setFs,
        ui: ui,
        onClose: function onClose() {
          return setDrawer(false);
        }
      }))
    }), mail && /*#__PURE__*/React.createElement(EmailSheet, {
      name: "Raport opakowa\u0144",
      ui: ui,
      onClose: function onClose() {
        return setMail(false);
      }
    }));
  }

  // ── Raport paragonów / faktur ──
  var F0 = {
    cashier: null,
    client: null,
    vmin: '',
    vmax: '',
    nipY: true,
    nipN: true,
    act: true,
    can: false,
    par: true,
    zwr: true,
    zal: true,
    storno: false,
    forms: null,
    fis: true,
    nfis: true,
    invY: true,
    invN: true,
    norm: true,
    marza: true
  };
  function filterDocs(docs, f) {
    return docs.filter(function (d) {
      return (f.cashier == null || d.cashier === f.cashier) && (f.client == null || d.client === f.client) && (f.vmin === '' || d.total >= NPF.parseNum(f.vmin)) && (f.vmax === '' || d.total <= NPF.parseNum(f.vmax)) && (d.nip ? f.nipY : f.nipN) && (d.cancelled ? f.can : f.act) && {
        paragon: f.par,
        zwrot: f.zwr,
        zaliczka: f.zal
      }[d.kind] && (!f.storno || d.storno) && (!f.forms || d.pays.some(function (p) {
        return f.forms.includes(p.form);
      })) && (d.fiscal ? f.fis : f.nfis) && (d.invoice ? f.invY : f.invN) && (d.marza ? f.marza : f.norm);
    });
  }
  var fCount = function fCount(f) {
    return Object.keys(F0).filter(function (k) {
      return JSON.stringify(f[k]) !== JSON.stringify(F0[k]);
    }).length;
  };
  function FilterDrawer(_ref30) {
    var f = _ref30.f,
      setF = _ref30.setF,
      ui = _ref30.ui,
      onClose = _ref30.onClose,
      invoices = _ref30.invoices;
    var forms = NP_PROG.get('payments');
    var chip = function chip(k, l) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: 'np-fchip' + (f[k] ? ' on' : ''),
        onClick: function onClick() {
          return setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, !f[k])));
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), l);
    };
    var sec = function sec(t, kids) {
      return /*#__PURE__*/React.createElement("div", {
        className: "np-gf-sec"
      }, /*#__PURE__*/React.createElement("span", null, t), /*#__PURE__*/React.createElement("div", {
        className: "np-gf-chips"
      }, kids));
    };
    var money = function money(k, l) {
      return /*#__PURE__*/React.createElement("button", {
        className: "np-rp-dbtn",
        onClick: function onClick() {
          return ui.amount({
            title: l,
            mode: 'money',
            initial: f[k],
            suffix: 'zł',
            confirmLabel: 'Zapisz',
            onConfirm: function onConfirm(x) {
              ui.close();
              setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, x)));
            }
          });
        }
      }, /*#__PURE__*/React.createElement("small", null, l), /*#__PURE__*/React.createElement("b", null, f[k] === '' ? '—' : f[k] + ' zł'), f[k] !== '' && /*#__PURE__*/React.createElement("i", {
        role: "button",
        onClick: function onClick(e) {
          e.stopPropagation();
          setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, '')));
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x"
      })));
    };
    var clients = [[null, 'Wszyscy kontrahenci']].concat(NP_PROG.get('clients').map(function (c) {
      return [c.name, c.name];
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer np-no-swipe"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer-h"
    }, /*#__PURE__*/React.createElement("b", null, "Filtry"), fCount(f) > 0 && /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return setF(_objectSpread({}, F0));
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }), "Wyczy\u015B\u0107"), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Schowaj"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-drawer-b",
      more: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-rp-dbtn sel",
      onClick: function onClick() {
        return choose(ui, 'Kasjer', cashierList(), f.cashier, function (v) {
          return setF(_objectSpread(_objectSpread({}, f), {}, {
            cashier: v
          }));
        });
      }
    }, /*#__PURE__*/React.createElement("small", null, "Kasjer"), /*#__PURE__*/React.createElement("b", null, f.cashier == null ? 'Wszyscy' : (NP_DATA.CASHIERS.find(function (c) {
      return c.id === f.cashier;
    }) || {}).name), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-rp-dbtn sel",
      onClick: function onClick() {
        return choose(ui, 'Kontrahent', clients, f.client, function (v) {
          return setF(_objectSpread(_objectSpread({}, f), {}, {
            client: v
          }));
        });
      }
    }, /*#__PURE__*/React.createElement("small", null, "Kontrahent"), /*#__PURE__*/React.createElement("b", null, f.client || 'Wszyscy'), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "O warto\u015Bci"), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-drawer-2"
    }, money('vmin', 'Od'), money('vmax', 'Do'))), sec('NIP nabywcy', [chip('nipY', 'Z NIP-em'), chip('nipN', 'Bez NIP-u')]), sec('Status', [chip('act', 'Aktywne'), chip('can', 'Anulowane')]), sec('Rodzaj', [chip('par', invoices ? 'Faktury' : 'Paragony'), chip('zwr', 'Zwroty'), chip('zal', 'Zaliczki'), chip('storno', 'Tylko ze stornem')]), sec('Forma płatności', forms.map(function (p) {
      var on = !f.forms || f.forms.includes(p.id);
      return /*#__PURE__*/React.createElement("button", {
        key: p.id,
        className: 'np-fchip' + (on ? ' on' : ''),
        onClick: function onClick() {
          var cur = f.forms || forms.map(function (x) {
            return x.id;
          });
          var n = on ? cur.filter(function (x) {
            return x !== p.id;
          }) : [].concat(_toConsumableArray(cur), [p.id]);
          setF(_objectSpread(_objectSpread({}, f), {}, {
            forms: n.length === forms.length ? null : n
          }));
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), p.name);
    })), sec('Fiskalność', [chip('fis', 'Fiskalne'), chip('nfis', 'Niefiskalne')]), !invoices && sec('Faktura', [chip('invY', 'Z fakturą'), chip('invN', 'Bez faktury')]), sec('VAT', [chip('norm', 'Zwykłe'), chip('marza', 'VAT marża')])));
  }
  function DocPreview(_ref31) {
    var d = _ref31.d,
      inv = _ref31.inv;
    var shop = NP_PROG.get('shop');
    return /*#__PURE__*/React.createElement("div", {
      className: "np-rcpt np-rp-rcpt"
    }, /*#__PURE__*/React.createElement("b", null, shop.name), /*#__PURE__*/React.createElement("span", null, shop.street, " ", shop.house, ", ", shop.zip, " ", shop.city), /*#__PURE__*/React.createElement("span", null, "NIP ", NPF.nip(shop.nip)), /*#__PURE__*/React.createElement("i", null, R().fmtDT(d.t, true), " \xB7 ", inv ? 'FAKTURA ' + d.invoice : d.cancelled ? 'PARAGON ANULOWANY' : 'PARAGON FISKALNY', " \xB7 nr ", String(d.no).padStart(4, '0')), d.nip && /*#__PURE__*/React.createElement("span", {
      className: "l"
    }, "NIP nabywcy: ", NPF.nip(d.nip.replace(/-/g, ''))), d.lines.map(function (l, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "l"
      }, /*#__PURE__*/React.createElement("em", null, l.name), /*#__PURE__*/React.createElement("em", null, NPF.qty(l.qty, l.unit), " \xD7 ", M(l.price)), /*#__PURE__*/React.createElement("b", null, M(l.val), " ", l.vat));
    }), d.packs.map(function (x, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: 'p' + i,
        className: "l"
      }, /*#__PURE__*/React.createElement("em", null, x.dir === 'out' ? 'Kaucja' : 'Zwrot kaucji', ": ", x.name), /*#__PURE__*/React.createElement("em", null, x.qty), /*#__PURE__*/React.createElement("b", null, x.dir === 'out' ? '' : '−', M(x.val)));
    }), d.disc > 0 && /*#__PURE__*/React.createElement("span", {
      className: "l"
    }, /*#__PURE__*/React.createElement("em", null, "Rabat 5%"), /*#__PURE__*/React.createElement("em", null), /*#__PURE__*/React.createElement("b", null, "\u2212", M(d.disc))), /*#__PURE__*/React.createElement("span", {
      className: "sum"
    }, "SUMA PLN ", /*#__PURE__*/React.createElement("b", null, M(d.total))), d.pays.map(function (p, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "l"
      }, /*#__PURE__*/React.createElement("em", null, p.name), /*#__PURE__*/React.createElement("em", null), /*#__PURE__*/React.createElement("b", null, M(p.amount)));
    }), /*#__PURE__*/React.createElement("span", {
      className: "sys"
    }, "Nr systemowy ", d.sys, " \xB7 ", d.cashierName));
  }
  function DocsView(_ref32) {
    var onBack = _ref32.onBack,
      ui = _ref32.ui,
      invoices = _ref32.invoices;
    var key = invoices ? 'inv' : 'rcpt';
    var _usePeriod7 = usePeriod(key),
      _usePeriod8 = _slicedToArray(_usePeriod7, 2),
      p = _usePeriod8[0],
      setP = _usePeriod8[1];
    var _useStored1 = useStored('rp.flt.' + key, F0),
      _useStored10 = _slicedToArray(_useStored1, 2),
      f = _useStored10[0],
      setF = _useStored10[1];
    var _useState33 = useState(false),
      _useState34 = _slicedToArray(_useState33, 2),
      drawer = _useState34[0],
      setDrawer = _useState34[1];
    var _useState35 = useState(null),
      _useState36 = _slicedToArray(_useState35, 2),
      sel = _useState36[0],
      setSel = _useState36[1];
    var _useState37 = useState(false),
      _useState38 = _slicedToArray(_useState37, 2),
      mail = _useState38[0],
      setMail = _useState38[1];
    var name = invoices ? 'Raport faktur' : 'Raport paragonów';
    var rows = useMemo(function () {
      return filterDocs(R().get().docs.filter(function (d) {
        return R().inRange(d.t, p) && (!invoices || d.invoice);
      }), _objectSpread(_objectSpread({}, F0), f)).slice().reverse();
    }, [p, f, invoices]);
    var ok = rows.filter(function (d) {
      return !d.cancelled;
    });
    var poz = ok.reduce(function (s, d) {
        return s + d.lines.length;
      }, 0),
      sum = ok.reduce(function (s, d) {
        return s + d.total;
      }, 0);
    var podsumy = function podsumy() {
      var by = {};
      ok.forEach(function (d) {
        return d.pays.forEach(function (x) {
          by[x.name] = (by[x.name] || 0) + x.amount;
        });
      });
      ui.dialog({
        tone: 'info',
        title: 'Podsumowanie',
        desc: "".concat(ok.length, " ").concat(invoices ? pl(ok.length, 'faktura', 'faktury', 'faktur') : pl(ok.length, 'paragon', 'paragony', 'paragonów'), " \xB7 ").concat(R().fmtD(R().fromIso(p.from)), " \u2013 ").concat(R().fmtD(R().fromIso(p.to))),
        rows: Object.entries(by).map(function (_ref33) {
          var _ref34 = _slicedToArray(_ref33, 2),
            k = _ref34[0],
            v = _ref34[1];
          return [k, M(v) + ' zł'];
        }).concat([['Anulowane', String(rows.length - ok.length)], ['Razem', M(sum) + ' zł']]),
        actions: [{
          label: 'OK',
          primary: true,
          onClick: ui.close
        }]
      });
    };
    var nf = fCount(_objectSpread(_objectSpread({}, F0), f));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgTable, {
      title: name,
      sub: invoices ? 'Faktury w okresie · dotknij, aby zobaczyć' : 'Paragony w okresie · dotknij, aby zobaczyć',
      onBack: onBack,
      rows: rows,
      onRow: function onRow(d) {
        return setSel(d);
      },
      top: /*#__PURE__*/React.createElement(PeriodBar, {
        value: p,
        onChange: setP
      }, /*#__PURE__*/React.createElement("button", {
        className: 'np-rp-dbtn sel flt' + (nf ? ' on' : ''),
        onClick: function onClick() {
          return setDrawer(true);
        }
      }, /*#__PURE__*/React.createElement("small", null, "Filtry"), /*#__PURE__*/React.createElement("b", null, nf ? "".concat(nf, " aktywne") : 'Brak'), /*#__PURE__*/React.createElement(Icon, {
        name: "sliders-horizontal"
      }))),
      empty: "Brak dokument\xF3w dla wybranych filtr\xF3w",
      cols: [{
        label: 'Nr',
        w: '150px',
        mono: true,
        get: function get(d) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, invoices ? d.invoice : String(d.no).padStart(4, '0')), /*#__PURE__*/React.createElement("small", null, d.sys));
        }
      }, {
        label: 'Data i godzina · NIP / klient',
        get: function get(d) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, R().fmtDT(d.t, true), d.cancelled && /*#__PURE__*/React.createElement("em", {
            className: "np-rp-tag red"
          }, "anulowany"), d.kind !== 'paragon' && /*#__PURE__*/React.createElement("em", {
            className: "np-rp-tag"
          }, d.kind)), /*#__PURE__*/React.createElement("small", null, d.client ? d.client + (d.nip ? ' · ' + d.nip : '') : d.cashierName));
        }
      }, {
        label: 'Poz.',
        w: '70px',
        align: 'r',
        mono: true,
        get: function get(d) {
          return d.lines.length;
        }
      }, {
        label: 'Wartość',
        w: '150px',
        align: 'r',
        mono: true,
        get: function get(d) {
          return /*#__PURE__*/React.createElement("b", {
            className: d.cancelled ? 'strike' : ''
          }, M(d.total));
        }
      }],
      bottom: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RepFoot, {
        tot: [[invoices ? 'Faktur' : 'Paragonów', String(ok.length)], ['Pozycji', String(poz)], ['Suma', M(sum) + ' zł']],
        acts: [['Podsumy', 'list', podsumy], ['Drukuj', 'printer', function () {
          return printIt(ui, name, [['Dokumentów', String(ok.length)], ['Suma', M(sum) + ' zł']]);
        }], ['PDF', 'file-text', function () {
          return pdfIt(ui, name);
        }], ['E-mail', 'mail', function () {
          return setMail(true);
        }]]
      }), drawer && /*#__PURE__*/React.createElement("div", {
        className: "np-rp-scrim",
        onPointerDown: function onPointerDown() {
          return setDrawer(false);
        }
      }), drawer && /*#__PURE__*/React.createElement(FilterDrawer, {
        f: _objectSpread(_objectSpread({}, F0), f),
        setF: setF,
        ui: ui,
        invoices: invoices,
        onClose: function onClose() {
          return setDrawer(false);
        }
      }))
    }), sel && /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-doc",
      onClose: function onClose() {
        return setSel(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, invoices ? 'Faktura ' + sel.invoice : 'Paragon ' + String(sel.no).padStart(4, '0')), /*#__PURE__*/React.createElement("small", null, R().fmtDT(sel.t, true), " \xB7 ", sel.cashierName)), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setSel(null);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-doc-b",
      more: false
    }, /*#__PURE__*/React.createElement(DocPreview, {
      d: sel,
      inv: invoices
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setSel(null);
      }
    }, "Zamknij"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        setSel(null);
        printIt(ui, invoices ? 'Kopia faktury' : 'Kopia paragonu', [['Dokument', invoices ? sel.invoice : String(sel.no).padStart(4, '0')], ['Wartość', M(sel.total) + ' zł']]);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj kopi\u0119")))), mail && /*#__PURE__*/React.createElement(EmailSheet, {
      name: name,
      ui: ui,
      onClose: function onClose() {
        return setMail(false);
      }
    }));
  }

  // ── Pamięć chroniona ──
  function MemoryView(_ref35) {
    var onBack = _ref35.onBack,
      ui = _ref35.ui;
    var data = R().get();
    var items = useMemo(function () {
      return data.docs.map(function (d) {
        return {
          id: 'j' + d.jpk,
          jpk: d.jpk,
          t: d.t,
          typ: d.cancelled ? 'paragon anulowany' : d.invoice ? 'faktura' : 'paragon',
          doc: d
        };
      }).concat(data.reports.map(function (r) {
        return {
          id: 'j' + r.jpk,
          jpk: r.jpk,
          t: r.t,
          typ: 'raport dobowy',
          rep: r
        };
      })).sort(function (a, b) {
        return a.jpk - b.jpk;
      });
    }, [data]);
    var _useStored11 = useStored('rp.memTab', 'jpk'),
      _useStored12 = _slicedToArray(_useStored11, 2),
      tab = _useStored12[0],
      setTab = _useStored12[1];
    var _useState39 = useState(function () {
        return {
          a: items.length ? items[Math.max(0, items.length - 12)].jpk : 0,
          b: items.length ? items[items.length - 1].jpk : 0
        };
      }),
      _useState40 = _slicedToArray(_useState39, 2),
      rngJ = _useState40[0],
      setRngJ = _useState40[1];
    var _useState41 = useState(function () {
        return {
          a: Math.max(1, data.reports.length - 4),
          b: data.reports.length
        };
      }),
      _useState42 = _slicedToArray(_useState41, 2),
      rngR = _useState42[0],
      setRngR = _useState42[1];
    var _useState43 = useState(null),
      _useState44 = _slicedToArray(_useState43, 2),
      sel = _useState44[0],
      setSel = _useState44[1];
    var _useState45 = useState('jpk'),
      _useState46 = _slicedToArray(_useState45, 2),
      view = _useState46[0],
      setView = _useState46[1];
    var rr = tab === 'rep' ? rngR : rngJ;
    var rows = tab === 'jpk' ? items.filter(function (x) {
      return x.jpk >= rngJ.a && x.jpk <= rngJ.b;
    }) : tab === 'rep' ? function () {
      var reps = data.reports;
      var a = reps[rngR.a - 2],
        b = reps[rngR.b - 1];
      return items.filter(function (x) {
        return (!a || x.jpk > a.jpk) && b && x.jpk <= b.jpk;
      });
    }() : [];
    var edit = function edit(k) {
      var isR = tab === 'rep';
      var lo = isR ? 1 : items[0].jpk,
        hi = isR ? data.reports.length : items[items.length - 1].jpk;
      ui.amount({
        title: (k === 'a' ? 'Od ' : 'Do ') + (isR ? 'raportu' : 'JPK ID'),
        mode: 'digits',
        maxLen: 6,
        initial: String(rr[k]),
        suffix: '',
        confirmLabel: 'Zapisz',
        validate: function validate(x) {
          return +x < lo || +x > hi ? "Zakres ".concat(lo, "\u2013").concat(hi) : (k === 'a' ? +x > rr.b : +x < rr.a) ? 'Nieprawidłowy zakres' : null;
        },
        onConfirm: function onConfirm(x) {
          ui.close();
          (isR ? setRngR : setRngJ)(_objectSpread(_objectSpread({}, rr), {}, _defineProperty({}, k, +x)));
        }
      });
    };
    var last = data.docs[data.docs.length - 1];
    var info = [['Numer unikatowy kasy', NP_DATA.SHOP.unique], ['Numer ewidencyjny', 'NX/2026/000842'], ['Pojemność pamięci chronionej', '8 GB'], ['Zajęte', '1,2% (98 MB)'], ['Dokumentów w pamięci', String(items.length)], ['Ostatni JPK ID', String(items.length ? items[items.length - 1].jpk : '—')], ['Ostatni raport dobowy', data.reports.length ? "nr ".concat(data.reports.length, " \xB7 ").concat(R().fmtDT(data.reports[data.reports.length - 1].t)) : '—'], ['Stan pamięci', 'Prawidłowy']];
    var jpkXml = function jpkXml(x) {
      return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<JPK_KASA wersja=\"1-0\">\n  <Naglowek>\n    <KodFormularza>JPK_KASA</KodFormularza>\n    <DataWytworzenia>".concat(new Date(x.t).toISOString().slice(0, 19), "</DataWytworzenia>\n    <NrUnikatowy>").concat(NP_DATA.SHOP.unique, "</NrUnikatowy>\n  </Naglowek>\n  <Dokument id=\"").concat(x.jpk, "\" typ=\"").concat(x.typ, "\">\n").concat(x.doc ? x.doc.lines.map(function (l) {
        return "    <Pozycja nazwa=\"".concat(l.name, "\" ilosc=\"").concat(l.qty, "\" cena=\"").concat(l.price.toFixed(2), "\" vat=\"").concat(l.vat, "\"/>");
      }).join('\n') + "\n    <Suma>".concat(x.doc.total.toFixed(2), "</Suma>") : "    <Paragony>".concat(x.rep.receipts, "</Paragony>\n    <SprzedazBrutto>").concat(x.rep.gross.toFixed(2), "</SprzedazBrutto>"), "\n  </Dokument>\n</JPK_KASA>");
    };
    var TABS = [['jpk', 'Według JPK ID'], ['rep', 'Według raportów'], ['last', 'Ostatni wydruk'], ['info', 'Informacje']];
    var _useSwipeBack = useSwipeBack(onBack),
      _useSwipeBack2 = _slicedToArray(_useSwipeBack, 2),
      sw = _useSwipeBack2[0],
      swInd = _useSwipeBack2[1];
    var rangeBar = /*#__PURE__*/React.createElement("div", {
      className: "np-rp-bar"
    }, ['a', 'b'].map(function (k) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: "np-rp-dbtn",
        onClick: function onClick() {
          return edit(k);
        }
      }, /*#__PURE__*/React.createElement("small", null, (k === 'a' ? 'Od ' : 'Do ') + (tab === 'rep' ? 'raportu' : 'JPK ID')), /*#__PURE__*/React.createElement("b", null, rr[k]), /*#__PURE__*/React.createElement(Icon, {
        name: "pencil"
      }));
    }), /*#__PURE__*/React.createElement("span", {
      className: "np-rp-hint"
    }, rows.length, " ", pl(rows.length, 'dokument', 'dokumenty', 'dokumentów'), " \xB7 ", tab === 'rep' ? 'od raportu do raportu (z dokumentami pomiędzy)' : 'zakres numerów JPK'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, tab === 'jpk' || tab === 'rep' ? /*#__PURE__*/React.createElement(ProgTable, {
      title: "Pami\u0119\u0107 chroniona",
      sub: "Przegl\u0105danie dokument\xF3w zapisanych w pami\u0119ci chronionej",
      onBack: onBack,
      rows: rows,
      onRow: function onRow(x) {
        setSel(x);
        setView('jpk');
      },
      tabs: TABS,
      tab: tab,
      setTab: setTab,
      top: rangeBar,
      empty: "Brak dokument\xF3w w zakresie",
      cols: [{
        label: 'JPK ID',
        w: '130px',
        mono: true,
        get: function get(x) {
          return /*#__PURE__*/React.createElement("b", null, x.jpk);
        }
      }, {
        label: 'Data',
        w: '220px',
        mono: true,
        get: function get(x) {
          return R().fmtDT(x.t);
        }
      }, {
        label: 'Typ',
        get: function get(x) {
          return /*#__PURE__*/React.createElement("span", {
            className: 'np-tbl-pill' + (x.rep ? ' p-manager' : '')
          }, x.typ);
        }
      }, {
        label: 'Wartość',
        w: '150px',
        align: 'r',
        mono: true,
        get: function get(x) {
          return x.doc ? M(x.doc.total) : M(x.rep.gross);
        }
      }],
      bottom: /*#__PURE__*/React.createElement(RepFoot, {
        tot: [['Dokumentów', String(rows.length)]],
        acts: [['Drukuj JPK', 'printer', function () {
          return printIt(ui, 'Wydruk JPK z pamięci chronionej', [['Zakres', "".concat(rr.a, " \u2013 ").concat(rr.b)]]);
        }], ['Drukuj kopie', 'printer-check', function () {
          return printIt(ui, 'Kopie dokumentów', [['Dokumentów', String(rows.length)]]);
        }], ['Pobierz', 'download', function () {
          return ui.progressThen('Zapisywanie na pendrive…', "".concat(rows.length, " dokument\xF3w JPK"), 1600, {
            title: 'Pobrano dane z pamięci',
            rows: [['Plik', "jpk_kasa_".concat(rr.a, "-").concat(rr.b, ".xml")], ['Nośnik', 'Pendrive USB']]
          });
        }, 'red']]
      })
    }) : /*#__PURE__*/React.createElement("div", _extends({
      className: "np-sub np-prog np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement("div", {
      className: "np-subhead"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), "Menu"), /*#__PURE__*/React.createElement("div", {
      className: "np-subhead-t"
    }, /*#__PURE__*/React.createElement("b", null, "Pami\u0119\u0107 chroniona"), /*#__PURE__*/React.createElement("small", null, tab === 'last' ? 'Ostatni zapisany dokument' : 'Informacje o pamięci chronionej')), /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-prog-tabs np-rp-memtabs"
    }, TABS.map(function (_ref36) {
      var _ref37 = _slicedToArray(_ref36, 2),
        k = _ref37[0],
        l = _ref37[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: tab === k ? 'on' : '',
        onClick: function onClick() {
          return setTab(k);
        }
      }, l);
    }))), tab === 'last' && last && /*#__PURE__*/React.createElement("div", {
      className: "np-rp-last"
    }, /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-doc-b",
      more: false
    }, /*#__PURE__*/React.createElement(DocPreview, {
      d: last
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-rp-acts"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return printIt(ui, 'Kopia ostatniego wydruku', [['Dokument', String(last.no).padStart(4, '0')]]);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj kopi\u0119"))), tab === 'info' && /*#__PURE__*/React.createElement("div", {
      className: "np-rp-info"
    }, /*#__PURE__*/React.createElement(Tbl, {
      rows: info.map(function (_ref38) {
        var _ref39 = _slicedToArray(_ref38, 2),
          l = _ref39[0],
          v = _ref39[1];
        return [l, '', v];
      })
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-prog-info"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock"
    }), /*#__PURE__*/React.createElement("span", null, "Pami\u0119\u0107 chroniona przechowuje kopie wszystkich dokument\xF3w (JPK) i nie mo\u017Ce by\u0107 edytowana. Dane mo\u017Cna przegl\u0105da\u0107, drukowa\u0107 i pobra\u0107 na pendrive.")))), sel && /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-doc wide",
      onClose: function onClose() {
        return setSel(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, "JPK ID ", sel.jpk), /*#__PURE__*/React.createElement("small", null, sel.typ, " \xB7 ", R().fmtDT(sel.t, true))), /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-rp-jtabs"
    }, [['jpk', 'JPK'], ['print', 'Wydruk'], ['meta', 'Metadane']].map(function (_ref40) {
      var _ref41 = _slicedToArray(_ref40, 2),
        k = _ref41[0],
        l = _ref41[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: view === k ? 'on' : '',
        onClick: function onClick() {
          return setView(k);
        }
      }, l);
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setSel(null);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-doc-b",
      more: false
    }, view === 'jpk' && /*#__PURE__*/React.createElement("pre", {
      className: "np-rp-xml"
    }, jpkXml(sel)), view === 'print' && (sel.doc ? /*#__PURE__*/React.createElement(DocPreview, {
      d: sel.doc,
      inv: !!sel.doc.invoice
    }) : /*#__PURE__*/React.createElement("div", {
      className: "np-rcpt np-rp-rcpt"
    }, /*#__PURE__*/React.createElement("b", null, "RAPORT FISKALNY DOBOWY"), /*#__PURE__*/React.createElement("span", null, "nr ", sel.rep.no, " \xB7 ", R().fmtDT(sel.t)), /*#__PURE__*/React.createElement("span", {
      className: "l"
    }, /*#__PURE__*/React.createElement("em", null, "Liczba paragon\xF3w"), /*#__PURE__*/React.createElement("em", null), /*#__PURE__*/React.createElement("b", null, sel.rep.receipts)), /*#__PURE__*/React.createElement("span", {
      className: "sum"
    }, "SPRZEDA\u017B BRUTTO ", /*#__PURE__*/React.createElement("b", null, M(sel.rep.gross))))), view === 'meta' && /*#__PURE__*/React.createElement("div", {
      className: "np-rp-info"
    }, /*#__PURE__*/React.createElement(Tbl, {
      rows: [['JPK ID', '', String(sel.jpk)], ['Typ dokumentu', '', sel.typ], ['Data zapisu', '', R().fmtDT(sel.t, true)], ['Numer unikatowy', '', NP_DATA.SHOP.unique], ['Skrót (SHA-256)', '', (sel.jpk * 2654435761 >>> 0).toString(16).padStart(8, '0') + '…' + (sel.t % 65536).toString(16)], ['Wysłano do CRK', '', 'tak']]
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot np-rp-sumf"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setSel(null);
      }
    }, "Zamknij"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return printIt(ui, 'Wydruk JPK', [['JPK ID', String(sel.jpk)]]);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj JPK"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return printIt(ui, 'Kopia dokumentu', [['JPK ID', String(sel.jpk)]]);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer-check"
    }), "Drukuj kopi\u0119")))));
  }
  var REPORT_FORMS = {
    month: MonthReport,
    period: PeriodReport
  };
  var REPORT_VIEWS = {
    cashiers: CashiersView,
    sales: SalesView,
    packs: PacksView,
    receipts: DocsView,
    invoices: function invoices(p) {
      return /*#__PURE__*/React.createElement(DocsView, _extends({}, p, {
        invoices: true
      }));
    },
    memory: MemoryView
  };
  Object.assign(window, {
    REPORT_FORMS: REPORT_FORMS,
    REPORT_VIEWS: REPORT_VIEWS,
    NpDateSheet: DateSheet
  });
})();