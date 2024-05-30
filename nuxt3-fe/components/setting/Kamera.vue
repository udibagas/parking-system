<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH KAMERA
      </el-button>
    </div>

    <br />

    <el-table :data="tableData.data" stripe height="calc(100vh - 285px)">
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column width="120" label="Nama" prop="nama"></el-table-column>

      <el-table-column
        width="120"
        label="Username"
        prop="username"
      ></el-table-column>

      <el-table-column
        width="120"
        label="Password"
        prop="password"
      ></el-table-column>

      <el-table-column
        width="100"
        label="Auth Type"
        prop="auth_type"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        min-width="150"
        label="Snapshot URL"
        prop="snapshot_url"
      ></el-table-column>

      <el-table-column
        width="100"
        label="Status"
        prop="status"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.status ? 'success' : 'info'"
            size="small"
            style="width: 100%"
          >
            {{ row.status ? "Aktif" : "Tidak Aktif" }}
          </el-tag>
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
                  :icon="Camera"
                  @click.native.prevent="testKamera(row.id)"
                >
                  Test Kamera
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                >
                  Edit
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Delete"
                  @click.native.prevent="deleteData(row.id, getKameraList)"
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
      title="KAMERA"
      v-model="showForm"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form label-position="left" label-width="150px">
        <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
        </el-form-item>

        <el-form-item label="Username" :error="formErrors.username?.join(', ')">
          <el-input
            placeholder="Username"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="Password" :error="formErrors.password?.join(', ')">
          <el-input
            placeholder="Password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Otentifikasi"
          :error="formErrors.auth_type?.join(', ')"
        >
          <el-select
            v-model="formModel.auth_type"
            placeholder="Otentifikasi"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in ['basic', 'digest']"
              :value="t"
              :label="t"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="URL Snapshot"
          :error="formErrors.snapshot_url?.join(', ')"
        >
          <el-input
            placeholder="URL Snapshot"
            v-model="formModel.snapshot_url"
          ></el-input>
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
          @click="save(getKameraList)"
        >
          SIMPAN
        </el-button>
      </template>
    </el-dialog>

    <el-dialog title="SNAPSHOT KAMERA" center v-model="showSnapshot">
      <img :src="snapshot" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script setup>
const { getKameraList } = useWebsiteStore();
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
  Camera,
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
} = useCrud("/api/kamera");

const showSnapshot = ref(false);
const snapshot = ref(null);

const testKamera = (id) => {
  api(`/api/kamera/test/${id}`).then((response) => {
    snapshot.value = "data:image/jpeg;base64," + response.snapshot;
    showSnapshot.value = true;
  });
};

onMounted(() => {
  requestData();
});
</script>
