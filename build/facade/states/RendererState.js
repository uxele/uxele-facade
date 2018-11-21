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
function actionRendererSet(renderer) {
    return {
        type: "rendererSet",
        renderer: renderer
    };
}
exports.actionRendererSet = actionRendererSet;
exports.rendererReducer = function (state, action) {
    if (!state) {
        return {};
    }
    switch (action.type) {
        case "rendererSet":
            if (state.renderer === action.renderer) {
                return state;
            }
            return __assign({}, state, { renderer: action.renderer });
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/RendererState.js.map