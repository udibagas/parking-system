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

    <div class="mb-3 border rounded-md p-3 bg-gray-200 flex">
      <div class="text-blue-700 text-2xl ml-3 flex-grow">LAPORAN</div>
      <div class="mr-2">
        <el-date-picker
          class="mr-3"
          @change="requestData"
          v-model="dateRange"
          format="DD/MMM/YYYY"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>
      </div>

      <el-dropdown split-button type="primary">
        <el-icon class="mr-2">
          <Printer />
        </el-icon>
        PRINT LAPORAN

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :icon="Printer"
              @click.native.prevent="printReport(null)"
            >
              A4
            </el-dropdown-item>
            <el-dropdown-item
              :icon="Printer"
              @click.native.prevent="showPrintDialog = true"
            >
              STRUK
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <ReportChart :date="dateRange" />

    <el-row :gutter="15">
      <el-col :span="10">
        <!-- kendaraan masuk -->
        <el-card class="mb-3" :body-style="{ padding: '0' }">
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

        <el-card class="mb-3" :body-style="{ padding: '0' }">
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

        <el-card class="mb-3" :body-style="{ padding: '0' }">
          <template #header>Pendapatan</template>
          <table class="table min-w-full">
            <tbody>
              <tr v-for="(t, id) in income" :key="id">
                <td class="border-b px-3 py-1">{{ t.jenis_kendaraan }}</td>
                <td class="border-b px-3 py-1 text-right">
                  {{ toRupiah(Number(t.total) + Number(t.denda)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <!-- Kendaraan masih di dalam -->
        <el-card
          class="mb-3"
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
        <div style="padding: 0 20px" v-html="report"></div>
      </el-col>
    </el-row>

    <PrintDialog
      :show="showPrintDialog"
      @print="(printer_id) => printReport(printer_id)"
      @close="showPrintDialog = false"
    />
  </div>
</template>

<script setup>
import { Printer } from "@element-plus/icons-vue";
import moment from "moment";
const store = useWebsiteStore();
const { api, toRupiah } = useCrud();
const config = useRuntimeConfig();

const transaction = ref([]);
const income = ref([]);
const parkedVehicle = ref([]);
const vehicleIn = ref([]);
const showPrintDialog = ref(false);
const dateRange = ref([
  moment().format("YYYY-MM-01"),
  moment().format("YYYY-MM-DD"),
]);
const report = ref(null);
const areaParkirList = computed(() => store.areaParkirList);

const printReport = (printer_id = null) => {
  if (printer_id == null) {
    const params = new URLSearchParams();
    params.append("action", "print");
    params.append("dateRange[]", dateRange.value[0]);
    params.append("dateRange[]", dateRange.value[1]);

    window.open(`${config.public.apiBase}/api/report?${params}`, "_blank");
  } else {
    api(`api/report`, {
      params: {
        action: "print",
        printer_id,
        dateRange: {
          "dateRange[0]": dateRange.value[0],
          "dateRange[1]": dateRange.value[1],
        },
      },
    })
      .then((r) => {
        ElMessage({
          message: r.message,
          type: "success",
        });
      })
      .finally(() => {
        showPrintDialog.value = false;
      });
  }
};

const getTransaction = () => {
  api("/api/getTransaction", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((response) => {
    transaction.value = response;
    let total = response
      .map((d) => d.total)
      .reduce((sum, total) => sum + parseInt(total), 0);
    transaction.value.push({ jenis_kendaraan: "TOTAL", total });
  });
};

const getIncome = () => {
  api("/api/getIncome", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((response) => {
    income.value = response;

    let total = response
      .map((d) => Number(d.total))
      .reduce((sum, total) => sum + Number(total), 0);

    let denda = response
      .map((d) => Number(d.denda))
      .reduce((sum, denda) => sum + Number(denda), 0);

    income.value.push({ jenis_kendaraan: "TOTAL", total, denda });
  });
};

const getParkedVehicle = async () => {
  const data = await api("/api/getParkedVehicle", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  });

  parkedVehicle.value = data;
};

const getVehicleIn = () => {
  api("/api/getVehicleIn", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((r) => {
    vehicleIn.value = r;
    let total = r
      .map((d) => d.total)
      .reduce((sum, total) => sum + parseInt(total), 0);
    vehicleIn.value.push({ gate: "TOTAL", total });
  });
};

const getReport = () => {
  api("/api/report", {
    params: {
      "dateRange[0]": dateRange.value[0],
      "dateRange[1]": dateRange.value[1],
    },
  }).then((r) => (report.value = r));
};

const requestData = async () => {
  await store.getAreaParkirList();
  getTransaction();
  getIncome();
  getParkedVehicle();
  getVehicleIn();
  getReport();
};

onMounted(() => {
  requestData();
});
</script>
