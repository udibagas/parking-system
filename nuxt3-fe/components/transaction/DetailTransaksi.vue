<template>
  <el-dialog
    width="80%"
    :visible.sync="show"
    center
    title="DETAIL TRANSAKSI"
    :before-close="
      (done) => {
        $emit('close');
      }
    "
  >
    <div class="flex flex-row">
      <table class="table-auto" style="min-width: 360px">
        <tbody>
          <tr>
            <td
              style="width: 150px"
              class="border bg-blue-700 text-white px-4 py-1"
            >
              Nomor Barcode
            </td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.nomor_barcode }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">
              Jenis Kendaraan
            </td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.jenis_kendaraan }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Plat Nomor</td>
            <td class="border bg-blue-100 px-4 py-1">{{ trx.plat_nomor }}</td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Member</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.is_member ? trx.member.nama : "Tidak" }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Nomor Kartu</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.nomor_kartu }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Gate Masuk</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.gate_in ? trx.gate_in.nama : "" }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Gate Keluar</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ trx.gate_out ? trx.gate_out.nama : "" }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Waktu Masuk</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ moment(trx.time_in).format("DD-MMM-YYYY HH:mm:ss") }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">
              Waktu Keluar
            </td>
            <td class="border bg-blue-100 px-4 py-1">
              {{
                trx.time_out
                  ? moment(trx.time_out).format("DD-MMM-YYYY HH:mm:ss")
                  : ""
              }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Durasi</td>
            <td class="border bg-blue-100 px-4 py-1">{{ trx.durasi }}</td>
          </tr>
          <tr v-if="$auth.user.role == 1">
            <td class="border bg-blue-700 text-white px-4 py-1">Tarif</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ toRupiah(trx.tarif) }}
            </td>
          </tr>
          <tr v-if="$auth.user.role == 1">
            <td class="border bg-blue-700 text-white px-4 py-1">Denda</td>
            <td class="border bg-blue-100 px-4 py-1">
              {{ toRupiah(trx.denda) }}
            </td>
          </tr>
          <tr>
            <td class="border bg-blue-700 text-white px-4 py-1">Operator</td>
            <td class="border bg-blue-100 px-4 py-1">{{ trx.operator }}</td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="trx.snapshots"
        :class="{
          'ml-3': true,
          'flex-grow': true,
          flex: setting.orientasi_kamera == 'POTRAIT',
        }"
        style="width: 100%"
      >
        <div
          class="mb-1"
          style="width: 100%"
          v-for="snapshot in trx.snapshots"
          :key="snapshot.id"
        >
          <img :src="snapshot.url" style="width: 100%" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
const { trx, show } = defineProps(["trx", "show"]);
const { setting } = useWebsiteStore();
</script>
