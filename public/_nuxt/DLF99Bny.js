import{a5 as ae,d as O,a1 as K,c as D,t as T,v as U,x as N,X as w,T as m,E as e,y as se,z as M,A as k,M as j,Z as te,N as q,Y as X,r as E,a3 as Z,a4 as ne,o as re,L as ie,ak as de,a2 as ue,F as ce,ah as fe,aG as ve,S as ye,ae as pe,af as me}from"./V6XCBzcI.js";import{F as ge,j as be,k as Ce,l as he,m as ke,n as we,o as Ee}from"./86FBOCka.js";import{w as De,x as Fe,k as Ie,bh as Te,af as H,N as Be,a_ as G,aZ as Ae,ak as Se,b5 as J,J as $e,a3 as Le}from"./Cwhp1QW1.js";import{b as Q,_ as W,d as Y,h as Pe,k as Re,u as Ne,w as Me}from"./BcU_p3ET.js";const Oe=(...o)=>a=>{o.forEach(r=>{ae(r)?r(a):r.value=a})},x=Symbol("dialogInjectionKey"),ee=Q({center:Boolean,alignCenter:Boolean,closeIcon:{type:De},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),ze={close:()=>!0},Ve=["aria-level"],_e=["aria-label"],Ue=["id"],je=O({name:"ElDialogContent"}),qe=O({...je,props:ee,emits:ze,setup(o){const a=o,{t:r}=Fe(),{Close:S}=Te,{dialogRef:n,headerRef:c,bodyId:F,ns:t,style:g}=K(x),{focusTrapRef:i}=K(ge),f=D(()=>[t.b(),t.is("fullscreen",a.fullscreen),t.is("draggable",a.draggable),t.is("align-center",a.alignCenter),{[t.m("center")]:a.center}]),v=Oe(i,n),b=D(()=>a.draggable),u=D(()=>a.overflow);return be(n,c,b,u),(s,I)=>(T(),U("div",{ref:e(v),class:m(e(f)),style:X(e(g)),tabindex:"-1"},[N("header",{ref_key:"headerRef",ref:c,class:m([e(t).e("header"),{"show-close":s.showClose}])},[w(s.$slots,"header",{},()=>[N("span",{role:"heading","aria-level":s.ariaLevel,class:m(e(t).e("title"))},se(s.title),11,Ve)]),s.showClose?(T(),U("button",{key:0,"aria-label":e(r)("el.dialog.close"),class:m(e(t).e("headerbtn")),type:"button",onClick:I[0]||(I[0]=$=>s.$emit("close"))},[M(e(Ie),{class:m(e(t).e("close"))},{default:k(()=>[(T(),j(te(s.closeIcon||e(S))))]),_:1},8,["class"])],10,_e)):q("v-if",!0)],2),N("div",{id:e(F),class:m(e(t).e("body"))},[w(s.$slots,"default")],10,Ue),s.$slots.footer?(T(),U("footer",{key:0,class:m(e(t).e("footer"))},[w(s.$slots,"footer")],2)):q("v-if",!0)],6))}});var Ke=W(qe,[["__file","dialog-content.vue"]]);const Ze=Q({...ee,appendToBody:Boolean,appendTo:{type:Y(String),default:"body"},beforeClose:{type:Y(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1},headerAriaLevel:{type:String,default:"2"}}),Ge={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[H]:o=>Pe(o),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Je=(o,a)=>{var r;const n=ie().emit,{nextZIndex:c}=Be();let F="";const t=G(),g=G(),i=E(!1),f=E(!1),v=E(!1),b=E((r=o.zIndex)!=null?r:c());let u,s;const I=Ae("namespace",Re),$=D(()=>{const d={},h=`--${I.value}-dialog`;return o.fullscreen||(o.top&&(d[`${h}-margin-top`]=o.top),o.width&&(d[`${h}-width`]=Se(o.width))),d}),z=D(()=>o.alignCenter?{display:"flex"}:{});function L(){n("opened")}function V(){n("closed"),n(H,!1),o.destroyOnClose&&(v.value=!1)}function _(){n("close")}function P(){s==null||s(),u==null||u(),o.openDelay&&o.openDelay>0?{stop:u}=J(()=>R(),o.openDelay):R()}function B(){u==null||u(),s==null||s(),o.closeDelay&&o.closeDelay>0?{stop:s}=J(()=>l(),o.closeDelay):l()}function A(){function d(h){h||(f.value=!0,i.value=!1)}o.beforeClose?o.beforeClose(d):B()}function y(){o.closeOnClickModal&&A()}function R(){$e&&(i.value=!0)}function l(){i.value=!1}function p(){n("openAutoFocus")}function C(){n("closeAutoFocus")}function oe(d){var h;((h=d.detail)==null?void 0:h.focusReason)==="pointer"&&d.preventDefault()}o.lockScroll&&Ce(i);function le(){o.closeOnPressEscape&&A()}return Z(()=>o.modelValue,d=>{d?(f.value=!1,P(),v.value=!0,b.value=he(o.zIndex)?c():b.value++,ne(()=>{n("open"),a.value&&(a.value.scrollTop=0)})):i.value&&B()}),Z(()=>o.fullscreen,d=>{a.value&&(d?(F=a.value.style.transform,a.value.style.transform=""):a.value.style.transform=F)}),re(()=>{o.modelValue&&(i.value=!0,v.value=!0,P())}),{afterEnter:L,afterLeave:V,beforeLeave:_,handleClose:A,onModalClick:y,close:B,doClose:l,onOpenAutoFocus:p,onCloseAutoFocus:C,onCloseRequested:le,onFocusoutPrevented:oe,titleId:t,bodyId:g,closed:f,style:$,overlayDialogStyle:z,rendered:v,visible:i,zIndex:b}},Ye=["aria-label","aria-labelledby","aria-describedby"],Xe=O({name:"ElDialog",inheritAttrs:!1}),He=O({...Xe,props:Ze,emits:Ge,setup(o,{expose:a}){const r=o,S=de();Le({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},D(()=>!!S.title));const n=Ne("dialog"),c=E(),F=E(),t=E(),{visible:g,titleId:i,bodyId:f,style:v,overlayDialogStyle:b,rendered:u,zIndex:s,afterEnter:I,afterLeave:$,beforeLeave:z,handleClose:L,onModalClick:V,onOpenAutoFocus:_,onCloseAutoFocus:P,onCloseRequested:B,onFocusoutPrevented:A}=Je(r,c);ue(x,{dialogRef:c,headerRef:F,bodyId:f,ns:n,rendered:u,style:v});const y=Ee(V),R=D(()=>r.draggable&&!r.fullscreen);return a({visible:g,dialogContentRef:t}),(l,p)=>(T(),j(me,{to:l.appendTo,disabled:l.appendTo!=="body"?!1:!l.appendToBody},[M(pe,{name:"dialog-fade",onAfterEnter:e(I),onAfterLeave:e($),onBeforeLeave:e(z),persisted:""},{default:k(()=>[ce(M(e(ke),{"custom-mask-event":"",mask:l.modal,"overlay-class":l.modalClass,"z-index":e(s)},{default:k(()=>[N("div",{role:"dialog","aria-modal":"true","aria-label":l.title||void 0,"aria-labelledby":l.title?void 0:e(i),"aria-describedby":e(f),class:m(`${e(n).namespace.value}-overlay-dialog`),style:X(e(b)),onClick:p[0]||(p[0]=(...C)=>e(y).onClick&&e(y).onClick(...C)),onMousedown:p[1]||(p[1]=(...C)=>e(y).onMousedown&&e(y).onMousedown(...C)),onMouseup:p[2]||(p[2]=(...C)=>e(y).onMouseup&&e(y).onMouseup(...C))},[M(e(we),{loop:"",trapped:e(g),"focus-start-el":"container",onFocusAfterTrapped:e(_),onFocusAfterReleased:e(P),onFocusoutPrevented:e(A),onReleaseRequested:e(B)},{default:k(()=>[e(u)?(T(),j(Ke,fe({key:0,ref_key:"dialogContentRef",ref:t},l.$attrs,{center:l.center,"align-center":l.alignCenter,"close-icon":l.closeIcon,draggable:e(R),overflow:l.overflow,fullscreen:l.fullscreen,"show-close":l.showClose,title:l.title,"aria-level":l.headerAriaLevel,onClose:e(L)}),ve({header:k(()=>[l.$slots.title?w(l.$slots,"title",{key:1}):w(l.$slots,"header",{key:0,close:e(L),titleId:e(i),titleClass:e(n).e("title")})]),default:k(()=>[w(l.$slots,"default")]),_:2},[l.$slots.footer?{name:"footer",fn:k(()=>[w(l.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):q("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Ye)]),_:3},8,["mask","overlay-class","z-index"]),[[ye,e(g)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["to","disabled"]))}});var Qe=W(He,[["__file","dialog.vue"]]);const lo=Me(Qe);export{lo as E,Oe as c};
