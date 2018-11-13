"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function actionChoseLayer(layer) {
    return {
        type: "choseLayer",
        layer: layer
    };
}
exports.actionChoseLayer = actionChoseLayer;
exports.choseLayerReducer = function (state, action) {
    if (!state) {
        return {};
    }
    switch (action.type) {
        case "choseLayer":
            if (state.layer && state.layer === action.layer) {
                return state;
            }
            return { layer: action.layer };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/ChoseLayerState.js.map