import { BaseTool } from "./BaseTool";
export * from "./color";
export * from "./hand";
export * from "./inspect";
export * from "./BaseTool";
export declare function getToolInst(constructor: Function): BaseTool | undefined;
declare type ToolCat = "inspect" | "prototype" | "general";
export declare const tools: {
    [key in ToolCat]: BaseTool[];
};
export declare function setActiveTool(tool?: BaseTool): Promise<void>;
export declare function toggleTool(tool: BaseTool): Promise<void>;
