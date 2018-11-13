import { IRenderer } from "uxele-core";
export declare abstract class BaseTool {
    abstract name: string;
    abstract slug: string;
    abstract cls: string;
    activated: boolean;
    private _renderer?;
    constructor();
    readonly renderer: IRenderer;
    setRenderer(renderer: IRenderer): void;
    protected abstract bindRenderer(): Promise<void>;
    protected abstract unbindRenderer(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
