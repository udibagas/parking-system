(window.webpackJsonp=window.webpackJsonp||[]).push([[7,16],{475:function(t,e,r){"use strict";var n=r(19),o=r(10),l=r(99),c=r(22),f=r(14),m=r(68),d=r(196),h=r(98),v=r(295),_=r(8),y=r(69),w=r(81).f,N=r(38).f,O=r(20).f,P=r(476).trim,I="Number",E=o.Number,D=E.prototype,j=m(y(D))==I,S=function(t){if(h(t))throw TypeError("Cannot convert a Symbol value to a number");var e,r,n,o,l,c,f,code,m=v(t,"number");if("string"==typeof m&&m.length>2)if(43===(e=(m=P(m)).charCodeAt(0))||45===e){if(88===(r=m.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(m.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+m}for(c=(l=m.slice(2)).length,f=0;f<c;f++)if((code=l.charCodeAt(f))<48||code>o)return NaN;return parseInt(l,n)}return+m};if(l(I,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var k,A=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof A&&(j?_((function(){D.valueOf.call(r)})):m(r)!=I)?d(new E(S(e)),r,A):S(e)},$=n?w(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),R=0;$.length>R;R++)f(E,k=$[R])&&!f(A,k)&&O(A,k,N(E,k));A.prototype=D,D.constructor=A,c(o,I,A)}},476:function(t,e,r){var n=r(34),o=r(18),l="["+r(477)+"]",c=RegExp("^"+l+l+"*"),f=RegExp(l+l+"*$"),m=function(t){return function(e){var r=o(n(e));return 1&t&&(r=r.replace(c,"")),2&t&&(r=r.replace(f,"")),r}};t.exports={start:m(1),end:m(2),trim:m(3)}},477:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},487:function(t,e,r){"use strict";r.r(e);r(33),r(25),r(32),r(44),r(24),r(45);var n=r(17),o=r(59);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={props:["show"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)(["printerList"])),data:function(){return{printer_id:null}},mounted:function(){this.$store.dispatch("getPrinterList")}},f=r(37),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{center:"",title:"PILIH PRINTER",visible:t.show,width:"500px","before-close":function(e){t.$emit("close")}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",[r("el-form-item",[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Pilih Printer"},model:{value:t.printer_id,callback:function(e){t.printer_id=e},expression:"printer_id"}},t._l(t.printerList,(function(p){return r("el-option",{key:p.id,attrs:{value:p.id,label:p.nama}})})),1)],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){return t.$emit("close")}}},[t._v("\n\t\t\tBATAL\n\t\t")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-printer",type:"primary",disabled:!t.printer_id},on:{click:function(e){return t.$emit("print",t.printer_id)}}},[t._v("\n\t\t\tCETAK STRUK\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},612:function(t,e,r){"use strict";r.r(e);r(13),r(24),r(475);var n={data:function(){return{date:this.$moment().format("YYYY-MM-DD"),report:[],loading:!1,showPrintDialog:!1}},methods:{requestData:function(){var t=this,e={date:this.date};this.loading=!0,this.$axios.$get("/api/memberRenewal/reportDaily",{params:e}).then((function(e){return t.report=e})).finally((function(){return t.loading=!1}))},printReport:function(t){var e=this,r={date:this.date,action:"print",printer_id:t};this.loading=!0,this.$axios.$get("/api/memberRenewal/reportDaily",{params:r}).then((function(t){e.$message({message:"Silakan ambil slip",type:"success",showClose:!1})})).finally((function(){e.loading=!1,e.showPrintDialog=!1}))},getSummaries:function(param){var t=this,e=param.columns,r=(param.data,[]);return e.forEach((function(e,n){if(0!==n)if(1!==n&&2!==n&&3!==n){if(4===n){var o=t.report.reduce((function(t,e){return t+Number(e.jumlah)}),0);r[n]="Rp "+t.$decimal(o)}}else r[n]="";else r[n]="TOTAL"})),r}},mounted:function(){this.requestData()}},o=r(37),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-form",{staticStyle:{"text-align":"right"},attrs:{inline:""}},[r("el-form-item",[r("el-date-picker",{attrs:{size:"small",format:"dd/MMM/yyyy","value-format":"yyyy-MM-dd",type:"date"},on:{change:t.requestData},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-printer"},on:{click:function(e){t.showPrintDialog=!0}}},[t._v("PRINT LAPORAN")])],1)],1),t._v(" "),r("el-table",{attrs:{"show-summary":"",stripe:"",data:t.report,"summary-method":t.getSummaries}},[r("el-table-column",{attrs:{label:"Tanggal","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MMM-YYYY HH:mm"))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"member.nama",label:"Nama"}}),t._v(" "),r("el-table-column",{attrs:{prop:"member.nomor_kartu",label:"Nomor Kartu","header-align":"center",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{label:"Plat Nomor","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.member.vehicles.map((function(t){return t.plate_number})).join(", "))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Jumlah","header-align":"right",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.jumlah))+"\n\t\t\t")]}}])})],1),t._v(" "),r("PrintDialog",{attrs:{show:t.showPrintDialog},on:{print:function(e){return t.printReport(e)},close:function(e){t.showPrintDialog=!1}}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PrintDialog:r(487).default})}}]);