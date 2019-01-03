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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var facade_1 = require("../facade");
var hand_1 = require("./hand");
var inspect_1 = require("./inspect");
var color_1 = require("./color");
__export(require("./color"));
__export(require("./hand"));
__export(require("./inspect"));
__export(require("./BaseTool"));
// export function getTools() { return allTools; }
function getToolInst(constructor) {
    return allTools().find(function (v) {
        if (v instanceof constructor) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.getToolInst = getToolInst;
function allTools() {
    var rtn = [];
    Object.keys(exports.tools).forEach(function (key) {
        rtn = rtn.concat(exports.tools[key]);
    });
    return rtn;
}
exports.tools = {
    "inspect": [
        new inspect_1.InspectTool(),
        new color_1.ColorTool()
    ],
    "general": [
        new hand_1.HandTool()
    ],
    "prototype": []
};
function init() {
    var curRenderer;
    facade_1.store.subscribe(function () {
        if (facade_1.store.getState().renderer.renderer !== curRenderer) {
            curRenderer = facade_1.store.getState().renderer.renderer;
            allTools().forEach(function (tool) {
                tool.setRenderer(curRenderer);
            });
            exports.tools.general[0].activate();
        }
    });
}
function setActiveTool(tool) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentTool = facade_1.store.getState().choseTool.tool;
                    if (!(currentTool !== tool)) return [3 /*break*/, 5];
                    if (!currentTool) return [3 /*break*/, 2];
                    return [4 /*yield*/, currentTool.deactivate()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!tool) return [3 /*break*/, 4];
                    return [4 /*yield*/, tool.activate()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    facade_1.store.dispatch(facade_1.actionChoseTool(tool));
                    return [3 /*break*/, 6];
                case 5:
                    if (currentTool) {
                        setActiveTool();
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.setActiveTool = setActiveTool;
function toggleTool(tool) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!tool.activated) return [3 /*break*/, 2];
                    return [4 /*yield*/, tool.activate()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, tool.deactivate()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.toggleTool = toggleTool;
init();
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/index.js.map