import{E as _e,a as rl,b as sl}from"./CJtezd5x.js";import{b as je,i as He,a as Oe,c as Je,u as Le,_ as Ke,w as il,d as We}from"./BBXO5qaq.js";import{u as ue,E as ce}from"./73cs48uQ.js";import{u as Xe,U as Ie,C as dl,a as ul,b as pl,c as Qe,d as ml,e as _l,f as cl,g as fl,h as bl,p as fe,r as be,i as vl,j as ve,k as ge,m as ke,l as Ve,s as he,E as ye,n as Ce,o as we,q as gl,t as de,v as kl,w as Vl}from"./BFO3TwWL.js";import{E as Se,a as xe}from"./CfmWdu4d.js";import{E as Ne,a as Re,b as Be}from"./DXBRTGVt.js";import{E as Ae,a as Ee,b as $e}from"./BL4R7nGt.js";import{E as Pe,a as Ue}from"./7B_iyF0E.js";import{E as qe,r as me,F as hl,c as G,d as pe,t as k,v as I,x as y,G as Ge,H as Ye,I as e,J as re,K as ee,L as R,M as De,B as s,y as j,N as Ze,O as yl,o as ie,P as Cl,Q as wl,R as Sl,S as xl,z as l,A as o,T as H,U as ne,V as W,W as se,X as Al,Y as El}from"./LBRxFYJi.js";import{E as Te}from"./oREPwlbc.js";import"./SHKvqBp3.js";import"./l0sNRNKZ.js";import{u as ze}from"./BYEIToyq.js";import{v as $l}from"./-o4QkPum.js";const el=je({modelValue:{type:[String,Number,Boolean],default:void 0},size:Xe,disabled:Boolean,label:{type:[String,Number,Boolean],default:void 0},value:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:void 0}}),Pl=je({...el,border:Boolean}),ll={[Ie]:A=>qe(A)||He(A)||Oe(A),[dl]:A=>qe(A)||He(A)||Oe(A)},ol=Symbol("radioGroupKey"),tl=(A,f)=>{const c=me(),r=hl(ol,void 0),t=G(()=>!!r),i=G(()=>Je(A.value)?A.label:A.value),b=G({get(){return t.value?r.modelValue:A.modelValue},set(V){t.value?r.changeEvent(V):f&&f(Ie,V),c.value.checked=A.modelValue===i.value}}),w=ul(G(()=>r==null?void 0:r.size)),h=pl(G(()=>r==null?void 0:r.disabled)),P=me(!1),N=G(()=>h.value||t.value&&b.value!==i.value?-1:0);return Qe({from:"label act as value",replacement:"value",version:"3.0.0",scope:"el-radio",ref:"https://element-plus.org/en-US/component/radio.html"},G(()=>t.value&&Je(A.value))),{radioRef:c,isGroup:t,radioGroup:r,focus:P,size:w,disabled:h,tabIndex:N,modelValue:b,actualValue:i}},Ul=["value","name","disabled"],zl=pe({name:"ElRadio"}),jl=pe({...zl,props:Pl,emits:ll,setup(A,{emit:f}){const c=A,r=Le("radio"),{radioRef:t,radioGroup:i,focus:b,size:w,disabled:h,modelValue:P,actualValue:N}=tl(c,f);function V(){Ze(()=>f("change",P.value))}return(C,E)=>{var K;return k(),I("label",{class:ee([e(r).b(),e(r).is("disabled",e(h)),e(r).is("focus",e(b)),e(r).is("bordered",C.border),e(r).is("checked",e(P)===e(N)),e(r).m(e(w))])},[y("span",{class:ee([e(r).e("input"),e(r).is("disabled",e(h)),e(r).is("checked",e(P)===e(N))])},[Ge(y("input",{ref_key:"radioRef",ref:t,"onUpdate:modelValue":E[0]||(E[0]=D=>re(P)?P.value=D:null),class:ee(e(r).e("original")),value:e(N),name:C.name||((K=e(i))==null?void 0:K.name),disabled:e(h),type:"radio",onFocus:E[1]||(E[1]=D=>b.value=!0),onBlur:E[2]||(E[2]=D=>b.value=!1),onChange:V,onClick:E[3]||(E[3]=R(()=>{},["stop"]))},null,42,Ul),[[Ye,e(P)]]),y("span",{class:ee(e(r).e("inner"))},null,2)],2),y("span",{class:ee(e(r).e("label")),onKeydown:E[4]||(E[4]=R(()=>{},["stop"]))},[De(C.$slots,"default",{},()=>[s(j(C.label),1)])],34)],2)}}});var Nl=Ke(jl,[["__file","radio.vue"]]);const Tl=je({...el}),Ll=["value","name","disabled"],Kl=pe({name:"ElRadioButton"}),Il=pe({...Kl,props:Tl,setup(A){const f=A,c=Le("radio"),{radioRef:r,focus:t,size:i,disabled:b,modelValue:w,radioGroup:h,actualValue:P}=tl(f),N=G(()=>({backgroundColor:(h==null?void 0:h.fill)||"",borderColor:(h==null?void 0:h.fill)||"",boxShadow:h!=null&&h.fill?`-1px 0 0 0 ${h.fill}`:"",color:(h==null?void 0:h.textColor)||""}));return(V,C)=>{var E;return k(),I("label",{class:ee([e(c).b("button"),e(c).is("active",e(w)===e(P)),e(c).is("disabled",e(b)),e(c).is("focus",e(t)),e(c).bm("button",e(i))])},[Ge(y("input",{ref_key:"radioRef",ref:r,"onUpdate:modelValue":C[0]||(C[0]=K=>re(w)?w.value=K:null),class:ee(e(c).be("button","original-radio")),value:e(P),type:"radio",name:V.name||((E=e(h))==null?void 0:E.name),disabled:e(b),onFocus:C[1]||(C[1]=K=>t.value=!0),onBlur:C[2]||(C[2]=K=>t.value=!1),onClick:C[3]||(C[3]=R(()=>{},["stop"]))},null,42,Ll),[[Ye,e(w)]]),y("span",{class:ee(e(c).be("button","inner")),style:yl(e(w)===e(P)?e(N):{}),onKeydown:C[4]||(C[4]=R(()=>{},["stop"]))},[De(V.$slots,"default",{},()=>[s(j(V.label),1)])],38)],2)}}});var al=Ke(Il,[["__file","radio-button.vue"]]);const Rl=je({id:{type:String,default:void 0},size:Xe,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:void 0},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0},...ml(["ariaLabel"])}),Bl=ll,Gl=["id","aria-label","aria-labelledby"],Dl=pe({name:"ElRadioGroup"}),Ml=pe({...Dl,props:Rl,emits:Bl,setup(A,{emit:f}){const c=A,r=Le("radio"),t=_l(),i=me(),{formItem:b}=cl(),{inputId:w,isLabeledByFormItem:h}=fl(c,{formItemContext:b}),P=V=>{f(Ie,V),Ze(()=>f("change",V))};ie(()=>{const V=i.value.querySelectorAll("[type=radio]"),C=V[0];!Array.from(V).some(E=>E.checked)&&C&&(C.tabIndex=0)});const N=G(()=>c.name||t.value);return Cl(ol,wl({...Sl(c),changeEvent:P,name:N})),xl(()=>c.modelValue,()=>{c.validateEvent&&(b==null||b.validate("change").catch(V=>bl()))}),Qe({from:"label",replacement:"aria-label",version:"2.8.0",scope:"el-radio-group",ref:"https://element-plus.org/en-US/component/radio.html"},G(()=>!!c.label)),(V,C)=>(k(),I("div",{id:e(w),ref_key:"radioGroupRef",ref:i,class:ee(e(r).b("group")),role:"radiogroup","aria-label":e(h)?void 0:V.label||V.ariaLabel||"radio-group","aria-labelledby":e(h)?e(b).labelId:void 0},[De(V.$slots,"default")],10,Gl))}});var nl=Ke(Ml,[["__file","radio-group.vue"]]);const Fl=il(Nl,{RadioButton:al,RadioGroup:nl}),Hl=We(nl);We(al);const Ol={class:"text-right"},Jl=y("br",null,null,-1),ql={class:"el-dropdown-link"},Wl=y("br",null,null,-1),Xl=["src"],Ql={__name:"Kamera",setup(A){const{getKameraList:f}=ue(),{api:c,showForm:r,formErrors:t,formModel:i,pageSize:b,tableData:w,loading:h,currentChange:P,sizeChange:N,openForm:V,save:C,deleteData:E,closeForm:K,requestData:D}=ze("/api/kamera"),J=me(!1),X=me(null),d=x=>{c(`/api/kamera/test/${x}`).then(a=>{X.value="data:image/jpeg;base64,"+a.snapshot,J.value=!0})};return ie(()=>{D()}),(x,a)=>{const n=ye,S=Se,g=Ne,Y=Ce,Q=Ae,q=Ee,Z=$e,B=xe,T=_e,M=we,$=Pe,L=Fl,U=Hl,z=Te,O=Ue,v=ce;return k(),I(W,null,[y("div",Ol,[l(n,{size:"small",icon:e(fe),onClick:a[0]||(a[0]=u=>e(V)()),type:"primary"},{default:o(()=>[s(" TAMBAH KAMERA ")]),_:1},8,["icon"])]),Jl,l(B,{data:e(w).data,stripe:""},{default:o(()=>[l(S,{type:"index",index:e(w).from,label:"#"},null,8,["index"]),l(S,{width:"100",label:"Status",prop:"status",align:"center","header-align":"center"},{default:o(({row:u})=>[l(g,{effect:"dark",type:u.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(u.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(S,{width:"120",label:"Nama",prop:"nama"}),l(S,{width:"120",label:"Username",prop:"username"}),l(S,{width:"120",label:"Password",prop:"password"}),l(S,{width:"100",label:"Auth Type",prop:"auth_type"}),l(S,{"show-overflow-tooltip":"","min-width":"150",label:"Snapshot URL",prop:"snapshot_url"}),l(S,{"show-overflow-tooltip":"","min-width":"150",label:"Streaming URL",prop:"streaming_url"}),l(S,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(n,{link:"",onClick:e(D),icon:e(be)},null,8,["onClick","icon"])]),default:o(({row:u})=>[l(Z,null,{dropdown:o(()=>[l(q,null,{default:o(()=>[l(Q,{icon:e(vl),onClick:R(_=>d(u.id),["prevent"])},{default:o(()=>[s(" Test Kamera ")]),_:2},1032,["icon","onClick"]),l(Q,{icon:e(ve),onClick:R(_=>e(V)(u),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(Q,{icon:e(ge),onClick:R(_=>e(E)(u.id,e(f)),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[y("span",ql,[l(Y,null,{default:o(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Wl,e(w).total?(k(),H(T,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(b),"page-sizes":[10,25,50,100],total:e(w).total,onCurrentChange:e(P),onSizeChange:e(N)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(v,{title:"KAMERA",modelValue:e(r),"onUpdate:modelValue":a[9]||(a[9]=u=>re(r)?r.value=u:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(n,{icon:e(Ve),onClick:e(K)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(n,{icon:e(he),type:"primary",onClick:a[8]||(a[8]=u=>e(C)(e(f)))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(O,{"label-position":"left","label-width":"150px"},{default:o(()=>{var u,_,F,le,oe,te,ae;return[l($,{label:"Nama",error:(u=e(t).nama)==null?void 0:u.join(", ")},{default:o(()=>[l(M,{placeholder:"Nama",modelValue:e(i).nama,"onUpdate:modelValue":a[1]||(a[1]=p=>e(i).nama=p)},null,8,["modelValue"])]),_:1},8,["error"]),l($,{label:"Username",error:(_=e(t).username)==null?void 0:_.join(", ")},{default:o(()=>[l(M,{placeholder:"Username",modelValue:e(i).username,"onUpdate:modelValue":a[2]||(a[2]=p=>e(i).username=p)},null,8,["modelValue"])]),_:1},8,["error"]),l($,{label:"Password",error:(F=e(t).password)==null?void 0:F.join(", ")},{default:o(()=>[l(M,{placeholder:"Password",modelValue:e(i).password,"onUpdate:modelValue":a[3]||(a[3]=p=>e(i).password=p)},null,8,["modelValue"])]),_:1},8,["error"]),l($,{label:"URL Snapshot",error:(le=e(t).snapshot_url)==null?void 0:le.join(", ")},{default:o(()=>[l(M,{placeholder:"URL Snapshot",modelValue:e(i).snapshot_url,"onUpdate:modelValue":a[4]||(a[4]=p=>e(i).snapshot_url=p)},null,8,["modelValue"])]),_:1},8,["error"]),l($,{label:"URL Streaming",error:(oe=e(t).streaming_url)==null?void 0:oe.join(", ")},{default:o(()=>[l(M,{placeholder:"URL Streaming",modelValue:e(i).streaming_url,"onUpdate:modelValue":a[5]||(a[5]=p=>e(i).streaming_url=p)},null,8,["modelValue"])]),_:1},8,["error"]),l($,{label:"Otentifikasi",error:(te=e(t).auth_type)==null?void 0:te.join(", ")},{default:o(()=>[l(U,{modelValue:e(i).auth_type,"onUpdate:modelValue":a[6]||(a[6]=p=>e(i).auth_type=p)},{default:o(()=>[l(L,{value:"digest"},{default:o(()=>[s("Digest")]),_:1}),l(L,{value:"basic"},{default:o(()=>[s("Basic")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["error"]),l($,{label:"Status",error:(ae=e(t).status)==null?void 0:ae.join(", ")},{default:o(()=>[l(z,{"active-value":!0,"inactive-value":!1,modelValue:e(i).status,"onUpdate:modelValue":a[7]||(a[7]=p=>e(i).status=p),"active-color":"#13ce66"},null,8,["modelValue"]),l(g,{type:e(i).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(i).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"]),l(v,{title:"SNAPSHOT KAMERA",center:"",modelValue:e(J),"onUpdate:modelValue":a[10]||(a[10]=u=>re(J)?J.value=u:null)},{default:o(()=>[y("img",{src:e(X),alt:"",style:{width:"100%"}},null,8,Xl)]),_:1},8,["modelValue"])],64)}}},Yl={class:"text-right"},Zl=y("br",null,null,-1),eo={class:"el-dropdown-link"},lo=y("br",null,null,-1),oo={__name:"Printer",setup(A){const{getPrinterList:f}=ue(),{api:c,showForm:r,formErrors:t,formModel:i,pageSize:b,tableData:w,loading:h,currentChange:P,sizeChange:N,openForm:V,save:C,deleteData:E,closeForm:K,requestData:D}=ze("/api/printer"),J=X=>{c(`/api/printer/test/${X}`).then(d=>{de({message:d.message,type:"success"})})};return ie(()=>{D()}),(X,d)=>{const x=ye,a=Se,n=Ne,S=Ce,g=Ae,Y=Ee,Q=$e,q=xe,Z=_e,B=we,T=Pe,M=Te,$=Ue,L=ce;return k(),I(W,null,[y("div",Yl,[l(x,{size:"small",icon:e(fe),onClick:d[0]||(d[0]=U=>e(V)()),type:"primary"},{default:o(()=>[s(" TAMBAH PRINTER ")]),_:1},8,["icon"])]),Zl,l(q,{data:e(w).data,stripe:""},{default:o(()=>[l(a,{type:"index",index:e(w).from,label:"#"},null,8,["index"]),l(a,{width:"100",label:"Status",prop:"status"},{default:o(({row:U})=>[l(n,{effect:"dark",type:U.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(U.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(a,{"min-width":"100",label:"Nama",prop:"nama"}),l(a,{"min-width":"100",label:"IP Address",prop:"ip_address"}),l(a,{"min-width":"100",label:"Port",prop:"port"}),l(a,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(x,{link:"",onClick:e(D),icon:e(be)},null,8,["onClick","icon"])]),default:o(({row:U})=>[l(Q,null,{dropdown:o(()=>[l(Y,null,{default:o(()=>[l(g,{icon:e(gl),onClick:R(z=>J(U.id),["prevent"])},{default:o(()=>[s(" Test Printer ")]),_:2},1032,["icon","onClick"]),l(g,{icon:e(ve),onClick:R(z=>e(V)(U),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(g,{icon:e(ge),onClick:R(z=>e(E)(U.id),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[y("span",eo,[l(S,null,{default:o(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),lo,e(w).total?(k(),H(Z,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(b),"page-sizes":[10,25,50,100],total:e(w).total,onCurrentChange:e(P),onSizeChange:e(N)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(L,{title:"PRINTER",modelValue:e(r),"onUpdate:modelValue":d[6]||(d[6]=U=>re(r)?r.value=U:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(x,{icon:e(Ve),onClick:e(K)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(x,{icon:e(he),type:"primary",onClick:d[5]||(d[5]=U=>e(C)(e(f)))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l($,{"label-position":"left","label-width":"150px"},{default:o(()=>{var U,z,O,v;return[l(T,{label:"Nama",error:(U=e(t).nama)==null?void 0:U.join(", ")},{default:o(()=>[l(B,{placeholder:"Nama",modelValue:e(i).nama,"onUpdate:modelValue":d[1]||(d[1]=u=>e(i).nama=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP",error:(z=e(t).ip_address)==null?void 0:z.join(", ")},{default:o(()=>[l(B,{placeholder:"Alamat IP",modelValue:e(i).ip_address,"onUpdate:modelValue":d[2]||(d[2]=u=>e(i).ip_address=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Port",error:(O=e(t).port)==null?void 0:O.join(", ")},{default:o(()=>[l(B,{placeholder:"Port",modelValue:e(i).port,"onUpdate:modelValue":d[3]||(d[3]=u=>e(i).port=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Status",error:(v=e(t).status)==null?void 0:v.join(", ")},{default:o(()=>[l(M,{"active-value":!0,"inactive-value":!1,modelValue:e(i).status,"onUpdate:modelValue":d[4]||(d[4]=u=>e(i).status=u),"active-color":"#13ce66"},null,8,["modelValue"]),l(n,{type:e(i).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(i).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},to={class:"text-right"},ao=y("br",null,null,-1),no={class:"el-dropdown-link"},ro=y("br",null,null,-1),so={__name:"Pos",setup(A){const f=ue(),{showForm:c,formErrors:r,formModel:t,pageSize:i,tableData:b,loading:w,currentChange:h,sizeChange:P,openForm:N,save:V,deleteData:C,closeForm:E,requestData:K,refreshData:D}=ze("/api/pos"),J=G(()=>f.printerList),X=()=>{f.getPosList(),f.getPos()};return ie(()=>{K()}),(d,x)=>{const a=ye,n=Se,S=Ce,g=Ae,Y=Ee,Q=$e,q=xe,Z=_e,B=we,T=Pe,M=Re,$=Be,L=Ue,U=ce;return k(),I(W,null,[y("div",to,[l(a,{size:"small",icon:e(fe),onClick:x[0]||(x[0]=z=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH POS ")]),_:1},8,["icon"])]),ao,l(q,{data:e(b).data,stripe:""},{default:o(()=>[l(n,{type:"index",index:e(b).from,label:"#"},null,8,["index"]),l(n,{"min-width":"100",label:"Nama",prop:"nama"}),l(n,{"min-width":"100",label:"IP Address",prop:"ip_address"}),l(n,{"min-width":"100",label:"Printer",prop:"printer.nama"}),l(n,{fixed:"right",width:"60px","header-align":"center",align:"center"},{header:o(()=>[l(a,{link:"",onClick:e(D),icon:e(be)},null,8,["onClick","icon"])]),default:o(({row:z})=>[l(Q,null,{dropdown:o(()=>[l(Y,null,{default:o(()=>[l(g,{icon:e(ve),onClick:R(O=>e(N)(z),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(g,{icon:e(ge),onClick:R(O=>e(C)(z.id,X),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[y("span",no,[l(S,null,{default:o(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),ro,e(b).total?(k(),H(Z,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(b).total,onCurrentChange:e(h),onSizeChange:e(P)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(U,{title:"POS",modelValue:e(c),"onUpdate:modelValue":x[5]||(x[5]=z=>re(c)?c.value=z:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(a,{icon:e(Ve),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(a,{icon:e(he),type:"primary",onClick:x[4]||(x[4]=z=>e(V)(X))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(L,{"label-position":"left","label-width":"150px"},{default:o(()=>{var z,O,v;return[l(T,{label:"Nama",error:(z=e(r).nama)==null?void 0:z.join(", ")},{default:o(()=>[l(B,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":x[1]||(x[1]=u=>e(t).nama=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP",error:(O=e(r).ip_address)==null?void 0:O.join(", ")},{default:o(()=>[l(B,{placeholder:"Alamat IP",modelValue:e(t).ip_address,"onUpdate:modelValue":x[2]||(x[2]=u=>e(t).ip_address=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Printer",error:(v=e(r).printer_id)==null?void 0:v.join(", ")},{default:o(()=>[l($,{modelValue:e(t).printer_id,"onUpdate:modelValue":x[3]||(x[3]=u=>e(t).printer_id=u),placeholder:"Printer",style:{width:"100%"}},{default:o(()=>[(k(!0),I(W,null,se(e(J),u=>(k(),H(M,{value:u.id,label:u.nama,key:u.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},io={class:"text-right"},uo=y("br",null,null,-1),po={key:0},mo={key:1},_o={key:2},co={class:"el-dropdown-link"},fo=y("br",null,null,-1),bo={__name:"GateIn",setup(A){const f=ue(),{showForm:c,formErrors:r,formModel:t,pageSize:i,tableData:b,loading:w,currentChange:h,sizeChange:P,openForm:N,save:V,deleteData:C,closeForm:E,requestData:K}=ze("/api/gateIn"),D=G(()=>f.printerList),J=G(()=>f.kameraList);return ie(()=>{K()}),(X,d)=>{const x=ye,a=Se,n=Ne,S=Ce,g=Ae,Y=Ee,Q=$e,q=xe,Z=_e,B=we,T=Pe,M=Re,$=Be,L=Te,U=Ue,z=ce,O=$l;return k(),I(W,null,[y("div",io,[l(x,{size:"small",icon:e(fe),onClick:d[0]||(d[0]=v=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH GATE MASUK ")]),_:1},8,["icon"])]),uo,Ge((k(),H(q,{data:e(b).data},{default:o(()=>[l(a,{prop:"shortcut_key",label:"#","min-width":"30px",align:"center","header-align":"center"}),l(a,{width:"100",label:"Status",prop:"status"},{default:o(({row:v})=>[l(n,{effect:"dark",type:v.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(v.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(a,{prop:"nama",label:"Nama","min-width":"100px"}),l(a,{prop:"jenis_kendaraan",label:"Jenis Kendaraan","min-width":"130px","show-overflow-tooltip":""}),l(a,{prop:"controller_ip_address",label:"Controller","min-width":"150px","show-overflow-tooltip":""},{default:o(({row:v})=>[v.controller_ip_address?(k(),I("span",po,j(v.controller_ip_address)+":"+j(v.controller_port),1)):ne("",!0),v.controller_ip_address?(k(),I("br",mo)):ne("",!0),v.controller_device?(k(),I("span",_o,j(v.controller_device)+":"+j(v.controller_baudrate),1)):ne("",!0)]),_:1}),l(a,{"min-width":"150",label:"Printer",prop:"printer.nama"}),l(a,{"min-width":"150",label:"Kamera"},{default:o(({row:v})=>[s(j(v.kameraList?v.kameraList.map(u=>u.nama).join(","):""),1)]),_:1}),l(a,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(x,{link:"",onClick:e(K),icon:e(be)},null,8,["onClick","icon"])]),default:o(({row:v})=>[l(Q,null,{dropdown:o(()=>[l(Y,null,{default:o(()=>[l(g,{icon:e(ve),onClick:R(u=>e(N)(v),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(g,{icon:e(ge),onClick:R(u=>e(C)(v.id,e(f).getGateInList),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[y("span",co,[l(S,null,{default:o(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[O,e(w)]]),fo,e(b).total?(k(),H(Z,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(b).total,onCurrentChange:e(h),onSizeChange:e(P)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(z,{title:"GATE MASUK",modelValue:e(c),"onUpdate:modelValue":d[10]||(d[10]=v=>re(c)?c.value=v:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(x,{icon:e(Ve),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(x,{icon:e(he),type:"primary",onClick:d[9]||(d[9]=v=>e(V)(e(f).getGateInList))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(U,{"label-position":"left","label-width":"150px"},{default:o(()=>{var v,u,_,F,le,oe,te,ae;return[l(T,{label:"Nama",error:(v=e(r).nama)==null?void 0:v.join(", ")},{default:o(()=>[l(B,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":d[1]||(d[1]=p=>e(t).nama=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Shortcut Key",error:(u=e(r).shortcut_key)==null?void 0:u.join(", ")},{default:o(()=>[l(B,{maxlength:"1",placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":d[2]||(d[2]=p=>e(t).shortcut_key=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Jenis Kendaraan",error:(_=e(r).jenis_kendaraan)==null?void 0:_.join(", ")},{default:o(()=>[l(B,{placeholder:"Jenis Kendaraan",modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":d[3]||(d[3]=p=>e(t).jenis_kendaraan=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP Kontroler",error:(F=e(r).controller_ip_address)==null?void 0:F.join(", ")},{default:o(()=>[l(B,{placeholder:"Alamat IP Kontroler",modelValue:e(t).controller_ip_address,"onUpdate:modelValue":d[4]||(d[4]=p=>e(t).controller_ip_address=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Port Kontroler",error:(le=e(r).controller_port)==null?void 0:le.join(", ")},{default:o(()=>[l(B,{type:"number",placeholder:"Port Kontroler",modelValue:e(t).controller_port,"onUpdate:modelValue":d[5]||(d[5]=p=>e(t).controller_port=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Printer",error:(oe=e(r).printer_id)==null?void 0:oe.join(", ")},{default:o(()=>[l($,{modelValue:e(t).printer_id,"onUpdate:modelValue":d[6]||(d[6]=p=>e(t).printer_id=p),placeholder:"Printer",style:{width:"100%"}},{default:o(()=>[(k(!0),I(W,null,se(e(D),p=>(k(),H(M,{value:p.id,label:p.nama,key:p.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Kamera",error:(te=e(r).kamera)==null?void 0:te.join(", ")},{default:o(()=>[l($,{modelValue:e(t).kamera,"onUpdate:modelValue":d[7]||(d[7]=p=>e(t).kamera=p),placeholder:"Kamera",style:{width:"100%"},multiple:""},{default:o(()=>[(k(!0),I(W,null,se(e(J),p=>(k(),H(M,{value:p.id,label:p.nama,key:p.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Status",error:(ae=e(r).status)==null?void 0:ae.join(", ")},{default:o(()=>[l(L,{"active-value":!0,"inactive-value":!1,modelValue:e(t).status,"onUpdate:modelValue":d[8]||(d[8]=p=>e(t).status=p),"active-color":"#13ce66"},null,8,["modelValue"]),l(n,{type:e(t).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(t).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},vo={class:"text-right"},go=y("br",null,null,-1),ko={class:"el-dropdown-link"},Vo=y("br",null,null,-1),ho={class:"flex"},yo={class:"flex"},Co={class:"flex"},wo={__name:"GateOut",setup(A){const f=ue(),{showForm:c,formErrors:r,formModel:t,pageSize:i,tableData:b,loading:w,currentChange:h,sizeChange:P,openForm:N,save:V,deleteData:C,closeForm:E,requestData:K}=ze("/api/gateOut"),D=G(()=>f.jenisKendaraanList),J=G(()=>f.kameraList),X=G(()=>f.posList);Al(async()=>{await f.getPosList()}),ie(()=>{K()});const d=a=>{console.log(`connecting to ${a.pos.ip_address}:5678`);const n=new WebSocket(`ws://${a.pos.ip_address}:5678/`);n.onerror=S=>{de({message:"KONEKSI KE POS GAGAL",type:"error"})},n.onopen=S=>{console.log(`connected to ${a.pos.ip_address}:5678`),n.send(["open",a.device,a.baudrate,a.open_command,a.close_command].join(";"))},n.onmessage=S=>{let g=JSON.parse(S.data);de({message:g.message,type:g.status?"success":"error"}),n.close()}},x=a=>{if(!a.running_text_device||!a.running_text_baudrate){de({message:"RUNNING TEXT TIDAK TERPASANG",type:"error"});return}console.log(`connecting to ${a.pos.ip_address}:5678`);const n=new WebSocket(`ws://${a.pos.ip_address}:5678/`);n.onerror=S=>{de({message:"KONEKSI KE POS GAGAL",type:"error"})},n.onopen=S=>{console.log(`connected to ${a.pos.ip_address}:5678`),n.send(["rt",a.running_text_device,a.running_text_baudrate,`TEST|${a.nama}`].join(";"))},n.onmessage=S=>{let g=JSON.parse(S.data);de({message:g.message,type:g.status?"success":"error"}),n.close()}};return(a,n)=>{const S=ye,g=Se,Y=Ne,Q=Ce,q=Ae,Z=Ee,B=$e,T=xe,M=_e,$=we,L=Pe,U=Re,z=Be,O=Te,v=Ue,u=ce;return k(),I(W,null,[y("div",vo,[l(S,{size:"small",icon:e(fe),onClick:n[0]||(n[0]=_=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH GATE KELUAR ")]),_:1},8,["icon"])]),go,l(T,{data:e(b).data,stripe:""},{default:o(()=>[l(g,{type:"index",index:e(b).from,label:"#"},null,8,["index"]),l(g,{"min-width":"100",label:"Status",prop:"status"},{default:o(({row:_})=>[l(Y,{effect:"dark",type:_.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(_.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(g,{"min-width":"150",label:"Nama",prop:"nama"}),l(g,{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100"}),l(g,{"min-width":"100",label:"Pos",prop:"pos.nama"}),l(g,{"min-width":"150",label:"Jenis Kendaraan",prop:"jenis_kendaraan"},{default:o(({row:_})=>[s(j(_.jenis_kendaraan?_.jenis_kendaraan.join(", "):""),1)]),_:1}),l(g,{"min-width":"150",label:"Controller Device"},{default:o(({row:_})=>[s(j(_.device)+":"+j(_.baudrate),1)]),_:1}),l(g,{"min-width":"130",label:"Perintah Buka",prop:"open_command"}),l(g,{"min-width":"130",label:"Perintah Tutup",prop:"close_command"}),l(g,{"min-width":"200",label:"UHF Reader"},{default:o(({row:_})=>[s(j(_.uhf_reader_host||"-")+":"+j(_.uhf_reader_port||"-"),1)]),_:1}),l(g,{"min-width":"200",label:"Running Text Device"},{default:o(({row:_})=>[s(j(_.running_text_device)+":"+j(_.running_text_baudrate),1)]),_:1}),l(g,{"min-width":"150",label:"Kamera"},{default:o(({row:_})=>[s(j(_.kameraList?_.kameraList.map(F=>F.nama).join(","):""),1)]),_:1}),l(g,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(S,{link:"",onClick:e(K),icon:e(be)},null,8,["onClick","icon"])]),default:o(({row:_})=>[l(B,null,{dropdown:o(()=>[l(Z,null,{default:o(()=>[l(q,{icon:e(kl),onClick:R(F=>d(_),["prevent"])},{default:o(()=>[s("Test Gate")]),_:2},1032,["icon","onClick"]),l(q,{icon:e(Vl),onClick:R(F=>x(_),["prevent"])},{default:o(()=>[s(" Test Running Text ")]),_:2},1032,["icon","onClick"]),l(q,{icon:e(ve),onClick:R(F=>e(N)(_),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(q,{icon:e(ge),onClick:R(F=>e(C)(_.id,e(f).getGateInList),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[y("span",ko,[l(Q,null,{default:o(()=>[l(e(ke))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Vo,e(b).total?(k(),H(M,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(b).total,onCurrentChange:e(h),onSizeChange:e(P)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(u,{title:"GATE KELUAR",modelValue:e(c),"onUpdate:modelValue":n[16]||(n[16]=_=>re(c)?c.value=_:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(S,{icon:e(Ve),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(S,{icon:e(he),type:"primary",onClick:n[15]||(n[15]=_=>e(V)(e(f).getGateInList))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(v,{"label-position":"left","label-width":"150px"},{default:o(()=>{var _,F,le,oe,te,ae,p,Me,Fe;return[l(L,{label:"Nama",error:(_=e(r).nama)==null?void 0:_.join(", ")},{default:o(()=>[l($,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":n[1]||(n[1]=m=>e(t).nama=m)},null,8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Shortcut Key",error:(F=e(r).shortcut_key)==null?void 0:F.join(", ")},{default:o(()=>[l($,{placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":n[2]||(n[2]=m=>e(t).shortcut_key=m)},null,8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Jenis Kendaraan",error:(le=e(r).jenis_kendaraan)==null?void 0:le.join(", ")},{default:o(()=>[l(z,{modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":n[3]||(n[3]=m=>e(t).jenis_kendaraan=m),placeholder:"Jenis Kendaraan",style:{width:"100%"},multiple:""},{default:o(()=>[(k(!0),I(W,null,se(e(D),m=>(k(),H(U,{value:m.nama,label:m.nama,key:m.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Controller",error:(oe=e(r).device)==null?void 0:oe.join(", ")},{default:o(()=>[y("div",ho,[l($,{class:"mr-2",placeholder:"Device",modelValue:e(t).device,"onUpdate:modelValue":n[4]||(n[4]=m=>e(t).device=m)},null,8,["modelValue"]),l($,{type:"number",placeholder:"Baudrate",modelValue:e(t).baudrate,"onUpdate:modelValue":n[5]||(n[5]=m=>e(t).baudrate=m)},null,8,["modelValue"])])]),_:1},8,["error"]),l(L,{label:"UHF Reader"},{default:o(()=>[y("div",yo,[l($,{class:"mr-2",placeholder:"IP Address",modelValue:e(t).uhf_reader_host,"onUpdate:modelValue":n[6]||(n[6]=m=>e(t).uhf_reader_host=m)},null,8,["modelValue"]),l($,{type:"number",placeholder:"Port",modelValue:e(t).uhf_reader_port,"onUpdate:modelValue":n[7]||(n[7]=m=>e(t).uhf_reader_port=m)},null,8,["modelValue"])])]),_:1}),l(L,{label:"Running Text"},{default:o(()=>[y("div",Co,[l($,{class:"mr-2",placeholder:"Device",modelValue:e(t).running_text_device,"onUpdate:modelValue":n[8]||(n[8]=m=>e(t).running_text_device=m)},null,8,["modelValue"]),l($,{type:"number",placeholder:"Baudrate",modelValue:e(t).running_text_baudrate,"onUpdate:modelValue":n[9]||(n[9]=m=>e(t).running_text_baudrate=m)},null,8,["modelValue"])])]),_:1}),l(L,{label:"Perintah Buka",error:(te=e(r).open_command)==null?void 0:te.join(", ")},{default:o(()=>[l($,{placeholder:"Perintah Buka",modelValue:e(t).open_command,"onUpdate:modelValue":n[10]||(n[10]=m=>e(t).open_command=m)},null,8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Perintah Tutup",error:(ae=e(r).close_command)==null?void 0:ae.join(", ")},{default:o(()=>[l($,{placeholder:"Perintah Tutup",modelValue:e(t).close_command,"onUpdate:modelValue":n[11]||(n[11]=m=>e(t).close_command=m)},null,8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Pos",error:(p=e(r).pos_id)==null?void 0:p.join(", ")},{default:o(()=>[l(z,{modelValue:e(t).pos_id,"onUpdate:modelValue":n[12]||(n[12]=m=>e(t).pos_id=m),placeholder:"Pos",style:{width:"100%"}},{default:o(()=>[(k(!0),I(W,null,se(e(X),m=>(k(),H(U,{value:m.id,label:m.nama,key:m.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Kamera",error:(Me=e(r).kamera)==null?void 0:Me.join(", ")},{default:o(()=>[l(z,{modelValue:e(t).kamera,"onUpdate:modelValue":n[13]||(n[13]=m=>e(t).kamera=m),placeholder:"Kamera",style:{width:"100%"},multiple:""},{default:o(()=>[(k(!0),I(W,null,se(e(J),m=>(k(),H(U,{value:m.id,label:m.nama,key:m.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(L,{label:"Status",error:(Fe=e(r).status)==null?void 0:Fe.join(", ")},{default:o(()=>[l(O,{"active-value":!0,"inactive-value":!1,modelValue:e(t).status,"onUpdate:modelValue":n[14]||(n[14]=m=>e(t).status=m),"active-color":"#13ce66"},null,8,["modelValue"]),l(Y,{type:e(t).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(t).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},Ro={__name:"device",setup(A){const f=ue(),c=[{label:"Kamera",component:Ql},{label:"Printer",component:oo},{label:"Pos",component:so},{label:"Gate Keluar",component:wo},{label:"Gate Masuk",component:bo}];return ie(async()=>{await f.getKameraList(),await f.getPrinterList()}),(r,t)=>{const i=rl,b=sl;return k(),H(b,null,{default:o(()=>[(k(),I(W,null,se(c,(w,h)=>l(i,{lazy:"",key:h,label:w.label.toUpperCase()},{default:o(()=>[(k(),H(El(w.component)))]),_:2},1032,["label"])),64))]),_:1})}}};export{Ro as default};
