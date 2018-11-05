"use strict";
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
            return { renderer: action.renderer };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/states/RendererState.js.map