<template>
  <div class="text-right">
    <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
      TAMBAH GATE KELUAR
    </el-button>
  </div>

  <br />

  <el-table :data="tableData.data" stripe>
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
          size="small"
        >
          {{ row.status ? "Aktif" : "Tidak Aktif" }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="150" label="Nama" prop="nama"></el-table-column>

    <el-table-column
      prop="shortcut_key"
      label="Shortcut"
      align="center"
      header-align="center"
      min-width="100"
    ></el-table-column>

    <el-table-column
      min-width="100"
      label="Pos"
      prop="pos.nama"
    ></el-table-column>

    <el-table-column
      min-width="150"
      label="Jenis Kendaraan"
      prop="jenis_kendaraan"
    >
      <template #default="{ row }">
        {{ row.jenis_kendaraan ? row.jenis_kendaraan.join(", ") : "" }}
      </template>
    </el-table-column>

    <el-table-column min-width="150" label="Controller Device">
      <template #default="{ row }">
        {{ row.device }}:{{ row.baudrate }}
      </template>
    </el-table-column>

    <el-table-column
      min-width="120"
      label="Perintah Buka"
      prop="open_command"
    ></el-table-column>

    <el-table-column
      min-width="120"
      label="Perintah Tutup"
      prop="close_command"
    ></el-table-column>

    <el-table-column min-width="200" label="UHF Reader">
      <template #default="{ row }">
        {{ row.uhf_reader_host || "-" }}:{{ row.uhf_reader_port || "-" }}
      </template>
    </el-table-column>

    <el-table-column min-width="200" label="Running Text Device">
      <template #default="{ row }">
        {{ row.running_text_device }}:{{ row.running_text_baudrate }}
      </template>
    </el-table-column>

    <el-table-column min-width="150" label="Kamera">
      <template #default="{ row }">
        {{ row.kameraList ? row.kameraList.map((k) => k.nama).join(",") : "" }}
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
                :icon="Minus"
                @click.native.prevent="testGate(row)"
                >Test Gate</el-dropdown-item
              >
              <el-dropdown-item
                :icon="ChatDotSquare"
                @click.native.prevent="testRunningText(row)"
              >
                Test Running Text
              </el-dropdown-item>
              <el-dropdown-item
                :icon="Edit"
                @click.native.prevent="openForm(row)"
              >
                Edit
              </el-dropdown-item>
              <el-dropdown-item
                :icon="Delete"
                @click.native.prevent="deleteData(row.id, store.getGateInList)"
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
    title="GATE KELUAR"
    v-model="showForm"
    width="500px"
    :close-on-click-modal="false"
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
          placeholder="Shortcut Key"
          v-model="formModel.shortcut_key"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Jenis Kendaraan"
        :error="formErrors.jenis_kendaraan?.join(', ')"
      >
        <el-select
          v-model="formModel.jenis_kendaraan"
          placeholder="Jenis Kendaraan"
          style="width: 100%"
          multiple
        >
          <el-option
            v-for="k in jenisKendaraanList"
            :value="k.nama"
            :label="k.nama"
            :key="k.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Controller" :error="formErrors.device?.join(', ')">
        <div class="flex">
          <el-input
            class="mr-2"
            placeholder="Device"
            v-model="formModel.device"
          ></el-input>
          <el-input
            type="number"
            placeholder="Baudrate"
            v-model="formModel.baudrate"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item label="UHF Reader">
        <div class="flex">
          <el-input
            class="mr-2"
            placeholder="IP Address"
            v-model="formModel.uhf_reader_host"
          ></el-input>
          <el-input
            type="number"
            placeholder="Port"
            v-model="formModel.uhf_reader_port"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item label="Running Text">
        <div class="flex">
          <el-input
            class="mr-2"
            placeholder="Device"
            v-model="formModel.running_text_device"
          ></el-input>
          <el-input
            type="number"
            placeholder="Baudrate"
            v-model="formModel.running_text_baudrate"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item
        label="Perintah Buka"
        :error="formErrors.open_command?.join(', ')"
      >
        <el-input
          placeholder="Perintah Buka"
          v-model="formModel.open_command"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Perintah Tutup"
        :error="formErrors.close_command?.join(', ')"
      >
        <el-input
          placeholder="Perintah Tutup"
          v-model="formModel.close_command"
        ></el-input>
      </el-form-item>

      <el-form-item label="Pos" :error="formErrors.pos_id?.join(', ')">
        <el-select
          v-model="formModel.pos_id"
          placeholder="Pos"
          style="width: 100%"
        >
          <el-option
            v-for="pos in posList"
            :value="pos.id"
            :label="pos.nama"
            :key="pos.id"
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
  ChatDotSquare,
  Minus,
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
} = useCrud("/api/gateOut");

const jenisKendaraanList = computed(() => store.jenisKendaraanList);
const kameraList = computed(() => store.kameraList);
const posList = computed(() => store.posList);

onBeforeMount(async () => {
  await store.getPosList();
});

onMounted(() => {
  requestData();
});

const testGate = (gate) => {
  console.log(`connecting to ${gate.pos.ip_address}:5678`);
  const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`);

  ws.onerror = (event) => {
    ElMessage({
      message: "KONEKSI KE POS GAGAL",
      type: "error",
    });
  };

  ws.onopen = (event) => {
    console.log(`connected to ${gate.pos.ip_address}:5678`);
    ws.send(
      [
        "open",
        gate.device,
        gate.baudrate,
        gate.open_command,
        gate.close_command,
      ].join(";")
    );
  };

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    ElMessage({
      message: data.message,
      type: data.status ? "success" : "error",
    });
    ws.close();
  };
};

const testRunningText = (gate) => {
  if (!gate.running_text_device || !gate.running_text_baudrate) {
    ElMessage({
      message: "RUNNING TEXT TIDAK TERPASANG",
      type: "error",
    });
    return;
  }

  console.log(`connecting to ${gate.pos.ip_address}:5678`);
  const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`);

  ws.onerror = (event) => {
    ElMessage({
      message: "KONEKSI KE POS GAGAL",
      type: "error",
    });
  };

  ws.onopen = (event) => {
    console.log(`connected to ${gate.pos.ip_address}:5678`);
    ws.send(
      [
        "rt",
        gate.running_text_device,
        gate.running_text_baudrate,
        `TEST|${gate.nama}`,
      ].join(";")
    );
  };

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    ElMessage({
      message: data.message,
      type: data.status ? "success" : "error",
    });
    ws.close();
  };
};
</script>
