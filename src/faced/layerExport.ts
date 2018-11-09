import { ILayer } from "psdetch-core/build";
import { isPixelLayer, isVectorlLayer, isTextLayer } from "psdetch-core/build/layer";
import {trimCanvas, scaleCanvas, CanvasExportFormat, canvasToFile, svgToCanvas} from "psdetch-utils";
import { lang } from "psdetch-i18n";
export function canExportImage(layer:ILayer):boolean{
  return isPixelLayer(layer) || isVectorlLayer(layer);
}

export function canExportSvg(layer:ILayer):boolean{
  return isVectorlLayer(layer);
}

export function canExportText(layer:ILayer):boolean{
  return isTextLayer(layer);
}

export function getExportType(layer:ILayer):"image" | "svg" | "text"{
  return canExportImage(layer) ? "image" : canExportSvg(layer) ? "svg" : "text";
}

export interface IExportImageParams{
  trim:boolean;
  scale:number;
  format:CanvasExportFormat;
  quality:number;
}
export async function exportImageUrl(layer:ILayer, params:IExportImageParams):Promise<string>{
  const canvas=await exportImage(layer,params);
  return canvas.toDataURL(params.format,params.quality);
  // return URL.createObjectURL(file);
}
export async function exportImage(layer:ILayer, params:IExportImageParams):Promise<HTMLCanvasElement>{
  if (isPixelLayer(layer)){
    let canvas= await layer.getPixelImg();
    if (params.trim){
      canvas=trimCanvas(canvas);
    }
    if (params.scale!==1){
      canvas=scaleCanvas(canvas,params.scale);
    }
    return canvas;
    // const filename=`${layer.name}@${params.scale}X.${params.format.split("/")[1]}`;
    // return canvasToFile(canvas,filename,params.format,params.quality);
  }else if (isVectorlLayer(layer)){
    const svg=await layer.getSvgString();
    let canvas=await svgToCanvas(svg,params.scale);
    if (params.trim){
      canvas=trimCanvas(canvas);
    }
    return canvas;
    // const filename=`${layer.name}@${params.scale}X.${params.format.split("/")[1]}`;
    // return canvasToFile(canvas,filename,params.format,params.quality);
  }else{
    return Promise.reject(lang("error_layerExport_exportImage_unsupported_layerType",layer.name,layer.layerType));
  }
}
