<template>
  <el-dialog title="PROFIL SAYA" :model-value="show" width="500px">
    <el-form label-width="180px" label-position="left">
      <el-form-item label="Nama" :error="formErrors.name?.join(', ')">
        <el-input placeholder="Nama" v-model="formModel.name"></el-input>
      </el-form-item>

      <el-form-item label="Level">
        <el-input
          disabled
          :value="formModel.role ? 'Admin' : 'Operator'"
        ></el-input>
      </el-form-item>

      <el-form-item label="Password" :error="formErrors.password?.join(', ')">
        <el-input
          type="password"
          placeholder="Password"
          v-model="formModel.password"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Konfirmasi Password"
        :error="formErrors.password?.join(', ')"
      >
        <el-input
          type="password"
          placeholder="Konfirmasi Password"
          v-model="formModel.password_confirmation"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')" :icon="CircleCloseFilled">
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
const emit = defineEmits(["close"]);

const formModel = ref({ ...user.value });
const formErrors = ref({});

const save = () => {
  const loadingInstance = ElLoading.service({ target: ".el-dialog" });

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
      loadingInstance.close();
    });
};
</script>
