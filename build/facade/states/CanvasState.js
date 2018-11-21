"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function actionCanvasStatusCoords(coords) {
    return {
        type: "canvasStatusCoords",
        coords: coords
    };
}
exports.actionCanvasStatusCoords = actionCanvasStatusCoords;
function actionCanvasStatusZoomLevel(level) {
    return {
        type: "canvasStatusZoomLevel",
        zoomLevel: level
    };
}
exports.actionCanvasStatusZoomLevel = actionCanvasStatusZoomLevel;
exports.canvasStatusReducer = function (state, action) {
    if (!state) {
        return {
            coords: { x: 0, y: 0 },
            zoomLevel: 1
        };
    }
    switch (action.type) {
        case "canvasStatusCoords":
            if (state.coords === action.coords) {
                return state;
            }
            return __assign({}, state, { coords: __assign({}, action.coords) });
        case "canvasStatusZoomLevel":
            return __assign({}, state, { zoomLevel: action.zoomLevel });
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/CanvasState.js.map