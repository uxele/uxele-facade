import { Action, Reducer } from "redux";
import { BaseTool } from "../../tools";
export interface IChoseToolAction extends Action<"chooseTool"> {
  tool?: BaseTool
}

export function actionChoseTool(tool?: BaseTool): IChoseToolAction {
  return {
    type: "chooseTool",
    tool
  }
}

export interface IStateChoseTool{
  tool?:BaseTool;
}
export const chooseToolReducer: Reducer<IStateChoseTool, IChoseToolAction> =
  (state, action)=> {
    if (!state){
      return {};
    }
    switch (action.type) {
      case "chooseTool":
        if (state.tool && state.tool === action.tool) {
          return state;
        }
        return {tool:action.tool};
    }
    return state;
  }

