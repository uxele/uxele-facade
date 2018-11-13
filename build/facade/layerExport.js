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
var layer_1 = require("uxele-utils/build/layer");
var uxele_utils_1 = require("uxele-utils");
var uxele_i18n_1 = require("uxele-i18n");
function canExportImage(layer) {
    return layer_1.isPixelLayer(layer) || layer_1.isVectorlLayer(layer);
}
exports.canExportImage = canExportImage;
function canExportSvg(layer) {
    return layer_1.isVectorlLayer(layer);
}
exports.canExportSvg = canExportSvg;
function canExportText(layer) {
    return layer_1.isTextLayer(layer);
}
exports.canExportText = canExportText;
function getExportType(layer) {
    return canExportImage(layer) ? "image" : canExportSvg(layer) ? "svg" : "text";
}
exports.getExportType = getExportType;
function exportImageUrl(layer, params) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exportImage(layer, params)];
                case 1:
                    canvas = _a.sent();
                    return [2 /*return*/, canvas.toDataURL(params.format, params.quality)];
            }
        });
    });
}
exports.exportImageUrl = exportImageUrl;
function exportImage(layer, params) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, svg, canvas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!layer_1.isPixelLayer(layer)) return [3 /*break*/, 2];
                    return [4 /*yield*/, layer.getPixelImg()];
                case 1:
                    canvas = _a.sent();
                    if (params.trim) {
                        canvas = uxele_utils_1.trimCanvas(canvas);
                    }
                    if (params.scale !== 1) {
                        canvas = uxele_utils_1.scaleCanvas(canvas, params.scale);
                    }
                    return [2 /*return*/, canvas];
                case 2:
                    if (!layer_1.isVectorlLayer(layer)) return [3 /*break*/, 5];
                    return [4 /*yield*/, layer.getSvgString()];
                case 3:
                    svg = _a.sent();
                    return [4 /*yield*/, uxele_utils_1.svgToCanvas(svg, params.scale)];
                case 4:
                    canvas = _a.sent();
                    if (params.trim) {
                        canvas = uxele_utils_1.trimCanvas(canvas);
                    }
                    return [2 /*return*/, canvas];
                case 5: return [2 /*return*/, Promise.reject(uxele_i18n_1.lang("error_layerExport_exportImage_unsupported_layerType", layer.name, layer.layerType))];
            }
        });
    });
}
exports.exportImage = exportImage;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/layerExport.js.map