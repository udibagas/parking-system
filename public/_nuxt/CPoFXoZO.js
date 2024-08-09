import{a8 as se,d as j,F as q,c as E,t as A,v as V,x as R,M as k,K as y,I as a,y as ne,z as N,A as w,T as G,Y as le,U as _,O as W,r as I,S as J,N as ie,o as re,a1 as de,am as ce,P as ue,G as fe,aj as pe,aG as ge,a3 as me,ag as ve,ah as ye,l as be,aH as he}from"./WnufC-eR.js";import{F as Ce,h as Le,i as we,m as ke,e as Ie,d as Ee,j as Se}from"./-9Ah47V1.js";import{L as Te,M as Ae,n as Be,bj as De,U as Q,Z as Pe,e as Z,a_ as Fe,S as Me,b5 as Y,V as $e,c as Oe,t as Re}from"./FQKVPwEX.js";import{b as X,_ as x,e as H,a as Ne,k as je,u as Ke,w as ze}from"./CzXekRz_.js";const Ue=(...e)=>o=>{e.forEach(r=>{se(r)?r(o):r.value=o})},ee=Symbol("dialogInjectionKey"),ae=X({center:Boolean,alignCenter:Boolean,closeIcon:{type:Te},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),Ve={close:()=>!0},Ge=["aria-level"],_e=["aria-label"],qe=["id"],Je=j({name:"ElDialogContent"}),Ze=j({...Je,props:ae,emits:Ve,setup(e){const o=e,{t:r}=Ae(),{Close:P}=De,{dialogRef:l,headerRef:f,bodyId:S,ns:n,style:b}=q(ee),{focusTrapRef:d}=q(Ce),p=E(()=>[n.b(),n.is("fullscreen",o.fullscreen),n.is("draggable",o.draggable),n.is("align-center",o.alignCenter),{[n.m("center")]:o.center}]),g=Ue(d,l),h=E(()=>o.draggable),u=E(()=>o.overflow);return Le(l,f,h,u),(s,T)=>(A(),V("div",{ref:a(g),class:y(a(p)),style:W(a(b)),tabindex:"-1"},[R("header",{ref_key:"headerRef",ref:f,class:y([a(n).e("header"),{"show-close":s.showClose}])},[k(s.$slots,"header",{},()=>[R("span",{role:"heading","aria-level":s.ariaLevel,class:y(a(n).e("title"))},ne(s.title),11,Ge)]),s.showClose?(A(),V("button",{key:0,"aria-label":a(r)("el.dialog.close"),class:y(a(n).e("headerbtn")),type:"button",onClick:T[0]||(T[0]=F=>s.$emit("close"))},[N(a(Be),{class:y(a(n).e("close"))},{default:w(()=>[(A(),G(le(s.closeIcon||a(P))))]),_:1},8,["class"])],10,_e)):_("v-if",!0)],2),R("div",{id:a(S),class:y(a(n).e("body"))},[k(s.$slots,"default")],10,qe),s.$slots.footer?(A(),V("footer",{key:0,class:y(a(n).e("footer"))},[k(s.$slots,"footer")],2)):_("v-if",!0)],6))}});var Ye=x(Ze,[["__file","dialog-content.vue"]]);const He=X({...ae,appendToBody:Boolean,appendTo:{type:H(String),default:"body"},beforeClose:{type:H(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1},headerAriaLevel:{type:String,default:"2"}}),We={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[Q]:e=>Ne(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Qe=(e,o)=>{var r;const l=de().emit,{nextZIndex:f}=Pe();let S="";const n=Z(),b=Z(),d=I(!1),p=I(!1),g=I(!1),h=I((r=e.zIndex)!=null?r:f());let u,s;const T=Fe("namespace",je),F=E(()=>{const c={},L=`--${T.value}-dialog`;return e.fullscreen||(e.top&&(c[`${L}-margin-top`]=e.top),e.width&&(c[`${L}-width`]=Me(e.width))),c}),K=E(()=>e.alignCenter?{display:"flex"}:{});function M(){l("opened")}function z(){l("closed"),l(Q,!1),e.destroyOnClose&&(g.value=!1)}function U(){l("close")}function $(){s==null||s(),u==null||u(),e.openDelay&&e.openDelay>0?{stop:u}=Y(()=>O(),e.openDelay):O()}function B(){u==null||u(),s==null||s(),e.closeDelay&&e.closeDelay>0?{stop:s}=Y(()=>t(),e.closeDelay):t()}function D(){function c(L){L||(p.value=!0,d.value=!1)}e.beforeClose?e.beforeClose(c):B()}function m(){e.closeOnClickModal&&D()}function O(){$e&&(d.value=!0)}function t(){d.value=!1}function v(){l("openAutoFocus")}function C(){l("closeAutoFocus")}function te(c){var L;((L=c.detail)==null?void 0:L.focusReason)==="pointer"&&c.preventDefault()}e.lockScroll&&we(d);function oe(){e.closeOnPressEscape&&D()}return J(()=>e.modelValue,c=>{c?(p.value=!1,$(),g.value=!0,h.value=ke(e.zIndex)?f():h.value++,ie(()=>{l("open"),o.value&&(o.value.scrollTop=0)})):d.value&&B()}),J(()=>e.fullscreen,c=>{o.value&&(c?(S=o.value.style.transform,o.value.style.transform=""):o.value.style.transform=S)}),re(()=>{e.modelValue&&(d.value=!0,g.value=!0,$())}),{afterEnter:M,afterLeave:z,beforeLeave:U,handleClose:D,onModalClick:m,close:B,doClose:t,onOpenAutoFocus:v,onCloseAutoFocus:C,onCloseRequested:oe,onFocusoutPrevented:te,titleId:n,bodyId:b,closed:p,style:F,overlayDialogStyle:K,rendered:g,visible:d,zIndex:h}},Xe=["aria-label","aria-labelledby","aria-describedby"],xe=j({name:"ElDialog",inheritAttrs:!1}),ea=j({...xe,props:He,emits:We,setup(e,{expose:o}){const r=e,P=ce();Oe({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},E(()=>!!P.title));const l=Ke("dialog"),f=I(),S=I(),n=I(),{visible:b,titleId:d,bodyId:p,style:g,overlayDialogStyle:h,rendered:u,zIndex:s,afterEnter:T,afterLeave:F,beforeLeave:K,handleClose:M,onModalClick:z,onOpenAutoFocus:U,onCloseAutoFocus:$,onCloseRequested:B,onFocusoutPrevented:D}=Qe(r,f);ue(ee,{dialogRef:f,headerRef:S,bodyId:p,ns:l,rendered:u,style:g});const m=Se(z),O=E(()=>r.draggable&&!r.fullscreen);return o({visible:b,dialogContentRef:n}),(t,v)=>(A(),G(ye,{to:t.appendTo,disabled:t.appendTo!=="body"?!1:!t.appendToBody},[N(ve,{name:"dialog-fade",onAfterEnter:a(T),onAfterLeave:a(F),onBeforeLeave:a(K),persisted:""},{default:w(()=>[fe(N(a(Ie),{"custom-mask-event":"",mask:t.modal,"overlay-class":t.modalClass,"z-index":a(s)},{default:w(()=>[R("div",{role:"dialog","aria-modal":"true","aria-label":t.title||void 0,"aria-labelledby":t.title?void 0:a(d),"aria-describedby":a(p),class:y(`${a(l).namespace.value}-overlay-dialog`),style:W(a(h)),onClick:v[0]||(v[0]=(...C)=>a(m).onClick&&a(m).onClick(...C)),onMousedown:v[1]||(v[1]=(...C)=>a(m).onMousedown&&a(m).onMousedown(...C)),onMouseup:v[2]||(v[2]=(...C)=>a(m).onMouseup&&a(m).onMouseup(...C))},[N(a(Ee),{loop:"",trapped:a(b),"focus-start-el":"container",onFocusAfterTrapped:a(U),onFocusAfterReleased:a($),onFocusoutPrevented:a(D),onReleaseRequested:a(B)},{default:w(()=>[a(u)?(A(),G(Ye,pe({key:0,ref_key:"dialogContentRef",ref:n},t.$attrs,{center:t.center,"align-center":t.alignCenter,"close-icon":t.closeIcon,draggable:a(O),overflow:t.overflow,fullscreen:t.fullscreen,"show-close":t.showClose,title:t.title,"aria-level":t.headerAriaLevel,onClose:a(M)}),ge({header:w(()=>[t.$slots.title?k(t.$slots,"title",{key:1}):k(t.$slots,"header",{key:0,close:a(M),titleId:a(d),titleClass:a(l).e("title")})]),default:w(()=>[k(t.$slots,"default")]),_:2},[t.$slots.footer?{name:"footer",fn:w(()=>[k(t.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):_("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Xe)]),_:3},8,["mask","overlay-class","z-index"]),[[me,a(b)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["to","disabled"]))}});var aa=x(ea,[["__file","dialog.vue"]]);const ia=ze(aa),ta=be(),i=$fetch.create({baseURL:ta.public.apiBase,credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json"}}),ra=he("website",{state:()=>({jenisKendaraanList:[],groupJenisKendaraanList:[],groupMemberList:[],memberList:[],navigationList:[],gateInList:[],gateOutList:[],kameraList:[],posList:[],printerList:[],shiftList:[],areaParkirList:[],setting:{},pos:null,siklus:[{value:"days",label:"hari"},{value:"weeks",label:"minggu"},{value:"months",label:"bulan"},{value:"years",label:"tahun"}]}),actions:{async getJenisKendaraanList(){const e=await i("/api/jenisKendaraan");this.jenisKendaraanList=e},async getGateInList(){const e=await i("/api/gateIn");this.gateInList=e},async getGateOutList(){const e=await i("/api/gateOut");this.gateOutList=e},async getKameraList(){const e=await i("/api/kamera");this.kameraList=e},async getPosList(){const e=await i("/api/pos");this.posList=e},async getAreaParkirList(){const e=await i("/api/areaParkir");this.areaParkirList=e},async getPrinterList(){const e=await i("/api/printer");this.printerList=e},async getShiftList(){const e=await i("/api/shift");this.shiftList=e},async getGroupMemberList(){const e=await i("/api/groupMember");this.groupMemberList=e},async getMemberList(){const o=await i("/api/member",{params:{columns:"id, nama, nomor_kartu, berbayar"}});this.memberList=o},async getNavigationList(){const e=await i("/api/getNavigation");this.navigationList=e},async getSetting(){try{const e=await i("/api/setting");this.setting=e}catch{Re({message:"BELUM ADA SETTING",type:"error",showClose:!0,duration:1e4})}},async getPos(){try{const e=await i("/api/getPosByIp");this.pos=e}catch{this.pos=null}}}});export{ia as E,Ue as c,ra as u};
