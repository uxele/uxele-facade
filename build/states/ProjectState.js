"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function actionProjectLoaded(project) {
    return {
        type: "projectLoaded",
        project: project
    };
}
exports.actionProjectLoaded = actionProjectLoaded;
exports.projectReducer = function (state, action) {
    if (!state) {
        return {
            loading: false
        };
    }
    switch (action.type) {
        case "projectLoaded":
            if (state.project === action.project) {
                return state;
            }
            return { project: action.project, loading: false };
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/states/ProjectState.js.map