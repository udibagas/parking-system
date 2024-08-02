import{J as Re,e as fe,K as $,L as ke,E as me,n as ve,ad as Be,M as Ke,S as Le,b3 as Pe,a as De}from"./BelLnXAr.js";import{h as k,j as Me,c as de,b as Ae,a as Ge,O as ze,w as ue,F as Ye}from"./Cs6Yb8RH.js";import{_ as M,b as Q,e as L,u as oe,w as Ue,d as ge}from"./DA1ASBBn.js";import{d as A,M as B,r as _,P as U,F as C,o as Je,I as h,e as be,c as y,aB as He,an as V,S as Ie,i as I,t as P,T as J,A as b,z as S,aC as Ve,aD as je,N as We,v as q,aE as qe,aj as j,K as Z,U as x,a1 as we,x as Qe,Y as Xe,L as ee,V as Ze,O as xe}from"./Cu2KEs3L.js";import{c as Ee}from"./EQYbrQ_i.js";const eo=A({inheritAttrs:!1});function oo(e,o,i,t,u,d){return B(e.$slots,"default")}var no=M(eo,[["render",oo],["__file","collection.vue"]]);const to=A({name:"ElCollectionItem",inheritAttrs:!1});function lo(e,o,i,t,u,d){return B(e.$slots,"default")}var ro=M(to,[["render",lo],["__file","collection-item.vue"]]);const _e="data-el-collection-item",Ce=e=>{const o=`El${e}Collection`,i=`${o}Item`,t=Symbol(o),u=Symbol(i),d={...no,name:o,setup(){const l=_(null),p=new Map;U(t,{itemMap:p,getItems:()=>{const m=h(l);if(!m)return[];const f=Array.from(m.querySelectorAll(`[${_e}]`));return[...p.values()].sort((n,c)=>f.indexOf(n.ref)-f.indexOf(c.ref))},collectionRef:l})}},r={...ro,name:i,setup(l,{attrs:p}){const v=_(null),m=C(t,void 0);U(u,{collectionItemRef:v}),Je(()=>{const f=h(v);f&&m.itemMap.set(f,{ref:f,...p})}),be(()=>{const f=h(v);m.itemMap.delete(f)})}};return{COLLECTION_INJECTION_KEY:t,COLLECTION_ITEM_INJECTION_KEY:u,ElCollection:d,ElCollectionItem:r}},so=Q({style:{type:L([String,Array,Object])},currentTabId:{type:L(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:L(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:io,ElCollectionItem:ao,COLLECTION_INJECTION_KEY:ne,COLLECTION_ITEM_INJECTION_KEY:uo}=Ce("RovingFocusGroup"),te=Symbol("elRovingFocusGroup"),ye=Symbol("elRovingFocusGroupItem"),co={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},po=(e,o)=>e,fo=(e,o,i)=>{const t=po(e.key);return co[t]},mo=(e,o)=>e.map((i,t)=>e[(t+o)%e.length]),le=e=>{const{activeElement:o}=document;for(const i of e)if(i===o||(i.focus(),o!==document.activeElement))return},ce="currentTabIdChange",pe="rovingFocusGroup.entryFocus",vo={bubbles:!1,cancelable:!0},go=A({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:so,emits:[ce,"entryFocus"],setup(e,{emit:o}){var i;const t=_((i=e.currentTabId||e.defaultCurrentTabId)!=null?i:null),u=_(!1),d=_(!1),r=_(null),{getItems:l}=C(ne,void 0),p=y(()=>[{outline:"none"},e.style]),v=a=>{o(ce,a)},m=()=>{u.value=!0},f=k(a=>{var g;(g=e.onMousedown)==null||g.call(e,a)},()=>{d.value=!0}),w=k(a=>{var g;(g=e.onFocus)==null||g.call(e,a)},a=>{const g=!h(d),{target:D,currentTarget:N}=a;if(D===N&&g&&!h(u)){const G=new Event(pe,vo);if(N==null||N.dispatchEvent(G),!G.defaultPrevented){const E=l().filter(F=>F.focusable),T=E.find(F=>F.active),O=E.find(F=>F.id===h(t)),z=[T,O,...E].filter(Boolean).map(F=>F.ref);le(z)}}d.value=!1}),n=k(a=>{var g;(g=e.onBlur)==null||g.call(e,a)},()=>{u.value=!1}),c=(...a)=>{o("entryFocus",...a)};U(te,{currentTabbedId:He(t),loop:V(e,"loop"),tabIndex:y(()=>h(u)?-1:0),rovingFocusGroupRef:r,rovingFocusGroupRootStyle:p,orientation:V(e,"orientation"),dir:V(e,"dir"),onItemFocus:v,onItemShiftTab:m,onBlur:n,onFocus:w,onMousedown:f}),Ie(()=>e.currentTabId,a=>{t.value=a??null}),Re(r,pe,c)}});function bo(e,o,i,t,u,d){return B(e.$slots,"default")}var Io=M(go,[["render",bo],["__file","roving-focus-group-impl.vue"]]);const wo=A({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:io,ElRovingFocusGroupImpl:Io}});function Eo(e,o,i,t,u,d){const r=I("el-roving-focus-group-impl"),l=I("el-focus-group-collection");return P(),J(l,null,{default:b(()=>[S(r,Ve(je(e.$attrs)),{default:b(()=>[B(e.$slots,"default")]),_:3},16)]),_:3})}var _o=M(wo,[["render",Eo],["__file","roving-focus-group.vue"]]);const Co=A({components:{ElRovingFocusCollectionItem:ao},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:o}){const{currentTabbedId:i,loop:t,onItemFocus:u,onItemShiftTab:d}=C(te,void 0),{getItems:r}=C(ne,void 0),l=fe(),p=_(null),v=k(n=>{o("mousedown",n)},n=>{e.focusable?u(h(l)):n.preventDefault()}),m=k(n=>{o("focus",n)},()=>{u(h(l))}),f=k(n=>{o("keydown",n)},n=>{const{key:c,shiftKey:a,target:g,currentTarget:D}=n;if(c===$.tab&&a){d();return}if(g!==D)return;const N=fo(n);if(N){n.preventDefault();let E=r().filter(T=>T.focusable).map(T=>T.ref);switch(N){case"last":{E.reverse();break}case"prev":case"next":{N==="prev"&&E.reverse();const T=E.indexOf(D);E=t.value?mo(E,T+1):E.slice(T+1);break}}We(()=>{le(E)})}}),w=y(()=>i.value===h(l));return U(ye,{rovingFocusGroupItemRef:p,tabIndex:y(()=>h(w)?0:-1),handleMousedown:v,handleFocus:m,handleKeydown:f}),{id:l,handleKeydown:f,handleFocus:m,handleMousedown:v}}});function yo(e,o,i,t,u,d){const r=I("el-roving-focus-collection-item");return P(),J(r,{id:e.id,focusable:e.focusable,active:e.active},{default:b(()=>[B(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var ho=M(Co,[["render",yo],["__file","roving-focus-item.vue"]]);const To=Q({trigger:Me.trigger,effect:{...de.effect,default:"light"},type:{type:L(String)},placement:{type:L(String),default:"bottom"},popperOptions:{type:L(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:L([Number,String]),default:0},maxHeight:{type:L([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:L(Object)},teleported:de.teleported}),he=Q({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:ke}}),$o=Q({onKeydown:{type:L(Function)}}),Oo=[$.down,$.pageDown,$.home],Te=[$.up,$.pageUp,$.end],Fo=[...Oo,...Te],{ElCollection:So,ElCollectionItem:No,COLLECTION_INJECTION_KEY:Ro,COLLECTION_ITEM_INJECTION_KEY:ko}=Ce("Dropdown"),X=Symbol("elDropdown"),{ButtonGroup:Bo}=me,Ko=A({name:"ElDropdown",components:{ElButton:me,ElButtonGroup:Bo,ElScrollbar:Ae,ElDropdownCollection:So,ElTooltip:Ge,ElRovingFocusGroup:_o,ElOnlyChild:ze,ElIcon:ve,ArrowDown:Be},props:To,emits:["visible-change","click","command"],setup(e,{emit:o}){const i=we(),t=oe("dropdown"),{t:u}=Ke(),d=_(),r=_(),l=_(null),p=_(null),v=_(null),m=_(null),f=_(!1),w=[$.enter,$.space,$.down],n=y(()=>({maxHeight:Le(e.maxHeight)})),c=y(()=>[t.m(T.value)]),a=y(()=>Pe(e.trigger)),g=fe().value,D=y(()=>e.id||g);Ie([d,a],([s,R],[Y])=>{var se,ie,ae;(se=Y==null?void 0:Y.$el)!=null&&se.removeEventListener&&Y.$el.removeEventListener("pointerenter",K),(ie=s==null?void 0:s.$el)!=null&&ie.removeEventListener&&s.$el.removeEventListener("pointerenter",K),(ae=s==null?void 0:s.$el)!=null&&ae.addEventListener&&R.includes("hover")&&s.$el.addEventListener("pointerenter",K)},{immediate:!0}),be(()=>{var s,R;(R=(s=d.value)==null?void 0:s.$el)!=null&&R.removeEventListener&&d.value.$el.removeEventListener("pointerenter",K)});function N(){G()}function G(){var s;(s=l.value)==null||s.onClose()}function E(){var s;(s=l.value)==null||s.onOpen()}const T=De();function O(...s){o("command",...s)}function K(){var s,R;(R=(s=d.value)==null?void 0:s.$el)==null||R.focus()}function z(){}function F(){const s=h(p);a.value.includes("hover")&&(s==null||s.focus()),m.value=null}function re(s){m.value=s}function W(s){f.value||(s.preventDefault(),s.stopImmediatePropagation())}function H(){o("visible-change",!0)}function Se(s){(s==null?void 0:s.type)==="keydown"&&p.value.focus()}function Ne(){o("visible-change",!1)}return U(X,{contentRef:p,role:y(()=>e.role),triggerId:D,isUsingKeyboard:f,onItemEnter:z,onItemLeave:F}),U("elDropdown",{instance:i,dropdownSize:T,handleClick:N,commandHandler:O,trigger:V(e,"trigger"),hideOnClick:V(e,"hideOnClick")}),{t:u,ns:t,scrollbar:v,wrapStyle:n,dropdownTriggerKls:c,dropdownSize:T,triggerId:D,triggerKeys:w,currentTabId:m,handleCurrentTabIdChange:re,handlerMainButtonClick:s=>{o("click",s)},handleEntryFocus:W,handleClose:G,handleOpen:E,handleBeforeShowTooltip:H,handleShowTooltip:Se,handleBeforeHideTooltip:Ne,onFocusAfterTrapped:s=>{var R,Y;s.preventDefault(),(Y=(R=p.value)==null?void 0:R.focus)==null||Y.call(R,{preventScroll:!0})},popperRef:l,contentRef:p,triggeringElementRef:d,referenceElementRef:r}}});function Lo(e,o,i,t,u,d){var r;const l=I("el-dropdown-collection"),p=I("el-roving-focus-group"),v=I("el-scrollbar"),m=I("el-only-child"),f=I("el-tooltip"),w=I("el-button"),n=I("arrow-down"),c=I("el-icon"),a=I("el-button-group");return P(),q("div",{class:Z([e.ns.b(),e.ns.is("disabled",e.disabled)])},[S(f,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(r=e.referenceElementRef)==null?void 0:r.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},qe({content:b(()=>[S(v,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:b(()=>[S(p,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:b(()=>[S(l,null,{default:b(()=>[B(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:b(()=>[S(m,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:b(()=>[B(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(P(),J(a,{key:0},{default:b(()=>[S(w,j({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:b(()=>[B(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),S(w,j({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:b(()=>[S(c,{class:Z(e.ns.e("icon"))},{default:b(()=>[S(n)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):x("v-if",!0)],2)}var Po=M(Ko,[["render",Lo],["__file","dropdown.vue"]]);const Do=A({name:"DropdownItemImpl",components:{ElIcon:ve},props:he,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:o}){const i=oe("dropdown"),{role:t}=C(X,void 0),{collectionItemRef:u}=C(ko,void 0),{collectionItemRef:d}=C(uo,void 0),{rovingFocusGroupItemRef:r,tabIndex:l,handleFocus:p,handleKeydown:v,handleMousedown:m}=C(ye,void 0),f=Ee(u,d,r),w=y(()=>t.value==="menu"?"menuitem":t.value==="navigation"?"link":"button"),n=k(c=>{const{code:a}=c;if(a===$.enter||a===$.space)return c.preventDefault(),c.stopImmediatePropagation(),o("clickimpl",c),!0},v);return{ns:i,itemRef:f,dataset:{[_e]:""},role:w,tabIndex:l,handleFocus:p,handleKeydown:n,handleMousedown:m}}}),Mo=["aria-disabled","tabindex","role"];function Ao(e,o,i,t,u,d){const r=I("el-icon");return P(),q(Ze,null,[e.divided?(P(),q("li",j({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):x("v-if",!0),Qe("li",j({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=l=>e.$emit("clickimpl",l)),onFocus:o[1]||(o[1]=(...l)=>e.handleFocus&&e.handleFocus(...l)),onKeydown:o[2]||(o[2]=ee((...l)=>e.handleKeydown&&e.handleKeydown(...l),["self"])),onMousedown:o[3]||(o[3]=(...l)=>e.handleMousedown&&e.handleMousedown(...l)),onPointermove:o[4]||(o[4]=l=>e.$emit("pointermove",l)),onPointerleave:o[5]||(o[5]=l=>e.$emit("pointerleave",l))}),[e.icon?(P(),J(r,{key:0},{default:b(()=>[(P(),J(Xe(e.icon)))]),_:1})):x("v-if",!0),B(e.$slots,"default")],16,Mo)],64)}var Go=M(Do,[["render",Ao],["__file","dropdown-item-impl.vue"]]);const $e=()=>{const e=C("elDropdown",{}),o=y(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:o}},zo=A({name:"ElDropdownItem",components:{ElDropdownCollectionItem:No,ElRovingFocusItem:ho,ElDropdownItemImpl:Go},inheritAttrs:!1,props:he,emits:["pointermove","pointerleave","click"],setup(e,{emit:o,attrs:i}){const{elDropdown:t}=$e(),u=we(),d=_(null),r=y(()=>{var n,c;return(c=(n=h(d))==null?void 0:n.textContent)!=null?c:""}),{onItemEnter:l,onItemLeave:p}=C(X,void 0),v=k(n=>(o("pointermove",n),n.defaultPrevented),ue(n=>{if(e.disabled){p(n);return}const c=n.currentTarget;c===document.activeElement||c.contains(document.activeElement)||(l(n),n.defaultPrevented||c==null||c.focus())})),m=k(n=>(o("pointerleave",n),n.defaultPrevented),ue(n=>{p(n)})),f=k(n=>{if(!e.disabled)return o("click",n),n.type!=="keydown"&&n.defaultPrevented},n=>{var c,a,g;if(e.disabled){n.stopImmediatePropagation();return}(c=t==null?void 0:t.hideOnClick)!=null&&c.value&&((a=t.handleClick)==null||a.call(t)),(g=t.commandHandler)==null||g.call(t,e.command,u,n)}),w=y(()=>({...e,...i}));return{handleClick:f,handlePointerMove:v,handlePointerLeave:m,textContent:r,propsAndAttrs:w}}});function Yo(e,o,i,t,u,d){var r;const l=I("el-dropdown-item-impl"),p=I("el-roving-focus-item"),v=I("el-dropdown-collection-item");return P(),J(v,{disabled:e.disabled,"text-value":(r=e.textValue)!=null?r:e.textContent},{default:b(()=>[S(p,{focusable:!e.disabled},{default:b(()=>[S(l,j(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:b(()=>[B(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var Oe=M(zo,[["render",Yo],["__file","dropdown-item.vue"]]);const Uo=A({name:"ElDropdownMenu",props:$o,setup(e){const o=oe("dropdown"),{_elDropdownSize:i}=$e(),t=i.value,{focusTrapRef:u,onKeydown:d}=C(Ye,void 0),{contentRef:r,role:l,triggerId:p}=C(X,void 0),{collectionRef:v,getItems:m}=C(Ro,void 0),{rovingFocusGroupRef:f,rovingFocusGroupRootStyle:w,tabIndex:n,onBlur:c,onFocus:a,onMousedown:g}=C(te,void 0),{collectionRef:D}=C(ne,void 0),N=y(()=>[o.b("menu"),o.bm("menu",t==null?void 0:t.value)]),G=Ee(r,v,u,f,D),E=k(O=>{var K;(K=e.onKeydown)==null||K.call(e,O)},O=>{const{currentTarget:K,code:z,target:F}=O;if(K.contains(F),$.tab===z&&O.stopImmediatePropagation(),O.preventDefault(),F!==h(r)||!Fo.includes(z))return;const W=m().filter(H=>!H.disabled).map(H=>H.ref);Te.includes(z)&&W.reverse(),le(W)});return{size:t,rovingFocusGroupRootStyle:w,tabIndex:n,dropdownKls:N,role:l,triggerId:p,dropdownListWrapperRef:G,handleKeydown:O=>{E(O),d(O)},onBlur:c,onFocus:a,onMousedown:g}}}),Jo=["role","aria-labelledby"];function Ho(e,o,i,t,u,d){return P(),q("ul",{ref:e.dropdownListWrapperRef,class:Z(e.dropdownKls),style:xe(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...r)=>e.onBlur&&e.onBlur(...r)),onFocus:o[1]||(o[1]=(...r)=>e.onFocus&&e.onFocus(...r)),onKeydown:o[2]||(o[2]=ee((...r)=>e.handleKeydown&&e.handleKeydown(...r),["self"])),onMousedown:o[3]||(o[3]=ee((...r)=>e.onMousedown&&e.onMousedown(...r),["self"]))},[B(e.$slots,"default")],46,Jo)}var Fe=M(Uo,[["render",Ho],["__file","dropdown-menu.vue"]]);const xo=Ue(Po,{DropdownItem:Oe,DropdownMenu:Fe}),en=ge(Oe),on=ge(Fe);export{en as E,on as a,xo as b};
