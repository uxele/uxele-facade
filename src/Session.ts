import { FabricRenderer } from "psdetch-render-fabric";
import { IProject, IPage, BasicEvents, ILayer } from "psdetch-core";
import { HandTool } from "psdetch-tool-hand";
import {InspectTool} from "psdetch-tool-inspect";
import  { ColorTool } from "psdetch-tool-color";
export interface ISessionProps{
  curPage?:IPage;
  curProject?:IProject;
  renderer?:FabricRenderer;
  
  curTool?:ITool;
  choseLayer?:ILayer;
  handtool?:HandTool;
  inspectTool?:InspectTool;
  colorTool?:ColorTool;
}
export interface ITool{
  activate(): void;
  deactivate(): void;
  once(evt:string,handler:any):void;
  activated: boolean;
  name: string;
  slug: string;
}
const props:ISessionProps={};
export class Session extends BasicEvents<keyof ISessionProps, ISessionProps[keyof ISessionProps], (v?: ISessionProps[keyof ISessionProps]) => void>{

  get<T extends keyof ISessionProps>(key: T):ISessionProps[T] {
    return props[key];
  }
  set<T extends keyof ISessionProps>(key: T, val?: ISessionProps[T]){
    if (props[key] === val){
      return;
    }
    props[key]=val;
    this.emit(key,val);
  }
  constructor(){
    super();
    this.once("renderer",(r)=>{
      const renderer=r as FabricRenderer;
      // once renderer exists, register all tools.
      this.bindTools(renderer);
    })
  }
  private bindTools(renderer: FabricRenderer){
    this.set("handtool",new HandTool(renderer));
    this.set("inspectTool",new InspectTool(renderer));
    this.set("colorTool",new ColorTool(renderer));
  }
}

export const session = new Session();