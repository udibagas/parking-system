<template>
  <div v-if="pos" class="flex" id="gate-out-app">
    <div style="width: 600px; flex-shrink: 0">
      <h1 class="mt-0 mb-3 p-2 bg-red text-white text-center text-xl">
        {{ pos.nama }}
      </h1>

      <el-row
        v-if="!setting.disable_plat_nomor"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <el-col :span="10">
          <div class="label-big">[-] NO. PLAT</div>
        </el-col>
        <el-col :span="14">
          <input
            id="plat-nomor"
            autocomplete="off"
            @keyup.enter="cekPlatNomor"
            type="text"
            placeholder="NO. PLAT"
            v-model="formModel.plat_nomor"
            class="my-input"
          />
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="10">
          <div class="label-big">[+] NO. TIKET/KARTU</div>
        </el-col>
        <el-col :span="14">
          <input
            id="nomor-tiket"
            autocomplete="off"
            @keyup.enter="cekTiket"
            @keydown.tab="cekTiket"
            type="text"
            placeholder="NO. TIKET/KARTU"
            v-model="formModel.nomor_barcode"
            class="my-input"
          />
        </el-col>
      </el-row>

      <el-row
        v-if="jenisKendaraanList.length > 1"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <el-col :span="10">
          <div class="label-big">[*] JENIS KENDARAAN</div>
        </el-col>
        <el-col :span="14">
          <select
            @change="hitungTarif"
            v-model="formModel.jenis_kendaraan"
            id="jenis-kendaraan"
            class="my-input"
            placeholder="JENIS KENDARAAN"
          >
            <option v-for="g in jenisKendaraanList" :value="g.nama" :key="g.id">
              {{ g.shortcut_key }} - {{ g.nama }}
            </option>
          </select>
        </el-col>
      </el-row>

      <el-row
        v-show="formModel.nomor_barcode == 'xxxxx'"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <el-col :span="10">
          <div class="label-big">[*] JAM MASUK</div>
        </el-col>
        <el-col :span="14">
          <input
            @keyup.enter="toGateIn"
            @change="hitungTarif"
            id="time-in"
            v-mask="'####-##-## ##:##'"
            v-model="formModel.time_in"
            class="my-input"
          />
        </el-col>
      </el-row>

      <el-row
        v-show="formModel.nomor_barcode == 'xxxxx'"
        v-if="gateInList.length > 1"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <el-col :span="10">
          <div class="label-big">GATE MASUK</div>
        </el-col>
        <el-col :span="14">
          <select
            @change="toSubmit"
            v-model="formModel.gate_in_id"
            id="gate-in"
            class="my-input"
          >
            <option v-for="g in gateInList" :value="g.id" :key="g.id">
              {{ g.shortcut_key }} - {{ g.nama }}
            </option>
          </select>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="10">
          <div class="label-big">TARIF</div>
        </el-col>
        <el-col :span="14">
          <input
            disabled
            v-model="formModel.tarif"
            class="my-input bg-red-700 text-white"
          />
        </el-col>
      </el-row>

      <el-row
        v-if="formModel.nomor_barcode == 'xxxxx'"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <el-col :span="10">
          <div class="label-big">TARIF + DENDA</div>
        </el-col>
        <el-col :span="14">
          <input
            disabled
            :value="Number(formModel.tarif) + Number(formModel.denda)"
            class="my-input bg-red-700 text-white"
          />
        </el-col>
      </el-row>

      <button
        id="submit-btn"
        @keyup.right="nextBtn"
        @keyup.down="nextBtn"
        @keydown.enter="submit(true)"
        class="my-big-btn"
        @click="submit(true)"
      >
        BUKA GATE
      </button>
      <button
        id="submit-btn1"
        @keyup.left="prevBtn"
        @keyup.up="prevBtn"
        @keydown.enter="printLastTrx"
        class="my-big-btn"
        @click="printLastTrx"
      >
        [F12] PRINT STRUK TRANSAKSI TERAKHIR
      </button>

      <el-row :gutter="10">
        <el-col :span="12">
          <button
            @keydown.enter="printReport"
            class="my-big-btn"
            @click="printReport"
          >
            [F10] PRINT LAPORAN
          </button>
          <!-- <button
							@keydown.enter="openGateMemberUHF"
							class="my-big-btn"
							@click="openGateMemberUHF"
						>
							[F10] BUKA GATE UHF
						</button> -->
        </el-col>
        <el-col :span="12">
          <button
            class="my-big-btn"
            @keydown.enter="showManualOpenForm = true"
            @click="showManualOpenForm = true"
          >
            [F11] BUKA GATE MANUAL
          </button>
        </el-col>
      </el-row>
    </div>

    <div
      :class="{ 'ml-5': true, flex: setting.orientasi_kamera == 'POTRAIT' }"
      style="width: 100%"
    >
      <div class="mb-1" style="width: 100%" v-for="s in snapshots" :key="s.id">
        <img :src="s.url" style="width: 700px" />
      </div>
    </div>

    <TransactionFormBukaManual
      :show="showManualOpenForm"
      @close="showManualOpenForm = false"
      :gateOutList="pos.gate_outs"
      @open-gate="(gate_out_id) => openGate(gate_out_id)"
    />

    <NotificationMessage />
  </div>

  <div
    v-else
    class="flex flex-row justify-content-center align-items-center"
    style="height: calc(100vh - 145px)"
  >
    <div class="text-center text-5xl text-danger">
      KOMPUTER INI TIDAK TERDAFTAR SEBAGAI POS
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
definePageMeta({ layout: "default" });
const store = useWebsiteStore();
const { api, toRupiah } = useCrud();
const instance = getCurrentInstance();

