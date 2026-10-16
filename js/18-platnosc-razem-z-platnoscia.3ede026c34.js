"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* KASA NEXT PRO — płatność: Razem (z płatnością dzieloną) oraz szybka płatność (auto) */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;

  // Formy płatności z Menu › Programowanie › Formy płatności (aktywne, w kolejności z listy)
  var payForms = function payForms() {
    var a = NP_PROG.payForms();
    return a.length ? a : NP_PROG.get('payments').slice(0, 1);
  };
  var formOf = function formOf(id) {
    return NP_PROG.get('payments').find(function (p) {
      return p.id === id;
    }) || {
      id: id,
      name: id,
      kind: 'Inna płatność',
      icon: 'wallet',
      reszta: false
    };
  };
  // Szybka płatność ('cash' | 'card' | 'blik') → pierwsza aktywna forma danego rodzaju
  var formFor = function formFor(m) {
    var fs = payForms();
    return (fs.find(function (p) {
      return p.id === m;
    }) || fs.find(function (p) {
      return NP_PROG.bucket(p.kind) === m;
    }) || fs[0]).id;
  };
  var bucketOf = function bucketOf(id) {
    return NP_PROG.bucket(formOf(id).kind);
  };
  var isTerminal = function isTerminal(id) {
    var b = bucketOf(id);
    return b === 'card' || b === 'blik';
  };
  var tilesMax = function tilesMax() {
    try {
      return +((JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {}).payTiles || 8);
    } catch (e) {
      return 8;
    }
  };
  function quickAmounts(total) {
    var up = function up(s) {
      return Math.ceil((total + 0.001) / s) * s;
    };
    return _toConsumableArray(new Set([up(10), up(50), up(100), up(100) + 100, up(500)])).filter(function (v) {
      return v > total;
    }).sort(function (a, b) {
      return a - b;
    }).slice(0, 3);
  }
  var fmtIn = function fmtIn(v) {
    return NPF.money(v).replace(/\u202f/g, '');
  };
  var paySummaryOn = function paySummaryOn() {
    try {
      var s = JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
      return s.paySummary !== false;
    } catch (e) {
      return true;
    }
  };
  function PaySheet(_ref) {
    var cashier = _ref.cashier,
      subtotal = _ref.subtotal,
      _ref$rdAmt = _ref.rdAmt,
      rdAmt = _ref$rdAmt === void 0 ? 0 : _ref$rdAmt,
      invoice = _ref.invoice,
      nip = _ref.nip,
      total = _ref.total,
      count = _ref.count,
      receiptNo = _ref.receiptNo,
      _ref$initialMethod = _ref.initialMethod,
      initialMethod = _ref$initialMethod === void 0 ? 'cash' : _ref$initialMethod,
      _ref$initialTender = _ref.initialTender,
      initialTender = _ref$initialTender === void 0 ? '' : _ref$initialTender,
      _ref$auto = _ref.auto,
      auto = _ref$auto === void 0 ? false : _ref$auto,
      onCancel = _ref.onCancel,
      onDone = _ref.onDone;
    var _useState = useState(function () {
        return formFor(initialMethod);
      }),
      _useState2 = _slicedToArray(_useState, 2),
      method = _useState2[0],
      setMethod = _useState2[1];
    var _useState3 = useState(function () {
        return bucketOf(formFor(initialMethod)) === 'cash' ? initialTender : '';
      }),
      _useState4 = _slicedToArray(_useState3, 2),
      tender = _useState4[0],
      setTender = _useState4[1];
    var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      more = _useState6[0],
      setMore = _useState6[1];
    var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      pays = _useState8[0],
      setPays = _useState8[1]; // częściowe płatności [{method, amount}]
    var _useState9 = useState('input'),
      _useState0 = _slicedToArray(_useState9, 2),
      phase = _useState0[0],
      setPhase = _useState0[1]; // input | part | terminal | printing | done
    var _useState1 = useState(null),
      _useState10 = _slicedToArray(_useState1, 2),
      partMethod = _useState10[0],
      setPartMethod = _useState10[1];
    var result = useRef(null);
    var timers = useRef([]);
    useEffect(function () {
      return function () {
        return timers.current.forEach(clearTimeout);
      };
    }, []);
    var later = function later(fn, ms) {
      return timers.current.push(setTimeout(fn, ms));
    };
    var paid = NPF.round2(pays.reduce(function (s, p) {
      return s + p.amount;
    }, 0));
    var remaining = NPF.round2(total - paid);
    var form = formOf(method);
    var isCash = NP_PROG.bucket(form.kind) === 'cash';
    var canChange = !!form.reszta;
    var tv = tender ? NPF.parseNum(tender) : remaining;
    var amount = NPF.round2(canChange ? Math.min(tv, remaining) : tv);
    var change = canChange ? Math.max(0, NPF.round2(tv - remaining)) : 0;
    var over = !canChange && tv > remaining + 0.0001;
    var zero = !(tv > 0);
    var partial = !zero && !over && tv + 0.0001 < remaining;
    var invalid = zero || over;
    var pushKey = function pushKey(k) {
      return setTender(function (c) {
        return applyAmountKey(c, k, 'money');
      });
    };
    var finish = function finish() {
      return onDone(result.current);
    };
    var confirm = function confirm() {
      if (phase !== 'input' || invalid) return;
      var p = {
        method: NP_PROG.bucket(form.kind),
        form: method,
        name: form.name,
        icon: form.icon,
        amount: amount
      };
      if (partial) {
        var add = function add() {
          setPays(function (ps) {
            return [].concat(_toConsumableArray(ps), [p]);
          });
          setTender('');
          setPhase('input');
        };
        if (isTerminal(method)) {
          setPartMethod(method);
          setPhase('part');
          later(add, 1800);
        } else add();
        return;
      }
      var all = [].concat(_toConsumableArray(pays), [p]);
      result.current = {
        method: all.length > 1 ? 'split' : p.method,
        payments: all,
        tendered: canChange ? tv : amount,
        change: change
      };
      var summary = paySummaryOn();
      var toDone = function toDone() {
        if (!summary && change <= 0) {
          finish();
          return;
        }
        setPhase('done');
        if (auto && change <= 0) later(finish, 2600);
      };
      if (isTerminal(method)) {
        setPhase('terminal');
        later(function () {
          return setPhase('printing');
        }, 2000);
        later(toDone, 3300);
      } else {
        setPhase('printing');
        later(toDone, 1300);
      }
    };
    useEffect(function () {
      if (auto) confirm();
    }, []);
    useKeys(function (k) {
      if (more) {
        if (k === 'ESC') setMore(false);
        return true;
      }
      if (phase === 'done') {
        if (k === 'OK' || k === 'ESC' || k === 'RAZEM') finish();
        return true;
      }
      if (phase !== 'input') return true;
      if (/^[0-9]$/.test(k) || k === ',' || k === 'BACK') pushKey(k);else if (k === 'OK' || k === 'RAZEM') confirm();else if (k === 'ESC') {
        if (tender) setTender('');else if (!pays.length) onCancel();
      }
      return true;
    }, 30);
    if (phase !== 'input' && phase !== 'done') {
      var r = result.current;
      var tm = phase === 'part' ? partMethod : method;
      var amt = phase === 'part' ? amount : r ? r.payments[r.payments.length - 1].amount : total;
      var title = phase === 'part' || phase === 'terminal' ? bucketOf(tm) === 'blik' ? 'Oczekiwanie na kod BLIK' : 'Zbliż lub włóż kartę' : 'Drukowanie paragonu…';
      var desc = phase === 'part' || phase === 'terminal' ? "Terminal p\u0142atniczy \xB7 ".concat(NPF.money(amt), " z\u0142").concat(phase === 'part' ? ' · płatność częściowa' : '') : 'Nie odrywaj paragonu do końca wydruku';
      return /*#__PURE__*/React.createElement(Sheet, {
        className: "np-pay np-pay-status"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-spinner big"
      }), /*#__PURE__*/React.createElement("div", {
        className: "np-pay-status-title"
      }, title), /*#__PURE__*/React.createElement("div", {
        className: "np-pay-status-desc"
      }, desc));
    }
    if (phase === 'done') {
      var _r = result.current;
      var now = new Date();
      var _short = !paySummaryOn();
      return /*#__PURE__*/React.createElement(Sheet, {
        className: "np-pay np-done"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-done-head"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-done-ok"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), /*#__PURE__*/React.createElement("div", {
        className: "np-done-t"
      }, /*#__PURE__*/React.createElement("b", null, invoice ? 'Faktura' : 'Paragon', " ", npPad4(receiptNo), " zamkni\u0119ty"), /*#__PURE__*/React.createElement("small", null, NPF.time(now), " \xB7 ", cashier ? cashier.name : '', " \xB7 ", count, " ", count === 1 ? 'pozycja' : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? 'pozycje' : 'pozycji', nip ? ' · NIP ' + NPF.nip(nip) : ''))), /*#__PURE__*/React.createElement("div", {
        className: "np-done-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-done-sum"
      }, /*#__PURE__*/React.createElement("span", null, "Suma"), /*#__PURE__*/React.createElement("b", null, NPF.money(total), /*#__PURE__*/React.createElement("small", null, "z\u0142")), rdAmt !== 0 && /*#__PURE__*/React.createElement("em", {
        className: rdAmt < 0 ? 'up' : ''
      }, rdAmt < 0 ? 'narzut +' : 'rabat −', NPF.money(Math.abs(rdAmt)), " z\u0142 \xB7 suma pozycji ", NPF.money(subtotal), " z\u0142")), /*#__PURE__*/React.createElement("div", {
        className: "np-done-pays"
      }, _r.payments.map(function (x, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          className: "np-done-pay"
        }, /*#__PURE__*/React.createElement("span", {
          className: "np-done-pay-ico"
        }, /*#__PURE__*/React.createElement(Icon, {
          name: x.icon || formOf(x.form || x.method).icon
        })), /*#__PURE__*/React.createElement("span", null, x.name || formOf(x.form || x.method).name), /*#__PURE__*/React.createElement("b", null, NPF.money(_r.change > 0 && i === _r.payments.length - 1 ? x.amount + _r.change : x.amount), " z\u0142"));
      }))), _r.change > 0 && /*#__PURE__*/React.createElement("div", {
        className: "np-done-change"
      }, /*#__PURE__*/React.createElement("span", null, "Reszta do wydania"), /*#__PURE__*/React.createElement("b", null, NPF.money(_r.change), /*#__PURE__*/React.createElement("small", null, "z\u0142"))), /*#__PURE__*/React.createElement("div", {
        className: "np-done-foot"
      }, auto && _r.change <= 0 && /*#__PURE__*/React.createElement("div", {
        className: "np-done-auto"
      }, /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("button", {
        className: "np-btn green wide",
        onClick: finish
      }, _short ? 'OK' : 'Nowy paragon')));
    }
    var primary = invalid ? 'Zatwierdź płatność' : partial ? "Zap\u0142a\u0107 cz\u0119\u015B\u0107 \xB7 ".concat(NPF.money(amount), " z\u0142") : isTerminal(method) ? 'Wyślij do terminala' : NP_PROG.bucket(form.kind) === 'bon' ? 'Zatwierdź bon' : 'Zatwierdź płatność';
    // Kafelki form płatności: tyle, ile mieści ustawienie (4 / 8 / 12); nadmiar pod „Więcej”
    var forms = payForms();
    var cap = Math.max(4, tilesMax());
    var overflow = forms.length > cap;
    var shown = overflow ? forms.slice(0, cap - 1) : forms;
    var hiddenSel = overflow && !shown.some(function (m) {
      return m.id === method;
    }) ? form : null;
    var nTiles = shown.length + (overflow ? 1 : 0);
    var rows = Math.ceil(nTiles / 4);
    var pickForm = function pickForm(id) {
      setMethod(id);
      setTender('');
      setMore(false);
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-pay",
      onClose: pays.length ? null : onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pay-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pay-title"
    }, "P\u0142atno\u015B\u0107", /*#__PURE__*/React.createElement("small", null, "Paragon ", npPad4(receiptNo), " \xB7 ", count, " poz.")), !pays.length && /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onCancel,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pay-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pay-total"
    }, /*#__PURE__*/React.createElement("span", null, pays.length ? 'Pozostało do zapłaty' : 'Do zapłaty', pays.length > 0 && /*#__PURE__*/React.createElement("em", null, "z ", NPF.money(total), " z\u0142")), /*#__PURE__*/React.createElement("b", null, NPF.money(remaining), /*#__PURE__*/React.createElement("small", null, "z\u0142"))), pays.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-pays"
    }, pays.map(function (p, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "np-pay-chip"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: p.icon
      }), p.name, " ", NPF.money(p.amount), " z\u0142", !isTerminal(p.form) && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setPays(pays.filter(function (_, j) {
            return j !== i;
          }));
        },
        "aria-label": "Usu\u0144 p\u0142atno\u015B\u0107"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x"
      })));
    })), /*#__PURE__*/React.createElement("div", {
      className: 'np-methods r' + rows,
      style: {
        gridTemplateColumns: "repeat(".concat(Math.min(4, Math.max(nTiles, 3)), ",minmax(0,1fr))")
      }
    }, shown.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'np-method' + (method === m.id ? ' on' : ''),
        onClick: function onClick() {
          return pickForm(m.id);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: m.icon
      }), /*#__PURE__*/React.createElement("span", null, m.name));
    }), overflow && /*#__PURE__*/React.createElement("button", {
      className: 'np-method more' + (hiddenSel ? ' on' : ''),
      onClick: function onClick() {
        return setMore(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: hiddenSel ? hiddenSel.icon : 'dots'
    }), /*#__PURE__*/React.createElement("span", null, hiddenSel ? hiddenSel.name : "Wi\u0119cej (".concat(forms.length - shown.length, ")")))), /*#__PURE__*/React.createElement("div", {
      className: "np-tender"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tender-row"
    }, /*#__PURE__*/React.createElement("span", null, isCash ? 'Wpłata' : 'Kwota'), /*#__PURE__*/React.createElement("b", {
      className: tender ? over ? 'short' : '' : 'ph'
    }, tender ? tender : NPF.money(remaining), " z\u0142")), /*#__PURE__*/React.createElement("div", {
      className: "np-tender-row"
    }, canChange && !partial ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Reszta"), /*#__PURE__*/React.createElement("b", {
      className: "change"
    }, NPF.money(change), " z\u0142")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, over ? 'Za dużo' : 'Pozostanie'), /*#__PURE__*/React.createElement("b", {
      className: over ? 'short' : 'rest'
    }, over ? "max ".concat(NPF.money(remaining)) : NPF.money(Math.max(0, remaining - amount)), " z\u0142")))), isCash ? /*#__PURE__*/React.createElement("div", {
      className: "np-quick"
    }, /*#__PURE__*/React.createElement("button", {
      className: !tender ? 'on' : '',
      onClick: function onClick() {
        return setTender('');
      }
    }, "Odliczona"), quickAmounts(remaining).map(function (v) {
      return /*#__PURE__*/React.createElement("button", {
        key: v,
        className: NPF.parseNum(tender) === v ? 'on' : '',
        onClick: function onClick() {
          return setTender(fmtIn(v));
        }
      }, v, " z\u0142");
    })) : /*#__PURE__*/React.createElement("div", {
      className: "np-pay-hint"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "split"
    }), canChange ? 'Wpisz większą kwotę, aby wydać resztę gotówką, lub mniejszą — płatność dzielona' : 'Wpisz mniejszą kwotę, aby podzielić płatność między kilka form')), /*#__PURE__*/React.createElement("div", {
      className: "np-pay-right"
    }, /*#__PURE__*/React.createElement(NumPad, {
      onKey: pushKey,
      className: "on-gray"
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pay-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return pays.length ? null : onCancel();
      },
      disabled: pays.length > 0
    }, pays.length ? 'Płatność rozpoczęta' : 'Anuluj'), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      disabled: invalid,
      onClick: confirm
    }, primary)), more && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pick",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget) setMore(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickbox np-pay-more"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickhead"
    }, /*#__PURE__*/React.createElement("b", null, "Wszystkie formy p\u0142atno\u015Bci"), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setMore(false);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-pay-more-grid",
      more: false
    }, forms.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'np-method' + (method === m.id ? ' on' : ''),
        onClick: function onClick() {
          return pickForm(m.id);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: m.icon
      }), /*#__PURE__*/React.createElement("span", null, m.name));
    })))));
  }
  Object.assign(window, {
    PaySheet: PaySheet
  });
})();