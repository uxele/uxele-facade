import { FabricRenderer } from "uxele-render-fabric";
import { store, actionRendererSet, actionChosePage } from "./states";
import { IPage, IRenderer, IRendererEvent } from "uxele-core/build";
import { actionCanvasStatusCoords } from "./states/CanvasState";
import { fitToPage } from "./canvasControl";
let unsubscribe: Function;
let curRender: IRenderer;
let curParent: HTMLElement;
export async function bindCanvas(canvas: HTMLCanvasElement, parent: HTMLElement) {
  // unload previous renderer (if any)
  if (curRender) {
    curRender.destroy();
    unsubscribeMouseCoords(curRender);
  }
  if (unsubscribe) {
    unsubscribe();
  }
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
  curRender = new FabricRenderer(canvas, canvas.width, canvas.height);
  curParent = parent;
  //sub to mouse coords
  subscribeMouseCoords(curRender);
  store.dispatch(actionRendererSet(curRender));
  let curPage: IPage | undefined = undefined;
  unsubscribe = store.subscribe(() => {
    // listen to page change event and render chose page accordingly.
    if (store.getState().chosePage.page !== curPage) {
      curPage = store.getState().chosePage.page;
      if (curPage) {
        // render page
        curRender.renderPage(curPage)
          .then(() => {
            // zoom canvas to fit page size;
            fitToPage();
          });


      }
    }
  })
  const firstPage = (await store.getState().project.project!.getPages())[0];
  if (firstPage) {
    store.dispatch(actionChosePage(firstPage));
  }
  return curRender;
}
let resizeTimer: number | null = null;
window.addEventListener("resize", () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
  if (curRender) {
    resizeTimer = window.setTimeout(() => {
      resizeTimer = null;
      if (curRender) {
        curRender.resizeRender(curParent.clientWidth, curParent.clientHeight);
      }
    }, 100);
  }


})

function subscribeMouseCoords(render: IRenderer) {
  render.on("mousemove", onMouseMove)
}
function unsubscribeMouseCoords(render: IRenderer) {
  render.off("mousemove", onMouseMove)
}
function onMouseMove(e?: IRendererEvent) {
  if (e) {
    const coords = curRender.rendererPointToRealPoint(curRender.mouseEventToCoords(e));
    store.dispatch(actionCanvasStatusCoords(coords));
  }
}

