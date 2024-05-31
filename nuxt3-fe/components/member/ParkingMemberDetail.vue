<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <table class="table min-w-full">
        <tbody>
          <tr>
            <td class="border py-1 px-3" style="width: 180px">Group</td>
            <td class="border py-1 px-3">
              {{ member.group.nama }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Nama</td>
            <td class="border py-1 px-3">
              {{ member.nama }}
            </td>
          </tr>
          <!-- <tr>
						<td class="border py-1 px-3">Alamat Email</td>
						<td class="border  py-1 px-3">{{ member.email }}</td>
					</tr> -->
          <tr>
            <td class="border py-1 px-3">Nomor HP</td>
            <td class="border py-1 px-3">
              {{ member.phone }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Nomor Kartu</td>
            <td class="border py-1 px-3">
              {{ member.nomor_kartu }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Jenis</td>
            <td class="border py-1 px-3">
              {{ member.berbayar ? "Berbayar" : "Gratis" }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Tanggal Daftar</td>
            <td class="border py-1 px-3">
              {{ member.register_date }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Tanggal Kedaluarsa</td>
            <td class="border py-1 px-3">
              {{ member.expiry_date }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Siklus Pembayaran</td>
            <td class="border py-1 px-3">
              {{ member.siklus_pembayaran }}
              {{ getSiklus(member.siklus_pembayaran_unit) }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Tarif</td>
            <td class="border py-1 px-3">
              {{ toRupiah(member.tarif) }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Terakhir Masuk</td>
            <td class="border py-1 px-3">
              {{
                member.last_in
                  ? moment(member.last_in).format("DD-MMM-YYYY HH:mm:ss")
                  : ""
              }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Terakhir Keluar</td>
            <td class="border py-1 px-3">
              {{
                member.last_out
                  ? moment(member.last_out).format("DD-MMM-YYYY HH:mm:ss")
                  : ""
              }}
            </td>
          </tr>
          <tr>
            <td class="border py-1 px-3">Status</td>
            <td class="border py-1 px-3">
              {{ member.status ? "Aktif" : "Nonaktif" }}
            </td>
          </tr>
        </tbody>
      </table>
    </el-col>
    <el-col :span="16">
      <el-tabs>
        <el-tab-pane label="KENDARAAN">
          <el-table :data="member.vehicles">
            <el-table-column
              prop="jenis_kendaraan"
              label="Jenis Kendaraan"
            ></el-table-column>
            <el-table-column
              prop="plat_nomor"
              label="Plat Nomor"
            ></el-table-column>
            <el-table-column prop="merk" label="Merk"></el-table-column>
            <el-table-column
              prop="tipe"
              label="Tipe"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="tahun" label="Tahun"></el-table-column>
            <el-table-column prop="warna" label="Warna"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import moment from "moment";
const { member } = defineProps(["member"]);
const { toRupiah } = useCrud();

const getSiklus = (k) => {
  return [
    { days: "hari" },
    { weeks: "minggu" },
    { months: "bulan" },
    { years: "tahun" },
  ][k];
};
</script>
