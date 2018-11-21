import { IRendererEvent, ILayer } from "uxele-core";
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
  private measureLinesGroup: fabric.Group = new window.fabric.Group(undefined, {
    originX: "left",
    originY: "top",
    selectable: false,
    objectCaching: false
  })
  private hoverLabelGroup: LayerLabelGroup = new LayerLabelGroup({
    // left:0,
    // top:0,
    strokeWidth: 1,
    textBackgroundColor: hoverColor,
    fontSize: 14,
    fill: "white",

  }, {
      stroke: hoverColor,
      fill: hoverColor.replace("1)", "0.2)")
    })
  private firstChoseGroup: LayerLabelGroup = new LayerLabelGroup({
    // left:0,
    // top:0,
    strokeWidth: 1,
    textBackgroundColor: choseColor,
    fontSize: 14,
    fill: "white",

  }, {
      stroke: choseColor,
      fill: choseColor.replace("1)", "0.2)")
    })
  onMouseDown = (e: IRendererEvent | undefined) => {
    if (this.hoverLayer) {
      if (this.hoverLayer !== this.firstChoseLayer) {
        this.firstChoseLayer = this.hoverLayer;
        this.drawFirstChoseLayer();
        store.dispatch(actionChoseLayer(this.hoverLayer!));
        // session.set("choseLayer", this.firstChoseLayer);
        this.prepareDrawMeasure();
      }
    }
  }
  onMouseMove = async (e: IRendererEvent | undefined) => {
    // const curPage = session.get("curPage");
    const curPage = store.getState().chosePage.page;
    if (curPage && e) {
      const coords = this.renderer.rendererPointToRealPoint(this.renderer.mouseEventToCoords(e), false);
      if (coords.x < 0 || coords.y < 0) {
        this.hoverLayer = undefined;
        this.drawHoverLayer();
        this.prepareDrawMeasure();
      } else {
        const l = await bestLayerByCoords(coords, await curPage.getLayers());

        if (this.hoverLayer !== l) {
          this.hoverLayer = l;
          this.drawHoverLayer();
          this.prepareDrawMeasure();
        }
      }


    }
  }
  private prepareDrawMeasure() {
    this.renderer.clearDrawing(this.measureLinesGroup);
    if (this.firstChoseLayer && this.firstChoseLayer !== this.hoverLayer) {
      this.measureLinesGroup.remove(...this.measureLinesGroup.getObjects());

      if (this.hoverLayer) {
        this.drawMeasurement(this.firstChoseLayer, this.hoverLayer);
        this.renderer.draw(this.measureLinesGroup);
      } else {
        this.renderer.clearDrawing(this.measureLinesGroup);
      }

    }
  }
  private drawMeasurement(l1: ILayer, l2: ILayer) {
    const rect1 = l1.rect.zoom(this.renderer.zoom());
    const rect2 = l2.rect.zoom(this.renderer.zoom());
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
  private drawLineOnFabric(points: number[], options: fabric.IObjectOptions) {
    // const def = {
    //   strokeWidth: 1 / this.session.drawer.zoom
    // } as fabric.IObjectOptions;
    // const cfg = assign({}, def, opt);
    const line = new window.fabric.Line(points, options);
    this.measureLinesGroup.addWithUpdate(line);
  }
  private drawLabelOnFabric(txt: string, opt: fabric.ITextOptions) {
    const def: fabric.ITextOptions = {
      textBackgroundColor: "black",
      shadow: "2px 2px 10px rgba(0,0,0,0.2)",
      fill: "white",
      fontSize: 14,
      strokeWidth: 1,
      fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif',
      ...opt
    };
    const t = new window.fabric.Text(`  ${txt}  `, def);
    this.measureLinesGroup.addWithUpdate(t);
  }
  drawVLineMeasurements(x1: number, t1: number, b1: number, x2: number, t2: number, b2: number, swap: boolean, text: string) {
    const color = "orange";
    const defDashLine: fabric.IObjectOptions = {
      stroke: color,
      strokeDashArray: [5, 5],
      strokeWidth: 1
    }
    const defLine: fabric.IObjectOptions = {
      stroke: color,
      strokeWidth: 1
    }
    let t = Math.min(t1, b1, t2, b2);
    let b = Math.max(t1, b1, t2, b2);
    if (x1 === x2) {
      // this.
      this.drawLineOnFabric([x1, t, x1, b], defDashLine);
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
      this.drawLineOnFabric([x1, t1, x1, t2], defDashLine);
    }
    if (b1 < t2) {
      this.drawLineOnFabric([x1, b1, x1, b2], defDashLine);
    }
    const rg = getIntersect(t1, b1, t2, b2);
    let ay = 0;
    if (rg) {
      ay = Math.round((rg.s + rg.e) / 2);
    } else {
      ay = Math.round((t2 + b2) / 2);
    }
    this.drawLineOnFabric([x1, ay, x2, ay], defLine);
    this.drawLabelOnFabric(text, {
      originX: "center",
      originY: "center",
      left: (x1 + x2) / 2,
      top: ay
    })
    // draw.drawLable(this.canvas, tx, ty, text, size, "white", "rgba(0,0,0,0.8)");
  }
  drawHLineMeasurements(y1: number, l1: number, r1: number, y2: number, l2: number, r2: number, swap: boolean, text: string) {
    const color = "orange";
    const defDashLine: fabric.IObjectOptions = {
      stroke: color,
      strokeDashArray: [5, 5],
    }
    const defLine: fabric.IObjectOptions = {
      stroke: color,
    }

    let l = Math.min(l1, r1, l2, r2);
    let r = Math.max(l1, r1, l2, r2);
    if (y1 === y2) {
      this.drawLineOnFabric([y1, l, y1, r], defDashLine);
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
      this.drawLineOnFabric([l1, y1, l2, y1], defDashLine);
    }
    if (r1 < l2) {
      this.drawLineOnFabric([r1, y1, r2, y1], defDashLine);
    }

    const rg = getIntersect(l1, r1, l2, r2);
    let ax = 0;
    if (rg) {
      ax = Math.round((rg.s + rg.e) / 2);
    } else {
      ax = Math.round((l2 + r2) / 2);
    }
    this.drawLineOnFabric([ax, y1, ax, y2], defLine);
    this.drawLabelOnFabric(text, {
      originX: "center",
      originY: "center",
      left: ax,
      top: (y1 + y2) / 2
    })
  }
  private drawLayer(layerGroup: LayerLabelGroup, l?: ILayer) {
    if (l) {
      layerGroup.setLayer(l, this.renderer.zoom());
      this.renderer.draw(layerGroup.getGroup());

    } else {
      this.renderer.clearDrawing(layerGroup.getGroup());
    }
  }
  private drawFirstChoseLayer() {
    this.drawLayer(this.firstChoseGroup, this.firstChoseLayer);
  }
  private drawHoverLayer() {
    this.drawLayer(this.hoverLabelGroup, this.hoverLayer);
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
    renderer.clearDrawing(this.hoverLabelGroup.getGroup());
    renderer.clearDrawing(this.firstChoseGroup.getGroup());
    renderer.clearDrawing(this.measureLinesGroup);
    store.dispatch(actionChoseLayer());
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

}

class LayerLabelGroup {
  private label: fabric.Text;
  private rect: fabric.Rect = new window.fabric.Rect();
  private item: fabric.Group;
  getGroup(): fabric.Group {
    return this.item;
  }
  constructor(private labelStyle?: fabric.ITextOptions, private rectStyle?: fabric.IRectOptions) {
    this.label = new window.fabric.Text("", {
      fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif',
      objectCaching: false,
      ...labelStyle
    });
    this.label.fontFamily = '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif';
    // this.label.originX = "left";
    // this.label.originY = "top";

    // this.label.setPositionByOrigin(new window.fabric.Point(0,0),"left","top");
    this.rect = new window.fabric.Rect({
      objectCaching: false,

      ...rectStyle
    });
    // this.rect.originX = "left";
    // this.rect.originY = "top";
    this.item = new window.fabric.Group([this.rect, this.label], {
      selectable: false,
      // originX:"left",
      // originY:"top"
    });
    // this.item.originX="left";
    // this.item.originY="top";
  }
  private genLabel(targetLayer: ILayer, zoom: number) {
    if (this.label) {
      this.item.remove(this.label);

    }
    this.label = new window.fabric.Text("", {
      text: `  ${targetLayer.rect.width} x ${targetLayer.rect.height}    `,
      left: targetLayer.rect.left * zoom,
      top: targetLayer.rect.top * zoom,
      fontFamily: '"Lato",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue","Helvetica","Arial",sans-serif',
      ...this.labelStyle
    });
    this.item.addWithUpdate(this.label);
  }
  private genRect(targetLayer: ILayer, zoom: number) {
    if (this.rect) {
      this.item.remove(this.rect);
    }
    this.rect = new window.fabric.Rect({
      left: targetLayer.rect.left * zoom,
      top: targetLayer.rect.top * zoom,
      width: targetLayer.rect.width * zoom,
      height: targetLayer.rect.height * zoom,
      objectCaching: false,
      ...this.rectStyle
    });
    this.item.addWithUpdate(this.rect);
  }
  setLayer(targetLayer: ILayer, zoom: number) {
    this.genRect(targetLayer, zoom);
    this.genLabel(targetLayer, zoom);
    // this.label.text = `  ${targetLayer.rect.width} x ${targetLayer.rect.height}    `;
    // this.item.width = Math.round(Math.max(targetLayer.rect.width,this.label.width || 0));
    // this.item.height =Math.round(Math.max(targetLayer.rect.height,this.label.height || 0));
    // this.rect.left=Math.round(-this.item.width/2);
    // this.rect.top=Math.round(-this.item.height/2);
    // this.rect.width=Math.round(targetLayer.rect.width);
    // this.rect.height=Math.round(targetLayer.rect.height);
    // // this.rect.setCoords();
    // this.label.left=this.rect.left;
    // this.label.top=this.rect.top;
    // // this.label.setCoords();
    // this.item.left = targetLayer.rect.left;
    // this.item.top = targetLayer.rect.top;


    // console.log("a ", "with",targ);
    // (this.item as any).addWithUpdate();
    // console.log("b ", "group", this.item.left,this.item.top,"rect",this.rect.left,this.rect.top,"label",this.label.left,this.label.top);
    // console.log(this.rect.left,this.rect.top,this.label.left,this.label.top);
    // this.item.addWithUpdate(this.label);

    // this.item.setCoords();

    // this.item.setObjectsCoords();
    // this.label.setCoords();
    // this.rect.setCoords();
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
