import"./Cvzv-CJH.js";import{a as M,E as L}from"./Cwri-PQ-.js";import{t as D}from"./D2wCBoOa.js";import{u as O}from"./CSy3DFL1.js";import{e as P}from"./BPhDp4Hz.js";import{r as o}from"./BvWa8xvQ.js";const W=v=>{const f=O(),d=o(!1),p=o({}),r=o({}),h=o(""),c=o(1),y=o(10),g=o({}),m=o(null),u=o(null),n=o({}),i=o(!1),x=({prop:a,order:s})=>{(a!=m.value||s!=u.value)&&(s=="ascending"?u.value="asc":s=="descending"?u.value="desc":u.value="asc",m.value=a,l())},E=a=>{c.value=a,l()},C=a=>{y.value=a,l()},_=a=>{n.value={...n.value,...a},c.value=1,l()},w=a=>{p.value={},r.value={...a},d.value=!0},$=a=>{const s=M.service({target:".el-dialog"});f(r.value.id?`${v}/${r.value.id}`:v,{method:r.value.id?"PUT":"POST",body:r.value}).then(t=>{d.value=!1,D({message:"Data berhasil disimpan.",type:"success",showClose:!0}),l(),typeof a=="function"&&a()}).catch(t=>{t.response.status==422?p.value=t.response._data.errors:p.value={}}).finally(()=>{s.close()})},k=(a,s)=>{L.confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then(()=>{f(`${v}/${a}`,{method:"DELETE"}).then(t=>{l(),typeof s=="function"&&s(),D({message:t.message,type:"success",showClose:!0})})}).catch(()=>console.log(e))},A=()=>{c.value=1,l()},F=()=>{c.value=1,h.value="",n.value={},l()},S=()=>{d.value=!1,r.value={},p.value={}},l=()=>{let a={page:c.value,keyword:h.value,pageSize:y.value,sort_prop:m.value,sort_order:u.value,paginated:!0,...n.value};for(let s in a)Array.isArray(a[s])&&(delete a[s],a[`${s}[0]`]=n.value[s][0],a[`${s}[1]`]=n.value[s][1]);i.value=!0,f(v,{params:a}).then(s=>{if(i.value=!1,g.value=s,s.meta){const{from:t,to:T,total:z}=s.meta;g.value={...g.value,from:t,to:T,total:z}}}).finally(()=>i.value=!1)};return{api:f,showForm:d,formErrors:p,formModel:r,keyword:h,page:c,pageSize:y,tableData:g,sort_prop:m,sort_order:u,filters:n,loading:i,sortChange:x,currentChange:E,sizeChange:C,filterChange:_,openForm:w,save:$,deleteData:k,searchData:A,refreshData:F,closeForm:S,requestData:l,exportData:a=>{const s={sort_prop:m.value,sort_order:u.value,...n.value,action:"export"};i.value=!0,f(v,{params:s}).then(t=>P({data:t,fileName:a,exportType:"xls"})).catch(t=>console.log(t)).finally(()=>i.value=!1)}}};export{W as u};
