import{u as c,_ as i,w,g as f}from"./CQShpek0.js";import{d as a,ak as S,c as h,t as _,v as u,X as d,T as p,E as s,Y as m,ay as k}from"./B_uP_klg.js";const B=a({name:"ElContainer"}),C=a({...B,props:{direction:{type:String}},setup(o){const t=o,e=S(),n=c("container"),r=h(()=>t.direction==="vertical"?!0:t.direction==="horizontal"?!1:e&&e.default?e.default().some(g=>{const v=g.type.name;return v==="ElHeader"||v==="ElFooter"}):!1);return(l,g)=>(_(),u("section",{class:p([s(n).b(),s(n).is("vertical",s(r))])},[d(l.$slots,"default")],2))}});var A=i(C,[["__file","container.vue"]]);const H=a({name:"ElAside"}),N=a({...H,props:{width:{type:String,default:null}},setup(o){const t=o,e=c("aside"),n=h(()=>t.width?e.cssVarBlock({width:t.width}):{});return(r,l)=>(_(),u("aside",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var E=i(N,[["__file","aside.vue"]]);const V=a({name:"ElFooter"}),z=a({...V,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("footer"),n=h(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(_(),u("footer",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var y=i(z,[["__file","footer.vue"]]);const F=a({name:"ElHeader"}),M=a({...F,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("header"),n=h(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(_(),u("header",{class:p(s(e).b()),style:m(s(n))},[d(r.$slots,"default")],6))}});var $=i(M,[["__file","header.vue"]]);const x=a({name:"ElMain"}),I=a({...x,setup(o){const t=c("main");return(e,n)=>(_(),u("main",{class:p(s(t).b())},[d(e.$slots,"default")],2))}});var b=i(I,[["__file","main.vue"]]);const R=w(A,{Aside:E,Footer:y,Header:$,Main:b}),T=f(E);f(y);const U=f($),X=f(b),Y=k("/images/logo.jpeg");export{R as E,Y as _,X as a,T as b,U as c};
