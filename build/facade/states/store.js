"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
// import { IState } from "./State";
var HandToolState_1 = require("./HandToolState");
var ChoseLayerState_1 = require("./ChoseLayerState");
var ChosePageState_1 = require("./ChosePageState");
var ColorToolState_1 = require("./ColorToolState");
var ProjectState_1 = require("./ProjectState");
var ChoseToolState_1 = require("./ChoseToolState");
var RendererState_1 = require("./RendererState");
var CanvasState_1 = require("./CanvasState");
var GeneralView_1 = require("./GeneralView");
var rootReducer = redux_1.combineReducers({
    handTool: HandToolState_1.handToolReducer,
    choseLayer: ChoseLayerState_1.choseLayerReducer,
    chosePage: ChosePageState_1.chosePageReducer,
    project: ProjectState_1.projectReducer,
    colorTool: ColorToolState_1.colorToolReducer,
    choseTool: ChoseToolState_1.chooseToolReducer,
    renderer: RendererState_1.rendererReducer,
    canvasStatus: CanvasState_1.canvasStatusReducer,
    genearlView: GeneralView_1.generalViewReducer
});
exports.store = redux_1.createStore(rootReducer);
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/facade/states/store.js.map