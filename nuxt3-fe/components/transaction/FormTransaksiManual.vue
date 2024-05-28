<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="
      !formModel.id
        ? 'TRANSAKSI MANUAL'
        : 'EDIT TRANSAKSI ' + formModel.nomor_barcode
    "
    :visible.sync="show"
    width="800px"
    :before-close="(done) => closeForm()"
  >
    <el-form label-position="left" label-width="150px">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item
            label="Plat Nomor"
            :error="formErrors.plat_nomor?.join(', ')"
          >
            <el-input
              placeholder="Plat Nomor"
              v-model="formModel.plat_nomor"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Gate Masuk"
            :error="formErrors.gate_in_id?.join(', ')"
          >
            <el-select
              v-model="formModel.gate_in_id"
              placeholder="Gate Masuk"
              style="width: 100%"
            >
              <el-option
                v-for="(g, i) in gateInList"
                :value="g.id"
                :label="g.nama"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Waktu Masuk"
            :error="formErrors.time_in?.join(', ')"
          >
            <el-date-picker
              type="datetime"
              style="width: 100%"
              format="dd-MMM-yyyy HH:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="Waktu Masuk"
              v-model="formModel.time_in"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="Tarif (Rp)"
            :error="formErrors.tarif?.join(', ')"
          >
            <el-input
              type="number"
              placeholder="Tarif"
              v-model="formModel.tarif"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="User Admin"
            :error="formErrors.username?.join(', ')"
          >
            <el-input
              placeholder="User Admin"
              v-model="formModel.username"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="Jenis Kendaraan"
            :error="formErrors.jenis_kendaraan?.join(', ')"
          >
            <el-select
              v-model="formModel.jenis_kendaraan"
              placeholder="Jenis Kendaraan"
              style="width: 100%"
            >
              <el-option
                v-for="(v, i) in jenisKendaraanList"
                :value="v.nama"
                :label="v.nama"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Gate Keluar"
            :error="formErrors.gate_out_id?.join(', ')"
          >
            <el-select
              v-model="formModel.gate_out_id"
              placeholder="Gate Keluar"
              style="width: 100%"
            >
              <el-option
                v-for="(g, i) in gateOutList"
                :value="g.id"
                :label="g.nama"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Waktu Keluar"
            :error="formErrors.time_out?.join(', ')"
          >
            <el-date-picker
              type="datetime"
              :autocomplete="false"
              style="width: 100%"
              format="dd-MMM-yyyy HH:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="Waktu Keluar"
              v-model="formModel.time_out"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="Denda (Rp)"
            :error="formErrors.denda?.join(', ')"
          >
            <el-input
              type="number"
              placeholder="Denda"
              v-model="formModel.denda"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Password Admin"
            :error="formErrors.password?.join(', ')"
          >
            <el-input
              type="password"
              placeholder="Password Admin"
              v-model="formModel.password"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button :icon="CircleCloseFilled" @click="closeForm">
        BATAL
      </el-button>
      <el-button type="primary" :icon="SuccessFilled" @click="save">
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from "pinia";

export default {
  props: ["show", "model"],

  computed: {
    formModel() {
      return this.model;
    },

    durasi() {
      var date1 = moment(this.formModel.time_in);
      var date2 = moment(this.formModel.time_out);
      var duration = moment.duration(date2.diff(date1));
      return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    },
    ...mapState(useWebsiteStore, {
      posList: "posList",
      gateOutList: "gateOutList",
      gateInList: "gateInList",
      jenisKendaraanList: "jenisKendaraanList",
    }),
  },

  data() {
    return {
      formErrors: {},
      loading: false,
    };
  },

  methods: {
    closeForm() {
      this.formErrors = {};
      this.$emit("close");
    },

    save() {
      this.loading = true;
      this.formModel.manual = 1;

      this.$axios
        .$post("/api/parkingTransaction", this.formModel)
        .then((r) => {
          ElMessage({
            message: "Data berhasil disimpan",
            type: "success",
            showClose: true,
          });

          this.closeForm();
          this.$emit("reload");
          // TODO: handle if this error
          this.openGate(this.formModel.gate_out_id);
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.formErrors = e.response.data.errors;
          }
        })
        .finally(() => (this.loading = false));
    },

    openGate(gate_out_id) {
      const pos = this.posList.find((p) => p.id == this.formModel.pos_id);
      const gate = this.gateOutList.find((g) => g.id == gate_out_id);

      const ws = new WebSocket(`ws://${pos.ip_address}:5678/`);

      ws.onerror = (event) => {
        ElMessage({
          message: "KONEKSI KE POS GAGAL",
          type: "error",
        });
      };

      ws.onopen = (event) => {
        ws.send(
          [
            "open",
            gate.device,
            gate.baudrate,
            gate.open_command,
            gate.close_command,
          ].join(";")
        );
      };

      ws.onmessage = (event) => {
        let data = JSON.parse(event.data);
        ElMessage({
          message: data.message,
          type: data.status ? "success" : "error",
        });
        ws.close();
      };
    },
  },
};
</script>
