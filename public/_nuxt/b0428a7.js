(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{386:function(t,e,r){"use strict";var n=r(11),o=r(6),c=r(119),l=r(16),d=r(12),v=r(51),h=r(251),m=r(85),_=r(250),f=r(5),y=r(70),x=r(87).f,R=r(39).f,k=r(15).f,I=r(387).trim,C="Number",w=o.Number,O=w.prototype,N=v(y(O))==C,A=function(t){if(m(t))throw TypeError("Cannot convert a Symbol value to a number");var e,r,n,o,c,l,d,code,v=_(t,"number");if("string"==typeof v&&v.length>2)if(43===(e=(v=I(v)).charCodeAt(0))||45===e){if(88===(r=v.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(v.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+v}for(l=(c=v.slice(2)).length,d=0;d<l;d++)if((code=c.charCodeAt(d))<48||code>o)return NaN;return parseInt(c,n)}return+v};if(c(C,!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var T,P=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof P&&(N?f((function(){O.valueOf.call(r)})):v(r)!=C)?h(new w(A(e)),r,P):A(e)},$=n?x(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),E=0;$.length>E;E++)d(w,T=$[E])&&!d(P,T)&&k(P,T,R(w,T));P.prototype=O,O.constructor=P,l(o,C,P)}},387:function(t,e,r){var n=r(20),o=r(9),c="["+r(388)+"]",l=RegExp("^"+c+c+"*"),d=RegExp(c+c+"*$"),v=function(t){return function(e){var r=o(n(e));return 1&t&&(r=r.replace(l,"")),2&t&&(r=r.replace(d,"")),r}};t.exports={start:v(1),end:v(2),trim:v(3)}},388:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},424:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(42),r(23),r(43);var n=r(2),o=r(13),c=(r(45),r(8),r(32),r(40),r(252),r(69),r(52),r(386),r(44));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={data:function(){return{transaction:[],income:[],parkedVehicle:[],vehicleIn:[],dateRange:[this.$moment().format("YYYY-MM-01"),this.$moment().format("YYYY-MM-DD")],report:null,summary:{}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["areaParkirList"])),methods:{printReport:function(){var t=new URLSearchParams;t.append("action","print"),t.append("dateRange[]",this.dateRange[0]),t.append("dateRange[]",this.dateRange[1]),window.open("".concat(this.$axios.defaults.baseURL,"/api/report?").concat(t),"_blank")},getTransaction:function(){var t=this;this.$axios.$get("/api/getTransaction",{params:{dateRange:this.dateRange}}).then((function(e){t.transaction=e;var r=e.map((function(t){return t.total})).reduce((function(t,e){return t+parseInt(e)}),0);t.transaction.push({jenis_kendaraan:"TOTAL",total:r})}))},getIncome:function(){var t=this;this.$axios.$get("/api/getIncome",{params:{dateRange:this.dateRange}}).then((function(e){t.income=e;var r=e.map((function(t){return Number(t.total)})).reduce((function(t,e){return t+Number(e)}),0),n=e.map((function(t){return Number(t.denda)})).reduce((function(t,e){return t+Number(e)}),0);t.income.push({jenis_kendaraan:"TOTAL",total:r,denda:n})}))},getParkedVehicle:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/api/getParkedVehicle",{params:{dateRange:t.dateRange}});case 2:data=e.sent,t.parkedVehicle=data;case 4:case"end":return e.stop()}}),e)})))()},getVehicleIn:function(){var t=this;this.$axios.$get("/api/getVehicleIn",{params:{dateRange:this.dateRange}}).then((function(e){t.vehicleIn=e;var r=e.map((function(t){return t.total})).reduce((function(t,e){return t+parseInt(e)}),0);t.vehicleIn.push({gate:"TOTAL",total:r})}))},getReport:function(){var t=this;this.$axios.$get("/api/report",{params:{dateRange:this.dateRange}}).then((function(e){return t.report=e}))},getSummary:function(){var t=this;this.$axios.$get("/api/summary").then((function(e){return t.summary=e}))},requestData:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getAreaParkirList");case 2:t.getSummary(),t.getTransaction(),t.getIncome(),t.getParkedVehicle(),t.getVehicleIn(),t.getReport();case 8:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.requestData()}},v=r(22),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",{staticClass:"mb-3",attrs:{gutter:20}},[r("el-col",{attrs:{span:8}},[r("el-card",[t._v("\n\t\t\t\tHari Ini\n\t\t\t\t"),r("div",{staticClass:"text-5xl text-purple-700"},[t._v("\n\t\t\t\t\tRp. "+t._s(t.$decimal(t.summary.today))+"\n\t\t\t\t")])])],1),t._v(" "),r("el-col",{attrs:{span:8}},[r("el-card",[t._v("\n\t\t\t\tBulan Ini\n\t\t\t\t"),r("div",{staticClass:"text-5xl text-blue-700"},[t._v("\n\t\t\t\t\tRp. "+t._s(t.$decimal(t.summary.this_month))+"\n\t\t\t\t")])])],1),t._v(" "),r("el-col",{attrs:{span:8}},[r("el-card",[t._v("\n\t\t\t\tTotal\n\t\t\t\t"),r("div",{staticClass:"text-5xl text-orange-700"},[t._v("\n\t\t\t\t\tRp. "+t._s(t.$decimal(t.summary.total))+"\n\t\t\t\t")])])],1)],1),t._v(" "),r("el-card",{staticClass:"mb-3",attrs:{"body-style":{padding:"0"}}},[r("table",{staticClass:"min-w-full"},[r("thead",[r("tr",[r("th",{staticClass:"border-b px-3 py-1"},[t._v("AREA PARKIR")]),t._v(" "),r("th",{staticClass:"border-b px-3 py-1"},[t._v("KAPASITAS")]),t._v(" "),r("th",{staticClass:"border-b px-3 py-1"},[t._v("TERISI")]),t._v(" "),r("th",{staticClass:"border-b px-3 py-1"},[t._v("TERSEDIA")])])]),t._v(" "),r("tbody",t._l(t.areaParkirList,(function(p){return r("tr",{key:p.id,class:{"bg-red-300":p.kapasitas==p.terisi,"bg-green-300":p.terisi<p.kapasitas}},[r("td",{staticClass:"border-b px-3 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(p.nama)+"\n\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"text-center border-b px-3 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(p.kapasitas)+"\n\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"text-center border-b px-3 py-1"},[t._v(t._s(p.terisi))]),t._v(" "),r("td",{staticClass:"text-center border-b px-3 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(p.kapasitas-p.terisi)+"\n\t\t\t\t\t")])])})),0)])]),t._v(" "),r("el-row",{staticClass:"mb-3 border rounded-md p-3 bg-gray-200"},[r("el-col",{attrs:{span:8}},[r("div",{staticClass:"text-blue-700 text-2xl ml-3"},[t._v("LAPORAN")])]),t._v(" "),r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:16}},[r("el-date-picker",{staticClass:"mr-3",attrs:{format:"dd/MMM/yyyy","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"To","start-placeholder":"Start date","end-placeholder":"End date"},on:{change:t.requestData},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}}),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-printer"},on:{click:t.printReport}},[t._v("\n\t\t\t\tPRINT LAPORAN\n\t\t\t")])],1)],1),t._v(" "),r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{span:10}},[r("el-card",{staticClass:"bg-purple-600 text-white mb-3",attrs:{"body-style":{padding:"0"}}},[r("div",{attrs:{slot:"header"},slot:"header"},[t._v("Kendaraan Masuk")]),t._v(" "),r("table",{staticClass:"table min-w-full"},[r("tbody",t._l(t.vehicleIn,(function(e,n){return r("tr",{key:n},[r("td",{staticClass:"border-b px-3 py-1"},[t._v(t._s(e.gate))]),t._v(" "),r("td",{staticClass:"border-b px-3 py-1 text-right"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.$decimal(e.total))+"\n\t\t\t\t\t\t\t")])])})),0)])]),t._v(" "),r("el-card",{staticClass:"bg-blue-600 text-white mb-3",attrs:{"body-style":{padding:"0"}}},[r("div",{attrs:{slot:"header"},slot:"header"},[t._v("Transaksi")]),t._v(" "),r("table",{staticClass:"table min-w-full"},[r("tbody",t._l(t.transaction,(function(e,n){return r("tr",{key:n},[r("td",{staticClass:"border-b px-3 py-1"},[t._v(t._s(e.jenis_kendaraan))]),t._v(" "),r("td",{staticClass:"border-b px-3 py-1 text-right"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.$decimal(e.total))+"\n\t\t\t\t\t\t\t")])])})),0)])]),t._v(" "),r("el-card",{staticClass:"bg-green-600 text-white mb-3",attrs:{"body-style":{padding:"0"}}},[r("div",{attrs:{slot:"header"},slot:"header"},[t._v("Pendapatan")]),t._v(" "),r("table",{staticClass:"table min-w-full"},[r("tbody",t._l(t.income,(function(e,n){return r("tr",{key:n},[r("td",{staticClass:"border-b px-3 py-1"},[t._v(t._s(e.jenis_kendaraan))]),t._v(" "),r("td",{staticClass:"border-b px-3 py-1 text-right"},[t._v("\n\t\t\t\t\t\t\t\tRp. "+t._s(t.$decimal(Number(e.total)+Number(e.denda)))+"\n\t\t\t\t\t\t\t")])])})),0)])]),t._v(" "),t.parkedVehicle.length>0?r("el-card",{staticClass:"bg-orange-600 text-white mb-3",attrs:{"body-style":{padding:"0"}}},[r("div",{attrs:{slot:"header"},slot:"header"},[t._v("Kendaraan Masih Terparkir")]),t._v(" "),r("table",{staticClass:"table min-w-full"},[r("thead",[r("tr",t._l(Object.keys(t.parkedVehicle[0]),(function(header,e){return r("th",{key:e,staticClass:"border-b px-3 py-1"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(header)+"\n\t\t\t\t\t\t\t")])})),0)]),t._v(" "),r("tbody",t._l(t.parkedVehicle,(function(e,n){return r("tr",{key:n},t._l(Object.keys(t.parkedVehicle[n]),(function(header,n){return r("td",{key:n,staticClass:"border-b px-3 py-1 text-center"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(e[header])+"\n\t\t\t\t\t\t\t")])})),0)})),0)])]):t._e()],1),t._v(" "),r("el-col",{attrs:{span:14}},[r("el-card",[r("div",{domProps:{innerHTML:t._s(t.report)}})])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);