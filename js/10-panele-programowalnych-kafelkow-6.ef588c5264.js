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
/* KASA NEXT PRO — panele programowalnych kafelków (6×5, przewijane na boki) */
(function () {
  var _React = React,
    useState = _React.useState,
    useRef = _React.useRef;
  var _NP_DATA = NP_DATA,
    PRODUCTS = _NP_DATA.PRODUCTS,
    FUNCS = _NP_DATA.FUNCS,
    TILE_COLORS = _NP_DATA.TILE_COLORS,
    GROUPS = _NP_DATA.GROUPS;
  var PBY = Object.fromEntries(PRODUCTS.map(function (p) {
    return [p.plu, p];
  }));
  var FBY = Object.fromEntries(FUNCS.map(function (f) {
    return [f.id, f];
  }));
  function tileInfo(slot) {
    if (!slot) return null;
    var ico = slot.icon === 'none' ? null : slot.icon;
    if (slot.t === 'p') {
      var p = NP_DB.get(slot.id);
      return p ? {
        kind: 'p',
        p: p,
        label: p.name,
        icon: slot.icon === 'none' ? null : ico || NP_DB.pictOf(p),
        color: slot.color || 'gray',
        img: slot.useImg && p.img && window.NP_IMG && NP_IMG.on() ? p.img : null
      } : null;
    }
    var f = FBY[slot.id];
    if (!f) return null;
    if (f.arg === 'group' && slot.arg) {
      var g = qaGroup(slot.arg);
      if (g) return {
        kind: 'f',
        f: f,
        label: g.label,
        icon: g.icon,
        color: slot.color || f.color,
        qa: true
      };
    }
    return {
      kind: 'f',
      f: f,
      label: f.tile || f.name,
      icon: f.icon,
      color: slot.color || f.color
    };
  }
  // szybki asortyment: 'favs' = Ulubione, inaczej id asortymentu
  function qaGroup(arg) {
    if (arg === 'favs') return {
      id: 'favs',
      label: 'Ulubione',
      icon: 'star'
    };
    return GROUPS.find(function (g) {
      return g.id === arg;
    }) || null;
  }
  var Tile = React.memo(function Tile(_ref) {
    var slot = _ref.slot,
      showF = _ref.showF,
      pv = _ref.pv;
    var info = tileInfo(slot);
    if (!info) return /*#__PURE__*/React.createElement("div", {
      className: "np-tile t-empty"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "np-tile c-".concat(info.color, " k-").concat(info.kind).concat(info.icon ? ' has-ico' : '').concat(info.img ? ' has-img' : '').concat(slot.w > 1 ? ' big' : '').concat(slot.h > 1 ? ' tall' : '')
    }, info.img && /*#__PURE__*/React.createElement("img", {
      className: "np-tile-img",
      src: info.img,
      alt: "",
      loading: "lazy",
      draggable: "false",
      onError: function onError(e) {
        var t = e.currentTarget.parentNode;
        e.currentTarget.style.display = 'none';
        if (t) t.classList.remove('has-img');
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-tile-top"
    }, info.icon && !info.img ? /*#__PURE__*/React.createElement(Icon, {
      name: info.icon,
      className: "np-tile-ico"
    }) : /*#__PURE__*/React.createElement("span", null), info.qa ? /*#__PURE__*/React.createElement("span", {
      className: "np-tile-qa"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layout-grid"
    })) : showF && info.kind === 'f' ? /*#__PURE__*/React.createElement("span", {
      className: "np-tile-f"
    }, "F", info.f.f) : null), /*#__PURE__*/React.createElement("div", {
      className: "np-tile-label"
    }, /*#__PURE__*/React.createElement("span", null, info.label)), info.kind === 'p' && /*#__PURE__*/React.createElement("div", {
      className: "np-tile-price"
    }, NPF.money(info.p.price), info.p.unit === 'kg' && /*#__PURE__*/React.createElement("small", null, " z\u0142/kg")));
  });

  // Układ strony: które pola zasłaniają powiększone kafelki
  function npLayout(slots, cols, rows) {
    var covered = new Set();
    var span = {};
    slots.slice(0, cols * rows).forEach(function (s, i) {
      if (!s || covered.has(i)) return;
      var w = Math.max(1, Math.min(s.w || 1, cols - i % cols)),
        h = Math.max(1, Math.min(s.h || 1, rows - Math.floor(i / cols)));
      span[i] = [w, h];
      for (var dy = 0; dy < h; dy++) for (var dx = 0; dx < w; dx++) if (dx || dy) covered.add(i + dy * cols + dx);
    });
    return {
      covered: covered,
      span: span
    };
  }

  // extra = strony stolików (tryb gastro) za zwykłymi stronami: ta sama karuzela, płynne przesuwanie; renderExtra(i) = treść, extraBar(i) = { name, act }
  function PanelsView(_ref2) {
    var pages = _ref2.pages,
      setPages = _ref2.setPages,
      page = _ref2.page,
      setPage = _ref2.setPage,
      cols = _ref2.cols,
      rows = _ref2.rows,
      edit = _ref2.edit,
      setEdit = _ref2.setEdit,
      onTile = _ref2.onTile,
      onEditSlot = _ref2.onEditSlot,
      showF = _ref2.showF,
      _ref2$extra = _ref2.extra,
      extra = _ref2$extra === void 0 ? 0 : _ref2$extra,
      renderExtra = _ref2.renderExtra,
      extraBar = _ref2.extraBar;
    var pv = useProductsVer();
    var carRef = useRef(null);
    var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      dx = _useState2[0],
      setDx = _useState2[1];
    var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      swiping = _useState4[0],
      setSwiping = _useState4[1];
    var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      ghost = _useState6[0],
      setGhost = _useState6[1];
    var S = useRef({}).current;
    var n = pages.length;
    var N = n + extra;
    var pageRef = useRef(page);
    pageRef.current = page;
    var editRef = useRef(edit);
    editRef.current = edit;
    var go = function go(p) {
      var max = editRef.current ? n - 1 : N - 1;
      setPage(Math.max(0, Math.min(max, p)));
    };
    useKeys(function (k) {
      if (k === 'LEFT') {
        go(page - 1);
        return true;
      }
      if (k === 'RIGHT') {
        go(page + 1);
        return true;
      }
      if (edit && (k === 'ESC' || k === 'OK')) {
        setEdit(false);
        return true;
      }
      return false;
    }, 2);
    var geo = function geo(ev) {
      var el = carRef.current;
      var r = el.getBoundingClientRect();
      var sc = r.width / el.offsetWidth || 1;
      return {
        x: (ev.clientX - r.left) / sc,
        y: (ev.clientY - r.top) / sc,
        sc: sc,
        w: el.offsetWidth
      };
    };
    var slotAt = function slotAt(ev) {
      var el = document.elementFromPoint(ev.clientX, ev.clientY);
      var s = el && el.closest && el.closest('[data-slot]');
      if (!s || !carRef.current || !carRef.current.contains(s)) return null;
      return {
        p: +s.dataset.page,
        s: +s.dataset.slot
      };
    };
    var swap = function swap(a, b) {
      return setPages(function (ps) {
        var nx = ps.map(function (pg) {
          return _objectSpread(_objectSpread({}, pg), {}, {
            slots: pg.slots.slice()
          });
        });
        var t = nx[a.p].slots[a.s];
        nx[a.p].slots[a.s] = nx[b.p].slots[b.s];
        nx[b.p].slots[b.s] = t;
        return nx;
      });
    };
    var clearSlot = function clearSlot(a) {
      return setPages(function (ps) {
        return ps.map(function (pg, i) {
          return i !== a.p ? pg : _objectSpread(_objectSpread({}, pg), {}, {
            slots: pg.slots.map(function (s, j) {
              return j === a.s ? null : s;
            })
          });
        });
      });
    };
    var onDown = function onDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('.np-tile-rm')) return;
      var slotEl = e.target.closest('[data-slot]');
      var at = slotEl ? {
        p: +slotEl.dataset.page,
        s: +slotEl.dataset.slot
      } : null;
      Object.assign(S, {
        x0: e.clientX,
        y0: e.clientY,
        t0: performance.now(),
        mode: null,
        "long": false,
        edge: 0
      });
      clearTimeout(S.lt);
      if (!edit && at) S.lt = setTimeout(function () {
        S["long"] = true;
        setEdit(true);
      }, 520);
      var move = function move(ev) {
        var ddx = ev.clientX - S.x0,
          ddy = ev.clientY - S.y0;
        if (!S.mode) {
          if (Math.hypot(ddx, ddy) < 8) return;
          clearTimeout(S.lt);
          if (S["long"]) {
            S.mode = 'none';
            return;
          }
          if (edit && at && pages[at.p].slots[at.s]) {
            S.mode = 'tile';
            var g = geo(ev);
            var r = slotEl.getBoundingClientRect();
            var cr = carRef.current.getBoundingClientRect();
            S.ox = (S.x0 - r.left) / g.sc;
            S.oy = (S.y0 - r.top) / g.sc;
            S.gw = r.width / g.sc;
            S.gh = r.height / g.sc;
            S.sx = (r.left - cr.left) / g.sc;
            S.sy = (r.top - cr.top) / g.sc;
          } else if (Math.abs(ddx) > Math.abs(ddy)) {
            S.mode = 'swipe';
            setSwiping(true);
          } else {
            S.mode = 'none';
            return;
          }
        }
        if (S.mode === 'swipe') {
          var _g = geo(ev);
          var d = ddx / _g.sc;
          var p = pageRef.current;
          if (p === 0 && d > 0 || p === N - 1 && d < 0) d *= 0.35;
          setDx(d);
        } else if (S.mode === 'tile') {
          var _g2 = geo(ev);
          setGhost({
            from: at,
            slot: pages[at.p].slots[at.s],
            x: _g2.x - S.ox,
            y: _g2.y - S.oy,
            w: S.gw,
            h: S.gh,
            over: slotAt(ev)
          });
          var edge = _g2.x < 34 ? -1 : _g2.x > _g2.w - 34 ? 1 : 0;
          if (edge !== S.edge) {
            clearInterval(S.et);
            S.edge = edge;
            if (edge) S.et = setInterval(function () {
              return go(pageRef.current + edge);
            }, 700);
          }
        }
      };
      var _up = function up(ev) {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', _up);
        window.removeEventListener('pointercancel', _up);
        clearTimeout(S.lt);
        clearInterval(S.et);
        S.edge = 0;
        if (S.mode === 'swipe') {
          var g = geo(ev);
          var d = (ev.clientX - S.x0) / g.sc;
          var v = d / Math.max(1, performance.now() - S.t0);
          if (d < -g.w * 0.16 || v < -0.55) go(pageRef.current + 1);else if (d > g.w * 0.16 || v > 0.55) go(pageRef.current - 1);
          setDx(0);
          setSwiping(false);
          S.eat = true;
          setTimeout(function () {
            S.eat = false;
          }, 80);
        } else if (S.mode === 'tile') {
          var over = slotAt(ev);
          if (over && (over.p !== at.p || over.s !== at.s)) swap(at, over);
          setGhost(null);
        } else if (!S.mode && !S["long"] && at && ev.type === 'pointerup') {
          if (edit) onEditSlot(at);else {
            var slot = pages[at.p].slots[at.s];
            if (slot) onTile(slot);
          }
        }
        S.mode = null;
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', _up);
      window.addEventListener('pointercancel', _up);
    };
    var onWheel = function onWheel(e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!d) return;
      var now = performance.now();
      if (now - (S.wt || 0) < 550) return;
      S.wa = (S.wa || 0) + d;
      if (Math.abs(S.wa) > 40) {
        go(pageRef.current + Math.sign(S.wa));
        S.wa = 0;
        S.wt = now;
      }
    };
    var total = cols * rows;
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-panels' + (edit ? ' edit' : '') + (ghost ? ' dragging' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-carousel",
      ref: carRef,
      onPointerDown: onDown,
      onWheel: onWheel,
      onClickCapture: function onClickCapture(e) {
        if (S.eat) {
          S.eat = false;
          e.stopPropagation();
          e.preventDefault();
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-track' + (swiping ? ' swiping' : ''),
      style: {
        transform: "translateX(calc(".concat(-page * 100, "% + ").concat(dx, "px))")
      }
    }, pages.map(function (pg, pi) {
      return Math.abs(pi - page) > 1 ? /*#__PURE__*/React.createElement("div", {
        key: pi,
        className: "np-page"
      }) : /*#__PURE__*/React.createElement("div", {
        key: pi,
        className: "np-page",
        style: {
          gridTemplateColumns: "repeat(".concat(cols, ", minmax(0,1fr))"),
          gridTemplateRows: "repeat(".concat(rows, ", minmax(0,1fr))")
        }
      }, function () {
        var L = npLayout(pg.slots, cols, rows);
        return pg.slots.slice(0, total).map(function (slot, si) {
          if (L.covered.has(si)) return null;
          var _ref3 = L.span[si] || [1, 1],
            _ref4 = _slicedToArray(_ref3, 2),
            sw = _ref4[0],
            sh = _ref4[1];
          var isFrom = ghost && ghost.from.p === pi && ghost.from.s === si;
          var isOver = ghost && ghost.over && ghost.over.p === pi && ghost.over.s === si && !isFrom;
          return /*#__PURE__*/React.createElement("div", {
            key: si,
            className: 'np-slot' + (slot ? '' : ' empty') + (isFrom ? ' from' : '') + (isOver ? ' over' : ''),
            "data-page": pi,
            "data-slot": si,
            style: {
              gridColumn: "".concat(si % cols + 1, " / span ").concat(sw),
              gridRow: "".concat(Math.floor(si / cols) + 1, " / span ").concat(sh)
            }
          }, /*#__PURE__*/React.createElement("div", {
            className: "np-slot-in"
          }, /*#__PURE__*/React.createElement(Tile, {
            slot: slot,
            showF: showF,
            pv: pv
          }), edit && slot && /*#__PURE__*/React.createElement("button", {
            className: "np-tile-rm",
            onPointerDown: function onPointerDown(e) {
              return e.stopPropagation();
            },
            onClick: function onClick() {
              return clearSlot({
                p: pi,
                s: si
              });
            },
            "aria-label": "Usu\u0144 kafelek"
          }, /*#__PURE__*/React.createElement(Icon, {
            name: "minus"
          }))));
        });
      }());
    }), Array.from({
      length: extra
    }, function (_, i) {
      return Math.abs(n + i - page) > 1 ? /*#__PURE__*/React.createElement("div", {
        key: 'x' + i,
        className: "np-page"
      }) : /*#__PURE__*/React.createElement("div", {
        key: 'x' + i,
        className: "np-page np-xpage"
      }, renderExtra(i, n + i === page));
    })), ghost && /*#__PURE__*/React.createElement("div", {
      className: "np-ghost",
      style: {
        left: ghost.x,
        top: ghost.y,
        width: ghost.w,
        height: ghost.h
      }
    }, /*#__PURE__*/React.createElement(Tile, {
      slot: ghost.slot,
      showF: showF,
      pv: pv
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pagebar"
    }, function () {
      var xb = page >= n && extraBar ? extraBar(page - n) : null;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: 'np-pagebar-name' + (xb && xb.warn ? ' warn' : '')
      }, edit ? 'Przeciągnij lub dotknij kafelek' : xb ? xb.name : ''), /*#__PURE__*/React.createElement("div", {
        className: "np-dots"
      }, pages.map(function (_, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: i,
          className: i === page ? 'on' : '',
          onClick: function onClick() {
            return go(i);
          },
          "aria-label": 'Strona ' + (i + 1)
        }, /*#__PURE__*/React.createElement("i", null));
      }), !edit && Array.from({
        length: extra
      }, function (_, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: 'g' + i,
          className: 'g' + (n + i === page ? ' on' : ''),
          onClick: function onClick() {
            return go(n + i);
          },
          "aria-label": 'Stoliki ' + (i + 1)
        }, /*#__PURE__*/React.createElement("i", null));
      })), /*#__PURE__*/React.createElement("div", {
        className: "np-pagebar-act"
      }, xb ? xb.act : edit ? /*#__PURE__*/React.createElement("button", {
        className: "np-pill-btn ink",
        onClick: function onClick() {
          return setEdit(false);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      }), "Gotowe") : /*#__PURE__*/React.createElement("button", {
        className: "np-pill-btn",
        onClick: function onClick() {
          return setEdit(true);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "pencil"
      }), "Edytuj")));
    }()));
  }

  // Rząd programowalnych kafelków nad klawiaturą: dotknięcie = akcja, przytrzymanie (lub puste pole) = programowanie
  function TileRow(_ref5) {
    var slots = _ref5.slots,
      n = _ref5.n,
      cols = _ref5.cols,
      onTile = _ref5.onTile,
      onEdit = _ref5.onEdit,
      _ref5$className = _ref5.className,
      className = _ref5$className === void 0 ? 'np-kbrow' : _ref5$className,
      _ref5$edit = _ref5.edit,
      edit = _ref5$edit === void 0 ? false : _ref5$edit;
    var pv = useProductsVer();
    var T = useRef({});
    var down = function down(i) {
      T.current["long"] = false;
      clearTimeout(T.current.t);
      T.current.t = setTimeout(function () {
        T.current["long"] = true;
        onEdit(i);
      }, 520);
    };
    var cancel = function cancel() {
      return clearTimeout(T.current.t);
    };
    var click = function click(i) {
      if (T.current["long"]) {
        T.current["long"] = false;
        return;
      }
      var s = slots[i];
      if (s && !edit) onTile(s);else onEdit(i);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: className + (edit ? ' edit' : ''),
      style: {
        gridTemplateColumns: "repeat(".concat(cols || n, ", minmax(0,1fr))")
      }
    }, Array.from({
      length: n
    }, function (_, i) {
      var s = slots[i] || null;
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        className: 'np-slot' + (s ? '' : ' empty'),
        onPointerDown: function onPointerDown() {
          return down(i);
        },
        onPointerUp: cancel,
        onPointerLeave: cancel,
        onPointerCancel: cancel,
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        },
        onClick: function onClick() {
          return click(i);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-slot-in"
      }, /*#__PURE__*/React.createElement(Tile, {
        slot: s,
        pv: pv
      })));
    }));
  }
  var SIZES = [[1, 1], [2, 1], [1, 2], [2, 2]];
  function TileEditor(_ref6) {
    var slot = _ref6.slot,
      whereLabel = _ref6.whereLabel,
      onCancel = _ref6.onCancel,
      onSave = _ref6.onSave,
      maxSize = _ref6.maxSize;
    var _useState7 = useState(slot ? slot.t : 'p'),
      _useState8 = _slicedToArray(_useState7, 2),
      type = _useState8[0],
      setType = _useState8[1];
    var _useState9 = useState(slot ? slot.id : null),
      _useState0 = _slicedToArray(_useState9, 2),
      id = _useState0[0],
      setId = _useState0[1];
    var _useState1 = useState(slot && slot.color ? slot.color : null),
      _useState10 = _slicedToArray(_useState1, 2),
      color = _useState10[0],
      setColor = _useState10[1];
    var _useState11 = useState(slot && slot.icon ? slot.icon : null),
      _useState12 = _slicedToArray(_useState11, 2),
      icon = _useState12[0],
      setIcon = _useState12[1];
    var _useState13 = useState(function () {
        var w = slot && slot.w || 1,
          h = slot && slot.h || 1;
        return maxSize ? [Math.min(w, maxSize.w), Math.min(h, maxSize.h)] : [1, 1];
      }),
      _useState14 = _slicedToArray(_useState13, 2),
      size = _useState14[0],
      setSize = _useState14[1];
    var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      iconPick = _useState16[0],
      setIconPick = _useState16[1];
    var _useState17 = useState(!!(slot && slot.useImg)),
      _useState18 = _slicedToArray(_useState17, 2),
      useImg = _useState18[0],
      setUseImg = _useState18[1];
    var _useState19 = useState(''),
      _useState20 = _slicedToArray(_useState19, 2),
      iq = _useState20[0],
      setIq = _useState20[1];
    var _useState21 = useState('all'),
      _useState22 = _slicedToArray(_useState21, 2),
      icat = _useState22[0],
      setIcat = _useState22[1];
    var _useState23 = useState(''),
      _useState24 = _slicedToArray(_useState23, 2),
      q = _useState24[0],
      setQ = _useState24[1];
    var _useState25 = useState('all'),
      _useState26 = _slicedToArray(_useState25, 2),
      grp = _useState26[0],
      setGrp = _useState26[1];
    var _useState27 = useState(slot && slot.arg ? slot.arg : 'favs'),
      _useState28 = _slicedToArray(_useState27, 2),
      arg = _useState28[0],
      setArg = _useState28[1];
    var _useState29 = useState(false),
      _useState30 = _slicedToArray(_useState29, 2),
      qaPick = _useState30[0],
      setQaPick = _useState30[1];
    var needArg = type === 'f' && id && FBY[id] && FBY[id].arg === 'group';
    var draft = id ? _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
      t: type,
      id: id
    }, needArg ? {
      arg: arg
    } : {}), color ? {
      color: color
    } : {}), icon && type === 'p' ? {
      icon: icon
    } : {}), useImg && type === 'p' ? {
      useImg: true
    } : {}), size[0] > 1 ? {
      w: size[0]
    } : {}), size[1] > 1 ? {
      h: size[1]
    } : {}) : null;
    var PICTS = window.PICTOGRAMS || [];
    var niq = NPF.norm(iq.trim());
    var picts = PICTS.filter(function (x) {
      return (icat === 'all' || x.cat === icat) && (!niq || NPF.norm(x.pl + ' ' + (x.kw || '')).includes(niq));
    });
    var curIcon = icon === 'none' ? null : icon || (type === 'f' && id && FBY[id] ? FBY[id].icon : null);
    var curIconName = icon === 'none' ? 'Bez piktogramu' : icon ? (PICTS.find(function (x) {
      return x.slug === icon;
    }) || {}).pl || icon : type === 'f' ? 'Domyślny funkcji' : 'Bez piktogramu';
    useKeys(function (k) {
      if (k === 'ESC') onCancel();else if (k === 'OK') onSave(draft);
      return true;
    }, 30);
    var nq = NPF.norm(q.trim());
    var prods = PRODUCTS.filter(function (p) {
      return p.active !== false && (grp === 'all' || p.group === grp) && (!nq || NPF.norm(p.name).includes(nq) || p.plu === nq || p.ean.includes(nq));
    });
    var cats = _toConsumableArray(new Set(FUNCS.map(function (f) {
      return f.cat;
    })));
    var funcs = FUNCS.filter(function (f) {
      return (grp === 'all' || f.cat === grp) && (!nq || NPF.norm(f.name).includes(nq) || 'f' + f.f === nq);
    });
    var switchType = function switchType(t) {
      if (t === type) return;
      setType(t);
      setIconPick(false);
      setId(slot && slot.t === t ? slot.id : null);
      setGrp('all');
      setQ('');
    };
    var autoColor = type === 'p' ? 'gray' : id && FBY[id] ? FBY[id].color : 'graphite';
    var list = type === 'p' ? prods : funcs;
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-editor",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-head"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn-text",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-title"
    }, "Programowanie kafelka", /*#__PURE__*/React.createElement("span", null, whereLabel)), /*#__PURE__*/React.createElement("button", {
      className: "np-btn-text strong",
      onClick: function onClick() {
        return onSave(draft);
      }
    }, "Zapisz")), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Podgl\u0105d"), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-preview w".concat(size[0], " h").concat(size[1])
    }, /*#__PURE__*/React.createElement(Tile, {
      slot: draft
    })), maxSize && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Rozmiar (pola)"), /*#__PURE__*/React.createElement("div", {
      className: "np-sizes"
    }, SIZES.map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        w = _ref8[0],
        h = _ref8[1];
      return /*#__PURE__*/React.createElement("button", {
        key: w + 'x' + h,
        className: size[0] === w && size[1] === h ? 'on' : '',
        disabled: w > maxSize.w || h > maxSize.h,
        onClick: function onClick() {
          return setSize([w, h]);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-size-ico",
        style: {
          gridTemplateColumns: "repeat(".concat(w, ", 9px)"),
          gridTemplateRows: "repeat(".concat(h, ", 9px)")
        }
      }, Array.from({
        length: w * h
      }, function (_, i) {
        return /*#__PURE__*/React.createElement("i", {
          key: i
        });
      })), w, "\xD7", h);
    }))), type === 'p' && window.NP_IMG && NP_IMG.on() && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Na kafelku ", /*#__PURE__*/React.createElement("em", {
      className: "np-exp"
    }, "eksperymentalne")), /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-ed-imgseg"
    }, /*#__PURE__*/React.createElement("button", {
      className: !useImg ? 'on' : '',
      onClick: function onClick() {
        return setUseImg(false);
      }
    }, "Piktogram"), /*#__PURE__*/React.createElement("button", {
      className: useImg ? 'on' : '',
      disabled: !(id && NP_DB.get(id) && NP_DB.get(id).img),
      onClick: function onClick() {
        return setUseImg(true);
      }
    }, "Obrazek")), id && NP_DB.get(id) && !NP_DB.get(id).img && /*#__PURE__*/React.createElement("div", {
      className: "np-ed-hint"
    }, "Towar nie ma obrazka \u2014 przypisz go w karcie towaru.")), type === 'p' && !useImg && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Piktogram"), /*#__PURE__*/React.createElement("button", {
      className: 'np-ed-icon' + (iconPick ? ' on' : ''),
      onClick: function onClick() {
        return setIconPick(!iconPick);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-ed-row-ico"
    }, curIcon ? /*#__PURE__*/React.createElement(Icon, {
      name: curIcon
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    })), /*#__PURE__*/React.createElement("span", null, curIconName), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), needArg && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Asortyment na kafelku"), /*#__PURE__*/React.createElement("button", {
      className: 'np-ed-icon' + (qaPick ? ' on' : ''),
      onClick: function onClick() {
        return setQaPick(!qaPick);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-ed-row-ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: (qaGroup(arg) || {}).icon || 'package'
    })), /*#__PURE__*/React.createElement("span", null, (qaGroup(arg) || {}).label || 'Wybierz'), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-label"
    }, "Kolor"), /*#__PURE__*/React.createElement("div", {
      className: "np-swatches"
    }, [null].concat(_toConsumableArray(TILE_COLORS)).map(function (c) {
      return /*#__PURE__*/React.createElement("button", {
        key: c || 'auto',
        className: 'np-swatch c-' + (c || autoColor) + (color === c ? ' on' : '') + (c ? '' : ' auto'),
        onClick: function onClick() {
          return setColor(c);
        },
        "aria-label": c || 'Automatyczny'
      }, !c && 'A');
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-ed-clear",
      onClick: function onClick() {
        return onSave(null);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Wyczy\u015B\u0107 kafelek")), qaPick && needArg ? /*#__PURE__*/React.createElement("div", {
      className: "np-ed-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-pickhead"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setQaPick(false);
      },
      "aria-label": "Wr\xF3\u0107"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("b", null, "Asortyment na kafelku"), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-list"
    }, [{
      id: 'favs',
      label: 'Ulubione',
      icon: 'star'
    }].concat(_toConsumableArray(GROUPS)).map(function (g) {
      var n = g.id === 'favs' ? null : NP_DB.all().filter(function (x) {
        return x.group === g.id && x.active !== false;
      }).length;
      return /*#__PURE__*/React.createElement("button", {
        key: g.id,
        className: 'np-ed-row' + (arg === g.id ? ' on' : ''),
        onClick: function onClick() {
          setArg(g.id);
          setQaPick(false);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: g.icon || 'package'
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-main"
      }, /*#__PURE__*/React.createElement("b", null, g.label), /*#__PURE__*/React.createElement("small", null, g.id === 'favs' ? 'towary z listy ulubionych' : n + ' towarów')), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-val"
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-check"
      }, arg === g.id && /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })));
    }))) : iconPick && type === 'p' ? /*#__PURE__*/React.createElement("div", {
      className: "np-ed-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-pickhead"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setIconPick(false);
      },
      "aria-label": "Wr\xF3\u0107"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    })), /*#__PURE__*/React.createElement("b", null, "Piktogram kafelka"), /*#__PURE__*/React.createElement("button", {
      className: 'np-pill-btn' + (!icon || icon === 'none' ? ' ink' : ''),
      onClick: function onClick() {
        setIcon(null);
        setIconPick(false);
      }
    }, "Bez piktogramu")), /*#__PURE__*/React.createElement("label", {
      className: "np-search sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("input", {
      value: iq,
      onChange: function onChange(e) {
        return setIq(e.target.value);
      },
      placeholder: "Szukaj piktogramu, np. chleb, kawa, karta"
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-chips"
    }, /*#__PURE__*/React.createElement("button", {
      className: icat === 'all' ? 'on' : '',
      onClick: function onClick() {
        return setIcat('all');
      }
    }, "Wszystkie"), (window.PICTOGRAM_GROUPS || []).map(function (g) {
      return /*#__PURE__*/React.createElement("button", {
        key: g.id,
        className: icat === g.id ? 'on' : '',
        onClick: function onClick() {
          return setIcat(g.id);
        }
      }, g.label);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pict-grid"
    }, picts.map(function (x) {
      return /*#__PURE__*/React.createElement("button", {
        key: x.id,
        className: 'np-pict' + (icon === x.slug ? ' on' : ''),
        onClick: function onClick() {
          setIcon(x.slug);
          setIconPick(false);
        },
        title: x.pl
      }, /*#__PURE__*/React.createElement("span", {
        dangerouslySetInnerHTML: {
          __html: x.svg
        }
      }), /*#__PURE__*/React.createElement("small", null, x.pl));
    }), picts.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-ed-empty"
    }, "Brak piktogram\xF3w"))) : /*#__PURE__*/React.createElement("div", {
      className: "np-ed-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: type === 'p' ? 'on' : '',
      onClick: function onClick() {
        return switchType('p');
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "package"
    }), "Towar"), /*#__PURE__*/React.createElement("button", {
      className: type === 'f' ? 'on' : '',
      onClick: function onClick() {
        return switchType('f');
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fkey"
    }), "Funkcja")), /*#__PURE__*/React.createElement("label", {
      className: "np-search sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("input", {
      value: q,
      onChange: function onChange(e) {
        return setQ(e.target.value);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Escape') e.currentTarget.blur();
      },
      placeholder: type === 'p' ? 'Szukaj po nazwie, PLU lub EAN' : 'Szukaj funkcji'
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-chips"
    }, /*#__PURE__*/React.createElement("button", {
      className: grp === 'all' ? 'on' : '',
      onClick: function onClick() {
        return setGrp('all');
      }
    }, "Wszystkie"), (type === 'p' ? GROUPS.map(function (g) {
      return [g.id, g.label];
    }) : cats.map(function (c) {
      return [c, c];
    })).map(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 2),
        gid = _ref0[0],
        gl = _ref0[1];
      return /*#__PURE__*/React.createElement("button", {
        key: gid,
        className: grp === gid ? 'on' : '',
        onClick: function onClick() {
          return setGrp(gid);
        }
      }, gl);
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-ed-list"
    }, type === 'p' ? prods.map(function (p) {
      return /*#__PURE__*/React.createElement("button", {
        key: p.plu,
        className: 'np-ed-row' + (id === p.plu ? ' on' : ''),
        onClick: function onClick() {
          return setId(p.plu);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: p.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-main"
      }, /*#__PURE__*/React.createElement("b", null, p.name), /*#__PURE__*/React.createElement("small", null, "PLU ", p.plu, " \xB7 ", p.ean)), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-val"
      }, NPF.money(p.price), " z\u0142", p.unit === 'kg' ? '/kg' : ''), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-check"
      }, id === p.plu && /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })));
    }) : funcs.map(function (f) {
      return /*#__PURE__*/React.createElement("button", {
        key: f.id,
        className: 'np-ed-row' + (id === f.id ? ' on' : ''),
        onClick: function onClick() {
          setId(f.id);
          setQaPick(f.arg === 'group');
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: 'np-ed-row-ico bg-' + f.color
      }, /*#__PURE__*/React.createElement(Icon, {
        name: f.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-main"
      }, /*#__PURE__*/React.createElement("b", null, f.name), /*#__PURE__*/React.createElement("small", null, f.cat)), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-row-val"
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-ed-check"
      }, id === f.id && /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })));
    }), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-ed-empty"
    }, "Brak wynik\xF3w")))));
  }
  var plTow = function plTow(n) {
    return n === 1 ? 'towar' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'towary' : 'towarów';
  };
  function qaList(arg, favs) {
    var all = NP_DB.all().filter(function (x) {
      return x.active !== false;
    });
    if (arg === 'favs') return favs.map(function (x) {
      return NP_DB.get(x);
    }).filter(function (x) {
      return x && x.active !== false;
    });
    var ids = NP_DB.groupSubtree ? NP_DB.groupSubtree(arg) : [arg];
    return all.filter(function (x) {
      return ids.includes(x.group);
    });
  }
  function QuickGroupSheet(_ref1) {
    var arg0 = _ref1.arg,
      _ref1$favs = _ref1.favs,
      favs = _ref1$favs === void 0 ? [] : _ref1$favs,
      onSell = _ref1.onSell,
      onCancel = _ref1.onCancel;
    var _useState31 = useState(function () {
        try {
          return localStorage.getItem('nextpro.qaView') || 'tiles';
        } catch (e) {
          return 'tiles';
        }
      }),
      _useState32 = _slicedToArray(_useState31, 2),
      view = _useState32[0],
      setViewRaw = _useState32[1];
    var setView = function setView(v) {
      setViewRaw(v);
      try {
        localStorage.setItem('nextpro.qaView', v);
      } catch (e) {}
    };
    var _useState33 = useState(arg0 || 'favs'),
      _useState34 = _slicedToArray(_useState33, 2),
      arg = _useState34[0],
      setArg = _useState34[1];
    useKeys(function (k) {
      if (k === 'ESC') onCancel();
      return true;
    }, 60);
    var shown = view === 'list' ? arg : arg0 || 'favs';
    var g = qaGroup(shown) || {
      label: 'Asortyment'
    };
    var prods = qaList(shown, favs);
    var side = [{
      id: 'favs',
      label: 'Ulubione',
      icon: 'star',
      depth: 0
    }].concat(_toConsumableArray(NP_DB.groupTree ? NP_DB.groupTree().filter(function (t) {
      return t.g.active !== false;
    }).map(function (_ref10) {
      var x = _ref10.g,
        depth = _ref10.depth;
      return {
        id: x.id,
        label: x.label,
        icon: x.icon,
        depth: depth
      };
    }) : GROUPS.map(function (x) {
      return {
        id: x.id,
        label: x.label,
        icon: x.icon,
        depth: 0
      };
    })));
    var empty = /*#__PURE__*/React.createElement("div", {
      className: "np-ed-empty"
    }, shown === 'favs' ? 'Brak ulubionych towarów' : 'Brak towarów w tym asortymencie');
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-qa",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-qa-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-qa-ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: g.icon || 'package'
    })), /*#__PURE__*/React.createElement("b", null, g.label), /*#__PURE__*/React.createElement("small", null, prods.length, " ", plTow(prods.length)), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onCancel,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), view === 'list' ? /*#__PURE__*/React.createElement("div", {
      className: "np-qa-lv"
    }, /*#__PURE__*/React.createElement(ScrollArea, {
      key: shown,
      className: "np-glist",
      more: false
    }, prods.length ? prods.map(function (x) {
      return /*#__PURE__*/React.createElement("div", {
        key: x.plu,
        className: "np-grow",
        role: "button",
        onClick: function onClick() {
          return onSell(x);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: 'np-grow-ico' + (NP_DB.pictOf(x) ? ' own' : '')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: NP_DB.listIcon(x)
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-main"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-name"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-t"
      }, x.name)), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-code"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-cd"
      }, x.ean || x.plu))), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-price"
      }, NPF.money(x.price), /*#__PURE__*/React.createElement("small", null, "z\u0142 / ", x.unit)));
    }) : empty), /*#__PURE__*/React.createElement("div", {
      className: "np-side np-qa-side"
    }, side.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: 'np-side-item' + (arg === s.id ? ' on' : '') + (s.depth ? ' sub' : ''),
        style: s.depth ? {
          paddingLeft: 12 + Math.min(s.depth, 3) * 16
        } : null,
        onClick: function onClick() {
          return setArg(s.id);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: s.icon || 'package'
      }), /*#__PURE__*/React.createElement("span", null, s.label), /*#__PURE__*/React.createElement("small", null, qaList(s.id, favs).length));
    }))) : /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-qa-scroll"
    }, prods.length ? /*#__PURE__*/React.createElement("div", {
      className: "np-qa-grid"
    }, prods.map(function (x) {
      return /*#__PURE__*/React.createElement("button", {
        key: x.plu,
        className: "np-slot",
        onClick: function onClick() {
          return onSell(x);
        }
      }, /*#__PURE__*/React.createElement(Tile, {
        slot: {
          t: 'p',
          id: x.plu
        }
      }));
    })) : empty), /*#__PURE__*/React.createElement("div", {
      className: "np-qa-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-slot np-qa-view",
      onClick: function onClick() {
        setView(view === 'list' ? 'tiles' : 'list');
        setArg(arg0 || 'favs');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tile c-graphite k-f has-ico"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tile-top"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: view === 'list' ? 'layout-grid' : 'list',
      className: "np-tile-ico"
    }), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "np-tile-label"
    }, /*#__PURE__*/React.createElement("span", null, view === 'list' ? 'Kafelki' : 'Lista')))), /*#__PURE__*/React.createElement("button", {
      className: "np-slot np-qa-cancel",
      onClick: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tile c-red k-f has-ico"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tile-top"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      className: "np-tile-ico"
    }), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "np-tile-label"
    }, /*#__PURE__*/React.createElement("span", null, "Anuluj"))))));
  }
  Object.assign(window, {
    QuickGroupSheet: QuickGroupSheet,
    qaGroup: qaGroup,
    Tile: Tile,
    tileInfo: tileInfo,
    npLayout: npLayout,
    PanelsView: React.memo(PanelsView),
    TileRow: React.memo(TileRow),
    TileEditor: TileEditor
  });
})();