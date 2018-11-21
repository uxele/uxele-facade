import { Action, Reducer } from "redux";
import { IRenderer } from "uxele-core";
export interface IRendererAction extends Action<"rendererSet" > {
  renderer?: IRenderer;
}
export function actionRendererSet(renderer: IRenderer): IRendererAction {
  return {
    type: "rendererSet",
    renderer
  }
}

export interface IRendererState {
  renderer?: IRenderer;
}

export const rendererReducer: Reducer<IRendererState
  , IRendererAction> =
  (state, action) => {
    if (!state) {
      return {
      }
    }
    switch (action.type) {
      case "rendererSet":
        if (state.renderer === action.renderer) {
          return state;
        }
        return { ...state, renderer: action.renderer };
    }
    return state;
  }

