(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{410:function(t,e,r){"use strict";r.r(e);var l={props:["member"],filters:{getSiklus:function(t){return[{days:"hari"},{weeks:"minggu"},{months:"bulan"},{years:"tahun"}][t]}}},n=r(22),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:8}},[r("table",{staticClass:"table min-w-full"},[r("tbody",[r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3",staticStyle:{width:"180px"}},[t._v("\n\t\t\t\t\t\t\tGroup\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.group.nama)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nama")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.nama)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nomor HP")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.phone)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nomor Kartu")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.nomor_kartu)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Jenis")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.berbayar?"Berbayar":"Gratis")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTanggal Daftar\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.register_date)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTanggal Kedaluarsa\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.expiry_date)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tSiklus Pembayaran\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.siklus_pembayaran)+"\n\t\t\t\t\t\t\t"+t._s(t.$store.state.siklus.find((function(s){return s.value==t.member.siklus_pembayaran_unit})).label)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Tarif")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tRp "+t._s(t.$decimal(t.member.tarif))+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTerakhir Masuk\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.last_in?t.$moment(t.member.last_in).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTerakhir Keluar\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.last_out?t.$moment(t.member.last_out).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Status")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.status?"Aktif":"Nonaktif")+"\n\t\t\t\t\t\t")])])])])]),t._v(" "),r("el-col",{attrs:{span:16}},[r("el-tabs",[r("el-tab-pane",{attrs:{label:"KENDARAAN"}},[r("el-table",{attrs:{data:t.member.vehicles}},[r("el-table-column",{attrs:{prop:"jenis_kendaraan",label:"Jenis Kendaraan"}}),t._v(" "),r("el-table-column",{attrs:{prop:"plat_nomor",label:"Plat Nomor"}}),t._v(" "),r("el-table-column",{attrs:{prop:"merk",label:"Merk"}}),t._v(" "),r("el-table-column",{attrs:{prop:"tipe",label:"Tipe","show-overflow-tooltip":""}}),t._v(" "),r("el-table-column",{attrs:{prop:"tahun",label:"Tahun"}}),t._v(" "),r("el-table-column",{attrs:{prop:"warna",label:"Warna"}})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);