<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH POS
      </el-button>
    </div>

    <br />

    <el-table :data="tableData.data" stripe height="calc(100vh - 285px)">
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column
        min-width="100"
        label="Nama"
        prop="nama"
      ></el-table-column>

      <el-table-column
        min-width="100"
        label="IP Address"
        prop="ip_address"
      ></el-table-column>

      <el-table-column
        min-width="100"
        label="Printer"
        prop="printer.nama"
      ></el-table-column>

      <el-table-column
        fixed="right"
        width="60px"
        header-align="center"
        align="center"
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
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                >
                  Edit
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Delete"
                  @click.native.prevent="
                    deleteData(row.id, getJenisKendaraanList)
                  "
                >
                  Hapus
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
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="tableData.total"
    ></el-pagination>

    <el-dialog
      v-loading="loading"
      title="POS"
      :close-on-click-modal="false"
      v-model="showForm"
      width="500px"
    >
      <el-form label-position="left" label-width="150px">
        <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
        </el-form-item>

        <el-form-item
          label="Alamat IP"
          :error="formErrors.ip_address?.join(', ')"
        >
          <el-input
            placeholder="Alamat IP"
            v-model="formModel.ip_address"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Printer"
          :error="formErrors.printer_id?.join(', ')"
        >
          <el-select
            v-model="formModel.printer_id"
            placeholder="Printer"
            style="width: 100%"
          >
            <el-option
              v-for="printer in printerList"
              :value="printer.id"
              :label="printer.nama"
              :key="printer.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button :icon="CircleCloseFilled" @click="closeForm">
          BATAL
        </el-button>
        <el-button
          :icon="SuccessFilled"
          type="primary"
          @click="save(getShiftList)"
        >
          SIMPAN
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const store = useWebsiteStore();
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
} from "@element-plus/icons-vue";

const {
  showForm,
  formErrors,
  formModel,
  pageSize,
  tableData,
  loading,
  currentChange,
  sizeChange,
  openForm,
  save,
  deleteData,
  closeForm,
  requestData,
} = useCrud("/api/pos");

const printerList = computed(() => store.printerList);

const onAfterSave = () => {
  store.getPosList();
  store.getPos();
};

onMounted(() => {
  requestData();
});
</script>
