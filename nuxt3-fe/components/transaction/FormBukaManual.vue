<template>
  <el-dialog
    title="FORM BUKA MANUAL"
    center
    :visible.sync="show"
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
        v-if="this.gateOutList.length > 1"
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

<script>
export default {
  props: ["show", "gateOutList"],

  data() {
    return {
      formModel: {},
      formErrors: {},
    };
  },

  mounted() {
    if (this.gateOutList.length == 1) {
      this.formModel.gate_out_id = this.gateOutList[0].id;
    }
  },

  methods: {
    closeForm() {
      this.formModel = {};
      this.formErrors = {};
      this.$emit("close");
    },

    save() {
      ElMessageBox.confirm(
        "Aksi ini akan dicatat oleh sistem. Anda yakin?",
        "Peringatan",
        { type: "warning" }
      )
        .then(() => {
          this.$axios
            .$post("/api/manualOpenLog", this.formModel)
            .then((r) => {
              ElMessage({
                message: r.message,
                type: "success",
              });
              this.$emit("open-gate", this.formModel.gate_out_id);
              this.closeForm();
            })
            .catch((e) => {
              if (e.response.status == 422) {
                this.formErrors = e.response.data.errors;
              }
            });
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
