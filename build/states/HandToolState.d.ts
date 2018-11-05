import { Action, Reducer } from "redux";
export declare type HandToolAction = Action<"toolsHandToolPanStart" | "toolsHandToolPanEnd">;
export declare function actionHandToolPanStart(): HandToolAction;
export declare function actionHandToolPanEnd(): HandToolAction;
export interface IStateHandTool {
    panStarted: boolean;
}
export declare const handToolReducer: Reducer<IStateHandTool, HandToolAction>;
