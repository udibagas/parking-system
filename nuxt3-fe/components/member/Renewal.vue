<template>
  <div>
    <el-form inline class="text-right" @submit.native.prevent>
      <el-form-item>
        <el-button
          :icon="Plus"
          size="small"
          @click="openForm({})"
          type="primary"
        >
          INPUT PEMBAYARAN KEANGGOTAAN
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          style="margin-top: 5px; width: 250px"
          size="small"
          @change="requestData"
          v-model="filters.dateRange"
          format="dd/MMM/yyyy"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="Dari tgl"
          end-placeholder="Sampai tgl"
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
          style="width: 150px"
        >
        </el-input>
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
        type="index"
        :index="tableData.from"
        label="#"
      ></el-table-column>

      <el-table-column
        prop="created_at"
        label="Tanggal Trx"
        sortable="custom"
        min-width="180"
      >
        <template #default="{ row }">
          {{ moment(row.created_at).format("DD-MMM-YYYY HH:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="nama_member"
        label="Nama"
        sortable="custom"
        show-overflow-tooltip
        min-width="120"
      >
      </el-table-column>

      <el-table-column
        prop="nomor_kartu"
        label="Nomor Kartu"
        sortable="custom"
        min-width="130"
      ></el-table-column>

      <el-table-column
        prop="dari_tanggal"
        label="Dari Tanggal"
        width="150px"
        sortable="custom"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          {{ moment(row.dari_tanggal).format("DD-MMM-YYYY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="sampai_tanggal"
        label="Sampai Tanggal"
        width="160px"
        sortable="custom"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          {{ moment(row.sampai_tanggal).format("DD-MMM-YYYY") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="jumlah"
        label="Jumlah"
        sortable="custom"
        align="right"
        header-align="right"
        min-width="120"
      >
        <template #default="{ row }">
          Rp. {{ row.jumlah.toLocaleString("id-ID") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="operator"
        label="Operator"
        sortable="custom"
        min-width="120"
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
                  :icon="Printer"
                  @click.native.prevent="
                    () => {
                      selectedData = row;
                      showPrintDialog = true;
                    }
                  "
                  >Print Slip</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="$auth.user.role == 1"
                  :icon="Edit"
                  @click.native.prevent="openForm(row)"
                  >Edit</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="$auth.user.role == 1"
                  :icon="Delete"
                  @click.native.prevent="deleteData(row.id)"
                  >Hapus</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
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

    <el-dialog
      :visible.sync="showForm"
      :title="
        !!formModel.id
          ? 'EDIT PEMBAYARAN KEANGGOTAAN'
          : 'INPUT PEMBAYARAN KEANGGOTAAN'
      "
      v-loading="loading"
      :close-on-click-modal="false"
    >
      <el-form label-width="180px" label-position="left">
        <el-form-item label="Member" :error="formErrors.member_id?.join(', ')">
          <el-select
            filterable
            default-first-option
            clearable
            v-model="formModel.member_id"
            placeholder="Member"
            style="width: 100%"
          >
            <el-option
              v-for="(m, i) in memberList.filter((m) => m.berbayar)"
              :value="m.id"
              :label="m.nomor_kartu + ' - ' + m.nama"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="Siklus Pembayaran"
          :error="formErrors.siklus_pembayaran?.join(', ')"
        >
          <el-input
            type="number"
            v-model="formModel.siklus_pembayaran"
            style="width: 30%"
          ></el-input>
          <el-select
            placeholder="Pilih"
            v-model="formModel.siklus_pembayaran_unit"
            style="width: 66%; float: right; clear: right"
          >
            <el-option
              v-for="(s, i) in siklus"
              :value="s.value"
              :label="s.label"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="Dari Tanggal"
          :error="formErrors.dari_tanggal?.join(', ')"
        >
          <el-date-picker
            format="dd-MMM-yyyy"
            value-format="yyyy-MM-dd"
            placeholder="Dari Tanggal"
            v-model="formModel.dari_tanggal"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="Sampai Tanggal"
          :error="formErrors.sampai_tanggal?.join(', ')"
        >
          <el-date-picker
            disabled
            format="dd-MMM-yyyy"
            value-format="yyyy-MM-dd"
            placeholder="Sampai Tanggal"
            v-model="sampai_tanggal"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Jumlah" :error="formErrors.jumlah?.join(', ')">
          <el-input
            type="number"
            placeholder="Jumlah"
            v-model="formModel.jumlah"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button :icon="CircleCloseFilled" @click="closeForm">
          BATAL
        </el-button>
        <el-button :icon="SuccessFilled" type="primary" @click="submit">
          SIMPAN
        </el-button>
      </template>
    </el-dialog>

    <PrintDialog
      :show="showPrintDialog"
      @print="(printer_id) => printSlip(printer_id)"
      @close="showPrintDialog = false"
    />
  </div>
</template>

<script>
import crud from "@/mixins/crud";
import { mapState, mapStores } from "pinia";

export default {
  mixins: [crud],

  data() {
    return {
      url: "/api/memberRenewal",
      showPrintDialog: false,
      selectedData: {},
    };
  },

  computed: {
    sampai_tanggal() {
      try {
        return moment(this.formModel.dari_tanggal, "YYYY-MM-DD")
          .add(
            this.formModel.siklus_pembayaran,
            this.formModel.siklus_pembayaran_unit
          )
          .format("YYYY-MM-DD");
      } catch (error) {
        return "";
      }
    },
    ...mapState(useWebsiteStore, {
      memberList: "memberList",
      siklus: "siklus",
    }),
    ...mapStores(useWebsiteStore),
  },

  methods: {
    submit() {
      this.formModel.sampai_tanggal = this.sampai_tanggal;
      this.save();
    },

    printSlip(printer_id) {
      this.$axios
        .$post(`${this.url}/printSlip/${this.selectedData.id}`, {
          printer_id,
        })
        .then((r) => {
          ElMessage({
            message: r.message,
            type: "success",
          });
        })
        .finally(() => {
          this.showPrintDialog = false;
        });
    },
  },
};
</script>
