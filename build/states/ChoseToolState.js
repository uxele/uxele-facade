"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function actionChoseTool(tool) {
    return {
        type: "chooseTool",
        tool: tool
    };
}
exports.actionChoseTool = actionChoseTool;
exports.chooseToolReducer = function (state, action) {
    if (!state) {
        return {};
    }
    switch (action.type) {
        case "chooseTool":
            if (state.tool && state.tool === action.tool) {
                return state;
            }
            return { tool: action.tool };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/states/ChoseToolState.js.map