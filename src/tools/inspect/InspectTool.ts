import { IRendererEvent, ILayer, DrawRectOptions, DrawTextOptions, IPage, DrawLineOptions, IPoint } from "uxele-core";
import { store, actionChoseLayer } from "../../facade";
import { BaseTool } from "../BaseTool";
import { bestLayerByCoords } from "uxele-utils/build/layer";
export type InspectToolEvents = "onHoverLayer" | "onChoseLayer";
const hoverColor = "rgba(0, 68, 37,1)";
const choseColor = "rgba(112,0,0,1)";
export class InspectTool extends BaseTool {
  public name: string = "tool_inspect_name"
  public slug: string = "tool_inspect"
  public cls = "fas fa-mouse-pointer"
  private get storeChoseLayer() {
    return store.getState().choseLayer;
  }
  private hoverLayer?: ILayer;
  private firstChoseLayer?: ILayer;
  private unsubscribe?: () => void;
  private measureLinesGroup: any;
  private hoverLayerGroup: any;
  private choseLayerGroup: any;
  // private measureLinesGroup: fabric.Group = new window.fabric.Group(undefined, {
  //   originX: "left",
  //   originY: "top",
  //   selectable: false,
  //   objectCaching: false
  // })
  // private hoverLabelGroup: LayerLabelGroup = new LayerLabelGroup({
  //   // left:0,
  //   // top:0,
  //   strokeWidth: 1,
  //   textBackgroundColor: hoverColor,
  //   fontSize: 14,
  //   fill: "white",

  // }, {
  //     stroke: hoverColor,
  //     fill: hoverColor.replace("1)", "0.2)")
  //   })
  // private firstChoseGroup: LayerLabelGroup = new LayerLabelGroup({
  //   // left:0,
  //   // top:0,
  //   strokeWidth: 1,
  //   textBackgroundColor: choseColor,
  //   fontSize: 14,
  //   fill: "white",

  // }, {
  //     stroke: choseColor,
  //     fill: choseColor.replace("1)", "0.2)")
  //   })

