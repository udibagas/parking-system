<template>
  <form class="flex justify-content-end mb-3" @submit.prevent>
    <el-button
      size="small"
      type="danger"
      class="mr-2"
      @click="clearLog"
      :icon="Delete"
    >
      HAPUS LOG
    </el-button>

    <el-input
      clearable
      size="small"
      v-model="keyword"
      placeholder="Cari"
      style="width: 180px"
      :prefix-icon="Search"
      @change="searchData"
    >
    </el-input>
  </form>

  <el-table
    :data="tableData.data"
    stripe
    height="calc(100vh - 240px)"
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
</template>

<script setup>
import moment from "moment";
import { Delete, Search } from "@element-plus/icons-vue";

const {
  api,
  pageSize,
  tableData,
  loading,
  keyword,
  currentChange,
  sizeChange,
  sortChange,
  requestData,
  searchData,
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
</script>