const formModel = reactive({ nomor_barcode: "", tarif: "", denda: "" });
const snapshots = ref([]);
const showManualOpenForm = ref(false);
const ws = ref(null);
const updateTarifInterval = ref(null);

const pos = computed(() => store.pos);
const setting = computed(() => store.setting);
const gateInList = computed(() => store.gateInList);
const jenisKendaraanList = computed(() => store.jenisKendaraanList);

const duration = computed(() => {
  if (!formModel.time_in || !formModel.time_out) {
    return "00:00:00";
  }

  // todo
  let time_in = moment(formModel.time_in);
  let time_out = moment(formModel.time_out);
  let day = time_out.diff(time_in, "days");
  let hour = time_out.diff(time_in, "hours");
  let minute = time_out.diff(time_in, "minutes");
  let second = time_out.diff(time_in, "seconds");

  return `${day}HR ${String(hour % 24).padStart(2, "0")}:${String(
    minute % 60
  ).padStart(2, "0")}`;
});

const totalBayar = computed(() => {
  return Number(formModel.tarif) + Number(formModel.denda);
});

const toSubmit = () => {
  runningText(`${duration}|${toRupiah(totalBayar)}`);
  document.querySelector("#submit-btn").focus();
};

const toGateIn = () => {
  if (gateInList.value.length == 1) {
    formModel.gate_in_id = gateInList.value[0].id;
  }

  if (!formModel.gate_in_id) {
    document.querySelector("#gate-in").focus();
  } else {
    document.querySelector("#submit-btn").focus();
  }

  runningText(`${duration}|${toRupiah(totalBayar)}`);
};

const nextBtn = () => {
  document.querySelector("#submit-btn1").focus();
};

const prevBtn = () => {
  document.querySelector("#submit-btn").focus();
};

