<template>
  <el-card>
    <div style="display: flex; justify-content: space-between">
      <div style="font-size: 1.2em; line-height: 41px">KELOLA USER</div>
      <form class="flex justify-content-end" @submit.prevent="searchData">
        <el-button
          size="small"
          @click="openForm({ role: 0, password: '' })"
          type="primary"
          :icon="Plus"
          class="mr-2"
        >
          TAMBAH USER
        </el-button>
        <div>
          <el-input
            size="small"
            v-model="keyword"
            placeholder="Cari"
            :prefix-icon="Search"
            :clearable="true"
          >
          </el-input>
        </div>
      </form>
    </div>

    <br />

    <el-table
      stripe
      height="calc(100vh - 240px)"
      v-loading="loading"
      :data="tableData.data"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="Nama"
        sortable="custom"
      ></el-table-column>
      <el-table-column prop="role" label="Level" sortable="custom">
        <template #default="{ row }">
          {{ row.role ? "Admin" : "Operator" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        sortable="custom"
        align="center"
        header-align="center"
        width="100"
      >
        <template #default="{ row }">
          <el-tag
            :type="row.status ? 'success' : 'info'"
            size="small"
            style="width: 100%"
            effect="dark"
          >
            {{ row.status ? "Aktif" : "Nonaktif" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="60px" align="center" header-align="center">
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
                >
                  Edit
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="Delete"
                  @click.native.prevent="deleteData(row.id)"
                >
                  Hapus
                </el-dropdown-item>
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
      v-model="showForm"
      width="500px"
      :title="!!formModel.id ? 'EDIT USER' : 'TAMBAH USER'"
      :close-on-click-modal="false"
    >
      <el-form label-width="160px" label-position="left">
        <el-form-item label="Nama" :error="formErrors.name?.join(', ')">
          <el-input placeholder="Nama" v-model="formModel.name"></el-input>
        </el-form-item>

        <el-form-item label="Level" :error="formErrors.role?.join(', ')">
          <el-select
            v-model="formModel.role"
            placeholder="Level"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in [
                { value: 0, label: 'Operator' },
                { value: 1, label: 'Admin' },
              ]"
              :value="t.value"
              :label="t.label"
              :key="i"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Password" :error="formErrors.password?.join(', ')">
          <el-input
            type="password"
            placeholder="Password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Konfirmasi Password"
          :error="formErrors.password?.join(', ')"
        >
          <el-input
            type="password"
            placeholder="Konfirmasi Password"
            v-model="formModel.password_confirmation"
          ></el-input>
        </el-form-item>

        <el-form-item label="Status" :error="formErrors.status?.join(', ')">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            v-model="formModel.status"
            active-color="#13ce66"
          >
          </el-switch>
          <el-tag
            :type="formModel.status ? 'success' : 'info'"
            size="small"
            style="margin-left: 10px"
          >
            {{ !!formModel.status ? "Aktif" : "Nonaktif" }}
          </el-tag>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button :icon="CircleCloseFilled" @click="closeForm">
          BATAL
        </el-button>
        <el-button :icon="SuccessFilled" type="primary" @click="save()">
          SIMPAN
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
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
  sortChange,
  openForm,
  save,
  deleteData,
  closeForm,
  requestData,
  searchData,
  refreshData,
} = useCrud("/api/user");

onMounted(() => {
  requestData();
});
</script>
