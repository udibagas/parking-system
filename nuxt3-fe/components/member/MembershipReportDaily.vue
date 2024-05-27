<template>
  <div v-loading="loading">
    <el-form inline style="text-align: right">
      <el-form-item>
        <el-date-picker
          size="small"
          @change="requestData"
          v-model="date"
          format="dd/MMM/yyyy"
          value-format="yyyy-MM-dd"
          type="date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          :icon="Printer"
          @click="showPrintDialog = true"
          >PRINT LAPORAN</el-button
        >
      </el-form-item>
    </el-form>

    <el-table show-summary stripe :data="report" :summary-method="getSummaries">
      <el-table-column label="Tanggal" header-align="center" align="center">
        <template #default="{ row }">
          {{ moment(row.created_at).format("DD-MMM-YYYY HH:mm") }}
        </template>
      </el-table-column>
      <el-table-column prop="member.nama" label="Nama"></el-table-column>
      <el-table-column
        prop="member.nomor_kartu"
        label="Nomor Kartu"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column label="Plat Nomor" header-align="center" align="center">
        <template #default="{ row }">
          {{ row.member.vehicles.map((v) => v.plate_number).join(", ") }}
        </template>
      </el-table-column>
      <el-table-column label="Jumlah" header-align="right" align="right">
        <template #default="{ row }">
          Rp. {{ row.jumlah.toLocaleString("id-ID") }}
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

<script>
export default {
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      report: [],
      loading: false,
      showPrintDialog: false,
    };
  },

  methods: {
    requestData() {
      let params = { date: this.date };
      this.loading = true;

      this.$axios
        .$get("/api/memberRenewal/reportDaily", { params })
        .then((r) => (this.report = r))
        .finally(() => (this.loading = false));
    },

    printReport(printer_id) {
      let params = { date: this.date, action: "print", printer_id };
      this.loading = true;

      this.$axios
        .$get("/api/memberRenewal/reportDaily", { params })
        .then((r) => {
          this.$message({
            message: "Silakan ambil slip",
            type: "success",
            showClose: false,
          });
        })
        .finally(() => {
          this.loading = false;
          this.showPrintDialog = false;
        });
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "TOTAL";
          return;
        }

        if (index === 1 || index === 2 || index === 3) {
          sums[index] = "";
          return;
        }

        if (index === 4) {
          let jumlah = this.report.reduce((prev, curr) => {
            return prev + Number(curr.jumlah);
          }, 0);
          sums[index] = "Rp " + jumlah.toLocaleString("id-ID");
        }
      });

      return sums;
    },
  },

  mounted() {
    this.requestData();
  },
};
</script>
