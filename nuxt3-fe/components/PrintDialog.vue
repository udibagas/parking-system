<template>
  <el-dialog
    center
    title="PILIH PRINTER"
    :visible.sync="show"
    width="500px"
    :before-close="
      (done) => {
        $emit('close');
      }
    "
  >
    <el-form>
      <el-form-item>
        <el-select
          v-model="printer_id"
          placeholder="Pilih Printer"
          style="width: 100%"
        >
          <el-option
            v-for="p in printerList"
            :key="p.id"
            :value="p.id"
            :label="p.nama"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button icon="el-icon-error" @click="$emit('close')">
        BATAL
      </el-button>
      <el-button
        icon="el-icon-printer"
        @click="$emit('print', printer_id)"
        type="primary"
        :disabled="!printer_id"
      >
        CETAK STRUK
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapStores } from "pinia";

export default {
  props: ["show"],

  computed: {
    ...mapState(useWebsiteStore, {
      printerList: "printerList",
    }),
    ...mapStores(useWebsiteStore),
  },

  data() {
    return {
      printer_id: null,
    };
  },

  mounted() {
    this.websiteStore.getPrinterList();
  },
};
</script>
