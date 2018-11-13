import {  IPoint, IRendererEvent } from "uxele-core";
import {store, actionHandToolPanStart, actionHandToolPanEnd} from "../../facade";
import { BaseTool } from "../BaseTool";
// export type HandToolEvents = "onPanStart" | "onPanEnd";
export class HandTool extends BaseTool{
  public name: string = "tool_hand_name";
  public slug: string = "tool_hand";
  public cls="fas fa-hand-paper";
  private mouseDown: boolean = false;
  private lastPoint?: IPoint;
  onMouseDown = (e: IRendererEvent | undefined) => {
    if (e) {
      this.mouseDown = true;
      const evt = e.e as MouseEvent;
      this.lastPoint = {
        x: evt.clientX,
        y: evt.clientY
      }
      store.dispatch(actionHandToolPanStart());
      // this.emit("onPanStart");
    }
  }
  onMouseMove = (e: IRendererEvent | undefined) => {
    if (this.mouseDown && e) {
      const evt: MouseEvent = e.e as MouseEvent;
      const curPoint: IPoint = { x: evt.clientX, y: evt.clientY };
      const renderer = this.renderer!;
      if (this.lastPoint) {
        renderer.panX(renderer.panX() - curPoint.x + this.lastPoint.x)
        renderer.panY(renderer.panY() - curPoint.y + this.lastPoint.y)
      }
      this.lastPoint = curPoint;
    }
  }
  onMouseUpAndLeave = (e: IRendererEvent | undefined) => {
    this.mouseDown = false;
    this.lastPoint = undefined;
    store.dispatch(actionHandToolPanEnd());
  }
  protected async bindRenderer(): Promise<void> {
    const renderer = this.renderer!;
    renderer.on("mousedown", this.onMouseDown);
    renderer.on("mousemove", this.onMouseMove);

    renderer.on("mouseup",this.onMouseUpAndLeave);
    renderer.on("mouseup", this.onMouseUpAndLeave);
  }
  protected async unbindRenderer(): Promise<void> {
    const renderer = this.renderer;
    renderer.off("mousedown", this.onMouseDown);
    renderer.off("mousemove", this.onMouseMove);
    renderer.off("mouseup",this.onMouseUpAndLeave);
    renderer.off("mouseup", this.onMouseUpAndLeave);
  }


}