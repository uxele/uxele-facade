"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_render_svg_1 = require("uxele-render-svg");
var states_1 = require("./states");
var CanvasState_1 = require("./states/CanvasState");
var canvasControl_1 = require("./canvasControl");
var unsubscribe;
var curRender;
function bindCanvas(parent) {
    return __awaiter(this, void 0, void 0, function () {
        var curPage, pages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // unload previous renderer (if any)
                    if (curRender) {
                        curRender.destroy();
                        unsubscribeMouseCoords(curRender);
                    }
                    if (unsubscribe) {
                        unsubscribe();
                    }
                    curRender = new uxele_render_svg_1.SvgRenderer(parent);
                    //sub to mouse coords
                    subscribeMouseCoords(curRender);
                    states_1.store.dispatch(states_1.actionRendererSet(curRender));
                    curPage = undefined;
                    unsubscribe = states_1.store.subscribe(function () {
                        // listen to page change event and render chose page accordingly.
                        if (states_1.store.getState().chosePage.page !== curPage) {
                            curPage = states_1.store.getState().chosePage.page;
                            if (curPage) {
                                // render page
                                // curRender.renderPage(curPage)
                                //   .then(() => {
                                //     // zoom canvas to fit page size;
                                //     fitToPage();
                                //   });
                            }
                        }
                    });
                    return [4 /*yield*/, states_1.store.getState().project.project.getPages()];
                case 1:
                    pages = _a.sent();
                    return [4 /*yield*/, curRender.renderPages(pages)];
                case 2:
                    _a.sent();
                    canvasControl_1.fitToPage();
                    return [2 /*return*/, curRender];
            }
        });
    });
}
exports.bindCanvas = bindCanvas;
var resizeTimer = null;
window.addEventListener("resize", function () {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
    }
    if (curRender) {
        resizeTimer = window.setTimeout(function () {
            resizeTimer = null;
            if (curRender) {
                curRender.resizeRender();
            }
        }, 100);
    }
});
function subscribeMouseCoords(render) {
    render.on("mousemove", onMouseMove);
}
function unsubscribeMouseCoords(render) {
    render.off("mousemove", onMouseMove);
}
function onMouseMove(e) {
    if (e) {
        var coords = curRender.rendererPointToRealPoint(curRender.mouseEventToCoords(e));
        states_1.store.dispatch(CanvasState_1.actionCanvasStatusCoords(coords));
    }
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/bindCanvas.js.map