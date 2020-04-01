<template>
  <div>
    <el-page-header @back="$emit('back')" content="SETTING"></el-page-header>
    <br />
    <el-tabs type="card">
      <el-tab-pane v-for="(c, i) in components" :key="i" lazy :label="c.label">
        <component :is="c.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VehicleType from "./VehicleType";
import Backup from "./Backup";
import GlobalSetting from "./GlobalSetting";

export default {
  data() {
    return {
      formModel: {},
      formErrors: {},
      loading: false,
      components: [
        { label: "Global Setting", component: GlobalSetting },
        { label: "Jenis Kendaraan", component: VehicleType },
        { label: "Backup & Restore", component: Backup }
      ]
    };
  },
  methods: {
    requestData() {
      axios
        .get("/setting")
        .then(r => {
          this.formModel = r.data;
        })
        .catch(e => {
          this.$message({
            message: e.response.data.message,
            type: "error",
            showClose: true
          });
        });
    },
    store() {
      this.loading = true;
      axios
        .post("/setting", this.formModel)
        .then(r => {
          this.$message({
            message: "Data berhasil disimpan.",
            type: "success",
            showClose: true
          });
          this.requestData();
        })
        .catch(e => {
          if (e.response.status == 422) {
            this.formErrors = e.response.data.errors;
          }

          if (e.response.status == 500) {
            this.formErrors = {};
            this.$message({
              message: e.response.data.message,
              type: "error",
              showClose: true
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    update() {
      this.loading = true;
      axios
        .put("/setting/" + this.formModel.id, this.formModel)
        .then(r => {
          this.$message({
            message: "Data berhasil disimpan.",
            type: "success",
            showClose: true
          });
          this.requestData();
        })
        .catch(e => {
          if (e.response.status == 422) {
            this.formErrors = e.response.data.errors;
          }

          if (e.response.status == 500) {
            this.formErrors = {};
            this.$message({
              message: e.response.data.message,
              type: "error",
              showClose: true
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.requestData();
  }
};
</script>
