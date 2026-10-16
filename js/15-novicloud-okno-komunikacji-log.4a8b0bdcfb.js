"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* TAKA KASA — NoviCloud: okno komunikacji (log), archiwizacja z RODO, odzyskanie z serwera */
(function () {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;
  var pad = function pad(n) {
    var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return String(n).padStart(l, '0');
  };
  var stamp = function stamp(d) {
    return "".concat(d.getFullYear(), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getDate()), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()), ":").concat(pad(d.getSeconds()), ".").concat(pad(d.getMilliseconds(), 3));
  };
  var ms0 = function ms0(t) {
    return stampS(t);
  };
  var stampS = function stampS(t) {
    var d = new Date(t);
    return "".concat(d.getFullYear(), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getDate()), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()), ":").concat(pad(d.getSeconds()));
  };
  var LAST_KEY = 'nextpro.cloudLastSent';
  var lastSent = function lastSent() {
    try {
      var v = +localStorage.getItem(LAST_KEY);
      return v > 0 ? v : Date.now() - 36e5 * 2;
    } catch (e) {
      return Date.now() - 72e5;
    }
  };
  var setLastSent = function setLastSent(v) {
    try {
      localStorage.setItem(LAST_KEY, String(v));
    } catch (e) {}
  };
  function script(kind) {
    var n = window.NP_DB ? NP_DB.all().length : 60,
      cl = window.NP_PROG ? NP_PROG.get('clients').length : 7;
    var head = ['Oczekiwanie na rozpoczęcie komunikacji…', 'Połączono z SCServerem', 'Autoryzacja kasy: konto wtest, kasa nr 1'];
    var lists = ['Dane sklepu', 'Stawki VAT', 'Jednostki miary', 'Operatorzy', 'Profile operatorów', 'Grupy towarowe', 'Formy płatności', 'Waluty', 'Formaty kodów ważonych', 'Formaty kart rabatowych', 'Tabela rabatów', 'Rabaty zdefiniowane', 'Formaty numerów dokumentów', 'Kraje', 'Klienci', 'Grafiki', 'Parametry konfiguracji', 'Parametry konfiguracji KSeF', 'Frazy', 'Definicje kodów', 'Magazyny', 'Frakcje opakowań DRS', 'Receptury'].map(function (x) {
      return '...' + x;
    });
    var imp = ['Pobieranie zakończone', 'Importowanie pobranych danych…', '...Zaimportowano stawek VAT: 4', '...Zaimportowano jednostek miary: 5', '...Przetwarzanie…', "...Zaimportowano towar\xF3w: ".concat(n), '...Zaimportowano reguł rabatowych: 3', "...Zaimportowano kontrahent\xF3w: ".concat(cl), 'Import zakończony'];
    var ksef = ['Aktualizacja danych o fakturach KSeF z programu zaplecza do mPOS…', 'Brak danych do aktualizacji na fakturach KSeF od ostatniej sesji wymiany danych.'];
    var exp = function exp(docs) {
      return ['Eksport raportów dobowych fiskalnych…', 'Wyeksportowano raportów dobowych fiskalnych: 1', 'Eksport dokumentów…', "Wyeksportowano dokument\xF3w: ".concat(docs), 'Wyeksportowano raportów dobowych: 0'];
    };
    var tail = ['Import dokumentów...', 'Rozłączono z SCServerem', 'Zakończono wymianę danych'];
    if (kind === 'import') return head.concat(['Ponowny import wszystkich wykazów'], lists, imp, tail);
    if (kind === 'export') return head.concat(['Ponowny eksport paragonów od ' + stampS(lastSent())], exp(12), tail);
    if (kind === 'reports') return head.concat(['Eksport raportów dobowych do NoviCloud…', 'Wyeksportowano raportów dobowych: 22'], tail);
    return head.concat(['Pobieranie zmian od ostatniej synchronizacji'], lists.slice(0, 8), imp.slice(0, 2), imp.slice(5, 9), ksef, exp(3), tail);
  }
  // Okno komunikacji z NoviCloud — log w czasie rzeczywistym
  // Ponowny eksport paragonów — tylko znacznik czasu ostatniego wysłanego paragonu
  function CloudExport(_ref) {
    var onClose = _ref.onClose,
      ui = _ref.ui;
    var _useState = useState(lastSent),
      _useState2 = _slicedToArray(_useState, 2),
      last = _useState2[0],
      setLast = _useState2[1];
    useKeys(function (k) {
      if (k === 'ESC') {
        onClose();
        return true;
      }
      return true;
    }, 45);
    var shift = function shift(ms) {
      var v = ms == null ? new Date(2000, 0, 1).getTime() : last - ms;
      setLastSent(v);
      setLast(v);
    };
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-cs np-cs-exp",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, "Ponowny eksport paragon\xF3w"), /*#__PURE__*/React.createElement("small", null, "Znacznik czasu ostatniego wys\u0142anego paragonu"))), /*#__PURE__*/React.createElement("div", {
      className: "np-cs-expb"
    }, /*#__PURE__*/React.createElement("small", null, "Ostatni wys\u0142any paragon"), /*#__PURE__*/React.createElement("b", null, ms0(last)), /*#__PURE__*/React.createElement("p", null, "Do NoviCloud zosta\u0142y wys\u0142ane paragony wystawione do tego czasu. Aby wys\u0142a\u0107 wcze\u015Bniejsze paragony, przesu\u0144 ten znacznik czasowy wstecz. Podczas nast\u0119pnej synchronizacji z NoviCloud kasa ponownie wy\u015Ble wszystkie paragony wystawione po tym czasie. Paragony wys\u0142ane ponownie nie powiel\u0105 si\u0119 w NoviCloud."), /*#__PURE__*/React.createElement("div", {
      className: "np-cs-shift"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(864e5);
      }
    }, "\u22121 dzie\u0144"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(36e5);
      }
    }, "\u22121 godz."), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(null);
      }
    }, "Wszystkie"))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Wyj\u015Bcie"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      onClick: function onClick() {
        onClose();
        ui.progressThen('Synchronizacja z NoviCloud…', 'Wysyłanie paragonów od ' + ms0(last), 1800, {
          title: 'Paragony wysłane',
          rows: [['Od', ms0(last)], ['Wysłane paragony', '12']]
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh-cw"
    }), "Synchronizuj teraz"))));
  }
  function CloudSync(_ref2) {
    var _ref2$kind = _ref2.kind,
      kind = _ref2$kind === void 0 ? 'sync' : _ref2$kind,
      onClose = _ref2.onClose,
      ui = _ref2.ui;
    var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      log = _useState4[0],
      setLog = _useState4[1];
    var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      done = _useState6[0],
      setDone = _useState6[1];
    var _useState7 = useState(true),
      _useState8 = _slicedToArray(_useState7, 2),
      auto = _useState8[0],
      setAuto = _useState8[1];
    var _useState9 = useState(lastSent),
      _useState0 = _slicedToArray(_useState9, 2),
      last = _useState0[0],
      setLast = _useState0[1];
    var box = useRef(null);
    var run = useRef(0);
    var start = function start() {
      var id = ++run.current;
      setLog([]);
      setDone(false);
      var lines = script(kind);
      var i = 0;
      var _step = function step() {
        if (id !== run.current) return;
        if (i >= lines.length) {
          setDone(true);
          if (kind === 'export') {
            var t = Date.now();
            setLastSent(t);
            setLast(t);
          }
          return;
        }
        var l = lines[i++];
        setLog(function (x) {
          return x.concat([[stamp(new Date()), l]]);
        });
        setTimeout(_step, 60 + Math.random() * 140);
      };
      setTimeout(_step, 250);
    };
    useEffect(function () {
      start();
      return function () {
        run.current++;
      };
    }, []);
    useEffect(function () {
      if (auto && box.current) box.current.scrollTop = box.current.scrollHeight;
    }, [log, auto]);
    useKeys(function (k) {
      if (k === 'ESC') {
        onClose();
        return true;
      }
      return true;
    }, 45);
    var shift = function shift(ms) {
      var v = ms == null ? new Date(2000, 0, 1).getTime() : last - ms;
      setLastSent(v);
      setLast(v);
      ui.say(ms == null ? 'Przy następnej synchronizacji kasa wyśle wszystkie paragony' : 'Znacznik czasu przesunięty wstecz', 'ok', 'check');
    };
    var title = {
      status: 'Status połączenia',
      "export": 'Ponowny eksport paragonów',
      "import": 'Ponowny import wykazów',
      reports: 'Eksport raportów dobowych'
    }[kind] || 'Komunikacja z NoviCloud';
    return /*#__PURE__*/React.createElement(OnScreen, null, /*#__PURE__*/React.createElement(Sheet, {
      className: "np-cs",
      onClose: null
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-pe-title"
    }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("small", null, done ? 'Zakończono wymianę danych' : 'Trwa komunikacja…')), !done && /*#__PURE__*/React.createElement("span", {
      className: "np-spinner"
    }), /*#__PURE__*/React.createElement("button", {
      className: 'np-cs-auto' + (auto ? ' on' : ''),
      onClick: function onClick() {
        return setAuto(!auto);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    }), "Auto. przewijanie ", auto ? 'wł.' : 'wył.')), /*#__PURE__*/React.createElement("div", {
      className: "np-cs-log np-no-swipe",
      ref: box
    }, log.map(function (_ref3, i) {
      var _ref4 = _slicedToArray(_ref3, 2),
        t = _ref4[0],
        l = _ref4[1];
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("time", null, t), /*#__PURE__*/React.createElement("em", null, "[INFO]"), /*#__PURE__*/React.createElement("span", null, l));
    })), kind === 'export' && /*#__PURE__*/React.createElement("div", {
      className: "np-cs-last"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-cs-last-t"
    }, /*#__PURE__*/React.createElement("small", null, "Ostatni wys\u0142any paragon"), /*#__PURE__*/React.createElement("b", null, stampS(last))), /*#__PURE__*/React.createElement("p", null, "Do NoviCloud zosta\u0142y wys\u0142ane paragony wystawione do tego czasu. Aby wys\u0142a\u0107 wcze\u015Bniejsze paragony, przesu\u0144 znacznik czasowy wstecz \u2014 przy nast\u0119pnej synchronizacji kasa ponownie wy\u015Ble wszystkie paragony wystawione po tym czasie. Paragony wys\u0142ane ponownie nie powiel\u0105 si\u0119 w NoviCloud."), /*#__PURE__*/React.createElement("div", {
      className: "np-cs-shift"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(864e5);
      }
    }, "\u22121 dzie\u0144"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(36e5);
      }
    }, "\u22121 godz."), /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: function onClick() {
        return shift(null);
      }
    }, "Wszystkie"))), /*#__PURE__*/React.createElement("div", {
      className: "np-pe-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "np-btn",
      onClick: onClose
    }, "Wyj\u015Bcie"), /*#__PURE__*/React.createElement("button", {
      className: "np-btn green",
      disabled: !done,
      onClick: start
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh-cw"
    }), kind === 'export' ? 'Synchronizuj teraz' : kind === 'status' ? 'Odśwież' : 'Wykonaj ponownie'))));
  }

  // Archiwizacja na serwer — zgoda RODO
  function rodoArchive(ui, then) {
    ui.dialog({
      tone: 'warning',
      title: 'Uwaga — dane osobowe (RODO)',
      className: 'np-rodo',
      children: /*#__PURE__*/React.createElement("div", {
        className: "np-rodo-t"
      }, /*#__PURE__*/React.createElement("p", null, "Archiwizowana baza danych mo\u017Ce zawiera\u0107 dane osobowe, kt\xF3rych przetwarzanie musi by\u0107 zgodne z Rozporz\u0105dzeniem o ochronie danych osobowych RODO."), /*#__PURE__*/React.createElement("p", null, "Korzystaj\u0105c z funkcji archiwizacji na serwer, wyra\u017Casz zgod\u0119 na to, \u017Ce baza danych kasy zapisywana jest na serwerze us\u0142ugi NoviCloud, gdzie jest przetwarzana zgodnie z Zasadami przetwarzania danych osobowych i polityk\u0105 prywatno\u015Bci Us\u0142ugi opisan\u0105 na stronie ", /*#__PURE__*/React.createElement("a", {
        href: "https://www.novicloud.pl",
        target: "_blank",
        rel: "noreferrer"
      }, "www.novicloud.pl"), ".")),
      actions: [{
        label: 'Anuluj',
        cancel: true,
        onClick: ui.close
      }, {
        label: 'Archiwizuj',
        primary: true,
        onClick: function onClick() {
          ui.close();
          ui.progressThen('Archiwizacja na serwer…', 'Wysyłanie bazy danych do NoviCloud', 2000, {
            title: 'Archiwizacja zakończona',
            rows: [['Kopia', "BKP_".concat(new Date().toISOString().slice(0, 10), "_").concat(pad(new Date().getHours())).concat(pad(new Date().getMinutes()))], ['Rozmiar', '1,1 MB'], ['Konto', 'wtest']]
          });
          if (then) then();
        }
      }]
    });
  }
  // Odzyskanie z serwera — wybór bazy i kasy
  var CASHES = function CASHES() {
    return [NP_DATA.SHOP.unique, 'EBD1901940743', 'GATHO', 'BKP_2026-10-02_114726', 'SZPITAL', 'ZAROSLO'];
  };
  function restoreServer(ui) {
    var confirm = function confirm(src) {
      return ui.dialog({
        tone: 'question',
        title: 'Przywracanie danych',
        desc: "Czy wykona\u0107 przywracanie danych aplikacji z kopii \u201E".concat(src, "\u201D? Baza towar\xF3w i ustawienia zostan\u0105 zast\u0105pione kopi\u0105 z NoviCloud."),
        actions: [{
          label: 'Nie',
          cancel: true,
          onClick: ui.close
        }, {
          label: 'Tak, przywróć',
          tone: 'red',
          primary: true,
          onClick: function onClick() {
            ui.close();
            ui.progressThen('Odzyskiwanie danych z serwera…', src, 2200, {
              title: 'Dane przywrócone',
              rows: [['Źródło', src], ['Uwaga', 'Kasa uruchomi się ponownie']]
            });
          }
        }]
      });
    };
    var pickCash = function pickCash() {
      return ui.dialog({
        tone: 'info',
        title: 'Wybierz kasę',
        desc: 'Kopie zapisane na koncie wtest',
        className: 'np-choose',
        children: /*#__PURE__*/React.createElement("div", {
          className: "np-choices np-rp-choices"
        }, CASHES().map(function (c) {
          return /*#__PURE__*/React.createElement("button", {
            key: c,
            onClick: function onClick() {
              ui.close();
              confirm(c);
            }
          }, /*#__PURE__*/React.createElement("span", null, c), /*#__PURE__*/React.createElement(Icon, {
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
    ui.dialog({
      tone: 'info',
      title: 'Wybierz bazę danych',
      className: 'np-choose',
      children: /*#__PURE__*/React.createElement("div", {
        className: "np-choices"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          ui.close();
          confirm('bieżąca kasa · ' + NP_DATA.SHOP.unique);
        }
      }, /*#__PURE__*/React.createElement("span", null, "Z bie\u017C\u0105cej kasy"), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          ui.close();
          pickCash();
        }
      }, /*#__PURE__*/React.createElement("span", null, "Z innej kasy"), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right"
      }))),
      actions: [{
        label: 'Anuluj',
        cancel: true,
        onClick: ui.close
      }]
    });
  }
  function importAsk(ui, go) {
    ui.dialog({
      tone: 'question',
      title: 'Ponowny import wykazów',
      desc: 'Czy na pewno wykonać ponowny import wszystkich wykazów?',
      actions: [{
        label: 'Nie',
        cancel: true,
        onClick: ui.close
      }, {
        label: 'Tak',
        primary: true,
        onClick: function onClick() {
          ui.close();
          go();
        }
      }]
    });
  }
  Object.assign(window, {
    CloudExport: CloudExport,
    CloudSync: CloudSync,
    rodoArchive: rodoArchive,
    restoreServer: restoreServer,
    importAsk: importAsk
  });
})();