import{E as be,a as ge,c as ol,d as nl,b as $e}from"./maBPoMpY.js";import"./CpUJcSqP.js";import{t as d,T as A,A as a,z as l,x as n,y as m,I as e,a6 as Be,r as K,c as ie,o as he,v as $,B as s,J as F,L as O,G as Ye,U as q,K as cl,V as H,W as le,l as fl,Y as bl}from"./SK-yzAkd.js";import{u as Ee,E as Ke}from"./D7MZY2lO.js";import{p as Ce,z as Le,A as gl,q as Ge,r as Ie,B as hl,j as He,k as Ae,m as Fe,l as Oe,s as Je,t as Te,E as Me,o as qe,D as vl,n as We}from"./BRhIEaEG.js";import{u as ve,E as yl,a as rl,b as sl}from"./CmZAWWXR.js";import{E as Qe,a as Xe,b as Ze}from"./B4tnlizF.js";import{a as il,E as ul}from"./Z62ovWMb.js";import"./l0sNRNKZ.js";import{v as De}from"./Doa2RxNr.js";import{h as U}from"./C5S46NFB.js";import{E as el,a as ll}from"./BGUn-6kE.js";import{E as Ne}from"./zSMpsZh4.js";import{_ as al}from"./OlIEoZVK.js";import"./CY9tAmGA.js";import"./Cpj98o6Y.js";const kl={class:"table min-w-full"},Yl=n("td",{class:"border py-1 px-3",style:{width:"180px"}},"Group",-1),Ml={class:"border py-1 px-3"},Dl=n("td",{class:"border py-1 px-3"},"Nama",-1),Vl={class:"border py-1 px-3"},wl=n("td",{class:"border py-1 px-3"},"Nomor HP",-1),xl={class:"border py-1 px-3"},Cl=n("td",{class:"border py-1 px-3"},"Nomor Kartu",-1),Al={class:"border py-1 px-3"},El=n("td",{class:"border py-1 px-3"},"Jenis",-1),Tl={class:"border py-1 px-3"},Nl=n("td",{class:"border py-1 px-3"},"Tanggal Daftar",-1),Rl={class:"border py-1 px-3"},Pl=n("td",{class:"border py-1 px-3"},"Tanggal Kedaluarsa",-1),zl={class:"border py-1 px-3"},Sl=n("td",{class:"border py-1 px-3"},"Siklus Pembayaran",-1),Ul={class:"border py-1 px-3"},jl=n("td",{class:"border py-1 px-3"},"Tarif",-1),$l={class:"border py-1 px-3"},Bl=n("td",{class:"border py-1 px-3"},"Terakhir Masuk",-1),Kl={class:"border py-1 px-3"},Ll=n("td",{class:"border py-1 px-3"},"Terakhir Keluar",-1),Gl={class:"border py-1 px-3"},Il=n("td",{class:"border py-1 px-3"},"Status",-1),Hl={class:"border py-1 px-3"},Fl={__name:"ParkingMemberDetail",props:["member"],setup(w){const{toRupiah:N}=ve(),C=b=>[{days:"hari"},{weeks:"minggu"},{months:"bulan"},{years:"tahun"}][b];return(b,_)=>{const h=il,o=be,f=ge,j=ol,M=nl,D=ul;return d(),A(D,{gutter:20},{default:a(()=>[l(h,{span:8},{default:a(()=>[n("table",kl,[n("tbody",null,[n("tr",null,[Yl,n("td",Ml,m(w.member.group.nama),1)]),n("tr",null,[Dl,n("td",Vl,m(w.member.nama),1)]),n("tr",null,[wl,n("td",xl,m(w.member.phone),1)]),n("tr",null,[Cl,n("td",Al,m(w.member.nomor_kartu),1)]),n("tr",null,[El,n("td",Tl,m(w.member.berbayar?"Berbayar":"Gratis"),1)]),n("tr",null,[Nl,n("td",Rl,m(w.member.register_date),1)]),n("tr",null,[Pl,n("td",zl,m(w.member.expiry_date),1)]),n("tr",null,[Sl,n("td",Ul,m(w.member.siklus_pembayaran)+" "+m(C(w.member.siklus_pembayaran_unit)),1)]),n("tr",null,[jl,n("td",$l,m(e(N)(w.member.tarif)),1)]),n("tr",null,[Bl,n("td",Kl,m(w.member.last_in?e(U)(w.member.last_in).format("DD-MMM-YYYY HH:mm:ss"):""),1)]),n("tr",null,[Ll,n("td",Gl,m(w.member.last_out?e(U)(w.member.last_out).format("DD-MMM-YYYY HH:mm:ss"):""),1)]),n("tr",null,[Il,n("td",Hl,m(w.member.status?"Aktif":"Nonaktif"),1)])])])]),_:1}),l(h,{span:16},{default:a(()=>[l(M,null,{default:a(()=>[l(j,{label:"KENDARAAN"},{default:a(()=>[l(f,{data:w.member.vehicles},{default:a(()=>[l(o,{prop:"jenis_kendaraan",label:"Jenis Kendaraan"}),l(o,{prop:"plat_nomor",label:"Plat Nomor"}),l(o,{prop:"merk",label:"Merk"}),l(o,{prop:"tipe",label:"Tipe","show-overflow-tooltip":""}),l(o,{prop:"tahun",label:"Tahun"}),l(o,{prop:"warna",label:"Warna"})]),_:1},8,["data"])]),_:1})]),_:1})]),_:1})]),_:1})}}},Ol={class:"el-dropdown-link"},Jl=n("br",null,null,-1),ql={key:0,class:"el-form-item__error"},Wl={class:"flex"},Ql={__name:"ParkingMember",setup(w){const N=fl(),C=Ee(),{user:b}=Be(),{api:_,showForm:h,formModel:o,formErrors:f,pageSize:j,tableData:M,loading:D,keyword:i,filters:B,sort_prop:E,sort_order:R,currentChange:y,sizeChange:S,filterChange:P,sortChange:p,openForm:ue,save:T,deleteData:W,requestData:ae,searchData:G,refreshData:ye,exportData:me,toRupiah:te}=ve("/api/member"),oe=K({vehicles:[]}),Q=K(!1),J=K(U().format("YYYY-MM-DD")),u=ie(()=>{try{return U(o.value.register_date,"YYYY-MM-DD").add(o.value.siklus_pembayaran,o.value.siklus_pembayaran_unit).format("YYYY-MM-DD")}catch{return""}}),X=ie(()=>C.groupMemberList),de=ie(()=>C.jenisKendaraanList),ne=ie(()=>C.siklus),g=ie(()=>C.setting),re=()=>{h.value=!1,o.value={vehicles:[]},f.value={}},Z=()=>{o.value.expiry_date=u,T()},Re=()=>{const se={sort_prop:E.value||"nama",sort_order:R.value||"asc",action:"print",...B.value},r=new URLSearchParams(se).toString();window.open(`${N.public.apiBase}/api/member?${r}`,"_blank")},Pe=()=>{o.value.vehicles.length<g.value.jml_kendaraan_per_kartu||g.jml_kendaraan_per_kartu==0?o.value.vehicles.push({plat_nomor:"",jenis_kendaraan:"",tipe:"",merk:"",tahun:"",warna:""}):Te({message:`Jumlah maksimal kendaraan per kartu adalah ${g.jml_kendaraan_per_kartu}`,type:"error"})},ze=(se,r)=>{r?_(`/api/memberVehicle/${r}`,{method:"DELETE"}).then(L=>{o.value.vehicles.splice(se,1)}):o.value.vehicles.splice(se,1)};return he(()=>{o.value={vehicles:[]},ae()}),(se,r)=>{const L=Me,z=qe,Se=vl,k=be,Ve=yl,Ue=We,v=Qe,pe=Xe,we=Ze,ke=ge,xe=$e,x=Fl,_e=Ke,ce=rl,fe=sl,I=el,je=il,tl=Ne,dl=ul,ml=ll,pl=De;return d(),$(H,null,[n("form",{onSubmit:r[3]||(r[3]=O(()=>{},["prevent"])),class:"flex justify-content-end mb-3"},[l(L,{size:"small",onClick:r[0]||(r[0]=t=>e(ue)({vehicles:[],register_date:e(J),tarif:0})),type:"primary",icon:e(Ce),class:"mr-2"},{default:a(()=>[s(" TAMBAH MEMBER ")]),_:1},8,["icon"]),l(z,{size:"small",modelValue:e(i),"onUpdate:modelValue":r[1]||(r[1]=t=>F(i)?i.value=t:null),placeholder:"Cari","prefix-icon":e(Le),clearable:!0,onChange:e(G),style:{width:"200px"},class:"mr-2"},null,8,["modelValue","prefix-icon","onChange"]),l(Se,null,{default:a(()=>[l(L,{icon:e(gl),size:"small",type:"primary",onClick:r[2]||(r[2]=t=>e(me)("member-parkir"))},null,8,["icon"]),l(L,{icon:e(Ge),size:"small",type:"primary",onClick:Re},null,8,["icon"])]),_:1})],32),Ye((d(),A(ke,{data:e(M).data,stripe:"",onRowDblclick:r[4]||(r[4]=(t,c,ee)=>{oe.value=t,Q.value=!0}),height:"calc(100vh - 240px)",onFilterChange:e(P),onSortChange:e(p)},{default:a(()=>[l(k,{type:"index",index:e(M).from,label:"#"},null,8,["index"]),l(k,{filters:[{value:1,text:"Aktif"},{value:0,text:"Nonaktif"}],"column-key":"status",prop:"status",label:"Status",sortable:"custom","min-width":"120px","header-align":"center",align:"center"},{default:a(({row:t})=>[l(Ve,{size:"small",effect:"dark",style:{width:"100%"},type:t.status?"success":"info"},{default:a(()=>[s(m(t.status?"Aktif":"Nonaktif"),1)]),_:2},1032,["type"])]),_:1}),l(k,{prop:"nama",label:"Nama",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}),l(k,{filters:[{value:"y",text:"BERBAYAR"},{value:"n",text:"GRATIS"}],"filter-multiple":!1,"column-key":"berbayar",prop:"berbayar",label:"Jenis",sortable:"custom","min-width":"100px",align:"center","header-align":"center"},{default:a(({row:t})=>[s(m(t.berbayar?"BERBAYAR":"GRATIS"),1)]),_:1}),l(k,{filters:e(X).map(t=>({value:t.id,text:t.nama})),"column-key":"group_member_id",prop:"group.nama",label:"Group",sortable:"custom","show-overflow-tooltip":"","min-width":"120px"},null,8,["filters"]),l(k,{prop:"nomor_kartu",label:"Nomor Kartu",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}),l(k,{label:"Plat Nomor","show-overflow-tooltip":"","min-width":"150px"},{default:a(({row:t})=>[s(m(t.vehicles.map(c=>c.plat_nomor).join(", ")),1)]),_:1}),l(k,{prop:"register_date",label:"Tgl Daftar",sortable:"custom","min-width":"120px",align:"center","header-align":"center"},{default:a(({row:t})=>[s(m(e(U)(t.register_date).format("DD-MMM-YYYY")),1)]),_:1}),l(k,{prop:"expiry_date",label:"Tgl Kedaluarsa",sortable:"custom","min-width":"150px",align:"center","header-align":"center"},{default:a(({row:t})=>[s(m(e(U)(t.expiry_date).format("DD-MMM-YYYY")),1)]),_:1}),l(k,{prop:"tarif",label:"Tarif",sortable:"custom","min-width":"100px","header-align":"right",align:"right"},{default:a(({row:t})=>[s(m(e(te)(t.tarif)),1)]),_:1}),l(k,{prop:"siklus_pembayaran",label:"Siklus Bayar",sortable:"custom","min-width":"140px"},{default:a(({row:t})=>[s(m(t.siklus_pembayaran)+" "+m(e(ne).find(c=>c.value==t.siklus_pembayaran_unit).label),1)]),_:1}),l(k,{prop:"phone",label:"Nomor HP",sortable:"custom","show-overflow-tooltip":"","min-width":"130px"}),l(k,{prop:"last_transaction",label:"Trx Terkakhir",sortable:"custom","min-width":"150px"},{default:a(({row:t})=>[s(m(t.last_transaction?e(U)(t.last_transaction).format("DD-MMM-YYYY"):""),1)]),_:1}),l(k,{filters:[{value:"y",text:"Ya"},{value:"n",text:"Tidak"}],"filter-multiple":!1,"column-key":"expired",fixed:"right",prop:"expired",label:"Expired",sortable:"custom","min-width":"120px","header-align":"center",align:"center"},{default:a(({row:t})=>[l(Ve,{size:"small",effect:"dark",style:{width:"100%"},type:t.expired?"danger":"success"},{default:a(()=>[s(m(t.expired?"Ya":"Tidak"),1)]),_:2},1032,["type"])]),_:1}),l(k,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(L,{link:"",onClick:e(ye),icon:e(Ie)},null,8,["onClick","icon"])]),default:a(({row:t})=>[l(we,null,{dropdown:a(()=>[l(pe,null,{default:a(()=>[l(v,{icon:e(hl),onClick:O(()=>{oe.value=t,Q.value=!0},["prevent"])},{default:a(()=>[s("Lihat Detail")]),_:2},1032,["icon","onClick"]),l(v,{icon:e(He),onClick:O(c=>e(ue)(t),["prevent"])},{default:a(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),e(b).role==1?(d(),A(v,{key:0,icon:e(Ae),onClick:O(c=>e(W)(t.id),["prevent"])},{default:a(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])):q("",!0)]),_:2},1024)]),default:a(()=>[n("span",Ol,[l(Ue,null,{default:a(()=>[l(e(Fe))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onFilterChange","onSortChange"])),[[pl,e(D)]]),Jl,e(M).total?(d(),A(xe,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(j),"page-sizes":[10,25,50,100],total:e(M).total,onCurrentChange:e(y),onSizeChange:e(S)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):q("",!0),e(oe)?(d(),A(_e,{key:1,center:"",title:"INFORMASI MEMBER",modelValue:e(Q),"onUpdate:modelValue":r[5]||(r[5]=t=>F(Q)?Q.value=t:null),width:"1024px"},{default:a(()=>[l(x,{member:e(oe)},null,8,["member"])]),_:1},8,["modelValue"])):q("",!0),l(_e,{fullscreen:"",center:"",modelValue:e(h),"onUpdate:modelValue":r[18]||(r[18]=t=>F(h)?h.value=t:null),title:e(o).id?"EDIT MEMBER":"TAMBAH MEMBER","close-on-click-modal":!1},{footer:a(()=>[l(L,{icon:e(Oe),onClick:re},{default:a(()=>[s(" BATAL ")]),_:1},8,["icon"]),l(L,{type:"primary",icon:e(Je),onClick:Z},{default:a(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(ml,{"label-width":"150px","label-position":"left"},{default:a(()=>[l(dl,{gutter:30},{default:a(()=>[l(je,{span:8},{default:a(()=>{var t,c,ee,V;return[l(I,{label:"Group",class:cl(e(f).group_member_id?"is-error":"")},{default:a(()=>[l(fe,{modelValue:e(o).group_member_id,"onUpdate:modelValue":r[6]||(r[6]=Y=>e(o).group_member_id=Y),placeholder:"Group",style:{width:"100%"}},{default:a(()=>[(d(!0),$(H,null,le(e(X),Y=>(d(),A(ce,{value:Y.id,label:Y.nama,key:Y.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"]),e(f).group_member_id?(d(),$("div",ql,m(e(f).group_member_id[0]),1)):q("",!0)]),_:1},8,["class"]),l(I,{label:"Nama",error:(t=e(f).nama)==null?void 0:t.join(", ")},{default:a(()=>[l(z,{placeholder:"Nama",modelValue:e(o).nama,"onUpdate:modelValue":r[7]||(r[7]=Y=>e(o).nama=Y)},null,8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Nomor HP",error:(c=e(f).phone)==null?void 0:c.join(", ")},{default:a(()=>[l(z,{placeholder:"Nomor HP",modelValue:e(o).phone,"onUpdate:modelValue":r[8]||(r[8]=Y=>e(o).phone=Y)},null,8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Nomor Kartu",error:(ee=e(f).nomor_kartu)==null?void 0:ee.join(", ")},{default:a(()=>[l(z,{placeholder:"Nomor Kartu",modelValue:e(o).nomor_kartu,"onUpdate:modelValue":r[9]||(r[9]=Y=>e(o).nomor_kartu=Y)},null,8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Jenis Kartu",error:(V=e(f).card_type)==null?void 0:V.join(", ")},{default:a(()=>[l(fe,{modelValue:e(o).card_type,"onUpdate:modelValue":r[10]||(r[10]=Y=>e(o).card_type=Y),placeholder:"Jenis Kartu",style:{width:"100%"}},{default:a(()=>[(d(),$(H,null,le(["RFID","UHF"],(Y,_l)=>l(ce,{value:Y,label:Y,key:_l},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1}),l(je,{span:8},{default:a(()=>{var t,c,ee;return[l(I,{label:"Tanggal Daftar",error:(t=e(f).register_date)==null?void 0:t.join(", ")},{default:a(()=>[l(tl,{format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",placeholder:"Tanggal Daftar",modelValue:e(o).register_date,"onUpdate:modelValue":r[11]||(r[11]=V=>e(o).register_date=V),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Jenis Anggota",error:(c=e(f).berbayar)==null?void 0:c.join(", ")},{default:a(()=>[l(fe,{modelValue:e(o).berbayar,"onUpdate:modelValue":r[12]||(r[12]=V=>e(o).berbayar=V),placeholder:"Jenis Anggota",style:{width:"100%"}},{default:a(()=>[(d(),$(H,null,le(["Gratis","Berbayar"],(V,Y)=>l(ce,{value:Y,label:V,key:Y},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Tarif (Rp)",error:(ee=e(f).tarif)==null?void 0:ee.join(", ")},{default:a(()=>[l(z,{disabled:!e(o).berbayar,type:"number",placeholder:"Tarif (Rp)",modelValue:e(o).tarif,"onUpdate:modelValue":r[13]||(r[13]=V=>e(o).tarif=V)},null,8,["disabled","modelValue"])]),_:1},8,["error"])]}),_:1}),l(je,{span:8},{default:a(()=>{var t,c,ee;return[l(I,{label:"Siklus Pembayaran",error:(t=e(f).siklus_pembayaran)==null?void 0:t.join(", ")},{default:a(()=>[n("div",Wl,[l(z,{type:"number",modelValue:e(o).siklus_pembayaran,"onUpdate:modelValue":r[14]||(r[14]=V=>e(o).siklus_pembayaran=V),class:"mr-2"},null,8,["modelValue"]),l(fe,{modelValue:e(o).siklus_pembayaran_unit,"onUpdate:modelValue":r[15]||(r[15]=V=>e(o).siklus_pembayaran_unit=V)},{default:a(()=>[(d(!0),$(H,null,le(e(ne),(V,Y)=>(d(),A(ce,{value:V.value,label:V.label,key:Y},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])])]),_:1},8,["error"]),l(I,{label:"Tanggal Kedaluarsa",error:(c=e(f).expiry_date)==null?void 0:c.join(", ")},{default:a(()=>[l(tl,{disabled:"",format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",placeholder:"Tanggal Kedaluarsa",modelValue:e(u),"onUpdate:modelValue":r[16]||(r[16]=V=>F(u)?u.value=V:null),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"]),l(I,{label:"Status",error:(ee=e(f).status)==null?void 0:ee.join(", ")},{default:a(()=>[l(fe,{modelValue:e(o).status,"onUpdate:modelValue":r[17]||(r[17]=V=>e(o).status=V),placeholder:"Status",style:{width:"100%"}},{default:a(()=>[(d(),$(H,null,le(["Nonaktif","Aktif"],(V,Y)=>l(ce,{value:!!Y,label:V,key:Y},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1})]),_:1}),l(ke,{data:e(o).vehicles},{default:a(()=>[l(k,{label:"Jenis Kendaraan"},{default:a(({row:t})=>[l(fe,{size:"small",modelValue:t.jenis_kendaraan,"onUpdate:modelValue":c=>t.jenis_kendaraan=c,placeholder:"Jenis Kendaraan",style:{width:"100%"}},{default:a(()=>[(d(!0),$(H,null,le(e(de),c=>(d(),A(ce,{value:c.nama,label:c.nama,key:c.id},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{label:"Plat Nomor"},{default:a(({row:t})=>[l(z,{modelValue:t.plat_nomor,"onUpdate:modelValue":c=>t.plat_nomor=c,placeholder:"Plat Nomor",size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{label:"Merk"},{default:a(({row:t})=>[l(z,{modelValue:t.merk,"onUpdate:modelValue":c=>t.merk=c,placeholder:"Merk",size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{label:"Tipe"},{default:a(({row:t})=>[l(z,{modelValue:t.tipe,"onUpdate:modelValue":c=>t.tipe=c,placeholder:"Tipe",size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{label:"Tahun"},{default:a(({row:t})=>[l(z,{type:"number",modelValue:t.tahun,"onUpdate:modelValue":c=>t.tahun=c,placeholder:"Tahun",size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{label:"Warna"},{default:a(({row:t})=>[l(z,{modelValue:t.warna,"onUpdate:modelValue":c=>t.warna=c,placeholder:"Warna",size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(k,{width:"70px",align:"right","header-align":"right"},{header:a(()=>[l(L,{disabled:e(g).jml_kendaraan_per_kartu>0&&e(o).vehicles.length>=e(g).jml_kendaraan_per_kartu,icon:e(Ce),onClick:Pe,size:"small",type:"primary"},null,8,["disabled","icon"])]),default:a(t=>[l(L,{onClick:c=>ze(t.$index,t.row.id),icon:e(Ae),size:"small",type:"danger",plain:""},null,8,["onClick","icon"])]),_:1})]),_:1},8,["data"])]),_:1},8,["modelValue","title"])],64)}}},Xl={class:"el-dropdown-link"},Zl=n("br",null,null,-1),ea={__name:"GroupMember",setup(w){const{getGroupMemberList:N}=Ee(),{user:C}=Be(),{showForm:b,formErrors:_,formModel:h,pageSize:o,tableData:f,loading:j,keyword:M,currentChange:D,sizeChange:i,openForm:B,save:E,deleteData:R,closeForm:y,requestData:S,searchData:P,refreshData:p}=ve("/api/groupMember");return he(()=>{S()}),(ue,T)=>{const W=Me,ae=qe,G=be,ye=We,me=Qe,te=Xe,oe=Ze,Q=ge,J=$e,u=el,X=ll,de=Ke,ne=De;return d(),$(H,null,[n("form",{onSubmit:T[2]||(T[2]=O((...g)=>e(P)&&e(P)(...g),["prevent"])),class:"flex mb-3 justify-content-end"},[e(C).role==1?(d(),A(W,{key:0,size:"small",icon:e(Ce),onClick:T[0]||(T[0]=g=>e(B)()),type:"primary",class:"mr-2"},{default:a(()=>[s(" TAMBAH GROUP ")]),_:1},8,["icon"])):q("",!0),l(ae,{size:"small",modelValue:e(M),"onUpdate:modelValue":T[1]||(T[1]=g=>F(M)?M.value=g:null),placeholder:"Cari","prefix-icon":e(Le),clearable:!0,onClear:e(S),style:{width:"200px"}},null,8,["modelValue","prefix-icon","onClear"])],32),Ye((d(),A(Q,{data:e(f).data,stripe:"",height:"calc(100vh - 240px)"},{default:a(()=>[l(G,{type:"index",index:e(f).from,label:"#"},null,8,["index"]),l(G,{prop:"nama",label:"Nama","show-overflow-tooltip":"","min-width":"150px"}),l(G,{prop:"keterangan",label:"Keterangan","show-overflow-tooltip":"","min-width":"150px"}),e(C).role==1?(d(),A(G,{key:0,fixed:"right",width:"60px","header-align":"center",align:"center"},{header:a(()=>[l(W,{link:"",onClick:e(p),icon:e(Ie)},null,8,["onClick","icon"])]),default:a(({row:g})=>[l(oe,null,{dropdown:a(()=>[l(te,null,{default:a(()=>[l(me,{icon:e(He),onClick:O(re=>e(B)(g),["prevent"])},{default:a(()=>[s("Edit")]),_:2},1032,["icon","onClick"]),l(me,{icon:e(Ae),onClick:O(re=>e(R)(g.id),["prevent"])},{default:a(()=>[s(" Hapus")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:a(()=>[n("span",Xl,[l(ye,null,{default:a(()=>[l(e(Fe))]),_:1})])]),_:2},1024)]),_:1})):q("",!0)]),_:1},8,["data"])),[[ne,e(j)]]),Zl,e(f).total?(d(),A(J,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(o),"page-sizes":[10,25,50,100],total:e(f).total,onCurrentChange:e(D),onSizeChange:e(i)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):q("",!0),l(de,{draggable:"",width:"500px",modelValue:e(b),"onUpdate:modelValue":T[6]||(T[6]=g=>F(b)?b.value=g:null),title:e(h).id?"EDIT GROUP MEMBER":"TAMBAH GROUP MEMBER","close-on-click-modal":!1},{footer:a(()=>[l(W,{icon:e(Oe),onClick:e(y)},{default:a(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(W,{icon:e(Je),type:"primary",onClick:T[5]||(T[5]=g=>e(E)(e(N)))},{default:a(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(X,{"label-width":"150px","label-position":"left"},{default:a(()=>{var g,re;return[l(u,{label:"Nama",error:(g=e(_).nama)==null?void 0:g.join(", ")},{default:a(()=>[l(ae,{placeholder:"Nama",modelValue:e(h).nama,"onUpdate:modelValue":T[3]||(T[3]=Z=>e(h).nama=Z)},null,8,["modelValue"])]),_:1},8,["error"]),l(u,{label:"Keterangan",error:(re=e(_).keterangan)==null?void 0:re.join(", ")},{default:a(()=>[l(ae,{placeholder:"Keterangan",modelValue:e(h).keterangan,"onUpdate:modelValue":T[4]||(T[4]=Z=>e(h).keterangan=Z)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue","title"])],64)}}},la={class:"el-dropdown-link"},aa=n("br",null,null,-1),ta={class:"flex"},oa={__name:"Renewal",setup(w){const{api:N,showForm:C,formErrors:b,formModel:_,pageSize:h,tableData:o,loading:f,filters:j,keyword:M,currentChange:D,sizeChange:i,sortChange:B,openForm:E,save:R,deleteData:y,closeForm:S,requestData:P,searchData:p,refreshData:ue,toRupiah:T}=ve("/api/memberRenewal"),W=Ee();he(()=>{j.value={dateRange:[]},P()});const ae=K({}),G=K(!1),ye=ie(()=>W.memberList),me=ie(()=>W.siklus),te=ie(()=>{try{return U(_.value.dari_tanggal,"YYYY-MM-DD").add(_.value.siklus_pembayaran,_.value.siklus_pembayaran_unit).format("YYYY-MM-DD")}catch{return""}}),oe=()=>{_.value.sampai_tanggal=te,R()},Q=J=>{N(`/api/memberRenewal/printSlip/${ae.value.id}`,{method:"POST",body:{printer_id:J}}).then(u=>{Te({message:u.message,type:"success"})}).finally(()=>{G.value=!1})};return(J,u)=>{const X=Me,de=Ne,ne=qe,g=be,re=We,Z=Qe,Re=Xe,Pe=Ze,ze=ge,se=$e,r=rl,L=sl,z=el,Se=ll,k=Ke,Ve=al,Ue=De;return d(),$("div",null,[n("form",{onSubmit:u[3]||(u[3]=O(()=>{},["prevent"])),class:"flex justify-content-end align-item-center mb-3"},[l(X,{icon:e(Ce),size:"small",onClick:u[0]||(u[0]=v=>e(E)({})),type:"primary",class:"mr-2"},{default:a(()=>[s(" INPUT PEMBAYARAN KEANGGOTAAN ")]),_:1},8,["icon"]),n("div",null,[l(de,{size:"small",onChange:e(P),modelValue:e(j).dateRange,"onUpdate:modelValue":u[1]||(u[1]=v=>e(j).dateRange=v),format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"Dari tgl","end-placeholder":"Sampai tgl",class:"mr-2"},null,8,["onChange","modelValue"])]),l(ne,{size:"small",modelValue:e(M),"onUpdate:modelValue":u[2]||(u[2]=v=>F(M)?M.value=v:null),placeholder:"Cari","prefix-icon":e(Le),clearable:"",onChange:e(p),style:{width:"200px"}},null,8,["modelValue","prefix-icon","onChange"])],32),Ye((d(),A(ze,{data:e(o).data,stripe:"",height:"calc(100vh - 240px)",onSortChange:e(B)},{default:a(()=>[l(g,{type:"index",index:e(o).from,label:"#"},null,8,["index"]),l(g,{prop:"created_at",label:"Tanggal Trx",sortable:"custom","min-width":"180"},{default:a(({row:v})=>[s(m(e(U)(v.created_at).format("DD-MMM-YYYY HH:mm:ss")),1)]),_:1}),l(g,{prop:"nama_member",label:"Nama",sortable:"custom","show-overflow-tooltip":"","min-width":"120"}),l(g,{prop:"nomor_kartu",label:"Nomor Kartu",sortable:"custom","min-width":"140"}),l(g,{prop:"dari_tanggal",label:"Dari Tanggal",width:"150px",sortable:"custom",align:"center","header-align":"center"},{default:a(({row:v})=>[s(m(e(U)(v.dari_tanggal).format("DD-MMM-YYYY")),1)]),_:1}),l(g,{prop:"sampai_tanggal",label:"Sampai Tanggal",width:"160px",sortable:"custom",align:"center","header-align":"center"},{default:a(({row:v})=>[s(m(e(U)(v.sampai_tanggal).format("DD-MMM-YYYY")),1)]),_:1}),l(g,{prop:"jumlah",label:"Jumlah",sortable:"custom",align:"right","header-align":"right","min-width":"120"},{default:a(({row:v})=>[s(m(e(T)(v.jumlah)),1)]),_:1}),l(g,{prop:"operator",label:"Operator",sortable:"custom","min-width":"120"}),l(g,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:a(()=>[l(X,{link:"",onClick:e(ue),icon:e(Ie)},null,8,["onClick","icon"])]),default:a(({row:v})=>[l(Pe,null,{dropdown:a(()=>[l(Re,null,{default:a(()=>[l(Z,{icon:J.Printer,onClick:O(()=>{ae.value=v,G.value=!0},["prevent"])},{default:a(()=>[s("Print Slip")]),_:2},1032,["icon","onClick"]),J.$auth.user.role==1?(d(),A(Z,{key:0,icon:e(He),onClick:O(pe=>e(E)(v),["prevent"])},{default:a(()=>[s("Edit")]),_:2},1032,["icon","onClick"])):q("",!0),J.$auth.user.role==1?(d(),A(Z,{key:1,icon:e(Ae),onClick:O(pe=>e(y)(v.id),["prevent"])},{default:a(()=>[s("Hapus")]),_:2},1032,["icon","onClick"])):q("",!0)]),_:2},1024)]),default:a(()=>[n("span",la,[l(re,null,{default:a(()=>[l(e(Fe))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onSortChange"])),[[Ue,e(f)]]),aa,e(o).total?(d(),A(se,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(h),"page-sizes":[10,25,50,100],total:e(o).total,onCurrentChange:e(D),onSizeChange:e(i)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):q("",!0),l(k,{modelValue:e(C),"onUpdate:modelValue":u[10]||(u[10]=v=>F(C)?C.value=v:null),width:"500px","close-on-click-modal":!1,title:e(_).id?"EDIT PEMBAYARAN KEANGGOTAAN":"INPUT PEMBAYARAN KEANGGOTAAN"},{footer:a(()=>[l(X,{icon:e(Oe),onClick:e(S)},{default:a(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(X,{icon:e(Je),type:"primary",onClick:oe},{default:a(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:a(()=>[l(Se,{"label-width":"180px","label-position":"left"},{default:a(()=>{var v,pe,we,ke,xe;return[l(z,{label:"Member",error:(v=e(b).member_id)==null?void 0:v.join(", ")},{default:a(()=>[l(L,{filterable:"","default-first-option":"",clearable:"",modelValue:e(_).member_id,"onUpdate:modelValue":u[4]||(u[4]=x=>e(_).member_id=x),placeholder:"Member"},{default:a(()=>[(d(!0),$(H,null,le(e(ye).filter(x=>x.berbayar),(x,_e)=>(d(),A(r,{value:x.id,label:x.nomor_kartu+" - "+x.nama,key:_e},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(z,{label:"Siklus Pembayaran",error:(pe=e(b).siklus_pembayaran)==null?void 0:pe.join(", ")},{default:a(()=>[n("div",ta,[l(ne,{type:"number",modelValue:e(_).siklus_pembayaran,"onUpdate:modelValue":u[5]||(u[5]=x=>e(_).siklus_pembayaran=x),class:"mr-2"},null,8,["modelValue"]),l(L,{placeholder:"Pilih",modelValue:e(_).siklus_pembayaran_unit,"onUpdate:modelValue":u[6]||(u[6]=x=>e(_).siklus_pembayaran_unit=x),style:{width:"250px"}},{default:a(()=>[(d(!0),$(H,null,le(e(me),(x,_e)=>(d(),A(r,{value:x.value,label:x.label,key:_e},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])])]),_:1},8,["error"]),l(z,{label:"Dari Tanggal",error:(we=e(b).dari_tanggal)==null?void 0:we.join(", ")},{default:a(()=>[l(de,{format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",placeholder:"Dari Tanggal",modelValue:e(_).dari_tanggal,"onUpdate:modelValue":u[7]||(u[7]=x=>e(_).dari_tanggal=x),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"]),l(z,{label:"Sampai Tanggal",error:(ke=e(b).sampai_tanggal)==null?void 0:ke.join(", ")},{default:a(()=>[l(de,{disabled:"",format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",placeholder:"Sampai Tanggal",modelValue:e(te),"onUpdate:modelValue":u[8]||(u[8]=x=>F(te)?te.value=x:null),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"]),l(z,{label:"Jumlah",error:(xe=e(b).jumlah)==null?void 0:xe.join(", ")},{default:a(()=>[l(ne,{type:"number",placeholder:"Jumlah",modelValue:e(_).jumlah,"onUpdate:modelValue":u[9]||(u[9]=x=>e(_).jumlah=x)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue","title"]),l(Ve,{show:e(G),onPrint:u[11]||(u[11]=v=>Q(v)),onClose:u[12]||(u[12]=v=>G.value=!1)},null,8,["show"])])}}},na={class:"flex justify-content-end mb-3"},ra={__name:"MembershipReportDaily",setup(w){const{api:N,toRupiah:C}=ve(),b=K(U().format("YYYY-MM-DD")),_=K([]),h=K(!1),o=K(!1),f=()=>{let D={date:b.value};h.value=!0,N("/api/memberRenewal/reportDaily",{params:D}).then(i=>_.value=i).finally(()=>h.value=!1)},j=D=>{let i={date:b.value,action:"print",printer_id:D};h.value=!0,N("/api/memberRenewal/reportDaily",{params:i}).then(B=>{Te({message:"Silakan ambil slip",type:"success",showClose:!1})}).finally(()=>{h.value=!1,o.value=!1})},M=D=>{const{columns:i,data:B}=D,E=[];return i.forEach((R,y)=>{if(y===0){E[y]="TOTAL";return}if(y===1||y===2||y===3){E[y]="";return}if(y===4){let S=_.value.reduce((P,p)=>P+Number(p.jumlah),0);E[y]=C(S)}}),E};return he(()=>{f()}),(D,i)=>{const B=Ne,E=Me,R=be,y=ge,S=al,P=De;return Ye((d(),$("div",null,[n("form",na,[l(B,{size:"small",onChange:f,modelValue:e(b),"onUpdate:modelValue":i[0]||(i[0]=p=>F(b)?b.value=p:null),format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",type:"date",class:"mr-2"},null,8,["modelValue"]),l(E,{size:"small",type:"primary",icon:e(Ge),onClick:i[1]||(i[1]=p=>o.value=!0)},{default:a(()=>[s(" PRINT LAPORAN ")]),_:1},8,["icon"])]),l(y,{"show-summary":"",stripe:"",data:e(_),"summary-method":M},{default:a(()=>[l(R,{label:"Tanggal","header-align":"center",align:"center"},{default:a(({row:p})=>[s(m(e(U)(p.created_at).format("DD-MMM-YYYY HH:mm")),1)]),_:1}),l(R,{prop:"member.nama",label:"Nama"}),l(R,{prop:"member.nomor_kartu",label:"Nomor Kartu","header-align":"center",align:"center"}),l(R,{label:"Plat Nomor","header-align":"center",align:"center"},{default:a(({row:p})=>[s(m(p.member.vehicles.map(ue=>ue.plate_number).join(", ")),1)]),_:1}),l(R,{label:"Jumlah","header-align":"right",align:"right"},{default:a(({row:p})=>[s(m(e(C)(p.jumlah)),1)]),_:1})]),_:1},8,["data"]),l(S,{show:e(o),onPrint:i[2]||(i[2]=p=>j(p)),onClose:i[3]||(i[3]=p=>o.value=!1)},null,8,["show"])])),[[P,e(h)]])}}},sa={class:"flex justify-content-end mb-3"},ia={__name:"MembershipReport",setup(w){const{api:N,toRupiah:C}=ve(),b=K([U().format("YYYY-MM-01"),U().format("YYYY-MM-DD")]),_=K([]),h=K(!1),o=K(!1),f=()=>{let D={"dateRange[0]":b.value[0],"dateRange[1]":b.value[1]};h.value=!0,N("/api/memberRenewal/report",{params:D}).then(i=>_.value=i).finally(()=>h.value=!1)},j=D=>{let i={"dateRange[0]":b.value[0],"dateRange[1]":b.value[1],action:"print",printer_id:D};h.value=!0,N("/api/memberRenewal/report",{params:i}).then(B=>{Te({message:"Silakan ambil slip",type:"success",showClose:!1})}).finally(()=>{h.value=!1,o.value=!1})},M=D=>{const{columns:i,data:B}=D,E=[];return i.forEach((R,y)=>{if(y===0){E[y]="TOTAL";return}if(y===1&&(E[y]=_.value.reduce((S,P)=>S+Number(P.jumlah),0)),y===2){let S=_.value.reduce((P,p)=>P+Number(p.pendapatan),0);E[y]=C(S)}}),E};return he(()=>{f()}),(D,i)=>{const B=Ne,E=Me,R=be,y=ge,S=al,P=De;return Ye((d(),$("div",null,[n("form",sa,[n("div",null,[l(B,{size:"small",onChange:f,modelValue:e(b),"onUpdate:modelValue":i[0]||(i[0]=p=>F(b)?b.value=p:null),format:"DD/MMM/YYYY","value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"Dari tanggal","end-placeholder":"Sampai tanggal",class:"mr-2"},null,8,["modelValue"])]),l(E,{size:"small",type:"primary",icon:e(Ge),onClick:i[1]||(i[1]=p=>o.value=!0)},{default:a(()=>[s(" PRINT LAPORAN ")]),_:1},8,["icon"])]),l(y,{"show-summary":"",stripe:"",data:e(_),"summary-method":M},{default:a(()=>[l(R,{label:"Tanggal","header-align":"center",align:"center"},{default:a(({row:p})=>[s(m(e(U)(p.tanggal).format("DD/MMM/YYYY")),1)]),_:1}),l(R,{label:"Jumlah","header-align":"center",align:"center"},{default:a(({row:p})=>[s(m(p.jumlah.toLocaleString("id-ID")),1)]),_:1}),l(R,{label:"Pendapatan","header-align":"right",align:"right"},{default:a(({row:p})=>[s(m(e(C)(p.pendapatan)),1)]),_:1})]),_:1},8,["data"]),l(S,{show:e(o),onPrint:i[2]||(i[2]=p=>j(p)),onClose:i[3]||(i[3]=p=>o.value=!1)},null,8,["show"])])),[[P,e(h)]])}}},Va={__name:"member",setup(w){const{user:N}=Be(),{getGroupMemberList:C,getMemberList:b}=Ee(),_=[{component:Ql,label:"MEMBER",visible:!0},{component:ea,label:"GROUP MEMBER",visible:N.value.role==1},{component:oa,label:"PEMBAYARAN",visible:!0},{component:ra,label:"LAPORAN PENDAPATAN HARIAN",visible:N.value.role==1},{component:ia,label:"SUMMARY LAPORAN PENDAPATAN",visible:N.value.role==1}];return he(()=>{C(),b()}),(h,o)=>{const f=ol,j=nl;return d(),A(j,null,{default:a(()=>[(d(!0),$(H,null,le(_.filter(M=>M.visible),(M,D)=>(d(),A(f,{key:D,lazy:"",label:M.label},{default:a(()=>[(d(),A(bl(M.component)))]),_:2},1032,["label"]))),128))]),_:1})}}};export{Va as default};
