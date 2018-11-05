import { Action, Reducer } from "redux";
import { IRenderer } from "psdetch-core";
export interface IRendererSetAction extends Action<"rendererSet"> {
    renderer: IRenderer;
}
export declare function actionRendererSet(renderer: IRenderer): IRendererSetAction;
export interface IRendererState {
    renderer?: IRenderer;
}
export declare const rendererReducer: Reducer<IRendererState, IRendererSetAction>;
