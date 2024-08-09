import{N as L,r as k,Q as Ee,aB as Pe,R as he,d as Be,g as N,A as b,G as X,z as T,a3 as Y,ag as we,E as Q,a7 as ne,J as ze,aC as Ne,c as I,S as re,o as Fe,e as De,i as V,t as p,T as B,x as C,K as c,O as ie,L as K,v as W,Y as j,U as O,y as F,a0 as q,M as Ue,B as x,ao as ke,ar as Te,a6 as ue,a8 as de}from"./CHu-kGv1.js";import{am as He,K as Ke,bg as Se,F as J,V as Ie,ab as D,G as ce,E as je,o as qe,n as Ge,bh as Xe,bi as fe,e as ve}from"./DaAgqxAe.js";import{d as Ye,e as Ze,h as Je,i as Qe,j as We}from"./D3ZzeeCF.js";import{_ as xe,h as _e,f as me}from"./BN4mFIMz.js";const en='a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',nn=e=>getComputedStyle(e).position==="fixed"?!1:e.offsetParent!==null,ge=e=>Array.from(e.querySelectorAll(en)).filter(n=>tn(n)&&nn(n)),tn=e=>{if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return!(e.type==="hidden"||e.type==="file");case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},In=function(e,n,...t){let o;n.includes("mouse")||n.includes("click")?o="MouseEvents":n.includes("key")?o="KeyboardEvent":o="HTMLEvents";const r=document.createEvent(o);return r.initEvent(n,...t),e.dispatchEvent(r),e},on=e=>["",...He].includes(e),_="_trap-focus-children",M=[],pe=e=>{if(M.length===0)return;const n=M[M.length-1][_];if(n.length>0&&e.code===Ke.tab){if(n.length===1){e.preventDefault(),document.activeElement!==n[0]&&n[0].focus();return}const t=e.shiftKey,o=e.target===n[0],r=e.target===n[n.length-1];o&&t&&(e.preventDefault(),n[n.length-1].focus()),r&&!t&&(e.preventDefault(),n[0].focus())}},sn={beforeMount(e){e[_]=ge(e),M.push(e),M.length<=1&&document.addEventListener("keydown",pe)},updated(e){L(()=>{e[_]=ge(e)})},unmounted(){M.shift(),M.length===0&&document.removeEventListener("keydown",pe)}};function ln(e){let n;const t=k(!1),o=Ee({...e,originalPosition:"",originalOverflow:"",visible:!1});function r(l){o.text=l}function a(){const l=o.parent,v=m.ns;if(!l.vLoadingAddClassList){let g=l.getAttribute("loading-number");g=Number.parseInt(g)-1,g?l.setAttribute("loading-number",g.toString()):(J(l,v.bm("parent","relative")),l.removeAttribute("loading-number")),J(l,v.bm("parent","hidden"))}i(),y.unmount()}function i(){var l,v;(v=(l=m.$el)==null?void 0:l.parentNode)==null||v.removeChild(m.$el)}function d(){var l;e.beforeClose&&!e.beforeClose()||(t.value=!0,clearTimeout(n),n=window.setTimeout(f,400),o.visible=!1,(l=e.closed)==null||l.call(e))}function f(){if(!t.value)return;const l=o.parent;t.value=!1,l.vLoadingAddClassList=void 0,a()}const s=Be({name:"ElLoading",setup(l,{expose:v}){const{ns:g,zIndex:E}=Se("loading");return v({ns:g,zIndex:E}),()=>{const P=o.spinner||o.svg,S=N("svg",{class:"circular",viewBox:o.svgViewBox?o.svgViewBox:"0 0 50 50",...P?{innerHTML:P}:{}},[N("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),A=o.text?N("p",{class:g.b("text")},[o.text]):void 0;return N(we,{name:g.b("fade"),onAfterLeave:f},{default:b(()=>[X(T("div",{style:{backgroundColor:o.background||""},class:[g.b("mask"),o.customClass,o.fullscreen?"is-fullscreen":""]},[N("div",{class:g.b("spinner")},[S,A])]),[[Y,o.visible]])])})}}}),y=Pe(s),m=y.mount(document.createElement("div"));return{...he(o),setText:r,removeElLoadingChild:i,close:d,handleAfterLeave:f,vm:m,get $el(){return m.$el}}}let G;const ee=function(e={}){if(!Ie)return;const n=an(e);if(n.fullscreen&&G)return G;const t=ln({...n,closed:()=>{var r;(r=n.closed)==null||r.call(n),n.fullscreen&&(G=void 0)}});rn(n,n.parent,t),be(n,n.parent,t),n.parent.vLoadingAddClassList=()=>be(n,n.parent,t);let o=n.parent.getAttribute("loading-number");return o?o=`${Number.parseInt(o)+1}`:o="1",n.parent.setAttribute("loading-number",o),n.parent.appendChild(t.$el),L(()=>t.visible.value=n.visible),n.fullscreen&&(G=t),t},an=e=>{var n,t,o,r;let a;return Q(e.target)?a=(n=document.querySelector(e.target))!=null?n:document.body:a=e.target||document.body,{parent:a===document.body||e.body?document.body:a,background:e.background||"",svg:e.svg||"",svgViewBox:e.svgViewBox||"",spinner:e.spinner||!1,text:e.text||"",fullscreen:a===document.body&&((t=e.fullscreen)!=null?t:!0),lock:(o=e.lock)!=null?o:!1,customClass:e.customClass||"",visible:(r=e.visible)!=null?r:!0,target:a}},rn=async(e,n,t)=>{const{nextZIndex:o}=t.vm.zIndex||t.vm._.exposed.zIndex,r={};if(e.fullscreen)t.originalPosition.value=D(document.body,"position"),t.originalOverflow.value=D(document.body,"overflow"),r.zIndex=o();else if(e.parent===document.body){t.originalPosition.value=D(document.body,"position"),await L();for(const a of["top","left"]){const i=a==="top"?"scrollTop":"scrollLeft";r[a]=`${e.target.getBoundingClientRect()[a]+document.body[i]+document.documentElement[i]-Number.parseInt(D(document.body,`margin-${a}`),10)}px`}for(const a of["height","width"])r[a]=`${e.target.getBoundingClientRect()[a]}px`}else t.originalPosition.value=D(n,"position");for(const[a,i]of Object.entries(r))t.$el.style[a]=i},be=(e,n,t)=>{const o=t.vm.ns||t.vm._.exposed.ns;["absolute","fixed","sticky"].includes(t.originalPosition.value)?J(n,o.bm("parent","relative")):ce(n,o.bm("parent","relative")),e.fullscreen&&e.lock?ce(n,o.bm("parent","hidden")):J(n,o.bm("parent","hidden"))},Z=Symbol("ElLoading"),ye=(e,n)=>{var t,o,r,a;const i=n.instance,d=l=>ne(n.value)?n.value[l]:void 0,f=l=>{const v=Q(l)&&(i==null?void 0:i[l])||l;return v&&k(v)},s=l=>f(d(l)||e.getAttribute(`element-loading-${Ne(l)}`)),y=(t=d("fullscreen"))!=null?t:n.modifiers.fullscreen,m={text:s("text"),svg:s("svg"),svgViewBox:s("svgViewBox"),spinner:s("spinner"),background:s("background"),customClass:s("customClass"),fullscreen:y,target:(o=d("target"))!=null?o:y?void 0:e,body:(r=d("body"))!=null?r:n.modifiers.body,lock:(a=d("lock"))!=null?a:n.modifiers.lock};e[Z]={options:m,instance:ee(m)}},un=(e,n)=>{for(const t of Object.keys(n))ze(n[t])&&(n[t].value=e[t])},Ce={mounted(e,n){n.value&&ye(e,n)},updated(e,n){const t=e[Z];n.oldValue!==n.value&&(n.value&&!n.oldValue?ye(e,n):n.value&&n.oldValue?ne(n.value)&&un(n.value,t.options):t==null||t.instance.close())},unmounted(e){var n;(n=e[Z])==null||n.instance.close(),e[Z]=null}},Ln={install(e){e.directive("loading",Ce),e.config.globalProperties.$loading=ee},directive:Ce,service:ee},dn=Be({name:"ElMessageBox",directives:{TrapFocus:sn},components:{ElButton:je,ElFocusTrap:Ye,ElInput:qe,ElOverlay:Ze,ElIcon:Ge,...Xe},inheritAttrs:!1,props:{buttonSize:{type:String,validator:on},modal:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},closeOnHashChange:{type:Boolean,default:!0},center:Boolean,draggable:Boolean,overflow:Boolean,roundButton:{default:!1,type:Boolean},container:{type:String,default:"body"},boxType:{type:String,default:""}},emits:["vanish","action"],setup(e,{emit:n}){const{locale:t,zIndex:o,ns:r,size:a}=Se("message-box",I(()=>e.buttonSize)),{t:i}=t,{nextZIndex:d}=o,f=k(!1),s=Ee({autofocus:!0,beforeClose:null,callback:null,cancelButtonText:"",cancelButtonClass:"",confirmButtonText:"",confirmButtonClass:"",customClass:"",customStyle:{},dangerouslyUseHTMLString:!1,distinguishCancelAndClose:!1,icon:"",inputPattern:null,inputPlaceholder:"",inputType:"text",inputValue:null,inputValidator:null,inputErrorMessage:"",message:null,modalFade:!0,modalClass:"",showCancelButton:!1,showConfirmButton:!0,type:"",title:void 0,showInput:!1,action:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonDisabled:!1,editorErrorMessage:"",validateError:!1,zIndex:d()}),y=I(()=>{const u=s.type;return{[r.bm("icon",u)]:u&&fe[u]}}),m=ve(),l=ve(),v=I(()=>s.icon||fe[s.type]||""),g=I(()=>!!s.message),E=k(),P=k(),S=k(),A=k(),te=k(),Le=I(()=>s.confirmButtonClass);re(()=>s.inputValue,async u=>{await L(),e.boxType==="prompt"&&u!==null&&se()},{immediate:!0}),re(()=>f.value,u=>{var h,$;u&&(e.boxType!=="prompt"&&(s.autofocus?S.value=($=(h=te.value)==null?void 0:h.$el)!=null?$:E.value:S.value=E.value),s.zIndex=d()),e.boxType==="prompt"&&(u?L().then(()=>{var ae;A.value&&A.value.$el&&(s.autofocus?S.value=(ae=Oe())!=null?ae:E.value:S.value=E.value)}):(s.editorErrorMessage="",s.validateError=!1))});const Me=I(()=>e.draggable),Ae=I(()=>e.overflow);Je(E,P,Me,Ae),Fe(async()=>{await L(),e.closeOnHashChange&&window.addEventListener("hashchange",z)}),De(()=>{e.closeOnHashChange&&window.removeEventListener("hashchange",z)});function z(){f.value&&(f.value=!1,L(()=>{s.action&&n("action",s.action)}))}const oe=()=>{e.closeOnClickModal&&H(s.distinguishCancelAndClose?"close":"cancel")},$e=We(oe),Ve=u=>{if(s.inputType!=="textarea")return u.preventDefault(),H("confirm")},H=u=>{var h;e.boxType==="prompt"&&u==="confirm"&&!se()||(s.action=u,s.beforeClose?(h=s.beforeClose)==null||h.call(s,u,s,z):z())},se=()=>{if(e.boxType==="prompt"){const u=s.inputPattern;if(u&&!u.test(s.inputValue||""))return s.editorErrorMessage=s.inputErrorMessage||i("el.messagebox.error"),s.validateError=!0,!1;const h=s.inputValidator;if(typeof h=="function"){const $=h(s.inputValue);if($===!1)return s.editorErrorMessage=s.inputErrorMessage||i("el.messagebox.error"),s.validateError=!0,!1;if(typeof $=="string")return s.editorErrorMessage=$,s.validateError=!0,!1}}return s.editorErrorMessage="",s.validateError=!1,!0},Oe=()=>{const u=A.value.$refs;return u.input||u.textarea},le=()=>{H("close")},Re=()=>{e.closeOnPressEscape&&le()};return e.lockScroll&&Qe(f),{...he(s),ns:r,overlayEvent:$e,visible:f,hasMessage:g,typeClass:y,contentId:m,inputId:l,btnSize:a,iconComponent:v,confirmButtonClasses:Le,rootRef:E,focusStartRef:S,headerRef:P,inputRef:A,confirmRef:te,doClose:z,handleClose:le,onCloseRequested:Re,handleWrapperClick:oe,handleInputEnter:Ve,handleAction:H,t:i}}}),cn=["aria-label","aria-describedby"],fn=["aria-label"],vn=["id"];function mn(e,n,t,o,r,a){const i=V("el-icon"),d=V("close"),f=V("el-input"),s=V("el-button"),y=V("el-focus-trap"),m=V("el-overlay");return p(),B(we,{name:"fade-in-linear",onAfterLeave:n[11]||(n[11]=l=>e.$emit("vanish")),persisted:""},{default:b(()=>[X(T(m,{"z-index":e.zIndex,"overlay-class":[e.ns.is("message-box"),e.modalClass],mask:e.modal},{default:b(()=>[C("div",{role:"dialog","aria-label":e.title,"aria-modal":"true","aria-describedby":e.showInput?void 0:e.contentId,class:c(`${e.ns.namespace.value}-overlay-message-box`),onClick:n[8]||(n[8]=(...l)=>e.overlayEvent.onClick&&e.overlayEvent.onClick(...l)),onMousedown:n[9]||(n[9]=(...l)=>e.overlayEvent.onMousedown&&e.overlayEvent.onMousedown(...l)),onMouseup:n[10]||(n[10]=(...l)=>e.overlayEvent.onMouseup&&e.overlayEvent.onMouseup(...l))},[T(y,{loop:"",trapped:e.visible,"focus-trap-el":e.rootRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:b(()=>[C("div",{ref:"rootRef",class:c([e.ns.b(),e.customClass,e.ns.is("draggable",e.draggable),{[e.ns.m("center")]:e.center}]),style:ie(e.customStyle),tabindex:"-1",onClick:n[7]||(n[7]=K(()=>{},["stop"]))},[e.title!==null&&e.title!==void 0?(p(),W("div",{key:0,ref:"headerRef",class:c([e.ns.e("header"),{"show-close":e.showClose}])},[C("div",{class:c(e.ns.e("title"))},[e.iconComponent&&e.center?(p(),B(i,{key:0,class:c([e.ns.e("status"),e.typeClass])},{default:b(()=>[(p(),B(j(e.iconComponent)))]),_:1},8,["class"])):O("v-if",!0),C("span",null,F(e.title),1)],2),e.showClose?(p(),W("button",{key:0,type:"button",class:c(e.ns.e("headerbtn")),"aria-label":e.t("el.messagebox.close"),onClick:n[0]||(n[0]=l=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel")),onKeydown:n[1]||(n[1]=q(K(l=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel"),["prevent"]),["enter"]))},[T(i,{class:c(e.ns.e("close"))},{default:b(()=>[T(d)]),_:1},8,["class"])],42,fn)):O("v-if",!0)],2)):O("v-if",!0),C("div",{id:e.contentId,class:c(e.ns.e("content"))},[C("div",{class:c(e.ns.e("container"))},[e.iconComponent&&!e.center&&e.hasMessage?(p(),B(i,{key:0,class:c([e.ns.e("status"),e.typeClass])},{default:b(()=>[(p(),B(j(e.iconComponent)))]),_:1},8,["class"])):O("v-if",!0),e.hasMessage?(p(),W("div",{key:1,class:c(e.ns.e("message"))},[Ue(e.$slots,"default",{},()=>[e.dangerouslyUseHTMLString?(p(),B(j(e.showInput?"label":"p"),{key:1,for:e.showInput?e.inputId:void 0,innerHTML:e.message},null,8,["for","innerHTML"])):(p(),B(j(e.showInput?"label":"p"),{key:0,for:e.showInput?e.inputId:void 0},{default:b(()=>[x(F(e.dangerouslyUseHTMLString?"":e.message),1)]),_:1},8,["for"]))])],2)):O("v-if",!0)],2),X(C("div",{class:c(e.ns.e("input"))},[T(f,{id:e.inputId,ref:"inputRef",modelValue:e.inputValue,"onUpdate:modelValue":n[2]||(n[2]=l=>e.inputValue=l),type:e.inputType,placeholder:e.inputPlaceholder,"aria-invalid":e.validateError,class:c({invalid:e.validateError}),onKeydown:q(e.handleInputEnter,["enter"])},null,8,["id","modelValue","type","placeholder","aria-invalid","class","onKeydown"]),C("div",{class:c(e.ns.e("errormsg")),style:ie({visibility:e.editorErrorMessage?"visible":"hidden"})},F(e.editorErrorMessage),7)],2),[[Y,e.showInput]])],10,vn),C("div",{class:c(e.ns.e("btns"))},[e.showCancelButton?(p(),B(s,{key:0,loading:e.cancelButtonLoading,class:c([e.cancelButtonClass]),round:e.roundButton,size:e.btnSize,onClick:n[3]||(n[3]=l=>e.handleAction("cancel")),onKeydown:n[4]||(n[4]=q(K(l=>e.handleAction("cancel"),["prevent"]),["enter"]))},{default:b(()=>[x(F(e.cancelButtonText||e.t("el.messagebox.cancel")),1)]),_:1},8,["loading","class","round","size"])):O("v-if",!0),X(T(s,{ref:"confirmRef",type:"primary",loading:e.confirmButtonLoading,class:c([e.confirmButtonClasses]),round:e.roundButton,disabled:e.confirmButtonDisabled,size:e.btnSize,onClick:n[5]||(n[5]=l=>e.handleAction("confirm")),onKeydown:n[6]||(n[6]=q(K(l=>e.handleAction("confirm"),["prevent"]),["enter"]))},{default:b(()=>[x(F(e.confirmButtonText||e.t("el.messagebox.confirm")),1)]),_:1},8,["loading","class","round","disabled","size"]),[[Y,e.showConfirmButton]])],2)],6)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])],42,cn)]),_:3},8,["z-index","overlay-class","mask"]),[[Y,e.visible]])]),_:3})}var gn=xe(dn,[["render",mn],["__file","index.vue"]]);const U=new Map,pn=e=>{let n=document.body;return e.appendTo&&(Q(e.appendTo)&&(n=document.querySelector(e.appendTo)),me(e.appendTo)&&(n=e.appendTo),me(n)||(n=document.body)),n},bn=(e,n,t=null)=>{const o=T(gn,e,de(e.message)||ke(e.message)?{default:de(e.message)?e.message:()=>e.message}:null);return o.appContext=t,Te(o,n),pn(e).appendChild(n.firstElementChild),o.component},yn=()=>document.createElement("div"),Cn=(e,n)=>{const t=yn();e.onVanish=()=>{Te(null,t),U.delete(r)},e.onAction=a=>{const i=U.get(r);let d;e.showInput?d={value:r.inputValue,action:a}:d=a,e.callback?e.callback(d,o.proxy):a==="cancel"||a==="close"?e.distinguishCancelAndClose&&a!=="cancel"?i.reject("close"):i.reject("cancel"):i.resolve(d)};const o=bn(e,t,n),r=o.proxy;for(const a in e)ue(e,a)&&!ue(r.$props,a)&&(r[a]=e[a]);return r.visible=!0,r};function R(e,n=null){if(!Ie)return Promise.reject();let t;return Q(e)||ke(e)?e={message:e}:t=e.callback,new Promise((o,r)=>{const a=Cn(e,n??R._context);U.set(a,{options:e,callback:t,resolve:o,reject:r})})}const En=["alert","confirm","prompt"],hn={alert:{closeOnPressEscape:!1,closeOnClickModal:!1},confirm:{showCancelButton:!0},prompt:{showCancelButton:!0,showInput:!0}};En.forEach(e=>{R[e]=Bn(e)});function Bn(e){return(n,t,o,r)=>{let a="";return ne(t)?(o=t,a=""):_e(t)?a="":a=t,R(Object.assign({title:a,message:n,type:"",...hn[e]},o,{boxType:e}),r)}}R.close=()=>{U.forEach((e,n)=>{n.doClose()}),U.clear()};R._context=null;const w=R;w.install=e=>{w._context=e._context,e.config.globalProperties.$msgbox=w,e.config.globalProperties.$messageBox=w,e.config.globalProperties.$alert=w.alert,e.config.globalProperties.$confirm=w.confirm,e.config.globalProperties.$prompt=w.prompt};const Mn=w;export{Mn as E,Ln as a,on as i,In as t,Ce as v};
