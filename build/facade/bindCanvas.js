"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_render_fabric_1 = require("uxele-render-fabric");
var states_1 = require("./states");
function bindCanvas(canvas) {
    var oldRenderer = states_1.store.getState().renderer.renderer;
    if (oldRenderer) {
        oldRenderer.destroy();
    }
    var renderer = new uxele_render_fabric_1.FabricRenderer(canvas, canvas.width, canvas.height);
    states_1.store.dispatch(states_1.actionRendererSet(renderer));
}
exports.bindCanvas = bindCanvas;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/bindCanvas.js.map