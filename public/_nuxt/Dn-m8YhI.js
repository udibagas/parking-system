import{E as V}from"./BwdJB20S.js";import{h as v,f as I,E as N}from"./o40-fCI4.js";import{E as b,a as B}from"./CXoCSxLa.js";import{E as A,_ as F,a as G}from"./br8cA7WK.js";import"./5FA1ifAs.js";import{Y as K,r as d,G as M,A as t,t as k,z as e,F as D,E as u,K as p,B as c,y as L,x as i}from"./CVXJCMXh.js";const R=i("img",{src:F,style:{width:"70px","margin-top":"80px","border-radius":"5px"}},null,-1),S=i("h2",null,"MITRATEKNIK PARKING",-1),T=i("h3",null,"LOGIN",-1),q={__name:"login",setup(U){const{login:f}=K(),a=d(),l=d(),E=new Date().getFullYear(),g=async()=>{var n;try{await f({email:a.value,password:l.value})}catch(o){v({message:(n=o.response)==null?void 0:n._data.message,type:"error"})}};return(n,o)=>{const m=V,_=I,s=b,y=N,h=B,x=G,w=A;return k(),M(w,null,{default:t(()=>[e(x,{style:{"text-align":"center",background:"#fff"}},{default:t(()=>[R,S,e(h,{onSubmit:D(g,["prevent"]),style:{width:"300px",margin:"20px auto 0","text-align":"center"}},{default:t(()=>[e(m,null,{default:t(()=>[T]),_:1}),e(s,null,{default:t(()=>[e(_,{modelValue:u(a),"onUpdate:modelValue":o[0]||(o[0]=r=>p(a)?a.value=r:null),placeholder:"Email/Username"},null,8,["modelValue"])]),_:1}),e(s,null,{default:t(()=>[e(_,{type:"password",modelValue:u(l),"onUpdate:modelValue":o[1]||(o[1]=r=>p(l)?l.value=r:null),placeholder:"Password"},null,8,["modelValue"])]),_:1}),e(s,null,{default:t(()=>[e(y,{type:"primary","native-type":"submit",style:{width:"100%"}},{default:t(()=>[c(" LOGIN ")]),_:1})]),_:1}),e(m,null,{default:t(()=>[c("© "+L(u(E)),1)]),_:1})]),_:1})]),_:1})]),_:1})}}};export{q as default};
