import{b as c,d as p,u,_ as v,w as f}from"./SLZFS4qm.js";import{d as a,c as m,t as s,v as o,T as i,E as r,X as y,N as S,Y as _}from"./Bntytgkf.js";const b=c({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:p(String),default:"solid"}}),h=a({name:"ElDivider"}),E=a({...h,props:b,setup(n){const l=n,e=u("divider"),d=m(()=>e.cssVar({"border-style":l.borderStyle}));return(t,g)=>(s(),o("div",{class:i([r(e).b(),r(e).m(t.direction)]),style:_(r(d)),role:"separator"},[t.$slots.default&&t.direction!=="vertical"?(s(),o("div",{key:0,class:i([r(e).e("text"),r(e).is(t.contentPosition)])},[y(t.$slots,"default")],2)):S("v-if",!0)],6))}});var P=v(E,[["__file","divider.vue"]]);const C=f(P);export{C as E};
