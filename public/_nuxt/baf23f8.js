(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{424:function(r,e,t){"use strict";t.r(e);t(10);var o={data:function(){return{formModel:{},formErrors:{},loading:!1}},methods:{requestData:function(){var r=this;axios.get("/setting").then((function(e){r.formModel=e.data})).catch((function(e){r.$message({message:e.response.data.message,type:"error",showClose:!0})}))},store:function(){var r=this;this.loading=!0,axios.post("/setting",this.formModel).then((function(e){r.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),r.requestData()})).catch((function(e){422==e.response.status&&(r.formErrors=e.response.data.errors),500==e.response.status&&(r.formErrors={},r.$message({message:e.response.data.message,type:"error",showClose:!0}))})).finally((function(){r.loading=!1}))},update:function(){var r=this;this.loading=!0,axios.put("/setting/"+this.formModel.id,this.formModel).then((function(e){r.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),r.requestData()})).catch((function(e){422==e.response.status&&(r.formErrors=e.response.data.errors),500==e.response.status&&(r.formErrors={},r.$message({message:e.response.data.message,type:"error",showClose:!0}))})).finally((function(){r.loading=!1}))}},mounted:function(){this.requestData()}},l=t(36),component=Object(l.a)(o,(function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",[t("el-form",{attrs:{"label-position":"left","label-width":"250px"}},[t("el-form-item",{class:r.formErrors.nama_lokasi?"is-error":"",attrs:{label:"Nama Lokasi"}},[t("el-input",{attrs:{placeholder:"Nama Lokasi"},model:{value:r.formModel.nama_lokasi,callback:function(e){r.$set(r.formModel,"nama_lokasi",e)},expression:"formModel.nama_lokasi"}}),r._v(" "),r.formErrors.nama_lokasi?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.nama_lokasi[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.alamat_lokasi?"is-error":"",attrs:{label:"Alamat Lokasi"}},[t("el-input",{attrs:{placeholder:"Alamat Lokasi",type:"textarea",rows:"3"},model:{value:r.formModel.alamat_lokasi,callback:function(e){r.$set(r.formModel,"alamat_lokasi",e)},expression:"formModel.alamat_lokasi"}}),r._v(" "),r.formErrors.alamat_lokasi?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.alamat_lokasi[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.info_tambahan_tiket?"is-error":"",attrs:{label:"Info Tambahan Tiket"}},[t("el-input",{attrs:{placeholder:"Info Tambahan Tiket",type:"textarea",rows:"3"},model:{value:r.formModel.info_tambahan_tiket,callback:function(e){r.$set(r.formModel,"info_tambahan_tiket",e)},expression:"formModel.info_tambahan_tiket"}}),r._v(" "),r.formErrors.info_tambahan_tiket?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.info_tambahan_tiket[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.plat_nomor_default?"is-error":"",attrs:{label:"Plat Nomor Default"}},[t("el-input",{attrs:{placeholder:"Plat Nomor Default"},model:{value:r.formModel.plat_nomor_default,callback:function(e){r.$set(r.formModel,"plat_nomor_default",e)},expression:"formModel.plat_nomor_default"}}),r._v(" "),r.formErrors.plat_nomor_default?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.plat_nomor_default[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.jml_kendaraan_per_kartu?"is-error":"",attrs:{label:"Jumlah Kendaraan Per Kartu"}},[t("el-input",{attrs:{type:"number",placeholder:"Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)"},model:{value:r.formModel.jml_kendaraan_per_kartu,callback:function(e){r.$set(r.formModel,"jml_kendaraan_per_kartu",e)},expression:"formModel.jml_kendaraan_per_kartu"}}),r._v(" "),r.formErrors.jml_kendaraan_per_kartu?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.jml_kendaraan_per_kartu[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.must_checkout?"is-error":"",attrs:{label:"Mode Transaksi Member"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Transaksi Member"},model:{value:r.formModel.must_checkout,callback:function(e){r.$set(r.formModel,"must_checkout",e)},expression:"formModel.must_checkout"}},r._l(["Tidak harus check out","Harus check out"],(function(r,i){return t("el-option",{key:i,attrs:{value:i,label:r}})})),1),r._v(" "),r.formErrors.must_checkout?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.must_checkout[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.member_auto_open?"is-error":"",attrs:{label:"Mode Buka Gate Untuk Member"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Buka Gate Untuk Member"},model:{value:r.formModel.member_auto_open,callback:function(e){r.$set(r.formModel,"member_auto_open",e)},expression:"formModel.member_auto_open"}},r._l(["Ketik Plat Nomor (Buka oleh operator)","Tempel Kartu (Otomatis)"],(function(r,i){return t("el-option",{key:i,attrs:{value:i,label:r}})})),1),r._v(" "),r.formErrors.member_auto_open?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.member_auto_open[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.disable_plat_nomor?"is-error":"",attrs:{label:"Disable Plat Nomor di Pos Keluar"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Disable Plat Nomor di Pos Keluar"},model:{value:r.formModel.disable_plat_nomor,callback:function(e){r.$set(r.formModel,"disable_plat_nomor",e)},expression:"formModel.disable_plat_nomor"}},r._l(["Tidak","Ya"],(function(r,i){return t("el-option",{key:i,attrs:{value:!!i,label:r}})})),1),r._v(" "),r.formErrors.disable_plat_nomor?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.disable_plat_nomor[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.hapus_snapshot_dalam_hari?"is-error":"",attrs:{label:"Hapus Snapshot dalam x hari"}},[t("el-input",{attrs:{type:"number",placeholder:"Hapus Snapshot dalam x hari (0 untuk hapus manual)"},model:{value:r.formModel.hapus_snapshot_dalam_hari,callback:function(e){r.$set(r.formModel,"hapus_snapshot_dalam_hari",e)},expression:"formModel.hapus_snapshot_dalam_hari"}}),r._v(" "),r.formErrors.hapus_snapshot_dalam_hari?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.hapus_snapshot_dalam_hari[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.hapus_transaksi_dalam_hari?"is-error":"",attrs:{label:"Hapus Transaksi dalam x hari"}},[t("el-input",{attrs:{type:"number",placeholder:"Hapus Transaksi dalam x hari"},model:{value:r.formModel.hapus_transaksi_dalam_hari,callback:function(e){r.$set(r.formModel,"hapus_transaksi_dalam_hari",e)},expression:"formModel.hapus_transaksi_dalam_hari"}}),r._v(" "),r.formErrors.hapus_transaksi_dalam_hari?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.hapus_transaksi_dalam_hari[0])+"\n\t\t\t")]):r._e()],1)],1),r._v(" "),t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(){r.formModel.id?r.update():r.store()}}},[r._v("SIMPAN")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);