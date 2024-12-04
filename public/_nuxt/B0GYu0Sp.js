import{E as Ee,b as Ge,a as Je}from"./C78imo3a.js";import{b as qe,e as Ne,u as We,_ as Qe}from"./BxoIleHM.js";import{u as Ye,O as Xe,P as Ze,b as el,M as ll,n as se,s as ce,t as pe,o as fe,E as ue,p as be,r as oe,j as Ue,k as re,m as ge,l as je,Q as al,A as nl,z as tl}from"./65WdBylW.js";import{E as he,a as ke}from"./C_m6hDnL.js";import{u as ol,b as ie,a as xe,E as rl}from"./DKgfFkQU.js";import{a as il,E as sl}from"./Hs28GpK6.js";import{u as Be}from"./_LJ4zY5W.js";import{u as Pe,E as ze}from"./XWIb0rmg.js";import{d as Le,r as le,c as W,t as y,T as D,A as a,I as e,K as ul,Y as He,U as ve,v as K,V as H,W as Q,Q as dl,z as l,B as _,o as ye,x as w,G as ae,y as I,L as B,a3 as $e,J as _e}from"./5B86bRMD.js";import{E as Ve,a as Ce}from"./Bvz_OrZQ.js";import{E as we,a as Te,b as Se}from"./DJX3YPOG.js";import"./l0sNRNKZ.js";import{v as Me,E as Ie}from"./Dn4PSk8s.js";import{u as Re}from"./DHH7CjRc.js";import{t as ne}from"./CbPeXI4l.js";import{d as Ke,c as ml}from"./CY9tAmGA.js";import{E as pl}from"./kAkXmFPs.js";import"./Cpj98o6Y.js";const _l=qe({format:{type:String,default:"HH:mm"},modelValue:String,disabled:Boolean,editable:{type:Boolean,default:!0},effect:{type:String,default:"light"},clearable:{type:Boolean,default:!0},size:Ye,placeholder:String,start:{type:String,default:"09:00"},end:{type:String,default:"18:00"},step:{type:String,default:"00:30"},minTime:String,maxTime:String,name:String,prefixIcon:{type:Ne([String,Object]),default:()=>Xe},clearIcon:{type:Ne([String,Object]),default:()=>Ze},...ol}),q=T=>{const b=(T||"").split(":");if(b.length>=2){let d=Number.parseInt(b[0],10);const o=Number.parseInt(b[1],10),t=T.toUpperCase();return t.includes("AM")&&d===12?d=0:t.includes("PM")&&d!==12&&(d+=12),{hours:d,minutes:o}}return null},De=(T,b)=>{const d=q(T);if(!d)return-1;const o=q(b);if(!o)return-1;const t=d.minutes+d.hours*60,s=o.minutes+o.hours*60;return t===s?0:t>s?1:-1},Fe=T=>`${T}`.padStart(2,"0"),te=T=>`${Fe(T.hours)}:${Fe(T.minutes)}`,cl=(T,b)=>{const d=q(T);if(!d)return"";const o=q(b);if(!o)return"";const t={hours:d.hours,minutes:d.minutes};return t.minutes+=o.minutes,t.hours+=o.hours,t.hours+=Math.floor(t.minutes/60),t.minutes=t.minutes%60,te(t)},fl=Le({name:"ElTimeSelect"}),bl=Le({...fl,props:_l,emits:["change","blur","focus","update:modelValue"],setup(T,{expose:b}){const d=T;Ke.extend(ml);const{Option:o}=ie,t=We("input"),s=le(),k=el(),{lang:j}=ll(),p=W(()=>d.modelValue),A=W(()=>{const n=q(d.start);return n?te(n):null}),v=W(()=>{const n=q(d.end);return n?te(n):null}),P=W(()=>{const n=q(d.step);return n?te(n):null}),z=W(()=>{const n=q(d.minTime||"");return n?te(n):null}),N=W(()=>{const n=q(d.maxTime||"");return n?te(n):null}),$=W(()=>{const n=[];if(d.start&&d.end&&d.step){let i=A.value,r;for(;i&&v.value&&De(i,v.value)<=0;)r=Ke(i,"HH:mm").locale(j.value).format(d.format),n.push({value:r,disabled:De(i,z.value||"-1:-1")<=0||De(i,N.value||"100:100")>=0}),i=cl(i,P.value)}return n});return b({blur:()=>{var n,i;(i=(n=s.value)==null?void 0:n.blur)==null||i.call(n)},focus:()=>{var n,i;(i=(n=s.value)==null?void 0:n.focus)==null||i.call(n)}}),(n,i)=>(y(),D(e(ie),{ref_key:"select",ref:s,"model-value":e(p),disabled:e(k),clearable:n.clearable,"clear-icon":n.clearIcon,size:n.size,effect:n.effect,placeholder:n.placeholder,"default-first-option":"",filterable:n.editable,"empty-values":n.emptyValues,"value-on-clear":n.valueOnClear,"onUpdate:modelValue":i[0]||(i[0]=r=>n.$emit("update:modelValue",r)),onChange:i[1]||(i[1]=r=>n.$emit("change",r)),onBlur:i[2]||(i[2]=r=>n.$emit("blur",r)),onFocus:i[3]||(i[3]=r=>n.$emit("focus",r))},{prefix:a(()=>[n.prefixIcon?(y(),D(e(se),{key:0,class:ul(e(t).e("prefix-icon"))},{default:a(()=>[(y(),D(He(n.prefixIcon)))]),_:1},8,["class"])):ve("v-if",!0)]),default:a(()=>[(y(!0),K(H,null,Q(e($),r=>(y(),D(e(o),{key:r.value,label:r.value,value:r.value,disabled:r.disabled},null,8,["label","value","disabled"]))),128))]),_:1},8,["model-value","disabled","clearable","clear-icon","size","effect","placeholder","filterable","empty-values","value-on-clear"]))}});var Ae=Qe(bl,[["__file","time-select.vue"]]);Ae.install=T=>{T.component(Ae.name,Ae)};const gl=Ae,hl=gl,kl={__name:"General",setup(T){const b=Pe(),d=Be(),o=le({}),t=le(!1),s=dl({...b.setting}),k=async()=>{t.value=!0;let j="/api/setting";s.id&&(j+=`/${s.id}`);try{await d(j,{method:s.id?"PUT":"POST",body:s}),pe({message:"Data berhasil disimpan.",type:"success",showClose:!0}),b.getSetting()}catch(p){p.response.status==422?o.value=p.response._data.errors:o.value={}}t.value=!1};return(j,p)=>{const A=fe,v=he,P=xe,z=ie,N=il,$=sl,c=ke,u=ue;return y(),K("div",null,[l(c,{"label-position":"left","label-width":"250px"},{default:a(()=>[l($,{gutter:20},{default:a(()=>[l(N,{span:12},{default:a(()=>{var n,i,r,E,U,x;return[l(v,{label:"Nama Lokasi",error:(n=e(o).nama_lokasi)==null?void 0:n.join(", ")},{default:a(()=>[l(A,{placeholder:"Nama Lokasi",modelValue:e(s).nama_lokasi,"onUpdate:modelValue":p[0]||(p[0]=V=>e(s).nama_lokasi=V)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Alamat Lokasi",error:(i=e(o).alamat_lokasi)==null?void 0:i.join(", ")},{default:a(()=>[l(A,{placeholder:"Alamat Lokasi",type:"textarea",rows:"3",modelValue:e(s).alamat_lokasi,"onUpdate:modelValue":p[1]||(p[1]=V=>e(s).alamat_lokasi=V)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Info Tambahan Tiket",error:(r=e(o).info_tambahan_tiket)==null?void 0:r.join(", ")},{default:a(()=>[l(A,{placeholder:"Info Tambahan Tiket",type:"textarea",rows:"3",modelValue:e(s).info_tambahan_tiket,"onUpdate:modelValue":p[2]||(p[2]=V=>e(s).info_tambahan_tiket=V)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Plat Nomor Default",error:(E=e(o).plat_nomor_default)==null?void 0:E.join(", ")},{default:a(()=>[l(A,{placeholder:"Plat Nomor Default",modelValue:e(s).plat_nomor_default,"onUpdate:modelValue":p[3]||(p[3]=V=>e(s).plat_nomor_default=V)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Jumlah Kendaraan Per Kartu",error:(U=e(o).jml_kendaraan_per_kartu)==null?void 0:U.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)",modelValue:e(s).jml_kendaraan_per_kartu,"onUpdate:modelValue":p[4]||(p[4]=V=>e(s).jml_kendaraan_per_kartu=V)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Orientasi Kamera",error:(x=e(o).orientasi_kamera)==null?void 0:x.join(", ")},{default:a(()=>[l(z,{placeholder:"Orientasi Kamera",modelValue:e(s).orientasi_kamera,"onUpdate:modelValue":p[5]||(p[5]=V=>e(s).orientasi_kamera=V),style:{width:"100%"}},{default:a(()=>[(y(),K(H,null,Q(["LANDSCAPE","POTRAIT"],(V,g)=>l(P,{key:g,value:V,label:V},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1}),l(N,{span:12},{default:a(()=>{var n,i,r,E,U,x,V;return[l(v,{label:"Mode Transaksi Member",error:(n=e(o).must_checkout)==null?void 0:n.join(", ")},{default:a(()=>[l(z,{placeholder:"Mode Transaksi Member",modelValue:e(s).must_checkout,"onUpdate:modelValue":p[6]||(p[6]=g=>e(s).must_checkout=g),style:{width:"100%"}},{default:a(()=>[(y(),K(H,null,Q(["Tidak harus check out","Harus check out"],(g,h)=>l(P,{key:h,value:h,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Mode Buka Gate Untuk Member",error:(i=e(o).member_auto_open)==null?void 0:i.join(", ")},{default:a(()=>[l(z,{placeholder:"Mode Buka Gate Untuk Member",modelValue:e(s).member_auto_open,"onUpdate:modelValue":p[7]||(p[7]=g=>e(s).member_auto_open=g),style:{width:"100%"}},{default:a(()=>[(y(),K(H,null,Q(["Ketik Plat Nomor (Buka oleh operator)","Tempel Kartu (Otomatis)"],(g,h)=>l(P,{key:h,value:h,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Disable Plat Nomor di Pos Keluar",error:(r=e(o).disable_plat_nomor)==null?void 0:r.join(", ")},{default:a(()=>[l(z,{placeholder:"Disable Plat Nomor di Pos Keluar",modelValue:e(s).disable_plat_nomor,"onUpdate:modelValue":p[8]||(p[8]=g=>e(s).disable_plat_nomor=g),style:{width:"100%"}},{default:a(()=>[(y(),K(H,null,Q(["Tidak","Ya"],(g,h)=>l(P,{key:h,value:!!h,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Hapus Snapshot dalam x hari",error:(E=e(o).hapus_snapshot_dalam_hari)==null?void 0:E.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Hapus Snapshot dalam x hari (0 untuk hapus manual)",modelValue:e(s).hapus_snapshot_dalam_hari,"onUpdate:modelValue":p[9]||(p[9]=g=>e(s).hapus_snapshot_dalam_hari=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Hapus Transaksi dalam x hari",error:(U=e(o).hapus_transaksi_dalam_hari)==null?void 0:U.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Hapus Transaksi dalam x hari",modelValue:e(s).hapus_transaksi_dalam_hari,"onUpdate:modelValue":p[10]||(p[10]=g=>e(s).hapus_transaksi_dalam_hari=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"Server Address",error:(x=e(o).server_address)==null?void 0:x.join(", ")},{default:a(()=>[l(A,{placeholder:"Server Address",modelValue:e(s).server_address,"onUpdate:modelValue":p[11]||(p[11]=g=>e(s).server_address=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(v,{label:"ID Pelanggan",error:(V=e(o).id_pelanggan)==null?void 0:V.join(", ")},{default:a(()=>[l(A,{placeholder:"ID Pelanggan",modelValue:e(s).id_pelanggan,"onUpdate:modelValue":p[12]||(p[12]=g=>e(s).id_pelanggan=g)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1})]),_:1}),l(u,{style:{width:"100%"},type:"primary",onClick:k,icon:e(ce)},{default:a(()=>[_(" SIMPAN ")]),_:1},8,["icon"])])}}},vl={class:"text-right"},yl=w("br",null,null,-1),Vl=w("br",null,null,-1),Cl=w("br",null,null,-1),wl=w("br",null,null,-1),Tl=w("br",null,null,-1),Sl={class:"el-dropdown-link"},Al=w("br",null,null,-1),El={class:"mb-2 flex"},Ul={class:"flex"},jl={__name:"JenisKendaraan",setup(T){const{getJenisKendaraanList:b}=Pe(),{showForm:d,formErrors:o,formModel:t,pageSize:s,tableData:k,loading:j,currentChange:p,sizeChange:A,openForm:v,save:P,deleteData:z,closeForm:N,requestData:$}=Re("/api/jenisKendaraan");return ye(()=>{$()}),(c,u)=>{const n=ue,i=Ve,r=se,E=we,U=Te,x=Se,V=Ce,g=Ee,h=fe,S=he,M=xe,J=ie,Y=ke,O=ze,X=Me;return y(),K(H,null,[w("div",vl,[l(n,{size:"small",icon:e(be),onClick:u[0]||(u[0]=m=>e(v)()),type:"primary"},{default:a(()=>[_(" TAMBAH JENIS KENDARAAN ")]),_:1},8,["icon"])]),yl,ae((y(),D(V,{data:e(k).data,stripe:""},{default:a(()=>[l(i,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(i,{prop:"nama",label:"Nama","min-width":"100px"}),l(i,{prop:"group",label:"Group","min-width":"100px"}),l(i,{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100px"}),l(i,{label:"Mode Tarif",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:m})=>[_(I(m.mode_tarif?"PROGRESIF":"FLAT"),1)]),_:1}),l(i,{label:"Mode Inap",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:m})=>[_(I(m.mode_menginap?"LEWAT TENGAH MALAM":"24 JAM DARI CHECK IN"),1)]),_:1}),l(i,{prop:"tarif_flat",label:"Tarif Flat",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:m})=>[_(I(("toRupiah"in c?c.toRupiah:e(ne))(m.tarif_flat)),1)]),_:1}),l(i,{label:"Tarif Non Flat","min-width":"250px"},{default:a(({row:m})=>[_(" Tarif "+I(m.menit_pertama)+" menit pertama = "+I(("toRupiah"in c?c.toRupiah:e(ne))(m.tarif_menit_pertama))+" ",1),Vl,_(" Tarif "+I(m.menit_selanjutnya)+" menit selanjutnya = "+I(("toRupiah"in c?c.toRupiah:e(ne))(m.tarif_menit_selanjutnya))+" ",1),Cl,_(" Tarif maksimal per hari = "+I(("toRupiah"in c?c.toRupiah:e(ne))(m.tarif_maksimum))+" ",1),wl,_(" Tarif menginap per hari = "+I(("toRupiah"in c?c.toRupiah:e(ne))(m.tarif_menginap))+" ",1),Tl]),_:1}),l(i,{prop:"denda_tiket_hilang",label:"Denda Tiket Hilang",align:"center","header-align":"center","min-width":"150px"},{default:a(({row:m})=>[_(I(("toRupiah"in c?c.toRupiah:e(ne))(m.denda_tiket_hilang)),1)]),_:1}),l(i,{width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(n,{link:"",onClick:e($),icon:e(oe)},null,8,["onClick","icon"])]),default:a(({row:m})=>[l(x,null,{dropdown:a(()=>[l(U,null,{default:a(()=>[l(E,{icon:e(Ue),onClick:B(R=>e(v)(m),["prevent"])},{default:a(()=>[_(" Edit ")]),_:2},1032,["icon","onClick"]),l(E,{icon:e(re),onClick:B(R=>e(z)(m.id,e(b)),["prevent"])},{default:a(()=>[_(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[w("span",Sl,[l(r,null,{default:a(()=>[l(e(ge))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[X,e(j)]]),Al,e(k).total?(y(),D(g,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(s),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(p),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ve("",!0),l(O,{modelValue:e(d),"onUpdate:modelValue":u[15]||(u[15]=m=>_e(d)?d.value=m:null),title:"JENIS KENDARAAN",width:"700px","close-on-click-modal":!1},{footer:a(()=>[l(n,{icon:e(je),onClick:e(N)},{default:a(()=>[_(" BATAL ")]),_:1},8,["icon","onClick"]),l(n,{icon:e(ce),type:"primary",onClick:u[14]||(u[14]=m=>e(P)(e(b)))},{default:a(()=>[_(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(Y,{"label-width":"200px","label-position":"left"},{default:a(()=>{var m,R,G,F,Z,f,ee,de,me;return[l(S,{label:"Nama",error:(m=e(o).nama)==null?void 0:m.join(", ")},{default:a(()=>[l(h,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":u[1]||(u[1]=C=>e(t).nama=C)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Group",error:(R=e(o).group)==null?void 0:R.join(", ")},{default:a(()=>[l(h,{placeholder:"Group",modelValue:e(t).group,"onUpdate:modelValue":u[2]||(u[2]=C=>e(t).group=C)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Shortcut Key",error:(G=e(o).shortcut_key)==null?void 0:G.join(", ")},{default:a(()=>[l(h,{maxlength:"1",placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":u[3]||(u[3]=C=>e(t).shortcut_key=C)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Mode Inap",error:(F=e(o).mode_menginap)==null?void 0:F.join(", ")},{default:a(()=>[l(J,{placeholder:"Mode Inap",modelValue:e(t).mode_menginap,"onUpdate:modelValue":u[4]||(u[4]=C=>e(t).mode_menginap=C),style:{width:"100%"}},{default:a(()=>[l(M,{value:0,label:"24 JAM DARI CHECK IN"}),l(M,{value:1,label:"LEWAT TENGAH MALAM"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Tarif menginap per hari (Rp)",error:(Z=e(o).tarif_menginap)==null?void 0:Z.join(", ")},{default:a(()=>[l(h,{type:"number",placeholder:"Tarif menginap per hari (Rp)",modelValue:e(t).tarif_menginap,"onUpdate:modelValue":u[5]||(u[5]=C=>e(t).tarif_menginap=C)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Denda Tiket Hilang (Rp)",error:(f=e(o).denda_tiket_hilang)==null?void 0:f.join(", ")},{default:a(()=>[l(h,{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)",modelValue:e(t).denda_tiket_hilang,"onUpdate:modelValue":u[6]||(u[6]=C=>e(t).denda_tiket_hilang=C)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Mode Tarif",error:(ee=e(o).mode_tarif)==null?void 0:ee.join(", ")},{default:a(()=>[l(J,{placeholder:"FLAT/PROGRESIF",modelValue:e(t).mode_tarif,"onUpdate:modelValue":u[7]||(u[7]=C=>e(t).mode_tarif=C),style:{width:"100%"}},{default:a(()=>[l(M,{value:0,label:"FLAT"}),l(M,{value:1,label:"PROGRESIF"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),ae(l(S,{label:"Tarif Flat (Rp)",error:(de=e(o).tarif_flat)==null?void 0:de.join(", ")},{default:a(()=>[l(h,{type:"number",step:500,placeholder:"Tarif Flat (Rp)",modelValue:e(t).tarif_flat,"onUpdate:modelValue":u[8]||(u[8]=C=>e(t).tarif_flat=C)},null,8,["modelValue"])]),_:1},8,["error"]),[[$e,e(t).mode_tarif===0]]),ae(l(S,{label:"Tarif maksimal per hari (Rp)",error:(me=e(o).tarif_maksimum)==null?void 0:me.join(", ")},{default:a(()=>[l(h,{type:"number",placeholder:"Tarif maksimal per hari (Rp)",modelValue:e(t).tarif_maksimum,"onUpdate:modelValue":u[9]||(u[9]=C=>e(t).tarif_maksimum=C)},null,8,["modelValue"])]),_:1},8,["error"]),[[$e,e(t).mode_tarif===1]]),ae(l(S,{label:"Tarif Progresif"},{default:a(()=>[w("div",El,[l(h,{type:"number",modelValue:e(t).menit_pertama,"onUpdate:modelValue":u[10]||(u[10]=C=>e(t).menit_pertama=C),style:{width:"250px"},class:"mr-2",placeholder:"Menit Pertama"},null,8,["modelValue"]),l(h,{type:"number",modelValue:e(t).tarif_menit_pertama,"onUpdate:modelValue":u[11]||(u[11]=C=>e(t).tarif_menit_pertama=C),placeholder:`Tarif ${e(t).menit_pertama} menit pertama (Rp)`},null,8,["modelValue","placeholder"])]),w("div",Ul,[l(h,{type:"number",modelValue:e(t).menit_selanjutnya,"onUpdate:modelValue":u[12]||(u[12]=C=>e(t).menit_selanjutnya=C),style:{width:"250px"},class:"mr-2",placeholder:"Menit Selanjutnya"},null,8,["modelValue"]),l(h,{type:"number",modelValue:e(t).tarif_menit_selanjutnya,"onUpdate:modelValue":u[13]||(u[13]=C=>e(t).tarif_menit_selanjutnya=C),placeholder:`Tarif ${e(t).menit_selanjutnya} menit selanjutnya (Rp)`},null,8,["modelValue","placeholder"])])]),_:1},512),[[$e,e(t).mode_tarif===1]])]}),_:1})]),_:1},8,["modelValue"])],64)}}},xl={class:"text-right"},Pl=w("br",null,null,-1),zl={class:"el-dropdown-link"},Ml=w("br",null,null,-1),Rl={__name:"Shift",setup(T){const{getShiftList:b}=Pe(),{showForm:d,formErrors:o,formModel:t,pageSize:s,tableData:k,loading:j,currentChange:p,sizeChange:A,openForm:v,save:P,deleteData:z,closeForm:N,requestData:$,refreshData:c}=Re("/api/shift");return ye(()=>{$()}),(u,n)=>{const i=ue,r=Ve,E=se,U=we,x=Te,V=Se,g=Ce,h=Ee,S=fe,M=he,J=hl,Y=ke,O=ze,X=Me;return y(),K(H,null,[w("div",xl,[l(i,{size:"small",icon:e(be),onClick:n[0]||(n[0]=m=>e(v)()),type:"primary"},{default:a(()=>[_(" TAMBAH SHIFT ")]),_:1},8,["icon"])]),Pl,ae((y(),D(g,{data:e(k).data,stripe:""},{default:a(()=>[l(r,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(r,{prop:"nama",label:"Nama"}),l(r,{prop:"mulai",label:"Mulai"}),l(r,{prop:"selesai",label:"Selesai"}),l(r,{fixed:"right",width:"60px","header-align":"center",align:"center"},{header:a(()=>[l(i,{link:"",onClick:e(c),icon:e(oe)},null,8,["onClick","icon"])]),default:a(({row:m})=>[l(V,null,{dropdown:a(()=>[l(x,null,{default:a(()=>[l(U,{icon:e(Ue),onClick:B(R=>e(v)(m),["prevent"])},{default:a(()=>[_(" Edit ")]),_:2},1032,["icon","onClick"]),l(U,{icon:e(re),onClick:B(R=>e(z)(m.id,u.getJenisKendaraanList),["prevent"])},{default:a(()=>[_(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[w("span",zl,[l(E,null,{default:a(()=>[l(e(ge))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[X,e(j)]]),Ml,e(k).total?(y(),D(h,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(s),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(p),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ve("",!0),l(O,{modelValue:e(d),"onUpdate:modelValue":n[5]||(n[5]=m=>_e(d)?d.value=m:null),title:"SHIFT",width:"450px","close-on-click-modal":!1},{footer:a(()=>[l(i,{icon:e(je),onClick:e(N)},{default:a(()=>[_(" BATAL ")]),_:1},8,["icon","onClick"]),l(i,{icon:e(ce),type:"primary",onClick:n[4]||(n[4]=m=>e(P)(e(b)))},{default:a(()=>[_(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(Y,{"label-width":"100px","label-position":"left"},{default:a(()=>{var m,R,G;return[l(M,{label:"Nama",error:(m=e(o).nama)==null?void 0:m.join(", ")},{default:a(()=>[l(S,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=F=>e(t).nama=F)},null,8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Mulai",error:(R=e(o).mulai)==null?void 0:R.join(", ")},{default:a(()=>[l(J,{style:{width:"100%"},modelValue:e(t).mulai,"onUpdate:modelValue":n[2]||(n[2]=F=>e(t).mulai=F),start:"00:00",step:"00:01",end:"23:59",placeholder:"Mulai"},null,8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Selesai",error:(G=e(o).selesai)==null?void 0:G.join(", ")},{default:a(()=>[l(J,{style:{width:"100%"},modelValue:e(t).selesai,"onUpdate:modelValue":n[3]||(n[3]=F=>e(t).selesai=F),start:"00:00",step:"00:01",end:"23:59",placeholder:"Selesai"},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},$l={class:"text-right"},Dl=w("br",null,null,-1),Nl={class:"el-dropdown-link"},Il=w("br",null,null,-1),Kl={__name:"AreaParkir",setup(T){const b=Pe(),{showForm:d,formErrors:o,formModel:t,pageSize:s,tableData:k,loading:j,currentChange:p,sizeChange:A,openForm:v,save:P,deleteData:z,closeForm:N,requestData:$}=Re("/api/areaParkir"),c=W(()=>b.jenisKendaraanList);return ye(()=>{$()}),(u,n)=>{const i=ue,r=Ve,E=se,U=we,x=Te,V=Se,g=Ce,h=Ee,S=fe,M=he,J=xe,Y=ie,O=ke,X=ze;return y(),K("div",null,[w("div",$l,[l(i,{size:"small",icon:e(be),onClick:n[0]||(n[0]=m=>e(v)()),type:"primary"},{default:a(()=>[_(" TAMBAH AREA PARKIR ")]),_:1},8,["icon"])]),Dl,l(g,{data:e(k).data,stripe:""},{default:a(()=>[l(r,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(r,{"min-width":"100",label:"Nama",prop:"nama"}),l(r,{"min-width":"100",label:"Keterangan",prop:"keterangan"}),l(r,{"min-width":"100",label:"Jenis Kendaraan"},{default:a(({row:m})=>[_(I(m.jenis_kendaraan.join(", ")),1)]),_:1}),l(r,{"min-width":"100",label:"Kapasitas",prop:"kapasitas","header-align":"center",align:"center"}),l(r,{"min-width":"100",label:"Terisi",prop:"terisi","header-align":"center",align:"center"}),l(r,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(i,{link:"",onClick:e($),icon:e(oe)},null,8,["onClick","icon"])]),default:a(({row:m})=>[l(V,null,{dropdown:a(()=>[l(x,null,{default:a(()=>[l(U,{icon:e(Ue),onClick:B(R=>e(v)(m),["prevent"])},{default:a(()=>[_(" Edit ")]),_:2},1032,["icon","onClick"]),l(U,{icon:e(re),onClick:B(R=>e(z)(m.id),["prevent"])},{default:a(()=>[_(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[w("span",Nl,[l(E,null,{default:a(()=>[l(e(ge))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Il,e(k).total?(y(),D(h,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(s),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(p),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ve("",!0),l(X,{modelValue:e(d),"onUpdate:modelValue":n[7]||(n[7]=m=>_e(d)?d.value=m:null),title:"AREA PARKIR",width:"500px","close-on-click-modal":!1},{footer:a(()=>[l(i,{icon:e(je),onClick:e(N)},{default:a(()=>[_(" BATAL ")]),_:1},8,["icon","onClick"]),l(i,{icon:e(ce),type:"primary",onClick:n[6]||(n[6]=m=>e(P)())},{default:a(()=>[_(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(O,{"label-width":"150px","label-position":"left"},{default:a(()=>{var m,R,G,F,Z;return[l(M,{label:"Nama",error:(m=e(o).nama)==null?void 0:m.join(", ")},{default:a(()=>[l(S,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=f=>e(t).nama=f)},null,8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Keterangan",error:(R=e(o).keterangan)==null?void 0:R.join(", ")},{default:a(()=>[l(S,{placeholder:"Keterangan",modelValue:e(t).keterangan,"onUpdate:modelValue":n[2]||(n[2]=f=>e(t).keterangan=f)},null,8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Jenis Kendaraan",error:(G=e(o).jenis_kendaraan)==null?void 0:G.join(", ")},{default:a(()=>[l(Y,{modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":n[3]||(n[3]=f=>e(t).jenis_kendaraan=f),placeholder:"Jenis Kendaraan",style:{width:"100%"},multiple:""},{default:a(()=>[(y(!0),K(H,null,Q(e(c),f=>(y(),D(J,{value:f.nama,label:f.nama,key:f.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Kapasitas",error:(F=e(o).kapasitas)==null?void 0:F.join(", ")},{default:a(()=>[l(S,{type:"number",placeholder:"Kapasitas",modelValue:e(t).kapasitas,"onUpdate:modelValue":n[4]||(n[4]=f=>e(t).kapasitas=f)},null,8,["modelValue"])]),_:1},8,["error"]),l(M,{label:"Terisi",error:(Z=e(o).terisi)==null?void 0:Z.join(", ")},{default:a(()=>[l(S,{type:"number",placeholder:"Terisi",modelValue:e(t).terisi,"onUpdate:modelValue":n[5]||(n[5]=f=>e(t).terisi=f)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])])}}},Fl={class:"el-dropdown-link"},Bl={__name:"Backup",setup(T){const b=Be(),d=le([]),o=le(!1),t=le(!1),s=le([]);ye(()=>{k()});const k=()=>{o.value=!0,b("/api/backup").then(c=>{d.value=c}).finally(()=>{o.value=!1})},j=c=>{Ie.confirm("Anda yakin akan menghapus file ini?","Konfirmasi",{type:"warning"}).then(()=>b("/api/backup",{method:"DELETE",body:{file:c}})).then(u=>{pe({message:u.message,type:"success",showClose:!0}),k()})},p=()=>{t.value=!0,b("/api/backup",{method:"POST"}).then(c=>{pe({message:c.message,type:"success",showClose:!0}),k()}).finally(()=>{t.value=!1})},A=c=>{Ie.confirm("Anda yakin akan me-restore database?","Konfirmasi",{type:"warning"}).then(()=>(o.value=!0,b("/api/backup",{method:"PUT",body:{file:c}}))).then(u=>{pe({message:u.message,type:"success",showClose:!0}),k()}).finally(()=>{o.value=!1})},v=()=>{document.querySelector("#input-file").click()},P=c=>{var u=new FormData;u.append("file",c.target.files[0]),b("/api/backup",{method:"POST",body:u},{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{pe({message:n.message,type:"success",showClose:!0}),k()}).finally(()=>{o.value=!1,document.querySelector("#input-file").value=""})},z=c=>{s.value=c.map(u=>u.file)},N=()=>{j(s.value)},$=c=>{window.open(c,"_blank")};return(c,u)=>{const n=ue,i=Ve,r=se,E=we,U=Te,x=Se,V=Ce,g=Me;return y(),K(H,null,[w("form",{class:"flex justify-content-end mb-3",inline:"",onSubmit:u[0]||(u[0]=B(()=>{},["prevent"]))},[l(n,{disabled:e(s).length==0,onClick:N,type:"danger",icon:e(re),size:"small",title:"Hapus File Backup"},{default:a(()=>[_(" HAPUS FILE BACKUP ")]),_:1},8,["disabled","icon"]),l(n,{onClick:v,type:"primary",class:"mr-2",icon:e(al),size:"small",title:"Upload File Backup"},{default:a(()=>[_(" UPLOAD FILE BACKUP ")]),_:1},8,["icon"]),w("input",{type:"file",style:{display:"none"},id:"input-file",onChange:P},null,32),l(n,{onClick:p,type:"primary",icon:e(be),size:"small",title:"Generate Backup",loading:e(t)},{default:a(()=>[_(" GENERATE BACKUP ")]),_:1},8,["icon","loading"])],32),ae((y(),D(V,{data:e(d),stripe:"",height:"calc(100vh - 200px)",onSelectionChange:z},{default:a(()=>[l(i,{type:"selection",width:"55",align:"center","header-align":"center"}),l(i,{type:"index",label:"#"}),l(i,{prop:"tanggal",label:"Tanggal",width:"200"}),l(i,{prop:"file",label:"File"}),l(i,{prop:"size",label:"Ukuran",width:"100",align:"right","header-align":"right"}),l(i,{width:"60",align:"center","header-align":"center"},{header:a(()=>[l(n,{link:"",onClick:k,icon:e(oe)},null,8,["icon"])]),default:a(({row:h})=>[l(x,null,{dropdown:a(()=>[l(U,null,{default:a(()=>[l(E,{icon:e(nl),onClick:B(S=>$(h.url),["prevent"])},{default:a(()=>[_("Download")]),_:2},1032,["icon","onClick"]),l(E,{icon:e(oe),onClick:B(S=>A(h.file),["prevent"])},{default:a(()=>[_(" Restore ")]),_:2},1032,["icon","onClick"]),l(E,{icon:e(re),onClick:B(S=>j(h.file),["prevent"])},{default:a(()=>[_(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[w("span",Fl,[l(r,null,{default:a(()=>[l(e(ge))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[g,e(o)]])],64)}}},Ll=w("br",null,null,-1),Hl={class:"el-dropdown-link"},Ol=w("br",null,null,-1),Gl={__name:"User",setup(T){const{showForm:b,formErrors:d,formModel:o,pageSize:t,tableData:s,loading:k,keyword:j,currentChange:p,sizeChange:A,sortChange:v,openForm:P,save:z,deleteData:N,closeForm:$,requestData:c,searchData:u,refreshData:n}=Re("/api/user");return ye(()=>{c()}),(i,r)=>{const E=ue,U=fe,x=Ve,V=rl,g=se,h=we,S=Te,M=Se,J=Ce,Y=Ee,O=he,X=xe,m=ie,R=pl,G=ke,F=ze,Z=Me;return y(),K(H,null,[w("form",{class:"flex justify-content-end",onSubmit:r[2]||(r[2]=B((...f)=>e(u)&&e(u)(...f),["prevent"]))},[l(E,{size:"small",onClick:r[0]||(r[0]=f=>e(P)({role:0,password:""})),type:"primary",icon:e(be),class:"mr-2"},{default:a(()=>[_(" TAMBAH USER ")]),_:1},8,["icon"]),l(U,{size:"small",modelValue:e(j),"onUpdate:modelValue":r[1]||(r[1]=f=>_e(j)?j.value=f:null),placeholder:"Cari",style:{width:"180px"},"prefix-icon":e(tl),clearable:!0},null,8,["modelValue","prefix-icon"])],32),Ll,ae((y(),D(J,{stripe:"",data:e(s).data,onSortChange:e(v)},{default:a(()=>[l(x,{type:"index",index:e(s).from,label:"#"},null,8,["index"]),l(x,{prop:"name",label:"Nama",sortable:"custom"}),l(x,{prop:"role",label:"Level",sortable:"custom"},{default:a(({row:f})=>[_(I(f.role?"Admin":"Operator"),1)]),_:1}),l(x,{prop:"status",label:"Status",sortable:"custom",align:"center","header-align":"center",width:"100"},{default:a(({row:f})=>[l(V,{type:f.status?"success":"info",size:"small",style:{width:"100%"},effect:"dark"},{default:a(()=>[_(I(f.status?"Aktif":"Nonaktif"),1)]),_:2},1032,["type"])]),_:1}),l(x,{width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(E,{link:"",onClick:e(n),icon:e(oe)},null,8,["onClick","icon"])]),default:a(({row:f})=>[l(M,null,{dropdown:a(()=>[l(S,null,{default:a(()=>[l(h,{icon:e(Ue),onClick:B(ee=>e(P)(f),["prevent"])},{default:a(()=>[_(" Edit ")]),_:2},1032,["icon","onClick"]),l(h,{icon:e(re),onClick:B(ee=>e(N)(f.id),["prevent"])},{default:a(()=>[_(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[w("span",Hl,[l(g,null,{default:a(()=>[l(e(ge))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onSortChange"])),[[Z,e(k)]]),Ol,e(s).total?(y(),D(Y,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(t),"page-sizes":[10,25,50,100],total:e(s).total,onCurrentChange:e(p),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ve("",!0),l(F,{modelValue:e(b),"onUpdate:modelValue":r[9]||(r[9]=f=>_e(b)?b.value=f:null),width:"500px",title:e(o).id?"EDIT USER":"TAMBAH USER","close-on-click-modal":!1},{footer:a(()=>[l(E,{icon:e(je),onClick:e($)},{default:a(()=>[_(" BATAL ")]),_:1},8,["icon","onClick"]),l(E,{icon:e(ce),type:"primary",onClick:r[8]||(r[8]=f=>e(z)())},{default:a(()=>[_(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(G,{"label-width":"160px","label-position":"left"},{default:a(()=>{var f,ee,de,me,C;return[l(O,{label:"Nama",error:(f=e(d).name)==null?void 0:f.join(", ")},{default:a(()=>[l(U,{placeholder:"Nama",modelValue:e(o).name,"onUpdate:modelValue":r[3]||(r[3]=L=>e(o).name=L)},null,8,["modelValue"])]),_:1},8,["error"]),l(O,{label:"Level",error:(ee=e(d).role)==null?void 0:ee.join(", ")},{default:a(()=>[l(m,{modelValue:e(o).role,"onUpdate:modelValue":r[4]||(r[4]=L=>e(o).role=L),placeholder:"Level",style:{width:"100%"}},{default:a(()=>[(y(),K(H,null,Q([{value:0,label:"Operator"},{value:1,label:"Admin"}],(L,Oe)=>l(X,{value:L.value,label:L.label,key:Oe},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(O,{label:"Password",error:(de=e(d).password)==null?void 0:de.join(", ")},{default:a(()=>[l(U,{type:"password",placeholder:"Password",modelValue:e(o).password,"onUpdate:modelValue":r[5]||(r[5]=L=>e(o).password=L)},null,8,["modelValue"])]),_:1},8,["error"]),l(O,{label:"Konfirmasi Password",error:(me=e(d).password)==null?void 0:me.join(", ")},{default:a(()=>[l(U,{type:"password",placeholder:"Konfirmasi Password",modelValue:e(o).password_confirmation,"onUpdate:modelValue":r[6]||(r[6]=L=>e(o).password_confirmation=L)},null,8,["modelValue"])]),_:1},8,["error"]),l(O,{label:"Status",error:(C=e(d).status)==null?void 0:C.join(", ")},{default:a(()=>[l(R,{"active-value":!0,"inactive-value":!1,modelValue:e(o).status,"onUpdate:modelValue":r[7]||(r[7]=L=>e(o).status=L),"active-color":"#13ce66"},null,8,["modelValue"]),l(V,{type:e(o).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:a(()=>[_(I(e(o).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue","title"])],64)}}},ma={__name:"setting",setup(T){const b=[{label:"Pengaturan Umum",component:kl},{label:"Jenis Kendaraan & Tarif",component:jl},{label:"User",component:Gl},{label:"Shift",component:Rl},{label:"Area Parkir",component:Kl},{label:"Backup & Restore",component:Bl}];return(d,o)=>{const t=Je,s=Ge;return y(),D(s,null,{default:a(()=>[(y(),K(H,null,Q(b,(k,j)=>l(t,{lazy:"",key:j,label:k.label.toUpperCase()},{default:a(()=>[(y(),D(He(k.component)))]),_:2},1032,["label"])),64))]),_:1})}}};export{ma as default};
