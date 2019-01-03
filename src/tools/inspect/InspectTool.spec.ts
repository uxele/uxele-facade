// import { IPage, Rect, LayerType } from "uxele-core";
// import { FabricRenderer } from "uxele-render-fabric";
// import { sleep } from "uxele-utils";
// import { InspectTool } from "./InspectTool";
// import { testAlert, testConfirm } from "uxele-utils/build/testUtils";
// import { actionChosePage, store } from "../../facade";

// function dummyPage() {
//   const layers=[
//     {
//       name: "test layer",
//       rect: new Rect(10,10,150,150),
//       layerType: LayerType.pixel,
//       visible: true
//     },
//     {
//       name: "test layer 1",
//       rect: new Rect(50,50,100,100),
//       layerType: LayerType.pixel,
//       visible: true
//     },
//   ]
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
//       return Promise.resolve(layers);
//     }
//   };
//   return p;

// }

// describe("InspectTool", () => {
//   let c: any;
//   let f:FabricRenderer
//   let originalTimeout:number;
//   beforeAll(() => {
//     c = document.createElement("canvas");
//     c.width = 300;
//     c.height = 300;
//     document.querySelector("body")!.appendChild(c);
//     f=new FabricRenderer(c,300,300);
//     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
//   })
//   afterAll(() => {
//     f.destroy();
//     document.querySelector("body")!.removeChild(c);
//     jasmine.DEFAULT_TIMEOUT_INTERVAL=originalTimeout;
//   })
//   if (process.env.INTERACTIVE){
//     it ("should display layer when mouse over",async ()=>{
//       store.dispatch(actionChosePage(dummyPage()));
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new InspectTool();
//       h.setRenderer(f);
//       await h.activate();
//       testAlert("Please move mouse around the rendered picture.");
//       await sleep(5000);
//       expect(testConfirm("Have you seen two layers?")).toBeTruthy();
    
//     })
//     it ("should display a layer that is chosen",async ()=>{
//       store.dispatch(actionChosePage(dummyPage()));
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new InspectTool();
//       h.setRenderer(f);
//       await h.activate();
//       testAlert("Please click on a layer");
//       await sleep(5000);
//       expect(testConfirm("Have you seen clicked layer being highlighted?")).toBeTruthy();
//     })
//     it ("should display layer correctly with zoomed renderer",async ()=>{
//       store.dispatch(actionChosePage(dummyPage()));
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new InspectTool();
//       h.setRenderer(f);
//       await h.activate();
//       f.zoom(1.5);
//       await sleep(1000);
//       testAlert("Zoomed renderer - Please click on a layer");
//       await sleep(5000);
//       expect(testConfirm("Have you seen the layer has zoomed correctly?")).toBeTruthy();
//     })
//   }
  
// })