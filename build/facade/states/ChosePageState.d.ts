import { Action, Reducer } from "redux";
import { IPage } from "uxele-core";
export interface IChosePageAction extends Action<"chosePage"> {
    page?: IPage;
}
export declare function actionChosePage(page?: IPage): IChosePageAction;
export interface IStateChosePage {
    page?: IPage;
}
export declare const chosePageReducer: Reducer<IStateChosePage, IChosePageAction>;
