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
/* TAKA KASA — plan sali: model (sale, stoliki, elementy), siatka planu, edytor planu, arkusz nazwy */
(function () {
  var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;
  var GC = 8,
    GR = 6;
  var uid = function uid() {
    return NPF.uid();
  };

  // ── model ──
  var TPL = [[2, 1, 1, 1, 2, 1], [3, 1, 1, 1, 2, 1], [5, 1, 1, 1, 4, 0], [6, 1, 1, 1, 4, 0], [7, 1, 2, 1, 6, 0], [2, 3, 2, 1, 6, 0], [5, 3, 1, 1, 4, 0], [6, 3, 1, 1, 4, 0], [8, 3, 1, 2, 4, 0], [2, 4, 1, 1, 2, 1], [3, 4, 1, 1, 2, 1], [2, 6, 1, 1, 2, 1], [3, 6, 1, 1, 2, 1], [5, 6, 1, 1, 2, 1], [6, 6, 1, 1, 2, 1]];
  function defaultRoom(count) {
    var r = {
      id: uid(),
      name: 'Sala główna',
      cols: GC,
      rows: GR,
      fx: [{
        id: uid(),
        k: 'bar',
        x: 1,
        y: 1,
        w: 1,
        h: 4,
        label: 'BAR'
      }, {
        id: uid(),
        k: 'label',
        x: 2,
        y: 5,
        w: 7,
        h: 1,
        label: 'TARAS'
      }, {
        id: uid(),
        k: 'door',
        x: 8,
        y: 6,
        w: 1,
        h: 1,
        label: 'WEJŚCIE'
      }],
      t: []
    };
    TPL.slice(0, count).forEach(function (_ref, i) {
      var _ref2 = _slicedToArray(_ref, 6),
        x = _ref2[0],
        y = _ref2[1],
        w = _ref2[2],
        h = _ref2[3],
        s = _ref2[4],
        rd = _ref2[5];
      return r.t.push({
        id: uid(),
        n: i + 1,
        name: '',
        x: x,
        y: y,
        w: w,
        h: h,
        s: s,
        round: !!rd
      });
    });
    for (var n = r.t.length + 1; n <= count; n++) {
      var c = freeCell(r, 1, 1);
      if (!c) break;
      r.t.push({
        id: uid(),
        n: n,
        name: '',
        x: c.x,
        y: c.y,
        w: 1,
        h: 1,
        s: 4,
        round: false
      });
    }
    return r;
  }
  function normPlan(raw, count) {
    if (raw && Array.isArray(raw.rooms) && raw.rooms.length) return raw;
    if (raw && Array.isArray(raw.t)) return {
      rooms: [{
        id: uid(),
        name: 'Sala główna',
        fx: (raw.fx || []).map(function (f) {
          return _objectSpread(_objectSpread({
            id: uid()
          }, f), {}, {
            k: f.k === 'zone' ? 'label' : f.k
          });
        }),
        t: raw.t.map(function (t) {
          return _objectSpread({
            id: uid(),
            name: ''
          }, t);
        })
      }]
    };
    return {
      rooms: [defaultRoom(count)]
    };
  }
  // napisy/strefy i stare ściany nie blokują pól — można na nich stawiać stoliki
  var items = function items(room) {
    return room.t.concat(room.fx.filter(function (f) {
      return f.k !== 'label' && f.k !== 'wall';
    }));
  };
  var dims = function dims(room) {
    return [room.cols || GC, room.rows || GR];
  };
  function fits(room, x, y, w, h, skipId) {
    var _dims = dims(room),
      _dims2 = _slicedToArray(_dims, 2),
      C = _dims2[0],
      Rw = _dims2[1];
    if (x < 1 || y < 1 || x + w - 1 > C || y + h - 1 > Rw) return false;
    return !items(room).some(function (o) {
      return o.id !== skipId && x < o.x + o.w && o.x < x + w && y < o.y + o.h && o.y < y + h;
    });
  }
  function freeCell(room, w, h, skipId) {
    var _dims3 = dims(room),
      _dims4 = _slicedToArray(_dims3, 2),
      C = _dims4[0],
      Rw = _dims4[1];
    for (var y = 1; y <= Rw; y++) for (var x = 1; x <= C; x++) if (fits(room, x, y, w, h, skipId)) return {
      x: x,
      y: y
    };
    return null;
  }
  var allTables = function allTables(plan) {
    return plan.rooms.flatMap(function (r) {
      return r.t;
    });
  };
  var nextNumber = function nextNumber(plan) {
    return Math.max.apply(Math, [0].concat(_toConsumableArray(allTables(plan).map(function (t) {
      return t.n;
    })))) + 1;
  };

  // ── krzesła wokół stolika ──
  function Chairs(_ref3) {
    var s = _ref3.s,
      w = _ref3.w,
      h = _ref3.h,
      round = _ref3.round;
    var out = [];
    if (round) {
      for (var i = 0; i < s; i++) {
        var a = i / s * 2 * Math.PI - Math.PI / 2;
        out.push(/*#__PURE__*/React.createElement("i", {
          key: i,
          className: "np-ch r",
          style: {
            left: "calc(50% + ".concat(Math.cos(a) * 47, "% - 9px)"),
            top: "calc(50% + ".concat(Math.sin(a) * 47, "% - 3.5px)"),
            transform: "rotate(".concat(a * 180 / Math.PI + 90, "deg)")
          }
        }));
      }
      return out;
    }
    var put = function put(n, side) {
      for (var _i = 0; _i < n; _i++) {
        var p = (_i + 1) / (n + 1) * 100 + '%';
        var hz = side === 't' || side === 'b';
        out.push(/*#__PURE__*/React.createElement("i", {
          key: side + _i,
          className: 'np-ch ' + (hz ? 'hz' : 'vt'),
          style: hz ? _defineProperty({
            left: "calc(".concat(p, " - 9px)")
          }, side === 't' ? 'top' : 'bottom', 1) : _defineProperty({
            top: "calc(".concat(p, " - 9px)")
          }, side === 'l' ? 'left' : 'right', 1)
        }));
      }
    };
    if (w === h && s === 4) {
      put(1, 't');
      put(1, 'b');
      put(1, 'l');
      put(1, 'r');
    } else if (w === h && s > 4) {
      var _a = Math.ceil(s / 4);
      put(_a, 't');
      put(_a, 'b');
      put(Math.ceil((s - 2 * _a) / 2), 'l');
      put(Math.floor((s - 2 * _a) / 2), 'r');
    } else if (h > w) {
      put(Math.ceil(s / 2), 'l');
      put(Math.floor(s / 2), 'r');
    } else {
      put(Math.ceil(s / 2), 't');
      put(Math.floor(s / 2), 'b');
    }
    return out;
  }

  // ── siatka planu (sprzedaż i edycja) ──
  function PlanGrid(_ref6) {
    var room = _ref6.room,
      edit = _ref6.edit,
      selId = _ref6.selId,
      dragId = _ref6.dragId,
      preview = _ref6.preview,
      tInfo = _ref6.tInfo,
      onItemDown = _ref6.onItemDown,
      onItemTap = _ref6.onItemTap,
      onCellTap = _ref6.onCellTap,
      gridRef = _ref6.gridRef;
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-fp' + (edit ? ' edit' : ''),
      ref: gridRef,
      style: {
        gridTemplateColumns: "repeat(".concat(dims(room)[0], ", minmax(0,1fr))"),
        gridTemplateRows: "repeat(".concat(dims(room)[1], ", minmax(0,1fr))")
      }
    }, !room.t.length && !room.fx.length && /*#__PURE__*/React.createElement("div", {
      className: "np-fp-empty"
    }, edit ? 'Pusta sala — przeciągnij stoliki z palety po lewej' : 'Pusta sala — dodaj stoliki w edycji planu'), edit && Array.from({
      length: dims(room)[0] * dims(room)[1]
    }, function (_, i) {
      var C = dims(room)[0];
      var x = i % C + 1,
        y = Math.floor(i / C) + 1;
      return /*#__PURE__*/React.createElement("button", {
        key: 'c' + i,
        className: "np-fp-cell",
        style: {
          gridColumn: x,
          gridRow: y
        },
        onClick: function onClick() {
          return onCellTap(x, y);
        }
      });
    }), room.fx.filter(function (f) {
      return f.k !== 'wall';
    }).map(function (f) {
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        className: 'np-fx ' + f.k + (f.id === selId ? ' sel' : '') + (f.id === dragId ? ' drag' : ''),
        style: {
          gridColumn: "".concat(f.x, " / span ").concat(f.w),
          gridRow: "".concat(f.y, " / span ").concat(f.h)
        },
        onPointerDown: edit ? function (e) {
          return onItemDown(e, f);
        } : undefined,
        onClick: edit ? function () {
          return onItemTap(f);
        } : undefined
      }, f.k === 'wall' ? '' : f.label);
    }), room.t.map(function (t) {
      var i = !edit && tInfo ? tInfo(t) : null;
      var cls = i ? i.cls : 'free';
      var body = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Chairs, {
        s: t.s,
        w: t.w,
        h: t.h,
        round: t.round
      }), /*#__PURE__*/React.createElement("span", {
        className: 'np-ftb ' + cls + (t.round ? ' round' : '')
      }, /*#__PURE__*/React.createElement("b", null, t.n), (i ? i.name : t.name) && /*#__PURE__*/React.createElement("small", null, i ? i.name : t.name), i && i.sum != null && /*#__PURE__*/React.createElement("em", null, NPF.money(i.sum)), edit && /*#__PURE__*/React.createElement("small", {
        className: "np-ftb-s"
      }, t.s, " os.")), i && i.badge);
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        className: 'np-fi' + (t.round ? ' round' : '') + (i && i.busy ? ' busy' : '') + (t.id === selId ? ' sel' : '') + (t.id === dragId ? ' drag' : ''),
        style: {
          gridColumn: "".concat(t.x, " / span ").concat(t.w),
          gridRow: "".concat(t.y, " / span ").concat(t.h)
        },
        onPointerDown: edit ? function (e) {
          return onItemDown(e, t);
        } : undefined,
        onClick: function onClick() {
          return onItemTap(t);
        }
      }, t.round ? /*#__PURE__*/React.createElement("span", {
        className: "np-rnd"
      }, body) : body);
    }), preview && preview.x != null && /*#__PURE__*/React.createElement("div", {
      className: 'np-fp-prev' + (preview.ok ? '' : ' bad'),
      style: {
        gridColumn: "".concat(preview.x, " / span ").concat(preview.w),
        gridRow: "".concat(preview.y, " / span ").concat(preview.h)
      }
    }));
  }

  // ── arkusz tekstu (nazwa stolika, sali, napis) ──
  function GastroTextSheet(_ref7) {
    var title = _ref7.title,
      value = _ref7.value,
      _ref7$placeholder = _ref7.placeholder,
      placeholder = _ref7$placeholder === void 0 ? 'Wpisz nazwę' : _ref7$placeholder,
      _ref7$sugg = _ref7.sugg,
      sugg = _ref7$sugg === void 0 ? [] : _ref7$sugg,
      _ref7$max = _ref7.max,
      max = _ref7$max === void 0 ? 24 : _ref7$max,
      onCancel = _ref7.onCancel,
      onSave = _ref7.onSave;
    var _useState = useState(value || ''),
      _useState2 = _slicedToArray(_useState, 2),
      v = _useState2[0],
      setV = _useState2[1];
    useKeys(function (k) {
      if (k === 'ESC') onCancel();
      return true;
    }, 60);
    var key = function key(k) {
      return setV(function (s) {
        return k === 'BACK' ? s.slice(0, -1) : k === 'CLEAR' ? '' : (s + k).slice(0, max);
      });
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-gdesc",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-amount-title"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "np-gdesc-fld"
    }, v || /*#__PURE__*/React.createElement("span", {
      className: "ph"
    }, placeholder), /*#__PURE__*/React.createElement("i", null)), sugg.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-gdesc-sugg"
    }, sugg.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s,
        onClick: function onClick() {
          return setV(s);
        }
      }, s);
    })), /*#__PURE__*/React.createElement(OSK, {
      onKey: key,
      onEnter: function onEnter() {
        return onSave(v.trim());
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
        return onSave(v.trim());
      }
    }, "Zapisz")));
  }

  // ── edytor planu sali ──
  var PAL = [{
    key: 't2',
    label: 'Stolik 2 os.',
    ico: 'r',
    t: {
      w: 1,
      h: 1,
      s: 2,
      round: true
    }
  }, {
    key: 't4',
    label: 'Stolik 4 os.',
    ico: 'q',
    t: {
      w: 1,
      h: 1,
      s: 4,
      round: false
    }
  }, {
    key: 't6',
    label: 'Stolik 6 os.',
    ico: 'l',
    t: {
      w: 2,
      h: 1,
      s: 6,
      round: false
    }
  }, {
    key: 't8',
    label: 'Stół 8 os.',
    ico: 'q2',
    t: {
      w: 2,
      h: 2,
      s: 8,
      round: false
    }
  }, {
    key: 'bar',
    label: 'Bar / lada',
    ico: 'b',
    f: {
      k: 'bar',
      w: 2,
      h: 1,
      label: 'BAR'
    }
  }, {
    key: 'door',
    label: 'Wejście',
    ico: 'd',
    f: {
      k: 'door',
      w: 1,
      h: 1,
      label: 'WEJŚCIE'
    }
  }, {
    key: 'label',
    label: 'Napis / strefa',
    ico: 'a',
    f: {
      k: 'label',
      w: 3,
      h: 1,
      label: 'STREFA'
    }
  }];
  var PBY = Object.fromEntries(PAL.map(function (p) {
    return [p.key, p];
  }));
  var SIZES = [[1, 1], [2, 1], [1, 2], [2, 2]];
  var FX_NAME = {
    bar: 'Bar / lada',
    wall: 'Ściana',
    door: 'Wejście',
    label: 'Napis / strefa'
  };
  var TSUGG = ['Okno', 'Loża', 'Taras', 'Kominek', 'Ogród', 'VIP', 'Scena'];
  function PlanEditor(_ref8) {
    var p0 = _ref8.plan,
      _ref8$startRoom = _ref8.startRoom,
      startRoom = _ref8$startRoom === void 0 ? 0 : _ref8$startRoom,
      _ref8$busy = _ref8.busy,
      busy = _ref8$busy === void 0 ? {} : _ref8$busy,
      onCancel = _ref8.onCancel,
      onSave = _ref8.onSave,
      ui = _ref8.ui;
    var _useState3 = useState(function () {
        return JSON.parse(JSON.stringify(p0));
      }),
      _useState4 = _slicedToArray(_useState3, 2),
      plan = _useState4[0],
      setPlanRaw = _useState4[1];
    var hist = useRef([]);
    var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      bump = _useState6[1];
    var setPlan = function setPlan(np) {
      hist.current.push(plan);
      if (hist.current.length > 50) hist.current.shift();
      setPlanRaw(np);
    };
    var undo = function undo() {
      var h = hist.current.pop();
      if (h) {
        setPlanRaw(h);
        bump(function (x) {
          return x + 1;
        });
      }
    };
    var _useState7 = useState(Math.min(startRoom, p0.rooms.length - 1)),
      _useState8 = _slicedToArray(_useState7, 2),
      ri = _useState8[0],
      setRi = _useState8[1];
    var room = plan.rooms[Math.min(ri, plan.rooms.length - 1)];
    var roomRef = useRef(room);
    roomRef.current = room;
    var _useState9 = useState(null),
      _useState0 = _slicedToArray(_useState9, 2),
      sel = _useState0[0],
      setSel = _useState0[1];
    var _useState1 = useState(null),
      _useState10 = _slicedToArray(_useState1, 2),
      tool = _useState10[0],
      setTool = _useState10[1];
    var _useState11 = useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      drag = _useState12[0],
      setDrag = _useState12[1];
    var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      txt = _useState14[0],
      setTxt = _useState14[1]; // { title, value, sugg, save }
    var gridRef = useRef(null);
    var dRef = useRef(null);
    var noClick = useRef(false);
    var dirty = hist.current.length > 0;
    var selT = room.t.find(function (t) {
      return t.id === sel;
    }) || null;
    var selF = !selT ? room.fx.find(function (f) {
      return f.id === sel;
    }) || null : null;
    var updRoom = function updRoom(fn) {
      return setPlan(_objectSpread(_objectSpread({}, plan), {}, {
        rooms: plan.rooms.map(function (r) {
          return r.id === room.id ? fn(r) : r;
        })
      }));
    };
    var updItem = function updItem(id, patch) {
      return updRoom(function (r) {
        return _objectSpread(_objectSpread({}, r), {}, {
          t: r.t.map(function (t) {
            return t.id === id ? _objectSpread(_objectSpread({}, t), patch) : t;
          }),
          fx: r.fx.map(function (f) {
            return f.id === id ? _objectSpread(_objectSpread({}, f), patch) : f;
          })
        });
      });
    };
    var make = function make(key, x, y) {
      var p = PBY[key];
      return p.t ? _objectSpread({
        id: uid(),
        n: nextNumber(plan),
        name: '',
        x: x,
        y: y
      }, p.t) : _objectSpread({
        id: uid(),
        x: x,
        y: y
      }, p.f);
    };
    var add = function add(it) {
      updRoom(function (r) {
        return 'n' in it ? _objectSpread(_objectSpread({}, r), {}, {
          t: [].concat(_toConsumableArray(r.t), [it])
        }) : _objectSpread(_objectSpread({}, r), {}, {
          fx: [].concat(_toConsumableArray(r.fx), [it])
        });
      });
      setSel(it.id);
    };
    var cellAt = function cellAt(cx, cy) {
      var el = gridRef.current;
      if (!el) return null;
      var r = el.getBoundingClientRect();
      if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return null;
      var _dims5 = dims(roomRef.current),
        _dims6 = _slicedToArray(_dims5, 2),
        C = _dims6[0],
        Rw = _dims6[1];
      return {
        x: Math.min(C, Math.max(1, Math.floor((cx - r.left) / r.width * C) + 1)),
        y: Math.min(Rw, Math.max(1, Math.floor((cy - r.top) / r.height * Rw) + 1))
      };
    };
    var startDrag = function startDrag(e, d) {
      if (e.button && e.button > 0) return;
      var sx = e.clientX,
        sy = e.clientY;
      var on = false;
      var move = function move(ev) {
        if (!on && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8) return;
        on = true;
        var c = cellAt(ev.clientX, ev.clientY);
        var _dims7 = dims(roomRef.current),
          _dims8 = _slicedToArray(_dims7, 2),
          C = _dims8[0],
          Rw = _dims8[1];
        var nd = _objectSpread(_objectSpread({}, d), {}, {
          x: c ? Math.max(1, Math.min(C - d.w + 1, c.x - d.ox)) : null,
          y: c ? Math.max(1, Math.min(Rw - d.h + 1, c.y - d.oy)) : null
        });
        nd.ok = nd.x != null && fits(roomRef.current, nd.x, nd.y, d.w, d.h, d.id);
        dRef.current = nd;
        setDrag(nd);
      };
      var _up = function up() {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', _up);
        window.removeEventListener('pointercancel', _up);
        var nd = dRef.current;
        dRef.current = null;
        setDrag(null);
        if (!on) return;
        noClick.current = true;
        setTimeout(function () {
          noClick.current = false;
        }, 60);
        if (!nd || nd.x == null) return;
        if (!nd.ok) {
          ui.say('To miejsce jest zajęte', 'err', 'circle-alert');
          return;
        }
        if (nd.mode === 'move') {
          updItem(nd.id, {
            x: nd.x,
            y: nd.y
          });
          setSel(nd.id);
        } else add(make(nd.key, nd.x, nd.y));
        setTool(null);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', _up);
      window.addEventListener('pointercancel', _up);
    };
    var itemDown = function itemDown(e, it) {
      var c = cellAt(e.clientX, e.clientY) || {
        x: it.x,
        y: it.y
      };
      startDrag(e, {
        mode: 'move',
        id: it.id,
        w: it.w,
        h: it.h,
        ox: c.x - it.x,
        oy: c.y - it.y
      });
    };
    var palDown = function palDown(e, p) {
      var s = p.t || p.f;
      startDrag(e, {
        mode: 'new',
        key: p.key,
        id: null,
        w: s.w,
        h: s.h,
        ox: 0,
        oy: 0
      });
    };
    var itemTap = function itemTap(it) {
      if (noClick.current) return;
      setTool(null);
      setSel(sel === it.id ? null : it.id);
    };
    var cellTap = function cellTap(x, y) {
      if (tool) {
        var s = PBY[tool].t || PBY[tool].f;
        if (!fits(room, x, y, s.w, s.h)) {
          ui.say('Za mało miejsca w tym polu', 'err', 'circle-alert');
          return;
        }
        add(make(tool, x, y));
        setTool(null);
        return;
      }
      var it = selT || selF;
      if (it) {
        if (!fits(room, x, y, it.w, it.h, it.id)) {
          ui.say('To miejsce jest zajęte', 'err', 'circle-alert');
          return;
        }
        updItem(it.id, {
          x: x,
          y: y
        });
        return;
      }
      setSel(null);
    };
    var resize = function resize(it, w, h) {
      if (!fits(room, it.x, it.y, w, h, it.id)) {
        var c = freeCell(room, w, h, it.id);
        if (!c) {
          ui.say('Brak miejsca na ten rozmiar', 'err', 'circle-alert');
          return;
        }
        updItem(it.id, _objectSpread({
          w: w,
          h: h,
          x: c.x,
          y: c.y
        }, w !== h && it.round ? {
          round: false
        } : {}));
        ui.say('Przesunięto w wolne miejsce', 'info', 'info');
        return;
      }
      updItem(it.id, _objectSpread({
        w: w,
        h: h
      }, w !== h && it.round ? {
        round: false
      } : {}));
    };
    var delItem = function delItem() {
      if (selT && busy[selT.n]) {
        ui.say("Stolik ".concat(selT.n, " ma otwarty rachunek"), 'err', 'circle-alert');
        return;
      }
      updRoom(function (r) {
        return _objectSpread(_objectSpread({}, r), {}, {
          t: r.t.filter(function (t) {
            return t.id !== sel;
          }),
          fx: r.fx.filter(function (f) {
            return f.id !== sel;
          })
        });
      });
      setSel(null);
    };
    var dup = function dup() {
      var it = selT || selF;
      var c = freeCell(room, it.w, it.h);
      if (!c) {
        ui.say('Brak wolnego miejsca na planie', 'err', 'circle-alert');
        return;
      }
      add(_objectSpread(_objectSpread({}, it), {}, {
        id: uid(),
        x: c.x,
        y: c.y
      }, selT ? {
        n: nextNumber(plan)
      } : {}));
    };
    var setNumber = function setNumber() {
      return ui.amount({
        title: 'Numer stolika',
        desc: selT.name || "Stolik ".concat(selT.n),
        mode: 'digits',
        maxLen: 3,
        initial: String(selT.n),
        suffix: '',
        confirmLabel: 'Zapisz',
        validate: function validate(v) {
          return !(+v > 0) ? 'Numer musi być większy od zera' : allTables(plan).some(function (t) {
            return t.n === +v && t.id !== selT.id;
          }) ? "Numer ".concat(+v, " jest ju\u017C u\u017Cywany") : busy[selT.n] && +v !== selT.n ? 'Stolik ma otwarty rachunek — najpierw go zamknij' : null;
        },
        onConfirm: function onConfirm(v) {
          ui.close();
          updItem(selT.id, {
            n: +v
          });
        }
      });
    };
    var MAXR = 8;
    var addRoom = function addRoom() {
      if (plan.rooms.length >= MAXR) {
        ui.say('Maksymalnie ' + MAXR + ' sal', 'err', 'circle-alert');
        return;
      }
      var r = {
        id: uid(),
        name: 'Sala ' + (plan.rooms.length + 1),
        cols: GC,
        rows: GR,
        fx: [],
        t: []
      };
      setPlan(_objectSpread(_objectSpread({}, plan), {}, {
        rooms: [].concat(_toConsumableArray(plan.rooms), [r])
      }));
      setRi(plan.rooms.length);
      setSel(null);
      setTool(null);
    };
    var dupRoom = function dupRoom() {
      if (plan.rooms.length >= MAXR) {
        ui.say('Maksymalnie ' + MAXR + ' sal', 'err', 'circle-alert');
        return;
      }
      var n = nextNumber(plan);
      var r = _objectSpread(_objectSpread({}, room), {}, {
        id: uid(),
        name: room.name + ' (kopia)',
        fx: room.fx.map(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            id: uid()
          });
        }),
        t: room.t.slice().sort(function (a, b) {
          return a.n - b.n;
        }).map(function (t) {
          return _objectSpread(_objectSpread({}, t), {}, {
            id: uid(),
            n: n++
          });
        })
      });
      var rooms = plan.rooms.slice();
      rooms.splice(ri + 1, 0, r);
      setPlan(_objectSpread(_objectSpread({}, plan), {}, {
        rooms: rooms
      }));
      setRi(ri + 1);
      setSel(null);
      ui.say(r.t.length ? "Sala skopiowana \xB7 stoliki ".concat(r.t[0].n, "\u2013").concat(r.t[r.t.length - 1].n) : 'Sala skopiowana', 'ok', 'check');
    };
    var moveRoom = function moveRoom(d) {
      var j = ri + d;
      if (j < 0 || j >= plan.rooms.length) return;
      var rooms = plan.rooms.slice();
      var _ref9 = [rooms[j], rooms[ri]];
      rooms[ri] = _ref9[0];
      rooms[j] = _ref9[1];
      setPlan(_objectSpread(_objectSpread({}, plan), {}, {
        rooms: rooms
      }));
      setRi(j);
    };
    var setDims = function setDims(c, r) {
      if (room.t.concat(room.fx).some(function (o) {
        return o.x + o.w - 1 > c || o.y + o.h - 1 > r;
      })) {
        ui.say('Część elementów wychodzi poza nowy rozmiar — przesuń je bliżej lewego górnego rogu', 'err', 'circle-alert');
        return;
      }
      updRoom(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          cols: c,
          rows: r
        });
      });
    };
    var delRoom = function delRoom() {
      if (plan.rooms.length < 2) {
        ui.say('Plan musi mieć co najmniej jedną salę', 'err', 'circle-alert');
        return;
      }
      if (room.t.some(function (t) {
        return busy[t.n];
      })) {
        ui.say('W tej sali są stoliki z otwartymi rachunkami', 'err', 'circle-alert');
        return;
      }
      var go = function go() {
        setPlan(_objectSpread(_objectSpread({}, plan), {}, {
          rooms: plan.rooms.filter(function (r) {
            return r.id !== room.id;
          })
        }));
        setRi(Math.max(0, ri - 1));
        setSel(null);
      };
      if (!room.t.length && !room.fx.length) {
        go();
        return;
      }
      ui.dialog({
        tone: 'warning',
        title: "Usun\u0105\u0107 sal\u0119 \u201E".concat(room.name, "\u201D?"),
        desc: "Zostan\u0105 usuni\u0119te: ".concat(room.t.length, " stolik\xF3w i ").concat(room.fx.length, " element\xF3w planu. Mo\u017Cesz to cofn\u0105\u0107 przyciskiem Cofnij przed zapisem."),
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: ui.close
        }, {
          label: 'Usuń salę',
          tone: 'red',
          primary: true,
          onClick: function onClick() {
            ui.close();
            go();
          }
        }]
      });
    };
    var renameRoom = function renameRoom() {
      return setTxt({
        title: 'Nazwa sali',
        value: room.name,
        sugg: ['Sala główna', 'Taras', 'Ogródek', 'Antresola', 'Bar', 'Sala VIP'],
        placeholder: 'Nazwa sali',
        save: function save(v) {
          return v && updRoom(function (r) {
            return _objectSpread(_objectSpread({}, r), {}, {
              name: v
            });
          });
        }
      });
    };
    var cancel = function cancel() {
      if (!dirty) {
        onCancel();
        return;
      }
      ui.dialog({
        tone: 'warning',
        title: 'Odrzucić zmiany w planie?',
        desc: 'Wprowadzone zmiany nie zostaną zapisane.',
        actions: [{
          label: 'Wróć do edycji',
          cancel: true,
          onClick: ui.close
        }, {
          label: 'Odrzuć',
          tone: 'red',
          primary: true,
          onClick: function onClick() {
            ui.close();
            onCancel();
          }
        }]
      });
    };
    useKeys(function (k) {
      if (txt) return false;
      if (k === 'ESC') {
        if (tool) setTool(null);else if (sel) setSel(null);else cancel();
      } else if (k === 'OK') onSave(plan);
      return true;
    }, 25);
    var seats = room.t.reduce(function (s, t) {
      return s + t.s;
    }, 0);
    var it = selT || selF;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-pled"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pled-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pled-rooms"
    }, plan.rooms.map(function (r, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: r.id,
        className: r.id === room.id ? 'on' : '',
        onClick: function onClick() {
          if (r.id === room.id) {
            renameRoom();
            return;
          }
          setRi(i);
          setSel(null);
          setTool(null);
        }
      }, r.name, /*#__PURE__*/React.createElement("small", null, r.t.length), r.id === room.id && /*#__PURE__*/React.createElement(Icon, {
        name: "pencil"
      }));
    }), /*#__PURE__*/React.createElement("button", {
      className: "add",
      onClick: addRoom
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Sala")), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-act"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      disabled: !dirty,
      onClick: undo
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "undo-2"
    }), "Cofnij"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: cancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return onSave(plan);
      }
    }, "Zapisz plan"))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pled-pal"
    }, /*#__PURE__*/React.createElement("h6", null, "Przeci\u0105gnij na plan"), PAL.map(function (p) {
      return /*#__PURE__*/React.createElement("button", {
        key: p.key,
        className: 'np-pled-pe' + (tool === p.key ? ' on' : ''),
        onPointerDown: function onPointerDown(e) {
          return palDown(e, p);
        },
        onClick: function onClick() {
          if (noClick.current) return;
          setSel(null);
          setTool(tool === p.key ? null : p.key);
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: 'pi-' + p.ico
      }), p.label);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-plan"
    }, /*#__PURE__*/React.createElement(PlanGrid, {
      room: room,
      edit: true,
      selId: sel,
      dragId: drag && drag.mode === 'move' ? drag.id : null,
      preview: drag,
      onItemDown: itemDown,
      onItemTap: itemTap,
      onCellTap: cellTap,
      gridRef: gridRef
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-hint"
    }, tool ? "Dotknij wolne pole, aby postawi\u0107: ".concat(PBY[tool].label) : it ? 'Przeciągnij element albo dotknij wolne pole, aby go przesunąć' : 'Przeciągnij element z palety na plan · dotknij stolik, aby zmienić jego dane')), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-props"
    }, selT && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h6", null, /*#__PURE__*/React.createElement("span", null, "Stolik ", selT.n), busy[selT.n] && /*#__PURE__*/React.createElement("em", null, "otwarty rachunek")), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-pled-f",
      onClick: setNumber
    }, /*#__PURE__*/React.createElement("span", null, "Numer"), /*#__PURE__*/React.createElement("b", {
      className: "mono"
    }, selT.n)), /*#__PURE__*/React.createElement("button", {
      className: "np-pled-f",
      onClick: function onClick() {
        return setTxt({
          title: "Stolik ".concat(selT.n, " \xB7 sta\u0142a nazwa"),
          value: selT.name,
          sugg: TSUGG,
          placeholder: 'np. Okno, Loża',
          save: function save(v) {
            return updItem(selT.id, {
              name: v
            });
          }
        });
      }
    }, /*#__PURE__*/React.createElement("span", null, "Sta\u0142a nazwa"), /*#__PURE__*/React.createElement("b", null, selT.name || '—'))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Rozmiar (pola)"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg full"
    }, SIZES.map(function (_ref0) {
      var _ref1 = _slicedToArray(_ref0, 2),
        w = _ref1[0],
        h = _ref1[1];
      return /*#__PURE__*/React.createElement("button", {
        key: w + 'x' + h,
        className: selT.w === w && selT.h === h ? 'on' : '',
        onClick: function onClick() {
          return resize(selT, w, h);
        }
      }, w, " \xD7 ", h);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Kszta\u0142t"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg full"
    }, /*#__PURE__*/React.createElement("button", {
      className: !selT.round ? 'on' : '',
      onClick: function onClick() {
        return updItem(selT.id, {
          round: false
        });
      }
    }, selT.w === selT.h ? 'Kwadrat' : 'Prostokąt'), /*#__PURE__*/React.createElement("button", {
      className: selT.round ? 'on' : '',
      disabled: selT.w !== selT.h,
      onClick: function onClick() {
        return updItem(selT.id, {
          round: true
        });
      }
    }, "Okr\u0105g\u0142y"))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Miejsca"), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-step"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return updItem(selT.id, {
          s: Math.max(1, selT.s - 1)
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("b", null, selT.s), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return updItem(selT.id, {
          s: Math.min(16, selT.s + 1)
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }))))), selF && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h6", null, /*#__PURE__*/React.createElement("span", null, FX_NAME[selF.k])), selF.k !== 'wall' && /*#__PURE__*/React.createElement("button", {
      className: "np-pled-f",
      onClick: function onClick() {
        return setTxt({
          title: FX_NAME[selF.k] + ' · napis',
          value: selF.label,
          sugg: selF.k === 'label' ? ['TARAS', 'OGRÓDEK', 'SALA', 'ANTRESOLA', 'PALARNIA'] : [],
          placeholder: 'Napis na planie',
          save: function save(v) {
            return updItem(selF.id, {
              label: v.toUpperCase()
            });
          }
        });
      }
    }, /*#__PURE__*/React.createElement("span", null, "Napis"), /*#__PURE__*/React.createElement("b", null, selF.label || '—')), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Szeroko\u015B\u0107 (pola)"), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-step"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return selF.w > 1 && resize(selF, selF.w - 1, selF.h);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("b", null, selF.w), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return resize(selF, selF.w + 1, selF.h);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Wysoko\u015B\u0107 (pola)"), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-step"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return selF.h > 1 && resize(selF, selF.w, selF.h - 1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("b", null, selF.h), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return resize(selF, selF.w, selF.h + 1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }))))), it && /*#__PURE__*/React.createElement("div", {
      className: "np-pled-2 end"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: dup
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Duplikuj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn red-t",
      onClick: delItem
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Usu\u0144")), !it && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h6", null, /*#__PURE__*/React.createElement("span", null, "Sala ", ri + 1, " z ", plan.rooms.length)), /*#__PURE__*/React.createElement("button", {
      className: "np-pled-f",
      onClick: renameRoom
    }, /*#__PURE__*/React.createElement("span", null, "Nazwa"), /*#__PURE__*/React.createElement("b", null, room.name)), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Rozmiar siatki (kolumny \xD7 rz\u0119dy)"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg full"
    }, [[6, 4], [8, 6], [10, 7]].map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        c = _ref11[0],
        r = _ref11[1];
      return /*#__PURE__*/React.createElement("button", {
        key: c,
        className: dims(room)[0] === c && dims(room)[1] === r ? 'on' : '',
        onClick: function onClick() {
          return setDims(c, r);
        }
      }, c, " \xD7 ", r);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-f0"
    }, /*#__PURE__*/React.createElement("span", null, "Kolejno\u015B\u0107 na kasie"), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: ri === 0,
      onClick: function onClick() {
        return moveRoom(-1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), "Wcze\u015Bniej"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      disabled: ri === plan.rooms.length - 1,
      onClick: function onClick() {
        return moveRoom(1);
      }
    }, "P\xF3\u017Aniej", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-stats"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, room.t.length), /*#__PURE__*/React.createElement("span", null, "stolik\xF3w")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, seats), /*#__PURE__*/React.createElement("span", null, "miejsc")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, allTables(plan).length), /*#__PURE__*/React.createElement("span", null, "w lokalu"))), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-tip"
    }, "Dotknij nazw\u0119 sali u g\xF3ry, aby j\u0105 zmieni\u0107. Numery stolik\xF3w s\u0105 wsp\xF3lne dla wszystkich sal; stolika z otwartym rachunkiem nie mo\u017Cna usun\u0105\u0107 ani przenumerowa\u0107."), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-pled-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: dupRoom
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Duplikuj sal\u0119"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn red-t",
      onClick: delRoom
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Usu\u0144 sal\u0119"))))), txt && /*#__PURE__*/React.createElement(GastroTextSheet, {
      title: txt.title,
      value: txt.value,
      sugg: txt.sugg,
      placeholder: txt.placeholder,
      onCancel: function onCancel() {
        return setTxt(null);
      },
      onSave: function onSave(v) {
        txt.save(v);
        setTxt(null);
      }
    }));
  }
  Object.assign(window, {
    NP_PLAN: {
      GC: GC,
      GR: GR,
      normPlan: normPlan,
      fits: fits,
      freeCell: freeCell,
      allTables: allTables
    },
    PlanGrid: PlanGrid,
    PlanEditor: PlanEditor,
    GastroTextSheet: GastroTextSheet
  });
})();