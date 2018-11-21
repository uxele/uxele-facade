import { ILayer, IExporter, IVectorLayer } from "uxele-core/build";
import { isPixelLayer, isVectorlLayer, isTextLayer } from "uxele-utils/build/layer";
import { trimCanvas, scaleCanvas, CanvasExportFormat, canvasToFile, svgToCanvas } from "uxele-utils";
import { lang } from "uxele-i18n";
export function canExportImage(layer: ILayer): boolean {
  return isPixelLayer(layer) || isVectorlLayer(layer);
}

export function canExportSvg(layer: ILayer): boolean {
  return isVectorlLayer(layer);
}

export function canExportText(layer: ILayer): boolean {
  return isTextLayer(layer);
}

export function getExportType(layer: ILayer): ExportType {
  return canExportImage(layer) ? "image" : canExportSvg(layer) ? "svg" : "text";
}
export type ExportType = "image" | "svg" | "text";
export interface IExportImageParams {
  trim: boolean;
  scale: number;
  format: CanvasExportFormat;
  quality: number;
}
export async function exportImageUrl(layer: ILayer, params: IExportImageParams): Promise<string> {
  const canvas = await exportImage(layer, params);
  return canvas.toDataURL(params.format, params.quality);
  // return URL.createObjectURL(file);
}
export async function exportImage(layer: ILayer, params: IExportImageParams): Promise<HTMLCanvasElement> {
  if (isPixelLayer(layer)) {
    let canvas = await layer.getPixelImg();
    if (params.trim) {
      canvas = trimCanvas(canvas);
    }
    if (params.scale !== 1) {
      canvas = scaleCanvas(canvas, params.scale);
    }
    return canvas;
    // const filename=`${layer.name}@${params.scale}X.${params.format.split("/")[1]}`;
    // return canvasToFile(canvas,filename,params.format,params.quality);
  } else if (isVectorlLayer(layer)) {
    const svg = await layer.getSvgString();
    let canvas = await svgToCanvas(svg, params.scale);
    if (params.trim) {
      canvas = trimCanvas(canvas);
    }
    return canvas;
    // const filename=`${layer.name}@${params.scale}X.${params.format.split("/")[1]}`;
    // return canvasToFile(canvas,filename,params.format,params.quality);
  } else {
    return Promise.reject(lang("error_layerExport_exportImage_unsupported_layerType", layer.name, layer.layerType));
  }
}
export function getExportImageFileName(layer:ILayer,params:IExportImageParams){
  return `${layer.name}@${params.scale}X.${params.format.replace("image/", "")}`;
}
export function getExportSvgFileName(layer:ILayer){
  return `${layer.name}.svg`;
}
export async function exportImageWithExporter(layer: ILayer, exporter:IExporter,params:IExportImageParams){
  const canvas=await exportImage(layer,params);
  const file=await canvasToFile(canvas,getExportImageFileName(layer,params),params.format,params.quality);
  return exporter.exportBlob(file,getExportImageFileName(layer,params));
}

export async function exportSvgWithExporter(layer: IVectorLayer, exporter:IExporter){
  const svg=await layer.getSvgString();
  return exporter.exportBlob(new Blob([svg],{type:"image/svg+xml"}),getExportSvgFileName(layer));
}

