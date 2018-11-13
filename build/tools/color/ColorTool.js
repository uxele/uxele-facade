"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var uxele_utils_1 = require("uxele-utils");
var facade_1 = require("../../facade");
var BaseTool_1 = require("../BaseTool");
var ColorTool = /** @class */ (function (_super) {
    __extends(ColorTool, _super);
    function ColorTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "tool_color_name";
        _this.slug = "tool_color";
        _this.cls = "fas fa-eye-dropper";
        _this.colorGroup = new window.fabric.Group(undefined, {
            selectable: false,
            shadow: "0px 0px 20px rgba(0,0,0,0.4)"
        });
        _this.onMouseDown = function (e) {
            if (_this.hoverColor) {
                facade_1.store.dispatch(facade_1.actionColorToolPick(_this.hoverColor));
            }
        };
        // private zoomImg(img: ImageData, zoom: number) {
        //   const newData = new Uint8ClampedArray(img.data.length * Math.pow(zoom, 2));
        //   const owidth = img.width;
        //   const oheight = img.height;
        //   const nwidth = img.width * zoom;
        //   const nheight = img.height * zoom;
        //   for (let i = 0; i < img.data.length; i += 4) {
        //     const r = img.data[i];
        //     const g = img.data[i + 1];
        //     const b = img.data[i + 2];
        //     const a = img.data[i + 3];
        //     const pixel=Math.floor(i/4);
        //     const col = pixel % owidth;
        //     const row = Math.floor(pixel / owidth);
        //     const drow = row * zoom;
        //     const dcol = col * zoom;
        //     const p = drow * nwidth + dcol;
        //     for (let j = 0; j < zoom; j++) {
        //       for (let k = 0; k < zoom; k++) {
        //         const pixelP = p + j * nwidth + k * 4;
        //         newData[pixelP] = r;
        //         newData[pixelP + 1] = g;
        //         newData[pixelP + 2] = b;
        //         newData[pixelP + 3] = a;
        //       }
        //     }
        //   }
        //   return new ImageData(newData, nwidth, nheight);
        // }
        _this.onMouseMove = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var curPage, times, img, canvas, magImg, coords, ctx, imageData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curPage = facade_1.store.getState().chosePage.page;
                        if (!(curPage && e)) return [3 /*break*/, 3];
                        if (!!this.curPageContext) return [3 /*break*/, 2];
                        times = 5;
                        return [4 /*yield*/, curPage.getPreview(1)];
                    case 1:
                        img = _a.sent();
                        canvas = uxele_utils_1.imgToCanvas(img);
                        magImg = img;
                        this.curPageContext = {
                            page: curPage,
                            magImg: magImg,
                            pageCanvas: canvas
                        };
                        _a.label = 2;
                    case 2:
                        coords = this.renderer.rendererPointToRealPoint(this.renderer.mouseEventToCoords(e));
                        ctx = this.curPageContext.pageCanvas.getContext("2d");
                        imageData = ctx.getImageData(coords.x, coords.y, 1, 1);
                        this.drawColor(imageData.data[0], imageData.data[1], imageData.data[2], coords);
                        this.hoverColor = "rgb(" + imageData.data[0] + ", " + imageData.data[1] + "," + imageData.data[2] + ")";
                        facade_1.store.dispatch(facade_1.actionColorToolHover(this.hoverColor));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ColorTool.prototype.drawColor = function (r, g, b, coords) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, radius, padding, outerPadding, zoomTime, fullImg, img, rect, circleBg, circleBgOut;
            return __generator(this, function (_b) {
                (_a = this.colorGroup).remove.apply(_a, this.colorGroup.getObjects());
                radius = 80;
                padding = 5;
                outerPadding = 15;
                zoomTime = 5;
                fullImg = this.curPageContext.magImg;
                img = new window.fabric.Image(fullImg, {
                    originX: "left",
                    originY: "top",
                    left: -coords.x * zoomTime,
                    top: -coords.y * zoomTime,
                    scaleX: zoomTime,
                    scaleY: zoomTime,
                    clipTo: function (ctx) {
                        // ctx.arc((coords.x-fullImg.naturalWidth/2), (coords.y-fullImg.naturalHeight/2), radius, 0, Math.PI * 2, true);
                        ctx.arc((coords.x - fullImg.naturalWidth / 2), (coords.y - fullImg.naturalHeight / 2), radius / zoomTime, 0, Math.PI * 2, true);
                    }
                });
                rect = new window.fabric.Rect({
                    originX: "center",
                    originY: "center",
                    strokeWidth: 1,
                    stroke: "black",
                    fill: "transparent",
                    width: 10,
                    height: 10,
                    left: 0,
                    top: 0,
                });
                circleBg = new window.fabric.Circle({
                    originX: "center",
                    originY: "center",
                    left: 0,
                    top: 0,
                    radius: radius + padding,
                    fill: "#d1d1d1"
                });
                circleBgOut = new window.fabric.Circle({
                    originX: "left",
                    originY: "top",
                    left: coords.x * this.renderer.zoom(),
                    top: coords.y * this.renderer.zoom(),
                    radius: radius + padding + outerPadding,
                    fill: "rgb(" + r + "," + g + "," + b + ")",
                    clipTo: function (ctx) {
                        ctx.arc(0, 0, radius + padding + outerPadding, 1 / 2 * Math.PI, -1 / 2 * Math.PI, true);
                    }
                });
                this.colorGroup.addWithUpdate(circleBgOut);
                this.colorGroup.add(circleBg);
                this.colorGroup.add(img);
                this.colorGroup.add(rect);
                this.renderer.draw(this.colorGroup);
                return [2 /*return*/];
            });
        });
    };
    // onMouseUpAndLeave = (e: IRendererEvent | undefined) => {
    //   this.mouseDown = false;
    //   this.lastPoint = undefined;
    // }
    ColorTool.prototype.bindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                // renderer.on("mousedown", this.onMouseDown);
                renderer.on("mousemove", this.onMouseMove);
                renderer.on("click", this.onMouseDown);
                return [2 /*return*/];
            });
        });
    };
    ColorTool.prototype.unbindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                renderer.off("click", this.onMouseDown);
                renderer.off("mousemove", this.onMouseMove);
                renderer.clearDrawing(this.colorGroup);
                this.curPageContext = undefined;
                return [2 /*return*/];
            });
        });
    };
    return ColorTool;
}(BaseTool_1.BaseTool));
exports.ColorTool = ColorTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/color/ColorTool.js.map