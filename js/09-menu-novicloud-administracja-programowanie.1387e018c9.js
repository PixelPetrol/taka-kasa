"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
/* TAKA KASA — Menu: NoviCloud / Administracja / Programowanie / Raporty, Ustawienia, listy */
(function () {
  var _React = React,
    useState = _React.useState;
  function SubHead(_ref) {
    var title = _ref.title,
      sub = _ref.sub,
      onBack = _ref.onBack,
      _ref$backLabel = _ref.backLabel,
      backLabel = _ref$backLabel === void 0 ? 'Menu' : _ref$backLabel,
      right = _ref.right;
    return /*#__PURE__*/React.createElement("div", {
      className: "np-subhead"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), backLabel), /*#__PURE__*/React.createElement("div", {
      className: "np-subhead-t"
    }, /*#__PURE__*/React.createElement("b", null, title), sub && /*#__PURE__*/React.createElement("small", null, sub)), right);
  }

  // ── Ustawienia (Administracja › Ustawienia) ──
  function SettingsView(_ref2) {
    var onBack = _ref2.onBack,
      ui = _ref2.ui;
    var _NP_DATA = NP_DATA,
      SETTINGS = _NP_DATA.SETTINGS;
    var _useStored = useStored('setCat', 'ogolne'),
      _useStored2 = _slicedToArray(_useStored, 2),
      cat = _useStored2[0],
      setCat = _useStored2[1];
    var _useStored3 = useStored('settings', {}),
      _useStored4 = _slicedToArray(_useStored3, 2),
      vals = _useStored4[0],
      setVals = _useStored4[1];
    var c = SETTINGS.find(function (x) {
      return x.id === cat;
    }) || SETTINGS[0];
    var get = function get(p) {
      return p.id in vals ? vals[p.id] : p.def;
    };
    var set = function set(id, v) {
      var nv = _objectSpread(_objectSpread({}, vals), {}, _defineProperty({}, id, v));
      try {
        localStorage.setItem('nextpro.settings', JSON.stringify(nv));
      } catch (e) {}
      setVals(nv);
      window.dispatchEvent(new Event('np-settings'));
    };
    var editNum = function editNum(p) {
      return ui.amount({
        title: p.label,
        desc: c.label,
        mode: 'digits',
        maxLen: p.max || 4,
        initial: String(get(p)),
        suffix: '',
        confirmLabel: 'Zapisz',
        validate: function validate(x) {
          return +x > 0 ? null : 'Wartość musi być większa od zera';
        },
        onConfirm: function onConfirm(x) {
          ui.close();
          set(p.id, +x);
        }
      });
    };
    var editSel = function editSel(p) {
      return ui.dialog({
        tone: 'question',
        title: p.label,
        desc: p.desc,
        className: 'np-choose',
        children: /*#__PURE__*/React.createElement("div", {
          className: "np-choices"
        }, p.options.map(function (o) {
          return /*#__PURE__*/React.createElement("button", {
            key: o,
            className: o === get(p) ? 'on' : '',
            onClick: function onClick() {
              set(p.id, o);
              ui.close();
            }
          }, /*#__PURE__*/React.createElement("span", null, o), o === get(p) && /*#__PURE__*/React.createElement(Icon, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "np-menu np-settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-side"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-side-item np-side-back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), /*#__PURE__*/React.createElement("span", null, "Menu")), SETTINGS.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: 'np-side-item' + (s.id === c.id ? ' on' : ''),
        onClick: function onClick() {
          return setCat(s.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: 'np-side-chip bg-' + s.color
      }, /*#__PURE__*/React.createElement(Icon, {
        name: s.icon
      })), /*#__PURE__*/React.createElement("span", null, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-menu-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-menu-title"
    }, c.label), /*#__PURE__*/React.createElement(ScrollArea, {
      key: c.id,
      className: "np-set-list",
      more: false
    }, c.params.map(function (p) {
      var v = get(p);
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        className: "np-set-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-set-txt"
      }, /*#__PURE__*/React.createElement("b", null, p.label, p.hidden && /*#__PURE__*/React.createElement("i", null, "parametr ukryty")), /*#__PURE__*/React.createElement("span", null, p.desc)), p.type === 'toggle' && /*#__PURE__*/React.createElement("button", {
        className: 'np-switch' + (v ? ' on' : ''),
        onClick: function onClick() {
          return set(p.id, !v);
        },
        "aria-label": p.label
      }, /*#__PURE__*/React.createElement("i", null)), p.type === 'num' && /*#__PURE__*/React.createElement("button", {
        className: "np-set-val",
        onClick: function onClick() {
          return editNum(p);
        }
      }, v, /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      })), p.type === 'select' && /*#__PURE__*/React.createElement("button", {
        className: "np-set-val",
        onClick: function onClick() {
          return editSel(p);
        }
      }, v, /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      })), p.type === 'info' && /*#__PURE__*/React.createElement("span", {
        className: "np-set-info"
      }, v));
    }))));
  }

  // ── Asortymenty: piktogram grupy ──
  function GroupsView(_ref3) {
    var onBack = _ref3.onBack,
      ui = _ref3.ui;
    useProductsVer();
    var _NP_DATA2 = NP_DATA,
      GROUPS = _NP_DATA2.GROUPS;
    var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      pick = _useState2[0],
      setPick = _useState2[1];
    var all = NP_DB.all();
    return /*#__PURE__*/React.createElement("div", {
      className: "np-sub"
    }, /*#__PURE__*/React.createElement(SubHead, {
      title: "Asortymenty",
      sub: "Dotknij asortyment, aby przypisa\u0107 piktogram",
      onBack: onBack
    }), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-list-card",
      more: false
    }, GROUPS.map(function (g) {
      return /*#__PURE__*/React.createElement("button", {
        key: g.id,
        className: "np-list-row grp",
        onClick: function onClick() {
          return setPick(g.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grp-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: g.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-list-main"
      }, /*#__PURE__*/React.createElement("b", null, g.label), /*#__PURE__*/React.createElement("small", null, all.filter(function (p) {
        return p.group === g.id;
      }).length, " towar\xF3w \xB7 piktogram: ", ((window.PICTOGRAMS || []).find(function (x) {
        return x.slug === g.icon;
      }) || {}).pl || g.icon)), /*#__PURE__*/React.createElement("span", {
        className: "np-list-val"
      }, "Zmie\u0144"), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      }));
    })), pick && /*#__PURE__*/React.createElement(PictogramPicker, {
      title: 'Piktogram · ' + GROUPS.find(function (g) {
        return g.id === pick;
      }).label,
      value: NP_DB.groupIcon(pick),
      noneLabel: null,
      onClose: function onClose() {
        return setPick(null);
      },
      onPick: function onPick(slug) {
        NP_DB.saveGroupIcon(pick, slug);
        setPick(null);
        ui.say('Piktogram asortymentu zapisany', 'ok', 'check');
      }
    }));
  }

  // ── Listy programowania / administracji ──
  function ListView(_ref4) {
    var id = _ref4.id,
      onBack = _ref4.onBack,
      ui = _ref4.ui;
    var _NP_DATA3 = NP_DATA,
      LISTS = _NP_DATA3.LISTS,
      CASHIERS = _NP_DATA3.CASHIERS,
      GROUPS = _NP_DATA3.GROUPS,
      PRODUCTS = _NP_DATA3.PRODUCTS;
    var L = LISTS[id];
    if (id === 'operators') L = {
      title: 'Operatorzy',
      rows: CASHIERS.map(function (c) {
        return [c.name, c.role, (c.auth === 'pin' ? 'PIN' : 'Hasło alfanumeryczne') + ' · karta ' + c.card];
      })
    };
    if (id === 'groups') L = {
      title: 'Asortymenty',
      rows: GROUPS.map(function (g) {
        return [g.label, PRODUCTS.filter(function (p) {
          return p.group === g.id;
        }).length + ' towarów'];
      })
    };
    if (!L) return null;
    var readOnly = id === 'logs';
    var edit = function edit(r) {
      return ui.say(readOnly ? r[1] : "Edycja: ".concat(r[0], " \u2014 w przygotowaniu"), 'info', readOnly ? 'clipboard-list' : 'pencil');
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "np-sub"
    }, /*#__PURE__*/React.createElement(SubHead, {
      title: L.title,
      sub: "".concat(L.rows.length, " ").concat(L.rows.length === 1 ? 'pozycja' : L.rows.length < 5 ? 'pozycje' : 'pozycji'),
      onBack: onBack,
      right: !readOnly && /*#__PURE__*/React.createElement("button", {
        className: "np-pill-btn ink",
        onClick: function onClick() {
          return ui.say('Dodawanie — w przygotowaniu', 'info', 'plus');
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus"
      }), "Dodaj")
    }), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-list-card",
      more: false
    }, L.rows.map(function (r, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        className: "np-list-row",
        onClick: function onClick() {
          return edit(r);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-list-main"
      }, /*#__PURE__*/React.createElement("b", null, r[0]), r[2] && /*#__PURE__*/React.createElement("small", null, r[2])), /*#__PURE__*/React.createElement("span", {
        className: "np-list-val"
      }, r[1]), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      }));
    })));
  }

  // ── NoviCloud: konto kasy ──
  function CloudCard(_ref5) {
    var cloud = _ref5.cloud,
      setCloud = _ref5.setCloud,
      ui = _ref5.ui;
    var nr = function () {
      try {
        var s = JSON.parse(localStorage.getItem('nextpro.settings') || '{}');
        return s.nrKasy || 1;
      } catch (e) {
        return 1;
      }
    }();
    if (!cloud.logged) {
      return /*#__PURE__*/React.createElement("div", {
        className: "np-cloud off"
      }, /*#__PURE__*/React.createElement("div", {
        className: "np-cloud-head"
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-cloud-dot"
      }), /*#__PURE__*/React.createElement("b", null, "Kasa nie jest po\u0142\u0105czona z NoviCloud")), /*#__PURE__*/React.createElement("button", {
        className: "np-btn blue wide",
        onClick: function onClick() {
          ui.progressThen('Logowanie do NoviCloud…', 'Konto: wtest', 1500, {
            title: 'Kasa połączona z NoviCloud',
            rows: [['Nazwa konta', 'wtest'], ['Numer kasy', String(nr)]]
          });
          setCloud(_objectSpread(_objectSpread({}, cloud), {}, {
            logged: true
          }));
        }
      }, "Zaloguj do NoviCloud"));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "np-cloud"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-cloud-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-cloud-dot on"
    }), /*#__PURE__*/React.createElement("b", null, "Twoja kasa jest w NoviCloud")), /*#__PURE__*/React.createElement("div", {
      className: "np-cloud-rows"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Nazwa konta"), /*#__PURE__*/React.createElement("b", null, "wtest")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Numer kasy"), /*#__PURE__*/React.createElement("b", null, nr))), /*#__PURE__*/React.createElement("div", {
      className: "np-cloud-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'np-check' + (cloud.sync ? ' on' : ''),
      onClick: function onClick() {
        return setCloud(_objectSpread(_objectSpread({}, cloud), {}, {
          sync: !cloud.sync
        }));
      }
    }, /*#__PURE__*/React.createElement("i", null, /*#__PURE__*/React.createElement(Icon, {
      name: "check"
    })), "Synchronizuj kas\u0119 z NoviCloud"), /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn",
      onClick: function onClick() {
        return ui.dialog({
          tone: 'warning',
          title: 'Wylogować kasę z NoviCloud?',
          desc: 'Sprzedaż przestanie być wysyłana do NoviCloud do ponownego zalogowania.',
          actions: [{
            label: 'Anuluj',
            cancel: true,
            onClick: ui.close
          }, {
            label: 'Wyloguj',
            tone: 'red',
            primary: true,
            onClick: function onClick() {
              ui.close();
              setCloud(_objectSpread(_objectSpread({}, cloud), {}, {
                logged: false
              }));
            }
          }]
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "log-out"
    }), "Wyloguj")));
  }
  function MenuView(_ref6) {
    var cashier = _ref6.cashier,
      onAction = _ref6.onAction,
      onLogout = _ref6.onLogout,
      ui = _ref6.ui,
      _ref6$exitLabel = _ref6.exitLabel,
      exitLabel = _ref6$exitLabel === void 0 ? 'Wyloguj' : _ref6$exitLabel;
    var _NP_DATA4 = NP_DATA,
      MENU = _NP_DATA4.MENU;
    var _useStored5 = useStored('menuCat', 'admin'),
      _useStored6 = _slicedToArray(_useStored5, 2),
      cat = _useStored6[0],
      setCat = _useStored6[1];
    var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      sub = _useState4[0],
      setSub = _useState4[1]; // null | {type:'settings'} | {type:'list', id}
    var _useStored7 = useStored('cloud', {
        logged: true,
        sync: true
      }),
      _useStored8 = _slicedToArray(_useStored7, 2),
      cloud = _useStored8[0],
      setCloud = _useStored8[1];
    useKeys(function (k) {
      if (sub && k === 'ESC') {
        setSub(null);
        return true;
      }
      return false;
    }, 3);
    var c = MENU.find(function (m) {
      return m.id === cat;
    }) || MENU[0];
    var act = function act(it) {
      var a = it.action || '';
      if (c.id === 'cloud' && !cloud.logged) {
        ui.say('Najpierw zaloguj kasę do NoviCloud', 'err', 'cloud');
        return;
      }
      if (a === 'settings') {
        setSub({
          type: 'settings'
        });
        return;
      }
      if (a.startsWith('list:')) {
        setSub({
          type: 'list',
          id: a.slice(5)
        });
        return;
      }
      if (a === 'goods') {
        setSub({
          type: 'goods'
        });
        return;
      }
      onAction(it);
    };
    if (sub && sub.type === 'settings') return /*#__PURE__*/React.createElement(SettingsView, {
      onBack: function onBack() {
        return setSub(null);
      },
      ui: ui
    });
    if (sub && sub.type === 'list' && sub.id === 'groups') return /*#__PURE__*/React.createElement(GroupsView, {
      onBack: function onBack() {
        return setSub(null);
      },
      ui: ui
    });
    if (sub && sub.type === 'list') return /*#__PURE__*/React.createElement(ListView, {
      id: sub.id,
      onBack: function onBack() {
        return setSub(null);
      },
      ui: ui
    });
    if (sub && sub.type === 'goods') return /*#__PURE__*/React.createElement("div", {
      className: "np-sub"
    }, /*#__PURE__*/React.createElement(SubHead, {
      title: "Towary",
      sub: "Programowanie \xB7 dotknij towar, aby go edytowa\u0107",
      onBack: function onBack() {
        return setSub(null);
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-sub-body"
    }, /*#__PURE__*/React.createElement(GoodsView, {
      manage: true,
      ui: ui,
      onEdit: ui.editProduct,
      favs: ui.getFavs()
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "np-menu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-side"
    }, MENU.map(function (m) {
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'np-side-item' + (m.id === c.id ? ' on' : ''),
        onClick: function onClick() {
          return setCat(m.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: 'np-side-chip bg-' + m.color
      }, /*#__PURE__*/React.createElement(Icon, {
        name: m.icon
      })), /*#__PURE__*/React.createElement("span", null, m.label));
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-side-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-side-user"
    }, /*#__PURE__*/React.createElement(Avatar, {
      c: cashier,
      size: 38
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, cashier.name), /*#__PURE__*/React.createElement("small", null, cashier.role))), /*#__PURE__*/React.createElement("button", {
      className: "np-side-item danger",
      onClick: onLogout
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-side-chip bg-red"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "log-out"
    })), /*#__PURE__*/React.createElement("span", null, exitLabel)))), /*#__PURE__*/React.createElement("div", {
      className: "np-menu-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-menu-title"
    }, c.label), c.id === 'cloud' && /*#__PURE__*/React.createElement(CloudCard, {
      cloud: cloud,
      setCloud: setCloud,
      ui: ui
    }), /*#__PURE__*/React.createElement(ScrollArea, {
      key: c.id,
      variant: "out",
      className: 'np-menu-grid sq' + (c.id === 'cloud' && !cloud.logged ? ' dim' : '')
    }, c.items.map(function (it, i) {
      return /*#__PURE__*/React.createElement("button", {
        key: c.id + i,
        className: 'np-mi' + (it.color ? ' c-' + it.color : ''),
        onClick: function onClick() {
          return act(it);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-mi-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: it.icon
      })), it.badge && /*#__PURE__*/React.createElement("span", {
        className: "np-mi-badge"
      }, it.badge), /*#__PURE__*/React.createElement("span", {
        className: "np-mi-label"
      }, it.label));
    }))));
  }
  Object.assign(window, {
    MenuView: React.memo(MenuView),
    SettingsView: SettingsView,
    ListView: ListView
  });
})();