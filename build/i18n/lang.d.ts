import { ILang } from "./ILang";
export declare function lang(key: keyof ILang["dict"], ...args: any[]): string;
export declare function setCurLang(_lang: ILang): void;
export declare function getLangs(): ILang[];
export declare function getCurLang(): ILang;
