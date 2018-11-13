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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_core_1 = require("uxele-core");
var uxele_render_fabric_1 = require("uxele-render-fabric");
var uxele_utils_1 = require("uxele-utils");
var InspectTool_1 = require("./InspectTool");
var testUtils_1 = require("uxele-utils/build/testUtils");
var facade_1 = require("../../facade");
function dummyPage() {
    var layers = [
        {
            name: "test layer",
            rect: new uxele_core_1.Rect(10, 10, 150, 150),
            layerType: uxele_core_1.LayerType.pixel,
            visible: true
        },
        {
            name: "test layer 1",
            rect: new uxele_core_1.Rect(50, 50, 100, 100),
            layerType: uxele_core_1.LayerType.pixel,
            visible: true
        },
    ];
    var p = {
        name: "dummy page",
        width: 275,
        height: 183,
        getPreview: function () {
            var img = new Image();
            img.src = "base/tools/testAssets/nature.jpeg";
            return new Promise(function (resolve, reject) {
                img.onload = function () {
                    resolve(img);
                };
            });
        },
        getLayers: function () {
            return Promise.resolve(layers);
        }
    };
    return p;
}
describe("InspectTool", function () {
    var c;
    var f;
    var originalTimeout;
    beforeAll(function () {
        c = document.createElement("canvas");
        c.width = 300;
        c.height = 300;
        document.querySelector("body").appendChild(c);
        f = new uxele_render_fabric_1.FabricRenderer(c, 300, 300);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });
    afterAll(function () {
        f.destroy();
        document.querySelector("body").removeChild(c);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    if (process.env.INTERACTIVE) {
        it("should display layer when mouse over", function () { return __awaiter(_this, void 0, void 0, function () {
            var h;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        facade_1.store.dispatch(facade_1.actionChosePage(dummyPage()));
                        return [4 /*yield*/, f.renderPage(dummyPage())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, uxele_utils_1.sleep(100)];
                    case 2:
                        _a.sent();
                        h = new InspectTool_1.InspectTool();
                        h.setRenderer(f);
                        return [4 /*yield*/, h.activate()];
                    case 3:
                        _a.sent();
                        testUtils_1.testAlert("Please move mouse around the rendered picture.");
                        return [4 /*yield*/, uxele_utils_1.sleep(5000)];
                    case 4:
                        _a.sent();
                        expect(testUtils_1.testConfirm("Have you seen two layers?")).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should display a layer that is chosen", function () { return __awaiter(_this, void 0, void 0, function () {
            var h;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        facade_1.store.dispatch(facade_1.actionChosePage(dummyPage()));
                        return [4 /*yield*/, f.renderPage(dummyPage())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, uxele_utils_1.sleep(100)];
                    case 2:
                        _a.sent();
                        h = new InspectTool_1.InspectTool();
                        h.setRenderer(f);
                        return [4 /*yield*/, h.activate()];
                    case 3:
                        _a.sent();
                        testUtils_1.testAlert("Please click on a layer");
                        return [4 /*yield*/, uxele_utils_1.sleep(5000)];
                    case 4:
                        _a.sent();
                        expect(testUtils_1.testConfirm("Have you seen clicked layer being highlighted?")).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should display layer correctly with zoomed renderer", function () { return __awaiter(_this, void 0, void 0, function () {
            var h;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        facade_1.store.dispatch(facade_1.actionChosePage(dummyPage()));
                        return [4 /*yield*/, f.renderPage(dummyPage())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, uxele_utils_1.sleep(100)];
                    case 2:
                        _a.sent();
                        h = new InspectTool_1.InspectTool();
                        h.setRenderer(f);
                        return [4 /*yield*/, h.activate()];
                    case 3:
                        _a.sent();
                        f.zoom(1.5);
                        return [4 /*yield*/, uxele_utils_1.sleep(1000)];
                    case 4:
                        _a.sent();
                        testUtils_1.testAlert("Zoomed renderer - Please click on a layer");
                        return [4 /*yield*/, uxele_utils_1.sleep(5000)];
                    case 5:
                        _a.sent();
                        expect(testUtils_1.testConfirm("Have you seen the layer has zoomed correctly?")).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    }
});
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/inspect/InspectTool.spec.js.map