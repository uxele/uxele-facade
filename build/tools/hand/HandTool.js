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
var facade_1 = require("../../facade");
var BaseTool_1 = require("../BaseTool");
// export type HandToolEvents = "onPanStart" | "onPanEnd";
var HandTool = /** @class */ (function (_super) {
    __extends(HandTool, _super);
    function HandTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "tool_hand_name";
        _this.slug = "tool_hand";
        _this.cls = "fas fa-hand-paper";
        _this.mouseDown = false;
        _this.onMouseDown = function (e) {
            if (e) {
                _this.mouseDown = true;
                var evt = e.e;
                _this.lastPoint = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                facade_1.store.dispatch(facade_1.actionHandToolPanStart());
                evt.stopPropagation();
                evt.preventDefault();
                // this.emit("onPanStart");
            }
        };
        _this.onMouseMove = function (e) {
            if (_this.mouseDown && e) {
                var evt = e.e;
                var curPoint = { x: evt.clientX, y: evt.clientY };
                var renderer = _this.renderer;
                if (_this.lastPoint) {
                    renderer.panX(renderer.panX() - curPoint.x + _this.lastPoint.x);
                    renderer.panY(renderer.panY() - curPoint.y + _this.lastPoint.y);
                }
                _this.lastPoint = curPoint;
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        _this.onMouseUpAndLeave = function (e) {
            _this.mouseDown = false;
            _this.lastPoint = undefined;
            facade_1.store.dispatch(facade_1.actionHandToolPanEnd());
            if (e) {
                var evt = e.e;
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        return _this;
    }
    HandTool.prototype.bindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                renderer.on("mousedown", this.onMouseDown);
                renderer.on("mousemove", this.onMouseMove);
                renderer.on("mouseup", this.onMouseUpAndLeave);
                renderer.on("mouseleave", this.onMouseUpAndLeave);
                return [2 /*return*/];
            });
        });
    };
    HandTool.prototype.unbindRenderer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                renderer = this.renderer;
                renderer.off("mousedown", this.onMouseDown);
                renderer.off("mousemove", this.onMouseMove);
                renderer.off("mouseup", this.onMouseUpAndLeave);
                renderer.off("mouseleave", this.onMouseUpAndLeave);
                return [2 /*return*/];
            });
        });
    };
    return HandTool;
}(BaseTool_1.BaseTool));
exports.HandTool = HandTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/hand/HandTool.js.map