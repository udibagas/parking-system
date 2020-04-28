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
          <el-col :span="12">
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
          <el-col :span="12">
            <!-- jumlah transaksi -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Transaksi berdasarkan jenis kendaraan</span>
              </div>
              <el-row v-for="(t, id) in transaction.vehicle_type" :key="id" :gutter="10">
                <el-col :span="12" class="col-label">{{t.group}}</el-col>
                <el-col :span="12" class="col-value">: {{t.total | formatNumber}}</el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="12">
            <!-- jumlah transaksi berdasarkan membership -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Transaksi berdasarkan membership</span>
              </div>
              <el-row v-for="(t, id) in transaction.is_member" :key="id" :gutter="10">
                <el-col :span="12" class="col-label">{{t.group}}</el-col>
                <el-col :span="12" class="col-value">: {{t.total | formatNumber}}</el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <!-- jumlah transaksi berdasarkan drive thru -->
            <el-card class="summary-container">
              <div slot="header">
                <span>Transaksi berdasarkan jenis</span>
              </div>
              <el-row v-for="(t, id) in transaction.drive_thru" :key="id" :gutter="10">
                <el-col :span="12" class="col-label">{{ t.group }}</el-col>
                <el-col :span="12" class="col-value">: {{t.total | formatNumber}}</el-col>
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
      transaction: {
        drive_thru: [],
        vehicle_type: [],
        is_member: []
      },
      income: [],
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
    getTransaction(group) {
      const params = { dateRange: this.dateRange, group };
      axios.get("getTransaction", { params }).then(r => {
        this.transaction[group] = r.data.map(d => {
          if (group == "is_member") {
            d.group = d.is_member ? "MEMBER" : "NON-MEMBER";
          }

          if (group == "drive_thru") {
            d.group = d.drive_thru ? "DRIVE THRU" : "REGULER";
          }

          if (group == "vehicle_type") {
            d.group = d.vehicle_type;
          }

          return d;
        });

        let total = r.data
          .map(d => d.total)
          .reduce((sum, total) => sum + parseInt(total), 0);
        this.transaction[group].push({ group: "TOTAL", total });
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
    getReport() {
      axios.get("report", { params: { dateRange: this.dateRange } }).then(r => {
        this.report = r.data;
      });
    },
    requestData() {
      this.getTransaction("vehicle_type");
      this.getTransaction("drive_thru");
      this.getTransaction("is_member");
      this.getIncome();
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
