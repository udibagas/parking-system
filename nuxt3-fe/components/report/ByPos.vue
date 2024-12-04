<template>
  <div style="margin-bottom: 10px">
    <h1 class="text-center">LAPORAN PER POS</h1>
    <el-select
      v-model="pos_id"
      placeholder="Pos"
      @change="requestData"
      style="width: 140px; margin-right: 10px"
    >
      <el-option
        v-for="pos in posList"
        :value="pos.id"
        :label="pos.nama"
        :key="pos.id"
      ></el-option>
    </el-select>

    <el-date-picker
      class="mr-3"
      @change="requestData"
      v-model="dateRange"
      format="DD/MMM/YYYY"
      value-format="YYYY-MM-DD"
      type="daterange"
      range-separator="To"
      start-placeholder="Dari"
      end-placeholder="Sampai"
      style="width: 240px; margin-right: 10px"
    >
    </el-date-picker>
    <el-button
      :icon="ElIconDownload"
      @click="download"
      type="primary"
      style="margin-right: 10px"
    >
      Download
    </el-button>

    <el-button :icon="ElIconPrinter" @click="printReportHarian" type="primary">
      PRINT LAPORAN HARIAN
    </el-button>
  </div>

  <el-table
    stripe
    border
    show-summary
    :data="tableData"
    :style="{ width: '100%' }"
  >
    <el-table-column prop="Tanggal" label="TANGGAL">
      <template #default="{ row }">
        {{ moment(row.Tanggal).format("DD/MMM/YY") }}
      </template>
    </el-table-column>

    <el-table-column prop="Shift" label="SHIFT" />
    <el-table-column prop="Petugas" label="PETUGAS" />

    <el-table-column
      v-for="(k, i) in jenisKendaraanList"
      :prop="`${k.nama}_count`"
      :label="`${k.nama}`"
      align="center"
      header-align="center"
    />

    <el-table-column
      prop="Jumlah"
      label="JUMLAH"
      align="center"
      header-align="center"
    />

    <el-table-column
      v-for="(k, i) in jenisKendaraanList"
      :prop="`${k.nama}_sum`"
      :label="`${k.nama}`"
      align="right"
      header-align="right"
    >
      <template #default="{ row }">
        {{ toRupiah(row[`${k.nama}_sum`]) }}
      </template>
    </el-table-column>

    <el-table-column
      prop="Total"
      label="TOTAL"
      align="right"
      header-align="right"
    >
      <template #default="{ row }">
        {{ toRupiah(row.Total) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import exportFromJSON from "export-from-json";
import moment from "moment";

const api = useApi();
const store = useWebsiteStore();
const posList = computed(() => store.posList);
const jenisKendaraanList = computed(() => store.jenisKendaraanList);

const tableData = ref([]);
const pos_id = ref(null);
const dateRange = ref([
  moment().format("YYYY-MM-01"),
  moment().format("YYYY-MM-DD"),
]);

onBeforeMount(async () => {
  await store.getPosList();
  await store.getJenisKendaraanList();
});

function requestData() {
  api("/api/reportPerPos", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
      pos_id: pos_id.value,
    },
  }).then((res) => {
    tableData.value = res;
  });
}

function download() {
  api("/api/reportPerPos", {
    params: {
      pos_id: pos_id.value,
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((data) => {
    exportFromJSON({ data, fileName: "Laporan Per Pos", exportType: "xls" });
  });
}

function printReportHarian() {
  api("api/printReportHarian", {
    params: {
      pos_id: pos_id.value,
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((r) => {
    ElMessage({
      message: "SILAKAN AMBIL SLIP",
      type: "success",
    });
  });
}
</script>
