<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="
      !formModel.id
        ? 'TRANSAKSI MANUAL'
        : 'EDIT TRANSAKSI ' + formModel.nomor_barcode
    "
    :model-value="show"
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
              format="DD-MMM-YYYY HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
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
              format="DD-MMM-YYYY HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
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

<script setup>
import { CircleCloseFilled, SuccessFilled } from "@element-plus/icons-vue";

const store = useWebsiteStore();
const emit = defineEmits(["close", "reload"]);
const { show, model } = defineProps(["show", "model"]);

const loading = ref(false);
const formErrors = ref({});

const formModel = computed(() => model);
const posList = computed(() => store.posList);
const gateOutList = computed(() => store.gateOutList);
const gateInList = computed(() => store.gateInList);
const jenisKendaraanList = computed(() => store.jenisKendaraanList);
const durasi = computed(() => {
  var date1 = moment(formModel.value.time_in);
  var date2 = moment(formModel.value.time_out);
  var duration = moment.duration(date2.diff(date1));
  return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
});

const closeForm = () => {
  formErrors.value = {};
  emit("close");
};

const save = () => {
  loading.value = true;
  formModel.value.manual = 1;

  api("/api/parkingTransaction", { method: "POST", body: formModel })
    .then((r) => {
      ElMessage({
        message: "Data berhasil disimpan",
        type: "success",
        showClose: true,
      });

      closeForm();
      emit("reload");
      // TODO: handle if this error
      openGate(formModel.value.gate_out_id);
    })
    .catch((e) => {
      if (e.response.status == 422) {
        formErrors.value = e.response.data.errors;
      }
    })
    .finally(() => (loading.value = false));
};

const openGate = (gate_out_id) => {
  const pos = posList.value.find((p) => p.id == formModel.value.pos_id);
  const gate = gateOutList.value.find((g) => g.id == gate_out_id);

  const ws = new WebSocket(`ws://${pos.value.ip_address}:5678/`);

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
};
</script>
