(window.webpackJsonp=window.webpackJsonp||[]).push([[28,24,26],{387:function(t,r,o){"use strict";o(31),o(24),o(30),o(43),o(23),o(44);var n=o(13);o(8),o(69);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=c(c({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=c({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=c({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,o=r.from,n=r.to,l=r.total;t.tableData=c(c({},t.tableData),{},{from:o,to:n,total:l})}})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},388:function(t,e,r){"use strict";var o=r(4),n=r(82).find,l=r(177),c="find",m=!0;c in[]&&Array(1).find((function(){m=!1})),o({target:"Array",proto:!0,forced:m},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),l(c)},395:function(t,e,r){"use strict";r.r(e);var o={props:["trx","show"]},n=r(22),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{width:"80%",visible:t.show,center:"",title:"DETAIL TRANSAKSI","before-close":function(e){t.$emit("close")}},on:{"update:visible":function(e){t.show=e}}},[r("div",{staticClass:"flex flex-row"},[r("table",{staticClass:"table-auto",staticStyle:{width:"360px"}},[r("tbody",[r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1",staticStyle:{width:"150px"}},[t._v("\n\t\t\t\t\t\tNomor Barcode\n\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.nomor_barcode)+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("\n\t\t\t\t\t\tJenis Kendaraan\n\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.jenis_kendaraan)+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Plat Nomor")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.plat_nomor))])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Member")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.is_member?"Ya":"Tidak")+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Nomor Kartu")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.nomor_kartu)+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Gate Masuk")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.gate_in?t.trx.gate_in.nama:"")+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Gate Keluar")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.gate_out?t.trx.gate_out.nama:"")+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Waktu Masuk")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.$moment(t.trx.time_in).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("\n\t\t\t\t\t\tWaktu Keluar\n\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.time_out?t.$moment(t.trx.time_out).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Durasi")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.durasi))])]),t._v(" "),1==t.$auth.user.role?r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Tarif")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\tRp "+t._s(t.$decimal(t.trx.tarif))+"\n\t\t\t\t\t")])]):t._e(),t._v(" "),1==t.$auth.user.role?r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Denda")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\tRp "+t._s(t.$decimal(t.trx.denda))+"\n\t\t\t\t\t")])]):t._e(),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Operator")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.operator))])])])]),t._v(" "),t.trx.snapshots?r("div",{staticClass:"flex-grow ml-3"},t._l(t.trx.snapshots,(function(t){return r("img",{key:t.id,staticClass:"mb-1",staticStyle:{width:"500px"},attrs:{src:t.url}})})),0):t._e()])])}),[],!1,null,null,null);e.default=component.exports},396:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(43),r(23),r(44);var o=r(13),n=(r(8),r(388),r(178),r(45));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={props:["show","model"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({formModel:function(){return this.model},durasi:function(){var t=this.$moment(this.formModel.time_in),e=this.$moment(this.formModel.time_out),r=this.$moment.duration(e.diff(t));return this.$moment.utc(r.asMilliseconds()).format("HH:mm:ss")}},Object(n.b)(["posList","gateOutList","gateInList","jenisKendaraanList"])),data:function(){return{formErrors:{},loading:!1}},methods:{closeForm:function(){this.formErrors={},this.$emit("close")},save:function(){var t=this;this.loading=!0,this.formModel.manual=1,this.$axios.$post("/api/parkingTransaction",this.formModel).then((function(e){t.$message({message:"Data berhasil disimpan",type:"success",showClose:!0}),t.closeForm(),t.$emit("reload"),t.openGate(t.formModel.gate_out_id)})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors)})).finally((function(){return t.loading=!1}))},openGate:function(t){var e=this,r=this.posList.find((function(p){return p.id==e.formModel.pos_id})),o=this.gateOutList.find((function(g){return g.id==t})),n=new WebSocket("ws://".concat(r.ip_address,":5678/"));n.onerror=function(t){e.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},n.onopen=function(t){n.send(["open",o.device,o.baudrate,o.open_command,o.close_command].join(";"))},n.onmessage=function(t){var data=JSON.parse(t.data);e.$message({message:data.message,type:data.status?"success":"error"}),n.close()}}}},m=r(22),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.formModel.id?"EDIT TRANSAKSI "+t.formModel.nomor_barcode:"TRANSAKSI MANUAL",visible:t.show,width:"800px","before-close":function(e){return t.closeForm()}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-row",{attrs:{gutter:30}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{class:t.formErrors.plat_nomor?"is-error":"",attrs:{label:"Plat Nomor"}},[r("el-input",{attrs:{placeholder:"Plat Nomor"},model:{value:t.formModel.plat_nomor,callback:function(e){t.$set(t.formModel,"plat_nomor",e)},expression:"formModel.plat_nomor"}}),t._v(" "),t.formErrors.plat_nomor?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.plat_nomor[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_in_id?"is-error":"",attrs:{label:"Gate Masuk"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Masuk"},model:{value:t.formModel.gate_in_id,callback:function(e){t.$set(t.formModel,"gate_in_id",e)},expression:"formModel.gate_in_id"}},t._l(t.gateInList,(function(g,i){return r("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_in_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_in_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.time_in?"is-error":"",attrs:{label:"Waktu Masuk"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Masuk"},model:{value:t.formModel.time_in,callback:function(e){t.$set(t.formModel,"time_in",e)},expression:"formModel.time_in"}}),t._v(" "),t.formErrors.time_in?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_in[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.tarif?"is-error":"",attrs:{label:"Tarif (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Tarif"},model:{value:t.formModel.tarif,callback:function(e){t.$set(t.formModel,"tarif",e)},expression:"formModel.tarif"}}),t._v(" "),t.formErrors.tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.tarif[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.username?"is-error":"",attrs:{label:"User Admin"}},[r("el-input",{attrs:{placeholder:"User Admin"},model:{value:t.formModel.username,callback:function(e){t.$set(t.formModel,"username",e)},expression:"formModel.username"}}),t._v(" "),t.formErrors.username?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.username[0])+"\n\t\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{class:t.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Jenis Kendaraan"},model:{value:t.formModel.jenis_kendaraan,callback:function(e){t.$set(t.formModel,"jenis_kendaraan",e)},expression:"formModel.jenis_kendaraan"}},t._l(t.jenisKendaraanList,(function(t,i){return r("el-option",{key:i,attrs:{value:t.nama,label:t.nama}})})),1),t._v(" "),t.formErrors.jenis_kendaraan?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.jenis_kendaraan[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_out_id?"is-error":"",attrs:{label:"Gate Keluar"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(g,i){return r("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_out_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.time_out?"is-error":"",attrs:{label:"Waktu Keluar"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",autocomplete:!1,format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Keluar"},model:{value:t.formModel.time_out,callback:function(e){t.$set(t.formModel,"time_out",e)},expression:"formModel.time_out"}}),t._v(" "),t.formErrors.time_out?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_out[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.denda?"is-error":"",attrs:{label:"Denda (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Denda"},model:{value:t.formModel.denda,callback:function(e){t.$set(t.formModel,"denda",e)},expression:"formModel.denda"}}),t._v(" "),t.formErrors.denda?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.denda[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password Admin"}},[r("el-input",{attrs:{type:"password",placeholder:"Password Admin"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t\t\t")]):t._e()],1)],1)],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},442:function(t,r,o){"use strict";o.r(r);o(31),o(24),o(30),o(43),o(23),o(44);var n=o(13),l=o(45);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={mixins:[o(387).a],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)(["jenisKendaraanList","gateInList","gateOutList","user","shiftList"])),created:function(){this.$store.dispatch("getShiftList")},data:function(){return{url:"/api/parkingTransaction",trx:null,showTrxDetail:!1,date:this.$moment().format("YYYY-MM-DD"),formModel:{},formErrors:{},showForm:!1,filters:{dateRange:null}}},methods:{setSudahKeluar:function(t){var r=this;this.$confirm("Anda yakin?","Confirm",{type:"warning"}).then((function(){r.$axios.$put("/api/parkingTransaction/setSudahKeluar/".concat(t)).then((function(t){r.$message({message:t.message,type:"success"}),r.requestData()}))})).catch((function(){return console.log(e)}))},setSudahKeluarSemua:function(){var t=this;this.$confirm("Anda yakin?","Confirm",{type:"warning"}).then((function(){t.$axios.$put("/api/parkingTransaction/setSudahKeluarSemua",{dateRange:t.filters.dateRange}).then((function(e){t.$message({message:e.message,type:"success"}),t.requestData()}))})).catch((function(t){return console.log(t)}))},printTicket:function(t){var e=this;this.$axios.post("/api/parkingTransaction/printTicketOut/".concat(t)).then((function(t){e.$message({message:t.message,type:"success"})}))}}},d=o(22),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(){t.formModel={},t.formErrors={},t.showForm=!0}}},[t._v("TRANSAKSI MANUAL")])],1),t._v(" "),r("el-form-item",[r("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),1==t.$auth.user.role?r("el-form-item",[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Set kendaraan sudah keluar untuk waktu terpilih",placement:"bottom"}},[r("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-finished"},on:{click:t.setSudahKeluarSemua}})],1)],1):t._e(),t._v(" "),r("el-form-item",[r("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,r,o){t.trx=e,t.showTrxDetail=!0},"filter-change":t.filterChange,"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nomor_barcode",label:"No. Tiket",sortable:"custom","show-overflow-tooltip":"","min-width":"110px"}}),t._v(" "),r("el-table-column",{attrs:{label:"Shift",prop:"shift.nama","column-key":"shift_id","min-width":"80px",filters:t.shiftList.map((function(s){return{value:s.id,text:s.nama}}))}}),t._v(" "),r("el-table-column",{attrs:{prop:"jenis_kendaraan",label:"Jenis Kendaraan",sortable:"custom","show-overflow-tooltip":"",filters:t.jenisKendaraanList.map((function(t){return{value:t.nama,text:t.nama}})),"column-key":"jenis_kendaraan","min-width":"170px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"time_in",label:"Waktu Masuk",sortable:"custom","show-overflow-tooltip":"","min-width":"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.time_in).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"time_out",label:"Waktu Keluar",sortable:"custom","show-overflow-tooltip":"","min-width":"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.time_out?t.$moment(e.row.time_out).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"durasi",label:"Durasi","show-overflow-tooltip":"","min-width":"100px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"gate_in.nama",label:"Gate Masuk","show-overflow-tooltip":"","min-width":"150px","column-key":"gate_in_id",filters:t.gateInList.map((function(g){return{value:g.id,text:g.nama}}))}}),t._v(" "),r("el-table-column",{attrs:{prop:"gate_out.nama",label:"Gate Keluar","show-overflow-tooltip":"","min-width":"150px","column-key":"gate_out_id",filters:t.gateOutList.map((function(g){return{value:g.id,text:g.nama}}))}}),t._v(" "),1==t.$auth.user.role?r("el-table-column",{attrs:{prop:"parking_transactions.tarif",label:"Tarif",sortable:"custom",align:"right","header-align":"right","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.tarif))+"\n\t\t\t")]}}],null,!1,2716589247)}):t._e(),t._v(" "),1==t.$auth.user.role?r("el-table-column",{attrs:{prop:"denda",label:"Denda",sortable:"custom",align:"right","column-key":"denda",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"header-align":"right","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.denda))+"\n\t\t\t")]}}],null,!1,3743035677)}):t._e(),t._v(" "),r("el-table-column",{attrs:{prop:"plat_nomor",label:"Plat Nomor",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"member.nama",label:"Nama Member",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nomor_kartu",label:"Nomor Kartu",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"operator",label:"Operator",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{label:"Edit",sortable:"custom",align:"center","header-align":"center","column-key":"edit",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.edit?"YA":"TIDAK")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Manual",sortable:"custom",align:"center","header-align":"center","column-key":"manual",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.manual?"YA":"TIDAK")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"edit_by",label:"Diedit Oleh",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-zoom-in"},nativeOn:{click:function(r){return r.preventDefault(),function(){t.trx=e.row,t.showTrxDetail=!0}.apply(null,arguments)}}},[t._v("Lihat Detail")]),t._v(" "),e.row.time_out||1!=t.$auth.user.role?t._e():r("el-dropdown-item",{attrs:{icon:"el-icon-check"},nativeOn:{click:function(r){return r.preventDefault(),t.setSudahKeluar(e.row.id)}}},[t._v("Set Sudah Keluar")]),t._v(" "),e.row.is_member||e.row.edit||e.row.manual?t._e():r("el-dropdown-item",{attrs:{icon:"el-icon-edit"},nativeOn:{click:function(r){return r.preventDefault(),function(){t.formModel=e.row,t.formErrors={},t.showForm=!0}.apply(null,arguments)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),!e.row.is_member&&e.row.time_out?r("el-dropdown-item",{attrs:{icon:"el-icon-printer"},nativeOn:{click:function(r){return r.preventDefault(),t.printTicket(e.row.id)}}},[t._v("Print Tiket Keluar")]):t._e()],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),t.trx?r("TransactionDetailTransaksi",{attrs:{trx:t.trx,show:t.showTrxDetail},on:{close:function(e){t.showTrxDetail=!1}}}):t._e(),t._v(" "),t.showForm?r("TransactionFormTransaksiManual",{attrs:{show:t.showForm,model:t.formModel},on:{close:function(e){t.showForm=!1},reload:t.requestData}}):t._e()],1)}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{TransactionDetailTransaksi:o(395).default,TransactionFormTransaksiManual:o(396).default})}}]);