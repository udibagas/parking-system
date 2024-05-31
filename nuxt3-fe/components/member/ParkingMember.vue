<template>
  <form @submit.prevent class="flex justify-content-end mb-3">
    <el-button
      size="small"
      @click="openForm({ vehicles: [], register_date: now, tarif: 0 })"
      type="primary"
      :icon="Plus"
      class="mr-2"
    >
      TAMBAH MEMBER
    </el-button>
    <el-input
      size="small"
      v-model="keyword"
      placeholder="Cari"
      :prefix-icon="Search"
      :clearable="true"
      @change="searchData"
      style="width: 200px"
      class="mr-2"
    >
    </el-input>
    <el-button-group>
      <el-button
        :icon="Download"
        size="small"
        type="primary"
        @click="exportData('member-parkir')"
      ></el-button>
      <el-button
        :icon="Printer"
        size="small"
        type="primary"
        @click="print"
      ></el-button>
    </el-button-group>
  </form>

  <el-table
    :data="tableData.data"
    stripe
    @row-dblclick="
      (row, column, event) => {
        selectedData = row;
        showDetail = true;
      }
    "
    height="calc(100vh - 240px)"
    @filter-change="filterChange"
    v-loading="loading"
    @sort-change="sortChange"
  >
    <el-table-column
      type="index"
      :index="tableData.from"
      label="#"
    ></el-table-column>
    <el-table-column
      :filters="[
        { value: 1, text: 'Aktif' },
        { value: 0, text: 'Nonaktif' },
      ]"
      column-key="status"
      prop="status"
      label="Status"
      sortable="custom"
      min-width="120px"
      header-align="center"
      align="center"
    >
      <template #default="{ row }">
        <el-tag
          size="small"
          effect="dark"
          style="width: 100%"
          :type="row.status ? 'success' : 'info'"
        >
          {{ row.status ? "Aktif" : "Nonaktif" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="nama"
      label="Nama"
      sortable="custom"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>

    <el-table-column
      :filters="[
        { value: 'y', text: 'BERBAYAR' },
        { value: 'n', text: 'GRATIS' },
      ]"
      :filter-multiple="false"
      column-key="berbayar"
      prop="berbayar"
      label="Jenis"
      sortable="custom"
      min-width="100px"
      align="center"
      header-align="center"
    >
      <template #default="{ row }">
        {{ row.berbayar ? "BERBAYAR" : "GRATIS" }}
      </template>
    </el-table-column>

    <el-table-column
      :filters="groupMemberList.map((g) => ({ value: g.id, text: g.nama }))"
      column-key="group_member_id"
      prop="group.nama"
      label="Group"
      sortable="custom"
      show-overflow-tooltip
      min-width="120px"
    >
    </el-table-column>

    <el-table-column
      prop="nomor_kartu"
      label="Nomor Kartu"
      sortable="custom"
      show-overflow-tooltip
      min-width="150px"
    ></el-table-column>
    <el-table-column label="Plat Nomor" show-overflow-tooltip min-width="150px">
      <template #default="{ row }">
        {{ row.vehicles.map((v) => v.plat_nomor).join(", ") }}
      </template>
    </el-table-column>
    <el-table-column
      prop="register_date"
      label="Tgl Daftar"
      sortable="custom"
      min-width="120px"
      align="center"
      header-align="center"
    >
      <template #default="{ row }">
        {{ moment(row.register_date).format("DD-MMM-YYYY") }}
      </template>
    </el-table-column>
    <el-table-column
      prop="expiry_date"
      label="Tgl Kedaluarsa"
      sortable="custom"
      min-width="150px"
      align="center"
      header-align="center"
    >
      <template #default="{ row }">
        {{ moment(row.expiry_date).format("DD-MMM-YYYY") }}
      </template>
    </el-table-column>
    <el-table-column
      prop="tarif"
      label="Tarif"
      sortable="custom"
      min-width="100px"
      header-align="right"
      align="right"
    >
      <template #default="{ row }"> {{ toRupiah(row.tarif) }} </template>
    </el-table-column>
    <el-table-column
      prop="siklus_pembayaran"
      label="Siklus Bayar"
      sortable="custom"
      min-width="140px"
    >
      <template #default="{ row }">
        {{ row.siklus_pembayaran }}
        {{ siklus.find((s) => s.value == row.siklus_pembayaran_unit).label }}
      </template>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="Nomor HP"
      sortable="custom"
      show-overflow-tooltip
      min-width="130px"
    ></el-table-column>
    <!-- <el-table-column prop="email" label="Alamat Email" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column> -->
    <el-table-column
      prop="last_transaction"
      label="Trx Terkakhir"
      sortable="custom"
      min-width="150px"
    >
      <template #default="{ row }">
        {{
          row.last_transaction
            ? moment(row.last_transaction).format("DD-MMM-YYYY")
            : ""
        }}
      </template>
    </el-table-column>
    <el-table-column
      :filters="[
        { value: 'y', text: 'Ya' },
        { value: 'n', text: 'Tidak' },
      ]"
      :filter-multiple="false"
      column-key="expired"
      fixed="right"
      prop="expired"
      label="Expired"
      sortable="custom"
      min-width="120px"
      header-align="center"
      align="center"
    >
      <template #default="{ row }">
        <el-tag
          size="small"
          effect="dark"
          style="width: 100%"
          :type="row.expired ? 'danger' : 'success'"
          >{{ row.expired ? "Ya" : "Tidak" }}</el-tag
        >
      </template>
    </el-table-column>
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
                :icon="ZoomIn"
                @click.native.prevent="
                  () => {
                    selectedData = row;
                    showDetail = true;
                  }
                "
                >Lihat Detail</el-dropdown-item
              >
              <el-dropdown-item
                :icon="Edit"
                @click.native.prevent="openForm(row)"
              >
                Edit
              </el-dropdown-item>
              <el-dropdown-item
                v-if="user.role == 1"
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
    v-if="!!selectedData"
    center
    fullscreen
    title="INFORMASI MEMBER"
    v-model="showDetail"
  >
    <MemberParkingMemberDetail :member="selectedData" />
  </el-dialog>

  <el-dialog
    fullscreen
    center
    v-model="showForm"
    :title="!!formModel.id ? 'EDIT MEMBER' : 'TAMBAH MEMBER'"
    :close-on-click-modal="false"
  >
    <el-form label-width="150px" label-position="left">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item
            label="Group"
            :class="formErrors.group_member_id ? 'is-error' : ''"
          >
            <el-select
              v-model="formModel.group_member_id"
              placeholder="Group"
              style="width: 100%"
            >
              <el-option
                v-for="t in groupMemberList"
                :value="t.id"
                :label="t.nama"
                :key="t.id"
              ></el-option>
            </el-select>
            <div class="el-form-item__error" v-if="formErrors.group_member_id">
              {{ formErrors.group_member_id[0] }}
            </div>
          </el-form-item>

          <el-form-item label="Nama" :error="formErrors.nama?.join(', ')">
            <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
          </el-form-item>

          <el-form-item label="Nomor HP" :error="formErrors.phone?.join(', ')">
            <el-input
              placeholder="Nomor HP"
              v-model="formModel.phone"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Nomor Kartu"
            :error="formErrors.nomor_kartu?.join(', ')"
          >
            <el-input
              placeholder="Nomor Kartu"
              v-model="formModel.nomor_kartu"
            ></el-input>
          </el-form-item>
          <!-- DISINI -->

          <el-form-item
            label="Jenis Kartu"
            :error="formErrors.card_type?.join(', ')"
          >
            <el-select
              v-model="formModel.card_type"
              placeholder="Jenis Kartu"
              style="width: 100%"
            >
              <el-option
                v-for="(t, i) in ['RFID', 'UHF']"
                :value="t"
                :label="t"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="Tanggal Daftar"
            :error="formErrors.register_date?.join(', ')"
          >
            <el-date-picker
              format="DD/MMM/YYYY"
              value-format="YYYY-MM-DD"
              placeholder="Tanggal Daftar"
              v-model="formModel.register_date"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            label="Jenis Anggota"
            :error="formErrors.berbayar?.join(', ')"
          >
            <el-select
              v-model="formModel.berbayar"
              placeholder="Jenis Anggota"
              style="width: 100%"
            >
              <el-option
                v-for="(t, i) in ['Gratis', 'Berbayar']"
                :value="i"
                :label="t"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Tarif (Rp)"
            :error="formErrors.tarif?.join(', ')"
          >
            <el-input
              :disabled="!formModel.berbayar"
              type="number"
              placeholder="Tarif (Rp)"
              v-model="formModel.tarif"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="Siklus Pembayaran"
            :error="formErrors.siklus_pembayaran?.join(', ')"
          >
            <div class="flex">
              <el-input
                type="number"
                v-model="formModel.siklus_pembayaran"
                class="mr-2"
              ></el-input>
              <el-select v-model="formModel.siklus_pembayaran_unit">
                <el-option
                  v-for="(s, i) in siklus"
                  :value="s.value"
                  :label="s.label"
                  :key="i"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item
            label="Tanggal Kedaluarsa"
            :error="formErrors.expiry_date?.join(', ')"
          >
            <el-date-picker
              disabled
              format="DD/MMM/YYYY"
              value-format="YYYY-MM-DD"
              placeholder="Tanggal Kedaluarsa"
              v-model="expiry_date"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="Status" :error="formErrors.status?.join(', ')">
            <el-select
              v-model="formModel.status"
              placeholder="Status"
              style="width: 100%"
            >
              <el-option
                v-for="(t, i) in ['Nonaktif', 'Aktif']"
                :value="Boolean(i)"
                :label="t"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="formModel.vehicles">
      <el-table-column label="Jenis Kendaraan">
        <template #default="{ row }">
          <el-select
            size="small"
            v-model="row.jenis_kendaraan"
            placeholder="Jenis Kendaraan"
            style="width: 100%"
          >
            <el-option
              v-for="kendaraan in jenisKendaraanList"
              :value="kendaraan.nama"
              :label="kendaraan.nama"
              :key="kendaraan.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Plat Nomor">
        <template #default="{ row }">
          <el-input
            v-model="row.plat_nomor"
            placeholder="Plat Nomor"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Merk">
        <template #default="{ row }">
          <el-input
            v-model="row.merk"
            placeholder="Merk"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Tipe">
        <template #default="{ row }">
          <el-input
            v-model="row.tipe"
            placeholder="Tipe"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Tahun">
        <template #default="{ row }">
          <el-input
            type="number"
            v-model="row.tahun"
            placeholder="Tahun"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Warna">
        <template #default="{ row }">
          <el-input
            v-model="row.warna"
            placeholder="Warna"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="right" header-align="right">
        <template #header>
          <el-button
            :disabled="
              setting.jml_kendaraan_per_kartu > 0 &&
              formModel.vehicles.length >= setting.jml_kendaraan_per_kartu
            "
            :icon="Plus"
            @click="addVehicle"
            size="small"
            type="primary"
          ></el-button>
        </template>
        <template #default="scope">
          <el-button
            @click="deleteVehicle(scope.$index, scope.row.id)"
            :icon="Delete"
            size="small"
            type="danger"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-button :icon="CircleCloseFilled" @click="closeForm">
        BATAL
      </el-button>
      <el-button type="primary" :icon="SuccessFilled" @click="submit">
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import moment from "moment";
import {
  Refresh,
  Plus,
  SuccessFilled,
  CircleCloseFilled,
  Edit,
  Delete,
  MoreFilled,
  ZoomIn,
  Download,
  Printer,
  Search,
} from "@element-plus/icons-vue";

