import { ILayer, IExporter, IVectorLayer } from "uxele-core/build";
import { CanvasExportFormat } from "uxele-utils";
export declare function canExportImage(layer: ILayer): boolean;
export declare function canExportSvg(layer: ILayer): boolean;
export declare function canExportText(layer: ILayer): boolean;
export declare function getExportType(layer: ILayer): ExportType;
export declare type ExportType = "image" | "svg" | "text";
export interface IExportImageParams {
    trim: boolean;
    scale: number;
    format: CanvasExportFormat;
    quality: number;
}
export declare function exportImageUrl(layer: ILayer, params: IExportImageParams): Promise<string>;
export declare function exportImage(layer: ILayer, params: IExportImageParams): Promise<HTMLCanvasElement>;
export declare function getExportImageFileName(layer: ILayer, params: IExportImageParams): string;
export declare function getExportSvgFileName(layer: ILayer): string;
export declare function exportImageWithExporter(layer: ILayer, exporter: IExporter, params: IExportImageParams): Promise<any>;
export declare function exportSvgWithExporter(layer: IVectorLayer, exporter: IExporter): Promise<any>;
