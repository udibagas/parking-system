import{u as c,_ as i,w,d as f}from"./Da9z4i7X.js";import{d as a,am as S,c as h,t as _,v as u,M as d,K as p,I as s,O as m,az as k}from"./q5u-HvB_.js";const B=a({name:"ElContainer"}),C=a({...B,props:{direction:{type:String}},setup(o){const t=o,e=S(),n=c("container"),r=h(()=>t.direction==="vertical"?!0:t.direction==="horizontal"?!1:e&&e.default?e.default().some(g=>{const v=g.type.name;return v==="ElHeader"||v==="ElFooter"}):!1);return(l,g)=>(_(),u("section",{class:p([s(n).b(),s(n).is("vertical",s(r))])},[d(l.$slots,"default")],2))}});var z=i(C,[["__file","container.vue"]]);const A=a({name:"ElAside"}),H=a({...A,props:{width:{type:String,default:null}},setup(o){const t=o,e=c("aside"),n=h(()=>t.width?e.cssVarBlock({width:t.width}):{});return(r,l)=>(_(),u("aside",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var E=i(H,[["__file","aside.vue"]]);const M=a({name:"ElFooter"}),N=a({...M,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("footer"),n=h(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(_(),u("footer",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var $=i(N,[["__file","footer.vue"]]);const V=a({name:"ElHeader"}),F=a({...V,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("header"),n=h(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(_(),u("header",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var y=i(F,[["__file","header.vue"]]);const I=a({name:"ElMain"}),x=a({...I,setup(o){const t=c("main");return(e,n)=>(_(),u("main",{class:p(s(t).b())},[d(e.$slots,"default")],2))}});var b=i(x,[["__file","main.vue"]]);const L=w(z,{Aside:E,Footer:$,Header:y,Main:b}),O=f(E);f($);const R=f(y),U=f(b),q=k("/images/logo.jpeg");export{L as E,q as _,U as a,O as b,R as c};
