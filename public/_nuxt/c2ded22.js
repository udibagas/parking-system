(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{578:function(t,e,n){"use strict";n.r(e);var l={mixins:[n(451).a],props:["range"],watch:{range:function(t){this.requestData()}},data:function(){return{url:"/api/manualOpenLog",showSnapshot:!1,snapshots:[]}}},o=n(37),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",[n("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,n,l){t.snapshots=e.snapshots,t.showSnapshot=!0},"sort-change":t.sortChange}},[n("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),n("el-table-column",{attrs:{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"gate_out.nama",label:"Gate Out","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),n("el-table-column",{attrs:{prop:"user.name",label:"Operator","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),n("el-table-column",{attrs:{prop:"alasan",label:"Alasan",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-dropdown",[n("span",{staticClass:"el-dropdown-link"},[n("i",{staticClass:"el-icon-more"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{icon:"el-icon-camera"},nativeOn:{click:function(n){return n.preventDefault(),function(){t.snapshots=e.row.snapshots,t.showSnapshot=!0}.apply(null,arguments)}}},[t._v("Lihat Snapshot")])],1)],1)]}}])},[n("template",{slot:"header"},[n("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),n("br"),t._v(" "),n("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),n("el-dialog",{attrs:{center:"",visible:t.showSnapshot,title:"SNAPSHOT"},on:{"update:visible":function(e){t.showSnapshot=e}}},t._l(t.snapshots,(function(t,i){return n("el-image",{key:i,staticStyle:{width:"100%",height:"100%"},attrs:{src:t.url,fit:"cover"}},[n("div",{staticClass:"el-image__error",attrs:{slot:"error"},slot:"error"},[n("i",{staticClass:"el-icon-picture-outline"})])])})),1)],1)}),[],!1,null,null,null);e.default=component.exports},608:function(t,e,n){"use strict";n.r(e);var l={},o=n(37),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",[n("el-tabs",[n("el-tab-pane",{attrs:{label:"TRANSAKSI PARKIR"}},[n("TransactionParkingTransaction")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"BUKA MANUAL"}},[n("TransactionManualOpenLog")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TransactionParkingTransaction:n(595).default,TransactionManualOpenLog:n(578).default})}}]);