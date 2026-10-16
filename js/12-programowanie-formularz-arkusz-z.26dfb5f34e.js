"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
/* KASA NEXT PRO — Programowanie: formularz (arkusz z klawiaturą ekranową) i tabela z zakładkami */
(function () {
  var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;

  // Arkusz wyrenderowany na cały ekran kasy (nie tylko w strefie roboczej)
  function OnScreen(_ref) {
    var children = _ref.children;
    var host = document.querySelector('.np-screen');
    return host ? ReactDOM.createPortal(children, host) : children;
  }
  function useProg(k) {
    var _useState = useState(function () {
        return NP_PROG.get(k);
      }),
      _useState2 = _slicedToArray(_useState, 2),
      v = _useState2[0],
      setV = _useState2[1];
    useEffect(function () {
      var h = function h(e) {
        if (e.detail === k) setV(NP_PROG.get(k));
      };
      window.addEventListener('np-prog', h);
      return function () {
        return window.removeEventListener('np-prog', h);
      };
    }, [k]);
    return [v, function (nv) {
      return NP_PROG.set(k, typeof nv === 'function' ? nv(NP_PROG.get(k)) : nv);
    }];
  }
  // Cofnięcie gestem: przesunięcie palcem w prawo (min. 120 px) = Wstecz. Zwraca [właściwości kontenera, wskaźnik]
  var SWIPE_GO = 120;
  function useSwipeBack(onBack) {
    var el = useRef(null),
      ind = useRef(null),
      st = useRef(null),
      swiped = useRef(false);
    var cb = useRef(onBack);
    cb.current = onBack;
    var paint = function paint(d, anim) {
      var e = el.current;
      if (!e) return;
      e.style.transition = anim ? 'transform .15s ease-out' : '';
      e.style.transform = d ? "translateX(".concat(Math.min(d * 0.45, 90), "px)") : '';
      var i = ind.current;
      if (!i) return;
      var p = Math.min(1, d / SWIPE_GO);
      i.style.transition = anim ? 'opacity .15s, transform .15s' : '';
      i.style.opacity = p;
      i.style.transform = "translate(".concat(-64 + p * 80, "px,-50%) scale(").concat(0.75 + 0.25 * p, ")");
      i.classList.toggle('go', d >= SWIPE_GO);
    };
    var bind = {
      ref: el,
      onPointerDown: function onPointerDown(e) {
        if (e.button && e.button > 0 || !onBack) return;
        if (!el.current || !el.current.contains(e.target)) return; // zdarzenia z portali (arkusze nad widokiem) pomijamy
        if (e.target.closest('input,textarea,.np-osk,.np-numpad,.np-no-swipe,.np-sa-bar')) return;
        var r = el.current.getBoundingClientRect();
        st.current = {
          x: e.clientX,
          y: e.clientY,
          id: e.pointerId,
          on: false,
          d: 0,
          sc: r.width / el.current.offsetWidth || 1
        };
      },
      onPointerMove: function onPointerMove(e) {
        var s = st.current;
        if (!s || e.pointerId !== s.id) return;
        var dx = (e.clientX - s.x) / s.sc,
          dy = (e.clientY - s.y) / s.sc;
        if (!s.on) {
          if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) {
            st.current = null;
            return;
          }
          if (dx > 18 && dx > Math.abs(dy) * 1.4) {
            s.on = true;
            try {
              el.current.setPointerCapture(e.pointerId);
            } catch (_) {}
          } else return;
        }
        s.d = Math.max(0, dx);
        paint(s.d, false);
      },
      onPointerUp: function onPointerUp() {
        var s = st.current;
        st.current = null;
        if (!s || !s.on) return;
        swiped.current = true;
        setTimeout(function () {
          swiped.current = false;
        }, 60);
        if (s.d >= SWIPE_GO) {
          paint(0, false);
          cb.current();
        } else paint(0, true);
      },
      onPointerCancel: function onPointerCancel() {
        st.current = null;
        paint(0, true);
      },
      onClickCapture: function onClickCapture(e) {
        if (swiped.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    };
    return [bind, /*#__PURE__*/React.createElement("span", {
      key: "swipe",
      ref: ind,
      className: "np-swipe-ind",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }))];
  }
  var isNum = function isNum(t) {
    return t === 'int' || t === 'money' || t === 'dec';
  };
  var optsOf = function optsOf(fd, f) {
    return ((typeof fd.options === 'function' ? fd.options(f || {}) : fd.options) || []).map(function (o) {
      return Array.isArray(o) ? o : [o, o];
    });
  };

  /* schema: [[karta, karta…] (lewa kolumna), [karta…] (prawa)] lub [karta…] (jedna kolumna)
     karta: { title, note, fields: [pole] }
     pole: { id, label, type: text|int|money|dec|area|select|check|checks|note|custom, req, max, ph, span, suffix, hint, after(v,set), options, items, render(v,set,api) } */
  function FormSheet(_ref2) {
    var title = _ref2.title,
      sub = _ref2.sub,
      schema = _ref2.schema,
      initial = _ref2.initial,
      validate = _ref2.validate,
      onCancel = _ref2.onCancel,
      onSave = _ref2.onSave,
      _ref2$saveLabel = _ref2.saveLabel,
      saveLabel = _ref2$saveLabel === void 0 ? 'Zapisz' : _ref2$saveLabel,
      head = _ref2.head,
      _ref2$wide = _ref2.wide,
      wide = _ref2$wide === void 0 ? true : _ref2$wide,
      deleteLabel = _ref2.deleteLabel,
      onDelete = _ref2.onDelete;
    var _useState3 = useState(function () {
        return JSON.parse(JSON.stringify(initial));
      }),
      _useState4 = _slicedToArray(_useState3, 2),
      f = _useState4[0],
      setF = _useState4[1];
    var init0 = useRef(JSON.stringify(initial));
    var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      confirm = _useState6[0],
      setConfirm = _useState6[1];
    var dirty = JSON.stringify(f) !== init0.current;
    var tryCancel = function tryCancel() {
      return dirty ? setConfirm(true) : onCancel();
    };
    var _useSwipeBack = useSwipeBack(function () {
        hideOsk();
        tryCancel();
      }),
      _useSwipeBack2 = _slicedToArray(_useSwipeBack, 2),
      sw = _useSwipeBack2[0],
      swInd = _useSwipeBack2[1];
    var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      focus = _useState8[0],
      setFocus = _useState8[1];
    var _useState9 = useState(null),
      _useState0 = _slicedToArray(_useState9, 2),
      pick = _useState0[0],
      setPick = _useState0[1];
    var _useState1 = useState({}),
      _useState10 = _slicedToArray(_useState1, 2),
      errs = _useState10[0],
      setErrs = _useState10[1];
    var bodyRef = useRef(null);
    var inputs = useRef({});
    var fields = {};
    var cols = Array.isArray(schema[0]) ? schema : [schema];
    cols.forEach(function (c) {
      return c.forEach(function (card) {
        return (card.fields || []).forEach(function (fd) {
          if (fd.id) fields[fd.id] = fd;
        });
      });
    });
    var set = function set(id, v) {
      setF(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, id, v));
      });
      setErrs(function (e) {
        return e[id] ? _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, id, null)) : e;
      });
    };
    var clean = function clean(fd, v) {
      var x = String(v);
      if (fd.type === 'int') x = x.replace(/[^0-9]/g, '');else if (fd.type === 'money' || fd.type === 'dec') x = x.replace('.', ',').replace(/[^0-9,]/g, '').replace(/,(?=.*,)/g, '');
      if (fd.upper) x = x.toUpperCase();
      if (fd.filter) x = fd.filter(x);
      if (fd.max) x = x.slice(0, fd.max);
      return x;
    };
    var hideOsk = function hideOsk() {
      var el = inputs.current[focus];
      if (el) el.blur();
      setFocus(null);
    };
    var oskKey = function oskKey(k) {
      var id = focus;
      if (!id) return;
      var fd = fields[id];
      setF(function (s) {
        var cur = String(s[id] == null ? '' : s[id]);
        var nv = k === 'BACK' ? cur.slice(0, -1) : k === 'CLEAR' || k === 'C' ? '' : k === 'ENTER' ? fd.type === 'area' ? cur + '\n' : cur : (k === ',' && !cur && isNum(fd.type) ? '0' : cur) + k;
        return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, id, clean(fd, nv)));
      });
      if (k === 'ENTER' && fd.type !== 'area') hideOsk();
      setErrs(function (e) {
        return e[id] ? _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, id, null)) : e;
      });
    };
    useKeys(function (k) {
      if (confirm) {
        if (k === 'ESC') setConfirm(false);
        if (k === 'OK') onCancel();
        return true;
      }
      if (pick) {
        if (k === 'ESC') setPick(null);
        return true;
      }
      if (k === 'ESC') {
        if (focus) hideOsk();else tryCancel();
        return true;
      }
      if (k === 'OK' && !focus) {
        save();
        return true;
      }
      return true;
    }, 40);
    useEffect(function () {
      if (!focus) return undefined;
      var el = inputs.current[focus],
        box = bodyRef.current;
      if (!el || !box) return undefined;
      var t = setTimeout(function () {
        var sc = box.getBoundingClientRect().height / box.offsetHeight || 1;
        var y = (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / sc + box.scrollTop;
        if (y < box.scrollTop + 10 || y + 70 > box.scrollTop + box.clientHeight) box.scrollTo({
          top: Math.max(0, y - 70),
          behavior: 'smooth'
        });
      }, 60);
      return function () {
        return clearTimeout(t);
      };
    }, [focus]);
    var save = function save() {
      var e = {};
      Object.values(fields).forEach(function (fd) {
        if (fd.req && !String(f[fd.id] == null ? '' : f[fd.id]).trim()) e[fd.id] = 'Pole wymagane';
      });
      Object.assign(e, validate && validate(f) || {});
      Object.keys(e).forEach(function (k) {
        if (!e[k]) delete e[k];
      });
      if (Object.keys(e).length) {
        setErrs(e);
        var el = inputs.current[Object.keys(e)[0]];
        if (el && bodyRef.current) {
          var box = bodyRef.current;
          var sc = box.getBoundingClientRect().height / box.offsetHeight || 1;
          box.scrollTo({
            top: Math.max(0, (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / sc + box.scrollTop - 70),
            behavior: 'smooth'
          });
        }
        return;
      }
      onSave(f);
    };
    var api = {
      set: set,
      get: function get(id) {
        return f[id];
      },
      hideOsk: hideOsk,
      f: f
    };
    var input = function input(fd) {
      var val = f[fd.id] == null ? '' : String(f[fd.id]);
      var common = {
        ref: function ref(el) {
          inputs.current[fd.id] = el;
        },
        value: val,
        placeholder: fd.ph != null ? fd.ph : fd.label,
        inputMode: 'none',
        readOnly: !!fd.ro,
        onFocus: function onFocus() {
          if (!fd.ro) setFocus(fd.id);
        },
        onChange: function onChange(e) {
          return set(fd.id, clean(fd, e.target.value));
        },
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Escape') hideOsk();
          if (e.key === 'Enter' && fd.type !== 'area') hideOsk();
        }
      };
      var cls = 'np-pe-in' + (isNum(fd.type) ? ' num' : '') + (fd.ro ? ' ro' : '') + (focus === fd.id ? ' focus' : '') + (errs[fd.id] ? ' err' : '') + (fd.mono ? ' mono' : '');
      return fd.type === 'area' ? /*#__PURE__*/React.createElement("textarea", _extends({}, common, {
        className: cls + ' area',
        rows: fd.rows || 3
      })) : /*#__PURE__*/React.createElement("input", _extends({}, common, {
        type: fd.pw ? 'password' : 'text',
        className: cls
      }));
    };
    var renderField = function renderField(fd, i) {
      var key = fd.id || 'x' + i;
      var span = fd.span ? ' span' : '';
      if (fd.type === 'note') return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: 'np-pf-note' + (fd.tone ? ' ' + fd.tone : '') + span
      }, fd.icon && /*#__PURE__*/React.createElement(Icon, {
        name: fd.icon
      }), /*#__PURE__*/React.createElement("span", null, typeof fd.text === 'function' ? fd.text(f) : fd.text));
      if (fd.type === 'custom') return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: 'np-pe-f' + span
      }, fd.label && /*#__PURE__*/React.createElement("span", {
        className: "np-pe-l"
      }, fd.label), fd.render(f[fd.id], function (v) {
        return set(fd.id, v);
      }, api));
      if (fd.type === 'check') return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: 'np-pe-f' + span
      }, /*#__PURE__*/React.createElement("button", {
        className: 'np-pf-check' + (f[fd.id] ? ' on' : ''),
        onClick: function onClick() {
          hideOsk();
          set(fd.id, !f[fd.id]);
        }
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, fd.label), fd.hint && /*#__PURE__*/React.createElement("small", null, fd.hint))));
      if (fd.type === 'checks') return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: 'np-pe-f' + span
      }, fd.label && /*#__PURE__*/React.createElement("span", {
        className: "np-pe-l"
      }, fd.label), /*#__PURE__*/React.createElement("div", {
        className: "np-gf-chips"
      }, fd.items.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          k = _ref4[0],
          l = _ref4[1];
        var on = !!(f[fd.id] || {})[k];
        return /*#__PURE__*/React.createElement("button", {
          key: k,
          className: 'np-fchip' + (on ? ' on' : ''),
          onClick: function onClick() {
            hideOsk();
            set(fd.id, _objectSpread(_objectSpread({}, f[fd.id] || {}), {}, _defineProperty({}, k, !on)));
          }
        }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
          name: "check"
        })), l);
      })));
      if (fd.type === 'select') {
        var o = optsOf(fd, f).find(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
            v = _ref6[0];
          return v === f[fd.id];
        });
        if (fd.seg) return /*#__PURE__*/React.createElement("div", {
          key: key,
          className: 'np-pe-f' + span
        }, /*#__PURE__*/React.createElement("span", {
          className: "np-pe-l"
        }, fd.label), /*#__PURE__*/React.createElement("div", {
          className: "np-seg"
        }, optsOf(fd, f).map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
            v = _ref8[0],
            l = _ref8[1];
          return /*#__PURE__*/React.createElement("button", {
            key: String(v),
            className: f[fd.id] === v ? 'on' : '',
            onClick: function onClick() {
              hideOsk();
              set(fd.id, v);
            }
          }, l);
        })));
        return /*#__PURE__*/React.createElement("div", {
          key: key,
          className: 'np-pe-f' + span
        }, /*#__PURE__*/React.createElement("span", {
          className: "np-pe-l"
        }, fd.label), /*#__PURE__*/React.createElement("button", {
          className: 'np-pe-sel' + (pick === fd.id ? ' on' : ''),
          onClick: function onClick() {
            hideOsk();
            setPick(fd.id);
          }
        }, /*#__PURE__*/React.createElement("span", null, o ? o[1] : String(f[fd.id] == null ? '—' : f[fd.id])), /*#__PURE__*/React.createElement(Icon, {
          name: "chevron-down"
        })), fd.hint && /*#__PURE__*/React.createElement("span", {
          className: "np-pf-hint"
        }, fd.hint));
      }
      var len = String(f[fd.id] == null ? '' : f[fd.id]).length;
      return /*#__PURE__*/React.createElement("label", {
        key: key,
        className: 'np-pe-f' + span + (fd.w ? ' w' + fd.w : '')
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-pe-l"
      }, fd.label, fd.req && /*#__PURE__*/React.createElement("em", {
        className: "req"
      }, "*"), fd.suffix && /*#__PURE__*/React.createElement("em", null, fd.suffix), fd.max && fd.count && /*#__PURE__*/React.createElement("em", {
        className: "cnt"
      }, len, "/", fd.max)), /*#__PURE__*/React.createElement("span", {
        className: "np-pe-row"
      }, input(fd), fd.after && fd.after(f[fd.id], function (v) {
        return set(fd.id, v);
      }, api)), errs[fd.id] ? /*#__PURE__*/React.createElement("span", {
        className: "np-pe-err"
      }, errs[fd.id]) : fd.hint && /*#__PURE__*/React.createElement("span", {
        className: "np-pf-hint"
      }, typeof fd.hint === 'function' ? fd.hint(f) : fd.hint));
    };
    var renderCard = function renderCard(card, i) {
      return card.when && !card.when(f) ? null : /*#__PURE__*/React.createElement("div", {
        key: i,
        className: 'np-pe-card' + (card.one ? ' one' : '') + (card.three ? ' three' : '')
      }, card.title && /*#__PURE__*/React.createElement("div", {
        className: "np-pf-ct span"
      }, /*#__PURE__*/React.createElement("b", null, card.title), card.sub && /*#__PURE__*/React.createElement("small", null, card.sub)), (card.fields || []).filter(function (fd) {
        return !fd.when || fd.when(f);
      }).map(renderField));
    };
    var fdF = focus && fields[focus];
    var pk = pick && fields[pick];
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: 'np-pe np-pf' + (wide ? '' : ' narrow'),
      onClose: null
    }, /*#__PURE__*/React.createElement("div", _extends({
      className: "np-pf-main np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, title), sub && /*#__PURE__*/React.createElement("small", null, sub)), head, onDelete && /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn danger",
      onClick: onDelete
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), deleteLabel || 'Usuń')), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-pe-body",
      more: false,
      innerRef: bodyRef
    }, cols.length > 1 ? /*#__PURE__*/React.createElement("div", {
      className: "np-pe-cols"
    }, cols.map(function (c, ci) {
      return /*#__PURE__*/React.createElement("div", {
        key: ci,
        className: "np-pe-col"
      }, c.map(renderCard));
    })) : /*#__PURE__*/React.createElement("div", {
      className: "np-pe-col"
    }, cols[0].map(renderCard)))), fdF && (isNum(fdF.type) ? /*#__PURE__*/React.createElement("div", {
      className: "np-pe-osk num"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-numl"
    }, /*#__PURE__*/React.createElement("b", null, fdF.label), /*#__PURE__*/React.createElement("span", null, f[focus] || '—', fdF.suffix ? ' ' + fdF.suffix : '')), /*#__PURE__*/React.createElement(NumPad, {
      onKey: oskKey,
      keys: fdF.type === 'int' ? PAD_INT : PAD_MONEY,
      className: "on-gray"
    }), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: hideOsk
    }, "Gotowe")) : /*#__PURE__*/React.createElement("div", {
      className: "np-pe-osk"
    }, /*#__PURE__*/React.createElement(OSK, {
      onKey: oskKey,
      onHide: hideOsk,
      onEnter: function onEnter() {
        return oskKey('ENTER');
      },
      extra: fdF.extra || ',.-@'
    }))), !fdF && !confirm && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: save
    }, saveLabel)), !fdF && confirm && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot np-pf-confirm"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Odrzuci\u0107 zmiany?"), /*#__PURE__*/React.createElement("small", null, "Wprowadzone dane nie zostan\u0105 zapisane")), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setConfirm(false);
      }
    }, "Wr\xF3\u0107 do edycji"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn red",
      onClick: onCancel
    }, "Odrzu\u0107")), pk && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pick",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget) setPick(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickhead"
    }, /*#__PURE__*/React.createElement("b", null, pk.label), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setPick(null);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-choices",
      more: false
    }, optsOf(pk, f).map(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 2),
        v = _ref0[0],
        l = _ref0[1];
      return /*#__PURE__*/React.createElement("button", {
        key: String(v),
        className: f[pick] === v ? 'on' : '',
        onClick: function onClick() {
          set(pick, v);
          setPick(null);
        }
      }, /*#__PURE__*/React.createElement("span", null, l), f[pick] === v && /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      }));
    }))))));
  }

  /* Tabela: cols [{label, w ('1fr'|'120px'), align, get(row) → node}], zakładki Aktywne/Nieaktywne (tabs), przycisk dodawania */
  function ProgTable(_ref1) {
    var title = _ref1.title,
      sub = _ref1.sub,
      onBack = _ref1.onBack,
      rows = _ref1.rows,
      cols = _ref1.cols,
      onRow = _ref1.onRow,
      addLabel = _ref1.addLabel,
      onAdd = _ref1.onAdd,
      tabs = _ref1.tabs,
      tab = _ref1.tab,
      setTab = _ref1.setTab,
      top = _ref1.top,
      _ref1$empty = _ref1.empty,
      empty = _ref1$empty === void 0 ? 'Brak pozycji' : _ref1$empty,
      bottom = _ref1.bottom,
      right = _ref1.right;
    var tpl = cols.map(function (c) {
      return c.w || 'minmax(0,1fr)';
    }).join(' ') + ' 18px';
    var _useSwipeBack3 = useSwipeBack(onBack),
      _useSwipeBack4 = _slicedToArray(_useSwipeBack3, 2),
      sw = _useSwipeBack4[0],
      swInd = _useSwipeBack4[1];
    return /*#__PURE__*/React.createElement("div", _extends({
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
    }, /*#__PURE__*/React.createElement("b", null, title), sub && /*#__PURE__*/React.createElement("small", null, sub)), tabs && /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-prog-tabs"
    }, tabs.map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        k = _ref11[0],
        l = _ref11[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: tab === k ? 'on' : '',
        onClick: function onClick() {
          return setTab(k);
        }
      }, l);
    })), right, onAdd && /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn ink",
      onClick: onAdd
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), addLabel || 'Dodaj')), top, /*#__PURE__*/React.createElement("div", {
      className: "np-tbl"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-tbl-h",
      style: {
        gridTemplateColumns: tpl
      }
    }, cols.map(function (c, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: c.align === 'r' ? 'r' : c.align === 'c' ? 'c' : ''
      }, c.label);
    }), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-tbl-b",
      more: false
    }, rows.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-tbl-empty"
    }, empty), rows.map(function (r, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: r.id || i,
        className: 'np-tbl-r' + (onRow ? '' : ' ro'),
        style: {
          gridTemplateColumns: tpl
        },
        onClick: function onClick() {
          return onRow && onRow(r, i);
        }
      }, cols.map(function (c, j) {
        return /*#__PURE__*/React.createElement("span", {
          key: j,
          className: (c.align === 'r' ? 'r' : c.align === 'c' ? 'c' : '') + (j === 0 ? ' main' : '') + (c.mono ? ' mono' : '')
        }, c.get(r, i));
      }), onRow ? /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      }) : /*#__PURE__*/React.createElement("span", null));
    }))), bottom);
  }
  Object.assign(window, {
    FormSheet: FormSheet,
    ProgTable: ProgTable,
    useProg: useProg,
    OnScreen: OnScreen,
    useSwipeBack: useSwipeBack
  });
})();