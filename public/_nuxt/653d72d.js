(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{665:function(t,e,n){"use strict";n.r(e);var l={mixins:[n(537).a],props:["range"],watch:{range:function(t){this.requestData()}},data:function(){return{url:"/api/manualOpenLog",showSnapshot:!1,snapshots:[]}}},o=n(46),component=Object(o.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[e("el-form-item",[e("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),e("el-form-item",[e("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,n,l){t.snapshots=e.snapshots,t.showSnapshot=!0},"sort-change":t.sortChange}},[e("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),e("el-table-column",{attrs:{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"gate_out.nama",label:"Gate Out","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"user.name",label:"Operator","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"alasan",label:"Alasan",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-dropdown",[e("span",{staticClass:"el-dropdown-link"},[e("i",{staticClass:"el-icon-more"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-camera"},nativeOn:{click:function(e){return e.preventDefault(),function(){t.snapshots=n.row.snapshots,t.showSnapshot=!0}.apply(null,arguments)}}},[t._v("Lihat Snapshot")])],1)],1)]}}])},[e("template",{slot:"header"},[e("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),e("br"),t._v(" "),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),e("el-dialog",{attrs:{center:"",visible:t.showSnapshot,title:"SNAPSHOT"},on:{"update:visible":function(e){t.showSnapshot=e}}},t._l(t.snapshots,(function(t,i){return e("el-image",{key:i,staticStyle:{width:"100%",height:"100%"},attrs:{src:t.url,fit:"cover"}},[e("div",{staticClass:"el-image__error",attrs:{slot:"error"},slot:"error"},[e("i",{staticClass:"el-icon-picture-outline"})])])})),1)],1)}),[],!1,null,null,null);e.default=component.exports},697:function(t,e,n){"use strict";n.r(e);var l={},o=n(46),component=Object(o.a)(l,(function(){var t=this._self._c;return t("el-card",[t("el-tabs",[t("el-tab-pane",{attrs:{label:"TRANSAKSI PARKIR"}},[t("TransactionParkingTransaction")],1),this._v(" "),t("el-tab-pane",{attrs:{label:"BUKA MANUAL"}},[t("TransactionManualOpenLog")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TransactionParkingTransaction:n(684).default,TransactionManualOpenLog:n(665).default})}}]);