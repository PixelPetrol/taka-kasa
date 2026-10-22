"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
/* KASA NEXT PRO — prawa strona: pasek sumy z buforem kodów + pozycje paragonu */
(function () {
  var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;
  var EV_ICON = {
    scan: 'scan-barcode',
    kod: 'barcode',
    tile: 'grid-3x3',
    list: 'package',
    error: 'circle-alert',
    storno: 'undo-2',
    info: 'check',
    waga: 'scale',
    pay: 'check-check'
  };
  var plural = function plural(n) {
    return n === 1 ? 'pozycja' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'pozycje' : 'pozycji';
  };
  var pad4 = function pad4(n) {
    return String(n).padStart(4, '0');
  };

  // Pasek sumy — zwarty: stan dokumentu tylko ikonami (NIP, faktura, rabat/narzut), bufor kodu i suma
  function SumCard(_ref) {
    var cashier = _ref.cashier,
      receiptNo = _ref.receiptNo,
      place = _ref.place,
      count = _ref.count,
      total = _ref.total,
      subtotal = _ref.subtotal,
      rdAmt = _ref.rdAmt,
      rcptDisc = _ref.rcptDisc,
      onClearRcptDisc = _ref.onClearRcptDisc,
      onDocAdj = _ref.onDocAdj,
      nip = _ref.nip,
      invoice = _ref.invoice,
      buf = _ref.buf,
      scanFlash = _ref.scanFlash;
    var entry = buf.entry,
      qty = buf.qty,
      priceOv = buf.priceOv,
      fMode = buf.fMode,
      mode = buf.mode,
      lastEvent = buf.lastEvent;
    var hasInput = entry || qty || priceOv != null || fMode || mode;
    var txt = NPF.money(total);
    var fs = txt.length <= 6 ? 68 : txt.length <= 8 ? 64 : txt.length <= 10 ? 54 : 46;
    var ini = cashier.name.split(' ').map(function (s) {
      return s[0];
    }).join('').slice(0, 2);
    var adj = rcptDisc && rdAmt !== 0;
    var adjTxt = adj ? "".concat(rdAmt < 0 ? 'narzut +' : 'rabat −').concat(NPF.money(Math.abs(rdAmt))).concat(rcptDisc.type === 'pct' ? ' (' + String(rcptDisc.v).replace('.', ',') + '%)' : '') : '';
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-sumcard cmp' + (scanFlash ? ' scan' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-sum-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-sum-who"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        background: cashier.color
      }
    }, ini), /*#__PURE__*/React.createElement("b", null, cashier.name)), /*#__PURE__*/React.createElement("span", {
      className: 'np-sum-no' + (place ? ' place' : '')
    }, place || 'Paragon ' + pad4(receiptNo))), /*#__PURE__*/React.createElement("div", {
      className: "np-sum-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-buffer"
    }, hasInput ? /*#__PURE__*/React.createElement(React.Fragment, null, mode && /*#__PURE__*/React.createElement("span", {
      className: 'np-chip m-' + mode
    }, /*#__PURE__*/React.createElement(Icon, {
      name: mode === 'return' ? 'recycle' : 'search'
    }), mode === 'return' ? 'Zwrot' : 'Cena?'), qty && /*#__PURE__*/React.createElement("span", {
      className: "np-chip c-qty"
    }, NPF.qty(qty.v, qty.unit), qty.unit === 'kg' ? ' kg' : '', " \xD7"), priceOv != null && /*#__PURE__*/React.createElement("span", {
      className: "np-chip c-price"
    }, /*#__PURE__*/React.createElement("small", null, "Cena"), NPF.money(priceOv)), fMode && /*#__PURE__*/React.createElement("span", {
      className: "np-chip c-f"
    }, "F"), /*#__PURE__*/React.createElement("span", {
      className: "np-entry"
    }, entry, /*#__PURE__*/React.createElement("i", {
      className: "np-caret"
    }))) : lastEvent ? /*#__PURE__*/React.createElement("span", {
      className: 'np-event e-' + lastEvent.kind,
      key: lastEvent.id
    }, /*#__PURE__*/React.createElement(Icon, {
      name: EV_ICON[lastEvent.kind] || 'check'
    }), lastEvent.code && /*#__PURE__*/React.createElement("code", null, lastEvent.code), /*#__PURE__*/React.createElement("span", null, lastEvent.text)) : /*#__PURE__*/React.createElement("span", {
      className: "np-buffer-ph"
    }, "Wpisz kod lub zeskanuj"))), /*#__PURE__*/React.createElement("div", {
      className: "np-total-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-sum-flags"
    }, nip && /*#__PURE__*/React.createElement("span", {
      className: "np-flag f-nip",
      title: 'NIP ' + NPF.nip(nip)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user"
    })), invoice && /*#__PURE__*/React.createElement("span", {
      className: "np-flag f-fv",
      title: "Faktura"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-text"
    })), /*#__PURE__*/React.createElement("button", {
      className: 'np-flag f-adj' + (adj ? rdAmt < 0 ? ' up' : ' on' : ''),
      onClick: onDocAdj,
      disabled: !count,
      title: "Rabat / narzut na paragon",
      "aria-label": "Rabat / narzut na paragon"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: adj && rdAmt < 0 ? 'trending-up' : 'percent'
    })), /*#__PURE__*/React.createElement("span", {
      className: "np-sum-sub"
    }, adj ? /*#__PURE__*/React.createElement("em", {
      className: rdAmt < 0 ? 'up' : ''
    }, adjTxt) : count ? "".concat(count, " ").concat(plural(count)) : 'brak pozycji')), /*#__PURE__*/React.createElement("span", {
      className: "np-total",
      key: txt,
      style: {
        fontSize: fs
      }
    }, txt, /*#__PURE__*/React.createElement("small", null, "z\u0142"))));
  }
  function ReceiptLine(_ref2) {
    var l = _ref2.l,
      sel = _ref2.sel,
      flash = _ref2.flash,
      onSel = _ref2.onSel,
      onQty = _ref2.onQty,
      onRemove = _ref2.onRemove,
      onAction = _ref2.onAction;
    var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      dx = _useState2[0],
      setDx = _useState2[1];
    var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      drag = _useState4[0],
      setDrag = _useState4[1];
    var S = useRef({}).current;
    var onDown = function onDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('button')) return;
      var el = e.currentTarget;
      var sc = el.getBoundingClientRect().width / el.offsetWidth || 1;
      Object.assign(S, {
        x0: e.clientX,
        y0: e.clientY,
        base: dx,
        sc: sc,
        mode: null,
        "long": false
      });
      var move = function move(ev) {
        var ddx = (ev.clientX - S.x0) / S.sc,
          ddy = (ev.clientY - S.y0) / S.sc;
        if (S.mode === 'long') return;
        if (!S.mode) {
          if (Math.hypot(ddx, ddy) < 6) return;
          clearTimeout(S.lt);
          S.mode = Math.abs(ddx) > Math.abs(ddy) ? 'x' : 'y';
          if (S.mode === 'x') setDrag(true);
        }
        if (S.mode === 'x') setDx(Math.max(-150, Math.min(0, S.base + ddx)));
      };
      var _up = function up() {
        clearTimeout(S.lt);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', _up);
        window.removeEventListener('pointercancel', _up);
        if (S.mode === 'x') {
          setDrag(false);
          setDx(function (d) {
            return d < -50 ? -108 : 0;
          });
        } else if (!S.mode) {
          if (S.base < 0) setDx(0);
          onAction('menu', l);
        }
        S.mode = null;
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', _up);
      window.addEventListener('pointercancel', _up);
    };
    var total = NPF.round2(l.qty * l.price * (1 - (l.adj || 0) / 100));
    var isKg = l.unit === 'kg';
    var canDec = Math.abs(l.qty) > 1;
    var sg = Math.sign(l.qty) || 1;
    return /*#__PURE__*/React.createElement("div", {
      className: 'np-line-wrap' + (flash ? ' flash' : ''),
      "data-line": l.id
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-line-del",
      style: {
        opacity: dx < 0 ? 1 : 0
      },
      onClick: function onClick() {
        return onRemove(l.id);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2"
    }), "Storno"), /*#__PURE__*/React.createElement("div", {
      className: 'np-line qb' + (sel ? ' sel' : '') + (drag ? ' dragging' : '') + (l.qty < 0 ? ' ret' : ''),
      style: {
        transform: "translateX(".concat(dx, "px)")
      },
      onPointerDown: onDown
    }, /*#__PURE__*/React.createElement("button", {
      className: 'np-qb' + (canDec ? '' : ' del'),
      onClick: function onClick() {
        return canDec ? onQty(l.id, -sg) : onRemove(l.id);
      },
      "aria-label": canDec ? 'Mniej' : 'Usuń'
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-qb-in"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: canDec ? 'minus' : 'trash-2'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-line-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-line-r1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-line-name"
    }, l.qty < 0 && /*#__PURE__*/React.createElement("em", null, "Zwrot \xB7 "), l.name)), (l.note || l.attrs && l.attrs.length > 0) && /*#__PURE__*/React.createElement("div", {
      className: "np-line-note"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "notebook-pen"
    }), [].concat(_toConsumableArray(l.attrs || []), [l.note]).filter(Boolean).join(' · ')), /*#__PURE__*/React.createElement("div", {
      className: "np-line-r2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-line-calc"
    }, /*#__PURE__*/React.createElement("span", null, NPF.qty(l.qty, l.unit), isKg ? ' kg' : '', " \xD7 ", NPF.money(l.price), isKg ? ' zł/kg' : ''), l.ov && /*#__PURE__*/React.createElement("i", {
      className: "np-ov"
    }, "nowa cena"), l.adj ? /*#__PURE__*/React.createElement("i", {
      className: 'np-adj' + (l.adj < 0 ? ' up' : '')
    }, l.adj > 0 ? 'rabat −' : 'narzut +', Math.abs(l.adj), "%") : null), /*#__PURE__*/React.createElement("span", {
      className: "np-line-total"
    }, NPF.money(total)))), /*#__PURE__*/React.createElement("button", {
      className: "np-qb plus",
      onClick: function onClick() {
        return onQty(l.id, sg);
      },
      "aria-label": "Wi\u0119cej"
    }, /*#__PURE__*/React.createElement("span", {
      className: "np-qb-in"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    })))));
  }
  var ReceiptLineM = React.memo(ReceiptLine);

  // ── menu pozycji (przytrzymanie) — lista akcji jako konfiguracja, łatwa do rozbudowy ──
  // show(ctx) — czy pokazać, ctx = { line, gastroOn }; tone: 'danger' = czerwona akcja
  var LINE_MENU = [{
    id: 'usun',
    label: 'Usuń pozycję',
    icon: 'trash-2',
    tone: 'danger'
  }, {
    id: 'cena',
    label: 'Zmień cenę',
    icon: 'tag',
    sub: function sub(c) {
      return 'obecnie ' + NPF.money(c.line.price) + ' zł';
    }
  }, {
    id: 'ilosc',
    label: 'Zmień ilość',
    icon: 'calculator',
    sub: function sub(c) {
      return NPF.qty(c.line.qty, c.line.unit) + (c.line.unit === 'kg' ? ' kg' : ' szt.');
    }
  }, {
    id: 'rabat',
    label: 'Rabat procentowy',
    icon: 'percent',
    sub: function sub(c) {
      return c.line.adj ? (c.line.adj > 0 ? 'rabat −' : 'narzut +') + Math.abs(c.line.adj) + '%' : '';
    }
  }, {
    id: 'atrybuty',
    label: 'Atrybuty',
    icon: 'sliders-horizontal',
    show: function show(c) {
      return c.gastroOn;
    }
  }, {
    id: 'komentarz',
    label: 'Komentarz gastro',
    icon: 'chef-hat',
    show: function show(c) {
      return c.gastroOn;
    },
    sub: function sub(c) {
      return c.line.note || '';
    }
  }];
  function LineMenuSheet(_ref3) {
    var line = _ref3.line,
      gastroOn = _ref3.gastroOn,
      onPick = _ref3.onPick,
      onCancel = _ref3.onCancel;
    useKeys(function (k) {
      if (k === 'ESC') onCancel();
      return true;
    }, 60);
    var ctx = {
      line: line,
      gastroOn: gastroOn
    };
    var items = LINE_MENU.filter(function (it) {
      return !it.show || it.show(ctx);
    });
    var total = NPF.round2(line.qty * line.price * (1 - (line.adj || 0) / 100));
    return /*#__PURE__*/React.createElement(Sheet, {
      className: "np-lmenu",
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-lmenu-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-lmenu-name"
    }, line.name), /*#__PURE__*/React.createElement("div", {
      className: "np-lmenu-calc"
    }, /*#__PURE__*/React.createElement("span", null, NPF.qty(line.qty, line.unit), line.unit === 'kg' ? ' kg' : '', " \xD7 ", NPF.money(line.price)), /*#__PURE__*/React.createElement("b", null, NPF.money(total), " z\u0142"))), /*#__PURE__*/React.createElement("div", {
      className: 'np-lmenu-list' + (items.length > 6 ? ' two' : '')
    }, items.map(function (it) {
      var sub = it.sub ? it.sub(ctx) : '';
      return /*#__PURE__*/React.createElement("button", {
        key: it.id,
        className: 'np-lmenu-it' + (it.tone ? ' ' + it.tone : ''),
        onClick: function onClick() {
          return onPick(it.id, line);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "np-lmenu-ic"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: it.icon
      })), /*#__PURE__*/React.createElement("span", {
        className: "np-lmenu-l"
      }, it.label, sub ? /*#__PURE__*/React.createElement("small", null, sub) : null), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        className: "np-lmenu-chev"
      }));
    })), /*#__PURE__*/React.createElement("button", {
      className: "np-btn np-lmenu-cancel",
      onClick: onCancel
    }, "Anuluj"));
  }
  function ReceiptPane(props) {
    var _props$qtyStyle = props.qtyStyle,
      qtyStyle = _props$qtyStyle === void 0 ? 'pill' : _props$qtyStyle,
      lines = props.lines,
      selId = props.selId,
      onSelLine = props.onSelLine,
      flashId = props.flashId,
      onQty = props.onQty,
      onRemove = props.onRemove,
      onLineAction = props.onLineAction,
      total = props.total,
      onPay = props.onPay;
    var listRef = useRef(null);
    var prevLen = useRef(lines.length);
    useEffect(function () {
      var c = listRef.current;
      if (c && lines.length > prevLen.current) c.scrollTo({
        top: c.scrollHeight,
        behavior: 'smooth'
      });
      prevLen.current = lines.length;
    }, [lines.length]);
    useEffect(function () {
      var c = listRef.current;
      if (!flashId || !c) return;
      var el = c.querySelector("[data-line=\"".concat(flashId, "\"]"));
      if (!el) return;
      var top = el.offsetTop;
      if (top < c.scrollTop || top + el.offsetHeight > c.scrollTop + c.clientHeight) c.scrollTo({
        top: Math.max(0, top - 8),
        behavior: 'smooth'
      });
    }, [flashId]);
    return /*#__PURE__*/React.createElement("div", {
      className: "np-right"
    }, /*#__PURE__*/React.createElement(SumCard, _extends({}, props, {
      count: lines.length
    })), /*#__PURE__*/React.createElement("div", {
      className: "np-lines-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'np-lines qs-' + qtyStyle,
      ref: listRef
    }, lines.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "np-empty"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt"
    }), /*#__PURE__*/React.createElement("b", null, "Paragon jest pusty"), /*#__PURE__*/React.createElement("span", null, "Zeskanuj towar, wpisz kod na klawiaturze albo wybierz kafelek z panelu")) : lines.map(function (l, i) {
      return /*#__PURE__*/React.createElement(ReceiptLineM, {
        key: l.id,
        l: l,
        sel: i === lines.length - 1,
        flash: flashId === l.id,
        onSel: onSelLine,
        onQty: onQty,
        onRemove: onRemove,
        onAction: onLineAction
      });
    }))), /*#__PURE__*/React.createElement("div", {
      className: "np-paybar"
    }, props.quick, /*#__PURE__*/React.createElement("button", {
      className: "np-razem",
      disabled: !lines.length,
      onClick: onPay
    }, /*#__PURE__*/React.createElement("span", null, "Razem"), /*#__PURE__*/React.createElement("b", null, NPF.money(total), " z\u0142"))));
  }
  Object.assign(window, {
    ReceiptPane: ReceiptPane,
    npPad4: pad4,
    LineMenuSheet: LineMenuSheet,
    LINE_MENU: LINE_MENU
  });
})();