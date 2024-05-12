<template>
  <div>
    <el-form inline class="text-right" @submit.native.prevent>
      <el-form-item>
        <el-date-picker
          style="margin-top: 5px"
          size="small"
          @change="requestData"
          v-model="filters.dateRange"
          format="dd-MMM-yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
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
          prefix-icon="el-icon-search"
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
        <template slot-scope="scope">
          {{ $moment(scope.row.created_at).format("DD-MMM-YYYY HH:mm:ss") }}
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
        <template slot="header">
          <el-button link @click="refreshData" icon="el-icon-refresh">
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-camera"
                @click.native.prevent="
                  () => {
                    snapshots = scope.row.snapshots;
                    showSnapshot = true;
                  }
                "
                >Lihat Snapshot</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <br />

    <el-pagination
      class="text-right"
      background
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="tableData.total"
    ></el-pagination>

    <el-dialog center :visible.sync="showSnapshot" title="SNAPSHOT">
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

<script>
import crud from "@/mixins/crud";

export default {
  mixins: [crud],
  props: ["range"],
  watch: {
    range(v) {
      this.requestData();
    },
  },
  data() {
    return {
      url: "/api/manualOpenLog",
      showSnapshot: false,
      snapshots: [],
    };
  },
};
</script>
