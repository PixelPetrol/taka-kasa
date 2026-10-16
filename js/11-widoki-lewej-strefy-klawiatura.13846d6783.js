"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
/* KASA NEXT PRO — widoki lewej strefy: Klawiatura, Towary, Funkcje F, Menu */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;

  // ── Klawiatura 1:1 z fizyczną klawiaturą kasy (4 × 5) ──
  var KB = [{
    k: 'ESC',
    cls: 'k-esc',
    hint: 'Esc'
  }, {
    k: 'FEED',
    cls: 'k-fn',
    hint: 'P'
  }, {
    k: 'F',
    cls: 'k-fn',
    hint: 'F'
  }, {
    k: 'X',
    cls: 'k-fn',
    hint: 'X'
  }, {
    k: '7'
  }, {
    k: '8'
  }, {
    k: '9'
  }, {
    k: 'CENA',
    cls: 'k-fn',
    hint: 'C'
  }, {
    k: '4'
  }, {
    k: '5'
  }, {
    k: '6'
  }, {
    k: 'KOD',
    cls: 'k-fn',
    hint: 'K'
  }, {
    k: '1'
  }, {
    k: '2'
  }, {
    k: '3'
  }, {
    k: 'RAZEM',
    cls: 'k-fn',
    hint: 'R'
  }, {
    k: '0'
  }, {
    k: ','
  }, {
    k: 'MENU',
    cls: 'k-logo',
    hint: 'M'
  }, {
    k: 'OK',
    cls: 'k-ok',
    hint: 'Enter'
  }];
  function keyFace(k) {
    switch (k) {
      case 'ESC':
        return /*#__PURE__*/React.createElement("span", {
          className: "np-key-big"
        }, "C");
      case 'FEED':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
          name: "roll"
        }), /*#__PURE__*/React.createElement("span", {
          className: "np-key-cap"
        }, "Papier"));
      case 'F':
        return /*#__PURE__*/React.createElement("span", {
          className: "np-key-big"
        }, "F");
      case 'X':
        return /*#__PURE__*/React.createElement("span", {
          className: "np-key-xw"
        }, /*#__PURE__*/React.createElement("b", null, "X"), /*#__PURE__*/React.createElement("span", null, "Waga"));
      case 'CENA':
        return 'Cena';
      case 'KOD':
        return 'Kod';
      case 'RAZEM':
        return 'Razem';
      case 'MENU':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
          name: "dots"
        }), /*#__PURE__*/React.createElement("span", {
          className: "np-key-cap"
        }, "Menu"));
      case 'OK':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
          name: "enter"
        }), /*#__PURE__*/React.createElement("span", {
          className: "np-key-cap"
        }, "OK"));
      default:
        return k;
    }
  }
  var F_IDX = {
    7: 0,
    8: 1,
    9: 2,
    4: 3,
    5: 4,
    6: 5,
    1: 6,
    2: 7,
    3: 8
  };
  var Key = React.memo(function Key(_ref) {
    var d = _ref.d,
      press = _ref.press,
      hints = _ref.hints,
      onPD = _ref.onPD,
      onEnd = _ref.onEnd,
      onCl = _ref.onCl,
      fs = _ref.fs,
      fOn = _ref.fOn;
    if (fs !== undefined) {
      var info = fs ? tileInfo(fs) : null;
      return /*#__PURE__*/React.createElement("button", {
        className: 'np-key k-fx' + (info ? ' c-' + info.color : ' empty') + (press ? ' press' : ''),
        onPointerDown: function onPointerDown(e) {
          return onPD(e, d.k);
        },
        onClick: function onClick() {
          return onCl(d.k);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-key-fn"
      }, "F", d.k), info && info.icon && /*#__PURE__*/React.createElement(Icon, {
        name: info.icon
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-key-fl"
      }, info ? info.label.replace(/\n/g, ' ') : 'brak funkcji'));
    }
    return /*#__PURE__*/React.createElement("button", {
      className: 'np-key ' + (d.cls || 'k-digit') + (press ? ' press' : '') + (fOn === true ? ' f-on' : fOn === 'edit' ? ' f-edit' : '') + (fOn === false ? ' f-dim' : ''),
      onPointerDown: function onPointerDown(e) {
        return onPD(e, d.k);
      },
      onPointerUp: onEnd,
      onPointerLeave: onEnd,
      onPointerCancel: onEnd,
      onClick: function onClick() {
        return onCl(d.k);
      }
    }, fOn === 'edit' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil"
    }), /*#__PURE__*/React.createElement("span", {
      className: "np-key-cap"
    }, "Edytuj")) : keyFace(d.k), hints && d.hint && /*#__PURE__*/React.createElement("span", {
      className: "np-key-hint"
    }, d.hint));
  });
  function KeyboardView(_ref2) {
    var hints = _ref2.hints,
      onLongEsc = _ref2.onLongEsc,
      row = _ref2.row,
      n = _ref2.n,
      onTile = _ref2.onTile,
      onEditRow = _ref2.onEditRow,
      fSlots = _ref2.fSlots;
    var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      pressed = _useState2[0],
      setPressed = _useState2[1];
    var T = useRef({});
    var longRef = useRef(onLongEsc);
    longRef.current = onLongEsc;
    useEffect(function () {
      return NPKeys.onPress(function (k) {
        setPressed(k);
        clearTimeout(T.current.p);
        T.current.p = setTimeout(function () {
          return setPressed(null);
        }, 140);
      });
    }, []);
    // Klawisze reagują od razu na dotknięcie (pointerdown); ESC — na puszczenie (przytrzymanie = wyłączanie)
    var onPD = React.useCallback(function (e, k) {
      if (e.button && e.button > 0) return;
      T.current.pd = k;
      NPKeys.press(k, 'screen');
    }, []);
    var onEnd = React.useCallback(function () {
      return clearTimeout(T.current.l);
    }, []);
    var onCl = React.useCallback(function (k) {
      if (T.current.pd === k) {
        T.current.pd = null;
        return;
      }
      NPKeys.press(k, 'screen');
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-kbv"
    }, /*#__PURE__*/React.createElement(TileRow, {
      slots: row,
      n: n,
      onTile: onTile,
      onEdit: onEditRow
    }), /*#__PURE__*/React.createElement("div", {
      className: 'np-kb' + (fSlots ? ' fmode' : '')
    }, KB.map(function (d) {
      var fi = fSlots ? F_IDX[d.k] : undefined;
      return /*#__PURE__*/React.createElement(Key, {
        key: d.k,
        d: d,
        press: pressed === d.k,
        hints: hints,
        onPD: onPD,
        onEnd: onEnd,
        onCl: onCl,
        fs: fi !== undefined ? fSlots[fi] || null : undefined,
        fOn: fSlots ? d.k === 'F' ? true : d.k === 'MENU' ? 'edit' : d.k === 'ESC' ? undefined : false : undefined
      });
    })));
  }

  // ── Towary: grupy asortymentowe, ulubione, wyszukiwarka z klawiaturą ekranową ──
  var NO_COUNTS = {};
  function GoodsView(_ref3) {
    var onSell = _ref3.onSell,
      favs = _ref3.favs,
      setFavs = _ref3.setFavs,
      _ref3$counts = _ref3.counts,
      counts = _ref3$counts === void 0 ? NO_COUNTS : _ref3$counts,
      ui = _ref3.ui,
      onEdit = _ref3.onEdit,
      manage = _ref3.manage;
    var _NP_DATA = NP_DATA,
      GROUPS = _NP_DATA.GROUPS,
      VAT = _NP_DATA.VAT;
    useProductsVer();
    var PRODUCTS = NP_DB.all();
    var favList = favs || [];
    var _useStored = useStored(manage ? 'goodsGroupM' : 'goodsGroup', manage ? 'all' : 'fav'),
      _useStored2 = _slicedToArray(_useStored, 2),
      grp = _useStored2[0],
      setGrp = _useStored2[1];
    var _useStored3 = useStored('goodsFilter', GF0),
      _useStored4 = _slicedToArray(_useStored3, 2),
      flt = _useStored4[0],
      setFlt = _useStored4[1];
    var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      fOpen = _useState4[0],
      setFOpen = _useState4[1];
    var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      q = _useState6[0],
      setQ = _useState6[1];
    var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      osk = _useState8[0],
      setOsk = _useState8[1];
    var inRef = useRef(null);
    var nq = NPF.norm(q.trim());
    var inGroup = grp === 'fav' ? PRODUCTS.filter(function (p) {
      return favList.includes(p.plu);
    }) : grp === 'all' ? PRODUCTS : function () {
      var ids = NP_DB.groupSubtree(grp);
      return PRODUCTS.filter(function (p) {
        return ids.includes(p.group);
      });
    }();
    var base = nq ? PRODUCTS.filter(function (p) {
      return NPF.norm(p.name).includes(nq) || p.plu === nq || (p.ean || '').startsWith(nq);
    }) : inGroup;
    var list = applyGoodsFilter(base, flt);
    var nFlt = goodsFilterCount(flt);
    var hl = function hl(name) {
      if (!nq) return name;
      var i = NPF.norm(name).indexOf(nq);
      if (i < 0) return name;
      return /*#__PURE__*/React.createElement(React.Fragment, null, name.slice(0, i), /*#__PURE__*/React.createElement("mark", null, name.slice(i, i + nq.length)), name.slice(i + nq.length));
    };
    var toggleFav = function toggleFav(plu) {
      return setFavs && setFavs(function (f) {
        return f.includes(plu) ? f.filter(function (x) {
          return x !== plu;
        }) : [].concat(_toConsumableArray(f), [plu]);
      });
    };
    var oskKey = function oskKey(k) {
      if (k === 'BACK') setQ(function (s) {
        return s.slice(0, -1);
      });else if (k === 'CLEAR') setQ('');else setQ(function (s) {
        return s + k;
      });
    };
    var hideOsk = function hideOsk() {
      setOsk(false);
      if (inRef.current) inRef.current.blur();
    };
    var cnt = function cnt(arr) {
      return applyGoodsFilter(arr, flt).length;
    };
    var side = [].concat(_toConsumableArray(manage ? [] : [{
      id: 'fav',
      label: 'Ulubione',
      icon: 'star',
      n: cnt(PRODUCTS.filter(function (p) {
        return favList.includes(p.plu);
      }))
    }]), [{
      id: 'all',
      label: 'Wszystkie',
      icon: 'list',
      n: cnt(PRODUCTS)
    }], _toConsumableArray(NP_DB.groupTree().filter(function (t) {
      return t.g.active !== false;
    }).map(function (_ref4) {
      var g = _ref4.g,
        depth = _ref4.depth;
      var ids = NP_DB.groupSubtree(g.id);
      return {
        id: g.id,
        label: g.label,
        icon: g.icon,
        depth: depth,
        n: cnt(PRODUCTS.filter(function (p) {
          return ids.includes(p.group);
        }))
      };
    })));
    var title = nq ? "Wyniki dla \u201E".concat(q.trim(), "\u201D") : (side.find(function (s) {
      return s.id === grp;
    }) || side[0]).label;
    var tap = function tap(p) {
      if (manage || p.active === false) onEdit && onEdit(p.plu);else onSell(p);
    };
    var print = function print() {
      if (!list.length) {
        ui && ui.say('Lista towarów jest pusta', 'err', 'printer');
        return;
      }
      ui && ui.progressThen('Drukowanie listy towarów…', "".concat(title, " \xB7 ").concat(list.length, " poz."), Math.min(3000, 1200 + list.length * 20), {
        title: 'Lista towarów wydrukowana',
        rows: [['Lista', title], ['Pozycje', String(list.length)], ['Filtry', filterSummary(flt)]]
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "np-goods"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-side"
    }, side.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: 'np-side-item' + (!nq && grp === s.id ? ' on' : '') + (s.depth ? ' sub' : ''),
        style: s.depth ? {
          paddingLeft: 12 + Math.min(s.depth, 3) * 16
        } : null,
        onClick: function onClick() {
          setGrp(s.id);
          setQ('');
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: s.icon
      }), /*#__PURE__*/React.createElement("span", null, s.label), /*#__PURE__*/React.createElement("small", null, s.n));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-goods-main"
    }, /*#__PURE__*/React.createElement("label", {
      className: 'np-search' + (osk ? ' focus' : '')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("input", {
      ref: inRef,
      value: q,
      inputMode: "none",
      placeholder: "Szukaj po nazwie, PLU lub kodzie EAN",
      onFocus: function onFocus() {
        return setOsk(true);
      },
      onChange: function onChange(e) {
        return setQ(e.target.value);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Escape') hideOsk();
        if (e.key === 'Enter' && list.length === 1) {
          tap(list[0]);
          setQ('');
        }
      }
    }), q && /*#__PURE__*/React.createElement("button", {
      className: "np-search-x",
      onClick: function onClick() {
        return setQ('');
      },
      "aria-label": "Wyczy\u015B\u0107"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-gbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-gbar-title"
    }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("small", null, list.length)), /*#__PURE__*/React.createElement("button", {
      className: 'np-pill-btn' + (nFlt ? ' ink' : ''),
      onClick: function onClick() {
        hideOsk();
        setFOpen(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal"
    }), "Filtry", nFlt ? /*#__PURE__*/React.createElement("i", {
      className: "np-gbar-n"
    }, nFlt) : null), /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: print
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Drukuj"), /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn green",
      onClick: function onClick() {
        return onEdit && onEdit(null);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Nowy towar")), nFlt > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-gactive"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal"
    }), /*#__PURE__*/React.createElement("span", null, filterSummary(flt)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setFlt(GF0);
      }
    }, "Wyczy\u015B\u0107")), /*#__PURE__*/React.createElement(ScrollArea, {
      key: grp + '|' + nq + '|' + JSON.stringify(flt),
      className: "np-glist",
      more: false
    }, list.map(function (p) {
      var fav = favList.includes(p.plu);
      var off = p.active === false;
      return /*#__PURE__*/React.createElement("div", {
        key: p.plu,
        className: 'np-grow' + (manage ? ' manage' : '') + (off ? ' off' : ''),
        role: "button",
        onClick: function onClick() {
          return tap(p);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: 'np-grow-ico' + (NP_DB.pictOf(p) ? ' own' : '')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: NP_DB.listIcon(p)
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-main"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-name"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-t"
      }, hl(p.name)), counts[p.plu] ? /*#__PURE__*/React.createElement("i", {
        className: "np-grow-count"
      }, counts[p.plu]) : null), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-code"
      }, "PLU ", p.plu, p.ean ? ' · ' + p.ean : '', p.type && p.type !== 'Towar' ? ' · ' + p.type.toLowerCase() : '', p.excise ? ' · akcyza' : '', off ? ' · usunięty' : '')), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-vat"
      }, VAT[p.vat]), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-price"
      }, NPF.money(p.price), /*#__PURE__*/React.createElement("small", null, "z\u0142 / ", p.unit)), !manage && /*#__PURE__*/React.createElement("button", {
        className: 'np-star' + (fav ? ' on' : ''),
        onClick: function onClick(e) {
          e.stopPropagation();
          toggleFav(p.plu);
        },
        "aria-label": "Ulubione"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "star"
      })), /*#__PURE__*/React.createElement("button", {
        className: "np-gedit",
        onClick: function onClick(e) {
          e.stopPropagation();
          onEdit && onEdit(p.plu);
        },
        "aria-label": "Edytuj towar"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "pencil"
      })));
    }), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-glist-empty"
    }, nq ? 'Brak towarów pasujących do wyszukiwania' : nFlt ? 'Brak towarów spełniających filtry' : grp === 'fav' ? 'Brak towarów w ulubionych. Dodaj je gwiazdką z listy „Wszystkie”.' : 'Brak towarów w tej grupie')), osk && /*#__PURE__*/React.createElement(OSK, {
      onKey: oskKey,
      onHide: hideOsk
    })), fOpen && /*#__PURE__*/React.createElement(GoodsFilterSheet, {
      value: flt,
      countFor: function countFor(f) {
        return applyGoodsFilter(base, f).length;
      },
      onCancel: function onCancel() {
        return setFOpen(false);
      },
      onApply: function onApply(f) {
        setFlt(f.types && f.types.length === NP_DATA.PRODUCT_TYPES.length ? _objectSpread(_objectSpread({}, f), {}, {
          types: null
        }) : f);
        setFOpen(false);
      }
    }));
  }

  // ── Klawisz F: 3 × 3 programowalnych pól (funkcje lub towary) ──
  // Cyfry z klawiatury odpowiadają położeniu pól: 7-8-9 / 4-5-6 / 1-2-3
  var FKEY_DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
  function FSheet(_ref5) {
    var slots = _ref5.slots,
      initialEdit = _ref5.initialEdit,
      onRun = _ref5.onRun,
      onEdit = _ref5.onEdit,
      onClose = _ref5.onClose,
      counts = _ref5.counts;
    var _useState9 = useState(!!initialEdit),
      _useState0 = _slicedToArray(_useState9, 2),
      edit = _useState0[0],
      setEdit = _useState0[1];
    useKeys(function (k) {
      var i = FKEY_DIGITS.indexOf(k);
      if (i >= 0) {
        if (!edit && slots[i]) onRun(slots[i]);
        return true;
      }
      if (k === 'ESC' || k === 'F') {
        if (edit && !initialEdit) setEdit(false);else onClose();
        return true;
      }
      if (k === 'OK' && edit) {
        setEdit(false);
        return true;
      }
      return true;
    }, 10);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-fsheet-bg",
      onPointerDown: function onPointerDown(e) {
        if (e.target === e.currentTarget) onClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-fsheet"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-fsheet-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-fsheet-title"
    }, "Funkcje", /*#__PURE__*/React.createElement("small", null, edit ? 'Dotknij pole, aby przypisać funkcję lub towar' : 'Wybierz funkcję lub towar')), /*#__PURE__*/React.createElement("button", {
      className: 'np-pill-btn' + (edit ? ' ink' : ''),
      onClick: function onClick() {
        return setEdit(!edit);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: edit ? 'check' : 'pencil'
    }), edit ? 'Gotowe' : 'Edytuj'), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: onClose,
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(TileRow, {
      className: "np-fgrid3",
      slots: slots,
      n: 9,
      cols: 3,
      edit: edit,
      onTile: onRun,
      onEdit: onEdit
    })));
  }
  var TABS = [{
    id: 'klawiatura',
    label: 'Klawiatura',
    icon: 'keyboard'
  }, {
    id: 'panele',
    label: 'Panele',
    icon: 'grid-3x3'
  }, {
    id: 'towary',
    label: 'Towary',
    icon: 'package'
  }, {
    id: 'funkcjeF',
    label: 'Funkcje',
    icon: 'fkey'
  }, {
    id: 'menu',
    label: 'Menu',
    icon: 'menu'
  }];
  function TabBar(_ref6) {
    var tab = _ref6.tab,
      setTab = _ref6.setTab,
      _ref6$disabled = _ref6.disabled,
      disabled = _ref6$disabled === void 0 ? {} : _ref6$disabled,
      _ref6$gastro = _ref6.gastro,
      gastro = _ref6$gastro === void 0 ? false : _ref6$gastro;
    var list = TABS.filter(function (t) {
      return !t.gastro || gastro;
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "np-tabs",
      style: {
        gridTemplateColumns: "repeat(".concat(list.length, ", minmax(0,1fr))")
      }
    }, list.map(function (t) {
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        className: 'np-tab' + (tab === t.id ? ' on' : '') + (disabled[t.id] ? ' dis' : ''),
        onClick: function onClick() {
          return setTab(t.id);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: disabled[t.id] ? 'lock' : t.icon
      }), /*#__PURE__*/React.createElement("span", null, t.label));
    }));
  }
  Object.assign(window, {
    KeyboardView: React.memo(KeyboardView),
    GoodsView: React.memo(GoodsView),
    TabBar: React.memo(TabBar),
    FSheet: FSheet
  });
})();