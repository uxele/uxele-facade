"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toast = require("../vendor/toastr.js").Toast;
var Toastr = /** @class */ (function () {
    function Toastr() {
    }
    Toastr.prototype.info = function (str) {
        Toast(str, {
            style: {
                main: {
                    bottom: "auto",
                    top: "10%",
                    left: "auto",
                    width: "auto",
                    right: "8%",
                    background: "rgba(255,255,255,0.85",
                    color: "black"
                }
            },
            settings: {
                duration: 800
            }
        });
    };
    return Toastr;
}());
exports.toastr = new Toastr();
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/toastr.js.map