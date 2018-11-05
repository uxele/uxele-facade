import { IFileBlob, IProject, IPage } from "psdetch-core";
import { FabricRenderer } from "psdetch-render-fabric";

export interface ISessionState {
  file?: IFileBlob
  curProject?: IProject,
  curPage?:IPage;
  renderer?:FabricRenderer;
}
