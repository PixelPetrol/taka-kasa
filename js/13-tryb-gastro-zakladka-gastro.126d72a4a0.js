"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
/* TAKA KASA — tryb gastro: zakładka Gastro (Stoliki: siatka / plan sali, Rachunki otwarte), opis stolika, podział rachunku */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useMemo = _React.useMemo;
  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
    } catch (e) {
      return {};
    }
  }
  function useNpSettings() {
    var _useState = useState(readSettings),
      _useState2 = _slicedToArray(_useState, 2),
      s = _useState2[0],
      setS = _useState2[1];
    useEffect(function () {
      var h = function h() {
        return setS(readSettings());
      };
      window.addEventListener('np-settings', h);
      window.addEventListener('storage', h);
      return function () {
        window.removeEventListener('np-settings', h);
        window.removeEventListener('storage', h);
      };
    }, []);
    return s;
  }
  var lineSum = function lineSum(L) {
    return NPF.round2((L || []).reduce(function (s, l) {
      return s + NPF.round2(l.qty * l.price * (1 - (l.adj || 0) / 100));
    }, 0));
  };
  var ago = function ago(t) {
    var m = Math.max(0, Math.round((Date.now() - t) / 60000));
    return m < 60 ? m + ' min' : Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0');
  };
  var LATE = 20 * 60000;
  var cashierOf = function cashierOf(id) {
    return NP_DATA.CASHIERS.find(function (c) {
      return c.id === id;
    });
  };
  var ini = function ini(c) {
    return c ? c.name.split(' ').map(function (s) {
      return s[0];
    }).join('').slice(0, 2) : '?';
  };

  // Strona stolików (ostatnie strony Paneli): rząd programowalnych klawiszy + siatka (po 24) albo plan sali (strona = sala)
  function GastroPage(_ref) {
    var active = _ref.active,
      view = _ref.view,
      tables = _ref.tables,
      plan = _ref.plan,
      names = _ref.names,
      bills = _ref.bills,
      curId = _ref.curId,
      curLines = _ref.curLines,
      row = _ref.row,
      onTile = _ref.onTile,
      onEditRow = _ref.onEditRow,
      onTable = _ref.onTable,
      moveMode = _ref.moveMode,
      onCancelMove = _ref.onCancelMove,
      canEdit = _ref.canEdit,
      onNameTable = _ref.onNameTable,
      gp = _ref.gp;
    var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      tick = _useState4[1];
    useEffect(function () {
      var t = setInterval(function () {
        return tick(function (x) {
          return x + 1;
        });
      }, 30000);
      return function () {
        return clearInterval(t);
      };
    }, []);
    var per = 24;
    var info = useMemo(function () {
      var m = {};
      bills.forEach(function (b) {
        if (b.table == null) return;
        var L = b.id === curId ? curLines : (b.lines || []).concat(b.rest || []);
        var x = m[b.table] || (m[b.table] = {
          sum: 0,
          cnt: 0,
          b: b,
          cur: false
        });
        x.sum = NPF.round2(x.sum + lineSum(L));
        x.cnt += L.length;
        if (b.id === curId) x.cur = true;
      });
      return m;
    }, [bills, curId, curLines]);
    var tCls = function tCls(n) {
      var x = info[n];
      if (!x) return 'free';
      if (x.cur) return 'cur';
      return Date.now() - (x.b.touched || x.b.opened) > LATE ? 'busy late' : x.cnt ? 'busy' : 'open';
    };
    var label = function label(n, fixed) {
      return [fixed, info[n] && info[n].b.name].filter(Boolean).join(' · ');
    };
    var badge = function badge(n) {
      var x = info[n];
      if (!x) return null;
      var c = cashierOf(x.b.cashierId);
      return /*#__PURE__*/React.createElement("span", {
        className: "np-gw",
        style: {
          background: c ? c.color : '#555'
        }
      }, ini(c));
    };
    var tInfo = function tInfo(t) {
      var x = info[t.n];
      return {
        cls: tCls(t.n),
        name: label(t.n, t.name),
        sum: x ? x.sum : null,
        busy: !!x,
        badge: badge(t.n)
      };
    };
    useKeys(function (k) {
      if (active && k === 'ESC' && moveMode) {
        onCancelMove();
        return true;
      }
      return false;
    }, 3);
    // przytrzymanie stolika (siatka) = stała nazwa
    var T = React.useRef({});
    var down = function down(e, n) {
      T.current.x = e.clientX;
      T.current.y = e.clientY;
      T.current["long"] = false;
      clearTimeout(T.current.t);
      if (canEdit) T.current.t = setTimeout(function () {
        T.current["long"] = true;
        onNameTable(n);
      }, 550);
    };
    var move = function move(e) {
      if (T.current.x != null && Math.hypot(e.clientX - T.current.x, e.clientY - T.current.y) > 10) clearTimeout(T.current.t);
    };
    var up = function up() {
      clearTimeout(T.current.t);
      T.current.x = null;
    };
    var tap = function tap(n) {
      if (T.current["long"]) {
        T.current["long"] = false;
        return;
      }
      onTable(n);
    };
    var room = view === 'plan' ? plan.rooms[Math.min(gp, plan.rooms.length - 1)] : null;
    var grid = function grid() {
      var from = gp * per;
      return /*#__PURE__*/React.createElement("div", {
        className: "np-gtgrid"
      }, Array.from({
        length: per
      }, function (_, i) {
        var n = from + i + 1;
        if (n > tables) return /*#__PURE__*/React.createElement("div", {
          key: i,
          className: "np-gt none"
        });
        var x = info[n];
        var nm = label(n, names[n]);
        return /*#__PURE__*/React.createElement("button", {
          key: i,
          className: 'np-gt ' + tCls(n),
          onPointerDown: function onPointerDown(e) {
            return down(e, n);
          },
          onPointerMove: move,
          onPointerUp: up,
          onPointerCancel: up,
          onPointerLeave: up,
          onContextMenu: function onContextMenu(e) {
            return e.preventDefault();
          },
          onClick: function onClick() {
            return tap(n);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "np-gt-top"
        }, /*#__PURE__*/React.createElement("span", {
          className: "np-gt-l"
        }, /*#__PURE__*/React.createElement("b", null, n), /*#__PURE__*/React.createElement("small", null, nm || (x ? '' : 'wolny'))), badge(n)), x && /*#__PURE__*/React.createElement("span", {
          className: "np-gt-bt"
        }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("small", null, x.cnt, " poz."), /*#__PURE__*/React.createElement("small", null, ago(x.b.opened))), /*#__PURE__*/React.createElement("b", null, NPF.money(x.sum))));
      }));
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "np-gv"
    }, /*#__PURE__*/React.createElement(TileRow, {
      className: "np-kbrow np-gkrow",
      slots: row,
      n: 6,
      onTile: onTile,
      onEdit: onEditRow
    }), /*#__PURE__*/React.createElement("div", {
      className: 'np-gbody' + (moveMode ? ' moving' : '')
    }, room ? /*#__PURE__*/React.createElement(PlanGrid, {
      room: room,
      tInfo: tInfo,
      onItemTap: function onItemTap(t) {
        return onTable(t.n);
      }
    }) : grid()));
  }
  // Pasek pod stronami stolików: nazwa sali / podpowiedź i przycisk akcji
  function gastroBar(_ref2) {
    var view = _ref2.view,
      plan = _ref2.plan,
      gp = _ref2.gp,
      count = _ref2.count,
      moveMode = _ref2.moveMode,
      canEdit = _ref2.canEdit,
      onCancelMove = _ref2.onCancelMove,
      onEditPlan = _ref2.onEditPlan;
    var room = view === 'plan' ? plan.rooms[Math.min(gp, plan.rooms.length - 1)] : null;
    var name = moveMode ? 'Dotknij wolny stolik, na który przenieść rachunek' : room ? room.name : 'Stoliki' + (count > 1 ? ' · ' + (gp + 1) + '/' + count : '');
    var act = moveMode ? /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: onCancelMove
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }), "Anuluj") : canEdit ? view === 'plan' ? /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return onEditPlan(gp);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil"
    }), "Edytuj plan") : /*#__PURE__*/React.createElement("span", {
      className: "np-pagebar-tip"
    }, "Przytrzymaj stolik, aby nada\u0107 mu nazw\u0119") : null;
    return {
      name: name,
      act: act,
      warn: !!moveMode
    };
  }

  // Opis stolika / rachunku: nazwa lub imię gościa + liczba gości
  var SUGG = ['Taras', 'Loża', 'Okno', 'Urodziny', 'Rezerwacja', 'VIP', 'Na wynos'];
  function GastroDescSheet(_ref3) {
    var title = _ref3.title,
      n0 = _ref3.name,
      g0 = _ref3.guests,
      onCancel = _ref3.onCancel,
      onSave = _ref3.onSave;
    var _useState5 = useState(n0 || ''),
      _useState6 = _slicedToArray(_useState5, 2),
      name = _useState6[0],
      setName = _useState6[1];
    var _useState7 = useState(g0 || 0),
      _useState8 = _slicedToArray(_useState7, 2),
      guests = _useState8[0],
      setGuests = _useState8[1];
    useKeys(function (k) {
      if (k === 'ESC') onCancel();
      return true;
    }, 30);
    var key = function key(k) {
      return setName(function (s) {
        return k === 'BACK' ? s.slice(0, -1) : k === 'CLEAR' ? '' : (s + k).slice(0, 32);
      });
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-gdesc",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "np-gdesc-fld"
    }, name || /*#__PURE__*/React.createElement("span", {
      className: "ph"
    }, "Nazwa lub imi\u0119 go\u015Bcia"), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("div", {
      className: "np-gdesc-sugg"
    }, SUGG.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s,
        onClick: function onClick() {
          return setName(s);
        }
      }, s);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-gdesc-g"
    }, /*#__PURE__*/React.createElement("span", null, "Liczba go\u015Bci"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setGuests(function (g) {
          return Math.max(0, g - 1);
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("b", null, guests || '—'), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setGuests(function (g) {
          return Math.min(99, g + 1);
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }))), /*#__PURE__*/React.createElement(OSK, {
      onKey: key,
      onEnter: function onEnter() {
        return onSave({
          name: name.trim(),
          guests: guests
        });
      },
      enterLabel: "Zapisz"
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-sheet-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return onSave({
          name: name.trim(),
          guests: guests
        });
      }
    }, "Zapisz")));
  }

  // Podział rachunku: 3 sposoby w jednym oknie
  //  • Pozycjami — zaznacz, co płaci ta osoba (także część ilości); reszta zostaje na rachunku
  //  • Na osoby  — rozdziel sztuki na osoby; każda osoba płaci swój paragon, po płatności okno wraca z resztą
  //  • Po równo  — N osób płaci równe części jednego paragonu (kilka płatności, grosze z zaokrąglenia na ostatniej osobie)
  var PM = [['cash', 'Gotówka', 'banknote'], ['card', 'Karta', 'credit-card'], ['blik', 'BLIK', 'smartphone']];
  function GastroSplitSheet(_ref4) {
    var title = _ref4.title,
      lines = _ref4.lines,
      init = _ref4.init,
      onCancel = _ref4.onCancel,
      onPayItems = _ref4.onPayItems,
      onMove = _ref4.onMove,
      onPayEqual = _ref4.onPayEqual;
    var whole = function whole(l) {
      return Number.isInteger(l.qty) && l.qty > 0;
    };
    var val = function val(l, qq) {
      return NPF.round2(qq * l.price * (1 - (l.adj || 0) / 100));
    };
    var total = lineSum(lines);
    var _useState9 = useState(init && init.mode || 'items'),
      _useState0 = _slicedToArray(_useState9, 2),
      mode = _useState0[0],
      setMode = _useState0[1];
    var _useState1 = useState(false),
      _useState10 = _slicedToArray(_useState1, 2),
      ask = _useState10[0],
      setAsk = _useState10[1];
    // pozycjami
    var _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      sel = _useState12[0],
      setSel = _useState12[1];
    var q = function q(l) {
      return sel[l.id] || 0;
    };
    var setQ = function setQ(l, v) {
      return setSel(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, l.id, Math.max(0, Math.min(whole(l) ? l.qty : 1, v))));
      });
    };
    var part = function part(l) {
      return whole(l) ? q(l) : q(l) ? l.qty : 0;
    };
    var now = NPF.round2(lines.reduce(function (s, l) {
      return s + val(l, part(l));
    }, 0));
    var any = lines.some(function (l) {
      return part(l);
    });
    var splitBy = function splitBy(cnt) {
      var A = [],
        B = [];
      lines.forEach(function (l) {
        var c = cnt(l);
        if (c) A.push(_objectSpread(_objectSpread({}, l), {}, {
          id: NPF.uid(),
          qty: c
        }));
        var r = Math.round((l.qty - c) * 1000) / 1000;
        if (r) B.push(_objectSpread(_objectSpread({}, l), {}, {
          qty: r
        }));
      });
      return [A, B];
    };
    // na osoby
    var units = useMemo(function () {
      var u = [];
      lines.forEach(function (l) {
        if (whole(l) && l.qty <= 40) for (var k = 0; k < l.qty; k++) u.push({
          key: l.id + '#' + k,
          l: l,
          n: 1
        });else u.push({
          key: l.id + '#0',
          l: l,
          n: l.qty
        });
      });
      return u;
    }, [lines]);
    var _useState13 = useState(init && init.persons || 2),
      _useState14 = _slicedToArray(_useState13, 2),
      persons = _useState14[0],
      setPersons = _useState14[1];
    var _useState15 = useState(function () {
        return init && init.assign || {};
      }),
      _useState16 = _slicedToArray(_useState15, 2),
      asg = _useState16[0],
      setAsg = _useState16[1];
    var _useState17 = useState(0),
      _useState18 = _slicedToArray(_useState17, 2),
      curP = _useState18[0],
      setCurP = _useState18[1];
    var pool = units.filter(function (u) {
      return asg[u.key] == null || asg[u.key] >= persons;
    });
    var mine = function mine(p) {
      return units.filter(function (u) {
        return asg[u.key] === p;
      });
    };
    var uSum = function uSum(list) {
      return NPF.round2(list.reduce(function (s, u) {
        return s + val(u.l, u.n);
      }, 0));
    };
    var group = function group(list) {
      var m = new Map();
      list.forEach(function (u) {
        var g0 = m.get(u.l.id) || {
          l: u.l,
          n: 0,
          keys: []
        };
        g0.n += u.n;
        g0.keys.push(u.key);
        m.set(u.l.id, g0);
      });
      return _toConsumableArray(m.values());
    };
    var payPerson = function payPerson(p) {
      var my = mine(p);
      if (!my.length) return;
      var cnt = {};
      my.forEach(function (u) {
        cnt[u.l.id] = (cnt[u.l.id] || 0) + u.n;
      });
      var _splitBy = splitBy(function (l) {
          return cnt[l.id] || 0;
        }),
        _splitBy2 = _slicedToArray(_splitBy, 2),
        A = _splitBy2[0],
        B = _splitBy2[1];
      var na = {};
      B.forEach(function (l) {
        units.filter(function (u) {
          return u.l.id === l.id && asg[u.key] != null && asg[u.key] !== p && asg[u.key] < persons;
        }).forEach(function (u, k) {
          na[l.id + '#' + k] = asg[u.key] > p ? asg[u.key] - 1 : asg[u.key];
        });
      });
      onPayItems(A, B, B.length ? {
        mode: 'persons',
        persons: Math.max(2, persons - 1),
        assign: na
      } : null);
    };
    // po równo
    var _useState19 = useState(2),
      _useState20 = _slicedToArray(_useState19, 2),
      eqN = _useState20[0],
      setEqN = _useState20[1];
    var _useState21 = useState([]),
      _useState22 = _slicedToArray(_useState21, 2),
      paid = _useState22[0],
      setPaid = _useState22[1];
    var base = Math.floor(total / eqN * 100) / 100;
    var share = function share(i) {
      return i < eqN - 1 ? base : NPF.round2(total - base * (eqN - 1));
    };
    var payShare = function payShare(m) {
      var np = [].concat(_toConsumableArray(paid), [{
        method: m,
        amount: share(paid.length)
      }]);
      setPaid(np);
      if (np.length === eqN) onPayEqual(np);
    };
    var paidSum = NPF.round2(paid.reduce(function (s, p) {
      return s + p.amount;
    }, 0));
    var cancel = function cancel() {
      if (paid.length && !ask) {
        setAsk(true);
        return;
      }
      onCancel();
    };
    useKeys(function (k) {
      if (k === 'ESC') cancel();
      return true;
    }, 30);
    var PL = function PL(n) {
      return n === 1 ? 'osoba' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'osoby' : 'osób';
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-gsplit",
      onClose: null
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, [['items', 'Pozycjami'], ['persons', 'Na osoby'], ['equal', 'Po równo']].map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        l = _ref6[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: mode === k ? 'on' : '',
        disabled: paid.length > 0 && k !== 'equal',
        onClick: function onClick() {
          return setMode(k);
        }
      }, l);
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: cancel,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), ask && /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-ask"
    }, /*#__PURE__*/React.createElement("span", null, "Przyj\u0119to ju\u017C ", paid.length, " z ", eqN, " wp\u0142at (", NPF.money(paidSum), " z\u0142). Zamkni\u0119cie anuluje te wp\u0142aty."), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setAsk(false);
      }
    }, "Wr\xF3\u0107"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn red",
      onClick: onCancel
    }, "Anuluj wp\u0142aty")), mode === 'items' && /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-b"
    }, /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-gsplit-list",
      more: false
    }, lines.map(function (l) {
      var p = part(l);
      return /*#__PURE__*/React.createElement("div", {
        key: l.id,
        className: 'np-gsi' + (p ? ' on' : ''),
        onClick: function onClick() {
          return setQ(l, p ? 0 : whole(l) ? l.qty : 1);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-gsi-cb"
      }, p ? whole(l) && p < l.qty ? /*#__PURE__*/React.createElement("b", null, p) : /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      }) : ''), /*#__PURE__*/React.createElement("span", {
        className: "np-gsi-n"
      }, /*#__PURE__*/React.createElement("b", null, l.name), /*#__PURE__*/React.createElement("small", null, NPF.qty(l.qty, l.unit), " ", l.unit, " \xD7 ", NPF.money(l.price), " = ", NPF.money(val(l, l.qty)))), whole(l) && l.qty > 1 ? /*#__PURE__*/React.createElement("span", {
        className: "np-gsi-q",
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setQ(l, q(l) - 1);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "minus"
      })), /*#__PURE__*/React.createElement("b", null, q(l), " z ", l.qty), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setQ(l, q(l) + 1);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus"
      }))) : /*#__PURE__*/React.createElement("span", {
        className: "np-gsi-q none"
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-gsi-v"
      }, p ? NPF.money(val(l, p)) : '—'));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-tot"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Ca\u0142y rachunek"), /*#__PURE__*/React.createElement("b", null, NPF.money(total), " z\u0142")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Zostaje na rachunku"), /*#__PURE__*/React.createElement("b", null, NPF.money(NPF.round2(total - now)), " z\u0142")), /*#__PURE__*/React.createElement("div", {
      className: "big"
    }, /*#__PURE__*/React.createElement("span", null, "P\u0142aci teraz"), /*#__PURE__*/React.createElement("b", null, NPF.money(now)))), /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setSel(Object.fromEntries(lines.map(function (l) {
          return [l.id, whole(l) ? l.qty : 1];
        })));
      }
    }, "Wszystko"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: !any,
      onClick: function onClick() {
        return setSel({});
      }
    }, "Wyczy\u015B\u0107")), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: !any,
      onClick: function onClick() {
        var _splitBy3 = splitBy(part),
          _splitBy4 = _slicedToArray(_splitBy3, 2),
          A = _splitBy4[0],
          B = _splitBy4[1];
        onMove(A, B);
      }
    }, "Zaznaczone na nowy rachunek"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green big",
      disabled: !any,
      onClick: function onClick() {
        var _splitBy5 = splitBy(part),
          _splitBy6 = _slicedToArray(_splitBy5, 2),
          A = _splitBy6[0],
          B = _splitBy6[1];
        onPayItems(A, B, B.length ? {
          mode: 'items'
        } : null);
      }
    }, "Zap\u0142a\u0107 ", NPF.money(now), " z\u0142"))), mode === 'persons' && /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-p"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gsp-pool"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gsp-h"
    }, /*#__PURE__*/React.createElement("b", null, "Do rozdzielenia"), /*#__PURE__*/React.createElement("span", null, NPF.money(uSum(pool)), " z\u0142")), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-gsp-list",
      more: false
    }, group(pool).map(function (g0) {
      return /*#__PURE__*/React.createElement("button", {
        key: g0.l.id,
        className: "np-gsp-it",
        onClick: function onClick() {
          return setAsg(function (s) {
            return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, g0.keys[0], curP));
          });
        }
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, g0.l.name), /*#__PURE__*/React.createElement("small", null, g0.n > 1 && whole(g0.l) ? g0.n + ' szt. · dotknij = 1 szt.' : NPF.qty(g0.n, g0.l.unit) + ' ' + g0.l.unit)), /*#__PURE__*/React.createElement("em", null, NPF.money(val(g0.l, whole(g0.l) ? 1 : g0.n))));
    }), !pool.length && /*#__PURE__*/React.createElement("div", {
      className: "np-gsp-empty"
    }, "Wszystko rozdzielone")), pool.length > 0 && /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        var s = _objectSpread({}, asg);
        pool.forEach(function (u) {
          s[u.key] = curP;
        });
        setAsg(s);
      }
    }, "Reszt\u0119 dla Osoby ", curP + 1)), /*#__PURE__*/React.createElement("div", {
      className: "np-gsp-people",
      style: {
        gridTemplateColumns: "repeat(".concat(Math.min(persons, 3), ", minmax(0,1fr))")
      }
    }, Array.from({
      length: persons
    }, function (_, p) {
      var my = mine(p);
      var sum = uSum(my);
      return /*#__PURE__*/React.createElement("div", {
        key: p,
        className: 'np-gsp-card' + (p === curP ? ' on' : ''),
        onClick: function onClick() {
          return setCurP(p);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-gsp-h"
      }, /*#__PURE__*/React.createElement("b", null, "Osoba ", p + 1), /*#__PURE__*/React.createElement("span", null, NPF.money(sum), " z\u0142")), /*#__PURE__*/React.createElement("div", {
        className: "np-gsp-mine"
      }, group(my).map(function (g0) {
        return /*#__PURE__*/React.createElement("button", {
          key: g0.l.id,
          className: "np-gsp-chip",
          onClick: function onClick(e) {
            e.stopPropagation();
            setAsg(function (s) {
              var n = _objectSpread({}, s);
              delete n[g0.keys[g0.keys.length - 1]];
              return n;
            });
          }
        }, g0.n > 1 && whole(g0.l) ? g0.n + ' × ' : '', g0.l.name, /*#__PURE__*/React.createElement(Icon, {
          name: "x"
        }));
      }), !my.length && /*#__PURE__*/React.createElement("span", {
        className: "np-gsp-tip"
      }, p === curP ? 'Dotknij pozycję po lewej' : 'Dotknij, aby wybrać')), /*#__PURE__*/React.createElement("button", {
        className: "np-btn green",
        disabled: !my.length,
        onClick: function onClick(e) {
          e.stopPropagation();
          payPerson(p);
        }
      }, "Zap\u0142a\u0107 ", NPF.money(sum), " z\u0142"));
    }), persons < 6 && /*#__PURE__*/React.createElement("button", {
      className: "np-gsp-add",
      onClick: function onClick() {
        setPersons(persons + 1);
        setCurP(persons);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Osoba ", persons + 1))), mode === 'equal' && /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-e"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gse-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gse-n"
    }, /*#__PURE__*/React.createElement("button", {
      disabled: paid.length > 0 || eqN <= 2,
      onClick: function onClick() {
        return setEqN(eqN - 1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, eqN), /*#__PURE__*/React.createElement("small", null, PL(eqN))), /*#__PURE__*/React.createElement("button", {
      disabled: paid.length > 0 || eqN >= 20,
      onClick: function onClick() {
        return setEqN(eqN + 1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gse-grid"
    }, Array.from({
      length: eqN
    }, function (_, i) {
      var pd = paid[i];
      var isNow = i === paid.length;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: 'np-gse-p' + (pd ? ' paid' : isNow ? ' now' : '')
      }, /*#__PURE__*/React.createElement("small", null, "Osoba ", i + 1, pd ? ' · ' + PM.find(function (m) {
        return m[0] === pd.method;
      })[1].toLowerCase() : isNow ? ' · teraz' : ''), /*#__PURE__*/React.createElement("b", null, NPF.money(share(i))));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-tot"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Ca\u0142y rachunek"), /*#__PURE__*/React.createElement("b", null, NPF.money(total), " z\u0142")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Zap\u0142acono"), /*#__PURE__*/React.createElement("b", null, NPF.money(paidSum), " z\u0142")), /*#__PURE__*/React.createElement("div", {
      className: "big"
    }, /*#__PURE__*/React.createElement("span", null, "Osoba ", Math.min(paid.length + 1, eqN), " p\u0142aci"), /*#__PURE__*/React.createElement("b", null, NPF.money(share(Math.min(paid.length, eqN - 1)))))), /*#__PURE__*/React.createElement("div", {
      className: "np-gse-bar"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: (total ? paidSum / total * 100 : 0) + '%'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-gsplit-tip"
    }, "Jeden paragon, kilka p\u0142atno\u015Bci. Grosze z zaokr\u0105glenia dolicza si\u0119 ostatniej osobie."), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-gse-pay"
    }, PM.map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3),
        m = _ref8[0],
        l = _ref8[1],
        ic = _ref8[2];
      return /*#__PURE__*/React.createElement("button", {
        key: m,
        className: 'np-btn ' + (m === 'cash' ? 'green' : 'ink'),
        onClick: function onClick() {
          return payShare(m);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic
      }), l);
    })))));
  }

  // Zaparkowane paragony (jak „Parking” w kasie NEXT): okres, kasjer, Aktywne / Anulowane; Otwórz, Opisz, Usuń
  var PERIODS = [['today', 'Dzisiejsze'], ['week', 'Od początku tygodnia'], ['month', 'Od początku miesiąca'], ['all', 'Wszystkie'], ['range', 'Za okres']];
  var day0 = function day0(t) {
    var d = new Date(t);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  var DAY = 86400000;
  var MON = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  // Kalendarz do wyboru dnia (Od / Do)
  function MiniCal(_ref9) {
    var value = _ref9.value,
      min = _ref9.min,
      max = _ref9.max,
      onPick = _ref9.onPick,
      onClose = _ref9.onClose;
    var _useState23 = useState(function () {
        var d = new Date(value);
        return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
      }),
      _useState24 = _slicedToArray(_useState23, 2),
      m = _useState24[0],
      setM = _useState24[1];
    var d0 = new Date(m);
    var y = d0.getFullYear(),
      mo = d0.getMonth();
    var lead = (d0.getDay() + 6) % 7;
    var days = new Date(y, mo + 1, 0).getDate();
    var today = day0(Date.now());
    var cells = [];
    for (var i = 0; i < lead; i++) cells.push(null);
    for (var _i = 1; _i <= days; _i++) cells.push(new Date(y, mo, _i).getTime());
    return /*#__PURE__*/React.createElement("div", {
      className: "np-cal",
      onPointerDown: function onPointerDown(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-cal-h"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setM(new Date(y, mo - 1, 1).getTime());
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("b", null, MON[mo], " ", y), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setM(new Date(y, mo + 1, 1).getTime());
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-cal-g"
    }, ['pn', 'wt', 'śr', 'cz', 'pt', 'so', 'nd'].map(function (w) {
      return /*#__PURE__*/React.createElement("span", {
        key: w,
        className: "w"
      }, w);
    }), cells.map(function (t, i) {
      return t == null ? /*#__PURE__*/React.createElement("span", {
        key: i
      }) : /*#__PURE__*/React.createElement("button", {
        key: i,
        className: (t === value ? 'on' : '') + (t === today ? ' td' : ''),
        disabled: min != null && t < min || max != null && t > max,
        onClick: function onClick() {
          return onPick(t);
        }
      }, new Date(t).getDate());
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-cal-f"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return onPick(today);
      }
    }, "Dzisiaj"), /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: onClose
    }, "Zamknij")));
  }
  var dd = function dd(t) {
    return new Date(t).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  var hh = function hh(t) {
    return new Date(t).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  function ParkingSheet(_ref0) {
    var bills = _ref0.bills,
      cancelled = _ref0.cancelled,
      curId = _ref0.curId,
      curLines = _ref0.curLines,
      tableName = _ref0.tableName,
      onClose = _ref0.onClose,
      onOpen = _ref0.onOpen,
      onCancelBill = _ref0.onCancelBill,
      onDescribe = _ref0.onDescribe;
    var _useStored = useStored('parkPeriod', 'today'),
      _useStored2 = _slicedToArray(_useStored, 2),
      period = _useStored2[0],
      setPeriod = _useStored2[1];
    var _useState25 = useState('active'),
      _useState26 = _slicedToArray(_useState25, 2),
      status = _useState26[0],
      setStatus = _useState26[1];
    var _useState27 = useState('all'),
      _useState28 = _slicedToArray(_useState27, 2),
      who = _useState28[0],
      setWho = _useState28[1];
    var _useState29 = useState(null),
      _useState30 = _slicedToArray(_useState29, 2),
      sel = _useState30[0],
      setSel = _useState30[1];
    var _useState31 = useState(false),
      _useState32 = _slicedToArray(_useState31, 2),
      ask = _useState32[0],
      setAsk = _useState32[1];
    var _useState33 = useState(function () {
        return day0(Date.now()) - 6 * DAY;
      }),
      _useState34 = _slicedToArray(_useState33, 2),
      rFrom = _useState34[0],
      setRFrom = _useState34[1];
    var _useState35 = useState(function () {
        return day0(Date.now());
      }),
      _useState36 = _slicedToArray(_useState35, 2),
      rTo = _useState36[0],
      setRTo = _useState36[1];
    var _useState37 = useState(null),
      _useState38 = _slicedToArray(_useState37, 2),
      cal = _useState38[0],
      setCal = _useState38[1]; // 'from' | 'to'
    var to = period === 'range' ? rTo + DAY : Infinity;
    var from = function () {
      if (period === 'range') return rFrom;
      if (period === 'all') return 0;
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      if (period === 'week') d.setDate(d.getDate() - (d.getDay() + 6) % 7);
      if (period === 'month') d.setDate(1);
      return d.getTime();
    }();
    var src = status === 'active' ? bills : cancelled;
    var Lof = function Lof(b) {
      return b.id === curId ? curLines : (b.lines || []).concat(b.rest || []);
    };
    // wszystkie otwarte paragony spoza ekranu — zaparkowane i odłożone na stoliki (puste, nieopisane stoliki pomijamy)
    var inPeriod = src.filter(function (b) {
      return (b.opened || 0) >= from && (b.opened || 0) < to && (status !== 'active' || b.id === curId || Lof(b).length || b.name || b.guests);
    });
    var list = inPeriod.filter(function (b) {
      return who === 'all' || b.cashierId === who;
    }).sort(function (a, b) {
      return status === 'active' ? a.opened - b.opened : (b.cancelled || 0) - (a.cancelled || 0);
    });
    var people = _toConsumableArray(new Set(inPeriod.map(function (b) {
      return b.cashierId;
    }))).map(cashierOf).filter(Boolean);
    var sum = NPF.round2(list.reduce(function (s, b) {
      return s + lineSum(Lof(b));
    }, 0));
    var cur = list.find(function (b) {
      return b.id === sel;
    }) || null;
    useEffect(function () {
      if (sel && !cur) {
        setSel(null);
        setAsk(false);
      }
    }, [sel, cur]);
    useKeys(function (k) {
      if (k === 'ESC') {
        if (cal) setCal(null);else if (ask) setAsk(false);else onClose();
      } else if (k === 'OK' && cur && status === 'active') onOpen(cur.id);
      return true;
    }, 30);
    var nA = bills.length,
      nX = cancelled.length;
    var pl = function pl(n) {
      return n === 1 ? 'paragon' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'paragony' : 'paragonów';
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-park",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-park-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, "Zaparkowane paragony"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: status === 'active' ? 'on' : '',
      onClick: function onClick() {
        setStatus('active');
        setSel(null);
        setAsk(false);
      }
    }, "Aktywne", /*#__PURE__*/React.createElement("i", null, nA)), /*#__PURE__*/React.createElement("button", {
      className: status === 'cancelled' ? 'on' : '',
      onClick: function onClick() {
        setStatus('cancelled');
        setSel(null);
        setAsk(false);
      }
    }, "Anulowane", /*#__PURE__*/React.createElement("i", null, nX))), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-park-f"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, PERIODS.map(function (_ref1) {
      var _ref10 = _slicedToArray(_ref1, 2),
        k = _ref10[0],
        l = _ref10[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: period === k ? 'on' : '',
        onClick: function onClick() {
          setPeriod(k);
          setSel(null);
          setCal(k === 'range' ? 'from' : null);
        }
      }, l);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-park-f2"
    }, period === 'range' && /*#__PURE__*/React.createElement("div", {
      className: "np-park-range"
    }, /*#__PURE__*/React.createElement("button", {
      className: cal === 'from' ? 'on' : '',
      onClick: function onClick() {
        return setCal(cal === 'from' ? null : 'from');
      }
    }, /*#__PURE__*/React.createElement("span", null, "Od"), /*#__PURE__*/React.createElement("b", null, dd(rFrom))), /*#__PURE__*/React.createElement("button", {
      className: cal === 'to' ? 'on' : '',
      onClick: function onClick() {
        return setCal(cal === 'to' ? null : 'to');
      }
    }, /*#__PURE__*/React.createElement("span", null, "Do"), /*#__PURE__*/React.createElement("b", null, dd(rTo))), cal && /*#__PURE__*/React.createElement(MiniCal, {
      key: cal,
      value: cal === 'from' ? rFrom : rTo,
      min: cal === 'to' ? rFrom : null,
      max: cal === 'from' ? rTo : null,
      onClose: function onClose() {
        return setCal(null);
      },
      onPick: function onPick(t) {
        if (cal === 'from') setRFrom(t);else setRTo(t);
        setCal(null);
        setSel(null);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-park-who"
    }, /*#__PURE__*/React.createElement("button", {
      className: who === 'all' ? 'on' : '',
      onClick: function onClick() {
        return setWho('all');
      }
    }, "Wszyscy kasjerzy"), people.map(function (c) {
      return /*#__PURE__*/React.createElement("button", {
        key: c.id,
        className: who === c.id ? 'on' : '',
        onClick: function onClick() {
          return setWho(c.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-gw",
        style: {
          background: c.color
        }
      }, ini(c)), c.name.split(' ')[0]);
    })))), /*#__PURE__*/React.createElement("div", {
      className: "np-park-t"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-park-row hd"
    }, /*#__PURE__*/React.createElement("span", null, "Nr"), /*#__PURE__*/React.createElement("span", null, "Nazwa / opis"), /*#__PURE__*/React.createElement("span", null, "Stolik"), /*#__PURE__*/React.createElement("span", null, "Data"), /*#__PURE__*/React.createElement("span", null, "Godz."), /*#__PURE__*/React.createElement("span", null, "Kasjer"), /*#__PURE__*/React.createElement("span", {
      className: "r"
    }, "Poz."), /*#__PURE__*/React.createElement("span", {
      className: "r"
    }, "Warto\u015B\u0107")), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-park-list",
      more: false
    }, list.map(function (b) {
      var L = Lof(b);
      var c = cashierOf(b.cashierId);
      var fixed = b.table != null ? tableName(b.table) : '';
      return /*#__PURE__*/React.createElement("button", {
        key: b.id,
        className: 'np-park-row' + (b.id === sel ? ' sel' : '') + (b.id === curId ? ' cur' : ''),
        onClick: function onClick() {
          setSel(b.id === sel ? null : b.id);
          setAsk(false);
        },
        onDoubleClick: function onDoubleClick() {
          return status === 'active' && onOpen(b.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "no"
      }, b.no || '—'), /*#__PURE__*/React.createElement("span", {
        className: "nm"
      }, /*#__PURE__*/React.createElement("b", null, b.name || fixed || (b.table != null ? 'Stolik ' + b.table : 'Paragon bez opisu')), b.id === curId ? /*#__PURE__*/React.createElement("small", {
        className: "on"
      }, "na paragonie") : b.guests ? /*#__PURE__*/React.createElement("small", null, b.guests, " os.") : status === 'cancelled' ? /*#__PURE__*/React.createElement("small", null, "anulowano ", hh(b.cancelled).slice(0, 5)) : null), /*#__PURE__*/React.createElement("span", null, b.table != null ? /*#__PURE__*/React.createElement("em", {
        className: "tb"
      }, b.table) : /*#__PURE__*/React.createElement("em", {
        className: "tb no"
      }, "\u2014")), /*#__PURE__*/React.createElement("span", {
        className: "mono"
      }, dd(b.opened)), /*#__PURE__*/React.createElement("span", {
        className: "mono"
      }, hh(b.opened)), /*#__PURE__*/React.createElement("span", {
        className: "who"
      }, c && /*#__PURE__*/React.createElement("span", {
        className: "np-gw",
        style: {
          background: c.color
        }
      }, ini(c))), /*#__PURE__*/React.createElement("span", {
        className: "r mono"
      }, L.length), /*#__PURE__*/React.createElement("span", {
        className: "r mono b"
      }, NPF.money(lineSum(L))));
    }), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "np-park-empty"
    }, status === 'active' ? 'Brak zaparkowanych paragonów w tym okresie. Paragon odkładasz klawiszem Parkuj.' : 'Brak anulowanych paragonów w tym okresie.'))), ask && cur ? /*#__PURE__*/React.createElement("div", {
      className: "np-park-ask"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "circle-alert"
    }), /*#__PURE__*/React.createElement("span", null, "Anulowa\u0107 zaparkowany paragon nr ", cur.no, " na ", NPF.money(lineSum(Lof(cur))), " z\u0142? Trafi na list\u0119 Anulowane."), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setAsk(false);
      }
    }, "Nie"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn red",
      onClick: function onClick() {
        onCancelBill(cur.id);
        setAsk(false);
        setSel(null);
      }
    }, "Anuluj paragon")) : /*#__PURE__*/React.createElement("div", {
      className: "np-park-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-park-sum"
    }, list.length, " ", pl(list.length), " \xB7 razem ", /*#__PURE__*/React.createElement("b", null, NPF.money(sum), " z\u0142")), status === 'active' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "np-btn red-t",
      disabled: !cur,
      onClick: function onClick() {
        return setAsk(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Usu\u0144"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: !cur,
      onClick: function onClick() {
        return onDescribe(cur.id);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil"
    }), "Opisz"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      disabled: !cur || cur.id === curId,
      onClick: function onClick() {
        return onOpen(cur.id);
      }
    }, "Otw\xF3rz paragon")), status === 'cancelled' && /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: onClose
    }, "Wyj\u015Bcie")));
  }
  Object.assign(window, {
    GastroPage: React.memo(GastroPage),
    gastroBar: gastroBar,
    GastroDescSheet: GastroDescSheet,
    GastroSplitSheet: GastroSplitSheet,
    ParkingSheet: ParkingSheet,
    useNpSettings: useNpSettings,
    gastroLineSum: lineSum
  });
})();