(function(){"use strict";var t={583:function(t,e,i){var n=i(963),o=i(252),a=i(577);const r={id:"container"},l=(0,o._)("h1",{class:"relative"},"Image to ASCII Converter",-1),d={id:"inputCss",class:"relative"},c={for:"input"},s=(0,o._)("div",{id:"fakeBtn"},"Upload File",-1),h={id:"fileName"},u={id:"btns",class:"relative"},f={id:"art",class:"relative"};function w(t,e,i,n,w,g){return(0,o.wg)(),(0,o.iD)("div",r,[l,(0,o._)("div",d,[(0,o._)("label",c,[(0,o._)("input",{id:"input",type:"file",name:"file",accept:"image/*",onChange:e[0]||(e[0]=(...e)=>t.fileUploaded&&t.fileUploaded(...e))},null,32),s]),(0,o._)("span",h,(0,a.zw)(t.fileName),1)]),(0,o._)("div",u,[(0,o._)("button",{onClick:e[1]||(e[1]=e=>t.convert())},"Convert"),(0,o._)("button",{onClick:e[2]||(e[2]=e=>t.download())},"Download")]),(0,o._)("div",f,[(0,o._)("pre",null,(0,a.zw)(t.art),1)])])}var g=i(292),v=(0,o.aZ)({data(){return{art:"",image:"",fileName:"No File Selected"}},methods:{async fileUploaded(t){const e=t.target;if(null==e.files)return;const i=e.files[0];this.fileName=i.name;const n=new FileReader;let o="asduhasiduh";n.onload=async()=>{void 0!=n.result&&(o=n.result)},n.readAsDataURL(i),setTimeout((()=>{this.image=o}),500)},async convert(){if(this.art="",""==this.image)return window.alert("Please upload an image to convert");const t="$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ".split("");let e=await g.loadImage(this.image);const i=g.createCanvas(e.width,e.height),n=i.getContext("2d");n.drawImage(e,0,0);let o=n.getImageData(0,0,e.width,e.height).data;e.width>document.body.clientWidth/3-50&&(o=await this.resizeImage(),e.height=Math.floor(Math.floor(e.width/(e.width/(document.body.clientWidth/3-50)))*e.height/e.width),e.width=Math.floor(e.width/(e.width/(document.body.clientWidth/3-50))),console.log("Condition:",e.width,e.height));for(let a=0;a<o.length;a+=4){const i=o[a],n=o[a+1],r=o[a+2],l=o[a+3];let d=Math.floor((i+n+r)/3);0==l&&(d=255);const c=t[Math.floor(t.length/256*d)];this.art+=" "==c?" ":c,a/4%e.width==0&&(this.art+="\n")}},async resizeImage(){const t=await g.loadImage(this.image),e=Math.floor(t.width/(t.width/(document.body.clientWidth/3-50))),i=Math.floor(e*t.height/t.width);console.log("Function: ",e,i);const n=g.createCanvas(e,i),o=n.getContext("2d");return o.drawImage(t,0,0,e,i),o.getImageData(0,0,e,i).data},async download(){if(""==this.art)return window.alert("There is no art to be downloaded");const t=new Blob([this.art]),e=window.URL.createObjectURL(t);var i=document.createElement("a");i.href=e,i.setAttribute("download","ascii-art.txt"),document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(e)}}}),m=i(744);const p=(0,m.Z)(v,[["render",w]]);var b=p;(0,n.ri)(b).mount("#app")}},e={};function i(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,i),a.exports}i.m=t,function(){var t=[];i.O=function(e,n,o,a){if(!n){var r=1/0;for(s=0;s<t.length;s++){n=t[s][0],o=t[s][1],a=t[s][2];for(var l=!0,d=0;d<n.length;d++)(!1&a||r>=a)&&Object.keys(i.O).every((function(t){return i.O[t](n[d])}))?n.splice(d--,1):(l=!1,a<r&&(r=a));if(l){t.splice(s--,1);var c=o();void 0!==c&&(e=c)}}return e}a=a||0;for(var s=t.length;s>0&&t[s-1][2]>a;s--)t[s]=t[s-1];t[s]=[n,o,a]}}(),function(){i.d=function(t,e){for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,a,r=n[0],l=n[1],d=n[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(o in l)i.o(l,o)&&(i.m[o]=l[o]);if(d)var s=d(i)}for(e&&e(n);c<r.length;c++)a=r[c],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(s)},n=self["webpackChunkimage_to_ascii"]=self["webpackChunkimage_to_ascii"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(583)}));n=i.O(n)})();
//# sourceMappingURL=app.ac457ac6.js.map