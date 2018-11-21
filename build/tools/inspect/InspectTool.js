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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var facade_1 = require("../../facade");
var BaseTool_1 = require("../BaseTool");
var layer_1 = require("uxele-utils/build/layer");
var hoverColor = "rgba(0, 68, 37,1)";
var choseColor = "rgba(112,0,0,1)";
var InspectTool = /** @class */ (function (_super) {
    __extends(InspectTool, _super);
    function InspectTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "tool_inspect_name";
        _this.slug = "tool_inspect";
        _this.cls = "fas fa-mouse-pointer";
        _this.measureLinesGroup = new window.fabric.Group(undefined, {
            originX: "left",
            originY: "top",
            selectable: false,
            objectCaching: false
        });
        _this.hoverLabelGroup = new LayerLabelGroup({
            // left:0,
            // top:0,
            strokeWidth: 1,
            textBackgroundColor: hoverColor,
            fontSize: 14,
            fill: "white",
        }, {
            stroke: hoverColor,
            fill: hoverColor.replace("1)", "0.2)")
        });
        _this.firstChoseGroup = new LayerLabelGroup({
            // left:0,
            // top:0,
            strokeWidth: 1,
            textBackgroundColor: choseColor,
            fontSize: 14,
            fill: "white",
        }, {
            stroke: choseColor,
            fill: choseColor.replace("1)", "0.2)")
        });
        _this.onMouseDown = function (e) {
            if (_this.hoverLayer) {
                if (_this.hoverLayer !== _this.firstChoseLayer) {
                    _this.firstChoseLayer = _this.hoverLayer;
                    _this.drawFirstChoseLayer();
                    facade_1.store.dispatch(facade_1.actionChoseLayer(_this.hoverLayer));
                    // session.set("choseLayer", this.firstChoseLayer);
                    _this.prepareDrawMeasure();
                }
            }
        };
        _this.onMouseMove = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var curPage, coords, l, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        curPage = facade_1.store.getState().chosePage.page;
                        if (!(curPage && e)) return [3 /*break*/, 4];
                        coords = this.renderer.rendererPointToRealPoint(this.renderer.mouseEventToCoords(e), false);
                        if (!(coords.x < 0 || coords.y < 0)) return [3 /*break*/, 1];
                        this.hoverLayer = undefined;
                        this.drawHoverLayer();
                        this.prepareDrawMeasure();
                        return [3 /*break*/, 4];
                    case 1:
                        _a = layer_1.bestLayerByCoords;
                        _b = [coords];
                        return [4 /*yield*/, curPage.getLayers()];
                    case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 3:
                        l = _c.sent();
                        if (this.hoverLayer !== l) {
                            this.hoverLayer = l;
                            this.drawHoverLayer();
                            this.prepareDrawMeasure();
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Object.defineProperty(InspectTool.prototype, "storeChoseLayer", {
        get: function () {
            return facade_1.store.getState().choseLayer;
        },
        enumerable: true,
        configurable: true
    });
    InspectTool.prototype.prepareDrawMeasure = function () {
        var _a;
        this.renderer.clearDrawing(this.measureLinesGroup);
        if (this.firstChoseLayer && this.firstChoseLayer !== this.hoverLayer) {
            (_a = this.measureLinesGroup).remove.apply(_a, this.measureLinesGroup.getObjects());
            if (this.hoverLayer) {
                this.drawMeasurement(this.firstChoseLayer, this.hoverLayer);
                this.renderer.draw(this.measureLinesGroup);
            }
            else {
                this.renderer.clearDrawing(this.measureLinesGroup);
            }
        }
    };
    InspectTool.prototype.drawMeasurement = function (l1, l2) {
        var rect1 = l1.rect.zoom(this.renderer.zoom());
        var rect2 = l2.rect.zoom(this.renderer.zoom());
        // const coord1 = this.fileRectToCanvasRect(rect1);
        // const coord2 = this.fileRectToCanvasRect(rect2);
        var measure = rect1.distance(rect2);
        for (var key in measure) {
            if (measure.hasOwnProperty(key)) {
                var val = measure[key];
                if (val === 0) {
                    continue;
                }
                var v1 = key[0];
                var v2 = key[1];
                // var length = Math.round(val / this.canvasParams.scale);
                // TODO get current canvas scale from session
                var length_1 = Math.round(val);
                switch (v1) {
                    case "l":
                    case "r":
                        this.drawVLineMeasurements(v1 === 'l' ? rect1.left : rect1.right, rect1.top, rect1.bottom, v2 === 'l' ? rect2.left : rect2.right, rect2.top, rect2.bottom, rect1.left > rect2.left, length_1.toString());
                        break;
                    case "t":
                    case "b":
                        this.drawHLineMeasurements(v1 === 't' ? rect1.top : rect1.bottom, rect1.left, rect1.right, v2 === 't' ? rect2.top : rect2.bottom, rect2.left, rect2.right, rect1.top > rect2.top, length_1.toString());
                        break;
                }
            }
        }
    };
    InspectTool.prototype.drawLineOnFabric = function (points, options) {
        // const def = {
        //   strokeWidth: 1 / this.session.drawer.zoom
        // } as fabric.IObjectOptions;
        // const cfg = assign({}, def, opt);
        var line = new window.fabric.Line(points, options);
        this.measureLinesGroup.addWithUpdate(line);
    };
    InspectTool.prototype.drawLabelOnFabric = function (txt, opt) {
        var def = __assign({ textBackgroundColor: "black", shadow: "2px 2px 10px rgba(0,0,0,0.2)", fill: "white", fontSize: 14, strokeWidth: 1, fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif' }, opt);
        var t = new window.fabric.Text("  " + txt + "  ", def);
        this.measureLinesGroup.addWithUpdate(t);
    };
    InspectTool.prototype.drawVLineMeasurements = function (x1, t1, b1, x2, t2, b2, swap, text) {
        var color = "orange";
        var defDashLine = {
            stroke: color,
            strokeDashArray: [5, 5],
            strokeWidth: 1
        };
        var defLine = {
            stroke: color,
            strokeWidth: 1
        };
        var t = Math.min(t1, b1, t2, b2);
        var b = Math.max(t1, b1, t2, b2);
        if (x1 === x2) {
            // this.
            this.drawLineOnFabric([x1, t, x1, b], defDashLine);
            return;
        }
        if (swap) {
            var x = x2;
            x2 = x1;
            x1 = x;
            t = t2;
            t2 = t1;
            t1 = t;
            b = b2;
            b2 = b1;
            b1 = b;
        }
        // x1 = ses.adjustXToCanvas(x1);
        // x2 = ses.adjustXToCanvas(x2);
        // t1 = ses.adjustYToCanvas(t1);
        // t2 = ses.adjustYToCanvas(t2);
        // b1 = ses.adjustYToCanvas(b1);
        // b2 = ses.adjustYToCanvas(b2);
        if (t1 > b2) {
            this.drawLineOnFabric([x1, t1, x1, t2], defDashLine);
        }
        if (b1 < t2) {
            this.drawLineOnFabric([x1, b1, x1, b2], defDashLine);
        }
        var rg = getIntersect(t1, b1, t2, b2);
        var ay = 0;
        if (rg) {
            ay = Math.round((rg.s + rg.e) / 2);
        }
        else {
            ay = Math.round((t2 + b2) / 2);
        }
        this.drawLineOnFabric([x1, ay, x2, ay], defLine);
        this.drawLabelOnFabric(text, {
            originX: "center",
            originY: "center",
            left: (x1 + x2) / 2,
            top: ay
        });
        // draw.drawLable(this.canvas, tx, ty, text, size, "white", "rgba(0,0,0,0.8)");
    };
    InspectTool.prototype.drawHLineMeasurements = function (y1, l1, r1, y2, l2, r2, swap, text) {
        var color = "orange";
        var defDashLine = {
            stroke: color,
            strokeDashArray: [5, 5],
        };
        var defLine = {
            stroke: color,
        };
        var l = Math.min(l1, r1, l2, r2);
        var r = Math.max(l1, r1, l2, r2);
        if (y1 === y2) {
            this.drawLineOnFabric([y1, l, y1, r], defDashLine);
            return;
        }
        if (swap) {
            var y = y2;
            y2 = y1;
            y1 = y;
            l = l2;
            l2 = l1;
            l1 = l;
            r = r2;
            r2 = r1;
            r1 = r;
        }
        // y1 = ses.adjustYToCanvas(y1);
        // y2 = ses.adjustYToCanvas(y2);
        // l1 = ses.adjustXToCanvas(l1);
        // l2 = ses.adjustXToCanvas(l2);
        // r1 = ses.adjustXToCanvas(r1);
        // r2 = ses.adjustXToCanvas(r2);
        if (l1 > r2) {
            this.drawLineOnFabric([l1, y1, l2, y1], defDashLine);
        }
        if (r1 < l2) {
            this.drawLineOnFabric([r1, y1, r2, y1], defDashLine);
        }
        var rg = getIntersect(l1, r1, l2, r2);
        var ax = 0;
        if (rg) {
            ax = Math.round((rg.s + rg.e) / 2);
        }
        else {
            ax = Math.round((l2 + r2) / 2);
        }
        this.drawLineOnFabric([ax, y1, ax, y2], defLine);
        this.drawLabelOnFabric(text, {
            originX: "center",
            originY: "center",
            left: ax,
            top: (y1 + y2) / 2
        });
    };
    InspectTool.prototype.drawLayer = function (layerGroup, l) {
        if (l) {
            layerGroup.setLayer(l, this.renderer.zoom());
            this.renderer.draw(layerGroup.getGroup());
        }
        else {
            this.renderer.clearDrawing(layerGroup.getGroup());
        }
    };
    InspectTool.prototype.drawFirstChoseLayer = function () {
        this.drawLayer(this.firstChoseGroup, this.firstChoseLayer);
    };
    InspectTool.prototype.drawHoverLayer = function () {
        this.drawLayer(this.hoverLabelGroup, this.hoverLayer);
    };
    // onMouseUpAndLeave = (e: IRendererEvent | undefined) => {
    //   this.mouseDown = false;
    //   this.lastPoint = undefined;
    // }
    InspectTool.prototype.bindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            var _this = this;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                // renderer.on("mousedown", this.onMouseDown);
                renderer.on("mousemove", this.onMouseMove);
                renderer.on("click", this.onMouseDown);
                this.unsubscribe = facade_1.store.subscribe(function () {
                    if (_this.storeChoseLayer !== _this.firstChoseLayer) {
                        _this.firstChoseLayer = _this.storeChoseLayer.layer;
                        _this.drawFirstChoseLayer();
                        _this.prepareDrawMeasure();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    InspectTool.prototype.unbindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                renderer.off("click", this.onMouseDown);
                renderer.off("mousemove", this.onMouseMove);
                renderer.clearDrawing(this.hoverLabelGroup.getGroup());
                renderer.clearDrawing(this.firstChoseGroup.getGroup());
                renderer.clearDrawing(this.measureLinesGroup);
                facade_1.store.dispatch(facade_1.actionChoseLayer());
                if (this.unsubscribe) {
                    this.unsubscribe();
                }
                return [2 /*return*/];
            });
        });
    };
    return InspectTool;
}(BaseTool_1.BaseTool));
exports.InspectTool = InspectTool;
var LayerLabelGroup = /** @class */ (function () {
    function LayerLabelGroup(labelStyle, rectStyle) {
        this.labelStyle = labelStyle;
        this.rectStyle = rectStyle;
        this.rect = new window.fabric.Rect();
        this.label = new window.fabric.Text("", __assign({ fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif', objectCaching: false }, labelStyle));
        this.label.fontFamily = '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif';
        // this.label.originX = "left";
        // this.label.originY = "top";
        // this.label.setPositionByOrigin(new window.fabric.Point(0,0),"left","top");
        this.rect = new window.fabric.Rect(__assign({ objectCaching: false }, rectStyle));
        // this.rect.originX = "left";
        // this.rect.originY = "top";
        this.item = new window.fabric.Group([this.rect, this.label], {
            selectable: false,
        });
        // this.item.originX="left";
        // this.item.originY="top";
    }
    LayerLabelGroup.prototype.getGroup = function () {
        return this.item;
    };
    LayerLabelGroup.prototype.genLabel = function (targetLayer, zoom) {
        if (this.label) {
            this.item.remove(this.label);
        }
        this.label = new window.fabric.Text("", __assign({ text: "  " + targetLayer.rect.width + " x " + targetLayer.rect.height + "    ", left: targetLayer.rect.left * zoom, top: targetLayer.rect.top * zoom, fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif' }, this.labelStyle));
        this.item.addWithUpdate(this.label);
    };
    LayerLabelGroup.prototype.genRect = function (targetLayer, zoom) {
        if (this.rect) {
            this.item.remove(this.rect);
        }
        this.rect = new window.fabric.Rect(__assign({ left: targetLayer.rect.left * zoom, top: targetLayer.rect.top * zoom, width: targetLayer.rect.width * zoom, height: targetLayer.rect.height * zoom, objectCaching: false }, this.rectStyle));
        this.item.addWithUpdate(this.rect);
    };
    LayerLabelGroup.prototype.setLayer = function (targetLayer, zoom) {
        this.genRect(targetLayer, zoom);
        this.genLabel(targetLayer, zoom);
        // this.label.text = `  ${targetLayer.rect.width} x ${targetLayer.rect.height}    `;
        // this.item.width = Math.round(Math.max(targetLayer.rect.width,this.label.width || 0));
        // this.item.height =Math.round(Math.max(targetLayer.rect.height,this.label.height || 0));
        // this.rect.left=Math.round(-this.item.width/2);
        // this.rect.top=Math.round(-this.item.height/2);
        // this.rect.width=Math.round(targetLayer.rect.width);
        // this.rect.height=Math.round(targetLayer.rect.height);
        // // this.rect.setCoords();
        // this.label.left=this.rect.left;
        // this.label.top=this.rect.top;
        // // this.label.setCoords();
        // this.item.left = targetLayer.rect.left;
        // this.item.top = targetLayer.rect.top;
        // console.log("a ", "with",targ);
        // (this.item as any).addWithUpdate();
        // console.log("b ", "group", this.item.left,this.item.top,"rect",this.rect.left,this.rect.top,"label",this.label.left,this.label.top);
        // console.log(this.rect.left,this.rect.top,this.label.left,this.label.top);
        // this.item.addWithUpdate(this.label);
        // this.item.setCoords();
        // this.item.setObjectsCoords();
        // this.label.setCoords();
        // this.rect.setCoords();
    };
    return LayerLabelGroup;
}());
function getIntersect(s1, e1, s2, e2) {
    var maxS = Math.max(s1, s2);
    var minE = Math.min(e1, e2);
    if (minE >= maxS) { // intersected
        return {
            s: maxS,
            e: minE
        };
    }
    else {
        return null;
    }
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/inspect/InspectTool.js.map