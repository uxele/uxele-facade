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
var adapters_1 = require("../adapters");
var psdetch_i18n_1 = require("psdetch-i18n");
var states_1 = require("../states");
function projectOpenLocalFile(_f) {
    return __awaiter(this, void 0, void 0, function () {
        var adps, file, _i, adps_1, adp, proj, pgs, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adps = adapters_1.adapters;
                    file = {
                        meta: {
                            name: _f.name,
                            mime: _f.type
                        },
                        file: _f
                    };
                    _i = 0, adps_1 = adps;
                    _a.label = 1;
                case 1:
                    if (!(_i < adps_1.length)) return [3 /*break*/, 7];
                    adp = adps_1[_i];
                    if (!adp.checkFileMeta(file.meta)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, adp.decodeProject(file)];
                case 3:
                    proj = _a.sent();
                    states_1.store.dispatch(states_1.actionProjectLoaded(proj));
                    return [4 /*yield*/, proj.getPages()];
                case 4:
                    pgs = _a.sent();
                    return [2 /*return*/, proj];
                case 5:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_1.toString())];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, Promise.reject(psdetch_i18n_1.lang("error_openfile_no_adapter", file.meta.name))];
            }
        });
    });
}
exports.projectOpenLocalFile = projectOpenLocalFile;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/faced/projectOpenLocalFile.js.map