<template>
  <form class="flex justify-content-end mb-3" inline @submit.prevent>
    <el-button
      :disabled="selectedFiles.length == 0"
      @click="deleteFiles"
      type="danger"
      :icon="Delete"
      size="small"
      title="Hapus File Backup"
    >
      HAPUS FILE BACKUP
    </el-button>

    <el-button
      @click="triggerOpenFile"
      type="primary"
      class="mr-2"
      :icon="Upload"
      size="small"
      title="Upload File Backup"
    >
      UPLOAD FILE BACKUP
    </el-button>
    <input
      type="file"
      style="display: none"
      id="input-file"
      @change="uploadFile"
    />

    <el-button
      @click="backup"
      type="primary"
      :icon="Plus"
      size="small"
      title="Generate Backup"
      :loading="processing"
    >
      GENERATE BACKUP
    </el-button>
  </form>

  <el-table
    :data="tableData"
    v-loading="loading"
    stripe
    height="calc(100vh - 200px)"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
      align="center"
      header-align="center"
    ></el-table-column>

    <el-table-column type="index" label="#"></el-table-column>

    <el-table-column
      prop="tanggal"
      label="Tanggal"
      width="200"
    ></el-table-column>

    <el-table-column prop="file" label="File"></el-table-column>

    <el-table-column
      prop="size"
      label="Ukuran"
      width="100"
      align="right"
      header-align="right"
    >
    </el-table-column>

    <el-table-column width="60" align="center" header-align="center">
      <template #header>
        <el-button link @click="getData" :icon="Refresh"></el-button>
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
                :icon="Download"
                @click.native.prevent="download(row.url)"
                >Download</el-dropdown-item
              >
              <el-dropdown-item
                :icon="Refresh"
                @click.native.prevent="restore(row.file)"
              >
                Restore
              </el-dropdown-item>
              <el-dropdown-item
                :icon="Delete"
                @click.native.prevent="deleteData(row.file)"
              >
                Hapus
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {
  Refresh,
  Plus,
  Delete,
  MoreFilled,
  Download,
  Upload,
} from "@element-plus/icons-vue";

const api = useApi();
const tableData = ref([]);
const loading = ref(false);
const processing = ref(false);
const selectedFiles = ref([]);

onMounted(() => {
  getData();
});

const getData = () => {
  loading.value = true;
  api("/api/backup")
    .then((response) => {
      tableData.value = response;
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteData = (file) => {
  ElMessageBox.confirm("Anda yakin akan menghapus file ini?", "Konfirmasi", {
    type: "warning",
  })
    .then(() => api("/api/backup", { method: "DELETE", body: { file } }))
    .then((response) => {
      ElMessage({
        message: response.message,
        type: "success",
        showClose: true,
      });
      getData();
    });
};

const backup = () => {
  processing.value = true;
  api("/api/backup", { method: "POST" })
    .then((response) => {
      ElMessage({
        message: response.message,
        type: "success",
        showClose: true,
      });
      getData();
    })
    .finally(() => {
      processing.value = false;
    });
};

const restore = (file) => {
  ElMessageBox.confirm("Anda yakin akan me-restore database?", "Konfirmasi", {
    type: "warning",
  })
    .then(() => {
      loading.value = true;
      return api("/api/backup", { method: "PUT", body: { file } });
    })
    .then((response) => {
      ElMessage({
        message: response.message,
        type: "success",
        showClose: true,
      });
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

const triggerOpenFile = () => {
  const f = document.querySelector("#input-file");
  f.click();
};

const uploadFile = (event) => {
  var formData = new FormData();
  formData.append("file", event.target.files[0]);

  api(
    "/api/backup",
    { method: "POST", body: formData },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((response) => {
      ElMessage({
        message: response.message,
        type: "success",
        showClose: true,
      });
      getData();
    })
    .finally(() => {
      loading.value = false;
      document.querySelector("#input-file").value = "";
    });
};

const handleSelectionChange = (val) => {
  selectedFiles.value = val.map((v) => v.file);
};

const deleteFiles = () => {
  deleteData(selectedFiles.value);
};

const download = (url) => {
  window.open(url, "_blank");
};
</script>
