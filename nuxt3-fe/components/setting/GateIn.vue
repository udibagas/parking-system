<template>
  <div>
    <div class="text-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="openForm()"
        size="small"
        >TAMBAH GATE MASUK</el-button
      >
    </div>

    <br />

    <el-table
      :data="tableData.data"
      height="calc(100vh - 300px)"
      v-loading="loading"
    >
      <el-table-column
        prop="shortcut_key"
        label="#"
        min-width="30px"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column min-width="100" label="Status" prop="status">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="scope.row.status ? 'success' : 'info'"
            size="small"
            >{{ scope.row.status ? "Aktif" : "Tidak Aktif" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="nama" label="Nama" min-width="100px">
      </el-table-column>
      <el-table-column
        prop="jenis_kendaraan"
        label="Jenis Kendaraan"
        min-width="130px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="controller_ip_address"
        label="Controller"
        min-width="150px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="!!scope.row.controller_ip_address">
            {{ scope.row.controller_ip_address }}:{{
              scope.row.controller_port
            }}
          </span>
          <br v-if="!!scope.row.controller_ip_address" />
          <span v-if="!!scope.row.controller_device">
            {{ scope.row.controller_device }}:{{
              scope.row.controller_baudrate
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        label="Printer"
        prop="printer.nama"
      ></el-table-column>

      <el-table-column min-width="150" label="Kamera">
        <template slot-scope="scope">
          {{
            scope.row.kameraList
              ? scope.row.kameraList.map((k) => k.nama).join(",")
              : ""
          }}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        width="40px"
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
                icon="el-icon-edit-outline"
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
      v-loading="loading"
      title="GATE MASUK"
      :close-on-click-modal="false"
      :visible.sync="showForm"
    >
      <el-form label-position="left" label-width="150px">
        <el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
          <el-input placeholder="Nama" v-model="formModel.nama"></el-input>
          <div class="el-form-item__error" v-if="formErrors.nama">
            {{ formErrors.nama[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Shortcut Key"
          :class="formErrors.shortcut_key ? 'is-error' : ''"
        >
          <el-input
            maxlength="1"
            placeholder="Shortcut Key"
            v-model="formModel.shortcut_key"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.shortcut_key">
            {{ formErrors.shortcut_key[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Jenis Kendaraan"
          :class="formErrors.jenis_kendaraan ? 'is-error' : ''"
        >
          <el-input
            placeholder="Jenis Kendaraan"
            v-model="formModel.jenis_kendaraan"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
            {{ formErrors.jenis_kendaraan[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Alamat IP Kontroler"
          :class="formErrors.controller_ip_address ? 'is-error' : ''"
        >
          <el-input
            placeholder="Alamat IP Kontroler"
            v-model="formModel.controller_ip_address"
          ></el-input>
          <div
            class="el-form-item__error"
            v-if="formErrors.controller_ip_address"
          >
            {{ formErrors.controller_ip_address[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Port Kontroler"
          :class="formErrors.controller_port ? 'is-error' : ''"
        >
          <el-input
            type="number"
            placeholder="Port Kontroler"
            v-model="formModel.controller_port"
          ></el-input>
          <div class="el-form-item__error" v-if="formErrors.controller_port">
            {{ formErrors.controller_port[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Printer"
          :class="formErrors.printer_id ? 'is-error' : ''"
        >
          <el-select
            v-model="formModel.printer_id"
            placeholder="Printer"
            style="width: 100%"
          >
            <el-option
              v-for="printer in printerList"
              :value="printer.id"
              :label="printer.nama"
              :key="printer.id"
            ></el-option>
          </el-select>
          <div class="el-form-item__error" v-if="formErrors.printer_id">
            {{ formErrors.printer_id[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Kamera"
          :class="formErrors.kamera ? 'is-error' : ''"
        >
          <el-select
            v-model="formModel.kamera"
            placeholder="Kamera"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="kamera in kameraList"
              :value="kamera.id"
              :label="kamera.nama"
              :key="kamera.id"
            ></el-option>
          </el-select>
          <div class="el-form-item__error" v-if="formErrors.kamera">
            {{ formErrors.kamera[0] }}
          </div>
        </el-form-item>

        <el-form-item
          label="Status"
          :class="formErrors.status ? 'is-error' : ''"
        >
          <el-select
            v-model="formModel.status"
            placeholder="Status"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in ['Tidak Aktif', 'Aktif']"
              :value="i"
              :label="t"
              :key="i"
            ></el-option>
          </el-select>
          <div class="el-form-item__error" v-if="formErrors.status">
            {{ formErrors.status[0] }}
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button icon="el-icon-error" @click="closeForm">BATAL</el-button>
        <el-button type="primary" icon="el-icon-success" @click="save"
          >SIMPAN</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import crud from "@/mixins/crud";
import { mapState, mapStores } from "pinia";

export default {
  mixins: [crud],

  data() {
    return {
      url: "/api/gateIn",
    };
  },

  methods: {
    afterSave() {
      this.websiteStore.getGateInList();
    },

    afterDelete() {
      this.websiteStore.getGateInList();
    },
  },

  computed: {
    ...mapStores(useWebsiteStore),
    ...mapState({
      jenisKendaraanList: "jenisKendaraanList",
      printerList: "printerList",
      kameraList: "kameraList",
    }),
  },
};
</script>
