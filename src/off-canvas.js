// OFF-CANVAS
// ==========

const attrAppendTo        = 'data-append-to';
const attrClose           = 'data-close';
const attrOffCanvas       = 'data-off-canvas';
const attrOffCanvasButton = 'data-off-canvas-button';
const attrOffCanvasLock   = 'data-off-canvas-lock';
const attrSnapTopTo       = 'data-snap-top-to';
const attrToggler         = 'data-toggler';
const overlay             = $('<div class="canvas-overlay"></div>');
const togglerClosed       = 'is-closed';
const togglerDefault      = 'is-active';
const togglerLocked       = 'is-locked';
const togglerNoAnim       = 'no-anim';
const togglerOpen         = 'is-open';
const togglerVisible      = 'is-visible';

// Off-Canvas
// ----------

export default class OffCanvas {
    constructor(element) {
        /* Initialize */
        this._offCanvas = $(element);
        this._parent = element.parentElement;
        this._prevSibling = element.previousSibling;
        this._appendTo = $('#' + this._offCanvas.attr(attrAppendTo));
        this._removed = false;
        this._button = $('#' + this._offCanvas.attr(attrOffCanvasButton));
        this._buttonToggler = this._button.attr(attrToggler) || togglerDefault;
        this._snapTopTo = $('#' + this._offCanvas.attr(attrSnapTopTo));

        /* Initialize object to close */
        let closeId = this._offCanvas.attr(attrClose);
        this._closeEl = (closeId) ? document.getElementById(closeId) : undefined;

        /* Locks */
        this._locks = []
        let lockIds = OffCanvas.stringToArray(this._offCanvas.attr(attrOffCanvasLock));
        for (let i = 0; i < lockIds.length; i++) {
            this._locks.push($('#' + lockIds[i]));
        }

        /* Refresh */
        this.refresh();

        /* Attach methods to the DOM Element of this off-canvas */
        element.close = this.close.bind(this);
        element.open = this.open.bind(this);

        /* Events */
        $(window).resize((e) => { this.onResize(e) });
        overlay.on('click', (e) => { this.onOverlayClick(e) });
        this._button.on('click', (e) => { this.onButtonClick(e) });
    }

    close() {
        this.toggle(false);
    }

    onButtonClick(e) {
        this._offCanvas.removeClass(togglerNoAnim);
        this.toggle();
    }

    onOverlayClick(e) {
        this.toggle(false);
    }

    onResize(e) {
         this.refresh();
    }

    open() {
        this.toggle(true);
    }

    refresh() {
        this._offCanvas.addClass(togglerNoAnim);
        this.snap();
        let isButtonVisible = this._button.is(':visible');
        if (isButtonVisible != this._isButtonVisible) { // State changed
            if (isButtonVisible) {
                // Remove off-canvas element
                if (this._appendTo !== null) {
                    this._removed = true;
                    this._offCanvas.appendTo($('#canvas'));
                }
            } else {
                if (this._removed) {
                    // Move off-canvas element back
                    if (this._prevSibling !== null) {
                        this._offCanvas.insertAfter(this._prevSibling);
                    } else {
                        this._offCanvas.prependTo(this._parent);
                    }
                    this._removed = false;
                }
            }
            this._offCanvas.toggleClass(togglerDefault, isButtonVisible);
            this.toggle(false);
            this._isButtonVisible = isButtonVisible;
        }
    }

    snap() {
        // Snap Top
        if (this._snapTopTo !== null) {
            this._offCanvas.css('top', this._snapTopTo[0].getBoundingClientRect().bottom + 'px');
        }
    }

    static stringToArray(str) {
        let a = [];
        if (typeof str === 'string') {
            str = str.trim();
            if (str != '') {
                a = (str.indexOf(',') > -1) ? str.split(/,/) : str.split(/ /);
                for (let i=0; i < a.lenght; i++) a[i] = a[i].trim();
            }
        }
        return a;
    }

    toggle(state) {
        if (state == undefined) state = !this._offCanvas.hasClass(togglerOpen);
        this._button.toggleClass(this._buttonToggler, state);
        this._offCanvas.toggleClass(togglerOpen, state);
        this._offCanvas.toggleClass(togglerClosed, !state);
        overlay.toggleClass(togglerVisible, state);
        if (state && this._closeEl != undefined) {
            this._closeEl.close();
        }
        for (let i = 0; i < this._locks.length; i++) {
            this._locks[i].toggleClass(togglerLocked, state)
        }
    }
}

// Initialize canvas overlay and elements with 'data-off-canvas' attribute
// -----------------------------------------------------------------------

let offCanvases = [];
$(document).ready(() => {
    overlay.appendTo(document.body);
    $('[' + attrOffCanvas + ']').each((index, item) => {
        offCanvases.push(new OffCanvas(item));
    });
});
