import { Action, Reducer } from "redux";
export type HandToolAction = Action<"toolsHandToolPanStart" | "toolsHandToolPanEnd">;

export function actionHandToolPanStart(): HandToolAction {
  return {
    type: "toolsHandToolPanStart"
  }
}
export function actionHandToolPanEnd(): HandToolAction {
  return {
    type: "toolsHandToolPanEnd"
  }
}
export interface IStateHandTool {
  panStarted: boolean;
}

export const handToolReducer: Reducer<IStateHandTool, HandToolAction> =
  (state, action): IStateHandTool => {
    if (!state){
      return {panStarted:false};
    }
    switch (action.type) {
      case "toolsHandToolPanStart":
        return { panStarted: true };
      case "toolsHandToolPanEnd":
        return { panStarted: false };
    }
    return state;
  }

