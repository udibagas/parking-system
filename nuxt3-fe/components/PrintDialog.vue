<template>
  <el-dialog
    center
    draggable
    width="500px"
    title="PILIH PRINTER"
    :model-value="show"
    :before-close="() => emit('close')"
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

    <template #footer>
      <el-button :icon="CircleCloseFilled" @click="emit('close')">
        BATAL
      </el-button>
      <el-button
        :icon="Printer"
        @click="emit('print', printer_id)"
        type="primary"
        :disabled="!printer_id"
      >
        CETAK STRUK
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { CircleCloseFilled, Printer } from "@element-plus/icons-vue";

const emit = defineEmits(["close", "print"]);
const store = useWebsiteStore();
const { show } = defineProps(["show"]);
const printerList = computed(() => store.printerList);
const printer_id = ref(null);

onMounted(() => {
  store.getPrinterList();
});
</script>
