<template>
  <el-card>
    <el-tabs>
      <el-tab-pane label="NOTIFIKASI">
        <el-form inline class="text-right" @submit.native.prevent>
          <el-form-item>
            <el-button
              size="small"
              @click="clearNotification"
              type="danger"
              :icon="Delete"
            >
              HAPUS NOTIFIKASI
            </el-button>
          </el-form-item>

          <el-form-item>
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
              style="width: 250px"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-input
              size="small"
              v-model="keyword"
              placeholder="Cari"
              :prefix-icon="Search"
              clearable
              @change="searchData"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <el-table
          stripe
          :data="tableData.data"
          height="calc(100vh - 285px)"
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
            label="Time"
            sortable="custom"
            width="150px"
          >
            <template #default="{ row }">
              {{ moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="Message" min-width="150px">
            <template #default="{ row }">
              {{ JSON.parse(row.data).message }}
            </template>
          </el-table-column>
          <el-table-column width="70px" align="center" header-align="center">
            <template #header>
              <el-button link @click="refreshData" :icon="Refresh"> </el-button>
            </template>
            <template #default="{ row }">
              <el-button
                size="small"
                link
                plain
                :icon="Delete"
                @click="deleteData(row.id)"
              ></el-button>
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
      </el-tab-pane>

      <el-tab-pane lazy label="SNAPSHOT">
        <NotificationSnapshot />
      </el-tab-pane>

      <el-tab-pane lazy label="ABSENSI OPERATOR">
        <AbsensiOperator :date="filters.dateRange" />
      </el-tab-pane>

      <el-tab-pane lazy label="LOG USER">
        <NotificationUserLog :range="filters.dateRange" />
      </el-tab-pane>

      <el-tab-pane lazy label="LOG GATE MASUK">
        <NotificationControllerLog url="/api/controller-log" />
      </el-tab-pane>

      <el-tab-pane lazy label="LOG GATE KELUAR">
        <NotificationControllerLog url="/api/uhf-log" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import moment from "moment";
import { Refresh, Delete, Search } from "@element-plus/icons-vue";

const {
  api,
  pageSize,
  tableData,
  loading,
  filters,
  keyword,
  currentChange,
  sortChange,
  sizeChange,
  deleteData,
  requestData,
  refreshData,
  searchData,
} = useCrud("/api/notification");

onMounted(() => {
  requestData();
});

const clearNotification = () => {
  ElMessageBox.confirm(
    "Anda yakin akan menghapus semua notifikasi?",
    "Warning",
    {
      type: "warning",
    }
  )
    .then(() => {
      return api(`${this.url}/clearNotification`, { method: "DELETE" });
    })
    .then((r) => {
      requestData();
      ElMessage({
        message: r.message,
        type: "success",
      });
    })
    .catch(() => console.log(e));
};
</script>
