import { combineReducers, createStore } from "redux";
// import { IState } from "./State";
import { handToolReducer } from "./HandToolState";
import { choseLayerReducer } from "./ChoseLayerState";
import { chosePageReducer } from "./ChosePageState";
import { colorToolReducer } from "./ColorToolState";
import { projectReducer } from "./ProjectState";
import { chooseToolReducer } from "./ChoseToolState";
import { rendererReducer } from "./RendererState";
import { canvasStatusReducer } from "./CanvasState";
const rootReducer = combineReducers({
  handTool: handToolReducer,
  choseLayer: choseLayerReducer,
  chosePage: chosePageReducer,
  project: projectReducer,
  colorTool: colorToolReducer,
  choseTool: chooseToolReducer,
  renderer: rendererReducer,
  canvasStatus: canvasStatusReducer
})
export const store = createStore(rootReducer);
