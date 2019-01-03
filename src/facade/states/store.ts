import { combineReducers, createStore } from "redux";
// import { IState } from "./State";
import { handToolReducer,IStateHandTool } from "./HandToolState";
import { choseLayerReducer,IStateChoseLayer } from "./ChoseLayerState";
import { chosePageReducer ,IStateChosePage} from "./ChosePageState";
import { colorToolReducer ,IStateColorTool} from "./ColorToolState";
import { projectReducer ,IProjectState} from "./ProjectState";
import { chooseToolReducer ,IStateChoseTool} from "./ChoseToolState";
import { rendererReducer ,IRendererState} from "./RendererState";
import { canvasStatusReducer ,IStateCanvasState} from "./CanvasState";
import { generalViewReducer ,IGeneralViewState} from "./GeneralView";
const rootReducer = combineReducers({
  handTool: handToolReducer,
  choseLayer: choseLayerReducer,
  chosePage: chosePageReducer,
  project: projectReducer,
  colorTool: colorToolReducer,
  choseTool: chooseToolReducer,
  renderer: rendererReducer,
  canvasStatus: canvasStatusReducer,
  genearlView: generalViewReducer
})
export const store = createStore(rootReducer);
