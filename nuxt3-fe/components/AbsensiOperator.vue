<template>
  <div>
    <form class="flex justify-content-end mb-3" @submit.prevent>
      <div class="mr-2">
        <el-date-picker
          size="small"
          @change="searchData"
          v-model="filters.date"
          format="DD/MMM/YYYY"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="Dari"
          end-placeholder="Sampai"
        >
        </el-date-picker>
      </div>

      <el-input
        clearable
        size="small"
        v-model="filters.keyword"
        placeholder="Cari"
        style="width: 180px"
        class="mr-2"
        :prefix-icon="Search"
        @change="searchData"
      >
      </el-input>

      <el-button
        :icon="Refresh"
        @click="refreshData"
        size="small"
        type="primary"
      ></el-button>
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
          {{ moment(row.created_at).format("DD/MMM/YY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="user.name"
        label="User"
        show-overflow-tooltip
        min-width="150px"
      >
        <template #default="{ row }">
          {{ row.user.name }}
        </template>
      </el-table-column>

      <el-table-column
        prop="login"
        label="Login"
        sortable="custom"
        show-overflow-tooltip
        min-width="150px"
      >
        <template #default="{ row }">
          {{ moment(row.login).format("DD/MMM/YY HH:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="logout"
        label="Logout"
        sortable="custom"
        show-overflow-tooltip
        min-width="150px"
      >
        <template #default="{ row }">
          {{
            row.logout ? moment(row.logout).format("DD/MMM/YY HH:mm:ss") : ""
          }}
        </template>
      </el-table-column>

      <el-table-column
        prop="durasi"
        label="Durasi"
        show-overflow-tooltip
        min-width="150px"
      >
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
  </div>
</template>

<script setup>
import moment from "moment";
const { date } = defineProps(["date"]);
import { Refresh, Search } from "@element-plus/icons-vue";
const {
  pageSize,
  tableData,
  loading,
  filters,
  currentChange,
  sizeChange,
  sortChange,
  requestData,
  searchData,
  refreshData,
} = useCrud("/api/absensiOperator");

onMounted(() => {
  requestData();
});
</script>
