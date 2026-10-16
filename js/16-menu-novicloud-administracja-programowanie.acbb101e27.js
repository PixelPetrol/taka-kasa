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
/* KASA NEXT PRO — Menu: NoviCloud / Administracja / Programowanie / Raporty, Ustawienia, listy */
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
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-subhead-t"
    }, /*#__PURE__*/React.createElement("b", null, title), sub && /*#__PURE__*/React.createElement("small", null, sub)), right, /*#__PURE__*/React.createElement(MenuHomeBtn, {
      onClick: onBack
    }));
  }

  // ── Ustawienia (Administracja › Ustawienia) ──
  function SettingsView(_ref2) {
    var onBack = _ref2.onBack,
      ui = _ref2.ui,
      onAction = _ref2.onAction;
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
    // Motyw bez zapisanej wartości → aktualny (z Tweaks)
    var get = function get(p) {
      return p.id in vals ? vals[p.id] : p.id === 'theme' ? document.documentElement.classList.contains('np-dark') ? 'Ciemny' : 'Jasny' : p.def;
    };
    // Zmiany z zewnątrz (np. motyw z panelu Tweaks) — odśwież widok
    React.useEffect(function () {
      var h = function h() {
        try {
          var s = JSON.parse(localStorage.getItem('nextpro.settings') || 'null');
          if (s) setVals(s);
        } catch (e) {}
      };
      window.addEventListener('np-settings', h);
      return function () {
        return window.removeEventListener('np-settings', h);
      };
    }, []);
    var set = function set(id, v) {
      var cur = vals;
      try {
        cur = JSON.parse(localStorage.getItem('nextpro.settings') || 'null') || vals;
      } catch (e) {}
      var nv = _objectSpread(_objectSpread({}, cur), {}, _defineProperty({}, id, v));
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
    var _useSwipeBack = useSwipeBack(onBack),
      _useSwipeBack2 = _slicedToArray(_useSwipeBack, 2),
      sw = _useSwipeBack2[0],
      swInd = _useSwipeBack2[1];
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "np-menu np-settings np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement("div", {
      className: "np-side"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-side-item np-side-back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left"
    }), /*#__PURE__*/React.createElement("span", null, "Cofnij")), SETTINGS.map(function (s) {
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
      className: "np-set-list"
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
      }, v), p.type === 'action' && /*#__PURE__*/React.createElement("button", {
        className: "np-set-val act",
        onClick: function onClick() {
          return onAction && onAction({
            label: p.label,
            action: p.action
          });
        }
      }, p.btn || 'Otwórz', /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      })));
    }))));
  }

  // ── Asortymenty: drzewo (asortymenty podrzędne), dodawanie, przenoszenie, aktywne / nieaktywne ──
  function GroupsView(_ref3) {
    var onBack = _ref3.onBack,
      ui = _ref3.ui;
    useProductsVer();
    var _NP_DATA2 = NP_DATA,
      GROUPS = _NP_DATA2.GROUPS;
    var _useState = useState('a'),
      _useState2 = _slicedToArray(_useState, 2),
      tab = _useState2[0],
      setTab = _useState2[1];
    var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      ed = _useState4[0],
      setEd = _useState4[1]; // { id?, label, icon, parent, active, isNew }
    var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      moving = _useState6[0],
      setMoving = _useState6[1];
    var _useStored5 = useStored('grpFold', {}),
      _useStored6 = _slicedToArray(_useStored5, 2),
      fold = _useStored6[0],
      setFold = _useStored6[1];
    var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      picking = _useState8[0],
      setPicking = _useState8[1];
    var pickSet = React.useRef(null);
    var _useSwipeBack3 = useSwipeBack(function () {
        return moving ? setMoving(null) : onBack();
      }),
      _useSwipeBack4 = _slicedToArray(_useSwipeBack3, 2),
      sw = _useSwipeBack4[0],
      swInd = _useSwipeBack4[1];
    useKeys(function (k) {
      if (moving && k === 'ESC') {
        setMoving(null);
        return true;
      }
      return false;
    }, 4);
    var all = NP_DB.all();
    var nOf = function nOf(id) {
      var ids = NP_DB.groupSubtree(id);
      return all.filter(function (p) {
        return ids.includes(p.group);
      }).length;
    };
    var nOwn = function nOwn(id) {
      return all.filter(function (p) {
        return p.group === id;
      }).length;
    };
    var pl = function pl(slug) {
      return ((window.PICTOGRAMS || []).find(function (x) {
        return x.slug === slug;
      }) || {}).pl || slug;
    };
    var name = function name(id) {
      return (GROUPS.find(function (g) {
        return g.id === id;
      }) || {}).label;
    };
    var tree = NP_DB.groupTree();
    var hidden = new Set();
    tree.forEach(function (_ref4) {
      var g = _ref4.g;
      if (fold[g.id]) NP_DB.groupSubtree(g.id).slice(1).forEach(function (k) {
        return hidden.add(k);
      });
    });
    var rows = tab === 'a' ? tree.filter(function (_ref5) {
      var g = _ref5.g;
      return g.active !== false && !hidden.has(g.id);
    }) : tree.filter(function (_ref6) {
      var g = _ref6.g;
      return g.active === false;
    });
    var blocked = moving ? new Set(NP_DB.groupSubtree(moving)) : null;
    var drop = function drop(pid) {
      var m = moving;
      setMoving(null);
      if (NP_DB.moveGroup(m, pid)) {
        if (pid) setFold(_objectSpread(_objectSpread({}, fold), {}, _defineProperty({}, pid, false)));
        ui.say(pid ? "\u201E".concat(name(m), "\u201D przeniesiony do \u201E").concat(name(pid), "\u201D") : "\u201E".concat(name(m), "\u201D na najwy\u017Cszym poziomie"), 'ok', 'check');
      }
    };
    var parentOpts = function parentOpts(selfId) {
      return [[null, '(brak — najwyższy poziom)']].concat(tree.filter(function (_ref7) {
        var g = _ref7.g;
        return !selfId || !NP_DB.groupSubtree(selfId).includes(g.id);
      }).map(function (_ref8) {
        var g = _ref8.g,
          depth = _ref8.depth;
        return [g.id, "\u2003".repeat(depth) + (depth ? '└ ' : '') + g.label];
      }));
    };
    var save = function save(f) {
      var label = f.label.trim();
      if (ed.isNew) {
        var id = NP_DB.addGroup(label, f.icon, f.parent);
        if (!f.active) NP_DB.setGroupActive(id, false);
        if (f.parent) setFold(_objectSpread(_objectSpread({}, fold), {}, _defineProperty({}, f.parent, false)));
        ui.say("Asortyment \u201E".concat(label, "\u201D dodany"), 'ok', 'check');
      } else {
        NP_DB.updateGroup(ed.id, label, f.icon);
        if ((f.parent || null) !== (ed.parent || null)) NP_DB.moveGroup(ed.id, f.parent);
        if (f.active !== ed.active) NP_DB.setGroupActive(ed.id, f.active);
        ui.say('Asortyment zapisany', 'ok', 'check');
      }
      setEd(null);
    };
    var del = function del() {
      if (NP_DB.removeGroup(ed.id)) {
        ui.say('Asortyment usunięty', 'info', 'trash-2');
        setEd(null);
      }
    };
    var open = function open(g) {
      return setEd({
        id: g.id,
        label: g.label,
        icon: g.icon,
        custom: g.custom,
        parent: g.parent || null,
        active: g.active !== false
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
      className: "np-sub np-prog np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement("div", {
      className: "np-subhead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-subhead-t"
    }, /*#__PURE__*/React.createElement("b", null, "Asortymenty"), /*#__PURE__*/React.createElement("small", null, GROUPS.filter(function (g) {
      return g.active !== false;
    }).length, " aktywnych \xB7 ", GROUPS.filter(function (g) {
      return g.active === false;
    }).length, " nieaktywnych")), /*#__PURE__*/React.createElement("div", {
      className: "np-seg np-prog-tabs"
    }, [['a', 'Aktywne'], ['n', 'Nieaktywne']].map(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 2),
        k = _ref0[0],
        l = _ref0[1];
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        className: tab === k ? 'on' : '',
        onClick: function onClick() {
          setTab(k);
          setMoving(null);
        }
      }, l);
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-pill-btn ink np-sub-add",
      onClick: function onClick() {
        setMoving(null);
        setEd({
          isNew: true,
          label: '',
          icon: 'package',
          parent: null,
          active: true
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Nowy asortyment"), /*#__PURE__*/React.createElement(MenuHomeBtn, {
      onClick: onBack
    })), moving ? /*#__PURE__*/React.createElement("div", {
      className: "np-grp-movebar"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "move"
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Przenoszenie: ", name(moving)), /*#__PURE__*/React.createElement("small", null, "Dotknij asortyment, do kt\xF3rego ma trafi\u0107, albo przenie\u015B na najwy\u017Cszy poziom")), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return drop(null);
      }
    }, "Najwy\u017Cszy poziom"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setMoving(null);
      }
    }, "Anuluj")) : tab === 'a' && /*#__PURE__*/React.createElement("div", {
      className: "np-prog-info"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "move"
    }), /*#__PURE__*/React.createElement("span", null, "Aby przenie\u015B\u0107 asortyment do innego asortymentu w drzewku, dotknij ikony przenoszenia po prawej stronie nazwy, a potem wska\u017C miejsce. Dotknij nazwy, aby j\u0105 zmieni\u0107.")), /*#__PURE__*/React.createElement("div", {
      className: "np-tbl"
    }, /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-tbl-b np-grp-tree",
      more: false
    }, rows.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-tbl-empty"
    }, tab === 'a' ? 'Brak aktywnych asortymentów' : 'Brak nieaktywnych asortymentów'), rows.map(function (_ref1) {
      var g = _ref1.g,
        depth = _ref1.depth,
        n = _ref1.n;
      var isBlocked = blocked && blocked.has(g.id);
      var target = moving && !isBlocked;
      return /*#__PURE__*/React.createElement("div", {
        key: g.id,
        className: 'np-grp-row' + (moving === g.id ? ' moving' : isBlocked ? ' blocked' : target ? ' target' : ''),
        style: {
          '--d': tab === 'a' ? depth : 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-grp-fold"
      }, tab === 'a' && n > 0 && !moving && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setFold(_objectSpread(_objectSpread({}, fold), {}, _defineProperty({}, g.id, !fold[g.id])));
        },
        "aria-label": fold[g.id] ? 'Rozwiń' : 'Zwiń'
      }, /*#__PURE__*/React.createElement(Icon, {
        name: fold[g.id] ? 'circle-plus' : 'circle-minus'
      }))), /*#__PURE__*/React.createElement("button", {
        className: "np-grp-main",
        onClick: function onClick() {
          return target ? drop(g.id) : moving ? null : open(g);
        }
      }, tab === 'a' && depth > 0 && /*#__PURE__*/React.createElement(Icon, {
        name: "corner-down-right",
        className: "np-grp-branch"
      }), /*#__PURE__*/React.createElement("span", {
        className: "np-grp-ico"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: g.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-list-main"
      }, /*#__PURE__*/React.createElement("b", null, g.label), /*#__PURE__*/React.createElement("small", null, tab === 'n' ? NP_DB.groupPath(g.id) + ' · ' : '', nOf(g.id), " towar\xF3w", n > 0 ? " \xB7 ".concat(n, " podrz\u0119dn").concat(n === 1 ? 'y' : 'e') : '', fold[g.id] && tab === 'a' ? ' · zwinięty' : '')), target && /*#__PURE__*/React.createElement("span", {
        className: "np-grp-drop"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "corner-down-right"
      }), "Przenie\u015B tutaj")), tab === 'a' && !moving && /*#__PURE__*/React.createElement("button", {
        className: "np-grp-move",
        onClick: function onClick() {
          return setMoving(g.id);
        },
        "aria-label": "Przenie\u015B"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "move"
      })), tab === 'n' && /*#__PURE__*/React.createElement("button", {
        className: "np-pill-btn",
        onClick: function onClick() {
          NP_DB.setGroupActive(g.id, true);
          ui.say("\u201E".concat(g.label, "\u201D zn\xF3w aktywny"), 'ok', 'check');
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "undo-2"
      }), "Przywr\xF3\u0107"));
    })))), ed && /*#__PURE__*/React.createElement(FormSheet, {
      wide: false,
      title: ed.isNew ? 'Nowy asortyment' : 'Asortyment',
      sub: ed.isNew ? null : NP_DB.groupPath(ed.id),
      initial: {
        label: ed.label,
        icon: ed.icon,
        parent: ed.parent,
        active: ed.active
      },
      onCancel: function onCancel() {
        return setEd(null);
      },
      onSave: save,
      saveLabel: ed.isNew ? 'Dodaj asortyment' : 'Zapisz',
      onDelete: !ed.isNew && ed.custom && nOwn(ed.id) === 0 && NP_DB.groupKids(ed.id).length === 0 ? del : null,
      deleteLabel: "Usu\u0144",
      validate: function validate(f) {
        return {
          label: GROUPS.some(function (g) {
            return g.id !== ed.id && NPF.norm(g.label) === NPF.norm(f.label.trim());
          }) ? 'Taki asortyment już istnieje' : null
        };
      },
      schema: [{
        one: true,
        fields: [{
          id: 'label',
          label: 'Nazwa asortymentu',
          req: true,
          span: true,
          max: 24,
          count: true
        }, {
          id: 'parent',
          label: 'Asortyment nadrzędny',
          type: 'select',
          span: true,
          options: parentOpts(ed.isNew ? null : ed.id),
          hint: 'Asortyment podrzędny pokazuje się w drzewku pod nadrzędnym; towary nadrzędnego obejmują też podrzędne'
        }, {
          id: 'icon',
          label: 'Piktogram',
          type: 'custom',
          span: true,
          render: function render(v, set) {
            return /*#__PURE__*/React.createElement("button", {
              className: "np-pe-pict",
              onClick: function onClick() {
                pickSet.current = set;
                setPicking(true);
              }
            }, /*#__PURE__*/React.createElement("span", {
              className: "np-pe-pict-ico on"
            }, /*#__PURE__*/React.createElement(Icon, {
              name: v || 'package'
            })), /*#__PURE__*/React.createElement("span", {
              className: "np-pe-pict-t"
            }, /*#__PURE__*/React.createElement("b", null, pl(v || 'package')), /*#__PURE__*/React.createElement("small", null, "Dotknij, aby wybra\u0107 z biblioteki")), /*#__PURE__*/React.createElement(Icon, {
              name: "chevron-right"
            }));
          }
        }, {
          id: 'active',
          type: 'check',
          span: true,
          label: 'Asortyment aktywny',
          hint: 'Nieaktywny (razem z podrzędnymi) znika z listy Towarów i z karty towaru'
        }, {
          type: 'note',
          span: true,
          icon: 'info',
          when: function when() {
            return !ed.isNew && ed.custom && (nOwn(ed.id) > 0 || NP_DB.groupKids(ed.id).length > 0);
          },
          text: 'Asortymentu nie można usunąć, dopóki ma przypisane towary albo asortymenty podrzędne.'
        }, {
          type: 'note',
          span: true,
          icon: 'info',
          when: function when() {
            return !ed.isNew && !ed.custom;
          },
          text: 'Asortyment wbudowany — można zmienić nazwę, piktogram i miejsce w drzewku, nie można go usunąć.'
        }]
      }]
    }), picking && /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(PictogramPicker, {
      title: "Piktogram asortymentu",
      value: null,
      noneLabel: null,
      onClose: function onClose() {
        return setPicking(false);
      },
      onPick: function onPick(slug) {
        if (pickSet.current) pickSet.current(slug);
        setPicking(false);
      }
    })));
  }

  // ── Listy programowania / administracji ──
  function ListView(_ref10) {
    var id = _ref10.id,
      onBack = _ref10.onBack,
      ui = _ref10.ui;
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
    var _useSwipeBack5 = useSwipeBack(onBack),
      _useSwipeBack6 = _slicedToArray(_useSwipeBack5, 2),
      sw = _useSwipeBack6[0],
      swInd = _useSwipeBack6[1];
    var edit = function edit(r) {
      return ui.say(readOnly ? r[1] : "Edycja: ".concat(r[0], " \u2014 w przygotowaniu"), 'info', readOnly ? 'clipboard-list' : 'pencil');
    };
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "np-sub np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement(SubHead, {
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

  // ── Administracja › Naprawy / Operacje serwisowe ──
  var pickList = function pickList(ui, title, items) {
    return ui.dialog({
      tone: 'info',
      title: title,
      className: 'np-choose np-repairs',
      children: /*#__PURE__*/React.createElement("div", {
        className: "np-choices np-rep-list"
      }, items.map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 3),
          t = _ref12[0],
          d = _ref12[1],
          fn = _ref12[2];
        return /*#__PURE__*/React.createElement("button", {
          key: t,
          onClick: function onClick() {
            ui.close();
            fn();
          }
        }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t), /*#__PURE__*/React.createElement("small", null, d)), /*#__PURE__*/React.createElement(Icon, {
          name: "chevron-right"
        }));
      })),
      actions: [{
        label: 'Anuluj',
        cancel: true,
        onClick: ui.close
      }]
    });
  };
  var ask = function ask(ui, title, desc, label, run) {
    var tone = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'warning';
    return ui.dialog({
      tone: tone,
      title: title,
      desc: desc,
      actions: [{
        label: 'Anuluj',
        cancel: true,
        onClick: ui.close
      }, {
        label: label,
        tone: 'red',
        primary: true,
        onClick: function onClick() {
          ui.close();
          run();
        }
      }]
    });
  };
  function repairsMenu(ui) {
    pickList(ui, 'Naprawy', [['Czyszczenie kopii raportów', 'Czyści tabelę bazy FiscalReportECopy. Użycie spowoduje ponowne ściągnięcie z modułu fiskalnego i przesłanie wszystkich kopii raportów dobowych do chmury.', function () {
      return ask(ui, 'Wyczyścić kopie raportów?', 'Kopie raportów dobowych zostaną ponownie pobrane z modułu fiskalnego i wysłane do NoviCloud.', 'Wyczyść', function () {
        return ui.progressThen('Czyszczenie kopii raportów…', 'FiscalReportECopy', 1600, {
          title: 'Kopie raportów wyczyszczone',
          desc: 'Kopie zostaną ponownie przesłane przy najbliższej synchronizacji.'
        });
      });
    }], ['Dowolny SQL', 'Otwiera okno, w którym można wykonać dowolne zapytanie SQL, modyfikujące bazę danych.', function () {
      return ui.dialog({
        tone: 'warning',
        title: 'Dowolny SQL',
        desc: 'Okno zapytań SQL — operacja dostępna dla serwisu. Nieprawidłowe zapytanie może uszkodzić bazę danych kasy.',
        actions: [{
          label: 'Zamknij',
          primary: true,
          onClick: ui.close
        }]
      });
    }], ['Wyłącz tryb gastro', 'Wyłącza tryb gastro, który nieuważnie włączyłeś na kasie.', function () {
      return ask(ui, 'Wyłączyć tryb gastro?', 'Stoliki i rachunki znikną z Paneli. Otwarte rachunki zostaną zachowane.', 'Wyłącz', function () {
        var s = {};
        try {
          s = JSON.parse(localStorage.getItem('nextpro.settings') || '{}') || {};
        } catch (e) {}
        s.gastroTryb = false;
        try {
          localStorage.setItem('nextpro.settings', JSON.stringify(s));
        } catch (e) {}
        window.dispatchEvent(new Event('np-settings'));
        ui.say('Tryb gastro wyłączony', 'ok', 'check');
      }, 'question');
    }], ['Zainstaluj RAD3', 'Instaluje serwis M/platform RAD3 RAD ver. 3. Po użyciu serwis M/platform RAD3 zostanie wyłączony i należy go ponownie włączyć w Ustawienia › Parametry ogólne › M/platform RAD3.', function () {
      return ui.progressThen('Instalowanie M/platform RAD3…', 'RAD ver. 3', 2000, {
        title: 'RAD3 zainstalowany',
        desc: 'Włącz serwis w Ustawienia › Parametry ogólne › M/platform RAD3.'
      });
    }], ['Usuń token RAD3', 'Usuwa klucz i token służące do połączenia z serwisem RAD ver. 3. Uzyskuje się je w procesie rejestracji do serwisu RAD.', function () {
      return ask(ui, 'Usunąć token RAD3?', 'Kasa straci połączenie z serwisem RAD ver. 3 do czasu ponownej rejestracji.', 'Usuń token', function () {
        return ui.say('Token RAD3 usunięty', 'ok', 'check');
      });
    }], ['Usuń MCUID RAD3 (mcuidclear)', 'Usuwa na zdalnym serwerze M/platform RAD3 informację o rejestracji kasy o podanym MCUID. Jeśli jest to MCUID tej kasy, należy również usunąć token RAD3 funkcją powyżej i ponownie zarejestrować tę kasę.', function () {
      return ui.amount({
        title: 'Usuń MCUID RAD3',
        desc: 'Podaj MCUID kasy do wyrejestrowania',
        mode: 'digits',
        maxLen: 16,
        suffix: '',
        confirmLabel: 'Usuń',
        onConfirm: function onConfirm(v) {
          ui.close();
          ui.progressThen('Usuwanie MCUID na serwerze RAD3…', 'MCUID ' + v, 1500, {
            title: 'MCUID usunięty',
            rows: [['MCUID', v]]
          });
        }
      });
    }]]);
  }
  // ── Auto-paragony (serwis): kasa sama wystawia i fiskalizuje losowe dokumenty — do testów ──
  function autoReceiptsAsk(ui, start) {
    ui.dialog({
      tone: 'warning',
      title: 'Auto-paragony',
      desc: 'Opcja serwisowa: kasa sama wystawia, drukuje i fiskalizuje losowe dokumenty. Używaj tylko na kasie testowej — dokumenty trafią do pamięci fiskalnej i CRK.',
      className: 'np-choose',
      children: /*#__PURE__*/React.createElement("div", {
        className: "np-choices"
      }, [['10 paragonów', 10], ['50 paragonów', 50], ['200 paragonów', 200], ['Bez limitu (do zatrzymania)', 0]].map(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
          l = _ref14[0],
          n = _ref14[1];
        return /*#__PURE__*/React.createElement("button", {
          key: l,
          onClick: function onClick() {
            ui.close();
            start({
              n: n,
              inv: false
            });
          }
        }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement(Icon, {
          name: "chevron-right"
        }));
      })),
      actions: [{
        label: 'Anuluj',
        cancel: true,
        onClick: ui.close
      }]
    });
  }
  function AutoReceipts(_ref15) {
    var opts = _ref15.opts,
      ui = _ref15.ui,
      onClose = _ref15.onClose;
    var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      list = _React$useState2[0],
      setList = _React$useState2[1];
    var _React$useState3 = React.useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      run = _React$useState4[0],
      setRun = _React$useState4[1];
    var t0 = React.useRef(Date.now());
    var goods = React.useMemo(function () {
      return NP_DB.all().filter(function (p) {
        return p.active !== false && p.price > 0 && p.group !== 'kaucje';
      });
    }, []);
    var forms = React.useMemo(function () {
      return NP_PROG.payForms();
    }, []);
    var done = opts.n && list.length >= opts.n;
    React.useEffect(function () {
      if (!run || done) return undefined;
      var t = setTimeout(function () {
        var k = 1 + Math.floor(Math.random() * 5);
        var sum = 0;
        for (var j = 0; j < k; j++) {
          var p = goods[Math.floor(Math.random() * goods.length)];
          sum += p.price * (1 + Math.floor(Math.random() * 3));
        }
        var f = forms[Math.floor(Math.random() * forms.length)] || {
          name: 'Gotówka'
        };
        var inv = Math.random() < 0.08;
        setList(function (x) {
          return [{
            no: x.length + 1,
            t: new Date(),
            pos: k,
            sum: NPF.round2(sum),
            form: f.name,
            inv: inv
          }].concat(x).slice(0, 200);
        });
      }, 700 + Math.random() * 500);
      return function () {
        return clearTimeout(t);
      };
    }, [run, list, done]);
    useKeys(function (k) {
      if (k === 'ESC') {
        if (run && !done) setRun(false);else onClose();
      }
      return true;
    }, 45);
    var total = list.reduce(function (s, r) {
      return s + r.sum;
    }, 0);
    var cnt = opts.n ? Math.min(list.length, opts.n) : list.length;
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-cs np-autorc",
      onClose: null
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, "Auto-paragony"), /*#__PURE__*/React.createElement("small", null, done ? 'Zakończono' : run ? 'Wystawianie i fiskalizacja dokumentów…' : 'Wstrzymano', " \xB7 ", cnt, opts.n ? ' / ' + opts.n : '', " dokument\xF3w \xB7 ", NPF.money(total), " z\u0142 \xB7 ", Math.round((Date.now() - t0.current) / 1000), " s")), run && !done && /*#__PURE__*/React.createElement("span", {
      className: "np-spinner"
    })), opts.n > 0 && /*#__PURE__*/React.createElement("div", {
      className: "np-autorc-bar"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: Math.min(100, cnt / opts.n * 100) + '%'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-cs-log np-no-swipe"
    }, list.map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.no
      }, /*#__PURE__*/React.createElement("time", null, r.t.toLocaleTimeString('pl-PL')), /*#__PURE__*/React.createElement("em", null, r.inv ? '[FV]' : '[PAR]'), /*#__PURE__*/React.createElement("span", null, r.inv ? 'Faktura' : 'Paragon', " nr ", String(r.no).padStart(4, '0'), " \xB7 ", r.pos, " poz. \xB7 ", NPF.money(r.sum), " z\u0142 \xB7 ", r.form, " \xB7 zafiskalizowano"));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose,
      disabled: run && !done
    }, "Wyj\u015Bcie"), done ? /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        setList([]);
        t0.current = Date.now();
        setRun(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh-cw"
    }), "Uruchom ponownie") : run ? /*#__PURE__*/React.createElement("button", {
      className: "np-btn red",
      onClick: function onClick() {
        return setRun(false);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }), "Zatrzymaj") : /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        return setRun(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer"
    }), "Wzn\xF3w"))));
  }
  function serviceMenu(ui) {
    var initDb = function initDb() {
      return ui.dialog({
        tone: 'warning',
        title: 'Kontrolowana inicjacja bazy danych',
        desc: 'Usuń wszystkie dokumenty starsze niż:',
        className: 'np-choose',
        children: /*#__PURE__*/React.createElement("div", {
          className: "np-choices"
        }, [['3 miesiące', 3], ['6 miesięcy', 6], ['1 rok', 12], ['2 lata', 24], ['3 lata', 36]].map(function (_ref16) {
          var _ref17 = _slicedToArray(_ref16, 2),
            l = _ref17[0],
            n = _ref17[1];
          var d = new Date();
          d.setMonth(d.getMonth() - n);
          return /*#__PURE__*/React.createElement("button", {
            key: l,
            onClick: function onClick() {
              ui.close();
              ask(ui, 'Usunąć dokumenty?', "Zostan\u0105 usuni\u0119te wszystkie dokumenty starsze ni\u017C ".concat(d.toLocaleDateString('pl-PL'), ", opr\xF3cz rozlicze\u0144 zmian kasjerskich. Operacji nie mo\u017Cna cofn\u0105\u0107."), 'Usuń dokumenty', function () {
                return ui.progressThen('Inicjacja bazy danych…', 'Usuwanie dokumentów sprzed ' + d.toLocaleDateString('pl-PL'), 2000, {
                  title: 'Baza danych zainicjowana',
                  rows: [['Usunięto dokumenty sprzed', d.toLocaleDateString('pl-PL')], ['Rozliczenia zmian', 'zachowane']]
                });
              });
            }
          }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("small", null, "sprzed ", d.toLocaleDateString('pl-PL')));
        })),
        actions: [{
          label: 'Anuluj',
          cancel: true,
          onClick: ui.close
        }]
      });
    };
    pickList(ui, 'Operacje serwisowe', [['Kontrola spójności bazy paragonów', 'Porównuje listę paragonów z bazy danych i modułu fiskalnego. Jeśli znajdzie nieprawidłowy paragon w bazie, to podejmuje próbę jego naprawy na podstawie informacji z modułu fiskalnego.', function () {
      return ui.progressThen('Kontrola spójności bazy paragonów…', 'Porównywanie z modułem fiskalnym', 2200, {
        title: 'Kontrola zakończona',
        rows: [['Sprawdzone paragony', '1 284'], ['Niezgodności', '0'], ['Naprawione', '0']]
      });
    }], ['Kontrolowana inicjacja bazy danych', 'Usuwa wszystkie dokumenty starsze niż wskazana data, oprócz rozliczeń zmian kasjerskich.', initDb], ['Zapis parametrów do bazy', 'Zapisuje (archiwizuje) parametry konfiguracji programu do bazy danych. Archiwizacja powoduje zamrożenie kopii parametrów konfiguracji w pliku bazy (AndroPos.db).', function () {
      return ask(ui, 'Zapisać parametry do bazy?', 'Bieżące parametry konfiguracji zostaną zapisane w pliku bazy AndroPos.db (poprzednia kopia zostanie zastąpiona).', 'Zapisz', function () {
        return ui.progressThen('Zapis parametrów do bazy…', 'AndroPos.db', 1400, {
          title: 'Parametry zapisane',
          rows: [['Plik', 'AndroPos.db'], ['Data kopii', new Date().toLocaleString('pl-PL')]]
        });
      }, 'question');
    }], ['Odczyt parametrów z bazy', 'Odczytuje (dearchiwizuje) zapisane wcześniej parametry konfiguracji z bazy danych.', function () {
      return ask(ui, 'Odczytać parametry z bazy?', 'Bieżące parametry konfiguracji zostaną zastąpione kopią zapisaną w bazie danych.', 'Odczytaj', function () {
        return ui.progressThen('Odczyt parametrów z bazy…', 'AndroPos.db', 1400, {
          title: 'Parametry odczytane',
          desc: 'Przywrócono zapisaną konfigurację programu.'
        });
      });
    }], ['Stan kaucji DRS', 'Otwiera okno z podglądem stanu serwisu kaucyjnego DRS.', function () {
      return ui.dialog({
        tone: 'info',
        title: 'Stan kaucji DRS',
        rows: [['Serwis kaucyjny', 'połączony'], ['Operator systemu', 'DRS Polska'], ['Kaucje pobrane dziś', '14 szt. · 7,00 zł'], ['Kaucje zwrócone dziś', '6 szt. · 3,00 zł'], ['Saldo dnia', '4,00 zł'], ['Ostatnia wymiana danych', new Date().toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit'
        })]],
        actions: [{
          label: 'OK',
          primary: true,
          onClick: ui.close
        }]
      });
    }]]);
  }

  // ── Administracja › O programie ──
  function AboutView(_ref18) {
    var onBack = _ref18.onBack,
      ui = _ref18.ui;
    var _NP_DATA4 = NP_DATA,
      SHOP = _NP_DATA4.SHOP;
    var shop = NP_PROG.get('shop');
    var _useSwipeBack7 = useSwipeBack(onBack),
      _useSwipeBack8 = _slicedToArray(_useSwipeBack7, 2),
      sw = _useSwipeBack8[0],
      swInd = _useSwipeBack8[1];
    var _useState9 = useState(false),
      _useState0 = _slicedToArray(_useState9, 2),
      xml = _useState0[0],
      setXml = _useState0[1];
    useKeys(function (k) {
      if (k === 'ESC') {
        if (xml) setXml(false);else onBack();
        return true;
      }
      return false;
    }, 3);
    var nip = /^\d{10}$/.test(shop.nip || '') ? shop.nip.slice(0, 3) + '-' + shop.nip.slice(3, 6) + '-' + shop.nip.slice(6, 8) + '-' + shop.nip.slice(8) : shop.nip;
    var rows = [['Sprzęt', NP_BRAND.a + ' ' + NP_BRAND.b], ['Nr unikatowy', SHOP.unique], ['Nazwa konta w chmurze', 'wtest'], ['Data instalacji', '2009-01-01 02:00'], ['Data produkcji tej wersji', '2026-10-09 11:04'], ['Wersja', SHOP.versionFull], ['Android wer.', '10'], ['Adres IP', 'wlan0: 192.168.1.11'], ['Rozmiar bazy danych', '1,1 MB'], ['Data fiskalizacji', '2026-05-04 13:08:41'], ['Numer NIP', nip]];
    var appinfo = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<appinfo>\n".concat(rows.map(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
        k = _ref20[0],
        v = _ref20[1];
      return "  <item name=\"".concat(k, "\">").concat(v, "</item>");
    }).join('\n'), "\n  <item name=\"Ekran\">10,1\u2033 \xB7 1280 \xD7 800</item>\n</appinfo>");
    var serial = function serial() {
      return ui.dialog({
        tone: 'info',
        title: 'Parametry serializacji',
        rows: [['Numer unikatowy', SHOP.unique], ['Numer ewidencyjny', 'NX/2026/000842'], ['Model', NP_BRAND.a + ' ' + NP_BRAND.b], ['Moduł fiskalny', 'Novitus HD II Online'], ['Wersja modułu', '1.15'], ['Data serializacji', '2026-05-04 12:41']],
        actions: [{
          label: 'OK',
          primary: true,
          onClick: ui.close
        }]
      });
    };
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "np-sub np-prog np-swipe"
    }, sw), swInd, /*#__PURE__*/React.createElement(SubHead, {
      title: "O programie",
      sub: "Informacje o urz\u0105dzeniu i programie",
      onBack: onBack
    }), /*#__PURE__*/React.createElement("div", {
      className: "np-about"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-about-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-about-rows"
    }, rows.map(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
        k = _ref22[0],
        v = _ref22[1];
      return /*#__PURE__*/React.createElement("div", {
        key: k
      }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("b", null, v));
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-about-btns"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setXml(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-text"
    }), "Otw\xF3rz appinfo.xml"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: serial
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list"
    }), "Parametry serializacji"))), /*#__PURE__*/React.createElement("div", {
      className: "np-about-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-logo big"
    }, NP_BRAND.a, /*#__PURE__*/React.createElement("b", null, NP_BRAND.b)), /*#__PURE__*/React.createElement("div", {
      className: "np-about-ver"
    }, "wersja ", SHOP.versionFull), /*#__PURE__*/React.createElement("div", {
      className: "np-about-prod"
    }, /*#__PURE__*/React.createElement("span", null, "Producentem programu jest"), /*#__PURE__*/React.createElement("b", null, "INSOFT sp. z o.o."), /*#__PURE__*/React.createElement("span", null, "Krak\xF3w, ul. Jasna 3A"), /*#__PURE__*/React.createElement("span", null, "www.insoft.com.pl")), /*#__PURE__*/React.createElement("div", {
      className: "np-about-prod ux"
    }, /*#__PURE__*/React.createElement("span", null, "Projekt interfejsu"), /*#__PURE__*/React.createElement("b", null, "NOVITUS"), /*#__PURE__*/React.createElement("span", null, "Piotr Korona")))), xml && /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-rp-doc wide",
      onClose: function onClose() {
        return setXml(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, "appinfo.xml"), /*#__PURE__*/React.createElement("small", null, "Informacje o aplikacji")), /*#__PURE__*/React.createElement("button", {
      className: "np-round-btn",
      onClick: function onClick() {
        return setXml(false);
      },
      "aria-label": "Zamknij"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement(ScrollArea, {
      className: "np-rp-doc-b",
      more: false
    }, /*#__PURE__*/React.createElement("pre", {
      className: "np-rp-xml"
    }, appinfo)), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return setXml(false);
      }
    }, "Zamknij"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        setXml(false);
        ui.progressThen('Zapisywanie na pendrive…', 'appinfo.xml', 1200, {
          title: 'Zapisano plik',
          rows: [['Plik', 'appinfo.xml'], ['Nośnik', 'Pendrive USB']]
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download"
    }), "Zapisz na pendrive")))));
  }

  // ── NoviCloud: konto kasy ──
  function CloudCard(_ref23) {
    var cloud = _ref23.cloud,
      setCloud = _ref23.setCloud,
      ui = _ref23.ui;
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
  function MenuView(_ref24) {
    var cashier = _ref24.cashier,
      onAction = _ref24.onAction,
      onLogout = _ref24.onLogout,
      ui = _ref24.ui,
      _ref24$exitLabel = _ref24.exitLabel,
      exitLabel = _ref24$exitLabel === void 0 ? 'Wyloguj' : _ref24$exitLabel;
    var _NP_DATA5 = NP_DATA,
      MENU = _NP_DATA5.MENU;
    var _useState1 = useState('admin'),
      _useState10 = _slicedToArray(_useState1, 2),
      cat = _useState10[0],
      setCat = _useState10[1]; // wejście do Menu zawsze na Administracji (główny ekran Menu)
    var _useState11 = useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      sub = _useState12[0],
      setSub = _useState12[1]; // null | {type:'settings'} | {type:'list', id} | {type:'prog', id}
    var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      form = _useState14[0],
      setForm = _useState14[1];
    var _useState15 = useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      cloudRun = _useState16[0],
      setCloudRun = _useState16[1];
    var _useState17 = useState(false),
      _useState18 = _slicedToArray(_useState17, 2),
      autoRc = _useState18[0],
      setAutoRc = _useState18[1];
    var _useState19 = useState(function () {
        return NP_SVC.on();
      }),
      _useState20 = _slicedToArray(_useState19, 2),
      svcOn = _useState20[0],
      setSvcOn = _useState20[1];
    React.useEffect(function () {
      var h = function h() {
        return setSvcOn(NP_SVC.on());
      };
      window.addEventListener('np-svc', h);
      return function () {
        return window.removeEventListener('np-svc', h);
      };
    }, []); // formularz programowania nad siatką Menu (Dane sklepu, Stopka, Kod QR)
    var _useStored7 = useStored('cloud', {
        logged: true,
        sync: true
      }),
      _useStored8 = _slicedToArray(_useStored7, 2),
      cloud = _useStored8[0],
      setCloud = _useStored8[1];
    var _useSwipeBack9 = useSwipeBack(function () {
        return setSub(null);
      }),
      _useSwipeBack0 = _slicedToArray(_useSwipeBack9, 2),
      swG = _useSwipeBack0[0],
      swGInd = _useSwipeBack0[1];
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
      if (a === 'conn') {
        setCloudRun({
          kind: 'status',
          k: Date.now()
        });
        return;
      }
      if (a === 'repairs') {
        repairsMenu(ui);
        return;
      }
      if (a === 'autoReceipts') {
        autoReceiptsAsk(ui, function (o) {
          return setAutoRc(o);
        });
        return;
      }
      if (a === 'service') {
        serviceMenu(ui);
        return;
      }
      if (a === 'exportReports') {
        ui.dialog({
          tone: 'info',
          title: 'Eksport raportów dobowych',
          desc: 'Raporty dobowe zostaną wysłane do NoviCloud za chwilę, podczas synchronizacji danych, która została właśnie uruchomiona w tle. Przebieg możesz podejrzeć w Status połączenia.',
          actions: [{
            label: 'Status połączenia',
            onClick: function onClick() {
              ui.close();
              setCloudRun({
                kind: 'status',
                k: Date.now()
              });
            }
          }, {
            label: 'OK',
            primary: true,
            onClick: ui.close
          }]
        });
        return;
      }
      if (a === 'cloudExport') {
        setCloudRun({
          kind: 'export',
          k: Date.now()
        });
        return;
      }
      if (a === 'cloudImport') {
        importAsk(ui, function () {
          return setCloudRun({
            kind: 'import',
            k: Date.now()
          });
        });
        return;
      }
      if (a === 'archive') {
        rodoArchive(ui);
        return;
      }
      if (a === 'restoreServer') {
        restoreServer(ui);
        return;
      }
      if (a === 'settings') {
        setSub({
          type: 'settings'
        });
        return;
      }
      if (a === 'about') {
        setSub({
          type: 'about'
        });
        return;
      }
      if (a.startsWith('rpt:')) {
        var id = a.slice(4);
        if (window.REPORT_FORMS && REPORT_FORMS[id]) setForm('rpt:' + id);else if (window.REPORT_VIEWS && REPORT_VIEWS[id]) setSub({
          type: 'rpt',
          id: id
        });
        return;
      }
      if (a.startsWith('list:')) {
        var _id = a.slice(5);
        if (window.PROG_FORMS && PROG_FORMS[_id]) {
          setForm(_id);
          return;
        }
        setSub({
          type: window.PROG_VIEWS && PROG_VIEWS[_id] ? 'prog' : 'list',
          id: _id
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
    var toRoot = function toRoot() {
      return setSub(null);
    };
    var subEl = null;
    if (sub) {
      if (sub.type === 'about') subEl = /*#__PURE__*/React.createElement(AboutView, {
        onBack: toRoot,
        ui: ui
      });else if (sub.type === 'settings') subEl = /*#__PURE__*/React.createElement(SettingsView, {
        onBack: toRoot,
        ui: ui,
        onAction: onAction
      });else if (sub.type === 'list' && sub.id === 'groups') subEl = /*#__PURE__*/React.createElement(GroupsView, {
        onBack: toRoot,
        ui: ui
      });else if (sub.type === 'prog') {
        var V = PROG_VIEWS[sub.id];
        subEl = /*#__PURE__*/React.createElement(V, {
          onBack: toRoot,
          ui: ui
        });
      } else if (sub.type === 'rpt') {
        var _V = REPORT_VIEWS[sub.id];
        subEl = /*#__PURE__*/React.createElement(_V, {
          key: sub.id,
          onBack: toRoot,
          ui: ui
        });
      } else if (sub.type === 'list') subEl = /*#__PURE__*/React.createElement(ListView, {
        id: sub.id,
        onBack: toRoot,
        ui: ui
      });else if (sub.type === 'goods') subEl = /*#__PURE__*/React.createElement("div", _extends({
        className: "np-sub np-swipe"
      }, swG), swGInd, /*#__PURE__*/React.createElement(SubHead, {
        title: "Towary",
        sub: "Programowanie \xB7 dotknij towar, aby go edytowa\u0107",
        onBack: toRoot
      }), /*#__PURE__*/React.createElement("div", {
        className: "np-sub-body"
      }, /*#__PURE__*/React.createElement(GoodsView, {
        manage: true,
        ui: ui,
        onEdit: ui.editProduct,
        favs: ui.getFavs()
      })));
    }
    if (subEl) return subEl;
    var Form = form && (form.startsWith('rpt:') ? REPORT_FORMS[form.slice(4)] : PROG_FORMS[form]);
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
    }, c.items.filter(function (it) {
      return !it.svc || svcOn;
    }).map(function (it, i) {
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
    }))), Form && /*#__PURE__*/React.createElement(Form, {
      onClose: function onClose() {
        return setForm(null);
      },
      ui: ui
    }), autoRc && /*#__PURE__*/React.createElement(AutoReceipts, {
      opts: autoRc,
      ui: ui,
      onClose: function onClose() {
        return setAutoRc(false);
      }
    }), cloudRun && /*#__PURE__*/React.createElement(CloudSync, {
      key: cloudRun.k,
      kind: cloudRun.kind,
      ui: ui,
      onClose: function onClose() {
        return setCloudRun(null);
      }
    }));
  }
  Object.assign(window, {
    MenuView: React.memo(MenuView),
    SettingsView: SettingsView,
    ListView: ListView
  });
})();