<template>
  <el-dialog
    title="FORM BUKA MANUAL"
    center
    :model-value="show"
    :before-close="closeForm"
  >
    <el-form label-position="left" label-width="200px">
      <el-form-item
        label="Alasan buka manual"
        :error="formErrors.alasan?.join(', ')"
      >
        <el-input
          autofocus
          type="textarea"
          v-model="formModel.alasan"
          rows="3"
          placeholder="Alasan buka manual"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-if="gateOutList.length > 1"
        label="Gate Keluar"
        :error="formErrors.gate_out_id?.join(', ')"
      >
        <el-select
          v-model="formModel.gate_out_id"
          style="width: 100%"
          placeholder="Gate Keluar"
        >
          <el-option
            v-for="gate in gateOutList"
            :key="gate.id"
            :label="gate.nama"
            :value="gate.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Masukkan password Admin"
        :error="formErrors.password?.join(', ')"
      >
        <el-input
          type="password"
          v-model="formModel.password"
          placeholder="Password"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :icon="CircleCloseFilled" @click="closeForm">
        BATAL
      </el-button>
      <el-button :icon="SuccessFilled" type="primary" @click="save">
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { CircleCloseFilled, SuccessFilled } from "@element-plus/icons-vue";

const { show, gateOutList } = defineProps(["show", "gateOutList"]);
const { api, formModel, formErrors } = useCrud("/api/manualOpenLog");
const emit = defineEmits(["close", "open-gate"]);

const closeForm = () => {
  formModel.value = {};
  formErrors.value = {};
  emit("close");
};

const save = () => {
  ElMessageBox.confirm(
    "Aksi ini akan dicatat oleh sistem. Anda yakin?",
    "Peringatan",
    { type: "warning" }
  )
    .then(() => {
      return api("/api/manualOpenLog", {
        method: "POST",
        body: formModel.value,
      });
    })
    .then((r) => {
      ElMessage({
        message: r.message,
        type: "success",
      });
      emit("open-gate", formModel.value.gate_out_id);
      closeForm();
    })
    .catch((e) => {
      if (e.response?.status == 422) {
        formErrors.value = e.response._data.errors;
      }
    });
};

onMounted(() => {
  if (gateOutList.length == 1) {
    formModel.value.gate_out_id = gateOutList[0].id;
  }
});
</script>
