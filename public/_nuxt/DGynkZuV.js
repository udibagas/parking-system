import{e as k,a as C,b as O}from"./DXBRTGVt.js";import{E as H}from"./9gXX2RdG.js";import{A as J,q as $,t as K,E as U}from"./BFO3TwWL.js";import{E as F,a as G}from"./CfmWdu4d.js";import"./BBXO5qaq.js";import{u as j}from"./SHKvqBp3.js";import"./l0sNRNKZ.js";import{u as q}from"./73cs48uQ.js";import{t as A}from"./CbPeXI4l.js";import{h as _}from"./C5S46NFB.js";import{c as E,r as f,X as W,t as r,v as d,x as L,z as o,A as s,V as c,W as h,I as t,T as b,J as D,B as p,y as P}from"./LBRxFYJi.js";const z={style:{"margin-bottom":"10px"}},X=L("h1",{class:"text-center"},"LAPORAN PER POS",-1),ua={__name:"ByPos",setup(Q){const g=j(),u=q(),M=E(()=>u.posList),R=E(()=>u.jenisKendaraanList),y=f([]),i=f(null),n=f([_().format("YYYY-MM-01"),_().format("YYYY-MM-DD")]);W(async()=>{await u.getPosList(),await u.getJenisKendaraanList()});function Y(){g("/api/reportPerPos",{params:{"dateRange[0]":n.value[0],"dateRange[1]":n.value[1],pos_id:i.value}}).then(e=>{y.value=e})}function T(){g("/api/reportPerPos",{params:{pos_id:i.value,"dateRange[0]":n.value[0],"dateRange[1]":n.value[1]}}).then(e=>{k({data:e,fileName:"Laporan Per Pos",exportType:"xls"})})}function w(){g("api/printReportHarian",{params:{pos_id:i.value,"dateRange[0]":n.value[0],"dateRange[1]":n.value[1]}}).then(e=>{K({message:"SILAKAN AMBIL SLIP",type:"success"})})}return(e,m)=>{const I=C,N=O,S=H,v=U,l=F,V=G;return r(),d(c,null,[L("div",z,[X,o(N,{modelValue:t(i),"onUpdate:modelValue":m[0]||(m[0]=a=>D(i)?i.value=a:null),placeholder:"Pos",onChange:Y,style:{width:"140px","margin-right":"10px"}},{default:s(()=>[(r(!0),d(c,null,h(t(M),a=>(r(),b(I,{value:a.id,label:a.nama,key:a.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"]),o(S,{class:"mr-3",onChange:Y,modelValue:t(n),"onUpdate:modelValue":m[1]||(m[1]=a=>D(n)?n.value=a:null),format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",type:"daterange","range-separator":"To","start-placeholder":"Dari","end-placeholder":"Sampai",style:{width:"240px","margin-right":"10px"}},null,8,["modelValue"]),o(v,{icon:"ElIconDownload"in e?e.ElIconDownload:t(J),onClick:T,type:"primary",style:{"margin-right":"10px"}},{default:s(()=>[p(" Download ")]),_:1},8,["icon"]),o(v,{icon:"ElIconPrinter"in e?e.ElIconPrinter:t($),onClick:w,type:"primary"},{default:s(()=>[p(" PRINT LAPORAN HARIAN ")]),_:1},8,["icon"])]),o(V,{stripe:"",border:"","show-summary":"",data:t(y),style:{width:"100%"}},{default:s(()=>[o(l,{prop:"Tanggal",label:"TANGGAL"},{default:s(({row:a})=>[p(P(t(_)(a.Tanggal).format("DD/MMM/YY")),1)]),_:1}),o(l,{prop:"Shift",label:"SHIFT"}),o(l,{prop:"Petugas",label:"PETUGAS"}),(r(!0),d(c,null,h(t(R),(a,B)=>(r(),b(l,{prop:`${a.nama}_count`,label:`${a.nama}`,align:"center","header-align":"center"},null,8,["prop","label"]))),256)),o(l,{prop:"Jumlah",label:"JUMLAH",align:"center","header-align":"center"}),(r(!0),d(c,null,h(t(R),(a,B)=>(r(),b(l,{prop:`${a.nama}_sum`,label:`${a.nama}`,align:"right","header-align":"right"},{default:s(({row:x})=>[p(P(("toRupiah"in e?e.toRupiah:t(A))(x[`${a.nama}_sum`])),1)]),_:2},1032,["prop","label"]))),256)),o(l,{prop:"Total",label:"TOTAL",align:"right","header-align":"right"},{default:s(({row:a})=>[p(P(("toRupiah"in e?e.toRupiah:t(A))(a.Total)),1)]),_:1})]),_:1},8,["data"])],64)}}};export{ua as _};