const hitungTarif = () => {
  formModel.group = jenisKendaraanList.value.find(
    (k) => k.nama == formModel.jenis_kendaraan
  ).group;

  const gateOut = pos.value.gate_outs.find((g) => {
    return g.jenis_kendaraan.includes(formModel.jenis_kendaraan);
  });

  if (!gateOut) {
    ElMessage({
      message: "Tidak ada gate keluar untuk jenis kendaraan terkait",
      type: "error",
    });
    return;
  }

  formModel.gate_out_id = gateOut.id;

  if (formModel.id) {
    takeSnapshot();
  }

  if (formModel.is_member) {
    formModel.tarif = 0;
    document.querySelector("#submit-btn").focus();
    return;
  }

  const tarif = jenisKendaraanList.value.find(
    (v) => v.nama == formModel.jenis_kendaraan
  );

  if (!tarif) {
    ElMessage({
      message:
        "Tarif tidak ditemukan untuk jenis kendaraan " +
        formModel.jenis_kendaraan,
      type: "error",
      showClose: true,
    });

    formModel.tarif = 0;
    return;
  }

  if (formModel.nomor_barcode.toLowerCase() == "xxxxx") {
    formModel.denda = Number(tarif.denda_tiket_hilang);
  } else {
    formModel.denda = 0;
  }

  let timeIn = moment(formModel.time_in);
  let timeOut = formModel.time_out ? moment(formModel.time_out) : moment();
  let durasiMenit = timeOut.diff(timeIn, "minutes") || 1;

  let tarifMenitPertama = tarif.tarif_menit_pertama;

  // tak peduli flat atau progressif berlaku seperti ini
  if (durasiMenit <= tarif.menit_pertama) {
    formModel.tarif = tarifMenitPertama;
    document.querySelector("#submit-btn").focus();
    runningText(`${duration}|${toRupiah(totalBayar)}`);
    return;
  }

  let durasiReal = durasiMenit - tarif.menit_pertama;
  let hariParkir;

  // mode menginap 24 jam
  if (tarif.mode_menginap == 0) {
    hariParkir = Math.ceil(durasiMenit / (60 * 24));

    // mode tarif flat
    if (hariParkir == 0 && tarif.mode_tarif == 0) {
      hariParkir = 1;
    }
  }

  // mode menginap lewat tengah malam
  if (tarif.mode_menginap == 1) {
    let hariIn = moment(timeIn.format("YYYY-MM-DD"));
    let hariOut = moment(timeOut.format("YYYY-MM-DD"));
    hariParkir = 0;

    if (durasiMenit >= 60) {
      hariParkir = hariOut.diff(hariIn, "days") + 1;
    } else {
      hariParkir = 1;
    }
  }

  let hariMenginap = hariParkir >= 1 ? hariParkir - 1 : 0;
  let tarifMenginap = hariMenginap * tarif.tarif_menginap;

  // tarif flat per hari, kena tarif menginap, kena tarif maximal
  if (tarif.mode_tarif == 0) {
    formModel.tarif =
      tarifMenitPertama + hariParkir * tarif.tarif_flat + tarifMenginap;
  }

  // tarif progresif
  if (tarif.mode_tarif == 1) {
    let tarifMaksimum = hariMenginap * tarif.tarif_maksimum;

    // menginap 24 jam
    if (tarif.mode_menginap == 0) {
      const sisaMenit = durasiMenit % (60 * 24);
      let tarifHariTerakhir = 0;

      if (sisaMenit <= tarif.menit_pertama) {
        tarifHariTerakhir = tarif.tarif_menit_pertama;
      } else {
        tarifHariTerakhir =
          tarif.tarif_menit_pertama +
          Math.ceil(
            (sisaMenit - tarif.menit_pertama) / tarif.menit_selanjutnya
          ) *
            tarif.tarif_menit_selanjutnya;
      }

      if (tarifHariTerakhir > tarif.tarif_maksimum) {
        tarifHariTerakhir = tarif.tarif_maksimum;
      }

      formModel.tarif = tarifMaksimum + tarifHariTerakhir + tarifMenginap;
    }

    // menginap lewat lengahmalam
    if (tarif.mode_menginap == 1) {
      if (hariParkir > 1) {
        let menitHariPertama =
          moment(timeIn.format("YYYY-MM-DD") + " 24:00:00").diff(
            timeIn,
            "minutes"
          ) - tarif.menit_pertama;

        let menitHariTerakhir = timeOut.diff(
          moment(timeOut.format("YYYY-MM-DD") + " 00:00:00"),
          "minutes"
        );

        let tarifHariPertama =
          Math.ceil(menitHariPertama / tarif.menit_selanjutnya) *
          tarif.tarif_menit_selanjutnya;
        tarifHariTerakhir =
          Math.ceil(menitHariTerakhir / tarif.menit_selanjutnya) *
          tarif.tarif_menit_selanjutnya;

        if (tarifHariPertama > tarif.tarif_maksimum) {
          tarifHariPertama = tarif.tarif_maksimum;
        }

        if (tarifHariTerakhir > tarif.tarif_maksimum) {
          tarifHariTerakhir = tarif.tarif_maksimum;
        }

        if (hariParkir <= 2) {
          tarifMaksimum = 0;
        }

        formModel.tarif =
          tarifMenitPertama +
          tarifMaksimum +
          tarifHariPertama +
          tarifHariTerakhir +
          tarifMenginap;
      } else {
        tarifHariPertama =
          Math.ceil(durasiReal / tarif.menit_selanjutnya) *
          tarif.tarif_menit_selanjutnya;

        if (tarifHariPertama > tarif.tarif_maksimum) {
          tarifHariPertama = tarif.tarif_maksimum;
        }

        formModel.tarif = tarifMenitPertama + tarifHariPertama;
      }
    }
  }

  if (formModel.nomor_barcode.toLowerCase() == "xxxxx") {
    document.querySelector("#time-in").focus();
  } else {
    document.querySelector("#submit-btn").focus();
  }

  runningText(`${duration}|${toRupiah(totalBayar)}`);
};