const config = useRuntimeConfig();
const store = useWebsiteStore();
const { user } = useSanctumAuth();

const {
  api,
  showForm,
  formModel,
  formErrors,
  pageSize,
  tableData,
  loading,
  keyword,
  filters,
  sort_prop,
  sort_order,
  currentChange,
  sizeChange,
  filterChange,
  sortChange,
  openForm,
  save,
  deleteData,
  requestData,
  searchData,
  refreshData,
  toRupiah,
} = useCrud("/api/member");

const selectedData = ref({ vehicles: [] });
const showDetail = ref(false);
const now = ref(moment().format("YYYY-MM-DD"));

const expiry_date = computed(() => {
  try {
    return moment(formModel.value.register_date, "YYYY-MM-DD")
      .add(
        formModel.value.siklus_pembayaran,
        formModel.value.siklus_pembayaran_unit
      )
      .format("YYYY-MM-DD");
  } catch (error) {
    return "";
  }
});

const groupMemberList = computed(() => store.groupMemberList);
const jenisKendaraanList = computed(() => store.jenisKendaraanList);
const siklus = computed(() => store.siklus);
const setting = computed(() => store.setting);

// watch(
//   () => formModel.value.berbayar,
//   (berbayar) => {
//     if (!berbayar) {
//       formModel.value.tarif = 0;
//     }
//   }
// );

