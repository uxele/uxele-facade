import { Action, Reducer } from "redux";
import { BaseTool } from "uxele-core";
export interface IChoseToolAction extends Action<"chooseTool"> {
    tool?: BaseTool;
}
export declare function actionChoseTool(tool?: BaseTool): IChoseToolAction;
export interface IStateChoseTool {
    tool?: BaseTool;
}
export declare const chooseToolReducer: Reducer<IStateChoseTool, IChoseToolAction>;
