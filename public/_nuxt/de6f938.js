(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{381:function(e,t,r){"use strict";var o=r(3),n=r(84),l=r(22),c=r(15),f=r(8),d=r(4),m=r(382),h=r(174),v=r(383),w=r(384),_=r(83),y=r(385),D=[],k=D.sort,M=d((function(){D.sort(void 0)})),O=d((function(){D.sort(null)})),x=h("sort"),S=!d((function(){if(_)return _<70;if(!(v&&v>3)){if(w)return!0;if(y)return y<603;var code,e,t,r,o="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(r=0;r<47;r++)D.push({k:e+r,v:t})}for(D.sort((function(a,b){return b.v-a.v})),r=0;r<D.length;r++)e=D[r].k.charAt(0),o.charAt(o.length-1)!==e&&(o+=e);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:M||!O||!x||!S},{sort:function(e){void 0!==e&&n(e);var t=l(this);if(S)return void 0===e?k.call(t):k.call(t,e);var r,o,d=[],h=c(t.length);for(o=0;o<h;o++)o in t&&d.push(t[o]);for(r=(d=m(d,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:f(t)>f(r)?1:-1}}(e))).length,o=0;o<r;)t[o]=d[o++];for(;o<h;)delete t[o++];return t}})},382:function(e,t){var r=Math.floor,o=function(e,t){var c=e.length,f=r(c/2);return c<8?n(e,t):l(o(e.slice(0,f),t),o(e.slice(f),t),t)},n=function(e,t){for(var element,r,o=e.length,i=1;i<o;){for(r=i,element=e[i];r&&t(e[r-1],element)>0;)e[r]=e[--r];r!==i++&&(e[r]=element)}return e},l=function(e,t,r){for(var o=e.length,n=t.length,l=0,c=0,f=[];l<o||c<n;)l<o&&c<n?f.push(r(e[l],t[c])<=0?e[l++]:t[c++]):f.push(l<o?e[l++]:t[c++]);return f};e.exports=o},383:function(e,t,r){var o=r(82).match(/firefox\/(\d+)/i);e.exports=!!o&&+o[1]},384:function(e,t,r){var o=r(82);e.exports=/MSIE|Trident/.test(o)},385:function(e,t,r){var o=r(82).match(/AppleWebKit\/(\d+)\./);e.exports=!!o&&+o[1]},391:function(t,r,o){"use strict";o(38),o(28),o(37),o(48),o(27),o(49);var n=o(14);o(381),o(10),o(70);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}r.a={data:function(){return{showForm:!1,formErrors:{},error:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort:"name",order:"ascending",filters:{},loading:!1}},methods:{sortChange:function(e){e.prop==this.sort&&e.order==this.order||(this.sort=e.prop,this.order=e.order,this.requestData())},currentChange:function(e){this.page=e,this.requestData()},sizeChange:function(e){this.pageSize=e,this.requestData()},filterChange:function(filter){this.filters=c(c({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.error={},this.formErrors={},this.formModel=Object.assign({},data),this.showForm=!0},save:function(){var e=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(t){e.showForm=!1,e.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),e.requestData(),e.afterSave()})).catch((function(t){422==t.response.status&&(e.error={},e.formErrors=t.response.data.errors),500==t.response.status&&(e.formErrors={},e.error=t.response.data)})).finally((function(){e.loading=!1}))},afterSave:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(e){r.requestData(),r.$message({message:e.message,type:"success",showClose:!0})})).catch((function(e){r.$message({message:e.response.data.message,type:"error",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(e){this.page=1,this.keyword=e,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.requestData()},requestData:function(){var e=this,t=c({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort:this.sort,order:this.order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:t}).then((function(t){e.loading=!1,e.tableData=t})).catch((function(t){e.$message({message:t.response.data.message,type:"error",showClose:!0})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},429:function(e,t,r){"use strict";r.r(t);var o={mixins:[r(391).a],data:function(){return{url:"/shift"}}},n=r(36),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){return t.preventDefault(),e.requestData.apply(null,arguments)}}},[r("el-form-item",[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(t){return e.openForm({})}}},[e._v("TAMBAH SHIFT")])],1)],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,stripe:"",height:"calc(100vh - 220px)"}},[r("el-table-column",{attrs:{type:"index",label:"#"}}),e._v(" "),r("el-table-column",{attrs:{prop:"nama",label:"Nama"}}),e._v(" "),r("el-table-column",{attrs:{prop:"mulai",label:"Mulai"}}),e._v(" "),r("el-table-column",{attrs:{prop:"selesai",label:"Selesai"}}),e._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"40px","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{nativeOn:{click:function(r){return r.preventDefault(),e.openForm(t.row)}}},[r("i",{staticClass:"el-icon-edit-outline"}),e._v(" Edit")]),e._v(" "),r("el-dropdown-item",{nativeOn:{click:function(r){return r.preventDefault(),e.deleteData(t.row.id)}}},[r("i",{staticClass:"el-icon-delete"}),e._v(" Hapus")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:e.refreshData}})],1)],2)],1),e._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{visible:e.showForm,title:e.formModel.id?"EDIT SHIFT":"TAMBAH SHIFT",width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.showForm=t}}},[r("el-form",{attrs:{"label-width":"100px","label-position":"left"}},[r("el-form-item",{class:e.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.nama,callback:function(t){e.$set(e.formModel,"nama",t)},expression:"formModel.nama"}}),e._v(" "),e.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t\t"+e._s(e.formErrors.nama[0])+"\n\t\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{class:{"is-error":e.formErrors.mulai},attrs:{label:"Mulai"}},[r("el-time-select",{staticStyle:{width:"100%"},attrs:{"picker-options":{start:"00:00",step:"00:30",end:"24:00"},placeholder:"Mulai"},model:{value:e.formModel.mulai,callback:function(t){e.$set(e.formModel,"mulai",t)},expression:"formModel.mulai"}}),e._v(" "),e.formErrors.mulai?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t\t"+e._s(e.formErrors.mulai[0])+"\n\t\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{class:{"is-error":e.formErrors.selesai},attrs:{label:"Selesai"}},[r("el-time-select",{staticStyle:{width:"100%"},attrs:{"picker-options":{start:"00:00",step:"00:30",end:"24:00"},placeholder:"Selesai"},model:{value:e.formModel.selesai,callback:function(t){e.$set(e.formModel,"selesai",t)},expression:"formModel.selesai"}}),e._v(" "),e.formErrors.selesai?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t\t"+e._s(e.formErrors.selesai[0])+"\n\t\t\t\t")]):e._e()],1)],1),e._v(" "),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:e.closeForm}},[e._v("BATAL")]),e._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:e.save}},[e._v("SIMPAN")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);