import { ILayer } from "psdetch-core/build";
import { CanvasExportFormat } from "psdetch-utils";
export declare function canExportImage(layer: ILayer): boolean;
export declare function canExportSvg(layer: ILayer): boolean;
export declare function canExportText(layer: ILayer): boolean;
export declare function getExportType(layer: ILayer): "image" | "svg" | "text";
export interface IExportImageParams {
    trim: boolean;
    scale: number;
    format: CanvasExportFormat;
    quality: number;
}
export declare function exportImageUrl(layer: ILayer, params: IExportImageParams): Promise<string>;
export declare function exportImage(layer: ILayer, params: IExportImageParams): Promise<HTMLCanvasElement>;
