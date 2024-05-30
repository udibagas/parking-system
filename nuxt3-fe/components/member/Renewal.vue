<template>
  <div>
    <form
      @submit.native.prevent
      class="flex justify-content-end align-item-center mb-3"
    >
      <el-button
        :icon="Plus"
        size="small"
        @click="openForm({})"
        type="primary"
        class="mr-2"
      >
        INPUT PEMBAYARAN KEANGGOTAAN
      </el-button>
      <div>
        <el-date-picker
          size="small"
          @change="requestData"
          v-model="filters.dateRange"
          format="DD/MMM/YYYY"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="Dari tgl"
          end-placeholder="Sampai tgl"
          class="mr-2"
        >
        </el-date-picker>
      </div>

      <el-input
        size="small"
        v-model="keyword"
        placeholder="Cari"
        :prefix-icon="Search"
        clearable
        @change="searchData"
        style="width: 200px"
      >
      </el-input>
    </form>

    <el-table
      :data="tableData.data"
      stripe
      height="calc(100vh - 280px)"
      v-loading="loading"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column
        prop="created_at"
        label="Tanggal Trx"
        sortable="custom"
        min-width="180"
      >
        <template #default="{ row }">
          {{ moment(row.created_at).format("DD-MMM-YYYY HH:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="nama_member"
        label="Nama"
        sortable="custom"
        show-overflow-tooltip
        min-width="120"
      >
      </el-table-column>

      <el-table-column
        prop="nomor_kartu"
        label="Nomor Kartu"
        sortable="custom"
        min-width="140"
      ></el-table-column>

      <el-table-column
        prop="dari_tanggal"
        label="Dari Tanggal"
        width="150px"
        sortable="custom"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          {{ moment(row.dari_tanggal).format("DD-MMM-YYYY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="sampai_tanggal"
        label="Sampai Tanggal"
        width="160px"
        sortable="custom"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          {{ moment(row.sampai_tanggal).format("DD-MMM-YYYY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="jumlah"
        label="Jumlah"
        sortable="custom"
        align="right"
        header-align="right"
        min-width="120"
      >
        <template #default="{ row }"> {{ toRupiah(row.jumlah) }} </template>
      </el-table-column>

      <el-table-column
        prop="operator"
        label="Operator"
        sortable="custom"
        min-width="120"
      ></el-table-column>

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
                  :icon="Printer"
                  @click.native.prevent="
                    () => {
                      selectedData = row;
                      showPrintDialog = true;
                    }
                  "
                  >Print Slip</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="$auth.user.role == 1"
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                  >Edit</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="$auth.user.role == 1"
                  :icon="Delete"
                  @click.native.prevent="deleteData(row.id)"
                  >Hapus</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <br />

    <el-pagination
      v-if="tableData.total"
      small
      background
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="tableData.total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>

    <el-dialog
      v-model="showForm"
      width="500px"
      :close-on-click-modal="false"
      :title="
        !!formModel.id
          ? 'EDIT PEMBAYARAN KEANGGOTAAN'
          : 'INPUT PEMBAYARAN KEANGGOTAAN'
      "
    >
      <el-form label-width="180px" label-position="left">
        <el-form-item label="Member" :error="formErrors.member_id?.join(', ')">
          <el-select
            filterable
            default-first-option
            clearable
            v-model="formModel.member_id"
            placeholder="Member"
            style="width: 100%"
          >
            <el-option
              v-for="(m, i) in memberList.filter((m) => m.berbayar)"
              :value="m.id"
              :label="m.nomor_kartu + ' - ' + m.nama"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="Siklus Pembayaran"
          :error="formErrors.siklus_pembayaran?.join(', ')"
        >
          <div class="flex justify-content-center align-item-center">
            <el-input
              type="number"
              v-model="formModel.siklus_pembayaran"
              class="mr-2"
            ></el-input>
            <el-select
              placeholder="Pilih"
              v-model="formModel.siklus_pembayaran_unit"
            >
              <el-option
                v-for="(s, i) in siklus"
                :value="s.value"
                :label="s.label"
                :key="i"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          label="Dari Tanggal"
          :error="formErrors.dari_tanggal?.join(', ')"
        >
          <el-date-picker
            format="DD/MMM/YYYY"
            value-format="YYYY-MM-DD"
            placeholder="Dari Tanggal"
            v-model="formModel.dari_tanggal"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="Sampai Tanggal"
          :error="formErrors.sampai_tanggal?.join(', ')"
        >
          <el-date-picker
            disabled
            format="DD/MMM/YYYY"
            value-format="YYYY-MM-DD"
            placeholder="Sampai Tanggal"
            v-model="sampai_tanggal"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Jumlah" :error="formErrors.jumlah?.join(', ')">
          <el-input
            type="number"
            placeholder="Jumlah"
            v-model="formModel.jumlah"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button :icon="CircleCloseFilled" @click="closeForm">
          BATAL
        </el-button>
        <el-button :icon="SuccessFilled" type="primary" @click="submit">
          SIMPAN
        </el-button>
      </template>
    </el-dialog>

    <PrintDialog
      :show="showPrintDialog"
      @print="(printer_id) => printSlip(printer_id)"
      @close="showPrintDialog = false"
    />
  </div>
</template>

<script setup>
import moment from "moment";
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
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
  currentChange,
  sizeChange,
  sortChange,
  openForm,
  save,
  deleteData,
  closeForm,
  requestData,
  searchData,
  refreshData,
  toRupiah,
} = useCrud("/api/memberRenewal");

const store = useWebsiteStore();

onMounted(() => {
  filters.value = { dateRange: [] };
  requestData();
});

const selectedData = ref({});
const showPrintDialog = ref(false);
const memberList = computed(() => store.memberList);
const siklus = computed(() => store.siklus);

const sampai_tanggal = computed(() => {
  try {
    return moment(formModel.value.dari_tanggal, "YYYY-MM-DD")
      .add(
        formModel.value.siklus_pembayaran,
        formModel.value.siklus_pembayaran_unit
      )
      .format("YYYY-MM-DD");
  } catch (error) {
    return "";
  }
});

const submit = () => {
  formModel.value.sampai_tanggal = sampai_tanggal;
  save();
};

const printSlip = (printer_id) => {
  api(`${this.url}/printSlip/${this.selectedData.id}`, {
    method: "POST",
    body: {
      printer_id,
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
};
</script>
