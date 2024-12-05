import{E as S,d as U,c as d,r as V,S as L,o as Q,t as i,v,x as T,I as a,K as u,a0 as X,T as c,A as p,Y as y,U as r,y as E,z as Z,M,O as x,L as ee,N as ae,ad as O}from"./zz3LwBR2.js";import{L as k,d as ie,U as N,C as P,R as B,f as te,a as ne,g as se,b as oe,S as le,h as ce,c as re,n as h,H as ue,T as de}from"./6YtQG3RP.js";import{b as ve,e as fe,a as w,i as C,u as pe,_ as he,w as me}from"./mADLZ_XH.js";import{i as ye}from"./DKUHdc9Q.js";const be=ve({modelValue:{type:[Boolean,String,Number],default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,validator:ye},width:{type:[String,Number],default:""},inlinePrompt:{type:Boolean,default:!1},inactiveActionIcon:{type:k},activeActionIcon:{type:k},activeIcon:{type:k},inactiveIcon:{type:k},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},beforeChange:{type:fe(Function)},id:String,tabindex:{type:[String,Number]},label:{type:String,default:void 0},...ie(["ariaLabel"])}),Ie={[N]:o=>w(o)||S(o)||C(o),[P]:o=>w(o)||S(o)||C(o),[B]:o=>w(o)||S(o)||C(o)},ge=["onClick"],ke=["id","aria-checked","aria-disabled","aria-label","name","true-value","false-value","disabled","tabindex","onKeydown"],we=["aria-hidden"],Se=["aria-hidden"],Ve=["aria-hidden"],F="ElSwitch",Te=U({name:F}),Ee=U({...Te,props:be,emits:Ie,setup(o,{expose:H,emit:f}){const t=o,{formItem:b}=te(),R=ne(),n=pe("switch"),{inputId:_}=se(t,{formItemContext:b}),I=oe(d(()=>t.loading)),A=V(t.modelValue!==!1),m=V(),$=V(),G=d(()=>[n.b(),n.m(R.value),n.is("disabled",I.value),n.is("checked",s.value)]),W=d(()=>[n.e("label"),n.em("label","left"),n.is("active",!s.value)]),Y=d(()=>[n.e("label"),n.em("label","right"),n.is("active",s.value)]),j=d(()=>({width:le(t.width)}));L(()=>t.modelValue,()=>{A.value=!0});const z=d(()=>A.value?t.modelValue:!1),s=d(()=>z.value===t.activeValue);[t.activeValue,t.inactiveValue].includes(z.value)||(f(N,t.inactiveValue),f(P,t.inactiveValue),f(B,t.inactiveValue)),L(s,e=>{var l;m.value.checked=e,t.validateEvent&&((l=b==null?void 0:b.validate)==null||l.call(b,"change").catch(J=>ce()))});const g=()=>{const e=s.value?t.inactiveValue:t.activeValue;f(N,e),f(P,e),f(B,e),ae(()=>{m.value.checked=s.value})},D=()=>{if(I.value)return;const{beforeChange:e}=t;if(!e){g();return}const l=e();[O(l),w(l)].includes(!0)||de(F,"beforeChange must return type `Promise<boolean>` or `boolean`"),O(l)?l.then(K=>{K&&g()}).catch(K=>{}):l&&g()},q=()=>{var e,l;(l=(e=m.value)==null?void 0:e.focus)==null||l.call(e)};return Q(()=>{m.value.checked=s.value}),re({from:"label",replacement:"aria-label",version:"2.8.0",scope:"el-switch",ref:"https://element-plus.org/en-US/component/switch.html"},d(()=>!!t.label)),H({focus:q,checked:s}),(e,l)=>(i(),v("div",{class:u(a(G)),onClick:ee(D,["prevent"])},[T("input",{id:a(_),ref_key:"input",ref:m,class:u(a(n).e("input")),type:"checkbox",role:"switch","aria-checked":a(s),"aria-disabled":a(I),"aria-label":e.label||e.ariaLabel,name:e.name,"true-value":e.activeValue,"false-value":e.inactiveValue,disabled:a(I),tabindex:e.tabindex,onChange:g,onKeydown:X(D,["enter"])},null,42,ke),!e.inlinePrompt&&(e.inactiveIcon||e.inactiveText)?(i(),v("span",{key:0,class:u(a(W))},[e.inactiveIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.inactiveIcon)))]),_:1})):r("v-if",!0),!e.inactiveIcon&&e.inactiveText?(i(),v("span",{key:1,"aria-hidden":a(s)},E(e.inactiveText),9,we)):r("v-if",!0)],2)):r("v-if",!0),T("span",{ref_key:"core",ref:$,class:u(a(n).e("core")),style:x(a(j))},[e.inlinePrompt?(i(),v("div",{key:0,class:u(a(n).e("inner"))},[e.activeIcon||e.inactiveIcon?(i(),c(a(h),{key:0,class:u(a(n).is("icon"))},{default:p(()=>[(i(),c(y(a(s)?e.activeIcon:e.inactiveIcon)))]),_:1},8,["class"])):e.activeText||e.inactiveText?(i(),v("span",{key:1,class:u(a(n).is("text")),"aria-hidden":!a(s)},E(a(s)?e.activeText:e.inactiveText),11,Se)):r("v-if",!0)],2)):r("v-if",!0),T("div",{class:u(a(n).e("action"))},[e.loading?(i(),c(a(h),{key:0,class:u(a(n).is("loading"))},{default:p(()=>[Z(a(ue))]),_:1},8,["class"])):a(s)?M(e.$slots,"active-action",{key:1},()=>[e.activeActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.activeActionIcon)))]),_:1})):r("v-if",!0)]):a(s)?r("v-if",!0):M(e.$slots,"inactive-action",{key:2},()=>[e.inactiveActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.inactiveActionIcon)))]),_:1})):r("v-if",!0)])],2)],6),!e.inlinePrompt&&(e.activeIcon||e.activeText)?(i(),v("span",{key:1,class:u(a(Y))},[e.activeIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.activeIcon)))]),_:1})):r("v-if",!0),!e.activeIcon&&e.activeText?(i(),v("span",{key:1,"aria-hidden":!a(s)},E(e.activeText),9,Ve)):r("v-if",!0)],2)):r("v-if",!0)],10,ge))}});var Ce=he(Ee,[["__file","switch.vue"]]);const ze=me(Ce);export{ze as E};
