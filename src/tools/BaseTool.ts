// import { BasicEvents } from "./BasicEvents";
// import { CoreProvider } from "./provider";
import { IRenderer } from "uxele-core";
// export type BaseToolEvents = "onActivated" | "onDeactivated";

export abstract class BaseTool {
  public abstract name: string;
  public abstract slug: string;
  public abstract cls:string;
  public activated: boolean = false;
  private _renderer?:IRenderer;
  constructor() {
  }
  get renderer():IRenderer{
    if (this._renderer){
      return this._renderer
    }else{
      throw (new Error("Renderer is not inited"));
    }
  }
  setRenderer(renderer:IRenderer){
    if (this.activated){
      this.deactivate().then(()=>{
        this._renderer=renderer;
        return this.activate();
      });
    }else{
      this._renderer=renderer;
    }
    
  } 

  protected abstract bindRenderer(): Promise<void>;
  protected abstract unbindRenderer(): Promise<void>;
  public activate() {

    // renderer.clearDrawing();
    return this.bindRenderer()
      .then(() => {
        this.activated = true;
      })
  }
  public deactivate() {
    return this.unbindRenderer()
      .then(() => {
        this.activated = false;
      })
  }
}