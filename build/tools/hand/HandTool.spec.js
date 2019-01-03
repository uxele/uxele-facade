"use strict";
// import { IPage } from "uxele-core";
// import { FabricRenderer } from "uxele-render-fabric";
// import { sleep } from "uxele-utils";
// import { HandTool } from "./HandTool";
// import { testAlert, testConfirm } from "uxele-utils/build/testUtils";
// function dummyPage() {
//   const p: IPage = {
//     name: "dummy page",
//     width: 275,
//     height: 183,
//     getPreview: () => {
//       const img = new Image();
//       img.src = "base/tools/testAssets/nature.jpeg";
//       return new Promise((resolve, reject) => {
//         img.onload = () => {
//           resolve(img);
//         };
//       })
//     },
//     getLayers: () => {
//       return Promise.resolve([]);
//     }
//   };
//   return p;
// }
// describe("HandTool", () => {
//   let c: any;
//   let f:FabricRenderer
//   beforeAll(() => {
//     c = document.createElement("canvas");
//     c.width = 300;
//     c.height = 300;
//     document.querySelector("body")!.appendChild(c);
//     f=new FabricRenderer(c,300,300);
//   })
//   afterAll(() => {
//     f.destroy();
//     document.querySelector("body")!.removeChild(c);
//   })
//   if (process.env.INTERACTIVE){
//     it ("should pan on canvas",async ()=>{
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new HandTool();
//       h.setRenderer(f);
//       h.activate();
//       testAlert("Please use mouse to pan the page around");
//       await sleep(2000);
//       expect(testConfirm("Have you pan the page around successfully?")).toBeTruthy();
//     })
//   }
// })
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/hand/HandTool.spec.js.map