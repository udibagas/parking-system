import{E as _e,a as ce,b as fe,c as rl,d as sl}from"./lIkQlT8-.js";import{b as je,i as He,a as Oe,c as Je,u as Ke,_ as Ie,w as il,d as We}from"./DqOMiPLp.js";import{u as ue,E as be}from"./BOPH87T_.js";import{u as Xe,U as Le,C as dl,a as ul,b as pl,c as Qe,d as ml,e as _l,f as cl,g as fl,h as bl,p as ve,r as ge,i as vl,j as ke,k as he,m as Ve,l as ye,s as Ce,E as we,n as xe,o as Se,q as gl,t as de,v as kl,w as hl}from"./C7zb9NPg.js";import{u as Ae,E as Ne,a as Re,b as Be}from"./MHl70GiG.js";import{E as Ee,a as $e,b as Pe}from"./BfYHu8b6.js";import{E as ze,a as Ue}from"./DQcARoV3.js";import{E as qe,r as me,F as Vl,c as D,d as pe,t as g,v as L,x as V,G as Ge,H as Ye,I as e,J as re,K as le,L as R,M as De,B as s,y as j,N as Ze,O as yl,o as ie,P as Cl,Q as wl,R as xl,S as Sl,z as l,A as o,T as H,U as ne,V as X,W as se,X as Al,Y as El}from"./Cdr9EVTw.js";import{E as Te}from"./CDz2D5Xr.js";import{v as $l}from"./7PG3nVsw.js";import"./l0sNRNKZ.js";const el=je({modelValue:{type:[String,Number,Boolean],default:void 0},size:Xe,disabled:Boolean,label:{type:[String,Number,Boolean],default:void 0},value:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:void 0}}),Pl=je({...el,border:Boolean}),ll={[Le]:S=>qe(S)||He(S)||Oe(S),[dl]:S=>qe(S)||He(S)||Oe(S)},ol=Symbol("radioGroupKey"),tl=(S,c)=>{const _=me(),r=Vl(ol,void 0),t=D(()=>!!r),i=D(()=>Je(S.value)?S.label:S.value),f=D({get(){return t.value?r.modelValue:S.modelValue},set(k){t.value?r.changeEvent(k):c&&c(Le,k),_.value.checked=S.modelValue===i.value}}),C=ul(D(()=>r==null?void 0:r.size)),h=pl(D(()=>r==null?void 0:r.disabled)),$=me(!1),N=D(()=>h.value||t.value&&f.value!==i.value?-1:0);return Qe({from:"label act as value",replacement:"value",version:"3.0.0",scope:"el-radio",ref:"https://element-plus.org/en-US/component/radio.html"},D(()=>t.value&&Je(S.value))),{radioRef:_,isGroup:t,radioGroup:r,focus:$,size:C,disabled:h,tabIndex:N,modelValue:f,actualValue:i}},zl=["value","name","disabled"],Ul=pe({name:"ElRadio"}),jl=pe({...Ul,props:Pl,emits:ll,setup(S,{emit:c}){const _=S,r=Ke("radio"),{radioRef:t,radioGroup:i,focus:f,size:C,disabled:h,modelValue:$,actualValue:N}=tl(_,c);function k(){Ze(()=>c("change",$.value))}return(y,E)=>{var I;return g(),L("label",{class:le([e(r).b(),e(r).is("disabled",e(h)),e(r).is("focus",e(f)),e(r).is("bordered",y.border),e(r).is("checked",e($)===e(N)),e(r).m(e(C))])},[V("span",{class:le([e(r).e("input"),e(r).is("disabled",e(h)),e(r).is("checked",e($)===e(N))])},[Ge(V("input",{ref_key:"radioRef",ref:t,"onUpdate:modelValue":E[0]||(E[0]=M=>re($)?$.value=M:null),class:le(e(r).e("original")),value:e(N),name:y.name||((I=e(i))==null?void 0:I.name),disabled:e(h),type:"radio",onFocus:E[1]||(E[1]=M=>f.value=!0),onBlur:E[2]||(E[2]=M=>f.value=!1),onChange:k,onClick:E[3]||(E[3]=R(()=>{},["stop"]))},null,42,zl),[[Ye,e($)]]),V("span",{class:le(e(r).e("inner"))},null,2)],2),V("span",{class:le(e(r).e("label")),onKeydown:E[4]||(E[4]=R(()=>{},["stop"]))},[De(y.$slots,"default",{},()=>[s(j(y.label),1)])],34)],2)}}});var Nl=Ie(jl,[["__file","radio.vue"]]);const Tl=je({...el}),Kl=["value","name","disabled"],Il=pe({name:"ElRadioButton"}),Ll=pe({...Il,props:Tl,setup(S){const c=S,_=Ke("radio"),{radioRef:r,focus:t,size:i,disabled:f,modelValue:C,radioGroup:h,actualValue:$}=tl(c),N=D(()=>({backgroundColor:(h==null?void 0:h.fill)||"",borderColor:(h==null?void 0:h.fill)||"",boxShadow:h!=null&&h.fill?`-1px 0 0 0 ${h.fill}`:"",color:(h==null?void 0:h.textColor)||""}));return(k,y)=>{var E;return g(),L("label",{class:le([e(_).b("button"),e(_).is("active",e(C)===e($)),e(_).is("disabled",e(f)),e(_).is("focus",e(t)),e(_).bm("button",e(i))])},[Ge(V("input",{ref_key:"radioRef",ref:r,"onUpdate:modelValue":y[0]||(y[0]=I=>re(C)?C.value=I:null),class:le(e(_).be("button","original-radio")),value:e($),type:"radio",name:k.name||((E=e(h))==null?void 0:E.name),disabled:e(f),onFocus:y[1]||(y[1]=I=>t.value=!0),onBlur:y[2]||(y[2]=I=>t.value=!1),onClick:y[3]||(y[3]=R(()=>{},["stop"]))},null,42,Kl),[[Ye,e(C)]]),V("span",{class:le(e(_).be("button","inner")),style:yl(e(C)===e($)?e(N):{}),onKeydown:y[4]||(y[4]=R(()=>{},["stop"]))},[De(k.$slots,"default",{},()=>[s(j(k.label),1)])],38)],2)}}});var al=Ie(Ll,[["__file","radio-button.vue"]]);const Rl=je({id:{type:String,default:void 0},size:Xe,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:void 0},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0},...ml(["ariaLabel"])}),Bl=ll,Gl=["id","aria-label","aria-labelledby"],Dl=pe({name:"ElRadioGroup"}),Ml=pe({...Dl,props:Rl,emits:Bl,setup(S,{emit:c}){const _=S,r=Ke("radio"),t=_l(),i=me(),{formItem:f}=cl(),{inputId:C,isLabeledByFormItem:h}=fl(_,{formItemContext:f}),$=k=>{c(Le,k),Ze(()=>c("change",k))};ie(()=>{const k=i.value.querySelectorAll("[type=radio]"),y=k[0];!Array.from(k).some(E=>E.checked)&&y&&(y.tabIndex=0)});const N=D(()=>_.name||t.value);return Cl(ol,wl({...xl(_),changeEvent:$,name:N})),Sl(()=>_.modelValue,()=>{_.validateEvent&&(f==null||f.validate("change").catch(k=>bl()))}),Qe({from:"label",replacement:"aria-label",version:"2.8.0",scope:"el-radio-group",ref:"https://element-plus.org/en-US/component/radio.html"},D(()=>!!_.label)),(k,y)=>(g(),L("div",{id:e(C),ref_key:"radioGroupRef",ref:i,class:le(e(r).b("group")),role:"radiogroup","aria-label":e(h)?void 0:k.label||k.ariaLabel||"radio-group","aria-labelledby":e(h)?e(f).labelId:void 0},[De(k.$slots,"default")],10,Gl))}});var nl=Ie(Ml,[["__file","radio-group.vue"]]);const Fl=il(Nl,{RadioButton:al,RadioGroup:nl}),Hl=We(nl);We(al);const Ol={class:"text-right"},Jl=V("br",null,null,-1),ql={class:"el-dropdown-link"},Wl=V("br",null,null,-1),Xl=["src"],Ql={__name:"Kamera",setup(S){const{getKameraList:c}=ue(),{api:_,showForm:r,formErrors:t,formModel:i,pageSize:f,tableData:C,loading:h,currentChange:$,sizeChange:N,openForm:k,save:y,deleteData:E,closeForm:I,requestData:M}=Ae("/api/kamera"),q=me(!1),Q=me(null),d=w=>{_(`/api/kamera/test/${w}`).then(n=>{Q.value="data:image/jpeg;base64,"+n.snapshot,q.value=!0})};return ie(()=>{M()}),(w,n)=>{const a=we,x=_e,v=Ne,Z=xe,Y=Ee,W=$e,ee=Pe,G=ce,T=fe,O=Se,P=ze,K=Fl,z=Hl,U=Te,J=Ue,b=be;return g(),L(X,null,[V("div",Ol,[l(a,{size:"small",icon:e(ve),onClick:n[0]||(n[0]=u=>e(k)()),type:"primary"},{default:o(()=>[s(" TAMBAH KAMERA ")]),_:1},8,["icon"])]),Jl,l(G,{data:e(C).data,stripe:""},{default:o(()=>[l(x,{type:"index",index:e(C).from,label:"#"},null,8,["index"]),l(x,{width:"100",label:"Status",prop:"status",align:"center","header-align":"center"},{default:o(({row:u})=>[l(v,{effect:"dark",type:u.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(u.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(x,{width:"120",label:"Nama",prop:"nama"}),l(x,{width:"120",label:"Username",prop:"username"}),l(x,{width:"120",label:"Password",prop:"password"}),l(x,{width:"100",label:"Auth Type",prop:"auth_type"}),l(x,{"show-overflow-tooltip":"","min-width":"150",label:"Snapshot URL",prop:"snapshot_url"}),l(x,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(a,{link:"",onClick:e(M),icon:e(ge)},null,8,["onClick","icon"])]),default:o(({row:u})=>[l(ee,null,{dropdown:o(()=>[l(W,null,{default:o(()=>[l(Y,{icon:e(vl),onClick:R(m=>d(u.id),["prevent"])},{default:o(()=>[s(" Test Kamera ")]),_:2},1032,["icon","onClick"]),l(Y,{icon:e(ke),onClick:R(m=>e(k)(u),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(Y,{icon:e(he),onClick:R(m=>e(E)(u.id,e(c)),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[V("span",ql,[l(Z,null,{default:o(()=>[l(e(Ve))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Wl,e(C).total?(g(),H(T,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(f),"page-sizes":[10,25,50,100],total:e(C).total,onCurrentChange:e($),onSizeChange:e(N)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(b,{title:"KAMERA",modelValue:e(r),"onUpdate:modelValue":n[8]||(n[8]=u=>re(r)?r.value=u:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(a,{icon:e(ye),onClick:e(I)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(a,{icon:e(Ce),type:"primary",onClick:n[7]||(n[7]=u=>e(y)(e(c)))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(J,{"label-position":"left","label-width":"150px"},{default:o(()=>{var u,m,F,oe,te,ae;return[l(P,{label:"Nama",error:(u=e(t).nama)==null?void 0:u.join(", ")},{default:o(()=>[l(O,{placeholder:"Nama",modelValue:e(i).nama,"onUpdate:modelValue":n[1]||(n[1]=B=>e(i).nama=B)},null,8,["modelValue"])]),_:1},8,["error"]),l(P,{label:"Username",error:(m=e(t).username)==null?void 0:m.join(", ")},{default:o(()=>[l(O,{placeholder:"Username",modelValue:e(i).username,"onUpdate:modelValue":n[2]||(n[2]=B=>e(i).username=B)},null,8,["modelValue"])]),_:1},8,["error"]),l(P,{label:"Password",error:(F=e(t).password)==null?void 0:F.join(", ")},{default:o(()=>[l(O,{placeholder:"Password",modelValue:e(i).password,"onUpdate:modelValue":n[3]||(n[3]=B=>e(i).password=B)},null,8,["modelValue"])]),_:1},8,["error"]),l(P,{label:"URL Snapshot",error:(oe=e(t).snapshot_url)==null?void 0:oe.join(", ")},{default:o(()=>[l(O,{placeholder:"URL Snapshot",modelValue:e(i).snapshot_url,"onUpdate:modelValue":n[4]||(n[4]=B=>e(i).snapshot_url=B)},null,8,["modelValue"])]),_:1},8,["error"]),l(P,{label:"Otentifikasi",error:(te=e(t).auth_type)==null?void 0:te.join(", ")},{default:o(()=>[l(z,{modelValue:e(i).auth_type,"onUpdate:modelValue":n[5]||(n[5]=B=>e(i).auth_type=B)},{default:o(()=>[l(K,{value:"digest"},{default:o(()=>[s("Digest")]),_:1}),l(K,{value:"basic"},{default:o(()=>[s("Basic")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(P,{label:"Status",error:(ae=e(t).status)==null?void 0:ae.join(", ")},{default:o(()=>[l(U,{"active-value":!0,"inactive-value":!1,modelValue:e(i).status,"onUpdate:modelValue":n[6]||(n[6]=B=>e(i).status=B),"active-color":"#13ce66"},null,8,["modelValue"]),l(v,{type:e(i).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(i).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"]),l(b,{title:"SNAPSHOT KAMERA",center:"",modelValue:e(q),"onUpdate:modelValue":n[9]||(n[9]=u=>re(q)?q.value=u:null)},{default:o(()=>[V("img",{src:e(Q),alt:"",style:{width:"100%"}},null,8,Xl)]),_:1},8,["modelValue"])],64)}}},Yl={class:"text-right"},Zl=V("br",null,null,-1),eo={class:"el-dropdown-link"},lo=V("br",null,null,-1),oo={__name:"Printer",setup(S){const{getPrinterList:c}=ue(),{api:_,showForm:r,formErrors:t,formModel:i,pageSize:f,tableData:C,loading:h,currentChange:$,sizeChange:N,openForm:k,save:y,deleteData:E,closeForm:I,requestData:M}=Ae("/api/printer"),q=Q=>{_(`/api/printer/test/${Q}`).then(d=>{de({message:d.message,type:"success"})})};return ie(()=>{M()}),(Q,d)=>{const w=we,n=_e,a=Ne,x=xe,v=Ee,Z=$e,Y=Pe,W=ce,ee=fe,G=Se,T=ze,O=Te,P=Ue,K=be;return g(),L(X,null,[V("div",Yl,[l(w,{size:"small",icon:e(ve),onClick:d[0]||(d[0]=z=>e(k)()),type:"primary"},{default:o(()=>[s(" TAMBAH PRINTER ")]),_:1},8,["icon"])]),Zl,l(W,{data:e(C).data,stripe:""},{default:o(()=>[l(n,{type:"index",index:e(C).from,label:"#"},null,8,["index"]),l(n,{width:"100",label:"Status",prop:"status"},{default:o(({row:z})=>[l(a,{effect:"dark",type:z.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(z.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(n,{"min-width":"100",label:"Nama",prop:"nama"}),l(n,{"min-width":"100",label:"IP Address",prop:"ip_address"}),l(n,{"min-width":"100",label:"Port",prop:"port"}),l(n,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(w,{link:"",onClick:e(M),icon:e(ge)},null,8,["onClick","icon"])]),default:o(({row:z})=>[l(Y,null,{dropdown:o(()=>[l(Z,null,{default:o(()=>[l(v,{icon:e(gl),onClick:R(U=>q(z.id),["prevent"])},{default:o(()=>[s(" Test Printer ")]),_:2},1032,["icon","onClick"]),l(v,{icon:e(ke),onClick:R(U=>e(k)(z),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(v,{icon:e(he),onClick:R(U=>e(E)(z.id),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[V("span",eo,[l(x,null,{default:o(()=>[l(e(Ve))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),lo,e(C).total?(g(),H(ee,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(f),"page-sizes":[10,25,50,100],total:e(C).total,onCurrentChange:e($),onSizeChange:e(N)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(K,{title:"PRINTER",modelValue:e(r),"onUpdate:modelValue":d[6]||(d[6]=z=>re(r)?r.value=z:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(w,{icon:e(ye),onClick:e(I)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(w,{icon:e(Ce),type:"primary",onClick:d[5]||(d[5]=z=>e(y)(e(c)))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(P,{"label-position":"left","label-width":"150px"},{default:o(()=>{var z,U,J,b;return[l(T,{label:"Nama",error:(z=e(t).nama)==null?void 0:z.join(", ")},{default:o(()=>[l(G,{placeholder:"Nama",modelValue:e(i).nama,"onUpdate:modelValue":d[1]||(d[1]=u=>e(i).nama=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP",error:(U=e(t).ip_address)==null?void 0:U.join(", ")},{default:o(()=>[l(G,{placeholder:"Alamat IP",modelValue:e(i).ip_address,"onUpdate:modelValue":d[2]||(d[2]=u=>e(i).ip_address=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Port",error:(J=e(t).port)==null?void 0:J.join(", ")},{default:o(()=>[l(G,{placeholder:"Port",modelValue:e(i).port,"onUpdate:modelValue":d[3]||(d[3]=u=>e(i).port=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Status",error:(b=e(t).status)==null?void 0:b.join(", ")},{default:o(()=>[l(O,{"active-value":!0,"inactive-value":!1,modelValue:e(i).status,"onUpdate:modelValue":d[4]||(d[4]=u=>e(i).status=u),"active-color":"#13ce66"},null,8,["modelValue"]),l(a,{type:e(i).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(i).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},to={class:"text-right"},ao=V("br",null,null,-1),no={class:"el-dropdown-link"},ro=V("br",null,null,-1),so={__name:"Pos",setup(S){const c=ue(),{showForm:_,formErrors:r,formModel:t,pageSize:i,tableData:f,loading:C,currentChange:h,sizeChange:$,openForm:N,save:k,deleteData:y,closeForm:E,requestData:I,refreshData:M}=Ae("/api/pos"),q=D(()=>c.printerList),Q=()=>{c.getPosList(),c.getPos()};return ie(()=>{I()}),(d,w)=>{const n=we,a=_e,x=xe,v=Ee,Z=$e,Y=Pe,W=ce,ee=fe,G=Se,T=ze,O=Re,P=Be,K=Ue,z=be;return g(),L(X,null,[V("div",to,[l(n,{size:"small",icon:e(ve),onClick:w[0]||(w[0]=U=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH POS ")]),_:1},8,["icon"])]),ao,l(W,{data:e(f).data,stripe:""},{default:o(()=>[l(a,{type:"index",index:e(f).from,label:"#"},null,8,["index"]),l(a,{"min-width":"100",label:"Nama",prop:"nama"}),l(a,{"min-width":"100",label:"IP Address",prop:"ip_address"}),l(a,{"min-width":"100",label:"Printer",prop:"printer.nama"}),l(a,{fixed:"right",width:"60px","header-align":"center",align:"center"},{header:o(()=>[l(n,{link:"",onClick:e(M),icon:e(ge)},null,8,["onClick","icon"])]),default:o(({row:U})=>[l(Y,null,{dropdown:o(()=>[l(Z,null,{default:o(()=>[l(v,{icon:e(ke),onClick:R(J=>e(N)(U),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(v,{icon:e(he),onClick:R(J=>e(y)(U.id,Q),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[V("span",no,[l(x,null,{default:o(()=>[l(e(Ve))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),ro,e(f).total?(g(),H(ee,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(f).total,onCurrentChange:e(h),onSizeChange:e($)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(z,{title:"POS",modelValue:e(_),"onUpdate:modelValue":w[5]||(w[5]=U=>re(_)?_.value=U:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(n,{icon:e(ye),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(n,{icon:e(Ce),type:"primary",onClick:w[4]||(w[4]=U=>e(k)(Q))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(K,{"label-position":"left","label-width":"150px"},{default:o(()=>{var U,J,b;return[l(T,{label:"Nama",error:(U=e(r).nama)==null?void 0:U.join(", ")},{default:o(()=>[l(G,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":w[1]||(w[1]=u=>e(t).nama=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP",error:(J=e(r).ip_address)==null?void 0:J.join(", ")},{default:o(()=>[l(G,{placeholder:"Alamat IP",modelValue:e(t).ip_address,"onUpdate:modelValue":w[2]||(w[2]=u=>e(t).ip_address=u)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Printer",error:(b=e(r).printer_id)==null?void 0:b.join(", ")},{default:o(()=>[l(P,{modelValue:e(t).printer_id,"onUpdate:modelValue":w[3]||(w[3]=u=>e(t).printer_id=u),placeholder:"Printer",style:{width:"100%"}},{default:o(()=>[(g(!0),L(X,null,se(e(q),u=>(g(),H(O,{value:u.id,label:u.nama,key:u.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},io={class:"text-right"},uo=V("br",null,null,-1),po={key:0},mo={key:1},_o={key:2},co={class:"el-dropdown-link"},fo=V("br",null,null,-1),bo={__name:"GateIn",setup(S){const c=ue(),{showForm:_,formErrors:r,formModel:t,pageSize:i,tableData:f,loading:C,currentChange:h,sizeChange:$,openForm:N,save:k,deleteData:y,closeForm:E,requestData:I}=Ae("/api/gateIn"),M=D(()=>c.printerList),q=D(()=>c.kameraList);return ie(()=>{I()}),(Q,d)=>{const w=we,n=_e,a=Ne,x=xe,v=Ee,Z=$e,Y=Pe,W=ce,ee=fe,G=Se,T=ze,O=Re,P=Be,K=Te,z=Ue,U=be,J=$l;return g(),L(X,null,[V("div",io,[l(w,{size:"small",icon:e(ve),onClick:d[0]||(d[0]=b=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH GATE MASUK ")]),_:1},8,["icon"])]),uo,Ge((g(),H(W,{data:e(f).data},{default:o(()=>[l(n,{prop:"shortcut_key",label:"#","min-width":"30px",align:"center","header-align":"center"}),l(n,{width:"100",label:"Status",prop:"status"},{default:o(({row:b})=>[l(a,{effect:"dark",type:b.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(b.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(n,{prop:"nama",label:"Nama","min-width":"100px"}),l(n,{prop:"jenis_kendaraan",label:"Jenis Kendaraan","min-width":"130px","show-overflow-tooltip":""}),l(n,{prop:"controller_ip_address",label:"Controller","min-width":"150px","show-overflow-tooltip":""},{default:o(({row:b})=>[b.controller_ip_address?(g(),L("span",po,j(b.controller_ip_address)+":"+j(b.controller_port),1)):ne("",!0),b.controller_ip_address?(g(),L("br",mo)):ne("",!0),b.controller_device?(g(),L("span",_o,j(b.controller_device)+":"+j(b.controller_baudrate),1)):ne("",!0)]),_:1}),l(n,{"min-width":"150",label:"Printer",prop:"printer.nama"}),l(n,{"min-width":"150",label:"Kamera"},{default:o(({row:b})=>[s(j(b.kameraList?b.kameraList.map(u=>u.nama).join(","):""),1)]),_:1}),l(n,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(w,{link:"",onClick:e(I),icon:e(ge)},null,8,["onClick","icon"])]),default:o(({row:b})=>[l(Y,null,{dropdown:o(()=>[l(Z,null,{default:o(()=>[l(v,{icon:e(ke),onClick:R(u=>e(N)(b),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(v,{icon:e(he),onClick:R(u=>e(y)(b.id,e(c).getGateInList),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[V("span",co,[l(x,null,{default:o(()=>[l(e(Ve))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[J,e(C)]]),fo,e(f).total?(g(),H(ee,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(f).total,onCurrentChange:e(h),onSizeChange:e($)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(U,{title:"GATE MASUK",modelValue:e(_),"onUpdate:modelValue":d[10]||(d[10]=b=>re(_)?_.value=b:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(w,{icon:e(ye),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(w,{icon:e(Ce),type:"primary",onClick:d[9]||(d[9]=b=>e(k)(e(c).getGateInList))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(z,{"label-position":"left","label-width":"150px"},{default:o(()=>{var b,u,m,F,oe,te,ae,B;return[l(T,{label:"Nama",error:(b=e(r).nama)==null?void 0:b.join(", ")},{default:o(()=>[l(G,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":d[1]||(d[1]=A=>e(t).nama=A)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Shortcut Key",error:(u=e(r).shortcut_key)==null?void 0:u.join(", ")},{default:o(()=>[l(G,{maxlength:"1",placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":d[2]||(d[2]=A=>e(t).shortcut_key=A)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Jenis Kendaraan",error:(m=e(r).jenis_kendaraan)==null?void 0:m.join(", ")},{default:o(()=>[l(G,{placeholder:"Jenis Kendaraan",modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":d[3]||(d[3]=A=>e(t).jenis_kendaraan=A)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Alamat IP Kontroler",error:(F=e(r).controller_ip_address)==null?void 0:F.join(", ")},{default:o(()=>[l(G,{placeholder:"Alamat IP Kontroler",modelValue:e(t).controller_ip_address,"onUpdate:modelValue":d[4]||(d[4]=A=>e(t).controller_ip_address=A)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Port Kontroler",error:(oe=e(r).controller_port)==null?void 0:oe.join(", ")},{default:o(()=>[l(G,{type:"number",placeholder:"Port Kontroler",modelValue:e(t).controller_port,"onUpdate:modelValue":d[5]||(d[5]=A=>e(t).controller_port=A)},null,8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Printer",error:(te=e(r).printer_id)==null?void 0:te.join(", ")},{default:o(()=>[l(P,{modelValue:e(t).printer_id,"onUpdate:modelValue":d[6]||(d[6]=A=>e(t).printer_id=A),placeholder:"Printer",style:{width:"100%"}},{default:o(()=>[(g(!0),L(X,null,se(e(M),A=>(g(),H(O,{value:A.id,label:A.nama,key:A.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Kamera",error:(ae=e(r).kamera)==null?void 0:ae.join(", ")},{default:o(()=>[l(P,{modelValue:e(t).kamera,"onUpdate:modelValue":d[7]||(d[7]=A=>e(t).kamera=A),placeholder:"Kamera",style:{width:"100%"},multiple:""},{default:o(()=>[(g(!0),L(X,null,se(e(q),A=>(g(),H(O,{value:A.id,label:A.nama,key:A.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(T,{label:"Status",error:(B=e(r).status)==null?void 0:B.join(", ")},{default:o(()=>[l(K,{"active-value":!0,"inactive-value":!1,modelValue:e(t).status,"onUpdate:modelValue":d[8]||(d[8]=A=>e(t).status=A),"active-color":"#13ce66"},null,8,["modelValue"]),l(a,{type:e(t).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(t).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},vo={class:"text-right"},go=V("br",null,null,-1),ko={class:"el-dropdown-link"},ho=V("br",null,null,-1),Vo={class:"flex"},yo={class:"flex"},Co={class:"flex"},wo={__name:"GateOut",setup(S){const c=ue(),{showForm:_,formErrors:r,formModel:t,pageSize:i,tableData:f,loading:C,currentChange:h,sizeChange:$,openForm:N,save:k,deleteData:y,closeForm:E,requestData:I}=Ae("/api/gateOut"),M=D(()=>c.jenisKendaraanList),q=D(()=>c.kameraList),Q=D(()=>c.posList);Al(async()=>{await c.getPosList()}),ie(()=>{I()});const d=n=>{console.log(`connecting to ${n.pos.ip_address}:5678`);const a=new WebSocket(`ws://${n.pos.ip_address}:5678/`);a.onerror=x=>{de({message:"KONEKSI KE POS GAGAL",type:"error"})},a.onopen=x=>{console.log(`connected to ${n.pos.ip_address}:5678`),a.send(["open",n.device,n.baudrate,n.open_command,n.close_command].join(";"))},a.onmessage=x=>{let v=JSON.parse(x.data);de({message:v.message,type:v.status?"success":"error"}),a.close()}},w=n=>{if(!n.running_text_device||!n.running_text_baudrate){de({message:"RUNNING TEXT TIDAK TERPASANG",type:"error"});return}console.log(`connecting to ${n.pos.ip_address}:5678`);const a=new WebSocket(`ws://${n.pos.ip_address}:5678/`);a.onerror=x=>{de({message:"KONEKSI KE POS GAGAL",type:"error"})},a.onopen=x=>{console.log(`connected to ${n.pos.ip_address}:5678`),a.send(["rt",n.running_text_device,n.running_text_baudrate,`TEST|${n.nama}`].join(";"))},a.onmessage=x=>{let v=JSON.parse(x.data);de({message:v.message,type:v.status?"success":"error"}),a.close()}};return(n,a)=>{const x=we,v=_e,Z=Ne,Y=xe,W=Ee,ee=$e,G=Pe,T=ce,O=fe,P=Se,K=ze,z=Re,U=Be,J=Te,b=Ue,u=be;return g(),L(X,null,[V("div",vo,[l(x,{size:"small",icon:e(ve),onClick:a[0]||(a[0]=m=>e(N)()),type:"primary"},{default:o(()=>[s(" TAMBAH GATE KELUAR ")]),_:1},8,["icon"])]),go,l(T,{data:e(f).data,stripe:""},{default:o(()=>[l(v,{type:"index",index:e(f).from,label:"#"},null,8,["index"]),l(v,{"min-width":"100",label:"Status",prop:"status"},{default:o(({row:m})=>[l(Z,{effect:"dark",type:m.status?"success":"info",size:"small",style:{width:"100%"}},{default:o(()=>[s(j(m.status?"Aktif":"Tidak Aktif"),1)]),_:2},1032,["type"])]),_:1}),l(v,{"min-width":"150",label:"Nama",prop:"nama"}),l(v,{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100"}),l(v,{"min-width":"100",label:"Pos",prop:"pos.nama"}),l(v,{"min-width":"150",label:"Jenis Kendaraan",prop:"jenis_kendaraan"},{default:o(({row:m})=>[s(j(m.jenis_kendaraan?m.jenis_kendaraan.join(", "):""),1)]),_:1}),l(v,{"min-width":"150",label:"Controller Device"},{default:o(({row:m})=>[s(j(m.device)+":"+j(m.baudrate),1)]),_:1}),l(v,{"min-width":"130",label:"Perintah Buka",prop:"open_command"}),l(v,{"min-width":"130",label:"Perintah Tutup",prop:"close_command"}),l(v,{"min-width":"200",label:"UHF Reader"},{default:o(({row:m})=>[s(j(m.uhf_reader_host||"-")+":"+j(m.uhf_reader_port||"-"),1)]),_:1}),l(v,{"min-width":"200",label:"Running Text Device"},{default:o(({row:m})=>[s(j(m.running_text_device)+":"+j(m.running_text_baudrate),1)]),_:1}),l(v,{"min-width":"150",label:"Kamera"},{default:o(({row:m})=>[s(j(m.kameraList?m.kameraList.map(F=>F.nama).join(","):""),1)]),_:1}),l(v,{fixed:"right",width:"60px",align:"center","header-align":"center"},{header:o(()=>[l(x,{link:"",onClick:e(I),icon:e(ge)},null,8,["onClick","icon"])]),default:o(({row:m})=>[l(G,null,{dropdown:o(()=>[l(ee,null,{default:o(()=>[l(W,{icon:e(kl),onClick:R(F=>d(m),["prevent"])},{default:o(()=>[s("Test Gate")]),_:2},1032,["icon","onClick"]),l(W,{icon:e(hl),onClick:R(F=>w(m),["prevent"])},{default:o(()=>[s(" Test Running Text ")]),_:2},1032,["icon","onClick"]),l(W,{icon:e(ke),onClick:R(F=>e(N)(m),["prevent"])},{default:o(()=>[s(" Edit ")]),_:2},1032,["icon","onClick"]),l(W,{icon:e(he),onClick:R(F=>e(y)(m.id,e(c).getGateInList),["prevent"])},{default:o(()=>[s(" Hapus ")]),_:2},1032,["icon","onClick"])]),_:2},1024)]),default:o(()=>[V("span",ko,[l(Y,null,{default:o(()=>[l(e(Ve))]),_:1})])]),_:2},1024)]),_:1})]),_:1},8,["data"]),ho,e(f).total?(g(),H(O,{key:0,small:"",background:"",layout:"total, sizes, prev, pager, next","page-size":e(i),"page-sizes":[10,25,50,100],total:e(f).total,onCurrentChange:e(h),onSizeChange:e($)},null,8,["page-size","total","onCurrentChange","onSizeChange"])):ne("",!0),l(u,{title:"GATE KELUAR",modelValue:e(_),"onUpdate:modelValue":a[16]||(a[16]=m=>re(_)?_.value=m:null),width:"500px","close-on-click-modal":!1},{footer:o(()=>[l(x,{icon:e(ye),onClick:e(E)},{default:o(()=>[s(" BATAL ")]),_:1},8,["icon","onClick"]),l(x,{icon:e(Ce),type:"primary",onClick:a[15]||(a[15]=m=>e(k)(e(c).getGateInList))},{default:o(()=>[s(" SIMPAN ")]),_:1},8,["icon"])]),default:o(()=>[l(b,{"label-position":"left","label-width":"150px"},{default:o(()=>{var m,F,oe,te,ae,B,A,Me,Fe;return[l(K,{label:"Nama",error:(m=e(r).nama)==null?void 0:m.join(", ")},{default:o(()=>[l(P,{placeholder:"Nama",modelValue:e(t).nama,"onUpdate:modelValue":a[1]||(a[1]=p=>e(t).nama=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Shortcut Key",error:(F=e(r).shortcut_key)==null?void 0:F.join(", ")},{default:o(()=>[l(P,{placeholder:"Shortcut Key",modelValue:e(t).shortcut_key,"onUpdate:modelValue":a[2]||(a[2]=p=>e(t).shortcut_key=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Jenis Kendaraan",error:(oe=e(r).jenis_kendaraan)==null?void 0:oe.join(", ")},{default:o(()=>[l(U,{modelValue:e(t).jenis_kendaraan,"onUpdate:modelValue":a[3]||(a[3]=p=>e(t).jenis_kendaraan=p),placeholder:"Jenis Kendaraan",style:{width:"100%"},multiple:""},{default:o(()=>[(g(!0),L(X,null,se(e(M),p=>(g(),H(z,{value:p.nama,label:p.nama,key:p.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Controller",error:(te=e(r).device)==null?void 0:te.join(", ")},{default:o(()=>[V("div",Vo,[l(P,{class:"mr-2",placeholder:"Device",modelValue:e(t).device,"onUpdate:modelValue":a[4]||(a[4]=p=>e(t).device=p)},null,8,["modelValue"]),l(P,{type:"number",placeholder:"Baudrate",modelValue:e(t).baudrate,"onUpdate:modelValue":a[5]||(a[5]=p=>e(t).baudrate=p)},null,8,["modelValue"])])]),_:1},8,["error"]),l(K,{label:"UHF Reader"},{default:o(()=>[V("div",yo,[l(P,{class:"mr-2",placeholder:"IP Address",modelValue:e(t).uhf_reader_host,"onUpdate:modelValue":a[6]||(a[6]=p=>e(t).uhf_reader_host=p)},null,8,["modelValue"]),l(P,{type:"number",placeholder:"Port",modelValue:e(t).uhf_reader_port,"onUpdate:modelValue":a[7]||(a[7]=p=>e(t).uhf_reader_port=p)},null,8,["modelValue"])])]),_:1}),l(K,{label:"Running Text"},{default:o(()=>[V("div",Co,[l(P,{class:"mr-2",placeholder:"Device",modelValue:e(t).running_text_device,"onUpdate:modelValue":a[8]||(a[8]=p=>e(t).running_text_device=p)},null,8,["modelValue"]),l(P,{type:"number",placeholder:"Baudrate",modelValue:e(t).running_text_baudrate,"onUpdate:modelValue":a[9]||(a[9]=p=>e(t).running_text_baudrate=p)},null,8,["modelValue"])])]),_:1}),l(K,{label:"Perintah Buka",error:(ae=e(r).open_command)==null?void 0:ae.join(", ")},{default:o(()=>[l(P,{placeholder:"Perintah Buka",modelValue:e(t).open_command,"onUpdate:modelValue":a[10]||(a[10]=p=>e(t).open_command=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Perintah Tutup",error:(B=e(r).close_command)==null?void 0:B.join(", ")},{default:o(()=>[l(P,{placeholder:"Perintah Tutup",modelValue:e(t).close_command,"onUpdate:modelValue":a[11]||(a[11]=p=>e(t).close_command=p)},null,8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Pos",error:(A=e(r).pos_id)==null?void 0:A.join(", ")},{default:o(()=>[l(U,{modelValue:e(t).pos_id,"onUpdate:modelValue":a[12]||(a[12]=p=>e(t).pos_id=p),placeholder:"Pos",style:{width:"100%"}},{default:o(()=>[(g(!0),L(X,null,se(e(Q),p=>(g(),H(z,{value:p.id,label:p.nama,key:p.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Kamera",error:(Me=e(r).kamera)==null?void 0:Me.join(", ")},{default:o(()=>[l(U,{modelValue:e(t).kamera,"onUpdate:modelValue":a[13]||(a[13]=p=>e(t).kamera=p),placeholder:"Kamera",style:{width:"100%"},multiple:""},{default:o(()=>[(g(!0),L(X,null,se(e(q),p=>(g(),H(z,{value:p.id,label:p.nama,key:p.id},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["error"]),l(K,{label:"Status",error:(Fe=e(r).status)==null?void 0:Fe.join(", ")},{default:o(()=>[l(J,{"active-value":!0,"inactive-value":!1,modelValue:e(t).status,"onUpdate:modelValue":a[14]||(a[14]=p=>e(t).status=p),"active-color":"#13ce66"},null,8,["modelValue"]),l(Z,{type:e(t).status?"success":"info",size:"small",style:{"margin-left":"10px"}},{default:o(()=>[s(j(e(t).status?"Aktif":"Nonaktif"),1)]),_:1},8,["type"])]),_:1},8,["error"])]}),_:1})]),_:1},8,["modelValue"])],64)}}},Ko={__name:"device",setup(S){const c=ue(),_=[{label:"Kamera",component:Ql},{label:"Printer",component:oo},{label:"Pos",component:so},{label:"Gate Keluar",component:wo},{label:"Gate Masuk",component:bo}];return ie(async()=>{await c.getKameraList(),await c.getPrinterList()}),(r,t)=>{const i=rl,f=sl;return g(),H(f,null,{default:o(()=>[(g(),L(X,null,se(_,(C,h)=>l(i,{lazy:"",key:h,label:C.label.toUpperCase()},{default:o(()=>[(g(),H(El(C.component)))]),_:2},1032,["label"])),64))]),_:1})}}};export{Ko as default};
