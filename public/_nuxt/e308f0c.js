(window.webpackJsonp=window.webpackJsonp||[]).push([[28,24],{389:function(t,e,o){"use strict";var n=o(4),r=o(87).find,l=o(176),m="find",d=!0;m in[]&&Array(1).find((function(){d=!1})),n({target:"Array",proto:!0,forced:d},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),l(m)},390:function(t,e,o){"use strict";var n=o(11),r=o(6),l=o(119),m=o(17),d=o(12),c=o(50),f=o(250),_=o(88),h=o(249),v=o(5),y=o(69),M=o(89).f,k=o(39).f,x=o(16).f,w=o(391).trim,E="Number",O=r.Number,I=O.prototype,A=c(y(I))==E,N=function(t){if(_(t))throw TypeError("Cannot convert a Symbol value to a number");var e,o,n,r,l,m,d,code,c=h(t,"number");if("string"==typeof c&&c.length>2)if(43===(e=(c=w(c)).charCodeAt(0))||45===e){if(88===(o=c.charCodeAt(2))||120===o)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+c}for(m=(l=c.slice(2)).length,d=0;d<m;d++)if((code=l.charCodeAt(d))<48||code>r)return NaN;return parseInt(l,n)}return+c};if(l(E,!O(" 0o1")||!O("0b1")||O("+0x1"))){for(var T,$=function(t){var e=arguments.length<1?0:t,o=this;return o instanceof $&&(A?v((function(){I.valueOf.call(o)})):c(o)!=E)?f(new O(N(e)),o,$):N(e)},j=n?M(O):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),C=0;j.length>C;C++)d(O,T=j[C])&&!d($,T)&&x($,T,k(O,T));$.prototype=I,I.constructor=$,m(r,E,$)}},391:function(t,e,o){var n=o(20),r=o(9),l="["+o(392)+"]",m=RegExp("^"+l+l+"*"),d=RegExp(l+l+"*$"),c=function(t){return function(e){var o=r(n(e));return 1&t&&(o=o.replace(m,"")),2&t&&(o=o.replace(d,"")),o}};t.exports={start:c(1),end:c(2),trim:c(3)}},392:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},402:function(t,e,o){var content=o(419);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(86).default)("53dbcb17",content,!0,{sourceMap:!1})},409:function(t,e,o){"use strict";o.r(e);o(31),o(24),o(30),o(42),o(23),o(43);var n=o(13),r=o(44);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var m={props:["show"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)(["gateOutList"])),data:function(){return{formModel:{},formErrors:{}}},methods:{closeForm:function(){this.formModel={},this.formErrors={},this.$emit("close")},save:function(){var t=this;this.$confirm("Aksi ini akan dicatat oleh sistem. Anda yakin?","Peringatan",{type:"warning"}).then((function(){t.$axios.$post("/api/manualOpenLog",t.formModel).then((function(e){t.$message({message:e.message,type:"success"}),t.$emit("open-gate",t.formModel.gate_out_id),t.closeForm()})).catch((function(e){t.$message({message:e.response.data.message,type:"error"}),422==e.response.status&&(t.formErrors=e.response.data.errors)}))})).catch((function(t){return console.log(t)}))}}},d=o(22),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{title:"FORM BUKA MANUAL",center:"",visible:t.show,"before-close":t.closeForm},on:{"update:visible":function(e){t.show=e}}},[o("el-form",{attrs:{"label-position":"left","label-width":"200px"}},[o("el-form-item",{class:{"is-error":t.formErrors.alasan},attrs:{label:"Alasan buka manual"}},[o("el-input",{attrs:{autofocus:"",type:"textarea",rows:"3",placeholder:"Alasan buka manual"},model:{value:t.formModel.alasan,callback:function(e){t.$set(t.formModel,"alasan",e)},expression:"formModel.alasan"}}),t._v(" "),t.formErrors.alasan?o("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.alasan[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),o("el-form-item",{class:{"is-error":t.formErrors.gate_out_id},attrs:{label:"Gate Keluar"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(t){return o("el-option",{key:t.id,attrs:{label:t.nama,value:t.id}})})),1),t._v(" "),t.formErrors.gate_out_id?o("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),o("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Masukkan password Admin"}},[o("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?o("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),o("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},415:function(t,e,o){"use strict";var n=o(4),r=o(416).start;n({target:"String",proto:!0,forced:o(417)},{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},416:function(t,e,o){var n=o(15),r=o(9),l=o(252),m=o(20),d=Math.ceil,c=function(t){return function(e,o,c){var f,_,h=r(m(e)),v=h.length,y=void 0===c?" ":r(c),M=n(o);return M<=v||""==y?h:(f=M-v,(_=l.call(y,d(f/y.length))).length>f&&(_=_.slice(0,f)),t?h+_:_+h)}};t.exports={start:c(!1),end:c(!0)}},417:function(t,e,o){var n=o(82);t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},418:function(t,e,o){"use strict";o(402)},419:function(t,e,o){var n=o(85)(!1);n.push([t.i,".block[data-v-5c282bb4]{background-color:#eee;height:calc(50vh - 73px)}.my-input[data-v-5c282bb4]{border:2px solid #160047;height:45px;line-height:45px;font-size:30px;display:block;width:100%;padding:0 15px;box-sizing:border-box}.my-input-time[data-v-5c282bb4]:focus,.my-input[data-v-5c282bb4]:focus{background:#fff67a}.label-big[data-v-5c282bb4]{box-sizing:border-box;background-color:#160047;color:#fff;padding-left:15px;font-size:20px;height:45px;line-height:45px}.tarif-input[data-v-5c282bb4]{background:#c71818;color:#fff}.my-big-btn[data-v-5c282bb4]{box-sizing:border-box;width:100%;border:none;font-size:20px;height:45px;line-height:45px;background-color:#254ec1;color:#fff;border-radius:4px;margin-top:10px}.my-big-btn[data-v-5c282bb4]:focus{background:#c71818}.label[data-v-5c282bb4]{box-sizing:border-box;background-color:#160047;color:#fff;padding:10px}.label[data-v-5c282bb4],.text-center[data-v-5c282bb4]{text-align:center}",""]),t.exports=n},430:function(t,e,o){"use strict";o.r(e);o(31),o(24),o(30),o(42),o(23),o(43);var n=o(2),r=o(13),l=(o(52),o(390),o(68),o(415),o(389),o(91),o(92),o(8),o(177),o(51),o(90),o(44));function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var d={computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({totalBayar:function(){return Number(this.formModel.tarif)+Number(this.formModel.denda)},duration:function(){if(!this.formModel.time_in||!this.formModel.time_out)return"00:00:00";var t=this.$moment(this.formModel.time_in),e=this.$moment(this.formModel.time_out),o=e.diff(t,"days"),n=e.diff(t,"hours"),r=e.diff(t,"minutes");e.diff(t,"seconds");return"".concat(o,"HR ").concat(String(n%24).padStart(2,"0"),":").concat(String(r%60).padStart(2,"0"))}},Object(l.b)(["pos","setting","posList","gateInList","gateOutList","jenisKendaraanList"])),data:function(){return{formModel:{nomor_barcode:"",tarif:"",denda:""},formErrors:{},snapshots:[],showManualOpenForm:!1,HIDE_PRINT_REPORT:!1,ws:null}},methods:{toSubmit:function(){this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar))),document.getElementById("submit-btn").focus()},toGateIn:function(){1==this.gateInList.length&&(this.formModel.gate_in_id=this.gateInList[0].id),this.formModel.gate_in_id?document.getElementById("submit-btn").focus():document.getElementById("gate-in").focus(),this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)))},nextBtn:function(){document.getElementById("submit-btn1").focus()},prevBtn:function(){document.getElementById("submit-btn").focus()},hitungTarif:function(){var t=this,e=this.gateOutList.find((function(g){return g.pos_id==t.formModel.pos_id&&g.jenis_kendaraan.includes(t.formModel.jenis_kendaraan)}));if(e){if(this.formModel.gate_out_id=e.id,this.formModel.id&&this.takeSnapshot(),this.formModel.is_member)return this.formModel.tarif=0,void document.getElementById("submit-btn").focus();var o=this.jenisKendaraanList.find((function(e){return e.nama==t.formModel.jenis_kendaraan}));if(!o)return this.$message({message:"Tarif tidak ditemukan untuk jenis kendaraan "+this.formModel.jenis_kendaraan,type:"error",showClose:!0}),void(this.formModel.tarif=0);"xxxxx"==this.formModel.nomor_barcode.toLowerCase()?this.formModel.denda=Number(o.denda_tiket_hilang):this.formModel.denda=0;var n=this.$moment(this.formModel.time_in),r=this.formModel.time_out?this.$moment(this.formModel.time_out):this.$moment(),l=r.diff(n,"minutes"),m=o.tarif_menit_pertama;if(l<=o.menit_pertama)return this.formModel.tarif=m,document.getElementById("submit-btn").focus(),void this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)));var d=l-o.menit_pertama;if(0==o.mode_menginap)0==(_=Math.ceil(l/1440))&&0==o.mode_tarif&&(_=1);if(1==o.mode_menginap){var c=this.$moment(n.format("YYYY-MM-DD")),f=this.$moment(r.format("YYYY-MM-DD")),_=0;_=l>=60?f.diff(c,"days")+1:1}var h=_>=1?_-1:0,v=h*o.tarif_menginap;if(0==o.mode_tarif&&(this.formModel.tarif=m+_*o.tarif_flat+v),1==o.mode_tarif){var y=h*o.tarif_maksimum;if(0==o.mode_menginap){var M=Math.ceil(l%1440/o.menit_selanjutnya)*o.tarif_menit_selanjutnya;M>o.tarif_maksimum&&(M=o.tarif_maksimum),this.formModel.tarif=m+y+M+v}if(1==o.mode_menginap)if(_>1){var k=this.$moment(n.format("YYYY-MM-DD")+" 24:00:00").diff(n,"minutes")-o.menit_pertama,x=r.diff(this.$moment(r.format("YYYY-MM-DD")+" 00:00:00"),"minutes"),w=Math.ceil(k/o.menit_selanjutnya)*o.tarif_menit_selanjutnya;M=Math.ceil(x/o.menit_selanjutnya)*o.tarif_menit_selanjutnya,w>o.tarif_maksimum&&(w=o.tarif_maksimum),M>o.tarif_maksimum&&(M=o.tarif_maksimum),_<=2&&(y=0),this.formModel.tarif=m+y+w+M+v}else(w=Math.ceil(d/o.menit_selanjutnya)*o.tarif_menit_selanjutnya)>o.tarif_maksimum&&(w=o.tarif_maksimum),this.formModel.tarif=m+w}"xxxxx"==this.formModel.nomor_barcode.toLowerCase()?document.getElementById("time-in").focus():document.getElementById("submit-btn").focus(),this.runningText("".concat(this.duration,"|Rp").concat(this.$decimal(this.totalBayar)))}else this.$message({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"})},cekPlatNomor:function(){var t=this,e={plat_nomor:this.formModel.plat_nomor};this.$axios.$get("/api/member/search",{params:e}).then((function(e){t.formModel.is_member=1,t.formModel.tarif=0})).catch((function(e){t.formModel.is_member=0})).finally((function(){console.log("chekPlatNomor"),document.getElementById("nomor-tiket").focus(),t.$forceUpdate()}))},cekTiket:function(){var t=this;if(!(this.formModel.nomor_barcode.length<5)){var e=this.$moment().format("YYYY-MM-DD HH:mm:ss");if("xxxxx"==this.formModel.nomor_barcode.toLowerCase())return this.formModel.time_in=this.$moment().format("YYYY-MM-DD"),this.formModel.time_out=e,void document.getElementById("jenis-kendaraan").focus();var o={nomor_barcode:this.formModel.nomor_barcode};this.$axios.$get("/api/parkingTransaction/search",{params:o}).then((function(o){var data=o;if(t.snapshots=data.snapshots,t.formModel.id=data.id,t.formModel.gate_in_id=data.gate_in_id,t.formModel.time_in=data.time_in,t.formModel.is_member=data.is_member,t.formModel.time_out=e,t.formModel.tarif=0,t.$forceUpdate(),!data.is_member)return document.getElementById("jenis-kendaraan").focus(),!1;if(data.member.expired)return t.$alert("Kartu telah habis masa berlaku","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),t.formModel.is_member=0,!1;if(!data.member.expired&&data.member.expired_in<=5&&t.$alert("Kartu akan habis masa berlaku dalam "+data.member.expired_in+" hari","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),t.setting.disable_plat_nomor){if(t.setting.member_auto_open){t.formModel.jenis_kendaraan=data.member.vehicles[0].jenis_kendaraan;var n=t.gateOutList.find((function(g){return g.pos_id==t.formModel.pos_id&&g.jenis_kendaraan.includes(t.formModel.jenis_kendaraan)}));if(!n)return void t.$message({message:"Tidak ada gate keluar untuk jenis kendaraan terkait",type:"error"});t.formModel.gate_out_id=n.id,t.formModel.id&&t.takeSnapshot(),t.save(!1)}}else data.member.vehicles.find((function(e){return e.plat_nomor==t.formModel.plat_nomor}))?document.getElementById("jenis-kendaraan").focus():(t.$alert("Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah "+data.member.vehicles.map((function(t){return t.plat_nomor})).join(", "),"Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),document.getElementById("plat-nomor").focus())})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0}),document.getElementById("nomor-tiket").focus()}))}},resetForm:function(){this.resetRunningText(),this.formModel.tarif="",this.formModel.denda="",this.formModel.gate_in_id=null,this.formModel.gate_out_id=null,this.formModel.jenis_kendaraan=null,this.formModel.plat_nomor=this.setting.plat_nomor_default,this.formModel.nomor_barcode="",this.formModel.time_out="",this.formModel.time_in="",this.formModel.duration="",this.snapshots=[],this.$forceUpdate(),this.setting.disable_plat_nomor?(console.log("ke nomor tiket"),document.getElementById("nomor-tiket").focus()):(console.log("ke plat nomor"),document.getElementById("plat-nomor").focus())},submit:function(t){"xxxxx"!=this.formModel.nomor_barcode.toLowerCase()||this.formModel.time_in?(document.getElementById("submit-btn").blur(),1==this.gateInList.length&&(this.formModel.gate_in_id=this.gateInList[0].id),this.formModel.gate_in_id?this.formModel.nomor_barcode&&this.formModel.gate_out_id&&this.formModel.jenis_kendaraan&&this.formModel.time_out&&this.formModel.time_in&&(this.formModel.time_in.length<16?this.$message({message:"FORMAT TIME IN SALAH",type:"error",showClose:!0}):(16==this.formModel.time_in.length&&(this.formModel.time_in+=":00"),this.save(t))):this.$message({message:"MOHON ISI GATE IN",type:"error",showClose:!0})):document.getElementById("time-in").focus()},save:function(t){var e=this;this.formModel.ticket=t,this.$axios({method:this.formModel.id?"put":"post",url:this.formModel.id?"/api/parkingTransaction/".concat(this.formModel.id):"/api/parkingTransaction",data:this.formModel}).then((function(t){e.$message({message:t.data.message,type:"success"}),e.openGate(e.formModel.gate_out_id),e.resetForm()})).catch((function(t){e.$message({message:"DATA GAGAL DISIMPAN",type:"error"})}))},connectPos:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getPos");case 2:t.ws=new WebSocket("ws://".concat(t.pos.ip_address,":5678/")),t.ws.onerror=function(e){t.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},t.ws.onopen=function(t){console.log("POS TEKONEKSI")},t.ws.onmessage=function(e){var data=JSON.parse(e.data);t.$message({message:data.message,type:data.status?"success":"error"})};case 6:case"end":return e.stop()}}),e)})))()},openGate:function(t){var e=this.gateOutList.find((function(g){return g.id==t}));this.ws.send(["open",e.device,e.baudrate,e.open_command,e.close_command].join(";")),setTimeout(this.resetForm,3e3)},runningText:function(text){var t=this,e=this.posList.find((function(p){return p.id==t.formModel.pos_id})),o=this.gateOutList.find((function(g){return g.id==t.formModel.gate_out_id}));if(o&&o.running_text_device&&o.running_text_baudrate){var n=new WebSocket("ws://".concat(e.ip_address,":5678/"));n.onerror=function(e){t.$message({message:"KONEKSI KE RUNNING TEXT GAGAL",type:"error"})},n.onopen=function(t){n.send(["rt",o.running_text_device,o.running_text_baudrate,text].join(";"))},n.onmessage=function(t){var data=JSON.parse(t.data);console.log(data),n.close()}}},resetRunningText:function(){var t=this,e=this.posList.find((function(p){return p.id==t.formModel.pos_id})),o=this.gateOutList.find((function(g){return g.id==t.formModel.gate_out_id}));if(o&&o.running_text_device&&o.running_text_baudrate){var n=new WebSocket("ws://".concat(e.ip_address,":5678/"));n.onerror=function(e){t.$message({message:"KONEKSI KE RUNNING TEXT GAGAL",type:"error"})},n.onopen=function(t){n.send(["rrt",o.running_text_device,o.running_text_baudrate].join(";"))},n.onmessage=function(t){var data=JSON.parse(t.data);console.log(data),n.close()}}},printLastTrx:function(){var t=this;this.$axios.$post("/api/parkingTransaction/printLastTransaction",{pos_id:this.formModel.pos_id}).then((function(e){t.$message({message:e.message,type:"success",showClose:!0})})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})}))},printReport:function(){var t=this;if(!this.HIDE_PRINT_REPORT){var e={pos_id:this.formModel.pos_id,date:this.$moment().format("YYYY-MM-DD")};this.$axios.$post("/api/parkingTransaction/printReport",e).then((function(e){t.$message({message:"SILAKAN AMBIL STRUK",type:"success",showClose:!0})})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})}))}},initialize:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.formModel.plat_nomor=t.setting.plat_nomor_default,t.setting.disable_plat_nomor?document.getElementById("nomor-tiket").focus():document.getElementById("plat-nomor").focus(),e.next=4,t.$store.dispatch("getPosList");case 4:0==t.posList.length?t.$message({message:"BELUM ADA POS",type:"error",showClose:!0,duration:1e4}):1==t.posList.length&&(t.formModel.pos_id=t.posList[0].id,1==t.posList[0].gate_outs.length&&(t.formModel.gate_out_id=t.posList.gate_outs[0].id)),t.connectPos();case 6:case"end":return e.stop()}}),e)})))()},takeSnapshot:function(){var t=this;this.$axios.$post("/api/parkingTransaction/takeSnapshot/".concat(this.formModel.id),{gate_out_id:this.formModel.gate_out_id}).then((function(e){t.snapshots=e,t.$forceUpdate()})).catch((function(e){t.$message({message:e.response.data.message,type:"error"})}))}},mounted:function(){var t=this;this.initialize(),document.getElementById("gate-out-app").addEventListener("keydown",(function(e){"-"==e.key&&(e.preventDefault(),t.resetForm(),t.$forceUpdate()),"+"==e.key&&(e.preventDefault(),t.formModel.nomor_barcode="",t.formModel.time_out="",t.formModel.jenis_kendaraan="",t.formModel.tarif="",document.getElementById("nomor-tiket").focus()),"*"==e.key&&(e.preventDefault(),t.formModel.jenis_kendaraan="",t.formModel.tarif="",document.getElementById("jenis-kendaraan").focus()),"/"==e.key&&(e.preventDefault(),t.formModel.time_in="",document.getElementById("time-in").focus()),"F10"==e.key&&(e.preventDefault(),t.printReport()),"F11"==e.key&&(e.preventDefault(),t.showManualOpenForm=!0),"F12"==e.key&&(e.preventDefault(),t.printLastTrx())}))},destroyed:function(){this.ws.close()}},c=(o(418),o(22)),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"flex flex-row",attrs:{id:"gate-out-app"}},[o("div",[t.formModel.pos_id?o("h1",{staticClass:"mb-3 p-2 bg-red text-white text-center text-xl",on:{click:function(e){t.formModel.pos_id=null}}},[t._v("\n\t\t\t"+t._s(t.posList.find((function(p){return p.id==t.formModel.pos_id})).nama)+"\n\t\t")]):t._e(),t._v(" "),t.setting.disable_plat_nomor?t._e():o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("[-] NO. PLAT")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.plat_nomor,expression:"formModel.plat_nomor"}],staticClass:"my-input",attrs:{id:"plat-nomor",autocomplete:"off",type:"text",placeholder:"NO. PLAT"},domProps:{value:t.formModel.plat_nomor},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.cekPlatNomor.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.formModel,"plat_nomor",e.target.value)}}})])],1),t._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("[+] NO. TIKET/KARTU")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.nomor_barcode,expression:"formModel.nomor_barcode"}],staticClass:"my-input",attrs:{id:"nomor-tiket",autocomplete:"off",type:"text",placeholder:"NO. TIKET/KARTU"},domProps:{value:t.formModel.nomor_barcode},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.cekTiket.apply(null,arguments)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:t.cekTiket.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.formModel,"nomor_barcode",e.target.value)}}})])],1),t._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("[*] JENIS KENDARAAN")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.jenis_kendaraan,expression:"formModel.jenis_kendaraan"}],staticClass:"my-input",attrs:{id:"jenis-kendaraan",placeholder:"JENIS KENDARAAN"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"jenis_kendaraan",e.target.multiple?o:o[0])},t.hitungTarif]}},t._l(t.jenisKendaraanList,(function(g){return o("option",{key:g.id,domProps:{value:g.nama}},[t._v("\n\t\t\t\t\t\t"+t._s(g.shortcut_key)+" - "+t._s(g.nama)+"\n\t\t\t\t\t")])})),0)])],1),t._v(" "),o("el-row",{directives:[{name:"show",rawName:"v-show",value:"xxxxx"==t.formModel.nomor_barcode,expression:"formModel.nomor_barcode == 'xxxxx'"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("[*] JAM MASUK")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"mask",rawName:"v-mask",value:"####-##-## ##:##",expression:"'####-##-## ##:##'"},{name:"model",rawName:"v-model",value:t.formModel.time_in,expression:"formModel.time_in"}],staticClass:"my-input",attrs:{id:"time-in"},domProps:{value:t.formModel.time_in},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.toGateIn.apply(null,arguments)},change:t.hitungTarif,input:function(e){e.target.composing||t.$set(t.formModel,"time_in",e.target.value)}}})])],1),t._v(" "),t.gateInList.length>1?o("el-row",{directives:[{name:"show",rawName:"v-show",value:"xxxxx"==t.formModel.nomor_barcode,expression:"formModel.nomor_barcode == 'xxxxx'"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("GATE MASUK")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.gate_in_id,expression:"formModel.gate_in_id"}],staticClass:"my-input",attrs:{id:"gate-in"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"gate_in_id",e.target.multiple?o:o[0])},t.toSubmit]}},t._l(t.gateInList,(function(g){return o("option",{key:g.id,domProps:{value:g.id}},[t._v("\n\t\t\t\t\t\t"+t._s(g.shortcut_key)+" - "+t._s(g.nama)+"\n\t\t\t\t\t")])})),0)])],1):t._e(),t._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("TARIF")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.tarif,expression:"formModel.tarif"}],staticClass:"my-input bg-red-700 text-white",attrs:{disabled:""},domProps:{value:t.formModel.tarif},on:{input:function(e){e.target.composing||t.$set(t.formModel,"tarif",e.target.value)}}})])],1),t._v(" "),"xxxxx"==t.formModel.nomor_barcode?o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[t._v("TARIF + DENDA")])]),t._v(" "),o("el-col",{attrs:{span:14}},[o("input",{staticClass:"my-input bg-red-700 text-white",attrs:{disabled:""},domProps:{value:Number(t.formModel.tarif)+Number(t.formModel.denda)}})])],1):t._e(),t._v(" "),o("button",{staticClass:"my-big-btn",attrs:{id:"submit-btn"},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.nextBtn.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.nextBtn.apply(null,arguments)}],keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit(!1)},click:function(e){return t.submit(!1)}}},[t._v("\n\t\t\tBUKA GATE\n\t\t")]),t._v(" "),o("button",{staticClass:"my-big-btn",attrs:{id:"submit-btn1"},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.prevBtn.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.prevBtn.apply(null,arguments)}],keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.printLastTrx.apply(null,arguments)},click:t.printLastTrx}},[t._v("\n\t\t\t[F12] PRINT STRUK TRANSAKSI TERAKHIR\n\t\t")]),t._v(" "),o("el-row",{attrs:{gutter:10}},[t.HIDE_PRINT_REPORT?t._e():o("el-col",{attrs:{span:12}},[o("button",{staticClass:"my-big-btn",on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.printReport.apply(null,arguments)},click:t.printReport}},[t._v("\n\t\t\t\t\t[F10] PRINT LAPORAN\n\t\t\t\t")])]),t._v(" "),o("el-col",{attrs:{span:t.HIDE_PRINT_REPORT?24:12}},[o("button",{staticClass:"my-big-btn",on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.showManualOpenForm=!0},click:function(e){t.showManualOpenForm=!0}}},[t._v("\n\t\t\t\t\t[F11] BUKA GATE MANUAL\n\t\t\t\t")])])],1)],1),t._v(" "),t.snapshots.length>0?o("div",{staticClass:"ml-5"},t._l(t.snapshots,(function(s){return o("img",{key:s.id,staticClass:"mx-auto mb-1 border",staticStyle:{width:"500px"},attrs:{src:s.url}})})),0):t._e(),t._v(" "),o("TransactionFormBukaManual",{attrs:{show:t.showManualOpenForm},on:{close:function(e){t.showManualOpenForm=!1},"open-gate":function(e){return t.openGate(e)}}}),t._v(" "),o("el-dialog",{attrs:{center:"","show-close":!1,visible:!t.formModel.pos_id&&t.posList.length>1,title:"PILIH POS"}},[o("div",{staticClass:"mb-5"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.pos_id,expression:"formModel.pos_id"}],staticClass:"my-input",attrs:{id:"pos-id",placeholder:"Pilih Pos"},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"pos_id",e.target.multiple?o:o[0])}}},t._l(t.posList,(function(g){return o("option",{key:g.id,domProps:{value:g.id}},[t._v("\n\t\t\t\t\t"+t._s(g.nama)+"\n\t\t\t\t")])})),0)])])],1)}),[],!1,null,"5c282bb4",null);e.default=component.exports;installComponents(component,{TransactionFormBukaManual:o(409).default})}}]);