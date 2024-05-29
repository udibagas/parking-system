<template>
  <div v-loading="loading">
    <el-form inline style="text-align: right">
      <el-form-item>
        <el-date-picker
          size="small"
          @change="requestData"
          v-model="dateRange"
          format="DD/MMM/YYYY"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="Dari tanggal"
          end-placeholder="Sampai tanggal"
          style="margin-top: 5px; width: 250px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          :icon="Printer"
          @click="showPrintDialog = true"
        >
          PRINT LAPORAN
        </el-button>
      </el-form-item>
    </el-form>

    <el-table show-summary stripe :data="report" :summary-method="getSummaries">
      <el-table-column label="Tanggal" header-align="center" align="center">
        <template #default="{ row }">
          {{ moment(row.tanggal).format("DD/MMM/YYYY") }}
        </template>
      </el-table-column>
      <el-table-column label="Jumlah" header-align="center" align="center">
        <template #default="{ row }">
          {{ row.jumlah.toLocaleString("id-ID") }}
        </template>
      </el-table-column>
      <el-table-column label="Pendapatan" header-align="right" align="right">
        <template #default="{ row }">
          {{ toRupiah(row.pendapatan) }}
        </template>
      </el-table-column>
    </el-table>

    <PrintDialog
      :show="showPrintDialog"
      @print="(printer_id) => printReport(printer_id)"
      @close="showPrintDialog = false"
    />
  </div>
</template>

<script setup>
import moment from "moment";
import { Printer } from "@element-plus/icons-vue";

const api = useApi();

const dateRange = ref([
  moment().format("YYYY-MM-01"),
  moment().format("YYYY-MM-DD"),
]);
const report = ref([]);
const loading = ref(false);
const showPrintDialog = ref(false);

const requestData = () => {
  let params = { dateRange: this.dateRange };
  this.loading = true;

  api("/api/memberRenewal/report", { params })
    .then((r) => (this.report = r))
    .finally(() => (this.loading = false));
};

const printReport = (printer_id) => {
  let params = { dateRange: this.dateRange, action: "print", printer_id };
  this.loading = true;

  api("/api/memberRenewal/report", { params })
    .then((r) => {
      ElMessage({
        message: "Silakan ambil slip",
        type: "success",
        showClose: false,
      });
    })
    .finally(() => {
      this.loading = false;
      this.showPrintDialog = false;
    });
};

const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "TOTAL";
      return;
    }

    if (index === 1) {
      sums[index] = this.report.reduce((prev, curr) => {
        return prev + Number(curr.jumlah);
      }, 0);
    }

    if (index === 2) {
      let pendapatan = this.report.reduce((prev, curr) => {
        return prev + Number(curr.pendapatan);
      }, 0);
      sums[index] = toRupiah(pendapatan);
    }
  });

  return sums;
};

onMounted(() => {
  requestData();
});
</script>
