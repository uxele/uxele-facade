import { Action, Reducer } from "redux";
import { IRenderer } from "uxele-core";
export interface IRendererAction extends Action<"rendererSet"> {
    renderer?: IRenderer;
}
export declare function actionRendererSet(renderer: IRenderer): IRendererAction;
export interface IRendererState {
    renderer?: IRenderer;
}
export declare const rendererReducer: Reducer<IRendererState, IRendererAction>;
