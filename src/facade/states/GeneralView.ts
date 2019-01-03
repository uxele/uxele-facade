import { Reducer, Action } from "redux";

export type Pillar = "inspect" | "prototype";
export type PageLayerList = "pageList" | "layerList";
export interface IGeneralViewAction extends Action<"choosePillar" | "pageLayerList"> {
  pillar?: Pillar,
  pageLayerList?: PageLayerList
}


export interface IGeneralViewState {
  pillar: Pillar,
  pageLayerList?: PageLayerList
}

export const generalViewReducer: Reducer<IGeneralViewState, IGeneralViewAction> = (state, action) => {
  if (!state) {
    return { pillar: "inspect" }
  }
  switch (action.type) {
    case "choosePillar":
      return { ...state, pillar: action.pillar! }
    case "pageLayerList":
      const current = { ...state };
      if (current.pageLayerList === action.pageLayerList) {
        current.pageLayerList = undefined;
        return current;
      } else {
        return { ...state, pageLayerList: action.pageLayerList }
      }

  }
  return state;
}

export function actionChoosePillar(pillar: Pillar): IGeneralViewAction {
  return {
    type: "choosePillar",
    pillar
  }
}

export function actionTogglePageLayerList(item?: PageLayerList): IGeneralViewAction {
  return {
    type: "pageLayerList",
    pageLayerList: item
  }
}