const closeForm = () => {
  showForm.value = false;
  formModel.value = { vehicles: [] };
  formErrors.value = {};
};

const submit = () => {
  formModel.value.expiry_date = expiry_date;
  save();
};

const print = () => {
  const params = {
    sort_prop: sort_prop.value || "nama",
    sort_order: sort_order.value || "asc",
    action: "print",
    ...filters.value,
  };

  const querystring = new URLSearchParams(params).toString();
  window.open(`${config.public.apiBase}/api/member?${querystring}`, "_blank");
};

const addVehicle = () => {
  if (
    formModel.value.vehicles.length < setting.value.jml_kendaraan_per_kartu ||
    setting.jml_kendaraan_per_kartu == 0
  ) {
    formModel.value.vehicles.push({
      plat_nomor: "",
      jenis_kendaraan: "",
      tipe: "",
      merk: "",
      tahun: "",
      warna: "",
    });
  } else {
    ElMessage({
      message: `Jumlah maksimal kendaraan per kartu adalah ${setting.jml_kendaraan_per_kartu}`,
      type: "error",
    });
  }
};

const deleteVehicle = (index, id) => {
  if (!id) {
    formModel.value.vehicles.splice(index, 1);
  } else {
    api(`/api/memberVehicle/${id}`, { method: "DELETE" }).then((r) => {
      formModel.value.vehicles.splice(index, 1);
    });
  }
};

onMounted(() => {
  formModel.value = { vehicles: [] };
  requestData();
});
</script>
