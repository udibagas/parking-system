<template>
  <form @submit.prevent="searchData" class="flex mb-3 justify-content-end">
    <el-button
      v-if="user.role == 1"
      size="small"
      :icon="Plus"
      @click="openForm()"
      type="primary"
      class="mr-2"
    >
      TAMBAH GROUP
    </el-button>
    <el-input
      size="small"
      v-model="keyword"
      placeholder="Cari"
      :prefix-icon="Search"
      :clearable="true"
      @clear="requestData"
      style="width: 200px"
    >
    </el-input>
  </form>

  <el-table
    :data="tableData.data"
    stripe
    height="calc(100vh - 240px)"
    v-loading="loading"
  >
    <el-table-column
      type="index"
      :index="tableData.from"
      label="#"
    ></el-table-column>

    <el-table-column
      prop="nama"
      label="Nama"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>

    <el-table-column
      prop="keterangan"
      label="Keterangan"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>

    <el-table-column
      fixed="right"
      width="60px"
      header-align="center"
      align="center"
      v-if="user.role == 1"
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
                :icon="Edit"
                @click.native.prevent="openForm(row)"
                >Edit</el-dropdown-item
              >
              <el-dropdown-item
                :icon="Delete"
                @click.native.prevent="deleteData(row.id)"
              >
                Hapus</el-dropdown-item
              >
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
    draggable
    width="500px"
    v-model="showForm"
    :title="!!formModel.id ? 'EDIT GROUP MEMBER' : 'TAMBAH GROUP MEMBER'"
    :close-on-click-modal="false"
  >
    <el-form label-width="150px" label-position="left">
      <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
        <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
      </el-form-item>

      <el-form-item
        label="Keterangan"
        :error="formErrors.keterangan?.join(', ')"
      >
        <el-input
          placeholder="Keterangan"
          v-model="formModel.keterangan"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :icon="CircleCloseFilled" @click="closeForm">
        BATAL
      </el-button>
      <el-button
        :icon="SuccessFilled"
        type="primary"
        @click="save(getGroupMemberList)"
      >
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
const { getGroupMemberList } = useWebsiteStore();
const { user } = useSanctumAuth();

import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
  Search,
} from "@element-plus/icons-vue";

const {
  showForm,
  formErrors,
  formModel,
  pageSize,
  tableData,
  loading,
  keyword,
  currentChange,
  sizeChange,
  openForm,
  save,
  deleteData,
  closeForm,
  requestData,
  searchData,
  refreshData,
} = useCrud("/api/groupMember");

onMounted(() => {
  requestData();
});
</script>
