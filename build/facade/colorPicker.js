"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("uxele-utils/build");
var toastr_1 = require("./toastr");
function copyColor(colorRGB) {
    var hex = build_1.color.rgbStrToHex(colorRGB).toUpperCase();
    build_1.copyToClipboard(hex);
    toastr_1.toastr.info("Copied " + hex);
}
exports.copyColor = copyColor;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/colorPicker.js.map