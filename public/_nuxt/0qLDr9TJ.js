import{b as g,u as _,_ as $,w as h,d as u,m as r,a as b}from"./5FA1ifAs.js";import{d as f,c as o,a3 as R,t as w,G as v,A as N,Z as j,W as x,E as c,$ as C,N as E,a2 as S,a1 as K}from"./CVXJCMXh.js";const O=Symbol("rowContextKey"),P=["start","center","end","space-around","space-between","space-evenly"],k=["top","middle","bottom"],A=g({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:P,default:"start"},align:{type:String,values:k}}),B=f({name:"ElRow"}),L=f({...B,props:A,setup(p){const e=p,l=_("row"),a=o(()=>e.gutter);R(O,{gutter:a});const i=o(()=>{const t={};return e.gutter&&(t.marginRight=t.marginLeft=`-${e.gutter/2}px`),t}),d=o(()=>[l.b(),l.is(`justify-${e.justify}`,e.justify!=="start"),l.is(`align-${e.align}`,!!e.align)]);return(t,m)=>(w(),v(E(t.tag),{class:x(c(d)),style:C(c(i))},{default:N(()=>[j(t.$slots,"default")]),_:3},8,["class","style"]))}});var D=$(L,[["__file","row.vue"]]);const F=h(D),G=g({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:u([Number,Object]),default:()=>r({})},sm:{type:u([Number,Object]),default:()=>r({})},md:{type:u([Number,Object]),default:()=>r({})},lg:{type:u([Number,Object]),default:()=>r({})},xl:{type:u([Number,Object]),default:()=>r({})}}),I=f({name:"ElCol"}),J=f({...I,props:G,setup(p){const e=p,{gutter:l}=S(O,{gutter:o(()=>0)}),a=_("col"),i=o(()=>{const t={};return l.value&&(t.paddingLeft=t.paddingRight=`${l.value/2}px`),t}),d=o(()=>{const t=[];return["span","offset","pull","push"].forEach(s=>{const n=e[s];b(n)&&(s==="span"?t.push(a.b(`${e[s]}`)):n>0&&t.push(a.b(`${s}-${e[s]}`)))}),["xs","sm","md","lg","xl"].forEach(s=>{b(e[s])?t.push(a.b(`${s}-${e[s]}`)):K(e[s])&&Object.entries(e[s]).forEach(([n,y])=>{t.push(n!=="span"?a.b(`${s}-${n}-${y}`):a.b(`${s}-${y}`))})}),l.value&&t.push(a.is("guttered")),[a.b(),t]});return(t,m)=>(w(),v(E(t.tag),{class:x(c(d)),style:C(c(i))},{default:N(()=>[j(t.$slots,"default")]),_:3},8,["class","style"]))}});var T=$(J,[["__file","col.vue"]]);const H=h(T);export{F as E,H as a};