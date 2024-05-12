<template>
  <div>
    <div class="text-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="openForm({})"
        size="small"
        >TAMBAH AREA PARKIR</el-button
      >
    </div>

    <br />

    <el-table :data="tableData.data" stripe height="calc(100vh - 300px)">
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
        <template slot-scope="scope">
          {{ scope.row.jenis_kendaraan.join(", ") }}
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
        <template slot="header">
          <el-button link @click="requestData" icon="el-icon-refresh">
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                @click.native.prevent="openForm(scope.row)"
                >Edit</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native.prevent="deleteData(scope.row.id)"
                >Hapus</el-dropdown-item
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

    <el-dialog
      :visible.sync="showForm"
      title="AREA PARKIR"
      v-loading="loading"
      :close-on-click-modal="false"
    >
      <el-form label-width="150px" label-position="left">
        <el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
          <div class="el-form-item__error" v-if="formErrors.nama">
            {{ formErrors.nama[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Keterangan"
          :class="formErrors.keterangan ? 'is-error' : ''"
        >
          <el-input
            placeholder="Keterangan"
            v-model="formModel.keterangan"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.keterangan">
            {{ formErrors.keterangan[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Jenis Kendaraan"
          :class="formErrors.jenis_kendaraan ? 'is-error' : ''"
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
          <div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
            {{ formErrors.jenis_kendaraan[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Kapasitas"
          :class="formErrors.kapasitas ? 'is-error' : ''"
        >
          <el-input
            type="number"
            placeholder="Kapasitas"
            v-model="formModel.kapasitas"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.kapasitas">
            {{ formErrors.kapasitas[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Terisi"
          :class="formErrors.terisi ? 'is-error' : ''"
        >
          <el-input
            type="number"
            placeholder="Terisi"
            v-model="formModel.terisi"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.terisi">
            {{ formErrors.terisi[0] }}
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button icon="el-icon-error" type="plain" @click="closeForm">
          BATAL
        </el-button>
        <el-button type="primary" icon="el-icon-success" @click="save">
          SIMPAN
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "pinia";
import crud from "@/mixins/crud";

export default {
  mixins: [crud],

  data() {
    return { url: "/api/areaParkir" };
  },

  computed: {
    ...mapState(useWebsiteStore, { jenisKendaraanList: "jenisKendaraanList" }),
  },
};
</script>
