"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_core_1 = require("uxele-core");
function dummyPage() {
    var layers = [
        {
            name: "test layer",
            rect: new uxele_core_1.Rect(10, 10, 150, 150),
            layerType: uxele_core_1.LayerType.pixel,
            visible: true
        },
        {
            name: "test layer 1",
            rect: new uxele_core_1.Rect(50, 50, 100, 100),
            layerType: uxele_core_1.LayerType.pixel,
            visible: true
        },
    ];
    var p = {
        name: "dummy page",
        width: 275,
        height: 183,
        getPreview: function () {
            var img = new Image();
            img.src = "base/testAssets/nature.jpeg";
            return new Promise(function (resolve, reject) {
                img.onload = function () {
                    resolve(img);
                };
            });
        },
        getLayers: function () {
            return Promise.resolve(layers);
        }
    };
    return p;
}
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
//       session.set("curPage",dummyPage());
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new InspectTool(f);
//       h.activate();
//       testAlert("Please move mouse around the rendered picture.");
//       await sleep(5000);
//       expect(testConfirm("Have you seen two layers?")).toBeTruthy();
//     })
//     it ("should display a layer that is chosen",async ()=>{
//       session.set("curPage",dummyPage());
//       await f.renderPage(dummyPage());
//       await sleep(100);
//       const h=new InspectTool(f);
//       h.activate();
//       testAlert("Please click on a layer");
//       await sleep(500000);
//       expect(testConfirm("Have you seen clicked layer being highlighted?")).toBeTruthy();
//     })
//   }
// })
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-facade/src/tools/color/ColorTool.spec.js.map