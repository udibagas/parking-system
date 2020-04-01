<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-page-header @back="$emit('back')" content="LAPORAN"></el-page-header>
      </el-col>
      <el-col :span="16" style="text-align:right">
        Pilih Tanggal :
        <el-date-picker
          size="small"
          @change="requestData"
          v-model="dateRange"
          format="dd/MMM/yyyy"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        ></el-date-picker>

        <el-button
          size="small"
          type="primary"
          icon="el-icon-printer"
          @click="printReport"
        >PRINT LAPORAN</el-button>
      </el-col>
    </el-row>

    <br />

    <el-tabs type="card">
      <el-tab-pane lazy label="RANGKUMAN">
        <el-row :gutter="10">
          <el-col :span="6">
            <!-- kendaraan masuk -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Kendaraan Masuk</span>
              </div>
              <el-row v-for="(t, id) in vehicleIn" :key="id" :gutter="10">
                <el-col :span="12" class="col-label">{{t.gate}}</el-col>
                <el-col :span="12" class="col-value">: {{t.total | formatNumber}}</el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="6">
            <!-- jumlah transaksi -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Transaksi</span>
              </div>
              <el-row v-for="(t, id) in transaction" :key="id" :gutter="10">
                <el-col :span="12" class="col-label">{{t.vehicle_type}}</el-col>
                <el-col :span="12" class="col-value">: {{t.total | formatNumber}}</el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="6">
            <!-- total tarif -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Pendapatan</span>
              </div>
              <el-row v-for="(t, id) in income" :key="id">
                <el-col :span="12" class="col-label">{{t.vehicle_type}}</el-col>
                <el-col :span="12" class="col-value">: Rp. {{t.total | formatNumber}}</el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane lazy label="PENDAPATAN">
        <div style="height:calc(100vh - 300px);overflow:auto;" v-html="report"></div>
      </el-tab-pane>
      <el-tab-pane lazy label="LOG USER">
        <UserLog :range="dateRange" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserLog from "./UserLog";

export default {
  components: { UserLog },
  data() {
    return {
      transaction: [],
      income: [],
      parkedVehicle: [],
      vehicleIn: [],
      dateRange: [moment().format("YYYY-MM-01"), moment().format("YYYY-MM-DD")],
      report: null
    };
  },
  methods: {
    printReport() {
      window.open(
        BASE_URL +
          "/report?action=print&dateRange[]=" +
          this.dateRange[0] +
          "&dateRange[1]=" +
          this.dateRange[1] +
          "&token=" +
          this.$store.state.token,
        "_blank"
      );
    },
    getTransaction() {
      axios
        .get("getTransaction", { params: { dateRange: this.dateRange } })
        .then(r => {
          this.transaction = r.data;
          let total = r.data
            .map(d => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.transaction.push({ vehicle_type: "TOTAL", total });
        });
    },
    getIncome() {
      axios
        .get("getIncome", { params: { dateRange: this.dateRange } })
        .then(r => {
          this.income = r.data;
          let total = r.data
            .map(d => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.income.push({ vehicle_type: "TOTAL", total });
        });
    },
    getParkedVehicle() {
      axios
        .get("getParkedVehicle", { params: { dateRange: this.dateRange } })
        .then(r => {
          this.parkedVehicle = r.data;
          let total = r.data
            .map(d => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.parkedVehicle.push({ vehicle_type: "TOTAL", total });
        });
    },
    getVehicleIn() {
      axios
        .get("getVehicleIn", { params: { dateRange: this.dateRange } })
        .then(r => {
          this.vehicleIn = r.data;
          let total = r.data
            .map(d => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.vehicleIn.push({ gate: "TOTAL", total });
        });
    },
    getReport() {
      axios.get("report", { params: { dateRange: this.dateRange } }).then(r => {
        this.report = r.data;
      });
    },
    requestData() {
      this.getTransaction();
      this.getIncome();
      this.getParkedVehicle();
      this.getVehicleIn();
      this.getReport();
    }
  },
  mounted() {
    this.requestData();
  }
};
</script>

<style lang="scss" scoped>
.summary-container {
  height: 200px;
}

.summary-info {
  font-size: 30px;
}

.col-value,
.col-label {
  font-size: 16px;
  // color: #fff;
}
</style>
