<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH PRINTER
      </el-button>
    </div>

    <br />

    <el-table :data="tableData.data" stripe height="calc(100vh - 285px)">
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column min-width="100" label="Status" prop="status">
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.status ? 'success' : 'info'"
            size="mini"
            >{{ row.status ? "Aktif" : "Tidak Aktif" }}</el-tag
          >
        </template>
      </el-table-column>
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
        label="Port"
        prop="port"
      ></el-table-column>
      <el-table-column
        fixed="right"
        width="60px"
        align="center"
        header-align="center"
      >
        <template #header>
          <el-button link @click="requestData" :icon="Refresh"> </el-button>
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
                  @click.native.prevent="testPrinter(row.id)"
                >
                  Test Printer
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                >
                  Edit
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Delete"
                  @click.native.prevent="deleteData(row.id)"
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
      title="PRINTER"
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

        <el-form-item label="Port" :error="formErrors.port?.join(', ')">
          <el-input placeholder="Port" v-model="formModel.port"></el-input>
        </el-form-item>

        <el-form-item label="Status" :error="formErrors.status?.join(', ')">
          <el-select
            v-model="formModel.status"
            placeholder="Status"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in ['Tidak Aktif', 'Aktif']"
              :value="i"
              :label="t"
              :key="i"
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
          @click="save(getPrinterList)"
        >
          SIMPAN
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const { getPrinterList } = useWebsiteStore();
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
  Printer,
} from "@element-plus/icons-vue";

const {
  api,
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
} = useCrud("/api/printer");

const testPrinter = (id) => {
  api(`/api/printer/test/${id}`).then((response) => {
    ElMessage({
      message: response.message,
      type: "success",
    });
  });
};

onMounted(() => {
  requestData();
});
</script>