const cekPlatNomor = () => {
  let query = { plat_nomor: formModel.plat_nomor };
  api("/api/member/search", { method: "get", query })
    .then((r) => {
      formModel.is_member = 1;
      formModel.tarif = 0;
    })
    .catch((e) => {
      formModel.is_member = 0;
    })
    .finally(() => {
      document.querySelector("#nomor-tiket").focus();
      instance?.proxy?.$forceUpdate();
    });
};

// hasil akhir ini harusnya tergantung dia ada jenis kendaraan berapa
const cekTiket = async () => {
  if (formModel.nomor_barcode.length < 5) return;

  let now = moment().format("YYYY-MM-DD HH:mm:ss");

  if (formModel.nomor_barcode.toLowerCase() == "xxxxx") {
    formModel.time_in = moment().format("YYYY-MM-DD");
    instance?.proxy?.$forceUpdate();
    formModel.time_out = now;

    if (jenisKendaraanList.value.length > 1) {
      document.querySelector("#jenis-kendaraan").focus();
    } else {
      formModel.jenis_kendaraan = jenisKendaraanList.value[0].nama;
      document.querySelector("#time-in").focus();
    }

    return;
  }

  try {
    let data = await api("/api/parkingTransaction/search", {
      query: { nomor_barcode: formModel.nomor_barcode },
    });

    snapshots.value = data.snapshots;
    const { id, gate_in_id, time_in, is_member, member } = data;
    formModel.id = id;
    formModel.gate_in_id = gate_in_id;
    // formModel.time_in = time_in;
    formModel.is_member = is_member;
    formModel.time_out = now;
    formModel.tarif = 0;

    instance?.proxy?.$forceUpdate();

    // jika bukan member
    if (!is_member && jenisKendaraanList.value.length > 1) {
      document.querySelector("#jenis-kendaraan").focus();
      return;
    }

    if (is_member) {
      if (!!member.expired) {
        ElAlert("Kartu telah habis masa berlaku", "Perhatian", {
          type: "warning",
          center: true,
          roundButton: true,
          confirmButtonText: "OK",
          confirmButtonClass: "bg-red",
        });
        formModel.is_member = 0;
        return false;
      }

      if (!member.expired && member.expired_in <= 5) {
        ElAlert(
          `Kartu akan habis masa berlaku dalam ${member.expired_in} hari`,
          "Perhatian",
          {
            type: "warning",
            center: true,
            roundButton: true,
            confirmButtonText: "OK",
            confirmButtonClass: "bg-red",
          }
        );
      }

      if (!!setting.value.disable_plat_nomor) {
        const vehicle = data.member.vehicles[0];
        formModel.jenis_kendaraan = vehicle.jenis_kendaraan;
        formModel.plat_nomor = vehicle.plat_nomor;

        // member auto open sesuai setingan
        if (!!setting.value.member_auto_open) {
          const gateOut = pos.gate_outs.find((g) => {
            return g.jenis_kendaraan.includes(formModel.jenis_kendaraan);
          });

          if (!gateOut) {
            ElMessage({
              message: "Tidak ada gate keluar untuk jenis kendaraan terkait",
              type: "error",
            });
            return;
          }

          formModel.gate_out_id = gateOut.id;

          if (formModel.id) {
            takeSnapshot();
          }

          save(false);
        }
      } else {
        let vehicle = member.vehicles.find(
          (v) => v.plat_nomor == formModel.plat_nomor
        );

        if (!vehicle) {
          ElAlert(
            "Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah " +
              member.vehicles.map((v) => v.plat_nomor).join(", "),
            "Perhatian",
            {
              type: "warning",
              center: true,
              roundButton: true,
              confirmButtonText: "OK",
              confirmButtonClass: "bg-red",
            }
          );
          document.querySelector("#plat-nomor").focus();
        } else {
          if (jenisKendaraanList.value.length > 1) {
            document.querySelector("#jenis-kendaraan").focus();
          }
        }
      }
    }

    if (jenisKendaraanList.value.length == 1) {
      formModel.jenis_kendaraan = jenisKendaraanList.value[0].nama;
      hitungTarif();
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 404) {
      ElMessage({
        message: error.response.data.message,
        type: "error",
        center: true,
        showClose: true,
        duration: 3000,
      });
    }
    document.querySelector("#nomor-tiket").focus();
  }
};

