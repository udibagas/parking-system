<template>
  <div class="text-right">
    <el-button size="small" :icon="Plus" @click="openForm()" type="primary">
      TAMBAH JENIS KENDARAAN
    </el-button>
  </div>

  <br />

  <el-table :data="tableData.data" stripe v-loading="loading">
    <el-table-column
      type="index"
      :index="tableData.from"
      label="#"
    ></el-table-column>

    <el-table-column
      prop="nama"
      label="Nama"
      min-width="100px"
    ></el-table-column>

    <el-table-column
      prop="group"
      label="Group"
      min-width="100px"
    ></el-table-column>

    <el-table-column
      prop="shortcut_key"
      label="Shortcut"
      align="center"
      header-align="center"
      min-width="100px"
    ></el-table-column>

    <el-table-column
      label="Mode Tarif"
      align="center"
      header-align="center"
      min-width="120px"
    >
      <template #default="{ row }">
        {{ row.mode_tarif ? "PROGRESIF" : "FLAT" }}
      </template>
    </el-table-column>
    <el-table-column
      label="Mode Inap"
      align="center"
      header-align="center"
      min-width="120px"
    >
      <template #default="{ row }">
        {{ row.mode_menginap ? "LEWAT TENGAH MALAM" : "24 JAM DARI CHECK IN" }}
      </template>
    </el-table-column>
    <el-table-column
      prop="tarif_flat"
      label="Tarif Flat"
      align="center"
      header-align="center"
      min-width="120px"
    >
      <template #default="{ row }">
        {{ toRupiah(row.tarif_flat) }}
      </template>
    </el-table-column>
    <el-table-column label="Tarif Non Flat" min-width="250px">
      <template #default="{ row }">
        Tarif {{ row.menit_pertama }} menit pertama =
        {{ toRupiah(row.tarif_menit_pertama) }} <br />
        Tarif {{ row.menit_selanjutnya }} menit selanjutnya =
        {{ toRupiah(row.tarif_menit_selanjutnya) }} <br />
        Tarif maksimal per hari = {{ toRupiah(row.tarif_maksimum) }}
        <br />
        Tarif menginap per hari = {{ toRupiah(row.tarif_menginap) }}
        <br />
      </template>
    </el-table-column>
    <el-table-column
      prop="denda_tiket_hilang"
      label="Denda Tiket Hilang"
      align="center"
      header-align="center"
      min-width="150px"
    >
      <template #default="{ row }">
        {{ toRupiah(row.denda_tiket_hilang) }}
      </template>
    </el-table-column>
    <el-table-column width="60px" align="center" header-align="center">
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
    title="JENIS KENDARAAN"
    width="700px"
    :close-on-click-modal="false"
  >
    <el-form label-width="200px" label-position="left">
      <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
        <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
      </el-form-item>

      <el-form-item label="Group" :error="formErrors.group?.join(', ')">
        <el-input placeholder="Group" v-model="formModel.group"></el-input>
      </el-form-item>

      <el-form-item
        label="Shortcut Key"
        :error="formErrors.shortcut_key?.join(', ')"
      >
        <el-input
          maxlength="1"
          placeholder="Shortcut Key"
          v-model="formModel.shortcut_key"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Mode Inap"
        :error="formErrors.mode_menginap?.join(', ')"
      >
        <el-select
          placeholder="Mode Inap"
          v-model="formModel.mode_menginap"
          style="width: 100%"
        >
          <el-option :value="0" label="24 JAM DARI CHECK IN"></el-option>
          <el-option :value="1" label="LEWAT TENGAH MALAM"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Tarif menginap per hari (Rp)"
        :error="formErrors.tarif_menginap?.join(', ')"
      >
        <el-input
          type="number"
          placeholder="Tarif menginap per hari (Rp)"
          v-model="formModel.tarif_menginap"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Denda Tiket Hilang (Rp)"
        :error="formErrors.denda_tiket_hilang?.join(', ')"
      >
        <el-input
          type="number"
          :step="500"
          placeholder="Denda Tiket Hilang (Rp)"
          v-model="formModel.denda_tiket_hilang"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Mode Tarif"
        :error="formErrors.mode_tarif?.join(', ')"
      >
        <el-select
          placeholder="FLAT/PROGRESIF"
          v-model="formModel.mode_tarif"
          style="width: 100%"
        >
          <el-option :value="0" label="FLAT"></el-option>
          <el-option :value="1" label="PROGRESIF"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-show="formModel.mode_tarif === 0"
        label="Tarif Flat (Rp)"
        :error="formErrors.tarif_flat?.join(', ')"
      >
        <el-input
          type="number"
          :step="500"
          placeholder="Tarif Flat (Rp)"
          v-model="formModel.tarif_flat"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Tarif maksimal per hari (Rp)"
        v-show="formModel.mode_tarif === 1"
        :error="formErrors.tarif_maksimum?.join(', ')"
      >
        <el-input
          type="number"
          placeholder="Tarif maksimal per hari (Rp)"
          v-model="formModel.tarif_maksimum"
        ></el-input>
      </el-form-item>

      <el-form-item label="Tarif Progresif" v-show="formModel.mode_tarif === 1">
        <div class="mb-2 flex">
          <el-input
            type="number"
            v-model="formModel.menit_pertama"
            style="width: 250px"
            class="mr-2"
            placeholder="Menit Pertama"
          ></el-input>
          <el-input
            type="number"
            v-model="formModel.tarif_menit_pertama"
            :placeholder="`Tarif ${formModel.menit_pertama} menit pertama (Rp)`"
          ></el-input>
        </div>

        <div class="flex">
          <el-input
            type="number"
            v-model="formModel.menit_selanjutnya"
            style="width: 250px"
            class="mr-2"
            placeholder="Menit Selanjutnya"
          ></el-input>
          <el-input
            type="number"
            v-model="formModel.tarif_menit_selanjutnya"
            :placeholder="`Tarif ${formModel.menit_selanjutnya} menit selanjutnya (Rp)`"
          ></el-input>
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
        @click="save(getJenisKendaraanList)"
      >
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
const { getJenisKendaraanList } = useWebsiteStore();
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
} = useCrud("/api/jenisKendaraan");

onMounted(() => {
  requestData();
});
</script>
