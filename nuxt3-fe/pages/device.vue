<template>
  <el-tabs>
    <el-tab-pane
      lazy
      v-for="(c, i) in components"
      :key="i"
      :label="c.label.toUpperCase()"
    >
      <component :is="c.component"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import {
  SettingKamera,
  SettingPrinter,
  SettingPos,
  SettingGateIn,
  SettingGateOut,
} from "#components";

const store = useWebsiteStore();

const components = [
  {
    label: "Kamera",
    component: SettingKamera,
  },
  {
    label: "Printer",
    component: SettingPrinter,
  },
  {
    label: "Pos",
    component: SettingPos,
  },
  {
    label: "Gate Keluar",
    component: SettingGateOut,
  },
  {
    label: "Gate Masuk",
    component: SettingGateIn,
  },
];

onMounted(async () => {
  await store.getKameraList();
  await store.getPrinterList();
});
</script>
