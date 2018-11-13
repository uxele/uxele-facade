import { FabricRenderer } from "uxele-render-fabric";
import { store, actionRendererSet } from "./states";
export function bindCanvas(canvas:HTMLCanvasElement){
  const oldRenderer=store.getState().renderer.renderer;
  if (oldRenderer){
    oldRenderer.destroy();
  }
  const renderer = new FabricRenderer(canvas, canvas.width, canvas.height);
  store.dispatch(actionRendererSet(renderer));
  return renderer;
}