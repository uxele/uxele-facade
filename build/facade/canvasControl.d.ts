import { IPoint } from "uxele-core/build";
export declare function zoomIn(): void;
/**
 * Move canvas to center to a point
 * @param fileCoords The coords of point to center on. the coords are relative to design page.
 */
export declare function centerTo(fileCoords: IPoint): void;
/**
 * Set zoom level of canvas with origin from center.
 */
export declare function setZoom(level: number): void;
export declare function zoomOut(): void;
export declare function getZoom(): number;
export declare function fitToPage(): void;
