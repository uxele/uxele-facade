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
exports.generalViewReducer = function (state, action) {
    if (!state) {
        return { pillar: "inspect" };
    }
    switch (action.type) {
        case "choosePillar":
            return __assign({}, state, { pillar: action.pillar });
        case "pageLayerList":
            var current = __assign({}, state);
            if (current.pageLayerList === action.pageLayerList) {
                current.pageLayerList = undefined;
                return current;
            }
            else {
                return __assign({}, state, { pageLayerList: action.pageLayerList });
            }
    }
    return state;
};
function actionChoosePillar(pillar) {
    return {
        type: "choosePillar",
        pillar: pillar
    };
}
exports.actionChoosePillar = actionChoosePillar;
function actionTogglePageLayerList(item) {
    return {
        type: "pageLayerList",
        pageLayerList: item
    };
}
exports.actionTogglePageLayerList = actionTogglePageLayerList;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/GeneralView.js.map