import { Reducer, Action } from "redux";
export declare type Pillar = "inspect" | "prototype";
export declare type PageLayerList = "pageList" | "layerList";
export interface IGeneralViewAction extends Action<"choosePillar" | "pageLayerList"> {
    pillar?: Pillar;
    pageLayerList?: PageLayerList;
}
export interface IGeneralViewState {
    pillar: Pillar;
    pageLayerList?: PageLayerList;
}
export declare const generalViewReducer: Reducer<IGeneralViewState, IGeneralViewAction>;
export declare function actionChoosePillar(pillar: Pillar): IGeneralViewAction;
export declare function actionTogglePageLayerList(item?: PageLayerList): IGeneralViewAction;
