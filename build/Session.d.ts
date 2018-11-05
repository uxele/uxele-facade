import { FabricRenderer } from "../../psdetch-render-fabric";
import { IProject, IPage, BasicEvents, ILayer } from "../../psdetch-core/build";
import { HandTool } from "../../psdetch-tool-hand";
import { InspectTool } from "../../psdetch-tool-inspect/build";
import { ColorTool } from "../../psdetch-tool-color/build";
export interface ISessionProps {
    curPage?: IPage;
    curProject?: IProject;
    renderer?: FabricRenderer;
    curTool?: ITool;
    choseLayer?: ILayer;
    handtool?: HandTool;
    inspectTool?: InspectTool;
    colorTool?: ColorTool;
}
export interface ITool {
    activate(): void;
    deactivate(): void;
    once(evt: string, handler: any): void;
    activated: boolean;
    name: string;
    slug: string;
}
export declare class Session extends BasicEvents<keyof ISessionProps, ISessionProps[keyof ISessionProps], (v?: ISessionProps[keyof ISessionProps]) => void> {
    get<T extends keyof ISessionProps>(key: T): ISessionProps[T];
    set<T extends keyof ISessionProps>(key: T, val?: ISessionProps[T]): void;
    constructor();
    private bindTools;
}
