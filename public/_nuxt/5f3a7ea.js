(window.webpackJsonp=window.webpackJsonp||[]).push([[34,12,30],{461:function(t,e,n){"use strict";var o=n(2),r=n(80).find,l=n(195),m="find",d=!0;m in[]&&Array(1).find((function(){d=!1})),o({target:"Array",proto:!0,forced:d},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),l(m)},475:function(t,e,n){"use strict";var o=n(19),r=n(10),l=n(99),m=n(22),d=n(14),c=n(68),f=n(196),_=n(98),h=n(295),v=n(8),y=n(69),k=n(81).f,x=n(38).f,M=n(20).f,w=n(476).trim,O="Number",E=r.Number,I=E.prototype,j=c(y(I))==O,T=function(t){if(_(t))throw TypeError("Cannot convert a Symbol value to a number");var e,n,o,r,l,m,d,code,c=h(t,"number");if("string"==typeof c&&c.length>2)if(43===(e=(c=w(c)).charCodeAt(0))||45===e){if(88===(n=c.charCodeAt(2))||120===n)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+c}for(m=(l=c.slice(2)).length,d=0;d<m;d++)if((code=l.charCodeAt(d))<48||code>r)return NaN;return parseInt(l,o)}return+c};if(l(O,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var A,$=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof $&&(j?v((function(){I.valueOf.call(n)})):c(n)!=O)?f(new E(T(e)),n,$):T(e)},N=o?k(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),C=0;N.length>C;C++)d(E,A=N[C])&&!d($,A)&&M($,A,x(E,A));$.prototype=I,I.constructor=$,m(r,O,$)}},476:function(t,e,n){var o=n(34),r=n(18),l="["+n(477)+"]",m=RegExp("^"+l+l+"*"),d=RegExp(l+l+"*$"),c=function(t){return function(e){var n=r(o(e));return 1&t&&(n=n.replace(m,"")),2&t&&(n=n.replace(d,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},477:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},567:function(t,e,n){var content=n(593);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(97).default)("23848fa0",content,!0,{sourceMap:!1})},579:function(t,e,n){"use strict";n.r(e);var o={props:["show","gateOutList"],data:function(){return{formModel:{},formErrors:{}}},mounted:function(){1==this.gateOutList.length&&(this.formModel.gate_out_id=this.gateOutList[0].id)},methods:{closeForm:function(){this.formModel={},this.formErrors={},this.$emit("close")},save:function(){var t=this;this.$confirm("Aksi ini akan dicatat oleh sistem. Anda yakin?","Peringatan",{type:"warning"}).then((function(){t.$axios.$post("/api/manualOpenLog",t.formModel).then((function(e){t.$message({message:e.message,type:"success"}),t.$emit("open-gate",t.formModel.gate_out_id),t.closeForm()})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors)}))})).catch((function(t){return console.log(t)}))}}},r=n(37),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"FORM BUKA MANUAL",center:"",visible:t.show,"before-close":t.closeForm},on:{"update:visible":function(e){t.show=e}}},[n("el-form",{attrs:{"label-position":"left","label-width":"200px"}},[n("el-form-item",{class:{"is-error":t.formErrors.alasan},attrs:{label:"Alasan buka manual"}},[n("el-input",{attrs:{autofocus:"",type:"textarea",rows:"3",placeholder:"Alasan buka manual"},model:{value:t.formModel.alasan,callback:function(e){t.$set(t.formModel,"alasan",e)},expression:"formModel.alasan"}}),t._v(" "),t.formErrors.alasan?n("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.alasan[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),this.gateOutList.length>1?n("el-form-item",{class:{"is-error":t.formErrors.gate_out_id},attrs:{label:"Gate Keluar"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(t){return n("el-option",{key:t.id,attrs:{label:t.nama,value:t.id}})})),1),t._v(" "),t.formErrors.gate_out_id?n("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t")]):t._e()],1):t._e(),t._v(" "),n("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Masukkan password Admin"}},[n("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?n("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),n("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},580:function(t,e,n){"use strict";n.r(e);n(33),n(25),n(32),n(44),n(24),n(45);var o=n(17),r=n(59);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var m={data:function(){return{show:!1,notification:{},echo:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)(["setting"])),mounted:function(){var t=this;this.echo=this.$echo({key:"pusher_app_key",host:this.setting.server_address,port:6001}),this.echo.private("notification").notification((function(e){t.notification=e,t.show=!0}))},destroyed:function(){this.echo.leave("log")}},d=n(37),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{visible:t.show,center:"","close-on-click-modal":!1,"show-close":!1},on:{"update:visible":function(e){t.show=e}}},[n("div",{staticClass:"text-center",staticStyle:{"font-size":"50px",color:"orange"}},[n("i",{staticClass:"el-icon-warning-outline"})]),t._v(" "),n("div",{staticClass:"text-center",staticStyle:{"font-size":"24px","margin-top":"20px"}},[t._v("\n\t\t"+t._s(t.notification.message)+"\n\t")]),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-circle-close"},on:{click:function(e){t.show=!1}}},[t._v("TUTUP")])],1)])}),[],!1,null,null,null);e.default=component.exports},589:function(t,e,n){"use strict";var o=n(2),r=n(590).start;o({target:"String",proto:!0,forced:n(591)},{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},590:function(t,e,n){var o=n(27),r=n(18),l=n(296),m=n(34),d=Math.ceil,c=function(t){return function(e,n,c){var f,_,h=r(m(e)),v=h.length,y=void 0===c?" ":r(c),k=o(n);return k<=v||""==y?h:(f=k-v,(_=l.call(y,d(f/y.length))).length>f&&(_=_.slice(0,f)),t?h+_:_+h)}};t.exports={start:c(!1),end:c(!0)}},591:function(t,e,n){var o=n(101);t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(o)},592:function(t,e,n){"use strict";n(567)},593:function(t,e,n){var o=n(96)(!1);o.push([t.i,".my-input[data-v-24e75938]{border:2px solid #160047;height:45px;line-height:45px;font-size:30px;display:block;width:100%;padding:0 15px;box-sizing:border-box}.my-input-time[data-v-24e75938]:focus,.my-input[data-v-24e75938]:focus{background:#fff67a}.label-big[data-v-24e75938]{box-sizing:border-box;background-color:#160047;color:#fff;padding-left:15px;font-size:20px;height:45px;line-height:45px}.tarif-input[data-v-24e75938]{background:#c71818;color:#fff}.my-big-btn[data-v-24e75938]{box-sizing:border-box;width:100%;border:none;font-size:20px;height:45px;line-height:45px;background-color:#254ec1;color:#fff;border-radius:4px;margin-top:10px}.my-big-btn[data-v-24e75938]:focus{background:#c71818}.label[data-v-24e75938]{box-sizing:border-box;background-color:#160047;color:#fff;padding:10px}.label[data-v-24e75938],.text-center[data-v-24e75938]{text-align:center}",""]),t.exports=o},609:function(t,e,n){"use strict";n.r(e);n(33),n(25),n(32),n(44),n(24),n(45);var o=n(6),r=n(17),l=(n(52),n(475),n(51),n(589),n(461),n(102),n(103),n(13),n(100),n(46),n(82),n(59));function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var c={computed:d({totalBayar:function(){return Number(this.formModel.tarif)+Number(this.formModel.denda)},duration:function(){if(!this.formModel.time_in||!this.formModel.time_out)return"00:00:00";var t=this.$moment(this.formModel.time_in),e=this.$moment(this.formModel.time_out),n=e.diff(t,"days"),o=e.diff(t,"hours"),r=e.diff(t,"minutes");e.diff(t,"seconds");return"".concat(n,"HR ").concat(String(o%24).padStart(2,"0"),":").concat(String(r%60).padStart(2,"0"))}},Object(l.b)(["pos","setting","gateInList","jenisKendaraanList"])),data:function(){return{formModel:{nomor_barcode:"",tarif:"",denda:""},formErrors:{},snapshots:[],showManualOpenForm:!1,ws:null,updateTarifInterval:null}},methods:{toSubmit:function(){this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar))),document.getElementById("submit-btn").focus()},toGateIn:function(){1==this.gateInList.length&&(this.formModel.gate_in_id=this.gateInList[0].id),this.formModel.gate_in_id?document.getElementById("submit-btn").focus():document.getElementById("gate-in").focus(),this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)))},nextBtn:function(){document.getElementById("submit-btn1").focus()},prevBtn:function(){document.getElementById("submit-btn").focus()},hitungTarif:function(){var t=this;this.formModel.group=this.jenisKendaraanList.find((function(e){return e.nama==t.formModel.jenis_kendaraan})).group;var e=this.pos.gate_outs.find((function(g){return g.jenis_kendaraan.includes(t.formModel.jenis_kendaraan)}));if(e){if(this.formModel.gate_out_id=e.id,this.formModel.id&&this.takeSnapshot(),this.formModel.is_member)return this.formModel.tarif=0,void document.getElementById("submit-btn").focus();var n=this.jenisKendaraanList.find((function(e){return e.nama==t.formModel.jenis_kendaraan}));if(!n)return this.$message({message:"Tarif tidak ditemukan untuk jenis kendaraan "+this.formModel.jenis_kendaraan,type:"error",showClose:!0}),void(this.formModel.tarif=0);"xxxxx"==this.formModel.nomor_barcode.toLowerCase()?this.formModel.denda=Number(n.denda_tiket_hilang):this.formModel.denda=0;var o=this.$moment(this.formModel.time_in),r=this.formModel.time_out?this.$moment(this.formModel.time_out):this.$moment(),l=r.diff(o,"minutes")||1,m=n.tarif_menit_pertama;if(l<=n.menit_pertama)return this.formModel.tarif=m,document.getElementById("submit-btn").focus(),void this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)));var d=l-n.menit_pertama;if(0==n.mode_menginap)0==(_=Math.ceil(l/1440))&&0==n.mode_tarif&&(_=1);if(1==n.mode_menginap){var c=this.$moment(o.format("YYYY-MM-DD")),f=this.$moment(r.format("YYYY-MM-DD")),_=0;_=l>=60?f.diff(c,"days")+1:1}var h=_>=1?_-1:0,v=h*n.tarif_menginap;if(0==n.mode_tarif&&(this.formModel.tarif=m+_*n.tarif_flat+v),1==n.mode_tarif){var y=h*n.tarif_maksimum;if(0==n.mode_menginap){var k=l%1440,x=0;(x=k<=n.menit_pertama?n.tarif_menit_pertama:n.tarif_menit_pertama+Math.ceil((k-n.menit_pertama)/n.menit_selanjutnya)*n.tarif_menit_selanjutnya)>n.tarif_maksimum&&(x=n.tarif_maksimum),this.formModel.tarif=y+x+v}if(1==n.mode_menginap)if(_>1){var M=this.$moment(o.format("YYYY-MM-DD")+" 24:00:00").diff(o,"minutes")-n.menit_pertama,w=r.diff(this.$moment(r.format("YYYY-MM-DD")+" 00:00:00"),"minutes"),O=Math.ceil(M/n.menit_selanjutnya)*n.tarif_menit_selanjutnya;x=Math.ceil(w/n.menit_selanjutnya)*n.tarif_menit_selanjutnya,O>n.tarif_maksimum&&(O=n.tarif_maksimum),x>n.tarif_maksimum&&(x=n.tarif_maksimum),_<=2&&(y=0),this.formModel.tarif=m+y+O+x+v}else(O=Math.ceil(d/n.menit_selanjutnya)*n.tarif_menit_selanjutnya)>n.tarif_maksimum&&(O=n.tarif_maksimum),this.formModel.tarif=m+O}"xxxxx"==this.formModel.nomor_barcode.toLowerCase()?document.getElementById("time-in").focus():document.getElementById("submit-btn").focus(),this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)))}else this.$message({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"})},cekPlatNomor:function(){var t=this,e={plat_nomor:this.formModel.plat_nomor};this.$axios.$get("/api/member/search",{params:e}).then((function(e){t.formModel.is_member=1,t.formModel.tarif=0})).catch((function(e){t.formModel.is_member=0})).finally((function(){console.log("chekPlatNomor"),document.getElementById("nomor-tiket").focus(),t.$forceUpdate()}))},cekTiket:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,data,o,r,l,m,c,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.formModel.nomor_barcode.length<5)){e.next=2;break}return e.abrupt("return");case 2:if(n=t.$moment().format("YYYY-MM-DD HH:mm:ss"),"xxxxx"!=t.formModel.nomor_barcode.toLowerCase()){e.next=9;break}if(t.formModel.time_in=t.$moment().format("YYYY-MM-DD"),t.formModel.time_out=n,!(t.jenisKendaraanList.length>1)){e.next=9;break}return document.getElementById("jenis-kendaraan").focus(),e.abrupt("return");case 9:return e.prev=9,e.next=12,t.$axios.$get("/api/parkingTransaction/search",{params:{nomor_barcode:t.formModel.nomor_barcode}});case 12:data=e.sent,e.next=19;break;case 15:e.prev=15,e.t0=e.catch(9),404==e.t0.response.status&&t.$message({message:e.t0.response.data.message,type:"error",center:!0,showClose:!0,duration:3e3}),document.getElementById("nomor-tiket").focus();case 19:if(t.snapshots=data.snapshots,o=data.id,r=data.gate_in_id,l=data.time_in,m=data.is_member,t.formModel=d(d({},t.formModel),{},{id:o,gate_in_id:r,time_in:l,is_member:m,time_out:n,tarif:0}),t.$forceUpdate(),data.is_member||!(t.jenisKendaraanList.length>1)){e.next=26;break}return document.getElementById("jenis-kendaraan").focus(),e.abrupt("return");case 26:if(!data.is_member){e.next=48;break}if(!data.member.expired){e.next=31;break}return t.$alert("Kartu telah habis masa berlaku","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),t.formModel.is_member=0,e.abrupt("return",!1);case 31:if(!data.member.expired&&data.member.expired_in<=5&&t.$alert("Kartu akan habis masa berlaku dalam ".concat(data.member.expired_in," hari"),"Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),!t.setting.disable_plat_nomor){e.next=46;break}if(c=data.member.vehicles[0],t.formModel.jenis_kendaraan=c.jenis_kendaraan,t.formModel.plat_nomor=c.plat_nomor,!t.setting.member_auto_open){e.next=44;break}if(f=t.pos.gate_outs.find((function(g){return g.jenis_kendaraan.includes(t.formModel.jenis_kendaraan)}))){e.next=41;break}return t.$message({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"}),e.abrupt("return");case 41:t.formModel.gate_out_id=f.id,t.formModel.id&&t.takeSnapshot(),t.save(!1);case 44:e.next=48;break;case 46:data.member.vehicles.find((function(e){return e.plat_nomor==t.formModel.plat_nomor}))?t.jenisKendaraanList.length>1&&document.getElementById("jenis-kendaraan").focus():(t.$alert("Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah "+data.member.vehicles.map((function(t){return t.plat_nomor})).join(", "),"Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),document.getElementById("plat-nomor").focus());case 48:1==t.jenisKendaraanList.length&&(t.formModel.jenis_kendaraan=t.jenisKendaraanList[0].nama,t.hitungTarif());case 49:case"end":return e.stop()}}),e,null,[[9,15]])})))()},resetForm:function(){this.resetRunningText(),this.formModel.tarif="",this.formModel.denda="",this.formModel.gate_in_id=null,this.formModel.gate_out_id=null,this.formModel.jenis_kendaraan=null,this.formModel.plat_nomor=this.setting.plat_nomor_default,this.formModel.nomor_barcode="",this.formModel.time_out="",this.formModel.time_in="",this.formModel.duration="",this.snapshots=[],this.$forceUpdate(),this.setting.disable_plat_nomor?(console.log("ke nomor tiket"),document.getElementById("nomor-tiket").focus()):(console.log("ke plat nomor"),document.getElementById("plat-nomor").focus())},submit:function(t){"xxxxx"!=this.formModel.nomor_barcode.toLowerCase()||this.formModel.time_in?(document.getElementById("submit-btn").blur(),1==this.gateInList.length&&(this.formModel.gate_in_id=this.gateInList[0].id),this.formModel.gate_in_id?this.formModel.nomor_barcode&&this.formModel.gate_out_id&&this.formModel.jenis_kendaraan&&this.formModel.time_out&&this.formModel.time_in&&(this.formModel.time_in.length<16?this.$message({message:"FORMAT TIME IN SALAH",type:"error",showClose:!0}):(16==this.formModel.time_in.length&&(this.formModel.time_in+=":00"),this.save(t))):this.$message({message:"MOHON ISI GATE IN",type:"error",showClose:!0})):document.getElementById("time-in").focus()},save:function(t){var e=this;this.formModel.ticket=t,this.$axios({method:this.formModel.id?"put":"post",url:this.formModel.id?"/api/parkingTransaction/".concat(this.formModel.id):"/api/parkingTransaction",data:this.formModel}).then((function(t){e.$message({message:t.data.message,type:"success"}),e.openGate(e.formModel.gate_out_id),e.resetForm()}))},connectPos:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.ws=new WebSocket("ws://".concat(t.pos.ip_address,":5678/")),t.ws.onerror=function(e){t.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},t.ws.onopen=function(t){console.log("POS TEKONEKSI")},t.ws.onmessage=function(t){var data=JSON.parse(t.data);console.error(data)};case 4:case"end":return e.stop()}}),e)})))()},openGate:function(t){var e=this.pos.gate_outs.find((function(g){return g.id==t}));this.ws.send(["open",e.device,e.baudrate,e.open_command,e.close_command].join(";")),setTimeout(this.resetForm,3e3)},openGateMemberUHF:function(){var t=this,e=this.pos.gate_outs[0].id;this.openGate(e),this.$axios.$post("/api/takeSnapshot/".concat(e)).then((function(e){t.snapshots=e,t.$forceUpdate()}))},runningText:function(text){var t=this,e=this.pos.gate_outs.find((function(g){return g.id==t.formModel.gate_out_id}));e&&e.running_text_device&&e.running_text_baudrate&&this.ws.send(["rt",e.running_text_device,e.running_text_baudrate,text].join(";"))},resetRunningText:function(){var t=this,e=this.pos.gate_outs.find((function(g){return g.id==t.formModel.gate_out_id}));e&&e.running_text_device&&e.running_text_baudrate&&this.ws.send(["rrt",e.running_text_device,e.running_text_baudrate].join(";"))},printLastTrx:function(){var t=this;this.$axios.$post("/api/parkingTransaction/printLastTransaction",{pos_id:this.formModel.pos_id}).then((function(e){t.$message({message:e.message,type:"success",showClose:!0})}))},printReport:function(){var t=this;if(!this.HIDE_PRINT_REPORT){var e={pos_id:this.formModel.pos_id,date:this.$moment().format("YYYY-MM-DD")};this.$axios.$post("/api/parkingTransaction/printReport",e).then((function(e){t.$message({message:"SILAKAN AMBIL STRUK",type:"success",showClose:!0})}))}},initialize:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getPos");case 2:if(t.pos){e.next=4;break}return e.abrupt("return");case 4:return t.formModel.pos_id=t.pos.id,1==t.pos.gate_outs.length&&(t.formModel.gate_out_id=t.pos.gate_outs[0].id),t.formModel.plat_nomor=t.setting.plat_nomor_default,t.setting.disable_plat_nomor?document.getElementById("nomor-tiket").focus():document.getElementById("plat-nomor").focus(),e.next=10,t.connectPos();case 10:case"end":return e.stop()}}),e)})))()},takeSnapshot:function(){var t=this;this.$axios.$post("/api/parkingTransaction/takeSnapshot/".concat(this.formModel.id),{gate_out_id:this.formModel.gate_out_id}).then((function(e){t.snapshots=e,t.$forceUpdate()}))}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.initialize();case 2:if(t.pos){e.next=4;break}return e.abrupt("return");case 4:document.getElementById("gate-out-app").addEventListener("keydown",(function(e){"-"==e.key&&(e.preventDefault(),t.resetForm(),t.$forceUpdate()),"+"==e.key&&(e.preventDefault(),t.formModel.nomor_barcode="",t.formModel.time_out="",t.formModel.jenis_kendaraan="",t.formModel.tarif="",document.getElementById("nomor-tiket").focus()),"*"==e.key&&(e.preventDefault(),t.formModel.jenis_kendaraan="",t.formModel.tarif="",document.getElementById("jenis-kendaraan").focus()),"/"==e.key&&(e.preventDefault(),t.formModel.time_in="",document.getElementById("time-in").focus()),"F10"==e.key&&(e.preventDefault(),t.printReport()),"F11"==e.key&&(e.preventDefault(),t.showManualOpenForm=!0),"F12"==e.key&&(e.preventDefault(),t.printLastTrx())})),t.updateTarifInterval=setInterval(t.$store.dispatch("getJenisKendaraanList"),6e4);case 6:case"end":return e.stop()}}),e)})))()},destroyed:function(){this.ws&&this.ws.close(),clearInterval(this.updateTarifInterval)}},f=(n(592),n(37)),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",[t.pos?n("div",{staticClass:"flex",attrs:{id:"gate-out-app"}},[n("div",{staticStyle:{width:"600px","flex-shrink":"0"}},[n("h1",{staticClass:"mt-0 mb-3 p-2 bg-red text-white text-center text-xl"},[t._v("\n\t\t\t\t"+t._s(t.pos.nama)+"\n\t\t\t")]),t._v(" "),t.setting.disable_plat_nomor?t._e():n("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("[-] NO. PLAT")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.plat_nomor,expression:"formModel.plat_nomor"}],staticClass:"my-input",attrs:{id:"plat-nomor",autocomplete:"off",type:"text",placeholder:"NO. PLAT"},domProps:{value:t.formModel.plat_nomor},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.cekPlatNomor.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.formModel,"plat_nomor",e.target.value)}}})])],1),t._v(" "),n("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("[+] NO. TIKET/KARTU")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.nomor_barcode,expression:"formModel.nomor_barcode"}],staticClass:"my-input",attrs:{id:"nomor-tiket",autocomplete:"off",type:"text",placeholder:"NO. TIKET/KARTU"},domProps:{value:t.formModel.nomor_barcode},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.cekTiket.apply(null,arguments)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:t.cekTiket.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.formModel,"nomor_barcode",e.target.value)}}})])],1),t._v(" "),t.jenisKendaraanList.length>1?n("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("[*] JENIS KENDARAAN")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.jenis_kendaraan,expression:"formModel.jenis_kendaraan"}],staticClass:"my-input",attrs:{id:"jenis-kendaraan",placeholder:"JENIS KENDARAAN"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"jenis_kendaraan",e.target.multiple?n:n[0])},t.hitungTarif]}},t._l(t.jenisKendaraanList,(function(g){return n("option",{key:g.id,domProps:{value:g.nama}},[t._v("\n\t\t\t\t\t\t\t"+t._s(g.shortcut_key)+" - "+t._s(g.nama)+"\n\t\t\t\t\t\t")])})),0)])],1):t._e(),t._v(" "),n("el-row",{directives:[{name:"show",rawName:"v-show",value:"xxxxx"==t.formModel.nomor_barcode,expression:"formModel.nomor_barcode == 'xxxxx'"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("[*] JAM MASUK")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("input",{directives:[{name:"mask",rawName:"v-mask",value:"####-##-## ##:##",expression:"'####-##-## ##:##'"},{name:"model",rawName:"v-model",value:t.formModel.time_in,expression:"formModel.time_in"}],staticClass:"my-input",attrs:{id:"time-in"},domProps:{value:t.formModel.time_in},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.toGateIn.apply(null,arguments)},change:t.hitungTarif,input:function(e){e.target.composing||t.$set(t.formModel,"time_in",e.target.value)}}})])],1),t._v(" "),t.gateInList.length>1?n("el-row",{directives:[{name:"show",rawName:"v-show",value:"xxxxx"==t.formModel.nomor_barcode,expression:"formModel.nomor_barcode == 'xxxxx'"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("GATE MASUK")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.gate_in_id,expression:"formModel.gate_in_id"}],staticClass:"my-input",attrs:{id:"gate-in"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"gate_in_id",e.target.multiple?n:n[0])},t.toSubmit]}},t._l(t.gateInList,(function(g){return n("option",{key:g.id,domProps:{value:g.id}},[t._v("\n\t\t\t\t\t\t\t"+t._s(g.shortcut_key)+" - "+t._s(g.nama)+"\n\t\t\t\t\t\t")])})),0)])],1):t._e(),t._v(" "),n("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("TARIF")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.tarif,expression:"formModel.tarif"}],staticClass:"my-input bg-red-700 text-white",attrs:{disabled:""},domProps:{value:t.formModel.tarif},on:{input:function(e){e.target.composing||t.$set(t.formModel,"tarif",e.target.value)}}})])],1),t._v(" "),"xxxxx"==t.formModel.nomor_barcode?n("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:10}},[n("div",{staticClass:"label-big"},[t._v("TARIF + DENDA")])]),t._v(" "),n("el-col",{attrs:{span:14}},[n("input",{staticClass:"my-input bg-red-700 text-white",attrs:{disabled:""},domProps:{value:Number(t.formModel.tarif)+Number(t.formModel.denda)}})])],1):t._e(),t._v(" "),n("button",{staticClass:"my-big-btn",attrs:{id:"submit-btn"},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.nextBtn.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.nextBtn.apply(null,arguments)}],keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit(!1)},click:function(e){return t.submit(!1)}}},[t._v("\n\t\t\t\tBUKA GATE\n\t\t\t")]),t._v(" "),n("button",{staticClass:"my-big-btn",attrs:{id:"submit-btn1"},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.prevBtn.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.prevBtn.apply(null,arguments)}],keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.printLastTrx.apply(null,arguments)},click:t.printLastTrx}},[t._v("\n\t\t\t\t[F12] PRINT STRUK TRANSAKSI TERAKHIR\n\t\t\t")]),t._v(" "),n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:12}},[n("button",{staticClass:"my-big-btn",on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.printReport.apply(null,arguments)},click:t.printReport}},[t._v("\n\t\t\t\t\t\t[F10] PRINT LAPORAN\n\t\t\t\t\t")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("button",{staticClass:"my-big-btn",on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.showManualOpenForm=!0},click:function(e){t.showManualOpenForm=!0}}},[t._v("\n\t\t\t\t\t\t[F11] BUKA GATE MANUAL\n\t\t\t\t\t")])])],1)],1),t._v(" "),n("div",{staticClass:"ml-5"},t._l(t.snapshots,(function(s){return n("img",{key:s.id,staticClass:"mx-auto mb-1 border",staticStyle:{width:"100%"},attrs:{src:s.url}})})),0),t._v(" "),n("TransactionFormBukaManual",{attrs:{show:t.showManualOpenForm,gateOutList:t.pos.gate_outs},on:{close:function(e){t.showManualOpenForm=!1},"open-gate":function(e){return t.openGate(e)}}}),t._v(" "),n("NotificationMessage")],1):n("div",{staticClass:"flex flex-row justify-content-center align-items-center",staticStyle:{height:"calc(100vh - 145px)"}},[n("div",{staticClass:"text-center text-5xl text-danger"},[t._v("\n\t\t\tKOMPUTER INI TIDAK TERDAFTAR SEBAGAI POS\n\t\t")])])])}),[],!1,null,"24e75938",null);e.default=component.exports;installComponents(component,{TransactionFormBukaManual:n(579).default,NotificationMessage:n(580).default})}}]);