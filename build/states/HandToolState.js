"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function actionHandToolPanStart() {
    return {
        type: "toolsHandToolPanStart"
    };
}
exports.actionHandToolPanStart = actionHandToolPanStart;
function actionHandToolPanEnd() {
    return {
        type: "toolsHandToolPanEnd"
    };
}
exports.actionHandToolPanEnd = actionHandToolPanEnd;
exports.handToolReducer = function (state, action) {
    if (!state) {
        return { panStarted: false };
    }
    switch (action.type) {
        case "toolsHandToolPanStart":
            return { panStarted: true };
        case "toolsHandToolPanEnd":
            return { panStarted: false };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/states/HandToolState.js.map