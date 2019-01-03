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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTool_1 = require("../BaseTool");
var PrototypeTool = /** @class */ (function (_super) {
    __extends(PrototypeTool, _super);
    function PrototypeTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "tool_prototype_name";
        _this.slug = "tool_prototype";
        _this.cls = "fas fa-mouse-pointer";
        return _this;
    }
    PrototypeTool.prototype.bindRenderer = function () {
        throw new Error("Method not implemented.");
    };
    PrototypeTool.prototype.unbindRenderer = function () {
        throw new Error("Method not implemented.");
    };
    return PrototypeTool;
}(BaseTool_1.BaseTool));
exports.PrototypeTool = PrototypeTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/prototype/PrototypeTool.js.map