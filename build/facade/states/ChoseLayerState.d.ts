import { Action, Reducer } from "redux";
import { ILayer } from "uxele-core";
export interface IChoseLayerAction extends Action<"choseLayer"> {
    layer?: ILayer;
}
export declare function actionChoseLayer(layer?: ILayer): IChoseLayerAction;
export interface IStateChoseLayer {
    layer?: ILayer;
}
export declare const choseLayerReducer: Reducer<IStateChoseLayer, IChoseLayerAction>;
