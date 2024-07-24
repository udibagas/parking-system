import{E as be,a as ke}from"./D7kMVDpP.js";import{l as ve,s as he,t as g,o as xe,E as we}from"./DgfJrnia.js";import{E as Se,a as Te}from"./PRHiBLhl.js";import{u as _e,a as Ae,b as Me}from"./DEBJnhyk.js";import{E as Ke,u as je}from"./CT7gV6x4.js";import"./DnuOQq83.js";import{E as Ee}from"./Cn2npA5Z.js";import{o as fe,t as f,T as B,A as i,z as s,I as n,B as de,v as M,V as X,W as ee,U as F,_ as Ie,Q as Ne,r as Q,c as q,a2 as Oe,x as u,y as V,G as N,a3 as me,a0 as v,K as Ce,a4 as De,$ as Z,Z as ce,a1 as Le,C as Pe,D as Be}from"./lv3-Fh7j.js";import{s as Ue}from"./BWYMu88v.js";import{h}from"./C5S46NFB.js";const Ye={__name:"FormBukaManual",props:["show","gateOutList"],emits:["close","open-gate"],setup(S,{emit:K}){const{show:C,gateOutList:D}=S,{api:d,formModel:e,formErrors:w}=_e("/api/manualOpenLog"),j=K,b=()=>{e.value={},w.value={},j("close")},H=()=>{Ee.confirm("Aksi ini akan dicatat oleh sistem. Anda yakin?","Peringatan",{type:"warning"}).then(()=>d("/api/manualOpenLog",{method:"POST",body:e.value})).then(m=>{g({message:m.message,type:"success"}),j("open-gate",e.value.gate_out_id),b()}).catch(m=>{var c;((c=m.response)==null?void 0:c.status)==422&&(w.value=m.response._data.errors)})};return fe(()=>{D.length==1&&(e.value.gate_out_id=D[0].id)}),(m,c)=>{const T=xe,y=Se,U=Ae,Y=Me,te=Te,G=we,J=Ke;return f(),B(J,{center:"",title:"FORM BUKA MANUAL","model-value":S.show,"before-close":b},{footer:i(()=>[s(G,{icon:n(ve),onClick:b},{default:i(()=>[de(" BATAL ")]),_:1},8,["icon"]),s(G,{icon:n(he),type:"primary",onClick:H},{default:i(()=>[de(" SIMPAN ")]),_:1},8,["icon"])]),default:i(()=>[s(te,{"label-position":"left","label-width":"200px"},{default:i(()=>{var R,$,z;return[s(y,{label:"Alasan buka manual",error:(R=n(w).alasan)==null?void 0:R.join(", ")},{default:i(()=>[s(T,{autofocus:"",type:"textarea",modelValue:n(e).alasan,"onUpdate:modelValue":c[0]||(c[0]=k=>n(e).alasan=k),rows:"3",placeholder:"Alasan buka manual"},null,8,["modelValue"])]),_:1},8,["error"]),S.gateOutList.length>1?(f(),B(y,{key:0,label:"Gate Keluar",error:($=n(w).gate_out_id)==null?void 0:$.join(", ")},{default:i(()=>[s(Y,{modelValue:n(e).gate_out_id,"onUpdate:modelValue":c[1]||(c[1]=k=>n(e).gate_out_id=k),style:{width:"100%"},placeholder:"Gate Keluar"},{default:i(()=>[(f(!0),M(X,null,ee(S.gateOutList,k=>(f(),B(U,{key:k.id,label:k.nama,value:k.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"])):F("",!0),s(y,{label:"Masukkan password Admin",error:(z=n(w).password)==null?void 0:z.join(", ")},{default:i(()=>[s(T,{type:"password",modelValue:n(e).password,"onUpdate:modelValue":c[2]||(c[2]=k=>n(e).password=k),placeholder:"Password"},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["model-value"])}}},O=S=>(Pe("data-v-22bcb88d"),S=S(),Be(),S),$e={key:0,class:"flex",id:"gate-out-app",style:{height:"calc(100vh - 100px)"},tabindex:"1"},qe={style:{width:"600px","flex-shrink":"0"}},Re={class:"mt-0 mb-3 p-2 bg-red text-white text-center text-xl"},Ve=O(()=>u("div",{class:"label-big"},"[-] NO. PLAT",-1)),Fe=O(()=>u("div",{class:"label-big"},"[+] NO. TIKET/KARTU",-1)),He=O(()=>u("div",{class:"label-big"},"[*] JENIS KENDARAAN",-1)),Ge=["value"],Je=O(()=>u("div",{class:"label-big"},"[*] JAM MASUK",-1)),ze=O(()=>u("div",{class:"label-big"},"GATE MASUK",-1)),We=["value"],Qe=O(()=>u("div",{class:"label-big"},"TARIF",-1)),Ze=O(()=>u("div",{class:"label-big"},"TARIF + DENDA",-1)),Xe=["value"],et=["src"],tt={key:1,class:"flex flex-row justify-content-center align-items-center",style:{height:"calc(100vh - 145px)"}},at=O(()=>u("div",{class:"text-center text-5xl text-danger"}," KOMPUTER INI TIDAK TERDAFTAR SEBAGAI POS ",-1)),nt=[at],ot={__name:"index",setup(S){const K=je(),{api:C,toRupiah:D}=_e(),d=Le(),e=Ne({nomor_barcode:"",tarif:"",denda:""}),w=Q([]),j=Q(!1),b=Q(null),H=Q(null),m=q(()=>K.pos),c=q(()=>K.setting),T=q(()=>K.gateInList),y=q(()=>K.jenisKendaraanList),U=q(()=>{if(!e.time_in||!e.time_out)return"00:00:00";let a=h(e.time_in),t=h(e.time_out),o=t.diff(a,"days"),l=t.diff(a,"hours"),x=t.diff(a,"minutes");return t.diff(a,"seconds"),`${o}HR ${String(l%24).padStart(2,"0")}:${String(x%60).padStart(2,"0")}`}),Y=q(()=>Number(e.tarif)+Number(e.denda)),te=()=>{W(`${U}|${D(Y)}`),document.querySelector("#submit-btn").focus()},G=()=>{T.value.length==1&&(e.gate_in_id=T.value[0].id),e.gate_in_id?document.querySelector("#submit-btn").focus():document.querySelector("#gate-in").focus(),W(`${U}|${D(Y)}`)},J=()=>{document.querySelector("#submit-btn1").focus()},R=()=>{document.querySelector("#submit-btn").focus()},$=()=>{e.group=y.value.find(_=>_.nama==e.jenis_kendaraan).group;const a=m.value.gate_outs.find(_=>_.jenis_kendaraan.includes(e.jenis_kendaraan));if(!a){g({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"});return}if(e.gate_out_id=a.id,e.id&&ue(),e.is_member){e.tarif=0,document.querySelector("#submit-btn").focus();return}const t=y.value.find(_=>_.nama==e.jenis_kendaraan);if(!t){g({message:"Tarif tidak ditemukan untuk jenis kendaraan "+e.jenis_kendaraan,type:"error",showClose:!0}),e.tarif=0;return}e.nomor_barcode.toLowerCase()=="xxxxx"?e.denda=Number(t.denda_tiket_hilang):e.denda=0;let o=h(e.time_in),l=e.time_out?h(e.time_out):h(),x=l.diff(o,"minutes")||1,E=t.tarif_menit_pertama;if(x<=t.menit_pertama){e.tarif=E,document.querySelector("#submit-btn").focus(),W(`${U}|${D(Y)}`);return}let r=x-t.menit_pertama,p;if(t.mode_menginap==0&&(p=Math.ceil(x/(60*24)),p==0&&t.mode_tarif==0&&(p=1)),t.mode_menginap==1){let _=h(o.format("YYYY-MM-DD")),I=h(l.format("YYYY-MM-DD"));p=0,x>=60?p=I.diff(_,"days")+1:p=1}let A=p>=1?p-1:0,L=A*t.tarif_menginap;if(t.mode_tarif==0&&(e.tarif=E+p*t.tarif_flat+L),t.mode_tarif==1){let _=A*t.tarif_maksimum;if(t.mode_menginap==0){const I=x%1440;let P=0;I<=t.menit_pertama?P=t.tarif_menit_pertama:P=t.tarif_menit_pertama+Math.ceil((I-t.menit_pertama)/t.menit_selanjutnya)*t.tarif_menit_selanjutnya,P>t.tarif_maksimum&&(P=t.tarif_maksimum),e.tarif=_+P+L}if(t.mode_menginap==1)if(p>1){let I=h(o.format("YYYY-MM-DD")+" 24:00:00").diff(o,"minutes")-t.menit_pertama,P=l.diff(h(l.format("YYYY-MM-DD")+" 00:00:00"),"minutes"),oe=Math.ceil(I/t.menit_selanjutnya)*t.tarif_menit_selanjutnya;tarifHariTerakhir=Math.ceil(P/t.menit_selanjutnya)*t.tarif_menit_selanjutnya,oe>t.tarif_maksimum&&(oe=t.tarif_maksimum),tarifHariTerakhir>t.tarif_maksimum&&(tarifHariTerakhir=t.tarif_maksimum),p<=2&&(_=0),e.tarif=E+_+oe+tarifHariTerakhir+L}else tarifHariPertama=Math.ceil(r/t.menit_selanjutnya)*t.tarif_menit_selanjutnya,tarifHariPertama>t.tarif_maksimum&&(tarifHariPertama=t.tarif_maksimum),e.tarif=E+tarifHariPertama}e.nomor_barcode.toLowerCase()=="xxxxx"?document.querySelector("#time-in").focus():document.querySelector("#submit-btn").focus(),W(`${U}|${D(Y)}`)},z=()=>{let a={plat_nomor:e.plat_nomor};C("/api/member/search",{method:"get",query:a}).then(t=>{e.is_member=1,e.tarif=0}).catch(t=>{e.is_member=0}).finally(()=>{var t;document.querySelector("#nomor-tiket").focus(),(t=d==null?void 0:d.proxy)==null||t.$forceUpdate()})},k=async()=>{var t,o;if(e.nomor_barcode.length<5)return;let a=h().format("YYYY-MM-DD HH:mm:ss");if(e.nomor_barcode.toLowerCase()=="xxxxx"){e.time_in=h().format("YYYY-MM-DD"),(t=d==null?void 0:d.proxy)==null||t.$forceUpdate(),e.time_out=a,y.value.length>1?document.querySelector("#jenis-kendaraan").focus():(e.jenis_kendaraan=y.value[0].nama,document.querySelector("#time-in").focus());return}try{let l=await C("/api/parkingTransaction/search",{query:{nomor_barcode:e.nomor_barcode}});w.value=l.snapshots;const{id:x,gate_in_id:E,time_in:r,is_member:p,member:A}=l;if(e.id=x,e.gate_in_id=E,e.is_member=p,e.time_out=a,e.tarif=0,(o=d==null?void 0:d.proxy)==null||o.$forceUpdate(),!p&&y.value.length>1){document.querySelector("#jenis-kendaraan").focus();return}if(p){if(A.expired)return ElAlert("Kartu telah habis masa berlaku","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),e.is_member=0,!1;if(!A.expired&&A.expired_in<=5&&ElAlert(`Kartu akan habis masa berlaku dalam ${A.expired_in} hari`,"Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),c.value.disable_plat_nomor){const L=l.member.vehicles[0];if(e.jenis_kendaraan=L.jenis_kendaraan,e.plat_nomor=L.plat_nomor,c.value.member_auto_open){const _=m.gate_outs.find(I=>I.jenis_kendaraan.includes(e.jenis_kendaraan));if(!_){g({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"});return}e.gate_out_id=_.id,e.id&&ue(),se(!1)}}else A.vehicles.find(_=>_.plat_nomor==e.plat_nomor)?y.value.length>1&&document.querySelector("#jenis-kendaraan").focus():(ElAlert("Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah "+A.vehicles.map(_=>_.plat_nomor).join(", "),"Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),document.querySelector("#plat-nomor").focus())}y.value.length==1&&(e.jenis_kendaraan=y.value[0].nama,$())}catch(l){console.log(l),l.response.status==404&&g({message:l.response.data.message,type:"error",center:!0,showClose:!0,duration:3e3}),document.querySelector("#nomor-tiket").focus()}},re=()=>{var a;ge(),e.tarif="",e.denda="",e.gate_in_id=null,e.gate_out_id=null,e.jenis_kendaraan=null,e.plat_nomor=c.value.plat_nomor_default,e.nomor_barcode="",e.time_out="",e.time_in="",e.duration="",w.value=[],(a=d==null?void 0:d.proxy)==null||a.$forceUpdate(),c.value.disable_plat_nomor?(console.log("ke nomor tiket"),document.querySelector("#nomor-tiket").focus()):(console.log("ke plat nomor"),document.querySelector("#plat-nomor").focus())},ie=a=>{var t,o;if(e.nomor_barcode.toLowerCase()=="xxxxx"&&!e.time_in){document.querySelector("#time-in").focus();return}else document.querySelector("#submit-btn").blur();if(T.value.length==1&&(e.gate_in_id=T.value[0].id),!e.gate_in_id){g({message:"MOHON ISI GATE IN",type:"error",showClose:!0});return}if(!(!e.nomor_barcode||!e.gate_out_id||!e.jenis_kendaraan||!e.time_out)){if(((t=e.time_in)==null?void 0:t.length)<16){g({message:"FORMAT TIME IN SALAH",type:"error",showClose:!0});return}((o=e.time_in)==null?void 0:o.length)==16&&(e.time_in+=":00"),se(a)}},se=async a=>{e.ticket=a;const t=e.id?`/api/parkingTransaction/${e.id}`:"/api/parkingTransaction";try{const o=await C(t,{method:e.id?"put":"post",body:e});g({message:o.data.message,type:"success"});const l=e.gate_out_id;le(l)}catch(o){g({message:o.response._data.message,type:"error",showClose:!0})}},pe=()=>{b.value=new WebSocket(`ws://${m.value.ip_address}:5678/`),b.value.onerror=a=>{g({message:"KONEKSI KE POS GAGAL",type:"error"})},b.value.onopen=a=>{console.log("POS TEKONEKSI")},b.value.onmessage=a=>{let t=JSON.parse(a.data);console.error(t)}},le=a=>{const t=m.value.gate_outs.find(o=>o.id==a);b.value.send(["open",t.device,t.baudrate,t.open_command,t.close_command].join(";")),setTimeout(re,3e3)},W=a=>{const t=m.value.gate_outs.find(o=>o.id==e.gate_out_id);t&&(!t.running_text_device||!t.running_text_baudrate||b.value.send(["rt",t.running_text_device,t.running_text_baudrate,a].join(";")))},ge=()=>{const a=m.value.gate_outs.find(t=>t.id==e.gate_out_id);a&&(!a.running_text_device||!a.running_text_baudrate||b.value.send(["rrt",a.running_text_device,a.running_text_baudrate].join(";")))},ae=async()=>{try{const a=await C("/api/parkingTransaction/printLastTransaction",{method:"post",body:{pos_id:e.pos_id}});g({message:a.message,type:"success",showClose:!0})}catch(a){g({message:a.response._data.message,type:"error",showClose:!0})}},ne=async()=>{let a={pos_id:e.pos_id,date:h().format("YYYY-MM-DD")};try{await C("/api/parkingTransaction/printReport",{method:"post",body:a}),g({message:"SILAKAN AMBIL STRUK",type:"success",showClose:!0})}catch(t){g({message:t.response._data.message,type:"error",showClose:!0})}},ye=async()=>{await K.getPos(),m.value&&(e.pos_id=m.value.id,m.value.gate_outs.length==1&&(e.gate_out_id=m.value.gate_outs[0].id),e.plat_nomor=c.value.plat_nomor_default,c.value.disable_plat_nomor?document.querySelector("#nomor-tiket").focus():document.querySelector("#plat-nomor").focus(),pe())},ue=async()=>{var a;try{const t=await C(`/api/parkingTransaction/takeSnapshot/${e.id}`,{method:"post",body:{gate_out_id:e.gate_out_id}});w.value=t,(a=d==null?void 0:d.proxy)==null||a.$forceUpdate()}catch(t){g({message:t.response._data.message,type:"error",showClose:!0})}};return fe(async()=>{await ye(),m.value&&(document.getElementById("gate-out-app").addEventListener("keydown",a=>{var t;a.key=="-"&&(a.preventDefault(),re(),(t=d==null?void 0:d.proxy)==null||t.$forceUpdate()),a.key=="+"&&(a.preventDefault(),e.nomor_barcode="",e.time_out="",e.jenis_kendaraan="",e.tarif="",document.querySelector("#nomor-tiket").focus()),a.key=="*"&&(a.preventDefault(),e.jenis_kendaraan="",e.tarif="",document.querySelector("#jenis-kendaraan").focus()),a.key=="/"&&(a.preventDefault(),e.time_in="",document.querySelector("#time-in").focus()),a.key=="F10"&&(a.preventDefault(),ne()),a.key=="F11"&&(a.preventDefault(),j.value=!0),a.key=="F12"&&(a.preventDefault(),ae())}),H.value=Ue(K.getJenisKendaraanList,6e4))}),Oe(()=>{b.value&&b.value.close(),clearInterval(H.value)}),(a,t)=>{const o=ke,l=be,x=Ye,E=De("mask");return n(m)?(f(),M("div",$e,[u("div",qe,[u("h1",Re,V(n(m).nama),1),n(c).disable_plat_nomor?F("",!0):(f(),B(l,{key:0,gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[Ve]),_:1}),s(o,{span:14},{default:i(()=>[N(u("input",{id:"plat-nomor",autocomplete:"off",onKeyup:v(z,["enter"]),type:"text",placeholder:"NO. PLAT","onUpdate:modelValue":t[0]||(t[0]=r=>n(e).plat_nomor=r),class:"my-input"},null,544),[[Z,n(e).plat_nomor]])]),_:1})]),_:1})),s(l,{gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[Fe]),_:1}),s(o,{span:14},{default:i(()=>[N(u("input",{id:"nomor-tiket",autocomplete:"off",onKeyup:v(k,["enter"]),onKeydown:v(k,["tab"]),type:"text",placeholder:"NO. TIKET/KARTU","onUpdate:modelValue":t[1]||(t[1]=r=>n(e).nomor_barcode=r),class:"my-input"},null,544),[[Z,n(e).nomor_barcode]])]),_:1})]),_:1}),n(y).length>1?(f(),B(l,{key:1,gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[He]),_:1}),s(o,{span:14},{default:i(()=>[N(u("select",{onChange:$,"onUpdate:modelValue":t[2]||(t[2]=r=>n(e).jenis_kendaraan=r),id:"jenis-kendaraan",class:"my-input",placeholder:"JENIS KENDARAAN"},[(f(!0),M(X,null,ee(n(y),r=>(f(),M("option",{value:r.nama,key:r.id},V(r.shortcut_key)+" - "+V(r.nama),9,Ge))),128))],544),[[ce,n(e).jenis_kendaraan]])]),_:1})]),_:1})):F("",!0),N(s(l,{gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[Je]),_:1}),s(o,{span:14},{default:i(()=>[N(u("input",{onKeyup:v(G,["enter"]),onChange:$,id:"time-in","onUpdate:modelValue":t[3]||(t[3]=r=>n(e).time_in=r),class:"my-input"},null,544),[[E,"####-##-## ##:##"],[Z,n(e).time_in]])]),_:1})]),_:1},512),[[me,n(e).nomor_barcode=="xxxxx"]]),n(T).length>1?N((f(),B(l,{key:2,gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[ze]),_:1}),s(o,{span:14},{default:i(()=>[N(u("select",{onChange:te,"onUpdate:modelValue":t[4]||(t[4]=r=>n(e).gate_in_id=r),id:"gate-in",class:"my-input"},[(f(!0),M(X,null,ee(n(T),r=>(f(),M("option",{value:r.id,key:r.id},V(r.shortcut_key)+" - "+V(r.nama),9,We))),128))],544),[[ce,n(e).gate_in_id]])]),_:1})]),_:1},512)),[[me,n(e).nomor_barcode=="xxxxx"]]):F("",!0),s(l,{gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[Qe]),_:1}),s(o,{span:14},{default:i(()=>[N(u("input",{disabled:"","onUpdate:modelValue":t[5]||(t[5]=r=>n(e).tarif=r),class:"my-input bg-red-700 text-white"},null,512),[[Z,n(e).tarif]])]),_:1})]),_:1}),n(e).nomor_barcode=="xxxxx"?(f(),B(l,{key:3,gutter:10,style:{"margin-bottom":"10px"}},{default:i(()=>[s(o,{span:10},{default:i(()=>[Ze]),_:1}),s(o,{span:14},{default:i(()=>[u("input",{disabled:"",value:Number(n(e).tarif)+Number(n(e).denda),class:"my-input bg-red-700 text-white"},null,8,Xe)]),_:1})]),_:1})):F("",!0),u("button",{id:"submit-btn",onKeyup:[v(J,["right"]),v(J,["down"])],onKeydown:t[6]||(t[6]=v(r=>ie(!0),["enter"])),class:"my-big-btn",onClick:t[7]||(t[7]=r=>ie(!0))}," BUKA GATE ",32),u("button",{id:"submit-btn1",onKeyup:[v(R,["left"]),v(R,["up"])],onKeydown:v(ae,["enter"]),class:"my-big-btn",onClick:ae}," [F12] PRINT STRUK TRANSAKSI TERAKHIR ",32),s(l,{gutter:10},{default:i(()=>[s(o,{span:12},{default:i(()=>[u("button",{onKeydown:v(ne,["enter"]),class:"my-big-btn",onClick:ne}," [F10] PRINT LAPORAN ",32)]),_:1}),s(o,{span:12},{default:i(()=>[u("button",{class:"my-big-btn",onKeydown:t[8]||(t[8]=v(r=>j.value=!0,["enter"])),onClick:t[9]||(t[9]=r=>j.value=!0)}," [F11] BUKA GATE MANUAL ",32)]),_:1})]),_:1})]),u("div",{class:Ce({"ml-5":!0,flex:n(c).orientasi_kamera=="POTRAIT"}),style:{width:"100%"}},[(f(!0),M(X,null,ee(n(w),r=>(f(),M("div",{class:"mb-1",style:{width:"100%"},key:r.id},[u("img",{src:r.url,style:{width:"700px"}},null,8,et)]))),128))],2),s(x,{show:n(j),onClose:t[10]||(t[10]=r=>j.value=!1),gateOutList:n(m).gate_outs,onOpenGate:t[11]||(t[11]=r=>le(r))},null,8,["show","gateOutList"])])):(f(),M("div",tt,nt))}}},pt=Ie(ot,[["__scopeId","data-v-22bcb88d"]]);export{pt as default};