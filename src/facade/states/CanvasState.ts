import { IPoint } from "uxele-core";
import { Action,Reducer } from "redux";

export interface ICanvasStatusAction extends Action<"canvasStatusCoords" | "canvasStatusZoomLevel"> {
  coords?: IPoint,
  zoomLevel?: number;
}

export function actionCanvasStatusCoords(coords: IPoint):ICanvasStatusAction {
  return {
    type: "canvasStatusCoords",
    coords
  }
}
export function actionCanvasStatusZoomLevel(level: number): ICanvasStatusAction {
  return {
    type: "canvasStatusZoomLevel",
    zoomLevel: level
  }
}
export interface IStateCanvasState {
  coords: IPoint;
  zoomLevel:number;
}
export const canvasStatusReducer: Reducer<IStateCanvasState, ICanvasStatusAction> =
  (state, action):IStateCanvasState => {
    if (!state) {
      return {
        coords: { x: 0, y: 0 },
        zoomLevel: 1
      }
    }
    switch (action.type) {
      case "canvasStatusCoords":
        if (state.coords === action.coords) {
          return state;
        }
        return { ...state, coords: { ...action.coords! } };
      case "canvasStatusZoomLevel":
        return { ...state, zoomLevel: action.zoomLevel! };
    }
    return state;
  }