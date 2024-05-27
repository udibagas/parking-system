<template>
  <div>
    <el-form inline class="text-right" @submit.native.prevent>
      <el-form-item>
        <el-date-picker
          style="margin-top: 5px"
          size="small"
          @change="searchData"
          v-model="filters.date"
          format="dd-MMM-yyyy"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="Dari"
          end-placeholder="Sampai"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          size="small"
          v-model="filters.keyword"
          placeholder="Cari"
          prefix-:icon="Search"
          clearable
          @change="searchData"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          :icon="Refresh"
          @click="refreshData"
          size="small"
          type="primary"
        ></el-button>
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
        <template slot-scope="{ row }">
          {{ moment(row.created_at).format("DD/MMM/YY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="user.name"
        label="User"
        show-overflow-tooltip
        min-width="150px"
      >
        <template slot-scope="{ row }">
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
        <template slot-scope="{ row }">
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
        <template slot-scope="{ row }">
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
      class="text-right"
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

<script>
import crud from "@/mixins/crud";

export default {
  mixins: [crud],

  props: ["date"],

  watch: {
    range(v) {
      this.requestData();
    },
  },

  data() {
    return {
      url: "/api/absensiOperator",
    };
  },
};
</script>
