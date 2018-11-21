import { store } from ".";
import { actionCanvasStatusZoomLevel } from "./states/CanvasState";
import { IPoint } from "uxele-core/build";
/**
 * Control canvas behaviour e.g. zoomIn zoomOut fitPage etc
 */

const zoomScales = [0.1, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4];
export function zoomIn() {
  const curZoom = getZoom();
  setZoom(getNextScale(curZoom));
}
/**
 * Move canvas to center to a point
 * @param fileCoords The coords of point to center on. the coords are relative to design page.
 */
export function centerTo(fileCoords: IPoint) {
  const render = store.getState().renderer.renderer;
  if (render) {
    const mid = { x: render.renderWidth / 2, y: render.renderHeight / 2 };
    const target = {
      x: fileCoords.x * getZoom() - mid.x,
      y: fileCoords.y * getZoom() - mid.y
    }
    render.panX(target.x);
    render.panY(target.y);
  }
}
/**
 * Set zoom level of canvas with origin from center.
 */
export function setZoom(level: number) {
  const render = store.getState().renderer.renderer;
  if (render) {
    const curCenterCoords = render.rendererPointToRealPoint({
      x: render.renderWidth / 2,
      y: render.renderHeight / 2
    });
    render.zoom(level);
    store.dispatch(actionCanvasStatusZoomLevel(level));
    centerTo(curCenterCoords);
  }
}
export function zoomOut() {
  const curZoom = getZoom();
  setZoom(getPrevScale(curZoom));
}
export function getZoom() {
  const render = store.getState().renderer.renderer;
  if (render) {
    return render.zoom();
  } else {
    return 1;
  }
}

export function fitToPage() {
  const page = store.getState().chosePage.page;
  if (page) {
    const render = store.getState().renderer.renderer!;
    const zoom = getPrevScale(Math.round(1 / Math.max(page.width / render.renderWidth, page.height / render.renderHeight, 1) * 100) / 100);
    centerTo({
      x: page.width / 2,
      y: page.height / 2
    });

    // const width = page.width * zoom;
    // const height = page.height * zoom;
    // const panX = -(render.renderWidth - width) / 2;
    // const panY = -(render.renderHeight - height) / 2;
    // render.panX(panX);
    // render.panY(panY);
    setZoom(zoom);
  }
}

function getNextScale(level: number) {
  return zoomScales.find((scale) => scale > level) || zoomScales[zoomScales.length - 1];
}
function getPrevScale(level: number) {
  return zoomScales.concat().reverse().find((scale) => scale < level) || zoomScales[0];
}