import { Action, Reducer } from "redux";
import { IProject } from "psdetch-core";
export interface IProjectLoadedAction extends Action<"projectLoaded"> {
    project: IProject;
}
export declare function actionProjectLoaded(project: IProject): IProjectLoadedAction;
export interface IProjectState {
    project?: IProject;
}
export declare const projectReducer: Reducer<IProjectState, IProjectLoadedAction>;
