import { IRenderer } from "uxele-core";
import { store, actionChoseTool } from "../facade";
import { HandTool } from "./hand";
import { InspectTool } from "./inspect";
import { BaseTool } from "./BaseTool";
import { ColorTool } from "./color";
export * from "./color";
export * from "./hand";
export * from "./inspect";
export * from "./BaseTool";
// export function getTools() { return allTools; }
export function getToolInst(constructor: Function) {
  return allTools().find((v) => {
    if (v instanceof constructor) {
      return true;
    } else {
      return false;
    }
  })
}

function allTools(): BaseTool[] {
  let rtn: BaseTool[] = [];
  Object.keys(tools).forEach((key) => {
    rtn = rtn.concat(tools[key as ToolCat]);
  })
  return rtn;
}
type ToolCat = "inspect" | "prototype" | "general";
export const tools: {
  [key in ToolCat]: BaseTool[]
} = {
  "inspect": [
    new InspectTool(),
    new ColorTool()
  ],
  "general": [
    new HandTool()
  ],
  "prototype": []
}
function init() {
  let curRenderer: IRenderer;
  store.subscribe(() => {
    if (store.getState().renderer.renderer !== curRenderer) {
      curRenderer = store.getState().renderer.renderer!;
      allTools().forEach((tool: BaseTool) => {
        tool.setRenderer(curRenderer);
      })
      tools.general[0].activate();
    }
  });
}
export async function setActiveTool(tool?: BaseTool) {
  const currentTool = store.getState().choseTool.tool;
  if (currentTool !== tool) {
    if (currentTool) {
      await currentTool.deactivate();
    }
    if (tool) {
      await tool.activate();
    }
    store.dispatch(actionChoseTool(tool));
  } else {
    if (currentTool) {
      setActiveTool();
    }

  }

}
export async function toggleTool(tool: BaseTool) {
  if (!tool.activated) {
    await tool.activate()
  } else {
    await tool.deactivate()
  }
}
init();
