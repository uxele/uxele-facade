import { adapters } from "../adapters";
import { IFileBlob } from "psdetch-core";
import { lang } from "../i18n/lang";
import { store, actionProjectLoaded } from "../states";
export async function projectOpenLocalFile(_f: File) {
  const adps = adapters;
  const file: IFileBlob = {
    meta: {
      name: _f.name,
      mime: _f.type
    },
    file: _f
  }
  for (const adp of adps) {
    if (adp.checkFileMeta(file.meta)) {
      try {
        const proj = await adp.decodeProject(file);
        store.dispatch(actionProjectLoaded(proj));
        const pgs = await proj.getPages();
        return proj;
      } catch (e) {
        return Promise.reject(e.toString());
      }
    }
  }
  return Promise.reject(lang("error_openfile_no_adapter", file.meta.name))
}