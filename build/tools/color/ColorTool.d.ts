import { IPoint, IRendererEvent } from "uxele-core";
import { BaseTool } from "../BaseTool";
export declare type ColorToolEvents = "onPickColor" | "onHoverColor";
export declare class ColorTool extends BaseTool {
    name: string;
    slug: string;
    cls: string;
    private hoverColor?;
    private curPageContext?;
    private colorGroup;
    onMouseDown: (e: IRendererEvent | undefined) => void;
    onMouseMove: (e: IRendererEvent | undefined) => Promise<void>;
    drawColor(r: number, g: number, b: number, coords: IPoint): Promise<void>;
    protected bindRenderer(): Promise<void>;
    protected unbindRenderer(): Promise<void>;
}
