import { IRendererEvent } from "uxele-core";
import { BaseTool } from "../BaseTool";
export declare class HandTool extends BaseTool {
    name: string;
    slug: string;
    cls: string;
    private mouseDown;
    private lastPoint?;
    onMouseDown: (e: IRendererEvent | undefined) => void;
    onMouseMove: (e: IRendererEvent | undefined) => void;
    onMouseUpAndLeave: (e: IRendererEvent | undefined) => void;
    protected bindRenderer(): Promise<void>;
    protected unbindRenderer(): Promise<void>;
}
