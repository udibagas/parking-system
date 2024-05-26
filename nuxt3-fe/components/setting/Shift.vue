<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH SHIFT
      </el-button>
    </div>

    <br />

    <el-table
      :data="tableData.data"
      stripe
      height="calc(100vh - 285px)"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column prop="nama" label="Nama"></el-table-column>
      <el-table-column prop="mulai" label="Mulai"></el-table-column>
      <el-table-column prop="selesai" label="Selesai"></el-table-column>

      <el-table-column
        fixed="right"
        width="40px"
        header-align="center"
        align="center"
      >
        <template #header>
          <el-button link @click="refreshData" icon="el-icon-refresh">
          </el-button>
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
                  @click.native.prevent="
                    deleteData(row.id, getJenisKendaraanList)
                  "
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
      small
      background
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="tableData.total"
    ></el-pagination>

    <el-dialog
      v-model="showForm"
      title="SHIFT"
      v-loading="loading"
      width="450px"
      :close-on-click-modal="false"
    >
      <el-form label-width="100px" label-position="left">
        <el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
          <div class="el-form-item__error" v-if="formErrors.nama">
            {{ formErrors.nama[0] }}
          </div>
        </el-form-item>

        <el-form-item label="Mulai" :class="{ 'is-error': formErrors.mulai }">
          <el-time-select
            style="width: 100%"
            v-model="formModel.mulai"
            :picker-options="{ start: '00:00', step: '00:30', end: '24:00' }"
            placeholder="Mulai"
          >
          </el-time-select>

          <div class="el-form-item__error" v-if="formErrors.mulai">
            {{ formErrors.mulai[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Selesai"
          :class="{ 'is-error': formErrors.selesai }"
        >
          <el-time-select
            style="width: 100%"
            v-model="formModel.selesai"
            :picker-options="{ start: '00:00', step: '00:30', end: '24:00' }"
            placeholder="Selesai"
          >
          </el-time-select>

          <div class="el-form-item__error" v-if="formErrors.selesai">
            {{ formErrors.selesai[0] }}
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button :icon="CircleCloseFilled" @click="closeForm">
          BATAL
        </el-button>
        <el-button
          :icon="SuccessFilled"
          type="primary"
          @click="save(getShiftList)"
        >
          SIMPAN
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const { getShiftList } = useWebsiteStore();
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
} from "@element-plus/icons-vue";

const {
  showForm,
  formErrors,
  formModel,
  pageSize,
  tableData,
  loading,
  currentChange,
  sizeChange,
  openForm,
  save,
  deleteData,
  closeForm,
  requestData,
} = useCrud("/api/shift");

onMounted(() => {
  requestData();
});
</script>
