"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function actionChosePage(page) {
    return {
        type: "chosePage",
        page: page
    };
}
exports.actionChosePage = actionChosePage;
exports.chosePageReducer = function (state, action) {
    if (!state) {
        return {};
    }
    switch (action.type) {
        case "chosePage":
            if (state.page === action.page) {
                return state;
            }
            return { page: action.page };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/ChosePageState.js.map