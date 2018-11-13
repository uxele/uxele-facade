"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var facade_1 = require("facade");
var hand_1 = require("./hand");
var inspect_1 = require("./inspect");
var color_1 = require("./color");
__export(require("./color"));
__export(require("./hand"));
__export(require("./inspect"));
__export(require("./BaseTool"));
function getTools() { return tools; }
exports.getTools = getTools;
function getToolInst(constructor) {
    return tools.find(function (v) {
        if (v instanceof constructor) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.getToolInst = getToolInst;
var tools = [
    new hand_1.HandTool(),
    new inspect_1.InspectTool(),
    new color_1.ColorTool()
];
function init() {
    var curRenderer;
    facade_1.store.subscribe(function () {
        if (facade_1.store.getState().renderer.renderer !== curRenderer) {
            curRenderer = facade_1.store.getState().renderer.renderer;
            tools.forEach(function (tool) {
                tool.setRenderer(curRenderer);
            });
        }
    });
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/index.js.map