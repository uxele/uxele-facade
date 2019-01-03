import { BaseTool } from "../BaseTool";
export declare class PrototypeTool extends BaseTool {
    name: string;
    slug: string;
    cls: string;
    protected bindRenderer(): Promise<void>;
    protected unbindRenderer(): Promise<void>;
}
