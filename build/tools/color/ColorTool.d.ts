import { IPoint, IRendererEvent, IPage } from "uxele-core";
import { BaseTool } from "../BaseTool";
export declare type ColorToolEvents = "onPickColor" | "onHoverColor";
export declare class ColorTool extends BaseTool {
    name: string;
    slug: string;
    cls: string;
    private hoverColor?;
    private inited;
    private curPageContext?;
    private colorGroup?;
    onMouseDown: (e: IRendererEvent | undefined) => void;
    onMouseMove: (e: IRendererEvent | undefined) => Promise<void>;
    colorBand: any;
    roundEdge: any;
    magImg: any;
    magCursor: any;
    drawColor(r: number, g: number, b: number, coords: IPoint, page: IPage): Promise<void>;
    protected bindRenderer(): Promise<void>;
    protected unbindRenderer(): Promise<void>;
}
