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
/* TAKA KASA — płatność: Razem (z płatnością dzieloną) oraz szybka płatność (auto) */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;
  var METHODS = [{
    id: 'cash',
    label: 'Gotówka',
    icon: 'banknote'
  }, {
    id: 'card',
    label: 'Karta',
    icon: 'credit-card'
  }, {
    id: 'blik',
    label: 'BLIK',
    icon: 'smartphone'
  }, {
    id: 'bon',
    label: 'Bon',
    icon: 'gift'
  }];
  var METHOD_NAME = {
    cash: 'Gotówka',
    card: 'Karta płatnicza',
    blik: 'BLIK',
    bon: 'Bon',
    split: 'Płatność dzielona'
  };
  var SHORT = {
    cash: 'Gotówka',
    card: 'Karta',
    blik: 'BLIK',
    bon: 'Bon'
  };
  var ICON = {
    cash: 'banknote',
    card: 'credit-card',
    blik: 'smartphone',
    bon: 'gift'
  };
  var isTerminal = function isTerminal(m) {
    return m === 'card' || m === 'blik';
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
  function PaySheet(_ref) {
    var total = _ref.total,
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
    var _useState = useState(initialMethod),
      _useState2 = _slicedToArray(_useState, 2),
      method = _useState2[0],
      setMethod = _useState2[1];
    var _useState3 = useState(initialMethod === 'cash' ? initialTender : ''),
      _useState4 = _slicedToArray(_useState3, 2),
      tender = _useState4[0],
      setTender = _useState4[1];
    var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      pays = _useState6[0],
      setPays = _useState6[1]; // częściowe płatności [{method, amount}]
    var _useState7 = useState('input'),
      _useState8 = _slicedToArray(_useState7, 2),
      phase = _useState8[0],
      setPhase = _useState8[1]; // input | part | terminal | printing | done
    var _useState9 = useState(null),
      _useState0 = _slicedToArray(_useState9, 2),
      partMethod = _useState0[0],
      setPartMethod = _useState0[1];
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
    var isCash = method === 'cash';
    var tv = tender ? NPF.parseNum(tender) : remaining;
    var amount = NPF.round2(isCash ? Math.min(tv, remaining) : tv);
    var change = isCash ? Math.max(0, NPF.round2(tv - remaining)) : 0;
    var over = !isCash && tv > remaining + 0.0001;
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
        method: method,
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
        method: all.length > 1 ? 'split' : method,
        payments: all,
        tendered: isCash ? tv : amount,
        change: change
      };
      var toDone = function toDone() {
        setPhase('done');
        if (auto && change <= 0) later(finish, 1500);
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
    if (phase !== 'input') {
      var r = result.current;
      var tm = phase === 'part' ? partMethod : method;
      var amt = phase === 'part' ? amount : r ? r.payments[r.payments.length - 1].amount : total;
      var title = phase === 'part' || phase === 'terminal' ? tm === 'blik' ? 'Oczekiwanie na kod BLIK' : 'Zbliż lub włóż kartę' : phase === 'printing' ? 'Drukowanie paragonu…' : "Paragon ".concat(npPad4(receiptNo), " wydrukowany");
      var desc = phase === 'part' || phase === 'terminal' ? "Terminal p\u0142atniczy \xB7 ".concat(NPF.money(amt), " z\u0142").concat(phase === 'part' ? ' · płatność częściowa' : '') : phase === 'printing' ? 'Nie odrywaj paragonu do końca wydruku' : "".concat(METHOD_NAME[r.method], " \xB7 ").concat(NPF.money(total), " z\u0142").concat(r.method === 'cash' && r.change > 0 ? " \xB7 wp\u0142ata ".concat(NPF.money(r.tendered), " z\u0142") : '');
      return /*#__PURE__*/React.createElement(Sheet, {
        className: "np-pay np-pay-status"
      }, phase === 'done' ? /*#__PURE__*/React.createElement("div", {
        className: "np-dlg-ico t-success big"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })) : /*#__PURE__*/React.createElement("span", {
        className: "np-spinner big"
      }), /*#__PURE__*/React.createElement("div", {
        className: "np-pay-status-title"
      }, title), /*#__PURE__*/React.createElement("div", {
        className: "np-pay-status-desc"
      }, desc), phase === 'done' && r.payments.length > 1 && /*#__PURE__*/React.createElement("div", {
        className: "np-dlg-rows"
      }, r.payments.map(function (p, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          className: "np-dlg-row"
        }, /*#__PURE__*/React.createElement("span", null, METHOD_NAME[p.method]), /*#__PURE__*/React.createElement("b", null, NPF.money(p.amount), " z\u0142"));
      })), phase === 'done' && r.change > 0 && /*#__PURE__*/React.createElement("div", {
        className: "np-change"
      }, /*#__PURE__*/React.createElement("span", null, "Reszta"), /*#__PURE__*/React.createElement("b", null, NPF.money(r.change), /*#__PURE__*/React.createElement("small", null, "z\u0142"))), phase === 'done' && /*#__PURE__*/React.createElement("button", {
        className: "np-btn green wide",
        onClick: finish
      }, "Nowy paragon"));
    }
    var primary = invalid ? 'Zatwierdź płatność' : partial ? "Zap\u0142a\u0107 cz\u0119\u015B\u0107 \xB7 ".concat(NPF.money(amount), " z\u0142") : isTerminal(method) ? 'Wyślij do terminala' : method === 'bon' ? 'Zatwierdź bon' : 'Zatwierdź płatność';
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
        name: ICON[p.method]
      }), SHORT[p.method], " ", NPF.money(p.amount), " z\u0142", !isTerminal(p.method) && /*#__PURE__*/React.createElement("button", {
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
      className: "np-methods"
    }, METHODS.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'np-method' + (method === m.id ? ' on' : ''),
        onClick: function onClick() {
          setMethod(m.id);
          setTender('');
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: m.icon
      }), m.label);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-tender"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tender-row"
    }, /*#__PURE__*/React.createElement("span", null, isCash ? 'Wpłata' : 'Kwota'), /*#__PURE__*/React.createElement("b", {
      className: tender ? over ? 'short' : '' : 'ph'
    }, tender ? tender : NPF.money(remaining), " z\u0142")), /*#__PURE__*/React.createElement("div", {
      className: "np-tender-row"
    }, isCash && !partial ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Reszta"), /*#__PURE__*/React.createElement("b", {
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
    }), "Wpisz mniejsz\u0105 kwot\u0119, aby podzieli\u0107 p\u0142atno\u015B\u0107 mi\u0119dzy kilka form")), /*#__PURE__*/React.createElement("div", {
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
    }, primary)));
  }
  Object.assign(window, {
    PaySheet: PaySheet
  });
})();