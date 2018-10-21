(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// OFF-CANVAS
// ==========
var attrClose = 'data-close';
var attrOffCanvas = 'data-off-canvas';
var attrOffCanvasButton = 'data-off-canvas-button';
var attrOffCanvasLock = 'data-off-canvas-lock';
var attrToggler = 'data-toggler';
var overlay = $('<div class="canvas-overlay"></div>');
var togglerClosed = 'is-closed';
var togglerDefault = 'is-active';
var togglerLocked = 'is-locked';
var togglerNoAnim = 'no-anim';
var togglerOpen = 'is-open';
var togglerVisible = 'is-visible'; // Off-Canvas
// ----------

var OffCanvas =
/*#__PURE__*/
function () {
  function OffCanvas(element) {
    var _this = this;

    _classCallCheck(this, OffCanvas);

    /* Initialize */
    this._offCanvas = $(element);
    this._button = $('#' + this._offCanvas.attr(attrOffCanvasButton));
    this._buttonToggler = this._button.attr(attrToggler) || togglerDefault;
    /* Initialize object to close */

    var closeId = this._offCanvas.attr(attrClose);

    this._closeEl = closeId ? document.getElementById(closeId) : undefined;
    /* Locks */

    this._locks = [];
    var lockIds = OffCanvas.stringToArray(this._offCanvas.attr(attrOffCanvasLock));

    for (var i = 0; i < lockIds.length; i++) {
      this._locks.push($('#' + lockIds[i]));
    }
    /* Refresh */


    this.refresh();
    /* Attach methods to the DOM Element of this off-canvas */

    element.close = this.close.bind(this);
    element.open = this.open.bind(this);
    /* Events */

    $(window).resize(function (e) {
      _this.onResize(e);
    });
    overlay.on('click', function (e) {
      _this.onOverlayClick(e);
    });

    this._button.on('click', function (e) {
      _this.onButtonClick(e);
    });
  }

  _createClass(OffCanvas, [{
    key: "close",
    value: function close() {
      this.toggle(false);
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(e) {
      this._offCanvas.removeClass(togglerNoAnim);

      this.toggle();
    }
  }, {
    key: "onOverlayClick",
    value: function onOverlayClick(e) {
      this.toggle(false);
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      this.refresh();
    }
  }, {
    key: "open",
    value: function open() {
      this.toggle(true);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this._offCanvas.addClass(togglerNoAnim);

      var isButtonVisible = this._button.is(':visible');

      if (isButtonVisible != this._isButtonVisible) {
        // State changed
        this._offCanvas.toggleClass(togglerDefault, isButtonVisible);

        this.toggle(false);
        this._isButtonVisible = isButtonVisible;
      }
    }
  }, {
    key: "toggle",
    value: function toggle(state) {
      if (state == undefined) state = !this._offCanvas.hasClass(togglerOpen);

      this._button.toggleClass(this._buttonToggler, state);

      this._offCanvas.toggleClass(togglerOpen, state);

      this._offCanvas.toggleClass(togglerClosed, !state);

      overlay.toggleClass(togglerVisible, state);

      if (state && this._closeEl != undefined) {
        this._closeEl.close();
      }

      for (var i = 0; i < this._locks.length; i++) {
        this._locks[i].toggleClass(togglerLocked, state);
      }
    }
  }], [{
    key: "stringToArray",
    value: function stringToArray(str) {
      var a = [];

      if (typeof str === 'string') {
        str = str.trim();

        if (str != '') {
          a = str.indexOf(',') > -1 ? str.split(/,/) : str.split(/ /);

          for (var i = 0; i < a.lenght; i++) {
            a[i] = a[i].trim();
          }
        }
      }

      return a;
    }
  }]);

  return OffCanvas;
}(); // Initialize canvas overlay and elements with 'data-off-canvas' attribute
// -----------------------------------------------------------------------


exports.default = OffCanvas;
var offCanvases = [];
$(document).ready(function () {
  overlay.appendTo(document.body);
  $('[' + attrOffCanvas + ']').each(function (index, item) {
    offCanvases.push(new OffCanvas(item));
  });
});

},{}]},{},[1])

//# sourceMappingURL=../maps/off-canvas.js.map
