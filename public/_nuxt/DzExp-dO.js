import{ab as Q,ac as oe,ad as ge,ae as Ce,k as L,P as Ne,Q as Te,O as Pe,v as M,p as we,af as le,ag as ae}from"./Cwhp1QW1.js";import{b as D,d as G,m as re,u as I,_ as ie,f as se,a as Se,w as Ee,g as $e}from"./BcU_p3ET.js";import{g as k}from"./aFrvivDJ.js";import{a7 as xe,am as Be,d as A,a1 as J,r as C,a3 as z,a4 as Z,t as ce,v as ue,T as de,E as O,Y as Oe,L as K,c as V,o as be,a8 as ke,z as f,a2 as Re,X as j,a6 as ze,ak as Ae,P as Fe,O as Le,F as Me,S as Ve,N as De}from"./V6XCBzcI.js";import{f as Ie}from"./86FBOCka.js";const Ke=(e,n,c)=>Ie(e.subTree).filter(t=>{var d;return Be(t)&&((d=t.type)==null?void 0:d.name)===n&&!!t.component}).map(t=>t.component.uid).map(t=>c[t]).filter(t=>!!t),Ue=(e,n)=>{const c={},N=xe([]);return{children:N,addChild:d=>{c[d.uid]=d,N.value=Ke(e,n,c)},removeChild:d=>{delete c[d],N.value=N.value.filter(E=>E.uid!==d)}}},U=Symbol("tabsRootContextKey"),qe=D({tabs:{type:G(Array),default:()=>re([])}}),ve="ElTabBar",He=A({name:ve}),We=A({...He,props:qe,setup(e,{expose:n}){const c=e,N=K(),r=J(U);r||Q(ve,"<el-tabs><el-tab-bar /></el-tabs>");const t=I("tabs"),d=C(),E=C(),b=()=>{let u=0,w=0;const v=["top","bottom"].includes(r.props.tabPosition)?"width":"height",o=v==="width"?"x":"y",B=o==="x"?"left":"top";return c.tabs.every(a=>{var p,S;const T=(S=(p=N.parent)==null?void 0:p.refs)==null?void 0:S[`tab-${a.uid}`];if(!T)return!1;if(!a.active)return!0;u=T[`offset${k(B)}`],w=T[`client${k(v)}`];const $=window.getComputedStyle(T);return v==="width"&&(c.tabs.length>1&&(w-=Number.parseFloat($.paddingLeft)+Number.parseFloat($.paddingRight)),u+=Number.parseFloat($.paddingLeft)),!1}),{[v]:`${w}px`,transform:`translate${k(o)}(${u}px)`}},m=()=>E.value=b();return z(()=>c.tabs,async()=>{await Z(),m()},{immediate:!0}),oe(d,()=>m()),n({ref:d,update:m}),(u,w)=>(ce(),ue("div",{ref_key:"barRef",ref:d,class:de([O(t).e("active-bar"),O(t).is(O(r).props.tabPosition)]),style:Oe(E.value)},null,6))}});var Xe=ie(We,[["__file","tab-bar.vue"]]);const Ye=D({panes:{type:G(Array),default:()=>re([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),je={tabClick:(e,n,c)=>c instanceof Event,tabRemove:(e,n)=>n instanceof Event},ne="ElTabNav",Qe=A({name:ne,props:Ye,emits:je,setup(e,{expose:n,emit:c}){const N=K(),r=J(U);r||Q(ne,"<el-tabs><tab-nav /></el-tabs>");const t=I("tabs"),d=ge(),E=Ce(),b=C(),m=C(),u=C(),w=C(),v=C(!1),o=C(0),B=C(!1),a=C(!0),p=V(()=>["top","bottom"].includes(r.props.tabPosition)?"width":"height"),S=V(()=>({transform:`translate${p.value==="width"?"X":"Y"}(-${o.value}px)`})),T=()=>{if(!b.value)return;const l=b.value[`offset${k(p.value)}`],i=o.value;if(!i)return;const s=i>l?i-l:0;o.value=s},$=()=>{if(!b.value||!m.value)return;const l=m.value[`offset${k(p.value)}`],i=b.value[`offset${k(p.value)}`],s=o.value;if(l-s<=i)return;const _=l-s>i*2?s+i:l-i;o.value=_},F=async()=>{const l=m.value;if(!v.value||!u.value||!b.value||!l)return;await Z();const i=u.value.querySelector(".is-active");if(!i)return;const s=b.value,_=["top","bottom"].includes(r.props.tabPosition),g=i.getBoundingClientRect(),y=s.getBoundingClientRect(),x=_?l.offsetWidth-y.width:l.offsetHeight-y.height,P=o.value;let h=P;_?(g.left<y.left&&(h=P-(y.left-g.left)),g.right>y.right&&(h=P+g.right-y.right)):(g.top<y.top&&(h=P-(y.top-g.top)),g.bottom>y.bottom&&(h=P+(g.bottom-y.bottom))),h=Math.max(h,0),o.value=Math.min(h,x)},ee=()=>{var l;if(!m.value||!b.value)return;e.stretch&&((l=w.value)==null||l.update());const i=m.value[`offset${k(p.value)}`],s=b.value[`offset${k(p.value)}`],_=o.value;s<i?(v.value=v.value||{},v.value.prev=_,v.value.next=_+s<i,i-_<s&&(o.value=i-s)):(v.value=!1,_>0&&(o.value=0))},pe=l=>{const i=l.code,{up:s,down:_,left:g,right:y}=M;if(![s,_,g,y].includes(i))return;const x=Array.from(l.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),P=x.indexOf(l.target);let h;i===g||i===s?P===0?h=x.length-1:h=P-1:P<x.length-1?h=P+1:h=0,x[h].focus({preventScroll:!0}),x[h].click(),te()},te=()=>{a.value&&(B.value=!0)},q=()=>B.value=!1;return z(d,l=>{l==="hidden"?a.value=!1:l==="visible"&&setTimeout(()=>a.value=!0,50)}),z(E,l=>{l?setTimeout(()=>a.value=!0,50):a.value=!1}),oe(u,ee),be(()=>setTimeout(()=>F(),0)),ke(()=>ee()),n({scrollToActiveTab:F,removeFocus:q}),z(()=>e.panes,()=>N.update(),{flush:"post",deep:!0}),()=>{const l=v.value?[f("span",{class:[t.e("nav-prev"),t.is("disabled",!v.value.prev)],onClick:T},[f(L,null,{default:()=>[f(Ne,null,null)]})]),f("span",{class:[t.e("nav-next"),t.is("disabled",!v.value.next)],onClick:$},[f(L,null,{default:()=>[f(Te,null,null)]})])]:null,i=e.panes.map((s,_)=>{var g,y,x,P;const h=s.uid,H=s.props.disabled,W=(y=(g=s.props.name)!=null?g:s.index)!=null?y:`${_}`,X=!H&&(s.isClosable||e.editable);s.index=`${_}`;const he=X?f(L,{class:"is-icon-close",onClick:R=>c("tabRemove",s,R)},{default:()=>[f(Pe,null,null)]}):null,ye=((P=(x=s.slots).label)==null?void 0:P.call(x))||s.props.label,_e=!H&&s.active?0:-1;return f("div",{ref:`tab-${h}`,class:[t.e("item"),t.is(r.props.tabPosition),t.is("active",s.active),t.is("disabled",H),t.is("closable",X),t.is("focus",B.value)],id:`tab-${W}`,key:`tab-${h}`,"aria-controls":`pane-${W}`,role:"tab","aria-selected":s.active,tabindex:_e,onFocus:()=>te(),onBlur:()=>q(),onClick:R=>{q(),c("tabClick",s,W,R)},onKeydown:R=>{X&&(R.code===M.delete||R.code===M.backspace)&&c("tabRemove",s,R)}},[ye,he])});return f("div",{ref:u,class:[t.e("nav-wrap"),t.is("scrollable",!!v.value),t.is(r.props.tabPosition)]},[l,f("div",{class:t.e("nav-scroll"),ref:b},[f("div",{class:[t.e("nav"),t.is(r.props.tabPosition),t.is("stretch",e.stretch&&["top","bottom"].includes(r.props.tabPosition))],ref:m,style:S.value,role:"tablist",onKeydown:pe},[e.type?null:f(Xe,{ref:w,tabs:[...e.panes]},null),i])])])}}}),Ge=D({type:{type:String,values:["card","border-card",""],default:""},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:G(Function),default:()=>!0},stretch:Boolean}),Y=e=>ze(e)||Se(e),Je={[le]:e=>Y(e),tabClick:(e,n)=>n instanceof Event,tabChange:e=>Y(e),edit:(e,n)=>["remove","add"].includes(n),tabRemove:e=>Y(e),tabAdd:()=>!0},Ze=A({name:"ElTabs",props:Ge,emits:Je,setup(e,{emit:n,slots:c,expose:N}){var r;const t=I("tabs"),{children:d,addChild:E,removeChild:b}=Ue(K(),"ElTabPane"),m=C(),u=C((r=e.modelValue)!=null?r:"0"),w=async(a,p=!1)=>{var S,T,$;if(!(u.value===a||se(a)))try{await((S=e.beforeLeave)==null?void 0:S.call(e,a,u.value))!==!1&&(u.value=a,p&&(n(le,a),n("tabChange",a)),($=(T=m.value)==null?void 0:T.removeFocus)==null||$.call(T))}catch{}},v=(a,p,S)=>{a.props.disabled||(w(p,!0),n("tabClick",a,S))},o=(a,p)=>{a.props.disabled||se(a.props.name)||(p.stopPropagation(),n("edit",a.props.name,"remove"),n("tabRemove",a.props.name))},B=()=>{n("edit",void 0,"add"),n("tabAdd")};return z(()=>e.modelValue,a=>w(a)),z(u,async()=>{var a;await Z(),(a=m.value)==null||a.scrollToActiveTab()}),Re(U,{props:e,currentName:u,registerPane:E,unregisterPane:b}),N({currentName:u}),()=>{const a=c["add-icon"],p=e.editable||e.addable?f("span",{class:t.e("new-tab"),tabindex:"0",onClick:B,onKeydown:$=>{$.code===M.enter&&B()}},[a?j(c,"add-icon"):f(L,{class:t.is("icon-plus")},{default:()=>[f(we,null,null)]})]):null,S=f("div",{class:[t.e("header"),t.is(e.tabPosition)]},[p,f(Qe,{ref:m,currentName:u.value,editable:e.editable,type:e.type,panes:d.value,stretch:e.stretch,onTabClick:v,onTabRemove:o},null)]),T=f("div",{class:t.e("content")},[j(c,"default")]);return f("div",{class:[t.b(),t.m(e.tabPosition),{[t.m("card")]:e.type==="card",[t.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[S,T]:[T,S]])}}}),et=D({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),tt=["id","aria-hidden","aria-labelledby"],fe="ElTabPane",at=A({name:fe}),st=A({...at,props:et,setup(e){const n=e,c=K(),N=Ae(),r=J(U);r||Q(fe,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const t=I("tab-pane"),d=C(),E=V(()=>n.closable||r.props.closable),b=ae(()=>{var o;return r.currentName.value===((o=n.name)!=null?o:d.value)}),m=C(b.value),u=V(()=>{var o;return(o=n.name)!=null?o:d.value}),w=ae(()=>!n.lazy||m.value||b.value);z(b,o=>{o&&(m.value=!0)});const v=Fe({uid:c.uid,slots:N,props:n,paneName:u,active:b,index:d,isClosable:E});return be(()=>{r.registerPane(v)}),Le(()=>{r.unregisterPane(v.uid)}),(o,B)=>O(w)?Me((ce(),ue("div",{key:0,id:`pane-${O(u)}`,class:de(O(t).b()),role:"tabpanel","aria-hidden":!O(b),"aria-labelledby":`tab-${O(u)}`},[j(o.$slots,"default")],10,tt)),[[Ve,O(b)]]):De("v-if",!0)}});var me=ie(st,[["__file","tab-pane.vue"]]);const ct=Ee(Ze,{TabPane:me}),ut=$e(me);export{ut as E,ct as a};
