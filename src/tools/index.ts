import { IRenderer } from "uxele-core";
import { store } from "../facade";
import { HandTool } from "./hand";
import { InspectTool } from "./inspect";
import { BaseTool } from "./BaseTool";
import { ColorTool } from "./color";
export * from "./color";
export * from "./hand";
export * from "./inspect";
export * from "./BaseTool";
export function getTools(){return tools;}
export function getToolInst(constructor:Function){
  return tools.find((v)=>{
    if (v instanceof constructor){
      return true;
    }else{
      return false;
    }
  })
}

const tools: BaseTool[] = [
  new HandTool(),
  new InspectTool(),
  new ColorTool()
];
function init() {
  let curRenderer: IRenderer;
  store.subscribe(() => {
    if (store.getState().renderer.renderer !== curRenderer) {
      curRenderer = store.getState().renderer.renderer!;
      tools.forEach((tool: BaseTool) => {
        tool.setRenderer(curRenderer);
      })
    }
  });

}
init();
