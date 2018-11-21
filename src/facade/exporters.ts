import { LocalExporter } from "uxele-exporter-local";
import { IExporter } from "uxele-core/build";

export const exporters:IExporter[] = [
  new LocalExporter()
]