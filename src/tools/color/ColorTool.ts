 import { IPoint, IRendererEvent, IPage, Rect, DrawCircleOptions, DrawImageOptions, DrawRectOptions } from "uxele-core";
// import { session } from "../../uxele-faced/build";
import { cropCanvas, scaleCanvas } from "uxele-utils";
import { imgToCanvas, canvasToImg, canvasToImgUrl, color } from "uxele-utils";
import { store, actionColorToolHover, actionColorToolPick, copyColor } from "../../facade";
import { BaseTool } from "../BaseTool";
export type ColorToolEvents = "onPickColor" | "onHoverColor";
export class ColorTool extends BaseTool {
  public name: string = "tool_color_name"
  public slug: string = "tool_color"
  public cls = "fas fa-eye-dropper"
  private hoverColor?: string;
  private inited = false;
  private curPageContext?: {
    page: IPage,
    magImg: HTMLImageElement;
    pageCanvas: HTMLCanvasElement;
  };
  // private colorGroup: fabric.Group = new window.fabric.Group(undefined, {
  //   selectable: false,
  //   shadow: "0px 0px 20px rgba(0,0,0,0.4)"
  // });
  private colorGroup?: never;
  onMouseDown = (e: IRendererEvent | undefined) => {
    if (this.hoverColor) {
      store.dispatch(actionColorToolPick(this.hoverColor));
      copyColor(this.hoverColor);
    }
  }
  // private zoomImg(img: ImageData, zoom: number) {
  //   const newData = new Uint8ClampedArray(img.data.length * Math.pow(zoom, 2));
  //   const owidth = img.width;
  //   const oheight = img.height;
  //   const nwidth = img.width * zoom;
  //   const nheight = img.height * zoom;
  //   for (let i = 0; i < img.data.length; i += 4) {
  //     const r = img.data[i];
  //     const g = img.data[i + 1];
  //     const b = img.data[i + 2];
  //     const a = img.data[i + 3];
  //     const pixel=Math.floor(i/4);
  //     const col = pixel % owidth;
  //     const row = Math.floor(pixel / owidth);
  //     const drow = row * zoom;
  //     const dcol = col * zoom;
  //     const p = drow * nwidth + dcol;
  //     for (let j = 0; j < zoom; j++) {
  //       for (let k = 0; k < zoom; k++) {
  //         const pixelP = p + j * nwidth + k * 4;
  //         newData[pixelP] = r;
  //         newData[pixelP + 1] = g;
  //         newData[pixelP + 2] = b;
  //         newData[pixelP + 3] = a;
  //       }
  //     }
  //   }
  //   return new ImageData(newData, nwidth, nheight);
  // }
  onMouseMove = async (e: IRendererEvent | undefined) => {
    if (e) {
      const realCoords = this.renderer.rendererPointToRealPoint(this.renderer.mouseEventToCoords(e), false);
      const curPage = this.renderer.pageByRealCoords(realCoords);
      if (curPage) {
        if (this.curPageContext && this.curPageContext.page !== curPage) {
          this.curPageContext = undefined;
        }
        if (!this.curPageContext) {
          const img = await curPage.getPreview();
          const canvas = imgToCanvas(img);
          // const magCanvas=document.createElement("canvas");
          // magCanvas.width=canvas.width*times;
          // magCanvas.height=canvas.height*times;
          // const ctx2 = magCanvas.getContext("2d")!;
          // ctx2.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,magCanvas.width,magCanvas.height);
          // const magImg=await canvasToImg(magCanvas);
          const magImg = img;
          this.curPageContext = {
            page: curPage,
            magImg,
            pageCanvas: canvas
          }
        }
        const coords = this.renderer.realPointToPagePoint(realCoords, curPage);
        const ctx = this.curPageContext.pageCanvas.getContext("2d")!;
        const imageData = ctx.getImageData(coords.x, coords.y, 1, 1);
        this.drawColor(imageData.data[0], imageData.data[1], imageData.data[2], coords, curPage);
        this.hoverColor = `rgb(${imageData.data[0]}, ${imageData.data[1]},${imageData.data[2]})`;
        store.dispatch(actionColorToolHover(this.hoverColor));
      } else {
        this.hoverColor = undefined;
        // this.renderer.clearDrawing(this.colorGroup);
      }
    }




  }
  colorBand: any;
  roundEdge: any;
  magImg: any;
  magCursor: any;
  async drawColor(r: number, g: number, b: number, coords: IPoint, page: IPage) {
    const magRadius = 120;
    const colorBandSize = 20;
    const roundEdgeSize = 3;
    const shift = 0;
    const magShift = shift + colorBandSize + roundEdgeSize;
    const roundEdgeShift = shift + colorBandSize;
    const colorBandRadius = magRadius + roundEdgeSize + colorBandSize;
    const roundEdgeRadius = magRadius + roundEdgeSize;
    const padding = 5;
    const outerPadding = 15;
    const zoomTime = 8
    // console.log(coords);
    // const resize=new window.fabric.Image.filters.Resize();
    const fullImg = this.curPageContext!.magImg;
    const cropped = await canvasToImg(scaleCanvas(cropCanvas(this.curPageContext!.pageCanvas, new Rect(
      Math.ceil(coords.x - magRadius / zoomTime),
      Math.ceil(coords.y - magRadius / zoomTime),
      Math.ceil(coords.x + magRadius / zoomTime),
      Math.ceil(coords.y + magRadius / zoomTime)
    )), zoomTime, false));

    const realCoords = this.renderer.pagePointToRealPoint(coords, page);
    const coordLeft = realCoords.x * this.renderer.zoom();
    const coordTop = realCoords.y * this.renderer.zoom()
    // this.renderer.clearDrawing(this.colorGroup);
    const clip = {
      circle: {
        radius: magRadius,
        left: coordLeft + magShift,
        top: coordTop + magShift,
      }
    }
    if (!this.inited) {
      this.colorBand = this.renderer.draw({
        radius: colorBandRadius,
        left: coordLeft + shift,
        top: coordTop + shift,
        fillColor: `rgb(${r},${g},${b})`
      } as DrawCircleOptions, this.colorGroup)
      this.roundEdge = this.renderer.draw({
        radius: roundEdgeRadius,
        left: coordLeft + roundEdgeShift,
        top: coordTop + roundEdgeShift,
        fillColor: "#d1d1d1"
      } as DrawCircleOptions, this.colorGroup);
      this.magImg = this.renderer.draw({
        img: cropped,
        left: coordLeft + magShift,
        top: coordTop + magShift,
        clip
      } as DrawImageOptions, this.colorGroup);
      this.magCursor = this.renderer.draw({
        left: coordLeft + magShift + magRadius - zoomTime,
        top: coordTop + magShift + magRadius - zoomTime,
        width: zoomTime * 2,
        height: zoomTime * 2,
        strokeWidth: 1,
        fillColor: "transparent"
      } as DrawRectOptions, this.colorGroup);
      this.inited = true;
    } else {
      this.renderer.updateDraw(this.colorBand, {
        radius: colorBandRadius,
        left: coordLeft + shift,
        top: coordTop + shift,
        fillColor: `rgb(${r},${g},${b})`
      } as DrawCircleOptions);

      this.renderer.updateDraw(this.roundEdge, {
        radius: roundEdgeRadius,
        left: coordLeft + roundEdgeShift,
        top: coordTop + roundEdgeShift,
        fillColor: "#d1d1d1"
      } as DrawCircleOptions);
      this.renderer.updateDraw(this.magImg, {
        img: cropped,
        left: coordLeft + magShift,
        top: coordTop + magShift,
        clip
      } as DrawImageOptions);
      this.renderer.updateDraw(this.magCursor, {
        left: coordLeft + magShift + magRadius - zoomTime,
        top: coordTop + magShift + magRadius - zoomTime,
        width: zoomTime * 2,
        height: zoomTime * 2,
        strokeWidth: 1,
        fillColor: "transparent"
      } as DrawRectOptions);
    }



    // this.renderer.drawRect({
    //   left: coordLeft + magShift,
    //   top: coordTop + magShift + magRadius * 7 / 5,
    //   width: magRadius * 2,
    //   height: magRadius * 3 / 5,
    //   strokeColor: "transparent",
    //   fillColor: `rgb(${r},${g},${b})`,
    //   clip
    // }, this.colorGroup);
    // const hex = color.rgbToHex(r, g, b).toUpperCase();
    // const textOptions = {
    //   fillColor: "white",
    //   fontSize: 24,
    //   fontWeight: "bold"
    // }
    // const measure = this.renderer.measureText(hex, textOptions);
    // this.renderer.drawText(hex, {
    //   left: coordLeft + magShift + magRadius - measure.width / 2,
    //   top: coordTop + magShift + magRadius * 8/ 5,
    //   ...textOptions
    // }, this.colorGroup)

    // const img = new window.fabric.Image(fullImg, {
    //   originX: "left",
    //   originY: "top",
    //   left: -coords.x * zoomTime,
    //   top: -coords.y * zoomTime,
    //   scaleX: zoomTime,
    //   scaleY: zoomTime,
    //   clipTo: (ctx: CanvasRenderingContext2D) => {
    //     // ctx.arc((coords.x-fullImg.naturalWidth/2), (coords.y-fullImg.naturalHeight/2), radius, 0, Math.PI * 2, true);
    //     ctx.arc((coords.x - fullImg.naturalWidth / 2), (coords.y - fullImg.naturalHeight / 2), radius / zoomTime, 0, Math.PI * 2, true);
    //   }
    // });

    // const rect = new window.fabric.Rect({
    //   originX: "center",
    //   originY: "center",
    //   strokeWidth: 1,
    //   stroke: "black",
    //   fill: "transparent",
    //   width: 10,
    //   height: 10,
    //   left: 0,
    //   top: 0,
    // });
    // // const circle=new window.fabric.Circle({
    // //   originX:"left",
    // //   originY:"top",
    // //   left:coords.x+padding,
    // //   top:coords.y+padding,
    // //   radius,
    // //   fill:`rgb(${r},${g},${b})`
    // // });
    // const circleBg = new window.fabric.Circle({
    //   originX: "center",
    //   originY: "center",
    //   left: 0,
    //   top: 0,
    //   radius: radius + padding,
    //   fill: `#d1d1d1`
    // })

    // const circleBgOut = new window.fabric.Circle({
    //   originX: "left",
    //   originY: "top",
    //   left: coords.x * this.renderer.zoom(),
    //   top: coords.y * this.renderer.zoom(),
    //   radius: radius + padding + outerPadding,
    //   fill: `rgb(${r},${g},${b})`,
    //   clipTo: (ctx: CanvasRenderingContext2D) => {
    //     ctx.arc(0, 0, radius + padding + outerPadding, 1 / 2 * Math.PI, -1 / 2 * Math.PI, true);
    //   }
    // })
    // this.colorGroup.addWithUpdate(circleBgOut);
    // this.colorGroup.add(circleBg);
    // this.colorGroup.add(img);
    // this.colorGroup.add(rect);
    // this.renderer.draw(this.colorGroup);
  }
  // onMouseUpAndLeave = (e: IRendererEvent | undefined) => {
  //   this.mouseDown = false;
  //   this.lastPoint = undefined;
  // }
  protected async bindRenderer(): Promise<void> {
    const renderer = this.renderer!;
    // renderer.on("mousedown", this.onMouseDown);
    this.colorGroup = renderer.getDrawableGroup();
    renderer.on("mousemove", this.onMouseMove);
    renderer.on("click", this.onMouseDown);
  }
  protected async unbindRenderer(): Promise<void> {
    const renderer = this.renderer!;
    renderer.off("click", this.onMouseDown);
    renderer.off("mousemove", this.onMouseMove);
    renderer.removeDrawableGroup(this.colorGroup);
    this.curPageContext = undefined;
  }

}
