import { SvgRenderer } from "uxele-render-svg"
import { store, actionRendererSet, actionChosePage } from "./states";
import { IPage, IRenderer, IRendererEvent } from "uxele-core/build";
import { actionCanvasStatusCoords } from "./states/CanvasState";
import { fitToPage } from "./canvasControl";
let unsubscribe: Function;
let curRender: IRenderer;
export async function bindCanvas(parent: HTMLElement) {
  // unload previous renderer (if any)
  if (curRender) {
    curRender.destroy();
    unsubscribeMouseCoords(curRender);
  }
  if (unsubscribe) {
    unsubscribe();
  }
  curRender = new SvgRenderer(parent);
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
        // curRender.renderPage(curPage)
        //   .then(() => {
        //     // zoom canvas to fit page size;
        //     fitToPage();
        //   });


      }
    }
  })
  // const firstPage = (await store.getState().project.project!.getPages())[0];
  // if (firstPage) {
  //   store.dispatch(actionChosePage(firstPage));
  // }
  const pages=await store.getState().project.project!.getPages();
  await curRender.renderPages(pages);
  fitToPage();
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
        curRender.resizeRender();
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

