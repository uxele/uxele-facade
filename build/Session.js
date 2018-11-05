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
var build_1 = require("../../psdetch-core/build");
var psdetch_tool_hand_1 = require("../../psdetch-tool-hand");
var build_2 = require("../../psdetch-tool-inspect/build");
var props = {};
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        var _this = _super.call(this) || this;
        _this.once("renderer", function (r) {
            var renderer = r;
            // once renderer exists, register all tools.
            _this.bindTools(renderer);
        });
        return _this;
    }
    Session.prototype.get = function (key) {
        return props[key];
    };
    Session.prototype.set = function (key, val) {
        if (props[key] === val) {
            return;
        }
        props[key] = val;
        this.emit(key, val);
    };
    Session.prototype.bindTools = function (renderer) {
        this.set("handtool", new psdetch_tool_hand_1.HandTool(renderer));
        this.set("inspectTool", new build_2.InspectTool(renderer));
        // this.set("colorTool",new ColorTool(renderer));
    };
    return Session;
}(build_1.BasicEvents));
exports.Session = Session;
// export const session = new Session();
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/Session.js.map