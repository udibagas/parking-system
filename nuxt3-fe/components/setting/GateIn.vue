<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH GATE MASUK
      </el-button>
    </div>

    <br />

    <el-table
      :data="tableData.data"
      height="calc(100vh - 285px)"
      v-loading="loading"
    >
      <el-table-column
        prop="shortcut_key"
        label="#"
        min-width="30px"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column min-width="100" label="Status" prop="status">
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.status ? 'success' : 'info'"
            size="small"
          >
            {{ row.status ? "Aktif" : "Tidak Aktif" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nama" label="Nama" min-width="100px">
      </el-table-column>
      <el-table-column
        prop="jenis_kendaraan"
        label="Jenis Kendaraan"
        min-width="130px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="controller_ip_address"
        label="Controller"
        min-width="150px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <span v-if="!!row.controller_ip_address">
            {{ row.controller_ip_address }}:{{ row.controller_port }}
          </span>
          <br v-if="!!row.controller_ip_address" />
          <span v-if="!!row.controller_device">
            {{ row.controller_device }}:{{ row.controller_baudrate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        label="Printer"
        prop="printer.nama"
      ></el-table-column>

      <el-table-column min-width="150" label="Kamera">
        <template #default="{ row }">
          {{
            row.kameraList ? row.kameraList.map((k) => k.nama).join(",") : ""
          }}
        </template>
      </el-table-column>

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
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                >
                  Edit
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Delete"
                  @click.native.prevent="
                    deleteData(row.id, store.getGateInList)
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
      v-loading="loading"
      title="GATE MASUK"
      :close-on-click-modal="false"
      v-model="showForm"
      width="500px"
    >
      <el-form label-position="left" label-width="150px">
        <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
        </el-form-item>

        <el-form-item
          label="Shortcut Key"
          :error="formErrors.shortcut_key?.join(', ')"
        >
          <el-input
            maxlength="1"
            placeholder="Shortcut Key"
            v-model="formModel.shortcut_key"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Jenis Kendaraan"
          :error="formErrors.jenis_kendaraan?.join(', ')"
        >
          <el-input
            placeholder="Jenis Kendaraan"
            v-model="formModel.jenis_kendaraan"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Alamat IP Kontroler"
          :error="formErrors.controller_ip_address?.join(', ')"
        >
          <el-input
            placeholder="Alamat IP Kontroler"
            v-model="formModel.controller_ip_address"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Port Kontroler"
          :error="formErrors.controller_port?.join(', ')"
        >
          <el-input
            type="number"
            placeholder="Port Kontroler"
            v-model="formModel.controller_port"
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

        <el-form-item label="Kamera" :error="formErrors.kamera?.join(', ')">
          <el-select
            v-model="formModel.kamera"
            placeholder="Kamera"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="kamera in kameraList"
              :value="kamera.id"
              :label="kamera.nama"
              :key="kamera.id"
            ></el-option>
          </el-select>
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
          @click="save(store.getGateInList)"
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
} = useCrud("/api/gateIn");

const printerList = computed(() => store.printerList);
const kameraList = computed(() => store.kameraList);

onMounted(() => {
  requestData();
});
</script>
