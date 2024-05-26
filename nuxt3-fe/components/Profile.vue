<template>
  <el-dialog title="PROFIL SAYA" v-loading="loading" :model-value="show">
    <el-form label-width="180px" label-position="left">
      <el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
        <el-input placeholder="Nama" v-model="formModel.name"></el-input>
        <div class="el-form-item__error" v-if="formErrors.name">
          {{ formErrors.name }}
        </div>
      </el-form-item>

      <el-form-item label="Level">
        <el-input
          disabled
          :value="formModel.role ? 'Admin' : 'Operator'"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Password"
        :class="formErrors.password ? 'is-error' : ''"
      >
        <el-input
          type="password"
          placeholder="Password"
          v-model="formModel.password"
        ></el-input>
        <div class="el-form-item__error" v-if="formErrors.password">
          {{ formErrors.password[0] }}
        </div>
      </el-form-item>

      <el-form-item
        label="Konfirmasi Password"
        :class="formErrors.password ? 'is-error' : ''"
      >
        <el-input
          type="password"
          placeholder="Konfirmasi Password"
          v-model="formModel.password_confirmation"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')" :icon="CircleCloseFilled">
        TUTUP
      </el-button>
      <el-button type="primary" @click="save" :icon="SuccessFilled">
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
const api = useApi();
import { SuccessFilled, CircleCloseFilled } from "@element-plus/icons-vue";
const { user } = useSanctumAuth();
const { show } = defineProps(["show"]);

const formModel = ref({ ...user.value });
const loading = ref(false);
const formErrors = ref({});

const save = () => {
  loading.value = true;

  api(`/api/user/${formModel.value.id}`, {
    method: "PUT",
    body: formModel.value,
  })
    .then((_) => {
      ElMessage({
        message: "Data berhasil diupdate",
        type: "success",
        showClose: true,
      });
    })
    .catch((e) => {
      if (e.response.status == 422) {
        formErrors.value = e.response._data.errors;
      } else {
        formErrors.value = {};
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
