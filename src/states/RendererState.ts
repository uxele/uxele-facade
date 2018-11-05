import { Action, Reducer } from "redux";
import { IRenderer } from "psdetch-core";
export interface IRendererSetAction extends Action<"rendererSet"> {
  renderer: IRenderer
}
export function actionRendererSet(renderer: IRenderer): IRendererSetAction {
  return {
    type: "rendererSet",
    renderer
  }
}

export interface IRendererState {
  renderer?: IRenderer;
}

export const rendererReducer: Reducer<IRendererState
  , IRendererSetAction> =
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
        return { renderer: action.renderer};
    }
    return state;
  }

