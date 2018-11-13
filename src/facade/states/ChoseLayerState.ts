import { Action, Reducer } from "redux";
import { ILayer } from "uxele-core";
export interface IChoseLayerAction extends Action<"choseLayer"> {
  layer?: ILayer
}

export function actionChoseLayer(layer?: ILayer): IChoseLayerAction {
  return {
    type: "choseLayer",
    layer
  }
}

export interface IStateChoseLayer{
  layer?:ILayer;
}
export const choseLayerReducer: Reducer<IStateChoseLayer, IChoseLayerAction> =
  (state, action)=> {
    if (!state){
      return {};
    }
    switch (action.type) {
      case "choseLayer":
        if (state.layer && state.layer === action.layer) {
          return state;
        }
        return {layer:action.layer};
    }
    return state;
  }

