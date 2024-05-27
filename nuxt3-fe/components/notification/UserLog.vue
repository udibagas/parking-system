<template>
  <div>
    <el-form inline class="text-right" @submit.native.prevent>
      <el-form-item>
        <el-button size="small" @click="clearLog" type="danger" :icon="Delete">
          HAPUS LOG
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-input
          size="small"
          v-model="keyword"
          placeholder="Cari"
          :prefix-icon="Search"
          clearable
          @change="
            (v) => {
              keyword = v;
              requestData();
            }
          "
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData.data"
      stripe
      height="calc(100vh - 310px)"
      v-loading="loading"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="created_at"
        label="Tanggal"
        sortable="custom"
        show-overflow-tooltip
        min-width="150px"
      >
        <template #default="{ row }">
          {{ moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user"
        label="User"
        sortable="custom"
        show-overflow-tooltip
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="action"
        label="Aksi"
        sortable="custom"
        show-overflow-tooltip
        min-width="150px"
      ></el-table-column>
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
  </div>
</template>

<script setup>
import moment from "moment";
import { Delete, Search } from "@element-plus/icons-vue";
const { range } = defineProps(["range"]);

const {
  api,
  pageSize,
  tableData,
  loading,
  currentChange,
  sizeChange,
  requestData,
} = useCrud("/api/userLog");

onMounted(() => {
  requestData();
});

const clearLog = () => {
  ElMessageBox.confirm("Anda yakin akan menghapus semua log?", "Peringatan", {
    type: "warning",
  })
    .then(() => {
      api("/api/userLog", { method: "DELETE" });
    })
    .then((r) => {
      requestData();
      ElMessage({
        message: r.message,
        type: "success",
        showClose: true,
      });
    })
    .catch(() => console.log(e));
};

watch(range, () => {
  requestData();
});
</script>
