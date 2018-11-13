import { BaseTool } from "./BaseTool";
export * from "./color";
export * from "./hand";
export * from "./inspect";
export * from "./BaseTool";
export declare function getTools(): BaseTool[];
export declare function getToolInst(constructor: Function): BaseTool | undefined;
