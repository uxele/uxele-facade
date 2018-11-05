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
function actionColorToolHover(color) {
    return {
        type: "toolsColorToolHover",
        color: color
    };
}
exports.actionColorToolHover = actionColorToolHover;
function actionColorToolPick(color) {
    return {
        type: "toolsColorToolPick",
        color: color
    };
}
exports.actionColorToolPick = actionColorToolPick;
exports.colorToolReducer = function (state, action) {
    if (!state) {
        return {
            lastPicked: "",
            pickedColors: []
        };
    }
    switch (action.type) {
        case "toolsColorToolHover":
            return __assign({}, state, { hoverColor: action.color });
        case "toolsColorToolPick":
            return __assign({}, state, { lastPicked: action.color, pickedColors: state.pickedColors.concat([action.color]) });
    }
    return state;
};
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-faced/src/states/ColorToolState.js.map