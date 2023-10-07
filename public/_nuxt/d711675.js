(window.webpackJsonp=window.webpackJsonp||[]).push([[6,16],{558:function(t,e,n){"use strict";n.r(e);n(39),n(31),n(38),n(14),n(51),n(30),n(52);var r=n(19),o=n(69);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var c={props:["show"],computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},Object(o.b)(["printerList"])),data:function(){return{printer_id:null}},mounted:function(){this.$store.dispatch("getPrinterList")}},d=c,f=n(46),component=Object(f.a)(d,(function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{center:"",title:"PILIH PRINTER",visible:t.show,width:"500px","before-close":function(e){t.$emit("close")}},on:{"update:visible":function(e){t.show=e}}},[e("el-form",[e("el-form-item",[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Pilih Printer"},model:{value:t.printer_id,callback:function(e){t.printer_id=e},expression:"printer_id"}},t._l(t.printerList,(function(p){return e("el-option",{key:p.id,attrs:{value:p.id,label:p.nama}})})),1)],1)],1),t._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){return t.$emit("close")}}},[t._v("\n\t\t\tBATAL\n\t\t")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-printer",type:"primary",disabled:!t.printer_id},on:{click:function(e){return t.$emit("print",t.printer_id)}}},[t._v("\n\t\t\tCETAK STRUK\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},706:function(t,e,n){"use strict";n.r(e);n(14),n(30),n(339);var r={data:function(){return{dateRange:[this.$moment().format("YYYY-MM-01"),this.$moment().format("YYYY-MM-DD")],report:[],loading:!1,showPrintDialog:!1}},methods:{requestData:function(){var t=this,e={dateRange:this.dateRange};this.loading=!0,this.$axios.$get("/api/memberRenewal/report",{params:e}).then((function(e){return t.report=e})).finally((function(){return t.loading=!1}))},printReport:function(t){var e=this,n={dateRange:this.dateRange,action:"print",printer_id:t};this.loading=!0,this.$axios.$get("/api/memberRenewal/report",{params:n}).then((function(t){e.$message({message:"Silakan ambil slip",type:"success",showClose:!1})})).finally((function(){e.loading=!1,e.showPrintDialog=!1}))},getSummaries:function(param){var t=this,e=param.columns,n=(param.data,[]);return e.forEach((function(e,r){if(0!==r){if(1===r&&(n[r]=t.report.reduce((function(t,e){return t+Number(e.jumlah)}),0)),2===r){var o=t.report.reduce((function(t,e){return t+Number(e.pendapatan)}),0);n[r]="Rp "+t.$decimal(o)}}else n[r]="TOTAL"})),n}},mounted:function(){this.requestData()}},o=n(46),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[e("el-form",{staticStyle:{"text-align":"right"},attrs:{inline:""}},[e("el-form-item",[e("el-date-picker",{staticStyle:{"margin-top":"5px",width:"250px"},attrs:{size:"small",format:"dd/MMM/yyyy","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"Dari tanggal","end-placeholder":"Sampai tanggal"},on:{change:t.requestData},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-printer"},on:{click:function(e){t.showPrintDialog=!0}}},[t._v("PRINT LAPORAN")])],1)],1),t._v(" "),e("el-table",{attrs:{"show-summary":"",stripe:"",data:t.report,"summary-method":t.getSummaries}},[e("el-table-column",{attrs:{label:"Tanggal","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.tanggal).format("DD/MMM/YYYY"))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Jumlah","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$decimal(e.row.jumlah))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Pendapatan","header-align":"right",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.pendapatan))+"\n\t\t\t")]}}])})],1),t._v(" "),e("PrintDialog",{attrs:{show:t.showPrintDialog},on:{print:function(e){return t.printReport(e)},close:function(e){t.showPrintDialog=!1}}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PrintDialog:n(558).default})}}]);