<template>
  <div>
    <form class="flex justify-content-end mb-3" @submit.prevent>
      <el-button
        size="small"
        type="primary"
        :icon="Plus"
        @click="openForm({})"
        class="mr-2"
      >
        TRANSAKSI MANUAL
      </el-button>
      <div class="mr-2">
        <el-date-picker
          size="small"
          @change="requestData"
          v-model="filters.dateRange"
          format="DD-MMM-YYYY HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="Dari"
          end-placeholder="Sampai"
        >
        </el-date-picker>
      </div>

      <el-tooltip
        v-if="user.role == 1"
        class="item"
        effect="dark"
        content="Set kendaraan sudah keluar untuk waktu terpilih"
        placement="bottom"
      >
        <el-button
          size="small"
          type="danger"
          :icon="Finished"
          @click="setSudahKeluarSemua"
          class="mr-2"
        ></el-button>
      </el-tooltip>

      <el-input
        size="small"
        v-model="keyword"
        placeholder="Cari"
        :prefix-icon="Search"
        :clearable="true"
        @change="searchData"
        style="width: 150px"
      >
      </el-input>
    </form>

    <el-table
      :data="tableData.data"
      stripe
      @row-dblclick="
        (row) => {
          trx = row;
          showTrxDetail = true;
        }
      "
      @filter-change="filterChange"
      height="calc(100vh - 280px)"
      v-loading="loading"
      @sort-change="sortChange"
    >
      <el-table-column
        label="No. Tiket"
        sortable="custom"
        :filters="
          jenisKendaraanList.map((v) => ({ value: v.nama, text: v.nama }))
        "
        column-key="jenis_kendaraan"
        min-width="150"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <strong>{{ row.nomor_barcode }}</strong
          ><br />
          {{ row.jenis_kendaraan }}
          {{ row.plat_nomor ? `- ${row.plat_nomor}` : "" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="time_in"
        label="Masuk"
        sortable="custom"
        show-overflow-tooltip
        min-width="140px"
        column-key="gate_in_id"
        :filters="gateInList.map((g) => ({ value: g.id, text: g.nama }))"
      >
        <template #default="{ row }">
          {{ moment(row.time_in).format("DD/MMM/YY HH:mm") }} <br />
          {{ row.gate_in.nama }}
        </template>
      </el-table-column>

      <el-table-column
        prop="time_out"
        label="Keluar"
        sortable="custom"
        show-overflow-tooltip
        min-width="140px"
        column-key="gate_out_id"
        :filters="gateOutList.map((g) => ({ value: g.id, text: g.nama }))"
      >
        <template #default="{ row }">
          {{
            row.time_out ? moment(row.time_out).format("DD/MMM/YY HH:mm") : ""
          }}
          <br />
          {{ row.gate_out ? row.gate_out.nama : "-" }}
        </template>
      </el-table-column>

      <el-table-column
        label="Durasi"
        show-overflow-tooltip
        prop="parking_transactions.tarif"
        sortable="custom"
        min-width="120px"
      >
        <template #default="{ row }">
          {{ row.durasi }}
          <div v-if="user.role == 1" style="font-weight: bold">
            {{ toRupiah(row.tarif) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="user.role == 1"
        prop="denda"
        label="Denda"
        align="right"
        column-key="denda"
        :filters="[
          { value: 'Y', text: 'YA' },
          { value: 'T', text: 'TIDAK' },
        ]"
        :filter-multiple="false"
        header-align="right"
        min-width="100px"
      >
        <template #default="{ row }">
          {{ toRupiah(row.denda) }}
        </template>
      </el-table-column>

      <el-table-column
        label="Member"
        sortable="custom"
        show-overflow-tooltip
        min-width="120"
      >
        <template #default="{ row }">
          <strong> {{ row.member ? row.member.nama : "" }} </strong> <br />
          {{ row.nomor_kartu }}
        </template>
      </el-table-column>

      <el-table-column
        prop="operator"
        label="Operator"
        show-overflow-tooltip
        min-width="90"
      ></el-table-column>

      <el-table-column
        label="Shift"
        prop="shift.nama"
        column-key="shift_id"
        min-width="80"
        :filters="shiftList.map((s) => ({ value: s.id, text: s.nama }))"
      >
      </el-table-column>

      <el-table-column
        label="Edit"
        align="center"
        header-align="center"
        column-key="edit"
        :filters="[
          { value: 'Y', text: 'YA' },
          { value: 'T', text: 'TIDAK' },
        ]"
        :filter-multiple="false"
        min-width="100px"
      >
        <template #default="{ row }">
          {{ row.edit ? "YA" : "TIDAK" }} <br />
          {{ row.edit_by }}
        </template>
      </el-table-column>

      <el-table-column
        label="Manual"
        align="center"
        header-align="center"
        column-key="manual"
        :filters="[
          { value: 'Y', text: 'YA' },
          { value: 'T', text: 'TIDAK' },
        ]"
        :filter-multiple="false"
        min-width="100px"
      >
        <template #default="{ row }">
          {{ row.manual ? "YA" : "TIDAK" }}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        width="60px"
        align="center"
        header-align="center"
      >
        <template #header>
          <el-button link @click="refreshData" :icon="Refresh"> </el-button>
        </template>
        <template #default="{ row }">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-icon>
                <MoreFilled />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :icon="ZoomIn"
                  @click.native.prevent="
                    () => {
                      trx = row;
                      showTrxDetail = true;
                    }
                  "
                >
                  Lihat Detail
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Check"
                  v-if="!row.time_out && user.role == 1"
                  @click.native.prevent="setSudahKeluar(row.id)"
                >
                  Set Sudah Keluar
                </el-dropdown-item>

                <el-dropdown-item
                  :icon="Edit"
                  v-if="!row.is_member && !row.edit && !row.manual"
                  @click.native.prevent="
                    () => {
                      formModel = { ...row };
                      formErrors = {};
                      showForm = true;
                    }
                  "
                >
                  Edit
                </el-dropdown-item>

                <el-dropdown-item
                  :icon="Printer"
                  v-if="!row.is_member && !!row.time_out"
                  @click.native.prevent="printTicket(row.id)"
                >
                  Print Tiket Keluar
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <br />

    <el-pagination
      small
      background
      :current-page="page"
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="tableData.total"
    ></el-pagination>

    <TransactionDetailTransaksi
      v-if="trx"
      :trx="trx"
      :show="showTrxDetail"
      @close="showTrxDetail = false"
    />

    <TransactionFormTransaksiManual
      v-if="showForm"
      :show="showForm"
      :model="formModel"
      @close="showForm = false"
      @reload="requestData"
    />
  </div>
</template>

<script setup>
import moment from "moment";
const store = useWebsiteStore();
const auth = useSanctumAuth();
import {
  Refresh,
  Plus,
  Edit,
  MoreFilled,
  ZoomIn,
  Check,
  Printer,
  Finished,
  Search,
} from "@element-plus/icons-vue";

const {
  api,
  showForm,
  formErrors,
  formModel,
  page,
  pageSize,
  tableData,
  loading,
  filters,
  keyword,
  openForm,
  currentChange,
  sizeChange,
  sortChange,
  filterChange,
  requestData,
  searchData,
  refreshData,
  toRupiah,
} = useCrud("/api/parkingTransaction");

const jenisKendaraanList = computed(() => store.jenisKendaraanList);
const gateInList = computed(() => store.gateInList);
const gateOutList = computed(() => store.gateOutList);
const shiftList = computed(() => store.shiftList);
const user = computed(() => auth.user.value);

const trx = ref(null);
const showTrxDetail = ref(null);

onBeforeMount(() => {
  store.getShiftList();
  store.getPos();
});

onMounted(() => {
  filters.value.dateRange = [];
  requestData();
});

const setSudahKeluar = (id) => {
  ElMessageBox.confirm("Anda yakin?", "Confirm", { type: "warning" })
    .then(() => {
      return api(`/api/parkingTransaction/setSudahKeluar/${id}`, {
        method: "PUT",
      });
    })
    .then((r) => {
      ElMessage({
        message: r.message,
        type: "success",
      });
      requestData();
    });
};

const setSudahKeluarSemua = () => {
  ElMessageBox.confirm("Anda yakin?", "Confirm", { type: "warning" })
    .then(() => {
      return api("/api/parkingTransaction/setSudahKeluarSemua", {
        method: "PUT",
        body: {
          "dateRange[0]": dateRange.value[0],
          "dateRange[1]": dateRange.value[1],
        },
      });
    })
    .then((r) => {
      ElMessage({
        message: r.message,
        type: "success",
      });
      requestData();
    })
    .catch((e) => console.log(e));
};

const printTicket = (id) => {
  api(`/api/parkingTransaction/printTicketOut/${id}`, { method: "POST" }).then(
    (r) => {
      ElMessage({
        message: r.message,
        type: "success",
      });
    }
  );
};
</script>
