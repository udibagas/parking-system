import{V as ie,W as et,X as tt,Y as at,M as Le,Z as lt,n as oe,_ as ot,$ as nt,a0 as st,a1 as rt,B as Ae,a2 as it,a3 as ut,J as ue,K as re,a4 as dt,a5 as ct,a6 as mt,l as pt,s as ft,t as de,o as xe,E as Ce,p as _t,a7 as gt,z as ze,r as Ve,a8 as vt,j as ht,q as bt,m as Re,i as yt}from"./BAT-Ld6g.js";import{E as Se}from"./D2eW69lX.js";import{g as wt,E as kt}from"./SKkswepX.js";import{E as Ne,a as $e}from"./DjJRJ3v2.js";import{E as Oe,a as Ke,b as He}from"./3nOwQ98-.js";import{E as Pe,b as xt,a as Ct}from"./BuVvoiId.js";import{u as Te,E as Ee}from"./Cl7syasZ.js";import{b as je,e as me,m as Ue,i as be,u as Be,_ as Fe,w as We,f as St}from"./C3dg83P6.js";import{d as _e,ae as De,r as N,af as Tt,a9 as Et,c as E,S as ye,N as Xe,o as ge,t as u,T as I,z as t,A as o,x as l,K as O,I as e,O as we,L as se,U as M,v as L,V as ae,Y as Mt,W as ce,G as Me,a3 as Dt,M as fe,ag as Yt,ah as It,ai as Lt,y as g,aj as At,E as zt,a5 as Ge,B as Y,X as Vt,J as ke,_ as Rt}from"./TikhlFjX.js";import{u as ve}from"./CpIMnPZ6.js";import{h as pe}from"./C5S46NFB.js";import{E as Nt,a as $t}from"./XnK8wTjx.js";import{d as Ot,a as Kt,b as Ht}from"./DC2j73Sa.js";import{a as Pt,E as jt}from"./FlMsaLNR.js";import"./l0sNRNKZ.js";import{E as Ye,v as Je}from"./CufAtGlp.js";import{t as Ie}from"./CbPeXI4l.js";import"./CY9tAmGA.js";import"./Cpj98o6Y.js";const Ut=(r,h)=>{if(!ie||!r||!h)return!1;const m=r.getBoundingClientRect();let d;return h instanceof Element?d=h.getBoundingClientRect():d={top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},m.top<d.bottom&&m.bottom>d.top&&m.right>d.left&&m.left<d.right};var Bt="Expected a function";function he(r,h,m){var d=!0,p=!0;if(typeof r!="function")throw new TypeError(Bt);return et(m)&&(d="leading"in m?!!m.leading:d,p="trailing"in m?!!m.trailing:p),Ot(r,h,{leading:d,maxWait:h,trailing:p})}const Ft=je({urlList:{type:me(Array),default:()=>Ue([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:me(String)}}),Wt={close:()=>!0,switch:r=>be(r),rotate:r=>be(r)},Xt=["src","crossorigin"],Gt=_e({name:"ElImageViewer"}),Jt=_e({...Gt,props:Ft,emits:Wt,setup(r,{expose:h,emit:m}){var d;const p=r,y={CONTAIN:{name:"contain",icon:De(tt)},ORIGINAL:{name:"original",icon:De(at)}},{t:Q}=Le(),b=Be("image-viewer"),{nextZIndex:K}=lt(),c=N(),A=N([]),R=Tt(),D=N(!0),C=N(p.initialIndex),U=Et(y.CONTAIN),f=N({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),ee=N((d=p.zIndex)!=null?d:K()),z=E(()=>{const{urlList:s}=p;return s.length<=1}),i=E(()=>C.value===0),V=E(()=>C.value===p.urlList.length-1),k=E(()=>p.urlList[C.value]),j=E(()=>[b.e("btn"),b.e("prev"),b.is("disabled",!p.infinite&&i.value)]),X=E(()=>[b.e("btn"),b.e("next"),b.is("disabled",!p.infinite&&V.value)]),G=E(()=>{const{scale:s,deg:v,offsetX:T,offsetY:F,enableTransition:Z}=f.value;let $=T/s,W=F/s;switch(v%360){case 90:case-270:[$,W]=[W,-$];break;case 180:case-180:[$,W]=[-$,-W];break;case 270:case-90:[$,W]=[-W,$];break}const ne={transform:`scale(${s}) rotate(${v}deg) translate(${$}px, ${W}px)`,transition:Z?"transform .3s":""};return U.value.name===y.CONTAIN.name&&(ne.maxWidth=ne.maxHeight="100%"),ne});function H(){B(),m("close")}function J(){const s=he(T=>{switch(T.code){case re.esc:p.closeOnPressEscape&&H();break;case re.space:_();break;case re.left:q();break;case re.up:S("zoomIn");break;case re.right:a();break;case re.down:S("zoomOut");break}}),v=he(T=>{const F=T.deltaY||T.deltaX;S(F<0?"zoomIn":"zoomOut",{zoomRate:p.zoomRate,enableTransition:!1})});R.run(()=>{ue(document,"keydown",s),ue(document,"wheel",v)})}function B(){R.stop()}function te(){D.value=!1}function le(s){D.value=!1,s.target.alt=Q("el.image.error")}function w(s){if(D.value||s.button!==0||!c.value)return;f.value.enableTransition=!1;const{offsetX:v,offsetY:T}=f.value,F=s.pageX,Z=s.pageY,$=he(ne=>{f.value={...f.value,offsetX:v+ne.pageX-F,offsetY:T+ne.pageY-Z}}),W=ue(document,"mousemove",$);ue(document,"mouseup",()=>{W()}),s.preventDefault()}function x(){f.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function _(){if(D.value)return;const s=dt(y),v=Object.values(y),T=U.value.name,Z=(v.findIndex($=>$.name===T)+1)%s.length;U.value=y[s[Z]],x()}function P(s){const v=p.urlList.length;C.value=(s+v)%v}function q(){i.value&&!p.infinite||P(C.value-1)}function a(){V.value&&!p.infinite||P(C.value+1)}function S(s,v={}){if(D.value)return;const{minScale:T,maxScale:F}=p,{zoomRate:Z,rotateDeg:$,enableTransition:W}={zoomRate:p.zoomRate,rotateDeg:90,enableTransition:!0,...v};switch(s){case"zoomOut":f.value.scale>T&&(f.value.scale=Number.parseFloat((f.value.scale/Z).toFixed(3)));break;case"zoomIn":f.value.scale<F&&(f.value.scale=Number.parseFloat((f.value.scale*Z).toFixed(3)));break;case"clockwise":f.value.deg+=$,m("rotate",f.value.deg);break;case"anticlockwise":f.value.deg-=$,m("rotate",f.value.deg);break}f.value.enableTransition=W}return ye(k,()=>{Xe(()=>{const s=A.value[0];s!=null&&s.complete||(D.value=!0)})}),ye(C,s=>{x(),m("switch",s)}),ge(()=>{var s,v;J(),(v=(s=c.value)==null?void 0:s.focus)==null||v.call(s)}),h({setActiveItem:P}),(s,v)=>(u(),I(It,{to:"body",disabled:!s.teleported},[t(Yt,{name:"viewer-fade",appear:""},{default:o(()=>[l("div",{ref_key:"wrapper",ref:c,tabindex:-1,class:O(e(b).e("wrapper")),style:we({zIndex:ee.value})},[l("div",{class:O(e(b).e("mask")),onClick:v[0]||(v[0]=se(T=>s.hideOnClickModal&&H(),["self"]))},null,2),M(" CLOSE "),l("span",{class:O([e(b).e("btn"),e(b).e("close")]),onClick:H},[t(e(oe),null,{default:o(()=>[t(e(ot))]),_:1})],2),M(" ARROW "),e(z)?M("v-if",!0):(u(),L(ae,{key:0},[l("span",{class:O(e(j)),onClick:q},[t(e(oe),null,{default:o(()=>[t(e(nt))]),_:1})],2),l("span",{class:O(e(X)),onClick:a},[t(e(oe),null,{default:o(()=>[t(e(st))]),_:1})],2)],64)),M(" ACTIONS "),l("div",{class:O([e(b).e("btn"),e(b).e("actions")])},[l("div",{class:O(e(b).e("actions__inner"))},[t(e(oe),{onClick:v[1]||(v[1]=T=>S("zoomOut"))},{default:o(()=>[t(e(rt))]),_:1}),t(e(oe),{onClick:v[2]||(v[2]=T=>S("zoomIn"))},{default:o(()=>[t(e(Ae))]),_:1}),l("i",{class:O(e(b).e("actions__divider"))},null,2),t(e(oe),{onClick:_},{default:o(()=>[(u(),I(Mt(e(U).icon)))]),_:1}),l("i",{class:O(e(b).e("actions__divider"))},null,2),t(e(oe),{onClick:v[3]||(v[3]=T=>S("anticlockwise"))},{default:o(()=>[t(e(it))]),_:1}),t(e(oe),{onClick:v[4]||(v[4]=T=>S("clockwise"))},{default:o(()=>[t(e(ut))]),_:1})],2)],2),M(" CANVAS "),l("div",{class:O(e(b).e("canvas"))},[(u(!0),L(ae,null,ce(s.urlList,(T,F)=>Me((u(),L("img",{ref_for:!0,ref:Z=>A.value[F]=Z,key:T,src:T,style:we(e(G)),class:O(e(b).e("img")),crossorigin:s.crossorigin,onLoad:te,onError:le,onMousedown:w},null,46,Xt)),[[Dt,F===C.value]])),128))],2),fe(s.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var qt=Fe(Jt,[["__file","image-viewer.vue"]]);const Zt=We(qt),Qt=je({hideOnClickModal:Boolean,src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:Boolean,scrollContainer:{type:me([String,Object])},previewSrcList:{type:me(Array),default:()=>Ue([])},previewTeleported:Boolean,zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:me(String)}}),ea={load:r=>r instanceof Event,error:r=>r instanceof Event,switch:r=>be(r),close:()=>!0,show:()=>!0},ta=["src","loading","crossorigin"],aa={key:0},la=_e({name:"ElImage",inheritAttrs:!1}),oa=_e({...la,props:Qt,emits:ea,setup(r,{emit:h}){const m=r;let d="";const{t:p}=Le(),y=Be("image"),Q=Lt(),b=ct(),K=N(),c=N(!1),A=N(!0),R=N(!1),D=N(),C=N(),U=ie&&"loading"in HTMLImageElement.prototype;let f,ee;const z=E(()=>[y.e("inner"),k.value&&y.e("preview"),A.value&&y.is("loading")]),i=E(()=>Q.style),V=E(()=>{const{fit:a}=m;return ie&&a?{objectFit:a}:{}}),k=E(()=>{const{previewSrcList:a}=m;return Array.isArray(a)&&a.length>0}),j=E(()=>{const{previewSrcList:a,initialIndex:S}=m;let s=S;return S>a.length-1&&(s=0),s}),X=E(()=>m.loading==="eager"?!1:!U&&m.loading==="lazy"||m.lazy),G=()=>{ie&&(A.value=!0,c.value=!1,K.value=m.src)};function H(a){A.value=!1,c.value=!1,h("load",a)}function J(a){A.value=!1,c.value=!0,h("error",a)}function B(){Ut(D.value,C.value)&&(G(),w())}const te=mt(B,200,!0);async function le(){var a;if(!ie)return;await Xe();const{scrollContainer:S}=m;St(S)?C.value=S:zt(S)&&S!==""?C.value=(a=document.querySelector(S))!=null?a:void 0:D.value&&(C.value=wt(D.value)),C.value&&(f=ue(C,"scroll",te),setTimeout(()=>B(),100))}function w(){!ie||!C.value||!te||(f==null||f(),C.value=void 0)}function x(a){if(a.ctrlKey){if(a.deltaY<0)return a.preventDefault(),!1;if(a.deltaY>0)return a.preventDefault(),!1}}function _(){k.value&&(ee=ue("wheel",x,{passive:!1}),d=document.body.style.overflow,document.body.style.overflow="hidden",R.value=!0,h("show"))}function P(){ee==null||ee(),document.body.style.overflow=d,R.value=!1,h("close")}function q(a){h("switch",a)}return ye(()=>m.src,()=>{X.value?(A.value=!0,c.value=!1,w(),le()):G()}),ge(()=>{X.value?le():G()}),(a,S)=>(u(),L("div",{ref_key:"container",ref:D,class:O([e(y).b(),a.$attrs.class]),style:we(e(i))},[c.value?fe(a.$slots,"error",{key:0},()=>[l("div",{class:O(e(y).e("error"))},g(e(p)("el.image.error")),3)]):(u(),L(ae,{key:1},[K.value!==void 0?(u(),L("img",At({key:0},e(b),{src:K.value,loading:a.loading,style:e(V),class:e(z),crossorigin:a.crossorigin,onClick:_,onLoad:H,onError:J}),null,16,ta)):M("v-if",!0),A.value?(u(),L("div",{key:1,class:O(e(y).e("wrapper"))},[fe(a.$slots,"placeholder",{},()=>[l("div",{class:O(e(y).e("placeholder"))},null,2)])],2)):M("v-if",!0)],64)),e(k)?(u(),L(ae,{key:2},[R.value?(u(),I(e(Zt),{key:0,"z-index":a.zIndex,"initial-index":e(j),infinite:a.infinite,"zoom-rate":a.zoomRate,"min-scale":a.minScale,"max-scale":a.maxScale,"url-list":a.previewSrcList,"hide-on-click-modal":a.hideOnClickModal,teleported:a.previewTeleported,"close-on-press-escape":a.closeOnPressEscape,onClose:P,onSwitch:q},{default:o(()=>[a.$slots.viewer?(u(),L("div",aa,[fe(a.$slots,"viewer")])):M("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","min-scale","max-scale","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):M("v-if",!0)],64)):M("v-if",!0)],6))}});var na=Fe(oa,[["__file","image.vue"]]);const sa=We(na),ra={class:"flex flex-row"},ia={class:"table-auto",style:{"min-width":"360px"}},ua=l("td",{style:{width:"150px"},class:"border bg-blue-700 text-white px-4 py-1"}," Nomor Barcode ",-1),da={class:"border bg-blue-100 px-4 py-1"},ca=l("td",{class:"border bg-blue-700 text-white px-4 py-1"}," Jenis Kendaraan ",-1),ma={class:"border bg-blue-100 px-4 py-1"},pa=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Plat Nomor",-1),fa={class:"border bg-blue-100 px-4 py-1"},_a=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Member",-1),ga={class:"border bg-blue-100 px-4 py-1"},va=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Nomor Kartu",-1),ha={class:"border bg-blue-100 px-4 py-1"},ba=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Gate Masuk",-1),ya={class:"border bg-blue-100 px-4 py-1"},wa=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Gate Keluar",-1),ka={class:"border bg-blue-100 px-4 py-1"},xa=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Waktu Masuk",-1),Ca={class:"border bg-blue-100 px-4 py-1"},Sa=l("td",{class:"border bg-blue-700 text-white px-4 py-1"}," Waktu Keluar ",-1),Ta={class:"border bg-blue-100 px-4 py-1"},Ea=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Durasi",-1),Ma={class:"border bg-blue-100 px-4 py-1"},Da={key:0},Ya=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Tarif",-1),Ia={class:"border bg-blue-100 px-4 py-1"},La={key:1},Aa=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Denda",-1),za={class:"border bg-blue-100 px-4 py-1"},Va=l("td",{class:"border bg-blue-700 text-white px-4 py-1"},"Operator",-1),Ra={class:"border bg-blue-100 px-4 py-1"},Na=["src"],$a={__name:"DetailTransaksi",props:["trx","show"],emits:["close"],setup(r,{emit:h}){const m=Te(),d=Ge(),p=h,{toRupiah:y}=ve(),Q=E(()=>m.setting),b=E(()=>d.user.value);return(K,c)=>{const A=Ee;return u(),I(A,{center:"",width:"80%",title:"DETAIL TRANSAKSI","model-value":r.show,"before-close":()=>p("close")},{default:o(()=>[l("div",ra,[l("table",ia,[l("tbody",null,[l("tr",null,[ua,l("td",da,g(r.trx.nomor_barcode),1)]),l("tr",null,[ca,l("td",ma,g(r.trx.jenis_kendaraan),1)]),l("tr",null,[pa,l("td",fa,g(r.trx.plat_nomor),1)]),l("tr",null,[_a,l("td",ga,g(r.trx.is_member?r.trx.member.nama:"Tidak"),1)]),l("tr",null,[va,l("td",ha,g(r.trx.nomor_kartu),1)]),l("tr",null,[ba,l("td",ya,g(r.trx.gate_in?r.trx.gate_in.nama:""),1)]),l("tr",null,[wa,l("td",ka,g(r.trx.gate_out?r.trx.gate_out.nama:""),1)]),l("tr",null,[xa,l("td",Ca,g(e(pe)(r.trx.time_in).format("DD-MMM-YYYY HH:mm:ss")),1)]),l("tr",null,[Sa,l("td",Ta,g(r.trx.time_out?e(pe)(r.trx.time_out).format("DD-MMM-YYYY HH:mm:ss"):""),1)]),l("tr",null,[Ea,l("td",Ma,g(r.trx.durasi),1)]),e(b).role==1?(u(),L("tr",Da,[Ya,l("td",Ia,g(e(y)(r.trx.tarif)),1)])):M("",!0),e(b).role==1?(u(),L("tr",La,[Aa,l("td",za,g(e(y)(r.trx.denda)),1)])):M("",!0),l("tr",null,[Va,l("td",Ra,g(r.trx.operator),1)])])]),r.trx.snapshots?(u(),L("div",{key:0,class:O({"ml-3":!0,"flex-grow":!0,flex:e(Q).orientasi_kamera=="POTRAIT"}),style:{width:"100%"}},[(u(!0),L(ae,null,ce(r.trx.snapshots,R=>(u(),L("div",{class:"mb-1",style:{width:"100%"},key:R.id},[l("img",{src:R.url,style:{width:"100%"}},null,8,Na)]))),128))],2)):M("",!0)])]),_:1},8,["model-value","before-close"])}}},Oa={__name:"FormTransaksiManual",props:["show","model"],emits:["close","reload"],setup(r,{emit:h}){const{api:m,formErrors:d}=ve(),p=Te(),y=h,{show:Q,model:b}=r,K=N(!1),c=E(()=>b),A=E(()=>p.pos),R=E(()=>p.gateOutList),D=E(()=>p.gateInList),C=E(()=>p.jenisKendaraanList),U=()=>{d.value={},y("close")},f=()=>{K.value=!0,c.value.manual=1,m("/api/parkingTransaction",{method:"POST",body:c.value}).then(({data:z,message:i})=>{de({message:i,type:"success",showClose:!0}),U(),y("reload"),ee(z.gate_out_id)}).catch(z=>{var i;((i=z.response)==null?void 0:i.status)==422?d.value=z.response._data.errors:console.log(z)}).finally(()=>K.value=!1)},ee=z=>{const i=R.value.find(k=>k.id==z),V=new WebSocket(`ws://${A.value.ip_address}:5678/`);V.onerror=k=>{de({message:"KONEKSI KE POS GAGAL",type:"error"})},V.onopen=k=>{V.send(["open",i.device,i.baudrate,i.open_command,i.close_command].join(";"))},V.onmessage=k=>{let j=JSON.parse(k.data);de({message:j.message,type:j.status?"success":"error"}),V.close()}};return(z,i)=>{const V=xe,k=Nt,j=Kt,X=Ht,G=Se,H=Pt,J=jt,B=$t,te=Ce,le=Ee;return u(),I(le,{"close-on-click-modal":!1,title:e(c).id?"EDIT TRANSAKSI "+e(c).nomor_barcode:"TRANSAKSI MANUAL","model-value":r.show,width:"800px","before-close":w=>U()},{footer:o(()=>[t(te,{icon:e(pt),onClick:U},{default:o(()=>[Y(" BATAL ")]),_:1},8,["icon"]),t(te,{type:"primary",icon:e(ft),onClick:f},{default:o(()=>[Y(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[t(B,{"label-position":"left","label-width":"150px"},{default:o(()=>[t(J,{gutter:30},{default:o(()=>[t(H,{span:12},{default:o(()=>{var w,x,_,P,q;return[t(k,{label:"Plat Nomor",error:(w=e(d).plat_nomor)==null?void 0:w.join(", ")},{default:o(()=>[t(V,{placeholder:"Plat Nomor",modelValue:e(c).plat_nomor,"onUpdate:modelValue":i[0]||(i[0]=a=>e(c).plat_nomor=a)},null,8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Gate Masuk",error:(x=e(d).gate_in_id)==null?void 0:x.join(", ")},{default:o(()=>[t(X,{modelValue:e(c).gate_in_id,"onUpdate:modelValue":i[1]||(i[1]=a=>e(c).gate_in_id=a),placeholder:"Gate Masuk",style:{width:"100%"}},{default:o(()=>[(u(!0),L(ae,null,ce(e(D),(a,S)=>(u(),I(j,{value:a.id,label:a.nama,key:S},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Waktu Masuk",error:(_=e(d).time_in)==null?void 0:_.join(", ")},{default:o(()=>[t(G,{type:"datetime",style:{width:"100%"},format:"DD-MMM-YYYY HH:mm","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"Waktu Masuk",modelValue:e(c).time_in,"onUpdate:modelValue":i[2]||(i[2]=a=>e(c).time_in=a)},null,8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Tarif (Rp)",error:(P=e(d).tarif)==null?void 0:P.join(", ")},{default:o(()=>[t(V,{type:"number",placeholder:"Tarif",modelValue:e(c).tarif,"onUpdate:modelValue":i[3]||(i[3]=a=>e(c).tarif=a)},null,8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"User Admin",error:(q=e(d).username)==null?void 0:q.join(", ")},{default:o(()=>[t(V,{placeholder:"User Admin",modelValue:e(c).username,"onUpdate:modelValue":i[4]||(i[4]=a=>e(c).username=a)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1}),t(H,{span:12},{default:o(()=>{var w,x,_,P,q;return[t(k,{label:"Jenis Kendaraan",error:(w=e(d).jenis_kendaraan)==null?void 0:w.join(", ")},{default:o(()=>[t(X,{modelValue:e(c).jenis_kendaraan,"onUpdate:modelValue":i[5]||(i[5]=a=>e(c).jenis_kendaraan=a),placeholder:"Jenis Kendaraan",style:{width:"100%"}},{default:o(()=>[(u(!0),L(ae,null,ce(e(C),(a,S)=>(u(),I(j,{value:a.nama,label:a.nama,key:S},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Gate Keluar",error:(x=e(d).gate_out_id)==null?void 0:x.join(", ")},{default:o(()=>[t(X,{modelValue:e(c).gate_out_id,"onUpdate:modelValue":i[6]||(i[6]=a=>e(c).gate_out_id=a),placeholder:"Gate Keluar",style:{width:"100%"}},{default:o(()=>[(u(!0),L(ae,null,ce(e(R),(a,S)=>(u(),I(j,{value:a.id,label:a.nama,key:S},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Waktu Keluar",error:(_=e(d).time_out)==null?void 0:_.join(", ")},{default:o(()=>[t(G,{type:"datetime",autocomplete:!1,style:{width:"100%"},format:"DD-MMM-YYYY HH:mm","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"Waktu Keluar",modelValue:e(c).time_out,"onUpdate:modelValue":i[7]||(i[7]=a=>e(c).time_out=a)},null,8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Denda (Rp)",error:(P=e(d).denda)==null?void 0:P.join(", ")},{default:o(()=>[t(V,{type:"number",placeholder:"Denda",modelValue:e(c).denda,"onUpdate:modelValue":i[8]||(i[8]=a=>e(c).denda=a)},null,8,["modelValue"])]),_:1},8,["error"]),t(k,{label:"Password Admin",error:(q=e(d).password)==null?void 0:q.join(", ")},{default:o(()=>[t(V,{type:"password",placeholder:"Password Admin",modelValue:e(c).password,"onUpdate:modelValue":i[9]||(i[9]=a=>e(c).password=a)},null,8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1})]),_:1})]),_:1},8,["title","model-value","before-close"])}}},Ka={class:"mr-2"},Ha=l("br",null,null,-1),Pa=l("br",null,null,-1),ja=l("br",null,null,-1),Ua={key:0,style:{"font-weight":"bold"}},Ba=l("br",null,null,-1),Fa=l("br",null,null,-1),Wa={class:"el-dropdown-link"},Xa=l("br",null,null,-1),Ga={__name:"ParkingTransaction",setup(r){const h=Te(),m=Ge(),{api:d,showForm:p,formErrors:y,formModel:Q,pageSize:b,tableData:K,loading:c,filters:A,keyword:R,openForm:D,currentChange:C,sizeChange:U,sortChange:f,filterChange:ee,requestData:z,searchData:i,refreshData:V}=ve("/api/parkingTransaction"),k=E(()=>h.jenisKendaraanList),j=E(()=>h.gateInList),X=E(()=>h.gateOutList),G=E(()=>h.shiftList),H=E(()=>m.user.value),J=N(null),B=N(null);Vt(()=>{h.getShiftList(),h.getPos()}),ge(()=>{A.value.dateRange=[],z()});const te=x=>{Ye.confirm("Anda yakin?","Confirm",{type:"warning"}).then(()=>d(`/api/parkingTransaction/setSudahKeluar/${x}`,{method:"PUT"})).then(_=>{de({message:_.message,type:"success"}),z()})},le=()=>{Ye.confirm("Anda yakin?","Confirm",{type:"warning"}).then(()=>d("/api/parkingTransaction/setSudahKeluarSemua",{method:"PUT",body:{dateRange:A.value.dateRange}})).then(x=>{de({message:x.message,type:"success"}),z()}).catch(x=>console.log(x))},w=x=>{d(`/api/parkingTransaction/printTicketOut/${x}`,{method:"POST"}).then(_=>{de({message:_.message,type:"success"})})};return(x,_)=>{const P=Ce,q=Se,a=kt,S=xe,s=Ne,v=oe,T=Oe,F=Ke,Z=He,$=$e,W=Pe,ne=$a,qe=Oa,Ze=Je;return u(),L(ae,null,[l("form",{class:"flex justify-content-end mb-3",onSubmit:_[3]||(_[3]=se(()=>{},["prevent"]))},[t(P,{size:"small",type:"primary",icon:e(_t),onClick:_[0]||(_[0]=n=>e(D)({})),class:"mr-2"},{default:o(()=>[Y(" TRANSAKSI MANUAL ")]),_:1},8,["icon"]),l("div",Ka,[t(q,{size:"small",onChange:e(z),modelValue:e(A).dateRange,"onUpdate:modelValue":_[1]||(_[1]=n=>e(A).dateRange=n),format:"DD-MMM-YYYY HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},null,8,["onChange","modelValue"])]),e(H).role==1?(u(),I(a,{key:0,class:"item",effect:"dark",content:"Set kendaraan sudah keluar untuk waktu terpilih",placement:"bottom"},{default:o(()=>[t(P,{size:"small",type:"danger",icon:e(gt),onClick:le,class:"mr-2"},null,8,["icon"])]),_:1})):M("",!0),t(S,{size:"small",modelValue:e(R),"onUpdate:modelValue":_[2]||(_[2]=n=>ke(R)?R.value=n:null),placeholder:"Cari","prefix-icon":e(ze),clearable:!0,onChange:e(i),style:{width:"150px"}},null,8,["modelValue","prefix-icon","onChange"])],32),Me((u(),I($,{data:e(K).data,stripe:"",onRowDblclick:_[4]||(_[4]=n=>{J.value=n,B.value=!0}),onFilterChange:e(ee),height:"calc(100vh - 240px)",onSortChange:e(f)},{default:o(()=>[t(s,{label:"No. Tiket",sortable:"custom",filters:e(k).map(n=>({value:n.nama,text:n.nama})),"column-key":"jenis_kendaraan","min-width":"150","show-overflow-tooltip":""},{default:o(({row:n})=>[l("strong",null,g(n.nomor_barcode),1),Ha,Y(" "+g(n.jenis_kendaraan)+" "+g(n.plat_nomor?`- ${n.plat_nomor}`:""),1)]),_:1},8,["filters"]),t(s,{prop:"time_in",label:"Masuk",sortable:"custom","show-overflow-tooltip":"","min-width":"140px","column-key":"gate_in_id",filters:e(j).map(n=>({value:n.id,text:n.nama}))},{default:o(({row:n})=>[Y(g(e(pe)(n.time_in).format("DD/MMM/YY HH:mm"))+" ",1),Pa,Y(" "+g(n.gate_in.nama),1)]),_:1},8,["filters"]),t(s,{prop:"time_out",label:"Keluar",sortable:"custom","show-overflow-tooltip":"","min-width":"140px","column-key":"gate_out_id",filters:e(X).map(n=>({value:n.id,text:n.nama}))},{default:o(({row:n})=>[Y(g(n.time_out?e(pe)(n.time_out).format("DD/MMM/YY HH:mm"):"")+" ",1),ja,Y(" "+g(n.gate_out?n.gate_out.nama:"-"),1)]),_:1},8,["filters"]),t(s,{label:"Durasi","show-overflow-tooltip":"",prop:"parking_transactions.tarif",sortable:"custom","min-width":"120px"},{default:o(({row:n})=>[Y(g(n.durasi)+" ",1),e(H).role==1?(u(),L("div",Ua,g(("toRupiah"in x?x.toRupiah:e(Ie))(n.tarif)),1)):M("",!0)]),_:1}),e(H).role==1?(u(),I(s,{key:0,prop:"denda",label:"Denda",align:"right","column-key":"denda",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"header-align":"right","min-width":"100px"},{default:o(({row:n})=>[Y(g(("toRupiah"in x?x.toRupiah:e(Ie))(n.denda)),1)]),_:1})):M("",!0),t(s,{label:"Member",sortable:"custom","show-overflow-tooltip":"","min-width":"120"},{default:o(({row:n})=>[l("strong",null,g(n.member?n.member.nama:""),1),Y(),Ba,Y(" "+g(n.nomor_kartu),1)]),_:1}),t(s,{prop:"operator",label:"Operator","show-overflow-tooltip":"","min-width":"90"}),t(s,{label:"Shift",prop:"shift.nama","column-key":"shift_id","min-width":"80",filters:e(G).map(n=>({value:n.id,text:n.nama}))},null,8,["filters"]),t(s,{label:"Edit",align:"center","header-align":"center","column-key":"edit",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"100px"},{default:o(({row:n})=>[Y(g(n.edit?"YA":"TIDAK")+" ",1),Fa,Y(" "+g(n.edit_by),1)]),_:1}),t(s,{label:"Manual",align:"center","header-align":"center","column-key":"manual",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"100px"},{default:o(({row:n})=>[Y(g(n.manual?"YA":"TIDAK"),1)]),_:1}),t(s,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[t(P,{link:"",onClick:e(V),icon:e(Ve)},null,8,["onClick","icon"])]),default:o(({row:n})=>[t(Z,null,{dropdown:o(()=>[t(F,null,{default:o(()=>[t(T,{icon:e(Ae),onClick:se(()=>{J.value=n,B.value=!0},["prevent"])},{default:o(()=>[Y(" Lihat Detail ")]),_:2},1032,["icon","onClick"]),!n.time_out&&e(H).role==1?(u(),I(T,{key:0,icon:e(vt),onClick:se(Qe=>te(n.id),["prevent"])},{default:o(()=>[Y(" Set Sudah Keluar ")]),_:2},1032,["icon","onClick"])):M("",!0),!n.is_member&&!n.edit&&!n.manual?(u(),I(T,{key:1,icon:e(ht),onClick:se(()=>{Q.value={...n},y.value={},p.value=!0},["prevent"])},{default:o(()=>[Y(" Edit ")]),_:2},1032,["icon","onClick"])):M("",!0),!n.is_member&&n.time_out?(u(),I(T,{key:2,icon:e(bt),onClick:se(Qe=>w(n.id),["prevent"])},{default:o(()=>[Y(" Print Tiket Keluar ")]),_:2},1032,["icon","onClick"])):M("",!0)]),_:2},1024)]),default:o(()=>[l("span",Wa,[t(v,null,{default:o(()=>[t(e(Re))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onFilterChange","onSortChange"])),[[Ze,e(c)]]),Xa,e(K).total?(u(),I(W,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(b),"page-sizes":[10,25,50,100],total:e(K).total,onCurrentChange:e(C),onSizeChange:e(U)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):M("",!0),e(J)?(u(),I(ne,{key:1,trx:e(J),show:e(B),onClose:_[5]||(_[5]=n=>B.value=!1)},null,8,["trx","show"])):M("",!0),e(p)?(u(),I(qe,{key:2,show:e(p),model:e(Q),onClose:_[6]||(_[6]=n=>p.value=!1),onReload:e(z)},null,8,["show","model","onReload"])):M("",!0)],64)}}},Ja={class:"el-dropdown-link"},qa=l("br",null,null,-1),Za=l("div",{slot:"error",class:"el-image__error"},[l("i",{class:"el-icon-picture-outline"})],-1),Qa={__name:"ManualOpenLog",setup(r){const{pageSize:h,tableData:m,loading:d,filters:p,keyword:y,currentChange:Q,sizeChange:b,sortChange:K,requestData:c,refreshData:A,searchData:R}=ve("/api/manualOpenLog"),D=N(!1),C=N([]);return ge(()=>{p.value.dateRange=[],c()}),(U,f)=>{const ee=Se,z=xe,i=Ne,V=Ce,k=oe,j=Oe,X=Ke,G=He,H=$e,J=Pe,B=sa,te=Ee,le=Je;return u(),L(ae,null,[l("form",{class:"flex justify-content-end mb-3",onSubmit:f[2]||(f[2]=se(()=>{},["prevent"]))},[l("div",null,[t(ee,{size:"small",onChange:e(c),modelValue:e(p).dateRange,"onUpdate:modelValue":f[0]||(f[0]=w=>e(p).dateRange=w),format:"DD-MMM-YYYY HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai",class:"mr-2"},null,8,["onChange","modelValue"])]),t(z,{size:"small",modelValue:e(y),"onUpdate:modelValue":f[1]||(f[1]=w=>ke(y)?y.value=w:null),placeholder:"Cari","prefix-icon":e(ze),clearable:"",onChange:e(R),style:{width:"200px"}},null,8,["modelValue","prefix-icon","onChange"])],32),Me((u(),I(H,{data:e(m).data,stripe:"",onRowDblclick:f[3]||(f[3]=(w,x,_)=>{C.value=w.snapshots,D.value=!0}),height:"calc(100vh - 240px)",onSortChange:e(K)},{default:o(()=>[t(i,{type:"index",index:e(m).from,label:"#"},null,8,["index"]),t(i,{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"",width:"180px"},{default:o(({row:w})=>[Y(g(e(pe)(w.created_at).format("DD-MMM-YYYY HH:mm:ss")),1)]),_:1}),t(i,{prop:"gate_out.nama",label:"Gate Out","show-overflow-tooltip":"","min-width":"150px"}),t(i,{prop:"user.name",label:"Operator","show-overflow-tooltip":"","min-width":"150px"}),t(i,{prop:"alasan",label:"Alasan",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}),t(i,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[t(V,{link:"",onClick:e(A),icon:e(Ve)},null,8,["onClick","icon"])]),default:o(({row:w})=>[t(G,null,{dropdown:o(()=>[t(X,null,{default:o(()=>[t(j,{icon:e(yt),onClick:se(()=>{C.value=w.snapshots,D.value=!0},["prevent"])},{default:o(()=>[Y("Lihat Snapshot")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[l("span",Ja,[t(k,null,{default:o(()=>[t(e(Re))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data","onSortChange"])),[[le,e(d)]]),qa,e(m).total?(u(),I(J,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(h),"page-sizes":[10,25,50,100],total:e(m).total,onCurrentChange:e(Q),onSizeChange:e(b)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):M("",!0),t(te,{center:"",modelValue:e(D),"onUpdate:modelValue":f[4]||(f[4]=w=>ke(D)?D.value=w:null),title:"SNAPSHOT"},{default:o(()=>[(u(!0),L(ae,null,ce(e(C),(w,x)=>(u(),I(B,{key:x,src:w.url,style:{width:"100%",height:"100%"},fit:"cover"},{default:o(()=>[Za]),_:2},1032,["src"]))),128))]),_:1},8,["modelValue"])],64)}}},el={};function tl(r,h){const m=Ga,d=Ct,p=Qa,y=xt;return u(),I(y,null,{default:o(()=>[t(d,{label:"TRANSAKSI PARKIR"},{default:o(()=>[t(m)]),_:1}),t(d,{label:"BUKA MANUAL"},{default:o(()=>[t(p)]),_:1})]),_:1})}const wl=Rt(el,[["render",tl]]);export{wl as default};
