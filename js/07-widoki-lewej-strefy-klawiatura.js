"use strict";

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
/* TAKA KASA — widoki lewej strefy: Klawiatura, Towary, Funkcje F, Menu */
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
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
          name: "power"
        }), /*#__PURE__*/React.createElement("span", {
          className: "np-key-cap"
        }, "ESC"));
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
  var Key = React.memo(function Key(_ref) {
    var d = _ref.d,
      press = _ref.press,
      hints = _ref.hints,
      onPD = _ref.onPD,
      onEnd = _ref.onEnd,
      onCl = _ref.onCl;
    return /*#__PURE__*/React.createElement("button", {
      className: 'np-key ' + (d.cls || 'k-digit') + (press ? ' press' : ''),
      onPointerDown: function onPointerDown(e) {
        return onPD(e, d.k);
      },
      onPointerUp: onEnd,
      onPointerLeave: onEnd,
      onPointerCancel: onEnd,
      onClick: function onClick() {
        return onCl(d.k);
      }
    }, keyFace(d.k), hints && d.hint && /*#__PURE__*/React.createElement("span", {
      className: "np-key-hint"
    }, d.hint));
  });
  function KeyboardView(_ref2) {
    var hints = _ref2.hints,
      onLongEsc = _ref2.onLongEsc,
      row = _ref2.row,
      n = _ref2.n,
      onTile = _ref2.onTile,
      onEditRow = _ref2.onEditRow;
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
      if (k === 'ESC') {
        T.current["long"] = false;
        clearTimeout(T.current.l);
        T.current.l = setTimeout(function () {
          T.current["long"] = true;
          longRef.current();
        }, 900);
        return;
      }
      T.current.pd = k;
      NPKeys.press(k, 'screen');
    }, []);
    var onEnd = React.useCallback(function () {
      return clearTimeout(T.current.l);
    }, []);
    var onCl = React.useCallback(function (k) {
      if (k === 'ESC') {
        if (T.current["long"]) {
          T.current["long"] = false;
          return;
        }
        NPKeys.press('ESC', 'screen');
        return;
      }
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
      className: "np-kb"
    }, KB.map(function (d) {
      return /*#__PURE__*/React.createElement(Key, {
        key: d.k,
        d: d,
        press: pressed === d.k,
        hints: hints,
        onPD: onPD,
        onEnd: onEnd,
        onCl: onCl
      });
    })));
  }

  // ── Towary: grupy asortymentowe, ulubione, wyszukiwarka z klawiaturą ekranową ──
  function GoodsView(_ref3) {
    var onSell = _ref3.onSell,
      favs = _ref3.favs,
      setFavs = _ref3.setFavs,
      counts = _ref3.counts;
    var _NP_DATA = NP_DATA,
      PRODUCTS = _NP_DATA.PRODUCTS,
      GROUPS = _NP_DATA.GROUPS,
      VAT = _NP_DATA.VAT;
    var _useStored = useStored('goodsGroup', 'fav'),
      _useStored2 = _slicedToArray(_useStored, 2),
      grp = _useStored2[0],
      setGrp = _useStored2[1];
    var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      q = _useState4[0],
      setQ = _useState4[1];
    var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      osk = _useState6[0],
      setOsk = _useState6[1];
    var inRef = useRef(null);
    var nq = NPF.norm(q.trim());
    var inGroup = grp === 'fav' ? PRODUCTS.filter(function (p) {
      return favs.includes(p.plu);
    }) : grp === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) {
      return p.group === grp;
    });
    var list = nq ? PRODUCTS.filter(function (p) {
      return NPF.norm(p.name).includes(nq) || p.plu === nq || p.ean.startsWith(nq);
    }) : inGroup;
    var hl = function hl(name) {
      if (!nq) return name;
      var i = NPF.norm(name).indexOf(nq);
      if (i < 0) return name;
      return /*#__PURE__*/React.createElement(React.Fragment, null, name.slice(0, i), /*#__PURE__*/React.createElement("mark", null, name.slice(i, i + nq.length)), name.slice(i + nq.length));
    };
    var toggleFav = function toggleFav(plu) {
      return setFavs(function (f) {
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
    var side = [{
      id: 'fav',
      label: 'Ulubione',
      icon: 'star',
      n: favs.length
    }, {
      id: 'all',
      label: 'Wszystkie',
      icon: 'list',
      n: PRODUCTS.length
    }].concat(_toConsumableArray(GROUPS.map(function (g) {
      return {
        id: g.id,
        label: g.label,
        icon: g.icon,
        n: PRODUCTS.filter(function (p) {
          return p.group === g.id;
        }).length
      };
    })));
    var title = nq ? "Wyniki dla \u201E".concat(q.trim(), "\u201D") : (side.find(function (s) {
      return s.id === grp;
    }) || side[0]).label;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-goods"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-side"
    }, side.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: 'np-side-item' + (!nq && grp === s.id ? ' on' : ''),
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
          onSell(list[0]);
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
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      key: grp + '|' + nq,
      className: "np-glist",
      more: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-ghead"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-ghead-title"
    }, title, /*#__PURE__*/React.createElement("small", null, list.length)), /*#__PURE__*/React.createElement("span", null, "VAT"), /*#__PURE__*/React.createElement("span", {
      className: "r"
    }, "Cena"), /*#__PURE__*/React.createElement("span", null)), list.map(function (p) {
      var fav = favs.includes(p.plu);
      return /*#__PURE__*/React.createElement("div", {
        key: p.plu,
        className: "np-grow",
        role: "button",
        onClick: function onClick() {
          return onSell(p);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grow-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: p.icon
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
      }, "PLU ", p.plu, " \xB7 ", p.ean)), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-vat"
      }, VAT[p.vat]), /*#__PURE__*/React.createElement("span", {
        className: "np-grow-price"
      }, NPF.money(p.price), /*#__PURE__*/React.createElement("small", null, "z\u0142 / ", p.unit)), /*#__PURE__*/React.createElement("button", {
        className: 'np-star' + (fav ? ' on' : ''),
        onClick: function onClick(e) {
          e.stopPropagation();
          toggleFav(p.plu);
        },
        "aria-label": "Ulubione"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "star"
      })));
    }), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-glist-empty"
    }, nq ? 'Brak towarów pasujących do wyszukiwania' : 'Brak towarów w tej grupie. Dodaj je gwiazdką z listy „Wszystkie”.')), osk && /*#__PURE__*/React.createElement(OSK, {
      onKey: oskKey,
      onHide: hideOsk
    })));
  }

  // ── Klawisz F: 3 × 3 programowalnych pól (funkcje lub towary) ──
  // Cyfry z klawiatury odpowiadają położeniu pól: 7-8-9 / 4-5-6 / 1-2-3
  var FKEY_DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
  function FSheet(_ref4) {
    var slots = _ref4.slots,
      initialEdit = _ref4.initialEdit,
      onRun = _ref4.onRun,
      onEdit = _ref4.onEdit,
      onClose = _ref4.onClose,
      counts = _ref4.counts;
    var _useState7 = useState(!!initialEdit),
      _useState8 = _slicedToArray(_useState7, 2),
      edit = _useState8[0],
      setEdit = _useState8[1];
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
  function TabBar(_ref5) {
    var tab = _ref5.tab,
      setTab = _ref5.setTab,
      _ref5$disabled = _ref5.disabled,
      disabled = _ref5$disabled === void 0 ? {} : _ref5$disabled;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-tabs"
    }, TABS.map(function (t) {
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