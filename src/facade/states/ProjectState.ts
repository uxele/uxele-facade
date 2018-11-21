import { Action, Reducer } from "redux";
import { IProject } from "uxele-core";
export interface IProjectLoadedAction extends Action<"projectLoaded"> {
  project?: IProject
}
export function actionProjectLoaded(project: IProject): IProjectLoadedAction {
  return {
    type: "projectLoaded",
    project
  }
}

export interface IProjectState {
  project?: IProject;
}

export const projectReducer: Reducer<IProjectState
  , IProjectLoadedAction> =
  (state, action) => {
    if (!state) {
      return {
        loading: false
      }
    }
    switch (action.type) {
      case "projectLoaded":
        if (state.project === action.project) {
          return state;
        }
        return { project: action.project, loading: false };
    }
    return state;
  }

