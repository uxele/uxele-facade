"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprintf_js_1 = require("sprintf-js");
var en_1 = require("./langs/en");
var langs = [en_1.en];
var curLang = en_1.en;
function lang(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return sprintf_js_1.sprintf.apply(void 0, [curLang.dict[key]].concat(args));
}
exports.lang = lang;
function setCurLang(_lang) {
    curLang = _lang;
}
exports.setCurLang = setCurLang;
function getLangs() {
    return langs;
}
exports.getLangs = getLangs;
function getCurLang() {
    return curLang;
}
exports.getCurLang = getCurLang;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/i18n/lang.js.map