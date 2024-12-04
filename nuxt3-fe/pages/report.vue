<template>
  <div class="flex" style="padding-bottom: 10px; margin-bottom: 40px">
    <div class="ml-3 flex-grow" style="font-size: 1.3rem; font-weight: bold">
      LAPORAN
    </div>
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

  <div style="padding: 0 20px" v-html="report"></div>

  <ReportByPos />

  <PrintDialog
    :show="showPrintDialog"
    @print="(printer_id) => printReport(printer_id)"
    @close="showPrintDialog = false"
  />
</template>

<script setup>
import { Printer } from "@element-plus/icons-vue";
import moment from "moment";
const store = useWebsiteStore();
const api = useApi();
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
        "dateRange[0]": dateRange.value[0],
        "dateRange[1]": dateRange.value[1],
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
