import { Pillar, actionChoosePillar } from "./states/GeneralView";
import { store, actionChoseTool } from "./states";
import { setActiveTool } from "../tools";

export function switchPillars(pillar: Pillar) {
  if (store.getState().genearlView.pillar !== pillar) {
    store.dispatch(actionChoosePillar(pillar));
    setActiveTool();
  }
}