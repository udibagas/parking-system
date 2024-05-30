<template>
  <form class="flex justify-content-end mb-3" @submit.prevent>
    <div>
      <el-date-picker
        size="small"
        @change="requestData"
        v-model="filters.dateRange"
        format="DD-MMM-YYYY HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange"
        range-separator="-"
        start-placeholder="Dari"
        end-placeholder="Sampai"
        class="mr-2"
      >
      </el-date-picker>
    </div>

    <el-input
      size="small"
      v-model="keyword"
      placeholder="Cari"
      :prefix-icon="Search"
      clearable
      @change="searchData"
      style="width: 200px"
    >
    </el-input>
  </form>

  <el-table
    :data="tableData.data"
    stripe
    @row-dblclick="
      (row, column, event) => {
        snapshots = row.snapshots;
        showSnapshot = true;
      }
    "
    height="calc(100vh - 280px)"
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
      label="Tanggal"
      sortable="custom"
      show-overflow-tooltip
      width="180px"
    >
      <template #default="{ row }">
        {{ moment(row.created_at).format("DD-MMM-YYYY HH:mm:ss") }}
      </template>
    </el-table-column>

    <el-table-column
      prop="gate_out.nama"
      label="Gate Out"
      show-overflow-tooltip
      min-width="150px"
    >
    </el-table-column>

    <el-table-column
      prop="user.name"
      label="Operator"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>

    <el-table-column
      prop="alasan"
      label="Alasan"
      sortable="custom"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>

    <el-table-column
      fixed="right"
      width="60px"
      align="center"
      header-align="center"
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
                :icon="Camera"
                @click.native.prevent="
                  () => {
                    snapshots = row.snapshots;
                    showSnapshot = true;
                  }
                "
                >Lihat Snapshot</el-dropdown-item
              >
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

  <el-dialog center v-model="showSnapshot" title="SNAPSHOT">
    <el-image
      v-for="(snapshot, i) in snapshots"
      :key="i"
      :src="snapshot.url"
      style="width: 100%; height: 100%"
      fit="cover"
    >
      <div slot="error" class="el-image__error">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </el-dialog>
</template>

<script setup>
import moment from "moment";
import { Refresh, MoreFilled, Camera, Search } from "@element-plus/icons-vue";
const {
  pageSize,
  tableData,
  loading,
  filters,
  keyword,
  currentChange,
  sizeChange,
  sortChange,
  requestData,
  refreshData,
  searchData,
} = useCrud("/api/manualOpenLog");

const showSnapshot = ref(false);
const snapshots = ref([]);

onMounted(() => {
  filters.value.dateRange = [];
  requestData();
});
</script>
