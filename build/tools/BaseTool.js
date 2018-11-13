"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type BaseToolEvents = "onActivated" | "onDeactivated";
var BaseTool = /** @class */ (function () {
    function BaseTool() {
        this.activated = false;
    }
    Object.defineProperty(BaseTool.prototype, "renderer", {
        get: function () {
            if (this._renderer) {
                return this._renderer;
            }
            else {
                throw (new Error("Renderer is not inited"));
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseTool.prototype.setRenderer = function (renderer) {
        var _this = this;
        if (this.activated) {
            this.deactivate().then(function () {
                _this._renderer = renderer;
                return _this.activate();
            });
        }
        else {
            this._renderer = renderer;
        }
    };
    BaseTool.prototype.activate = function () {
        var _this = this;
        // renderer.clearDrawing();
        return this.bindRenderer()
            .then(function () {
            _this.activated = true;
        });
    };
    BaseTool.prototype.deactivate = function () {
        var _this = this;
        return this.unbindRenderer()
            .then(function () {
            _this.activated = false;
        });
    };
    return BaseTool;
}());
exports.BaseTool = BaseTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/BaseTool.js.map