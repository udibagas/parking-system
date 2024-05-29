<template>
  <div>
    <el-form inline class="text-right" @submit.native.prevent>
      <el-form-item>
        <el-date-picker
          style="margin-top: 5px"
          size="small"
          @change="requestData"
          v-model="filters.dateRange"
          format="DD-MMM-YYYY HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="Dari"
          end-placeholder="Sampai"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          size="small"
          v-model="keyword"
          placeholder="Cari"
          prefix-:icon="Search"
          clearable
          @change="searchData"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData.data"
      stripe
      @row-dblclick="
        (row, column, event) => {
          snapshots = row.snapshots;
          showSnapshot = true;
        }
      "
      height="calc(100vh - 310px)"
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
        width="40px"
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
  </div>
</template>

<script setup>
import { Refresh, MoreFilled } from "@element-plus/icons-vue";
const { range } = defineProops(["range"]);
const { pageSize, tableData, loading, currentChange, sizeChange, requestData } =
  useCrud("/api/manualOpenLog");

const showSnapshot = ref(false);
const snapshots = ref([]);

watch(range, (v) => {
  requestData();
});

onMounted(() => {
  requestData();
});
</script>
