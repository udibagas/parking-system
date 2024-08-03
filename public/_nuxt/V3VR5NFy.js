import{E as _e,a as ce,b as Ae,d as Oe,c as Ge}from"./CIv3F_fu.js";import{b as Je,e as Ne,u as qe,_ as We}from"./PCoquCIv.js";import{u as Qe,O as Ye,P as Xe,b as Ze,M as el,n as re,s as fe,t as me,o as be,E as ie,p as ge,r as ne,j as Ee,k as te,m as ke,l as xe,Q as ll,A as al,z as nl}from"./DqHsojZP.js";import{E as he,a as ve}from"./BQLTMqPt.js";import{c as tl,b as oe,a as Ue,u as je,E as ol}from"./FMEpvrbw.js";import{a as rl,E as il}from"./BvKf6nDs.js";import{u as Re,v as Pe,E as Ie}from"./BvEecX3s.js";import{u as ze,E as Me}from"./QmKkmSH8.js";import{d as Be,r as ee,c as W,t as v,T as N,A as a,I as e,K as sl,Y as Le,U as ye,v as F,V as H,W as Q,Q as ul,z as l,B as m,o as Ve,x as C,G as le,y as K,L as B,a3 as $e,J as pe}from"./C96A3IUC.js";import{E as Ce,a as we,b as Te}from"./BkKb2xio.js";import"./l0sNRNKZ.js";import{d as Ke,c as dl}from"./CY9tAmGA.js";import{E as ml}from"./BSVThvUQ.js";import"./Cpj98o6Y.js";const pl=Je({format:{type:String,default:"HH:mm"},modelValue:String,disabled:Boolean,editable:{type:Boolean,default:!0},effect:{type:String,default:"light"},clearable:{type:Boolean,default:!0},size:Qe,placeholder:String,start:{type:String,default:"09:00"},end:{type:String,default:"18:00"},step:{type:String,default:"00:30"},minTime:String,maxTime:String,name:String,prefixIcon:{type:Ne([String,Object]),default:()=>Ye},clearIcon:{type:Ne([String,Object]),default:()=>Xe},...tl}),J=T=>{const f=(T||"").split(":");if(f.length>=2){let u=Number.parseInt(f[0],10);const o=Number.parseInt(f[1],10),t=T.toUpperCase();return t.includes("AM")&&u===12?u=0:t.includes("PM")&&u!==12&&(u+=12),{hours:u,minutes:o}}return null},De=(T,f)=>{const u=J(T);if(!u)return-1;const o=J(f);if(!o)return-1;const t=u.minutes+u.hours*60,i=o.minutes+o.hours*60;return t===i?0:t>i?1:-1},Fe=T=>`${T}`.padStart(2,"0"),ae=T=>`${Fe(T.hours)}:${Fe(T.minutes)}`,_l=(T,f)=>{const u=J(T);if(!u)return"";const o=J(f);if(!o)return"";const t={hours:u.hours,minutes:u.minutes};return t.minutes+=o.minutes,t.hours+=o.hours,t.hours+=Math.floor(t.minutes/60),t.minutes=t.minutes%60,ae(t)},cl=Be({name:"ElTimeSelect"}),fl=Be({...cl,props:pl,emits:["change","blur","focus","update:modelValue"],setup(T,{expose:f}){const u=T;Ke.extend(dl);const{Option:o}=oe,t=qe("input"),i=ee(),k=Ze(),{lang:P}=el(),d=W(()=>u.modelValue),A=W(()=>{const n=J(u.start);return n?ae(n):null}),h=W(()=>{const n=J(u.end);return n?ae(n):null}),M=W(()=>{const n=J(u.step);return n?ae(n):null}),$=W(()=>{const n=J(u.minTime||"");return n?ae(n):null}),I=W(()=>{const n=J(u.maxTime||"");return n?ae(n):null}),D=W(()=>{const n=[];if(u.start&&u.end&&u.step){let s=A.value,r;for(;s&&h.value&&De(s,h.value)<=0;)r=Ke(s,"HH:mm").locale(P.value).format(u.format),n.push({value:r,disabled:De(s,$.value||"-1:-1")<=0||De(s,I.value||"100:100")>=0}),s=_l(s,M.value)}return n});return f({blur:()=>{var n,s;(s=(n=i.value)==null?void 0:n.blur)==null||s.call(n)},focus:()=>{var n,s;(s=(n=i.value)==null?void 0:n.focus)==null||s.call(n)}}),(n,s)=>(v(),N(e(oe),{ref_key:"select",ref:i,"model-value":e(d),disabled:e(k),clearable:n.clearable,"clear-icon":n.clearIcon,size:n.size,effect:n.effect,placeholder:n.placeholder,"default-first-option":"",filterable:n.editable,"empty-values":n.emptyValues,"value-on-clear":n.valueOnClear,"onUpdate:modelValue":s[0]||(s[0]=r=>n.$emit("update:modelValue",r)),onChange:s[1]||(s[1]=r=>n.$emit("change",r)),onBlur:s[2]||(s[2]=r=>n.$emit("blur",r)),onFocus:s[3]||(s[3]=r=>n.$emit("focus",r))},{prefix:a(()=>[n.prefixIcon?(v(),N(e(re),{key:0,class:sl(e(t).e("prefix-icon"))},{default:a(()=>[(v(),N(Le(n.prefixIcon)))]),_:1},8,["class"])):ye("v-if",!0)]),default:a(()=>[(v(!0),F(H,null,Q(e(D),r=>(v(),N(e(o),{key:r.value,label:r.value,value:r.value,disabled:r.disabled},null,8,["label","value","disabled"]))),128))]),_:1},8,["model-value","disabled","clearable","clear-icon","size","effect","placeholder","filterable","empty-values","value-on-clear"]))}});var Se=We(fl,[["__file","time-select.vue"]]);Se.install=T=>{T.component(Se.name,Se)};const bl=Se,gl=bl,kl={__name:"General",setup(T){const f=ze(),u=Re(),o=ee({}),t=ee(!1),i=ul({...f.setting}),k=async()=>{t.value=!0;let P="/api/setting";i.id&&(P+=`/${i.id}`);try{await u(P,{method:i.id?"PUT":"POST",body:i}),me({message:"Data berhasil disimpan.",type:"success",showClose:!0}),f.getSetting()}catch(d){d.response.status==422?o.value=d.response._data.errors:o.value={}}t.value=!1};return(P,d)=>{const A=be,h=he,M=Ue,$=oe,I=rl,D=il,b=ve,E=ie;return v(),F("div",null,[l(b,{"label-position":"left","label-width":"250px"},{default:a(()=>[l(D,{gutter:20},{default:a(()=>[l(I,{span:12},{default:a(()=>{var n,s,r,j,x,z;return[l(h,{label:"Nama Lokasi",error:(n=e(o).nama_lokasi)==null?void 0:n.join(", ")},{default:a(()=>[l(A,{placeholder:"Nama Lokasi",modelValue:e(i).nama_lokasi,"onUpdate:modelValue":d[0]||(d[0]=y=>e(i).nama_lokasi=y)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Alamat Lokasi",error:(s=e(o).alamat_lokasi)==null?void 0:s.join(", ")},{default:a(()=>[l(A,{placeholder:"Alamat Lokasi",type:"textarea",rows:"3",modelValue:e(i).alamat_lokasi,"onUpdate:modelValue":d[1]||(d[1]=y=>e(i).alamat_lokasi=y)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Info Tambahan Tiket",error:(r=e(o).info_tambahan_tiket)==null?void 0:r.join(", ")},{default:a(()=>[l(A,{placeholder:"Info Tambahan Tiket",type:"textarea",rows:"3",modelValue:e(i).info_tambahan_tiket,"onUpdate:modelValue":d[2]||(d[2]=y=>e(i).info_tambahan_tiket=y)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Plat Nomor Default",error:(j=e(o).plat_nomor_default)==null?void 0:j.join(", ")},{default:a(()=>[l(A,{placeholder:"Plat Nomor Default",modelValue:e(i).plat_nomor_default,"onUpdate:modelValue":d[3]||(d[3]=y=>e(i).plat_nomor_default=y)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Jumlah Kendaraan Per Kartu",error:(x=e(o).jml_kendaraan_per_kartu)==null?void 0:x.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)",modelValue:e(i).jml_kendaraan_per_kartu,"onUpdate:modelValue":d[4]||(d[4]=y=>e(i).jml_kendaraan_per_kartu=y)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Orientasi Kamera",error:(z=e(o).orientasi_kamera)==null?void 0:z.join(", ")},{default:a(()=>[l($,{placeholder:"Orientasi Kamera",modelValue:e(i).orientasi_kamera,"onUpdate:modelValue":d[5]||(d[5]=y=>e(i).orientasi_kamera=y),style:{width:"100%"}},{default:a(()=>[(v(),F(H,null,Q(["LANDSCAPE","POTRAIT"],(y,g)=>l(M,{key:g,value:y,label:y},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1}),l(I,{span:12},{default:a(()=>{var n,s,r,j,x,z,y;return[l(h,{label:"Mode Transaksi Member",error:(n=e(o).must_checkout)==null?void 0:n.join(", ")},{default:a(()=>[l($,{placeholder:"Mode Transaksi Member",modelValue:e(i).must_checkout,"onUpdate:modelValue":d[6]||(d[6]=g=>e(i).must_checkout=g),style:{width:"100%"}},{default:a(()=>[(v(),F(H,null,Q(["Tidak harus check out","Harus check out"],(g,U)=>l(M,{key:U,value:U,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Mode Buka Gate Untuk Member",error:(s=e(o).member_auto_open)==null?void 0:s.join(", ")},{default:a(()=>[l($,{placeholder:"Mode Buka Gate Untuk Member",modelValue:e(i).member_auto_open,"onUpdate:modelValue":d[7]||(d[7]=g=>e(i).member_auto_open=g),style:{width:"100%"}},{default:a(()=>[(v(),F(H,null,Q(["Ketik Plat Nomor (Buka oleh operator)","Tempel Kartu (Otomatis)"],(g,U)=>l(M,{key:U,value:U,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Disable Plat Nomor di Pos Keluar",error:(r=e(o).disable_plat_nomor)==null?void 0:r.join(", ")},{default:a(()=>[l($,{placeholder:"Disable Plat Nomor di Pos Keluar",modelValue:e(i).disable_plat_nomor,"onUpdate:modelValue":d[8]||(d[8]=g=>e(i).disable_plat_nomor=g),style:{width:"100%"}},{default:a(()=>[(v(),F(H,null,Q(["Tidak","Ya"],(g,U)=>l(M,{key:U,value:!!U,label:g},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Hapus Snapshot dalam x hari",error:(j=e(o).hapus_snapshot_dalam_hari)==null?void 0:j.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Hapus Snapshot dalam x hari (0 untuk hapus manual)",modelValue:e(i).hapus_snapshot_dalam_hari,"onUpdate:modelValue":d[9]||(d[9]=g=>e(i).hapus_snapshot_dalam_hari=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Hapus Transaksi dalam x hari",error:(x=e(o).hapus_transaksi_dalam_hari)==null?void 0:x.join(", ")},{default:a(()=>[l(A,{type:"number",placeholder:"Hapus Transaksi dalam x hari",modelValue:e(i).hapus_transaksi_dalam_hari,"onUpdate:modelValue":d[10]||(d[10]=g=>e(i).hapus_transaksi_dalam_hari=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"Server Address",error:(z=e(o).server_address)==null?void 0:z.join(", ")},{default:a(()=>[l(A,{placeholder:"Server Address",modelValue:e(i).server_address,"onUpdate:modelValue":d[11]||(d[11]=g=>e(i).server_address=g)},null,8,["modelValue"])]),_:1},8,["error"]),l(h,{label:"ID Pelanggan",error:(y=e(o).id_pelanggan)==null?void 0:y.join(", ")},{default:a(()=>[l(A,{placeholder:"ID Pelanggan",modelValue:e(i).id_pelanggan,"onUpdate:modelValue":d[12]||(d[12]=g=>e(i).id_pelanggan=g)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1})]),_:1}),l(E,{style:{width:"100%"},type:"primary",onClick:k,icon:e(fe)},{default:a(()=>[m(" SIMPAN ")]),_:1},8,["icon"])])}}},hl={class:"text-right"},vl=C("br",null,null,-1),yl=C("br",null,null,-1),Vl=C("br",null,null,-1),Cl=C("br",null,null,-1),wl=C("br",null,null,-1),Tl={class:"el-dropdown-link"},Sl=C("br",null,null,-1),Al={class:"mb-2 flex"},El={class:"flex"},xl={__name:"JenisKendaraan",setup(T){const{getJenisKendaraanList:f}=ze(),{showForm:u,formErrors:o,formModel:t,pageSize:i,tableData:k,loading:P,currentChange:d,sizeChange:A,openForm:h,save:M,deleteData:$,closeForm:I,requestData:D,toRupiah:b}=je("/api/jenisKendaraan");return Ve(()=>{D()}),(E,n)=>{const s=ie,r=_e,j=re,x=Ce,z=we,y=Te,g=ce,U=Ae,w=be,S=he,O=Ue,q=oe,G=ve,Y=Me,V=Pe;return v(),F(H,null,[C("div",hl,[l(s,{size:"small",icon:e(ge),onClick:n[0]||(n[0]=_=>e(h)()),type:"primary"},{default:a(()=>[m(" TAMBAH JENIS KENDARAAN ")]),_:1},8,["icon"])]),vl,le((v(),N(g,{data:e(k).data,stripe:""},{default:a(()=>[l(r,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(r,{prop:"nama",label:"Nama","min-width":"100px"}),l(r,{prop:"group",label:"Group","min-width":"100px"}),l(r,{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100px"}),l(r,{label:"Mode Tarif",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:_})=>[m(K(_.mode_tarif?"PROGRESIF":"FLAT"),1)]),_:1}),l(r,{label:"Mode Inap",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:_})=>[m(K(_.mode_menginap?"LEWAT TENGAH MALAM":"24 JAM DARI CHECK IN"),1)]),_:1}),l(r,{prop:"tarif_flat",label:"Tarif Flat",align:"center","header-align":"center","min-width":"120px"},{default:a(({row:_})=>[m(K(e(b)(_.tarif_flat)),1)]),_:1}),l(r,{label:"Tarif Non Flat","min-width":"250px"},{default:a(({row:_})=>[m(" Tarif "+K(_.menit_pertama)+" menit pertama = "+K(e(b)(_.tarif_menit_pertama))+" ",1),yl,m(" Tarif "+K(_.menit_selanjutnya)+" menit selanjutnya = "+K(e(b)(_.tarif_menit_selanjutnya))+" ",1),Vl,m(" Tarif maksimal per hari = "+K(e(b)(_.tarif_maksimum))+" ",1),Cl,m(" Tarif menginap per hari = "+K(e(b)(_.tarif_menginap))+" ",1),wl]),_:1}),l(r,{prop:"denda_tiket_hilang",label:"Denda Tiket Hilang",align:"center","header-align":"center","min-width":"150px"},{default:a(({row:_})=>[m(K(e(b)(_.denda_tiket_hilang)),1)]),_:1}),l(r,{width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(s,{link:"",onClick:e(D),icon:e(ne)},null,8,["onClick","icon"])]),default:a(({row:_})=>[l(y,null,{dropdown:a(()=>[l(z,null,{default:a(()=>[l(x,{icon:e(Ee),onClick:B(L=>e(h)(_),["prevent"])},{default:a(()=>[m(" Edit ")]),_:2},1032,["icon","onClick"]),l(x,{icon:e(te),onClick:B(L=>e($)(_.id,e(f)),["prevent"])},{default:a(()=>[m(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[C("span",Tl,[l(j,null,{default:a(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[V,e(P)]]),Sl,e(k).total?(v(),N(U,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(d),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ye("",!0),l(Y,{modelValue:e(u),"onUpdate:modelValue":n[15]||(n[15]=_=>pe(u)?u.value=_:null),title:"JENIS KENDARAAN",width:"700px","close-on-click-modal":!1},{footer:a(()=>[l(s,{icon:e(xe),onClick:e(I)},{default:a(()=>[m(" BATAL ")]),_:1},8,["icon","onClick"]),l(s,{icon:e(fe),type:"primary",onClick:n[14]||(n[14]=_=>e(M)(e(f)))},{default:a(()=>[m(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(G,{"label-width":"200px","label-position":"left"},{default:a(()=>{var _,L,R,X,c,Z,se,ue,de;return[l(S,{label:"Nama",error:(_=e(o).nama)==null?void 0:_.join(", ")},{default:a(()=>[l(w,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=p=>e(t).nama=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Group",error:(L=e(o).group)==null?void 0:L.join(", ")},{default:a(()=>[l(w,{placeholder:"Group",modelValue:e(t).group,"onUpdate:modelValue":n[2]||(n[2]=p=>e(t).group=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Shortcut Key",error:(R=e(o).shortcut_key)==null?void 0:R.join(", ")},{default:a(()=>[l(w,{maxlength:"1",placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":n[3]||(n[3]=p=>e(t).shortcut_key=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Mode Inap",error:(X=e(o).mode_menginap)==null?void 0:X.join(", ")},{default:a(()=>[l(q,{placeholder:"Mode Inap",modelValue:e(t).mode_menginap,"onUpdate:modelValue":n[4]||(n[4]=p=>e(t).mode_menginap=p),style:{width:"100%"}},{default:a(()=>[l(O,{value:0,label:"24 JAM DARI CHECK IN"}),l(O,{value:1,label:"LEWAT TENGAH MALAM"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Tarif menginap per hari (Rp)",error:(c=e(o).tarif_menginap)==null?void 0:c.join(", ")},{default:a(()=>[l(w,{type:"number",placeholder:"Tarif menginap per hari (Rp)",modelValue:e(t).tarif_menginap,"onUpdate:modelValue":n[5]||(n[5]=p=>e(t).tarif_menginap=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Denda Tiket Hilang (Rp)",error:(Z=e(o).denda_tiket_hilang)==null?void 0:Z.join(", ")},{default:a(()=>[l(w,{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)",modelValue:e(t).denda_tiket_hilang,"onUpdate:modelValue":n[6]||(n[6]=p=>e(t).denda_tiket_hilang=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Mode Tarif",error:(se=e(o).mode_tarif)==null?void 0:se.join(", ")},{default:a(()=>[l(q,{placeholder:"FLAT/PROGRESIF",modelValue:e(t).mode_tarif,"onUpdate:modelValue":n[7]||(n[7]=p=>e(t).mode_tarif=p),style:{width:"100%"}},{default:a(()=>[l(O,{value:0,label:"FLAT"}),l(O,{value:1,label:"PROGRESIF"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),le(l(S,{label:"Tarif Flat (Rp)",error:(ue=e(o).tarif_flat)==null?void 0:ue.join(", ")},{default:a(()=>[l(w,{type:"number",step:500,placeholder:"Tarif Flat (Rp)",modelValue:e(t).tarif_flat,"onUpdate:modelValue":n[8]||(n[8]=p=>e(t).tarif_flat=p)},null,8,["modelValue"])]),_:1},8,["error"]),[[$e,e(t).mode_tarif===0]]),le(l(S,{label:"Tarif maksimal per hari (Rp)",error:(de=e(o).tarif_maksimum)==null?void 0:de.join(", ")},{default:a(()=>[l(w,{type:"number",placeholder:"Tarif maksimal per hari (Rp)",modelValue:e(t).tarif_maksimum,"onUpdate:modelValue":n[9]||(n[9]=p=>e(t).tarif_maksimum=p)},null,8,["modelValue"])]),_:1},8,["error"]),[[$e,e(t).mode_tarif===1]]),le(l(S,{label:"Tarif Progresif"},{default:a(()=>[C("div",Al,[l(w,{type:"number",modelValue:e(t).menit_pertama,"onUpdate:modelValue":n[10]||(n[10]=p=>e(t).menit_pertama=p),style:{width:"250px"},class:"mr-2",placeholder:"Menit Pertama"},null,8,["modelValue"]),l(w,{type:"number",modelValue:e(t).tarif_menit_pertama,"onUpdate:modelValue":n[11]||(n[11]=p=>e(t).tarif_menit_pertama=p),placeholder:`Tarif ${e(t).menit_pertama} menit pertama (Rp)`},null,8,["modelValue","placeholder"])]),C("div",El,[l(w,{type:"number",modelValue:e(t).menit_selanjutnya,"onUpdate:modelValue":n[12]||(n[12]=p=>e(t).menit_selanjutnya=p),style:{width:"250px"},class:"mr-2",placeholder:"Menit Selanjutnya"},null,8,["modelValue"]),l(w,{type:"number",modelValue:e(t).tarif_menit_selanjutnya,"onUpdate:modelValue":n[13]||(n[13]=p=>e(t).tarif_menit_selanjutnya=p),placeholder:`Tarif ${e(t).menit_selanjutnya} menit selanjutnya (Rp)`},null,8,["modelValue","placeholder"])])]),_:1},512),[[$e,e(t).mode_tarif===1]])]}),_:1})]),_:1},8,["modelValue"])],64)}}},Ul={class:"text-right"},jl=C("br",null,null,-1),Pl={class:"el-dropdown-link"},zl=C("br",null,null,-1),Ml={__name:"Shift",setup(T){const{getShiftList:f}=ze(),{showForm:u,formErrors:o,formModel:t,pageSize:i,tableData:k,loading:P,currentChange:d,sizeChange:A,openForm:h,save:M,deleteData:$,closeForm:I,requestData:D,refreshData:b}=je("/api/shift");return Ve(()=>{D()}),(E,n)=>{const s=ie,r=_e,j=re,x=Ce,z=we,y=Te,g=ce,U=Ae,w=be,S=he,O=gl,q=ve,G=Me,Y=Pe;return v(),F(H,null,[C("div",Ul,[l(s,{size:"small",icon:e(ge),onClick:n[0]||(n[0]=V=>e(h)()),type:"primary"},{default:a(()=>[m(" TAMBAH SHIFT ")]),_:1},8,["icon"])]),jl,le((v(),N(g,{data:e(k).data,stripe:""},{default:a(()=>[l(r,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(r,{prop:"nama",label:"Nama"}),l(r,{prop:"mulai",label:"Mulai"}),l(r,{prop:"selesai",label:"Selesai"}),l(r,{fixed:"right",width:"60px","header-align":"center",align:"center"},{header:a(()=>[l(s,{link:"",onClick:e(b),icon:e(ne)},null,8,["onClick","icon"])]),default:a(({row:V})=>[l(y,null,{dropdown:a(()=>[l(z,null,{default:a(()=>[l(x,{icon:e(Ee),onClick:B(_=>e(h)(V),["prevent"])},{default:a(()=>[m(" Edit ")]),_:2},1032,["icon","onClick"]),l(x,{icon:e(te),onClick:B(_=>e($)(V.id,E.getJenisKendaraanList),["prevent"])},{default:a(()=>[m(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[C("span",Pl,[l(j,null,{default:a(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[Y,e(P)]]),zl,e(k).total?(v(),N(U,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(d),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ye("",!0),l(G,{modelValue:e(u),"onUpdate:modelValue":n[5]||(n[5]=V=>pe(u)?u.value=V:null),title:"SHIFT",width:"450px","close-on-click-modal":!1},{footer:a(()=>[l(s,{icon:e(xe),onClick:e(I)},{default:a(()=>[m(" BATAL ")]),_:1},8,["icon","onClick"]),l(s,{icon:e(fe),type:"primary",onClick:n[4]||(n[4]=V=>e(M)(e(f)))},{default:a(()=>[m(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(q,{"label-width":"100px","label-position":"left"},{default:a(()=>{var V,_,L;return[l(S,{label:"Nama",error:(V=e(o).nama)==null?void 0:V.join(", ")},{default:a(()=>[l(w,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=R=>e(t).nama=R)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Mulai",error:(_=e(o).mulai)==null?void 0:_.join(", ")},{default:a(()=>[l(O,{style:{width:"100%"},modelValue:e(t).mulai,"onUpdate:modelValue":n[2]||(n[2]=R=>e(t).mulai=R),"picker-options":{start:"00:00",step:"00:30",end:"24:00"},placeholder:"Mulai"},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Selesai",error:(L=e(o).selesai)==null?void 0:L.join(", ")},{default:a(()=>[l(O,{style:{width:"100%"},modelValue:e(t).selesai,"onUpdate:modelValue":n[3]||(n[3]=R=>e(t).selesai=R),"picker-options":{start:"00:00",step:"00:30",end:"24:00"},placeholder:"Selesai"},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},$l={class:"text-right"},Dl=C("br",null,null,-1),Nl={class:"el-dropdown-link"},Il=C("br",null,null,-1),Kl={__name:"AreaParkir",setup(T){const f=ze(),{showForm:u,formErrors:o,formModel:t,pageSize:i,tableData:k,loading:P,currentChange:d,sizeChange:A,openForm:h,save:M,deleteData:$,closeForm:I,requestData:D}=je("/api/areaParkir"),b=W(()=>f.jenisKendaraanList);return Ve(()=>{D()}),(E,n)=>{const s=ie,r=_e,j=re,x=Ce,z=we,y=Te,g=ce,U=Ae,w=be,S=he,O=Ue,q=oe,G=ve,Y=Me;return v(),F("div",null,[C("div",$l,[l(s,{size:"small",icon:e(ge),onClick:n[0]||(n[0]=V=>e(h)()),type:"primary"},{default:a(()=>[m(" TAMBAH AREA PARKIR ")]),_:1},8,["icon"])]),Dl,l(g,{data:e(k).data,stripe:""},{default:a(()=>[l(r,{type:"index",index:e(k).from,label:"#"},null,8,["index"]),l(r,{"min-width":"100",label:"Nama",prop:"nama"}),l(r,{"min-width":"100",label:"Keterangan",prop:"keterangan"}),l(r,{"min-width":"100",label:"Jenis Kendaraan"},{default:a(({row:V})=>[m(K(V.jenis_kendaraan.join(", ")),1)]),_:1}),l(r,{"min-width":"100",label:"Kapasitas",prop:"kapasitas","header-align":"center",align:"center"}),l(r,{"min-width":"100",label:"Terisi",prop:"terisi","header-align":"center",align:"center"}),l(r,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(s,{link:"",onClick:e(D),icon:e(ne)},null,8,["onClick","icon"])]),default:a(({row:V})=>[l(y,null,{dropdown:a(()=>[l(z,null,{default:a(()=>[l(x,{icon:e(Ee),onClick:B(_=>e(h)(V),["prevent"])},{default:a(()=>[m(" Edit ")]),_:2},1032,["icon","onClick"]),l(x,{icon:e(te),onClick:B(_=>e($)(V.id),["prevent"])},{default:a(()=>[m(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[C("span",Nl,[l(j,null,{default:a(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Il,e(k).total?(v(),N(U,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(k).total,onCurrentChange:e(d),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ye("",!0),l(Y,{modelValue:e(u),"onUpdate:modelValue":n[7]||(n[7]=V=>pe(u)?u.value=V:null),title:"AREA PARKIR",width:"500px","close-on-click-modal":!1},{footer:a(()=>[l(s,{icon:e(xe),onClick:e(I)},{default:a(()=>[m(" BATAL ")]),_:1},8,["icon","onClick"]),l(s,{icon:e(fe),type:"primary",onClick:n[6]||(n[6]=V=>e(M)())},{default:a(()=>[m(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(G,{"label-width":"150px","label-position":"left"},{default:a(()=>{var V,_,L,R,X;return[l(S,{label:"Nama",error:(V=e(o).nama)==null?void 0:V.join(", ")},{default:a(()=>[l(w,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=c=>e(t).nama=c)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Keterangan",error:(_=e(o).keterangan)==null?void 0:_.join(", ")},{default:a(()=>[l(w,{placeholder:"Keterangan",modelValue:e(t).keterangan,"onUpdate:modelValue":n[2]||(n[2]=c=>e(t).keterangan=c)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Jenis Kendaraan",error:(L=e(o).jenis_kendaraan)==null?void 0:L.join(", ")},{default:a(()=>[l(q,{modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":n[3]||(n[3]=c=>e(t).jenis_kendaraan=c),placeholder:"Jenis Kendaraan",style:{width:"100%"},multiple:""},{default:a(()=>[(v(!0),F(H,null,Q(e(b),c=>(v(),N(O,{value:c.nama,label:c.nama,key:c.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Kapasitas",error:(R=e(o).kapasitas)==null?void 0:R.join(", ")},{default:a(()=>[l(w,{type:"number",placeholder:"Kapasitas",modelValue:e(t).kapasitas,"onUpdate:modelValue":n[4]||(n[4]=c=>e(t).kapasitas=c)},null,8,["modelValue"])]),_:1},8,["error"]),l(S,{label:"Terisi",error:(X=e(o).terisi)==null?void 0:X.join(", ")},{default:a(()=>[l(w,{type:"number",placeholder:"Terisi",modelValue:e(t).terisi,"onUpdate:modelValue":n[5]||(n[5]=c=>e(t).terisi=c)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])])}}},Fl={class:"el-dropdown-link"},Rl={__name:"Backup",setup(T){const f=Re(),u=ee([]),o=ee(!1),t=ee(!1),i=ee([]);Ve(()=>{k()});const k=()=>{o.value=!0,f("/api/backup").then(b=>{u.value=b}).finally(()=>{o.value=!1})},P=b=>{Ie.confirm("Anda yakin akan menghapus file ini?","Konfirmasi",{type:"warning"}).then(()=>f("/api/backup",{method:"DELETE",body:{file:b}})).then(E=>{me({message:E.message,type:"success",showClose:!0}),k()})},d=()=>{t.value=!0,f("/api/backup",{method:"POST"}).then(b=>{me({message:b.message,type:"success",showClose:!0}),k()}).finally(()=>{t.value=!1})},A=b=>{Ie.confirm("Anda yakin akan me-restore database?","Konfirmasi",{type:"warning"}).then(()=>(o.value=!0,f("/api/backup",{method:"PUT",body:{file:b}}))).then(E=>{me({message:E.message,type:"success",showClose:!0}),k()}).finally(()=>{o.value=!1})},h=()=>{document.querySelector("#input-file").click()},M=b=>{var E=new FormData;E.append("file",b.target.files[0]),f("/api/backup",{method:"POST",body:E},{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{me({message:n.message,type:"success",showClose:!0}),k()}).finally(()=>{o.value=!1,document.querySelector("#input-file").value=""})},$=b=>{i.value=b.map(E=>E.file)},I=()=>{P(i.value)},D=b=>{window.open(b,"_blank")};return(b,E)=>{const n=ie,s=_e,r=re,j=Ce,x=we,z=Te,y=ce,g=Pe;return v(),F(H,null,[C("form",{class:"flex justify-content-end mb-3",inline:"",onSubmit:E[0]||(E[0]=B(()=>{},["prevent"]))},[l(n,{disabled:e(i).length==0,onClick:I,type:"danger",icon:e(te),size:"small",title:"Hapus File Backup"},{default:a(()=>[m(" HAPUS FILE BACKUP ")]),_:1},8,["disabled","icon"]),l(n,{onClick:h,type:"primary",class:"mr-2",icon:e(ll),size:"small",title:"Upload File Backup"},{default:a(()=>[m(" UPLOAD FILE BACKUP ")]),_:1},8,["icon"]),C("input",{type:"file",style:{display:"none"},id:"input-file",onChange:M},null,32),l(n,{onClick:d,type:"primary",icon:e(ge),size:"small",title:"Generate Backup",loading:e(t)},{default:a(()=>[m(" GENERATE BACKUP ")]),_:1},8,["icon","loading"])],32),le((v(),N(y,{data:e(u),stripe:"",height:"calc(100vh - 200px)",onSelectionChange:$},{default:a(()=>[l(s,{type:"selection",width:"55",align:"center","header-align":"center"}),l(s,{type:"index",label:"#"}),l(s,{prop:"tanggal",label:"Tanggal",width:"200"}),l(s,{prop:"file",label:"File"}),l(s,{prop:"size",label:"Ukuran",width:"100",align:"right","header-align":"right"}),l(s,{width:"60",align:"center","header-align":"center"},{header:a(()=>[l(n,{link:"",onClick:k,icon:e(ne)},null,8,["icon"])]),default:a(({row:U})=>[l(z,null,{dropdown:a(()=>[l(x,null,{default:a(()=>[l(j,{icon:e(al),onClick:B(w=>D(U.url),["prevent"])},{default:a(()=>[m("Download")]),_:2},1032,["icon","onClick"]),l(j,{icon:e(ne),onClick:B(w=>A(U.file),["prevent"])},{default:a(()=>[m(" Restore ")]),_:2},1032,["icon","onClick"]),l(j,{icon:e(te),onClick:B(w=>P(U.file),["prevent"])},{default:a(()=>[m(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[C("span",Fl,[l(r,null,{default:a(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[g,e(o)]])],64)}}},Bl=C("br",null,null,-1),Ll={class:"el-dropdown-link"},Hl=C("br",null,null,-1),Ol={__name:"User",setup(T){const{showForm:f,formErrors:u,formModel:o,pageSize:t,tableData:i,loading:k,keyword:P,currentChange:d,sizeChange:A,sortChange:h,openForm:M,save:$,deleteData:I,closeForm:D,requestData:b,searchData:E,refreshData:n}=je("/api/user");return Ve(()=>{b()}),(s,r)=>{const j=ie,x=be,z=_e,y=ol,g=re,U=Ce,w=we,S=Te,O=ce,q=Ae,G=he,Y=Ue,V=oe,_=ml,L=ve,R=Me,X=Pe;return v(),F(H,null,[C("form",{class:"flex justify-content-end",onSubmit:r[2]||(r[2]=B((...c)=>e(E)&&e(E)(...c),["prevent"]))},[l(j,{size:"small",onClick:r[0]||(r[0]=c=>e(M)({role:0,password:""})),type:"primary",icon:e(ge),class:"mr-2"},{default:a(()=>[m(" TAMBAH USER ")]),_:1},8,["icon"]),l(x,{size:"small",modelValue:e(P),"onUpdate:modelValue":r[1]||(r[1]=c=>pe(P)?P.value=c:null),placeholder:"Cari",style:{width:"180px"},"prefix-icon":e(nl),clearable:!0},null,8,["modelValue","prefix-icon"])],32),Bl,le((v(),N(O,{stripe:"",data:e(i).data,onSortChange:e(h)},{default:a(()=>[l(z,{type:"index",index:e(i).from,label:"#"},null,8,["index"]),l(z,{prop:"name",label:"Nama",sortable:"custom"}),l(z,{prop:"role",label:"Level",sortable:"custom"},{default:a(({row:c})=>[m(K(c.role?"Admin":"Operator"),1)]),_:1}),l(z,{prop:"status",label:"Status",sortable:"custom",align:"center","header-align":"center",width:"100"},{default:a(({row:c})=>[l(y,{type:c.status?"success":"info",size:"small",style:{width:"100%"},effect:"dark"},{default:a(()=>[m(K(c.status?"Aktif":"Nonaktif"),1)]),_:2},1032,["type"])]),_:1}),l(z,{width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(j,{link:"",onClick:e(n),icon:e(ne)},null,8,["onClick","icon"])]),default:a(({row:c})=>[l(S,null,{dropdown:a(()=>[l(w,null,{default:a(()=>[l(U,{icon:e(Ee),onClick:B(Z=>e(M)(c),["prevent"])},{default:a(()=>[m(" Edit ")]),_:2},1032,["icon","onClick"]),l(U,{icon:e(te),onClick:B(Z=>e(I)(c.id),["prevent"])},{default:a(()=>[m(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[C("span",Ll,[l(g,null,{default:a(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onSortChange"])),[[X,e(k)]]),Hl,e(i).total?(v(),N(q,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(t),"page-sizes":[10,25,50,100],total:e(i).total,onCurrentChange:e(d),onSizeChange:e(A)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ye("",!0),l(R,{modelValue:e(f),"onUpdate:modelValue":r[9]||(r[9]=c=>pe(f)?f.value=c:null),width:"500px",title:e(o).id?"EDIT USER":"TAMBAH USER","close-on-click-modal":!1},{footer:a(()=>[l(j,{icon:e(xe),onClick:e(D)},{default:a(()=>[m(" BATAL ")]),_:1},8,["icon","onClick"]),l(j,{icon:e(fe),type:"primary",onClick:r[8]||(r[8]=c=>e($)())},{default:a(()=>[m(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(L,{"label-width":"160px","label-position":"left"},{default:a(()=>{var c,Z,se,ue,de;return[l(G,{label:"Nama",error:(c=e(u).name)==null?void 0:c.join(", ")},{default:a(()=>[l(x,{placeholder:"Nama",modelValue:e(o).name,"onUpdate:modelValue":r[3]||(r[3]=p=>e(o).name=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(G,{label:"Level",error:(Z=e(u).role)==null?void 0:Z.join(", ")},{default:a(()=>[l(V,{modelValue:e(o).role,"onUpdate:modelValue":r[4]||(r[4]=p=>e(o).role=p),placeholder:"Level",style:{width:"100%"}},{default:a(()=>[(v(),F(H,null,Q([{value:0,label:"Operator"},{value:1,label:"Admin"}],(p,He)=>l(Y,{value:p.value,label:p.label,key:He},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(G,{label:"Password",error:(se=e(u).password)==null?void 0:se.join(", ")},{default:a(()=>[l(x,{type:"password",placeholder:"Password",modelValue:e(o).password,"onUpdate:modelValue":r[5]||(r[5]=p=>e(o).password=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(G,{label:"Konfirmasi Password",error:(ue=e(u).password)==null?void 0:ue.join(", ")},{default:a(()=>[l(x,{type:"password",placeholder:"Konfirmasi Password",modelValue:e(o).password_confirmation,"onUpdate:modelValue":r[6]||(r[6]=p=>e(o).password_confirmation=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(G,{label:"Status",error:(de=e(u).status)==null?void 0:de.join(", ")},{default:a(()=>[l(_,{"active-value":!0,"inactive-value":!1,modelValue:e(o).status,"onUpdate:modelValue":r[7]||(r[7]=p=>e(o).status=p),"active-color":"#13ce66"},null,8,["modelValue"]),l(y,{type:e(o).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:a(()=>[m(K(e(o).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue","title"])],64)}}},ra={__name:"setting",setup(T){const f=[{label:"Pengaturan Umum",component:kl},{label:"Jenis Kendaraan & Tarif",component:xl},{label:"User",component:Ol},{label:"Shift",component:Ml},{label:"Area Parkir",component:Kl},{label:"Backup & Restore",component:Rl}];return(u,o)=>{const t=Ge,i=Oe;return v(),N(i,null,{default:a(()=>[(v(),F(H,null,Q(f,(k,P)=>l(t,{lazy:"",key:P,label:k.label.toUpperCase()},{default:a(()=>[(v(),N(Le(k.component)))]),_:2},1032,["label"])),64))]),_:1})}}};export{ra as default};
