import { IRendererEvent } from "uxele-core";
import { BaseTool } from "../BaseTool";
export declare type InspectToolEvents = "onHoverLayer" | "onChoseLayer";
export declare class InspectTool extends BaseTool {
    name: string;
    slug: string;
    cls: string;
    private readonly storeChoseLayer;
    private hoverLayer?;
    private firstChoseLayer?;
    private unsubscribe?;
    private measureLinesGroup;
    private hoverLayerGroup;
    private choseLayerGroup;
    onMouseDown: (e: IRendererEvent | undefined) => void;
    onMouseMove: (e: IRendererEvent | undefined) => Promise<void>;
    private prepareDrawMeasure;
    private drawMeasurement;
    private drawMeasureLineOnRenderer;
    private drawMeasureLabelOnRenderer;
    drawVLineMeasurements(x1: number, t1: number, b1: number, x2: number, t2: number, b2: number, swap: boolean, text: string): void;
    drawHLineMeasurements(y1: number, l1: number, r1: number, y2: number, l2: number, r2: number, swap: boolean, text: string): void;
    private drawLayer;
    private drawFirstChoseLayer;
    private drawHoverLayer;
    protected bindRenderer(): Promise<void>;
    protected unbindRenderer(): Promise<void>;
}
