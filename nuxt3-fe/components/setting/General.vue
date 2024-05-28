<template>
  <div>
    <el-form label-position="left" label-width="250px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="Nama Lokasi"
            :error="formErrors.nama_lokasi?.join(', ')"
          >
            <el-input
              placeholder="Nama Lokasi"
              v-model="formModel.nama_lokasi"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Alamat Lokasi"
            :error="formErrors.alamat_lokasi?.join(', ')"
          >
            <el-input
              placeholder="Alamat Lokasi"
              type="textarea"
              rows="3"
              v-model="formModel.alamat_lokasi"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Info Tambahan Tiket"
            :error="formErrors.info_tambahan_tiket?.join(', ')"
          >
            <el-input
              placeholder="Info Tambahan Tiket"
              type="textarea"
              rows="3"
              v-model="formModel.info_tambahan_tiket"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Plat Nomor Default"
            :error="formErrors.plat_nomor_default?.join(', ')"
          >
            <el-input
              placeholder="Plat Nomor Default"
              v-model="formModel.plat_nomor_default"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Jumlah Kendaraan Per Kartu"
            :error="formErrors.jml_kendaraan_per_kartu?.join(', ')"
          >
            <el-input
              type="number"
              placeholder="Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)"
              v-model="formModel.jml_kendaraan_per_kartu"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Orientasi Kamera"
            :error="formErrors.orientasi_kamera?.join(', ')"
          >
            <el-select
              placeholder="Orientasi Kamera"
              v-model="formModel.orientasi_kamera"
              style="width: 100%"
            >
              <el-option
                v-for="(l, i) in ['LANDSCAPE', 'POTRAIT']"
                :key="i"
                :value="l"
                :label="l"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="Mode Transaksi Member"
            :error="formErrors.must_checkout?.join(', ')"
          >
            <el-select
              placeholder="Mode Transaksi Member"
              v-model="formModel.must_checkout"
              style="width: 100%"
            >
              <el-option
                v-for="(l, i) in ['Tidak harus check out', 'Harus check out']"
                :key="i"
                :value="i"
                :label="l"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Mode Buka Gate Untuk Member"
            :error="formErrors.member_auto_open?.join(', ')"
          >
            <el-select
              placeholder="Mode Buka Gate Untuk Member"
              v-model="formModel.member_auto_open"
              style="width: 100%"
            >
              <el-option
                v-for="(l, i) in [
                  'Ketik Plat Nomor (Buka oleh operator)',
                  'Tempel Kartu (Otomatis)',
                ]"
                :key="i"
                :value="i"
                :label="l"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Disable Plat Nomor di Pos Keluar"
            :error="formErrors.disable_plat_nomor?.join(', ')"
          >
            <el-select
              placeholder="Disable Plat Nomor di Pos Keluar"
              v-model="formModel.disable_plat_nomor"
              style="width: 100%"
            >
              <el-option
                v-for="(l, i) in ['Tidak', 'Ya']"
                :key="i"
                :value="Boolean(i)"
                :label="l"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Hapus Snapshot dalam x hari"
            :error="formErrors.hapus_snapshot_dalam_hari?.join(', ')"
          >
            <el-input
              type="number"
              placeholder="Hapus Snapshot dalam x hari (0 untuk hapus manual)"
              v-model="formModel.hapus_snapshot_dalam_hari"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Hapus Transaksi dalam x hari"
            :error="formErrors.hapus_transaksi_dalam_hari?.join(', ')"
          >
            <el-input
              type="number"
              placeholder="Hapus Transaksi dalam x hari"
              v-model="formModel.hapus_transaksi_dalam_hari"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Server Address"
            :error="formErrors.server_address?.join(', ')"
          >
            <el-input
              placeholder="Server Address"
              v-model="formModel.server_address"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="ID Pelanggan"
            :error="formErrors.id_pelanggan?.join(', ')"
          >
            <el-input
              placeholder="ID Pelanggan"
              v-model="formModel.id_pelanggan"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button
      style="width: 100%"
      type="primary"
      @click="save"
      :icon="SuccessFilled"
    >
      SIMPAN
    </el-button>
  </div>
</template>

<script setup>
const store = useWebsiteStore();
const api = useApi();

const formErrors = ref({});
const loading = ref(false);
const formModel = reactive({ ...store.setting });

const save = async () => {
  loading.value = true;
  let url = "/api/setting";

  if (formModel.id) {
    url += `/${formModel.id}`;
  }

  try {
    await api(url, {
      method: formModel.id ? "PUT" : "POST",
      body: formModel,
    });

    ElMessage({
      message: "Data berhasil disimpan.",
      type: "success",
      showClose: true,
    });
    store.getSetting();
  } catch (e) {
    if (e.response.status == 422) {
      formErrors.value = e.response._data.errors;
    } else {
      formErrors.value = {};
    }
  }

  loading.value = false;
};
</script>
