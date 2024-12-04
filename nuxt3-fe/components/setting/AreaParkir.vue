<template>
  <div>
    <div class="text-right">
      <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
        TAMBAH AREA PARKIR
      </el-button>
    </div>

    <br />

    <el-table :data="tableData.data" stripe>
      <el-table-column
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>
      <el-table-column
        min-width="100"
        label="Nama"
        prop="nama"
      ></el-table-column>

      <el-table-column
        min-width="100"
        label="Keterangan"
        prop="keterangan"
      ></el-table-column>

      <el-table-column min-width="100" label="Jenis Kendaraan">
        <template #default="{ row }">
          {{ row.jenis_kendaraan.join(", ") }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        label="Kapasitas"
        prop="kapasitas"
        header-align="center"
        align="center"
      ></el-table-column>

      <el-table-column
        min-width="100"
        label="Terisi"
        prop="terisi"
        header-align="center"
        align="center"
      ></el-table-column>

      <el-table-column
        fixed="right"
        width="60px"
        align="center"
        header-align="center"
      >
        <template #header>
          <el-button link @click="requestData" :icon="Refresh"> </el-button>
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
      title="AREA PARKIR"
      width="500px"
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

        <el-form-item
          label="Jenis Kendaraan"
          :error="formErrors.jenis_kendaraan?.join(', ')"
        >
          <el-select
            v-model="formModel.jenis_kendaraan"
            placeholder="Jenis Kendaraan"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="k in jenisKendaraanList"
              :value="k.nama"
              :label="k.nama"
              :key="k.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="Kapasitas"
          :error="formErrors.kapasitas?.join(', ')"
        >
          <el-input
            type="number"
            placeholder="Kapasitas"
            v-model="formModel.kapasitas"
          ></el-input>
        </el-form-item>

        <el-form-item label="Terisi" :error="formErrors.terisi?.join(', ')">
          <el-input
            type="number"
            placeholder="Terisi"
            v-model="formModel.terisi"
          ></el-input>
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
  </div>
</template>

<script setup>
const store = useWebsiteStore();
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
} = useCrud("/api/areaParkir");

const jenisKendaraanList = computed(() => store.jenisKendaraanList);

onMounted(() => {
  requestData();
});
</script>
