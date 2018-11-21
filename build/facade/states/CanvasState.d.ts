import { IPoint } from "uxele-core";
import { Action, Reducer } from "redux";
export interface ICanvasStatusAction extends Action<"canvasStatusCoords" | "canvasStatusZoomLevel"> {
    coords?: IPoint;
    zoomLevel?: number;
}
export declare function actionCanvasStatusCoords(coords: IPoint): ICanvasStatusAction;
export declare function actionCanvasStatusZoomLevel(level: number): ICanvasStatusAction;
export interface IStateCanvasState {
    coords: IPoint;
    zoomLevel: number;
}
export declare const canvasStatusReducer: Reducer<IStateCanvasState, ICanvasStatusAction>;
