"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralView_1 = require("./states/GeneralView");
var states_1 = require("./states");
var tools_1 = require("../tools");
function switchPillars(pillar) {
    if (states_1.store.getState().genearlView.pillar !== pillar) {
        states_1.store.dispatch(GeneralView_1.actionChoosePillar(pillar));
        tools_1.setActiveTool();
    }
}
exports.switchPillars = switchPillars;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/general.js.map