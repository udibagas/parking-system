import{a as k,b as B}from"./BvVGfvH7.js";import{E as L,a as P}from"./D3f8C9ek.js";import{l as T,q as V,E as w}from"./Ms7LA7Z2.js";import{u as x,E as I}from"./DYO5Cvr-.js";import"./Da9z4i7X.js";import"./Dzcp9Yej.js";import{c as y,r as A,o as C,t as a,T as c,A as t,z as r,I as l,B as u,J as R,v as F,V as N,W as S}from"./q5u-HvB_.js";const H={__name:"PrintDialog",props:["show"],emits:["close","print"],setup(d,{emit:_}){const s=_,i=x(),p=y(()=>i.printerList),n=A(null);return C(()=>{i.getPrinterList()}),(h,o)=>{const f=k,E=B,b=L,v=P,m=w,g=I;return a(),c(g,{center:"",draggable:"",width:"500px",title:"PILIH PRINTER","model-value":d.show,"before-close":()=>s("close")},{footer:t(()=>[r(m,{icon:l(T),onClick:o[1]||(o[1]=e=>s("close"))},{default:t(()=>[u(" BATAL ")]),_:1},8,["icon"]),r(m,{icon:l(V),onClick:o[2]||(o[2]=e=>s("print",l(n))),type:"primary",disabled:!l(n)},{default:t(()=>[u(" CETAK STRUK ")]),_:1},8,["icon","disabled"])]),default:t(()=>[r(v,null,{default:t(()=>[r(b,null,{default:t(()=>[r(E,{modelValue:l(n),"onUpdate:modelValue":o[0]||(o[0]=e=>R(n)?n.value=e:null),placeholder:"Pilih Printer",style:{width:"100%"}},{default:t(()=>[(a(!0),F(N,null,S(l(p),e=>(a(),c(f,{key:e.id,value:e.id,label:e.nama},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["model-value","before-close"])}}};export{H as _};