  onMouseDown = (e: IRendererEvent | undefined) => {
    if (this.hoverLayer !== this.firstChoseLayer) {
      this.firstChoseLayer = this.hoverLayer;
      this.drawFirstChoseLayer();
      store.dispatch(actionChoseLayer(this.hoverLayer!));
      // session.set("choseLayer", this.firstChoseLayer);
    }
  }
  onMouseMove = async (e: IRendererEvent | undefined) => {
    // const curPage = session.get("curPage");
    // const curPage = store.getState().chosePage.page;
    if (e) {
      const realCoords = this.renderer.rendererPointToRealPoint(this.renderer.mouseEventToCoords(e), false);
      const curPage = this.renderer.pageByRealCoords(realCoords)

      if (!curPage) {
        this.renderer.clearDrawing(this.hoverLayerGroup);
        this.renderer.clearDrawing(this.measureLinesGroup);
        this.hoverLayer = undefined;
      } else {
        const pageCoords = this.renderer.realPointToPagePoint(realCoords, curPage);
        const l = await bestLayerByCoords(pageCoords, await curPage.getLayers());

        if (this.hoverLayer !== l) {
          this.renderer.clearDrawing(this.hoverLayerGroup);
          this.renderer.clearDrawing(this.measureLinesGroup);
          this.hoverLayer = l;
          this.drawHoverLayer();
          this.prepareDrawMeasure();
        }
      }
    }
  }
  private prepareDrawMeasure() {
    if (this.firstChoseLayer && this.hoverLayer &&
      this.firstChoseLayer !== this.hoverLayer &&
      this.firstChoseLayer.page === this.hoverLayer.page) {
      // this.measureLinesGroup.remove(...this.measureLinesGroup.getObjects());
      this.drawMeasurement(this.firstChoseLayer, this.hoverLayer);
    }
  }
  private drawMeasurement(l1: ILayer, l2: ILayer) {
    const rect1 = l1.rect.panTo(this.renderer.pagePointToRealPoint(l1.rect.leftTop, l1.page)).zoom(this.renderer.zoom());
    const rect2 = l2.rect.panTo(this.renderer.pagePointToRealPoint(l2.rect.leftTop, l1.page)).zoom(this.renderer.zoom());
    // const coord1 = this.fileRectToCanvasRect(rect1);
    // const coord2 = this.fileRectToCanvasRect(rect2);
    const measure = rect1.distance(rect2);
    for (const key in measure) {
      if (measure.hasOwnProperty(key)) {
        const val = measure[key];
        if (val === 0) {
          continue;
        }
        const v1 = key[0];
        const v2 = key[1];
        // var length = Math.round(val / this.canvasParams.scale);
        // TODO get current canvas scale from session
        const length = Math.round(val);
        switch (v1) {
          case "l":
          case "r":
            this.drawVLineMeasurements(
              v1 === 'l' ? rect1.left : rect1.right,
              rect1.top,
              rect1.bottom,
              v2 === 'l' ? rect2.left : rect2.right,
              rect2.top,
              rect2.bottom,
              rect1.left > rect2.left,
              length.toString()
            );
            break;
          case "t":
          case "b":
            this.drawHLineMeasurements(
              v1 === 't' ? rect1.top : rect1.bottom,
              rect1.left,
              rect1.right,
              v2 === 't' ? rect2.top : rect2.bottom,
              rect2.left,
              rect2.right,
              rect1.top > rect2.top,
              length.toString()
            );
            break;
        }
      }

    }
  }
  private drawMeasureLineOnRenderer(point1: IPoint, point2: IPoint, options: Partial<DrawLineOptions>) {
    // const def = {
    //   strokeWidth: 1 / this.session.drawer.zoom
    // } as fabric.IObjectOptions;
    // const cfg = assign({}, def, opt);
    this.renderer.draw({
      ...options,
      x1: point1.x,
      y1: point1.y,
      x2: point2.x,
      y2: point2.y
    } as DrawLineOptions, this.measureLinesGroup);
  }
  private drawMeasureLabelOnRenderer(opt: DrawTextOptions) {
    // const def: fabric.ITextOptions = {
    //   textBackgroundColor: "black",
    //   shadow: "2px 2px 10px rgba(0,0,0,0.2)",
    //   fill: "white",
    //   fontSize: 14,
    //   strokeWidth: 1,
    //   fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif',
    //   ...opt
    // };
    // const t = new window.fabric.Text(`  ${txt}  `, def);
    opt = {
      ...opt,
      textBackgroundFill: "black",
      fillColor: "white",
      fontSize: 14,
      fontWeight: "bold"
    }
    this.renderer.draw(opt, this.measureLinesGroup);
    // this.measureLinesGroup.addWithUpdate(t);
  }
  drawVLineMeasurements(x1: number, t1: number, b1: number, x2: number, t2: number, b2: number, swap: boolean, text: string) {
    const color = "orange";
    const defDashLine: Partial<DrawLineOptions> = {
      strokeColor: color,
      strokeDashArray: "5 5",
      strokeWidth: 1
    }
    const defLine: Partial<DrawLineOptions> = {
      strokeColor: color,
      strokeWidth: 1
    }
    let t = Math.min(t1, b1, t2, b2);
    let b = Math.max(t1, b1, t2, b2);
    if (x1 === x2) {
      // this.

      this.drawMeasureLineOnRenderer({ x: x1, y: t }, { x: x1, y: b }, defDashLine);
      return;
    }
    if (swap) {
      const x = x2;
      x2 = x1;
      x1 = x;
      t = t2;
      t2 = t1;
      t1 = t;
      b = b2;
      b2 = b1;
      b1 = b;
    }
    // x1 = ses.adjustXToCanvas(x1);
    // x2 = ses.adjustXToCanvas(x2);
    // t1 = ses.adjustYToCanvas(t1);
    // t2 = ses.adjustYToCanvas(t2);
    // b1 = ses.adjustYToCanvas(b1);
    // b2 = ses.adjustYToCanvas(b2);
    if (t1 > b2) {
      this.drawMeasureLineOnRenderer({ x: x1, y: t1 }, { x: x1, y: t2 }, defDashLine);
    }
    if (b1 < t2) {
      this.drawMeasureLineOnRenderer({ x: x1, y: b1 }, { x: x1, y: b2 }, defDashLine);
    }
    const rg = getIntersect(t1, b1, t2, b2);
    let ay = 0;
    if (rg) {
      ay = Math.round((rg.s + rg.e) / 2);
    } else {
      ay = Math.round((t2 + b2) / 2);
    }
    this.drawMeasureLineOnRenderer({ x: x1, y: ay }, { x: x2, y: ay }, defLine);
    this.drawMeasureLabelOnRenderer({
      left: (x1 + x2) / 2,
      top: ay,
      txt: text
    })
    // draw.drawLable(this.canvas, tx, ty, text, size, "white", "rgba(0,0,0,0.8)");
  }
  drawHLineMeasurements(y1: number, l1: number, r1: number, y2: number, l2: number, r2: number, swap: boolean, text: string) {
    const color = "orange";
    const defDashLine: Partial<DrawLineOptions> = {
      strokeColor: color,
      strokeDashArray: "5 5",
      strokeWidth: 1
    }
    const defLine: Partial<DrawLineOptions> = {
      strokeColor: color,
      strokeWidth: 1
    }

    let l = Math.min(l1, r1, l2, r2);
    let r = Math.max(l1, r1, l2, r2);
    if (y1 === y2) {
      this.drawMeasureLineOnRenderer({ x: y1, y: l }, { x: y1, y: r }, defDashLine);
      return;
    }
    if (swap) {
      const y = y2;
      y2 = y1;
      y1 = y;
      l = l2;
      l2 = l1;
      l1 = l;
      r = r2;
      r2 = r1;
      r1 = r;
    }
    // y1 = ses.adjustYToCanvas(y1);
    // y2 = ses.adjustYToCanvas(y2);
    // l1 = ses.adjustXToCanvas(l1);
    // l2 = ses.adjustXToCanvas(l2);
    // r1 = ses.adjustXToCanvas(r1);
    // r2 = ses.adjustXToCanvas(r2);
    if (l1 > r2) {
      this.drawMeasureLineOnRenderer({ x: l1, y: y1 }, { x: l2, y: y1 }, defDashLine);
    }
    if (r1 < l2) {
      this.drawMeasureLineOnRenderer({ x: r1, y: y1 }, { x: r2, y: y1 }, defDashLine);
    }

    const rg = getIntersect(l1, r1, l2, r2);
    let ax = 0;
    if (rg) {
      ax = Math.round((rg.s + rg.e) / 2);
    } else {
      ax = Math.round((l2 + r2) / 2);
    }
    this.drawMeasureLineOnRenderer({ x: ax, y: y1 }, { x: ax, y: y2 }, defLine);
    this.drawMeasureLabelOnRenderer({
      left: ax,
      top: (y1 + y2) / 2,
      txt: text
    })
  }
  private drawLayer(layerGroup: any, l?: DrawLayerOption) {

    if (l) {
      // layerGroup.setLayer(l, this.renderer.zoom());
      // this.renderer.draw(layerGroup.getGroup());
      const { layer, rect, txt } = l;
      const page = l.layer.page;
      const zoom = this.renderer.zoom();
      const realCoords = this.renderer.pagePointToRealPoint({ x: layer.rect.left, y: layer.rect.top }, page);
      const labelTxt = `  ${layer.rect.width} x ${layer.rect.height}    `;
      const rectOption: DrawRectOptions = {
        ...rect,
        left: realCoords.x * zoom,
        top: realCoords.y * zoom,
        width: layer.rect.width * zoom,
        height: layer.rect.height * zoom,
      };

      const txtOption: DrawTextOptions = {
        ...l.txt,
        fontWeight: "bold",
        left: realCoords.x * zoom,
        top: realCoords.y * zoom,
        textBackgroundFill: rect.strokeColor, 
        txt:labelTxt
      };
      this.renderer.draw(rectOption, layerGroup);
      this.renderer.draw(txtOption, layerGroup);
    } else {
      this.renderer.clearDrawing(layerGroup);
    }
  }
  private drawFirstChoseLayer() {
    this.drawLayer(this.choseLayerGroup);
    if (this.firstChoseLayer) {
      this.drawLayer(this.choseLayerGroup, {
        layer: this.firstChoseLayer,
        rect: {
          fillColor: choseColor.replace("1)", "0.2)"),
          strokeColor: choseColor,
        },
        txt: {
          // textBackgroundColor: hoverColor,
          fontSize: 14,
          fillColor: "white"
        }
      })
    }
  }
  private drawHoverLayer() {

    this.drawLayer(this.hoverLayerGroup);
    if (this.hoverLayer) {
      this.drawLayer(this.hoverLayerGroup, {
        layer: this.hoverLayer,
        rect: {
          fillColor: hoverColor.replace("1)", "0.2)"),
          strokeColor: hoverColor
        },
        txt: {
          // textBackgroundColor: hoverColor,
          fontSize: 14,
          fillColor: "white"
        }
      })
    }
  }
  // onMouseUpAndLeave = (e: IRendererEvent | undefined) => {
  //   this.mouseDown = false;
  //   this.lastPoint = undefined;
  // }
  protected async bindRenderer(): Promise<void> {
    const renderer = this.renderer;
    // renderer.on("mousedown", this.onMouseDown);
    renderer.on("mousemove", this.onMouseMove);
    renderer.on("click", this.onMouseDown);
    this.hoverLayerGroup = renderer.getDrawableGroup();
    this.choseLayerGroup = renderer.getDrawableGroup();
    this.measureLinesGroup = renderer.getDrawableGroup();
    this.unsubscribe = store.subscribe(() => {
      if (this.storeChoseLayer !== this.firstChoseLayer) {
        this.firstChoseLayer = this.storeChoseLayer.layer;
        this.drawFirstChoseLayer();
        this.prepareDrawMeasure();
      }
    })
  }
  protected async unbindRenderer(): Promise<void> {
    const renderer = this.renderer;
    renderer.off("click", this.onMouseDown);
    renderer.off("mousemove", this.onMouseMove);
    renderer.removeDrawableGroup(this.hoverLayerGroup);
    renderer.removeDrawableGroup(this.choseLayerGroup);
    renderer.removeDrawableGroup(this.measureLinesGroup);
    this.hoverLayerGroup=undefined;
    this.choseLayerGroup=undefined;
    this.measureLinesGroup=undefined;
    store.dispatch(actionChoseLayer());
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

}

function getIntersect(s1: number, e1: number, s2: number, e2: number) {
  const maxS = Math.max(s1, s2);
  const minE = Math.min(e1, e2);
  if (minE >= maxS) { // intersected
    return {
      s: maxS,
      e: minE
    }
  } else {
    return null;
  }
}
interface DrawLayerOption {
  layer: ILayer;
  rect: Partial<DrawRectOptions>;
  txt: Partial<DrawTextOptions>;
}