const resetForm = () => {
  resetRunningText();
  formModel.tarif = "";
  formModel.denda = "";
  formModel.gate_in_id = null;
  formModel.gate_out_id = null;
  formModel.jenis_kendaraan = null;
  formModel.plat_nomor = setting.value.plat_nomor_default;
  formModel.nomor_barcode = "";
  formModel.time_out = "";
  formModel.time_in = "";
  formModel.duration = "";

  snapshots.value = [];
  instance?.proxy?.$forceUpdate();

  if (setting.value.disable_plat_nomor) {
    console.log("ke nomor tiket");
    document.querySelector("#nomor-tiket").focus();
  } else {
    console.log("ke plat nomor");
    document.querySelector("#plat-nomor").focus();
  }
};

const submit = (ticket) => {
  // kalau tiket hilang harus isi time in dulu
  if (formModel.nomor_barcode.toLowerCase() == "xxxxx" && !formModel.time_in) {
    document.querySelector("#time-in").focus();
    return;
  } else {
    document.querySelector("#submit-btn").blur();
  }

  if (gateInList.value.length == 1) {
    formModel.gate_in_id = gateInList.value[0].id;
  }

  if (!formModel.gate_in_id) {
    ElMessage({
      message: "MOHON ISI GATE IN",
      type: "error",
      showClose: true,
    });
    return;
  }

  if (
    !formModel.nomor_barcode ||
    !formModel.gate_out_id ||
    !formModel.jenis_kendaraan ||
    !formModel.time_out
  ) {
    return;
  }

  if (formModel.time_in?.length < 16) {
    ElMessage({
      message: "FORMAT TIME IN SALAH",
      type: "error",
      showClose: true,
    });
    return;
  }

  if (formModel.time_in?.length == 16) {
    formModel.time_in += ":00";
  }

  save(ticket);
};

