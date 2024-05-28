<template>
  <div>
    <ReportIncomeSummary />

    <!-- <el-card class="mb-3" :body-style="{ padding: '0' }">
			<table class="min-w-full">
				<thead>
					<tr>
						<th class="border-b px-3 py-1">AREA PARKIR</th>
						<th class="border-b px-3 py-1">KAPASITAS</th>
						<th class="border-b px-3 py-1">TERISI</th>
						<th class="border-b px-3 py-1">TERSEDIA</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="p in areaParkirList"
						:key="p.id"
						:class="{
							'bg-red-300': p.kapasitas == p.terisi,
							'bg-green-300': p.terisi < p.kapasitas,
						}"
					>
						<td class="border-b px-3 py-1">
							{{ p.nama }}
						</td>
						<td class="text-center border-b px-3 py-1">
							{{ p.kapasitas }}
						</td>
						<td class="text-center border-b px-3 py-1">{{ p.terisi }}</td>
						<td class="text-center border-b px-3 py-1">
							{{ p.kapasitas - p.terisi }}
						</td>
					</tr>
				</tbody>
			</table>
		</el-card> -->

    <el-row class="mb-3 border rounded-md p-3 bg-gray-200">
      <el-col :span="8">
        <div class="text-blue-700 text-2xl ml-3">LAPORAN</div>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-date-picker
          class="mr-3"
          @change="requestData"
          v-model="dateRange"
          format="dd/MMM/yyyy"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>

        <el-button type="primary" :icon="Printer" @click="printReport(null)">
          PRINT LAPORAN (A4)
        </el-button>
        <el-button
          type="primary"
          :icon="Printer"
          @click="showPrintDialog = true"
        >
          PRINT LAPORAN (STRUK)
        </el-button>
      </el-col>
    </el-row>

    <ReportChart :date="dateRange" />

    <el-row :gutter="15">
      <el-col :span="10">
        <!-- kendaraan masuk -->
        <el-card
          class="bg-purple-600 text-white mb-3"
          :body-style="{ padding: '0' }"
        >
          <template #header>Kendaraan Masuk</template>

          <table class="table min-w-full">
            <tbody>
              <tr v-for="(t, id) in vehicleIn" :key="id">
                <td class="border-b px-3 py-1">{{ t.gate }}</td>
                <td class="border-b px-3 py-1 text-right">
                  {{ t.total.toLocaleString("id-ID") }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <el-card
          class="bg-blue-600 text-white mb-3"
          :body-style="{ padding: '0' }"
        >
          <template #header>Transaksi</template>
          <table class="table min-w-full">
            <tbody>
              <tr v-for="(t, id) in transaction" :key="id">
                <td class="border-b px-3 py-1">{{ t.jenis_kendaraan }}</td>
                <td class="border-b px-3 py-1 text-right">
                  {{ t.total.toLocaleString("id-ID") }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <el-card
          class="bg-green-600 text-white mb-3"
          :body-style="{ padding: '0' }"
        >
          <template #header>Pendapatan</template>
          <table class="table min-w-full">
            <tbody>
              <tr v-for="(t, id) in income" :key="id">
                <td class="border-b px-3 py-1">{{ t.jenis_kendaraan }}</td>
                <td class="border-b px-3 py-1 text-right">
                  Rp.
                  {{
                    (Number(t.total) + Number(t.denda)).toLocaleString("id-ID")
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <!-- Kendaraan masih di dalam -->
        <el-card
          class="bg-orange-600 text-white mb-3"
          :body-style="{ padding: '0' }"
          v-if="parkedVehicle.length > 0"
        >
          <template #header>Kendaraan Masih Terparkir</template>
          <table class="table min-w-full">
            <thead>
              <tr>
                <th
                  v-for="(header, index) in Object.keys(parkedVehicle[0])"
                  :key="index"
                  class="border-b px-3 py-1"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, id) in parkedVehicle" :key="id">
                <td
                  class="border-b px-3 py-1 text-center"
                  v-for="(header, index) in Object.keys(parkedVehicle[id])"
                  :key="index"
                >
                  {{ t[header] }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card>
          <div v-html="report"></div>
        </el-card>
      </el-col>
    </el-row>

    <PrintDialog
      :show="showPrintDialog"
      @print="(printer_id) => printReport(printer_id)"
      @close="showPrintDialog = false"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
export default {
  data() {
    return {
      transaction: [],
      income: [],
      parkedVehicle: [],
      vehicleIn: [],
      showPrintDialog: false,
      dateRange: [moment().format("YYYY-MM-01"), moment().format("YYYY-MM-DD")],
      report: null,
    };
  },

  computed: {
    ...mapState(useWebsiteStore, { areaParkirList: "areaParkirList" }),
  },

  methods: {
    printReport(printer_id = null) {
      if (printer_id == null) {
        const params = new URLSearchParams();
        params.append("action", "print");
        params.append("dateRange[]", this.dateRange[0]);
        params.append("dateRange[]", this.dateRange[1]);

        window.open(
          `${this.$axios.defaults.baseURL}/api/report?${params}`,
          "_blank"
        );
      } else {
        this.$axios
          .$get(`api/report`, {
            params: {
              action: "print",
              printer_id,
              dateRange: this.dateRange,
            },
          })
          .then((r) => {
            ElMessage({
              message: r.message,
              type: "success",
            });
          })
          .finally(() => {
            this.showPrintDialog = false;
          });
      }
    },

    getTransaction() {
      this.$axios
        .$get("/api/getTransaction", { params: { dateRange: this.dateRange } })
        .then((response) => {
          this.transaction = response;
          let total = response
            .map((d) => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.transaction.push({ jenis_kendaraan: "TOTAL", total });
        });
    },

    getIncome() {
      this.$axios
        .$get("/api/getIncome", { params: { dateRange: this.dateRange } })
        .then((response) => {
          this.income = response;

          let total = response
            .map((d) => Number(d.total))
            .reduce((sum, total) => sum + Number(total), 0);

          let denda = response
            .map((d) => Number(d.denda))
            .reduce((sum, denda) => sum + Number(denda), 0);

          this.income.push({ jenis_kendaraan: "TOTAL", total, denda });
        });
    },

    async getParkedVehicle() {
      const data = await this.$axios.$get("/api/getParkedVehicle", {
        params: { dateRange: this.dateRange },
      });

      this.parkedVehicle = data;
    },

    getVehicleIn() {
      this.$axios
        .$get("/api/getVehicleIn", { params: { dateRange: this.dateRange } })
        .then((r) => {
          this.vehicleIn = r;
          let total = r
            .map((d) => d.total)
            .reduce((sum, total) => sum + parseInt(total), 0);
          this.vehicleIn.push({ gate: "TOTAL", total });
        });
    },

    getReport() {
      this.$axios
        .$get("/api/report", { params: { dateRange: this.dateRange } })
        .then((r) => (this.report = r));
    },

    async requestData() {
      await this.$store.dispatch("getAreaParkirList");
      this.getTransaction();
      this.getIncome();
      this.getParkedVehicle();
      this.getVehicleIn();
      this.getReport();
    },
  },

  mounted() {
    this.requestData();
  },
};
</script>
