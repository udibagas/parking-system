import{E as D}from"./CERGcwVr.js";import{E as U,a as M}from"./CP-22jJM.js";import"./Dl5G8LvW.js";import{_ as V,r as d,o as q,v as c,x as r,y as m,I as s,z as o,A as n,t as _,G as y,Z as A,V as E,W as I,$ as N,a0 as w,a1 as C,C as G,D as K}from"./B6udkYbz.js";import{h as R}from"./C5S46NFB.js";const b=f=>(G("data-v-6eb48bdb"),f=f(),K(),f),L={id:"gate-in-app",style:{padding:"0px 200px"}},B={style:{"text-align":"center","font-size":"26px"}},F={style:{"text-align":"center"}},P=b(()=>r("div",{class:"label-big"},"GATE IN",-1)),Y=["value"],$=b(()=>r("div",{class:"label-big"},"[*] JENIS KENDARAAN",-1)),O=["value"],z=b(()=>r("div",{class:"label-big"},"[-] NO. PLAT",-1)),H=b(()=>r("div",{class:"label-big"},"TARIF",-1)),J={__name:"GateInApp",setup(f){const e=d({});d({});const h=d({}),S=d([]),g=d([]),i=C(),k=()=>{var t;let l=g.value.find(p=>p.name==e.value.vehicle_type);l&&(e.value.fare=e.value.is_member?0:l.tarif_flat,(t=i==null?void 0:i.proxy)==null||t.$forceUpdate()),document.querySelector("#plate-number").focus()},T=()=>{var t;let l=g.value.find(p=>p.is_default==1);e.value.plate_number=h.value.default_plate_number,l?(e.value.vehicle_type=l.name,e.value.fare=l.tarif_flat):(e.value.vehicle_type="",e.value.fare=""),(t=i==null?void 0:i.proxy)==null||t.$forceUpdate(),document.querySelector("#plate-number").focus()},x=()=>{if(!e.value.gate_in_id||!e.value.plate_number||!e.value.vehicle_type)return;let l={plate_number:e.value.plate_number};api("/parkingMember/search",{params:l}).then(t=>{e.value.fare=0,e.value.is_member=1,e.value.member_id=t.id}).catch(t=>{e.value.is_member=0,e.value.member_id=null}).finally(()=>{e.value.time_in=R().format("YYYY-MM-DD HH:mm:ss"),api("/parkingTransaction",{method:"POST",body:e.value})})};return q(()=>{document.querySelector("#plate-number").focus(),document.querySelector("#gate-in-app").onkeypress=l=>{var t;l.key=="-"&&(l.preventDefault(),T(),(t=i==null?void 0:i.proxy)==null||t.$forceUpdate(),document.querySelector("#plate-number").focus()),l.key=="*"&&(l.preventDefault(),e.value.vehicle_type="",e.value.fare="",document.querySelector("#vehicle-type").focus())}}),(l,t)=>{const p=D,u=M,v=U;return _(),c("div",L,[r("h1",B,m(s(h).name),1),r("div",F,m(s(h).address),1),o(p),o(v,{gutter:10,style:{"margin-bottom":"10px"}},{default:n(()=>[o(u,{span:10},{default:n(()=>[P]),_:1}),o(u,{span:14},{default:n(()=>[y(r("select",{"onUpdate:modelValue":t[0]||(t[0]=a=>s(e).gate_in_id=a),id:"gate-in",class:"my-input"},[(_(!0),c(E,null,I(s(S).filter(a=>a.type=="IN"),a=>(_(),c("option",{value:a.id,key:a.id},m(a.name),9,Y))),128))],512),[[A,s(e).gate_in_id]])]),_:1})]),_:1}),o(v,{gutter:10,style:{"margin-bottom":"10px"}},{default:n(()=>[o(u,{span:10},{default:n(()=>[$]),_:1}),o(u,{span:14},{default:n(()=>[y(r("select",{placeholder:"JENIS KENDARAAN",onChange:k,"onUpdate:modelValue":t[1]||(t[1]=a=>s(e).vehicle_type=a),id:"vehicle-type",class:"my-input"},[(_(!0),c(E,null,I(s(g),a=>(_(),c("option",{value:a.name,key:a.id},m(a.shortcut_key)+" - "+m(a.name),9,O))),128))],544),[[A,s(e).vehicle_type]])]),_:1})]),_:1}),o(v,{gutter:10,style:{"margin-bottom":"10px"}},{default:n(()=>[o(u,{span:10},{default:n(()=>[z]),_:1}),o(u,{span:14},{default:n(()=>[y(r("input",{id:"plate-number",autocomplete:"off",onKeyup:w(x,["enter"]),type:"text",placeholder:"NO. PLAT","onUpdate:modelValue":t[2]||(t[2]=a=>s(e).plate_number=a),class:"my-input"},null,544),[[N,s(e).plate_number]])]),_:1})]),_:1}),o(v,{gutter:10,style:{"margin-bottom":"10px"}},{default:n(()=>[o(u,{span:10},{default:n(()=>[H]),_:1}),o(u,{span:14},{default:n(()=>[y(r("input",{disabled:"","onUpdate:modelValue":t[3]||(t[3]=a=>s(e).fare=a),class:"my-input tarif-input"},null,512),[[N,s(e).fare]])]),_:1})]),_:1}),r("button",{class:"my-big-btn",onClick:x}," [ENTER] PRINT TIKET & BUKA GATE ")])}}},ee=V(J,[["__scopeId","data-v-6eb48bdb"]]);export{ee as default};
