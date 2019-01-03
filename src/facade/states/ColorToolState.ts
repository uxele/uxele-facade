import { Action, Reducer } from "redux";
export interface IColorToolAction extends Action<"toolsColorToolHover" | "toolsColorToolPick"> {
  color?: string;
}

export function actionColorToolHover(color?: string): IColorToolAction {
  return {
    type: "toolsColorToolHover",
    color
  }
}
export function actionColorToolPick(color: string): IColorToolAction {
  return {
    type: "toolsColorToolPick",
    color
  }
}

export interface IStateColorTool {
  hoverColor?: string;
  lastPicked: string;
  pickedColors: string[];
}

export const colorToolReducer: Reducer<IStateColorTool, IColorToolAction> =
  (state, action): IStateColorTool => {
    if (!state) {
      return {
        lastPicked: "",
        pickedColors: []
      }
    }
    switch (action.type) {
      case "toolsColorToolHover":
        return { ...state, hoverColor: action.color };
      case "toolsColorToolPick":
        if (state.pickedColors.indexOf(action.color!) === -1) {
          return { ...state, lastPicked: action.color!, pickedColors: state.pickedColors.concat([action.color!]) };
        } else {
          return { ...state, lastPicked: action.color! };
        }

    }
    return state;
  }

