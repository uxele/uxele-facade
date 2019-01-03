"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var CanvasState_1 = require("./states/CanvasState");
/**
 * Control canvas behaviour e.g. zoomIn zoomOut fitPage etc
 */
var zoomScales = [0.1, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4];
function zoomIn() {
    var curZoom = getZoom();
    setZoom(getNextScale(curZoom));
}
exports.zoomIn = zoomIn;
/**
 * Move canvas to center to a point
 * @param fileCoords The coords of point to center on. the coords are relative to design page.
 */
function centerTo(fileCoords) {
    var render = _1.store.getState().renderer.renderer;
    if (render) {
        var mid = { x: render.renderWidth / 2, y: render.renderHeight / 2 };
        var target = {
            x: fileCoords.x * getZoom() - mid.x,
            y: fileCoords.y * getZoom() - mid.y
        };
        render.panX(target.x);
        render.panY(target.y);
    }
}
exports.centerTo = centerTo;
/**
 * Set zoom level of canvas with origin from center.
 */
function setZoom(level) {
    var render = _1.store.getState().renderer.renderer;
    if (render) {
        var curCenterCoords = render.rendererPointToRealPoint({
            x: render.renderWidth / 2,
            y: render.renderHeight / 2
        });
        render.zoom(level);
        _1.store.dispatch(CanvasState_1.actionCanvasStatusZoomLevel(level));
        centerTo(curCenterCoords);
    }
}
exports.setZoom = setZoom;
function zoomOut() {
    var curZoom = getZoom();
    setZoom(getPrevScale(curZoom));
}
exports.zoomOut = zoomOut;
function getZoom() {
    var render = _1.store.getState().renderer.renderer;
    if (render) {
        return render.zoom();
    }
    else {
        return 1;
    }
}
exports.getZoom = getZoom;
function fitToPage() {
    var render = _1.store.getState().renderer.renderer;
    var idealZoom = Math.round(1 / Math.max(render.imgWidth / render.renderWidth, render.imgHeight / render.renderHeight, 1) * 100) / 100;
    var zoom = zoomScales.indexOf(idealZoom) !== -1 ? idealZoom : getPrevScale(idealZoom);
    centerTo({
        x: render.imgWidth / 2,
        y: render.imgHeight / 2
    });
    // const width = page.width * zoom;
    // const height = page.height * zoom;
    // const panX = -(render.renderWidth - width) / 2;
    // const panY = -(render.renderHeight - height) / 2;
    // render.panX(panX);
    // render.panY(panY);
    setZoom(zoom);
}
exports.fitToPage = fitToPage;
function getNextScale(level) {
    return zoomScales.find(function (scale) { return scale > level; }) || zoomScales[zoomScales.length - 1];
}
function getPrevScale(level) {
    return zoomScales.concat().reverse().find(function (scale) { return scale < level; }) || zoomScales[0];
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/canvasControl.js.map