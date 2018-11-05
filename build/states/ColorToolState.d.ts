import { Action, Reducer } from "redux";
export interface IColorToolAction extends Action<"toolsColorToolHover" | "toolsColorToolPick"> {
    color?: string;
}
export declare function actionColorToolHover(color?: string): IColorToolAction;
export declare function actionColorToolPick(color: string): IColorToolAction;
export interface IStateColorTool {
    hoverColor?: string;
    lastPicked: string;
    pickedColors: string[];
}
export declare const colorToolReducer: Reducer<IStateColorTool, IColorToolAction>;