const save = async (ticket) => {
  formModel.ticket = ticket;

  const url = formModel.id
    ? `/api/parkingTransaction/${formModel.id}`
    : "/api/parkingTransaction";

  try {
    const r = await api(url, {
      method: formModel.id ? "put" : "post",
      body: formModel,
    });

    ElMessage({
      message: r.data.message,
      type: "success",
    });

    const gate_out_id = formModel.gate_out_id;
    openGate(gate_out_id);
    // ini lupa buat yg mana
    // if (formModel.is_member) {
    //   openGate(formModel.gate_out_id)
    // } else {
    //   setTimeout(() => {
    //     openGate(gate_out_id)
    //   }, 4000)
    // }

    resetForm();
  } catch (error) {
    ElMessage({
      message: error.response._data.message,
      type: "error",
      showClose: true,
    });
  }
};

const connectPos = async () => {
  ws.value = new WebSocket(`ws://${pos.value.ip_address}:5678/`);

  ws.value.onerror = (event) => {
    ElMessage({
      message: "KONEKSI KE POS GAGAL",
      type: "error",
    });
  };

  ws.value.onopen = (event) => {
    console.log("POS TEKONEKSI");
  };

  ws.value.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.error(data);
    // ElMessage({
    // 	message: data.message,
    // 	type: data.status ? 'success' : 'error',
    // })
  };
};

const openGate = (gate_out_id) => {
  const gate = pos.value.gate_outs.find((g) => g.id == gate_out_id);

  ws.value.send(
    [
      "open",
      gate.device,
      gate.baudrate,
      gate.open_command,
      gate.close_command,
    ].join(";")
  );

  setTimeout(resetForm, 3000);
};

const openGateMemberUHF = () => {
  // asumsi gate out cuma 1
  const gate_id = pos.value.gate_outs[0].id;
  openGate(gate_id);
  api(`/api/takeSnapshot/${gate_id}`).then((r) => {
    snapshots.value = r;
    instance?.proxy?.$forceUpdate();
  });
};

const runningText = (text) => {
  const gate = pos.value.gate_outs.find((g) => g.id == formModel.gate_out_id);

  if (!gate) {
    return;
  }

  if (!gate.running_text_device || !gate.running_text_baudrate) {
    return;
  }

  ws.value.send(
    ["rt", gate.running_text_device, gate.running_text_baudrate, text].join(";")
  );
};

const resetRunningText = () => {
  const gate = pos.value.gate_outs.find((g) => g.id == formModel.gate_out_id);

  if (!gate) {
    return;
  }

  if (!gate.running_text_device || !gate.running_text_baudrate) {
    return;
  }

  ws.value.send(
    ["rrt", gate.running_text_device, gate.running_text_baudrate].join(";")
  );
};

const printLastTrx = async () => {
  try {
    const r = await api("/api/parkingTransaction/printLastTransaction", {
      method: "post",
      body: {
        pos_id: formModel.pos_id,
      },
    });

    ElMessage({
      message: r.message,
      type: "success",
      showClose: true,
    });
  } catch (error) {
    ElMessage({
      message: error.response._data.message,
      type: "error",
      showClose: true,
    });
  }
};

const printReport = async () => {
  let payload = {
    pos_id: formModel.pos_id,
    date: moment().format("YYYY-MM-DD"),
  };

  try {
    await api("/api/parkingTransaction/printReport", {
      method: "post",
      body: payload,
    });
    ElMessage({
      message: "SILAKAN AMBIL STRUK",
      type: "success",
      showClose: true,
    });
  } catch (error) {
    ElMessage({
      message: error.response._data.message,
      type: "error",
      showClose: true,
    });
  }
};

