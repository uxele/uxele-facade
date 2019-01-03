import { copyToClipboard, color } from "uxele-utils/build";
import { toastr } from "./toastr";

export function copyColor(colorRGB: string) {
  const hex=color.rgbStrToHex(colorRGB).toUpperCase();
  copyToClipboard(hex);
  toastr.info("Copied "+hex);
}
