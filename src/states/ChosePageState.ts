import { Action, Reducer } from "redux";
import { IPage } from "psdetch-core";
export interface IChosePageAction extends Action<"chosePage"> {
  page?: IPage
}

export function actionChosePage(page?: IPage): IChosePageAction {
  return {
    type: "chosePage",
    page
  }
}
export interface IStateChosePage{
  page?:IPage;
}

export const chosePageReducer: Reducer<IStateChosePage, IChosePageAction> =
  (state, action)=> {
    if (!state){
      return {};
    }
    switch (action.type) {
      case "chosePage":
        if (state.page === action.page) {
          return state;
        }
        return {page:action.page};
    }
    return state;
  }

