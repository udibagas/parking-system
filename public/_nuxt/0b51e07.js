(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{619:function(r,t,e){"use strict";e.r(t);e(33),e(25),e(32),e(44),e(24),e(45);var o=e(17);e(13),e(51);function l(object,r){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(object,r).enumerable}))),t.push.apply(t,e)}return t}function n(r){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(r,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(source,t))}))}return r}var m={data:function(){return{url:"/api/setting",formErrors:{},loading:!1,formModel:n({},this.$store.state.setting)}},methods:{save:function(){var r=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(t){r.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),r.$store.dispatch("getSetting")})).catch((function(t){422==t.response.status?r.formErrors=t.response.data.errors:r.formErrors={}})).finally((function(){return r.loading=!1}))}}},_=e(37),component=Object(_.a)(m,(function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("div",[e("el-form",{attrs:{"label-position":"left","label-width":"250px"}},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-form-item",{class:r.formErrors.nama_lokasi?"is-error":"",attrs:{label:"Nama Lokasi"}},[e("el-input",{attrs:{placeholder:"Nama Lokasi"},model:{value:r.formModel.nama_lokasi,callback:function(t){r.$set(r.formModel,"nama_lokasi",t)},expression:"formModel.nama_lokasi"}}),r._v(" "),r.formErrors.nama_lokasi?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.nama_lokasi[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.alamat_lokasi?"is-error":"",attrs:{label:"Alamat Lokasi"}},[e("el-input",{attrs:{placeholder:"Alamat Lokasi",type:"textarea",rows:"3"},model:{value:r.formModel.alamat_lokasi,callback:function(t){r.$set(r.formModel,"alamat_lokasi",t)},expression:"formModel.alamat_lokasi"}}),r._v(" "),r.formErrors.alamat_lokasi?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.alamat_lokasi[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.info_tambahan_tiket?"is-error":"",attrs:{label:"Info Tambahan Tiket"}},[e("el-input",{attrs:{placeholder:"Info Tambahan Tiket",type:"textarea",rows:"3"},model:{value:r.formModel.info_tambahan_tiket,callback:function(t){r.$set(r.formModel,"info_tambahan_tiket",t)},expression:"formModel.info_tambahan_tiket"}}),r._v(" "),r.formErrors.info_tambahan_tiket?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.info_tambahan_tiket[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.plat_nomor_default?"is-error":"",attrs:{label:"Plat Nomor Default"}},[e("el-input",{attrs:{placeholder:"Plat Nomor Default"},model:{value:r.formModel.plat_nomor_default,callback:function(t){r.$set(r.formModel,"plat_nomor_default",t)},expression:"formModel.plat_nomor_default"}}),r._v(" "),r.formErrors.plat_nomor_default?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.plat_nomor_default[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.jml_kendaraan_per_kartu?"is-error":"",attrs:{label:"Jumlah Kendaraan Per Kartu"}},[e("el-input",{attrs:{type:"number",placeholder:"Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)"},model:{value:r.formModel.jml_kendaraan_per_kartu,callback:function(t){r.$set(r.formModel,"jml_kendaraan_per_kartu",t)},expression:"formModel.jml_kendaraan_per_kartu"}}),r._v(" "),r.formErrors.jml_kendaraan_per_kartu?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.jml_kendaraan_per_kartu[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.orientasi_kamera?"is-error":"",attrs:{label:"Orientasi Kamera"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Orientasi Kamera"},model:{value:r.formModel.orientasi_kamera,callback:function(t){r.$set(r.formModel,"orientasi_kamera",t)},expression:"formModel.orientasi_kamera"}},r._l(["LANDSCAPE","POTRAIT"],(function(r,i){return e("el-option",{key:i,attrs:{value:r,label:r}})})),1),r._v(" "),r.formErrors.orientasi_kamera?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.orientasi_kamera[0])+"\n\t\t\t\t\t")]):r._e()],1)],1),r._v(" "),e("el-col",{attrs:{span:12}},[e("el-form-item",{class:r.formErrors.must_checkout?"is-error":"",attrs:{label:"Mode Transaksi Member"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Transaksi Member"},model:{value:r.formModel.must_checkout,callback:function(t){r.$set(r.formModel,"must_checkout",t)},expression:"formModel.must_checkout"}},r._l(["Tidak harus check out","Harus check out"],(function(r,i){return e("el-option",{key:i,attrs:{value:i,label:r}})})),1),r._v(" "),r.formErrors.must_checkout?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.must_checkout[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.member_auto_open?"is-error":"",attrs:{label:"Mode Buka Gate Untuk Member"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Buka Gate Untuk Member"},model:{value:r.formModel.member_auto_open,callback:function(t){r.$set(r.formModel,"member_auto_open",t)},expression:"formModel.member_auto_open"}},r._l(["Ketik Plat Nomor (Buka oleh operator)","Tempel Kartu (Otomatis)"],(function(r,i){return e("el-option",{key:i,attrs:{value:i,label:r}})})),1),r._v(" "),r.formErrors.member_auto_open?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.member_auto_open[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.disable_plat_nomor?"is-error":"",attrs:{label:"Disable Plat Nomor di Pos Keluar"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Disable Plat Nomor di Pos Keluar"},model:{value:r.formModel.disable_plat_nomor,callback:function(t){r.$set(r.formModel,"disable_plat_nomor",t)},expression:"formModel.disable_plat_nomor"}},r._l(["Tidak","Ya"],(function(r,i){return e("el-option",{key:i,attrs:{value:!!i,label:r}})})),1),r._v(" "),r.formErrors.disable_plat_nomor?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.disable_plat_nomor[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.hapus_snapshot_dalam_hari?"is-error":"",attrs:{label:"Hapus Snapshot dalam x hari"}},[e("el-input",{attrs:{type:"number",placeholder:"Hapus Snapshot dalam x hari (0 untuk hapus manual)"},model:{value:r.formModel.hapus_snapshot_dalam_hari,callback:function(t){r.$set(r.formModel,"hapus_snapshot_dalam_hari",t)},expression:"formModel.hapus_snapshot_dalam_hari"}}),r._v(" "),r.formErrors.hapus_snapshot_dalam_hari?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.hapus_snapshot_dalam_hari[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:r.formErrors.hapus_transaksi_dalam_hari?"is-error":"",attrs:{label:"Hapus Transaksi dalam x hari"}},[e("el-input",{attrs:{type:"number",placeholder:"Hapus Transaksi dalam x hari"},model:{value:r.formModel.hapus_transaksi_dalam_hari,callback:function(t){r.$set(r.formModel,"hapus_transaksi_dalam_hari",t)},expression:"formModel.hapus_transaksi_dalam_hari"}}),r._v(" "),r.formErrors.hapus_transaksi_dalam_hari?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.hapus_transaksi_dalam_hari[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:{"is-error":r.formErrors.server_address},attrs:{label:"Server Address"}},[e("el-input",{attrs:{placeholder:"Server Address"},model:{value:r.formModel.server_address,callback:function(t){r.$set(r.formModel,"server_address",t)},expression:"formModel.server_address"}}),r._v(" "),r.formErrors.server_address?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.server_address[0])+"\n\t\t\t\t\t")]):r._e()],1),r._v(" "),e("el-form-item",{class:{"is-error":r.formErrors.id_pelanggan},attrs:{label:"ID Pelanggan"}},[e("el-input",{attrs:{placeholder:"ID Pelanggan"},model:{value:r.formModel.id_pelanggan,callback:function(t){r.$set(r.formModel,"id_pelanggan",t)},expression:"formModel.id_pelanggan"}}),r._v(" "),r.formErrors.id_pelanggan?e("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t\t"+r._s(r.formErrors.id_pelanggan[0])+"\n\t\t\t\t\t")]):r._e()],1)],1)],1)],1),r._v(" "),e("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",icon:"el-icon-success"},on:{click:r.save}},[r._v("\n\t\tSIMPAN\n\t")])],1)}),[],!1,null,null,null);t.default=component.exports}}]);