const initialize = async () => {
  await store.getPos();

  if (!pos.value) {
    return;
  }

  formModel.pos_id = pos.value.id;

  if (pos.value.gate_outs.length == 1) {
    formModel.gate_out_id = pos.value.gate_outs[0].id;
  }

  formModel.plat_nomor = setting.value.plat_nomor_default;

  if (setting.value.disable_plat_nomor) {
    document.querySelector("#nomor-tiket").focus();
  } else {
    document.querySelector("#plat-nomor").focus();
  }

  await connectPos();
};

const takeSnapshot = async () => {
  try {
    const r = await api(
      `/api/parkingTransaction/takeSnapshot/${formModel.id}`,
      {
        method: "post",
        body: {
          gate_out_id: formModel.gate_out_id,
        },
      }
    );
    snapshots.value = r;
    instance?.proxy?.$forceUpdate();
  } catch (error) {
    ElMessage({
      message: error.response._data.message,
      type: "error",
      showClose: true,
    });
  }
};

onMounted(async () => {
  await initialize();

  if (pos.value) {
    return;
  }

  document.querySelector("#gate-out-app").addEventListener("keydown", (e) => {
    // console.log(e.key)
    // ke field nomor plat
    if (e.key == "-") {
      e.preventDefault();
      resetForm();
      instance?.proxy?.$forceUpdate();
    }

    // ke field nomor tiket
    if (e.key == "+") {
      e.preventDefault();
      formModel.nomor_barcode = "";
      formModel.time_out = "";
      formModel.jenis_kendaraan = "";
      formModel.tarif = "";
      document.querySelector("#nomor-tiket").focus();
    }

    // ke field jenis kendaraan
    if (e.key == "*") {
      e.preventDefault();
      formModel.jenis_kendaraan = "";
      formModel.tarif = "";
      document.querySelector("#jenis-kendaraan").focus();
    }

    // ke field time in
    if (e.key == "/") {
      e.preventDefault();
      formModel.time_in = "";
      document.querySelector("#time-in").focus();
    }

    if (e.key == "F10") {
      e.preventDefault();
      printReport();
      // openGateMemberUHF()
    }

    if (e.key == "F11") {
      e.preventDefault();
      showManualOpenForm.value = true;
    }

    if (e.key == "F12") {
      e.preventDefault();
      printLastTrx();
    }

    // if (e.key == 'F9') {
    //   e.preventDefault();
    //   openGateIn()
    // }
  });

  updateTarifInterval.value = setInterval(store.getJenisKendaraanList, 60000);
});

onDeactivated(() => {
  if (ws) {
    ws.close();
  }

  clearInterval(updateTarifInterval);
});
</script>

<style lang="css" scoped>
.my-input {
  border: 2px solid #160047;
  height: 45px;
  line-height: 45px;
  font-size: 30px;
  display: block;
  width: 100%;
  padding: 0px 15px;
  box-sizing: border-box;
}

.my-input:focus,
.my-input-time:focus {
  background: rgb(255, 246, 122);
}

.label-big {
  box-sizing: border-box;
  background-color: #160047;
  color: #fff;
  padding-left: 15px;
  font-size: 20px;
  height: 45px;
  line-height: 45px;
}

.tarif-input {
  background: rgb(199, 24, 24);
  color: #fff;
}

.my-big-btn {
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 20px;
  height: 45px;
  line-height: 45px;
  background-color: #254ec1;
  color: #fff;
  border-radius: 4px;
  margin-top: 10px;
}

.my-big-btn:focus {
  background: rgb(199, 24, 24);
}

.label {
  box-sizing: border-box;
  background-color: #160047;
  color: #fff;
  text-align: center;
  padding: 10px;
}

.text-center {
  text-align: center;
}
</style>
