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
/* TAKA KASA — karta towaru (nowy / edycja) i filtry listy towarów */
(function () {
  var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;

  // ── Filtry listy towarów ──
  var GF0 = {
    active: true,
    deleted: false,
    nonExcise: true,
    excise: true,
    types: null,
    sort: 'name'
  }; // types: null = wszystkie
  function goodsFilterCount(f) {
    var n = 0;
    if (!f.active || f.deleted) n++;
    if (!f.nonExcise || !f.excise) n++;
    if (f.types && f.types.length !== NP_DATA.PRODUCT_TYPES.length) n++;
    return n;
  }
  function applyGoodsFilter(list, f) {
    var out = list.filter(function (p) {
      var act = p.active !== false;
      if (act ? !f.active : !f.deleted) return false;
      if (p.excise ? !f.excise : !f.nonExcise) return false;
      if (f.types && !f.types.includes(p.type || 'Towar')) return false;
      return true;
    });
    return f.sort === 'code' ? out.sort(function (a, b) {
      return (+a.plu || 0) - (+b.plu || 0);
    }) : out.sort(function (a, b) {
      return a.name.localeCompare(b.name, 'pl');
    });
  }
  function filterSummary(f) {
    var parts = [];
    parts.push(f.active && f.deleted ? 'aktywne i usunięte' : f.deleted ? 'usunięte' : 'aktywne');
    if (!f.excise) parts.push('nieakcyzowe');else if (!f.nonExcise) parts.push('akcyzowe');
    if (f.types && f.types.length !== NP_DATA.PRODUCT_TYPES.length) parts.push('typ: ' + f.types.join(', ').toLowerCase());
    parts.push('sortowanie: ' + (f.sort === 'code' ? 'kod' : 'nazwa'));
    return parts.join(' · ');
  }
  function GoodsFilterSheet(_ref) {
    var value = _ref.value,
      countFor = _ref.countFor,
      onCancel = _ref.onCancel,
      onApply = _ref.onApply;
    var T = NP_DATA.PRODUCT_TYPES;
    var _useState = useState(function () {
        return _objectSpread(_objectSpread({}, value), {}, {
          types: value.types ? _toConsumableArray(value.types) : _toConsumableArray(T)
        });
      }),
      _useState2 = _slicedToArray(_useState, 2),
      f = _useState2[0],
      setF = _useState2[1];
    useKeys(function (k) {
      if (k === 'ESC') onCancel();else if (k === 'OK') onApply(f);
      return true;
    }, 30);
    var tog = function tog(k) {
      return setF(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, k, !s[k]));
      });
    };
    var togType = function togType(t) {
      return setF(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          types: s.types.includes(t) ? s.types.filter(function (x) {
            return x !== t;
          }) : [].concat(_toConsumableArray(s.types), [t])
        });
      });
    };
    var n = countFor(f);
    var Chip = function Chip(on, label, onClick, key) {
      return /*#__PURE__*/React.createElement("button", {
        key: key || label,
        className: 'np-fchip' + (on ? ' on' : ''),
        onClick: onClick
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), label);
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-gfilter",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-gf-head"
    }, /*#__PURE__*/React.createElement("b", null, "Filtry towar\xF3w"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn-text",
      onClick: function onClick() {
        return setF(_objectSpread(_objectSpread({}, GF0), {}, {
          types: _toConsumableArray(T)
        }));
      }
    }, "Przywr\xF3\u0107 domy\u015Blne")), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-chips"
    }, Chip(f.active, 'Aktywne', function () {
      return tog('active');
    }), Chip(f.deleted, 'Usunięte', function () {
      return tog('deleted');
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "Akcyza"), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-chips"
    }, Chip(f.nonExcise, 'Nieakcyzowe', function () {
      return tog('nonExcise');
    }), Chip(f.excise, 'Akcyzowe', function () {
      return tog('excise');
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "Typ towaru", /*#__PURE__*/React.createElement("button", {
      className: "np-btn-text sm",
      onClick: function onClick() {
        return setF(function (s) {
          return _objectSpread(_objectSpread({}, s), {}, {
            types: s.types.length === T.length ? [] : _toConsumableArray(T)
          });
        });
      }
    }, f.types.length === T.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie')), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-chips"
    }, T.map(function (t) {
      return Chip(f.types.includes(t), t, function () {
        return togType(t);
      }, t);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-sec"
    }, /*#__PURE__*/React.createElement("span", null, "Sortowanie"), /*#__PURE__*/React.createElement("div", {
      className: "np-seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: f.sort === 'name' ? 'on' : '',
      onClick: function onClick() {
        return setF(function (s) {
          return _objectSpread(_objectSpread({}, s), {}, {
            sort: 'name'
          });
        });
      }
    }, "Nazwa"), /*#__PURE__*/React.createElement("button", {
      className: f.sort === 'code' ? 'on' : '',
      onClick: function onClick() {
        return setF(function (s) {
          return _objectSpread(_objectSpread({}, s), {}, {
            sort: 'code'
          });
        });
      }
    }, "Kod"))), /*#__PURE__*/React.createElement("div", {
      className: "np-sheet-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return onApply(f);
      }
    }, "Poka\u017C ", n, " ", n === 1 ? 'towar' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'towary' : 'towarów')));
  }

  // ── Wybór piktogramu z biblioteki (towary, asortymenty) ──
  function PictogramPicker(_ref2) {
    var _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? 'Piktogram' : _ref2$title,
      value = _ref2.value,
      _ref2$noneLabel = _ref2.noneLabel,
      noneLabel = _ref2$noneLabel === void 0 ? 'Bez piktogramu' : _ref2$noneLabel,
      onPick = _ref2.onPick,
      onClose = _ref2.onClose;
    var PICTS = window.PICTOGRAMS || [];
    var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      q = _useState4[0],
      setQ = _useState4[1];
    var _useState5 = useState('all'),
      _useState6 = _slicedToArray(_useState5, 2),
      cat = _useState6[0],
      setCat = _useState6[1];
    var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      osk = _useState8[0],
      setOsk = _useState8[1];
    var inRef = useRef(null);
    useKeys(function (k) {
      if (k === 'ESC') {
        if (osk) {
          setOsk(false);
          if (inRef.current) inRef.current.blur();
        } else onClose();
      }
      return true;
    }, 40);
    var nq = NPF.norm(q.trim());
    var list = PICTS.filter(function (x) {
      return (cat === 'all' || x.cat === cat) && (!nq || NPF.norm(x.pl + ' ' + (x.kw || '')).includes(nq));
    });
    var oskKey = function oskKey(k) {
      if (k === 'BACK') setQ(function (s) {
        return s.slice(0, -1);
      });else if (k === 'CLEAR') setQ('');else setQ(function (s) {
        return s + k;
      });
    };
    var cur = PICTS.find(function (x) {
      return x.slug === value;
    });
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-pictsheet",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ed-pickhead"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pictsheet-cur"
    }, cur ? /*#__PURE__*/React.createElement(Icon, {
      name: cur.slug
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    })), /*#__PURE__*/React.createElement("b", null, title, /*#__PURE__*/React.createElement("small", null, cur ? cur.pl : noneLabel)), noneLabel && /*#__PURE__*/React.createElement("button", {
      className: 'np-pill-btn' + (!value ? ' ink' : ''),
      onClick: function onClick() {
        return onPick(null);
      }
    }, noneLabel), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("label", {
      className: 'np-search sm' + (osk ? ' focus' : '')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("input", {
      ref: inRef,
      inputMode: "none",
      value: q,
      onFocus: function onFocus() {
        return setOsk(true);
      },
      onChange: function onChange(e) {
        return setQ(e.target.value);
      },
      placeholder: "Szukaj piktogramu, np. chleb, kawa, mleko"
    }), q && /*#__PURE__*/React.createElement("button", {
      className: "np-search-x",
      onClick: function onClick() {
        return setQ('');
      },
      "aria-label": "Wyczy\u015B\u0107"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-chips"
    }, /*#__PURE__*/React.createElement("button", {
      className: cat === 'all' ? 'on' : '',
      onClick: function onClick() {
        return setCat('all');
      }
    }, "Wszystkie"), (window.PICTOGRAM_GROUPS || []).map(function (g) {
      return /*#__PURE__*/React.createElement("button", {
        key: g.id,
        className: cat === g.id ? 'on' : '',
        onClick: function onClick() {
          return setCat(g.id);
        }
      }, g.label);
    })), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-pict-grid",
      more: false
    }, list.map(function (x) {
      return /*#__PURE__*/React.createElement("button", {
        key: x.id,
        className: 'np-pict' + (value === x.slug ? ' on' : ''),
        onClick: function onClick() {
          return onPick(x.slug);
        },
        title: x.pl
      }, /*#__PURE__*/React.createElement("span", {
        dangerouslySetInnerHTML: {
          __html: x.svg
        }
      }), /*#__PURE__*/React.createElement("small", null, x.pl));
    }), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-ed-empty"
    }, "Brak piktogram\xF3w")), osk && /*#__PURE__*/React.createElement(OSK, {
      onKey: oskKey,
      onHide: function onHide() {
        setOsk(false);
        if (inRef.current) inRef.current.blur();
      }
    }));
  }

  // ── Karta towaru ──
  var NUM = {
    price: 1,
    priceH: 1,
    priceN: 1,
    priceD: 1,
    stock: 1,
    plu: 1,
    ean: 1
  };
  // Kody dodatkowe: pola o id „xc:<nr>:code|price|mult”
  var xcP = function xcP(id) {
    var m = /^xc:(\d+):(\w+)$/.exec(id || '');
    return m ? [+m[1], m[2]] : null;
  };
  var numKind = function numKind(id) {
    var x = xcP(id);
    if (x) return x[1] === 'price' ? 'money' : 'int';
    return id === 'plu' || id === 'ean' ? 'int' : NUM[id] ? 'money' : null;
  };
  var lblOf = function lblOf(id) {
    var x = xcP(id);
    return x ? {
      code: 'Kod dodatkowy ',
      price: 'Cena kodu ',
      mult: 'Mnożnik kodu '
    }[x[1]] + (x[0] + 1) : LBL[id];
  };
  var readF = function readF(s, id) {
    if (id.startsWith('desc')) return s.desc[+id.slice(4)] || '';
    var x = xcP(id);
    if (x) return (s.codes[x[0]] || {})[x[1]] || '';
    return s[id] || '';
  };
  var writeF = function writeF(s, id, v) {
    if (id.startsWith('desc')) {
      var desc = _toConsumableArray(s.desc);
      desc[+id.slice(4)] = v;
      return _objectSpread(_objectSpread({}, s), {}, {
        desc: desc
      });
    }
    var x = xcP(id);
    if (x) return _objectSpread(_objectSpread({}, s), {}, {
      codes: s.codes.map(function (c, i) {
        return i === x[0] ? _objectSpread(_objectSpread({}, c), {}, _defineProperty({}, x[1], v)) : c;
      })
    });
    return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, id, v));
  };
  var isSup = function isSup(p) {
    return /^Opłata SUP/i.test(p.name);
  };
  var LBL = {
    name: 'Nazwa towaru',
    plu: 'Kod PLU',
    ean: 'Kod kreskowy',
    price: 'Cena detaliczna',
    priceH: 'Cena hurtowa',
    priceN: 'Cena nocna',
    priceD: 'Cena dodatkowa',
    pkwiu: 'Indeks PKWiU/CN',
    stock: 'Ilość na magazynie',
    attrs: 'Atrybuty'
  };
  var toStr = function toStr(v) {
    return v === '' || v == null ? '' : typeof v === 'number' ? String(v).replace('.', ',') : String(v);
  };
  function ProductEditor(_ref3) {
    var product = _ref3.product,
      isFav = _ref3.isFav,
      onCancel = _ref3.onCancel,
      onSave = _ref3.onSave;
    var _NP_DATA = NP_DATA,
      GROUPS = _NP_DATA.GROUPS,
      PRODUCT_TYPES = _NP_DATA.PRODUCT_TYPES,
      PRICE_MODES = _NP_DATA.PRICE_MODES,
      GTU = _NP_DATA.GTU,
      UNITS = _NP_DATA.UNITS,
      PRECS = _NP_DATA.PRECS,
      VAT = _NP_DATA.VAT;
    var isNew = !product;
    var _useState9 = useState(function () {
        var b = isNew ? _objectSpread(_objectSpread({}, NP_DB.blank()), {}, {
          plu: NP_DB.nextPlu()
        }) : _objectSpread(_objectSpread({}, product), {}, {
          desc: _toConsumableArray(product.desc || ['', '', '', '', '']),
          printers: _objectSpread({}, product.printers || {})
        });
        ['price', 'priceH', 'priceN', 'priceD', 'stock'].forEach(function (k) {
          b[k] = toStr(b[k]);
        });
        b.codes = (b.codes || []).map(function (c) {
          return {
            code: c.code || '',
            price: toStr(c.price),
            mult: toStr(c.mult || 1)
          };
        });
        return b;
      }),
      _useState0 = _slicedToArray(_useState9, 2),
      f = _useState0[0],
      setF = _useState0[1];
    var _useState1 = useState(false),
      _useState10 = _slicedToArray(_useState1, 2),
      supOpen = _useState10[0],
      setSupOpen = _useState10[1];
    var _useState11 = useState(!!isFav),
      _useState12 = _slicedToArray(_useState11, 2),
      fav = _useState12[0],
      setFav = _useState12[1];
    var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      focus = _useState14[0],
      setFocus = _useState14[1];
    var _useState15 = useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      pick = _useState16[0],
      setPick = _useState16[1];
    var _useState17 = useState(false),
      _useState18 = _slicedToArray(_useState17, 2),
      pictOpen = _useState18[0],
      setPictOpen = _useState18[1];
    var _useState19 = useState({}),
      _useState20 = _slicedToArray(_useState19, 2),
      errs = _useState20[0],
      setErrs = _useState20[1];
    var bodyRef = useRef(null);
    var inputs = useRef({});
    var set = function set(k, v) {
      setF(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, _defineProperty({}, k, v));
      });
      if (errs[k]) setErrs(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, k, null));
      });
    };
    var getV = function getV(id) {
      return readF(f, id);
    };
    var setV = function setV(id, v) {
      setF(function (s) {
        return writeF(s, id, clean(id, v));
      });
      if (errs[id]) setErrs(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, id, null));
      });
    };
    useKeys(function (k) {
      if (pictOpen) return false;
      if (pick) {
        if (k === 'ESC') setPick(null);
        return true;
      }
      if (k === 'ESC') {
        if (focus) {
          setFocus(null);
          var el = inputs.current[focus];
          if (el) el.blur();
        } else onCancel();
        return true;
      }
      if (k === 'OK' && !focus) {
        save();
        return true;
      }
      return true;
    }, 30);
    // pole z fokusem zawsze widoczne nad klawiaturą ekranową
    useEffect(function () {
      if (!focus) return;
      var el = inputs.current[focus],
        box = bodyRef.current;
      if (!el || !box) return;
      var t = setTimeout(function () {
        var top = el.getBoundingClientRect().top - box.getBoundingClientRect().top,
          sc = box.getBoundingClientRect().height / box.offsetHeight || 1;
        var y = top / sc + box.scrollTop;
        if (y < box.scrollTop + 10 || y + 60 > box.scrollTop + box.clientHeight) box.scrollTo({
          top: Math.max(0, y - 70),
          behavior: 'smooth'
        });
      }, 60);
      return function () {
        return clearTimeout(t);
      };
    }, [focus]);
    function clean(id, v) {
      var k = numKind(id);
      return k ? v.replace('.', ',').replace(k === 'int' ? /[^0-9]/g : /[^0-9,]/g, '') : v;
    }
    var oskKey = function oskKey(k) {
      var id = focus;
      if (!id) return;
      setF(function (s) {
        var cur = readF(s, id);
        var nv = clean(id, k === 'BACK' ? cur.slice(0, -1) : k === 'CLEAR' || k === 'C' ? '' : k === ',' && cur.includes(',') ? cur : (k === ',' && !cur ? '0' : cur) + k);
        return writeF(s, id, nv);
      });
      setErrs(function (e) {
        return e[id] ? _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, id, null)) : e;
      });
    };
    var hideOsk = function hideOsk() {
      var el = inputs.current[focus];
      if (el) el.blur();
      setFocus(null);
    };
    var save = function save() {
      var e = {};
      var name = (f.name || '').trim();
      if (!name) e.name = 'Wpisz nazwę towaru';
      var plu = isNew && (!f.plu || NP_DB.get(f.plu)) ? NP_DB.nextPlu() : f.plu; // PLU nadawany automatycznie
      var usedBy = function usedBy(c) {
        return NP_DB.all().find(function (x) {
          return x.plu !== f.plu && (x.ean === c || (x.codes || []).some(function (y) {
            return y.code === c;
          }));
        });
      };
      if (f.ean) {
        if (!(f.ean.length === 8 || f.ean.length === 13)) e.ean = 'Kod kreskowy ma 8 lub 13 cyfr';else {
          var o = usedBy(f.ean);
          if (o) e.ean = "Kod u\u017Cywany przez \u201E".concat(o.name, "\u201D");
        }
      }
      f.codes.forEach(function (c, i) {
        if (!c.code) return;
        var o = usedBy(c.code);
        if (c.code === f.ean || f.codes.some(function (y, j) {
          return j < i && y.code === c.code;
        })) e["xc:".concat(i, ":code")] = 'Kod powtarza się w tym towarze';else if (o) e["xc:".concat(i, ":code")] = "Kod u\u017Cywany przez \u201E".concat(o.name, "\u201D");
      });
      var price = NPF.parseNum(f.price);
      if (!(price > 0) && f.priceMode !== 'Otwarta') e.price = 'Cena musi być większa od zera';
      if (Object.keys(e).length) {
        setErrs(e);
        var first = ['name', 'ean', 'price'].concat(f.codes.map(function (_, i) {
          return "xc:".concat(i, ":code");
        })).find(function (k) {
          return e[k];
        });
        var el = first && inputs.current[first];
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
      var num = function num(v) {
        return v === '' ? '' : NPF.parseNum(v);
      };
      var codes = f.codes.filter(function (c) {
        return c.code;
      }).map(function (c) {
        return {
          code: c.code,
          price: c.price ? NPF.parseNum(c.price) : '',
          mult: Math.max(1, parseInt(c.mult, 10) || 1)
        };
      });
      var out = _objectSpread(_objectSpread({}, f), {}, {
        plu: plu,
        codes: codes,
        name: name,
        price: price > 0 ? price : 0,
        priceH: num(f.priceH),
        priceN: num(f.priceN),
        priceD: num(f.priceD),
        stock: NPF.parseNum(f.stock) || 0,
        desc: f.desc.map(function (x) {
          return x.trim();
        })
      });
      onSave(out, fav);
    };
    var input = function input(id) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        ph = _ref4.ph,
        big = _ref4.big,
        ro = _ref4.ro,
        area = _ref4.area;
      var val = getV(id);
      var common = {
        ref: function ref(el) {
          inputs.current[id] = el;
        },
        value: val,
        placeholder: ph || lblOf(id) || '',
        readOnly: !!ro,
        inputMode: 'none',
        onFocus: function onFocus() {
          if (!ro) setFocus(id);
        },
        onChange: function onChange(e) {
          return setV(id, e.target.value);
        },
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Escape') hideOsk();
          if (e.key === 'Enter' && !area) hideOsk();
        }
      };
      return area ? /*#__PURE__*/React.createElement("textarea", _extends({}, common, {
        className: 'np-pe-in area' + (focus === id ? ' focus' : ''),
        rows: 3
      })) : /*#__PURE__*/React.createElement("input", _extends({}, common, {
        className: 'np-pe-in' + (big ? ' big' : '') + (numKind(id) ? ' num' : '') + (ro ? ' ro' : '') + (focus === id ? ' focus' : '') + (errs[id] ? ' err' : '')
      }));
    };
    var field = function field(id, label) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return /*#__PURE__*/React.createElement("label", {
        className: 'np-pe-f' + (opts.span ? ' span' : ''),
        key: id
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-pe-l"
      }, label || LBL[id], opts.suffix && /*#__PURE__*/React.createElement("em", null, opts.suffix)), /*#__PURE__*/React.createElement("span", {
        className: "np-pe-row"
      }, input(id, opts), opts.after), errs[id] && /*#__PURE__*/React.createElement("span", {
        className: "np-pe-err"
      }, errs[id]));
    };
    var OPTS = {
      group: {
        label: 'Asortyment',
        list: GROUPS.map(function (g) {
          return [g.id, g.label];
        })
      },
      type: {
        label: 'Typ towaru',
        list: PRODUCT_TYPES.map(function (t) {
          return [t, t];
        })
      },
      vat: {
        label: 'Stawka VAT',
        list: Object.keys(VAT).map(function (k) {
          return [k, "".concat(k, " \xB7 ").concat(VAT[k] === '—' ? 'zw.' : VAT[k])];
        })
      },
      priceMode: {
        label: 'Możliwość zmiany ceny',
        list: PRICE_MODES.map(function (t) {
          return [t, t];
        })
      },
      unit: {
        label: 'Jednostka miary',
        list: UNITS.map(function (u) {
          return [u, u];
        })
      },
      prec: {
        label: 'Precyzja przy sprzedaży',
        list: PRECS
      },
      gtu: {
        label: 'Grupa GTU',
        list: GTU.map(function (g) {
          return [g, g];
        })
      },
      pack: {
        label: 'Opakowanie zwrotne',
        list: [[null, '(brak opakowania)']].concat(NP_DB.all().filter(function (p) {
          return (p.group === 'kaucje' || p.type === 'Opakowanie') && !isSup(p);
        }).map(function (p) {
          return [p.plu, "".concat(p.name, " \xB7 ").concat(NPF.money(p.price), " z\u0142")];
        }))
      }
    };
    var labelOf = function labelOf(k) {
      var o = OPTS[k].list.find(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
          v = _ref6[0];
        return v === f[k];
      });
      return o ? o[1] : String(f[k] == null ? '—' : f[k]);
    };
    var select = function select(k) {
      var extraCls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return /*#__PURE__*/React.createElement("div", {
        className: 'np-pe-f ' + extraCls,
        key: k
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-pe-l"
      }, OPTS[k].label), /*#__PURE__*/React.createElement("button", {
        className: 'np-pe-sel' + (pick === k ? ' on' : ''),
        onClick: function onClick() {
          hideOsk();
          setPick(k);
        }
      }, /*#__PURE__*/React.createElement("span", null, labelOf(k)), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-down"
      })));
    };
    var check = function check(k, label, on, onClick) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: 'np-fchip' + (on ? ' on' : ''),
        onClick: onClick
      }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), label);
    };
    var pr = f.printers || {};
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-pe",
      onClose: null
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, isNew ? 'Nowy towar' : 'Edycja towaru'), /*#__PURE__*/React.createElement("small", null, isNew ? 'Uzupełnij dane i zapisz' : f.active === false ? 'Towar usunięty' : 'Zmień dane i zapisz')), !isNew && (f.active === false ? /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return set('active', true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "undo-2"
    }), "Przywr\xF3\u0107 towar") : /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn danger",
      onClick: function onClick() {
        return set('active', false);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Usu\u0144 towar"))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-pe-body",
      more: false,
      innerRef: bodyRef
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Piktogram", /*#__PURE__*/React.createElement("em", null, "na kafelku i li\u015Bcie towar\xF3w")), /*#__PURE__*/React.createElement("button", {
      className: "np-pe-pict",
      onClick: function onClick() {
        hideOsk();
        setPictOpen(true);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: 'np-pe-pict-ico' + (f.pict ? ' on' : '')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: f.pict || NP_DB.groupIcon(f.group) || 'package'
    })), /*#__PURE__*/React.createElement("span", {
      className: "np-pe-pict-t"
    }, /*#__PURE__*/React.createElement("b", null, f.pict ? ((window.PICTOGRAMS || []).find(function (x) {
      return x.slug === f.pict;
    }) || {}).pl || f.pict : 'Brak — jak asortyment'), /*#__PURE__*/React.createElement("small", null, f.pict ? 'Dotknij, aby zmienić' : 'Dotknij, aby wybrać piktogram')), f.pict && /*#__PURE__*/React.createElement("span", {
      className: "np-pe-pict-x",
      role: "button",
      onClick: function onClick(e) {
        e.stopPropagation();
        set('pict', null);
      },
      "aria-label": "Usu\u0144 piktogram"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    })), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), field('name', null, {
      span: true
    }), field('ean', null, {
      span: true,
      after: /*#__PURE__*/React.createElement("button", {
        className: "np-pe-gen",
        onClick: function onClick() {
          return set('ean', NP_DB.genEan(f.plu || NP_DB.nextPlu()));
        },
        title: "Wygeneruj kod",
        "aria-label": "Wygeneruj kod"
      }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))
    }), f.codes.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Kody dodatkowe", /*#__PURE__*/React.createElement("em", null, "cena za 1 szt. (puste = cena towaru) \xB7 mno\u017Cnik = ilo\u015B\u0107 sprzedawana jednym kodem")), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-xcs"
    }, f.codes.map(function (c, i) {
      return /*#__PURE__*/React.createElement("div", {
        className: "np-pe-xc",
        key: i
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-pe-xc-n"
      }, i + 1), input("xc:".concat(i, ":code"), {
        ph: 'Kod kreskowy'
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-pe-xc-f"
      }, input("xc:".concat(i, ":price"), {
        ph: 'Cena'
      }), /*#__PURE__*/React.createElement("em", null, "z\u0142")), /*#__PURE__*/React.createElement("span", {
        className: "np-pe-xc-f"
      }, /*#__PURE__*/React.createElement("em", null, "\xD7"), input("xc:".concat(i, ":mult"), {
        ph: '1'
      })), /*#__PURE__*/React.createElement("button", {
        className: "np-pe-xc-x",
        onClick: function onClick() {
          hideOsk();
          setF(function (s) {
            return _objectSpread(_objectSpread({}, s), {}, {
              codes: s.codes.filter(function (_, j) {
                return j !== i;
              })
            });
          });
          setErrs({});
        },
        "aria-label": "Usu\u0144 kod"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2"
      })), errs["xc:".concat(i, ":code")] && /*#__PURE__*/React.createElement("span", {
        className: "np-pe-err"
      }, errs["xc:".concat(i, ":code")]));
    }))), /*#__PURE__*/React.createElement("button", {
      className: "np-pe-addcode",
      onClick: function onClick() {
        setF(function (s) {
          return _objectSpread(_objectSpread({}, s), {}, {
            codes: [].concat(_toConsumableArray(s.codes), [{
              code: '',
              price: '',
              mult: '1'
            }])
          });
        });
        setTimeout(function () {
          var el = inputs.current["xc:".concat(f.codes.length, ":code")];
          if (el) el.focus();
        }, 30);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Dodaj kod dodatkowy")), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, field('price', null, {
      big: true,
      span: true,
      suffix: 'zł'
    }), field('priceH', null, {
      suffix: 'zł'
    }), field('priceN', null, {
      suffix: 'zł'
    }), field('priceD', null, {
      suffix: 'zł'
    }), select('priceMode')), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, select('group', 'span'), select('type'), select('vat'), select('unit'), select('prec'))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, select('pack', 'span'), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Opakowania SUP i DRS"), /*#__PURE__*/React.createElement("button", {
      className: "np-pe-sel np-pe-supdrs",
      onClick: function onClick() {
        hideOsk();
        setSupOpen(true);
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "recycle"
    }), [f.pack && 'DRS: ' + ((NP_DB.get(f.pack) || {}).name || '').replace(/^Kaucja — /, ''), f.sup && 'SUP: ' + ((NP_DB.get(f.sup) || {}).name || '').replace(/^Opłata SUP — /, '')].filter(Boolean).join(' · ') || 'Wybierz kaucję DRS lub opłatę SUP'), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right"
    }))), f.pack && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Liczba opakowa\u0144 na sztuk\u0119"), /*#__PURE__*/React.createElement("span", {
      className: "np-pe-step"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return set('packN', Math.max(1, (f.packN || 1) - 1));
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "minus"
    })), /*#__PURE__*/React.createElement("b", null, f.packN || 1), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return set('packN', (f.packN || 1) + 1);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    })))), field('pkwiu'), select('gtu'), field('stock', null, {
      suffix: f.unit
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Totalizery sprzeda\u017Cy"), /*#__PURE__*/React.createElement("span", {
      className: "np-pe-tot"
    }, /*#__PURE__*/React.createElement("span", null, isNew ? '0' : NPF.qty(f.soldQty || 0, f.unit), " ", f.unit), /*#__PURE__*/React.createElement("b", null, NPF.money(f.soldVal || 0), " z\u0142")))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Opcje"), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-chips"
    }, check('excise', 'Towar akcyzowy', f.excise, function () {
      return set('excise', !f.excise);
    }), check('weighed', 'Towar ważony', f.weighed, function () {
      return set('weighed', !f.weighed);
    }), check('mpp', 'Podzielona płatność (MPP)', f.mpp, function () {
      return set('mpp', !f.mpp);
    }), check('fav', 'Ulubione', fav, function () {
      return setFav(!fav);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Drukarki zam\xF3wie\u0144"), /*#__PURE__*/React.createElement("div", {
      className: "np-gf-chips"
    }, check('kasa', 'Drukarka kasy', pr.kasa, function () {
      return set('printers', _objectSpread(_objectSpread({}, pr), {}, {
        kasa: !pr.kasa
      }));
    }), ['e1', 'e2', 'e3'].map(function (k, i) {
      return check(k, 'Zewnętrzna ' + (i + 1), pr[k], function () {
        return set('printers', _objectSpread(_objectSpread({}, pr), {}, _defineProperty({}, k, !pr[k])));
      });
    })))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Opisy dodatkowe towaru"), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-descs"
    }, [0, 1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: i
      }, input('desc' + i, {
        ph: 'Opis ' + (i + 1)
      }));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-f span"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-pe-l"
    }, "Atrybuty"), input('attrs', {
      area: true,
      ph: 'Wpisz kolejne atrybuty w osobnych liniach'
    })))))), focus && (numKind(focus) ? /*#__PURE__*/React.createElement("div", {
      className: "np-pe-osk num"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-numl"
    }, /*#__PURE__*/React.createElement("b", null, lblOf(focus)), /*#__PURE__*/React.createElement("span", null, getV(focus) || '—', ['price', 'priceH', 'priceN', 'priceD'].includes(focus) || /:price$/.test(focus) ? ' zł' : focus === 'stock' ? ' ' + f.unit : '')), /*#__PURE__*/React.createElement(NumPad, {
      onKey: oskKey,
      keys: numKind(focus) === 'int' ? PAD_INT : PAD_MONEY,
      className: "on-gray"
    }), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: hideOsk
    }, "Gotowe")) : /*#__PURE__*/React.createElement("div", {
      className: "np-pe-osk"
    }, /*#__PURE__*/React.createElement(OSK, {
      onKey: oskKey,
      onHide: hideOsk,
      extra: ",.-"
    }))), !focus && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onCancel
    }, "Anuluj"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: save
    }, isNew ? 'Dodaj towar' : 'Zapisz zmiany')), supOpen && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pick",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget) setSupOpen(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickbox np-supdrs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickhead"
    }, /*#__PURE__*/React.createElement("b", null, "Opakowania SUP i DRS"), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setSupOpen(false);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-supdrs-body",
      more: false
    }, [['pack', 'DRS · kaucja za opakowanie zwrotne', 'Doliczana do paragonu, zwracana przy oddaniu opakowania', function (p) {
      return !isSup(p);
    }], ['sup', 'SUP · opłata za opakowanie jednorazowe', 'Opłata za kubek lub pojemnik z tworzywa', isSup]].map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 4),
        k = _ref8[0],
        title = _ref8[1],
        sub = _ref8[2],
        flt = _ref8[3];
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        className: "np-supdrs-sec"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-supdrs-h"
      }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("small", null, sub)), /*#__PURE__*/React.createElement("div", {
        className: "np-choices"
      }, [[null, k === 'pack' ? '(brak kaucji)' : '(brak opłaty)']].concat(NP_DB.all().filter(function (p) {
        return (p.group === 'kaucje' || p.type === 'Opakowanie') && p.active !== false && flt(p);
      }).map(function (p) {
        return [p.plu, "".concat(p.name, " \xB7 ").concat(NPF.money(p.price), " z\u0142")];
      })).map(function (_ref9) {
        var _ref0 = _slicedToArray(_ref9, 2),
          v = _ref0[0],
          l = _ref0[1];
        return /*#__PURE__*/React.createElement("button", {
          key: String(v),
          className: f[k] === v ? 'on' : '',
          onClick: function onClick() {
            return set(k, v);
          }
        }, /*#__PURE__*/React.createElement("span", null, l), f[k] === v && /*#__PURE__*/React.createElement(Icon, {
          name: "check"
        }));
      })));
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return setSupOpen(false);
      }
    }, "Gotowe"))), pictOpen && /*#__PURE__*/React.createElement(PictogramPicker, {
      title: "Piktogram towaru",
      value: f.pict || null,
      noneLabel: "Bez piktogramu",
      onClose: function onClose() {
        return setPictOpen(false);
      },
      onPick: function onPick(slug) {
        set('pict', slug);
        setPictOpen(false);
      }
    }), pick && /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pick",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget) setPick(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-pickhead"
    }, /*#__PURE__*/React.createElement("b", null, OPTS[pick].label), /*#__PURE__*/React.createElement("button", {
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
    }, OPTS[pick].list.map(function (_ref1) {
      var _ref10 = _slicedToArray(_ref1, 2),
        v = _ref10[0],
        l = _ref10[1];
      return /*#__PURE__*/React.createElement("button", {
        key: String(v),
        className: f[pick] === v ? 'on' : '',
        onClick: function onClick() {
          set(pick, v);
          if (pick === 'unit' && f.prec === 'jm') set('weighed', v === 'kg');
          setPick(null);
        }
      }, /*#__PURE__*/React.createElement("span", null, l), f[pick] === v && /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      }));
    })))));
  }
  Object.assign(window, {
    PictogramPicker: PictogramPicker,
    ProductEditor: ProductEditor,
    GoodsFilterSheet: GoodsFilterSheet,
    applyGoodsFilter: applyGoodsFilter,
    goodsFilterCount: goodsFilterCount,
    filterSummary: filterSummary,
    GF0: GF0
  });
})();