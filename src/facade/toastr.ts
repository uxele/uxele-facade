const Toast = require("../vendor/toastr.js").Toast;
class Toastr {
  info(str: string) {
    Toast(str,{
      style:{
        main:{
          bottom:"auto",
          top:"10%",
          left:"auto",
          width:"auto",
          right:"8%",
          background:"rgba(255,255,255,0.85",
          color:"black"
        }
      },
      settings:{
        duration: 800
      }
    })
  }
}

export const toastr=new Toastr();