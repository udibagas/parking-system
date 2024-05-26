<template>
  <el-card>
    <el-tabs>
      <el-tab-pane
        lazy
        v-for="(c, i) in components"
        :key="i"
        :label="c.label.toUpperCase()"
      >
        <component :is="c.component"></component>
        <!-- <SettingGeneral /> -->
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import {
  SettingGeneral,
  SettingJenisKendaraan,
  SettingShift,
  SettingKamera,
  SettingPrinter,
  SettingPos,
  SettingGateIn,
  SettingGateOut,
  // SettingBackup,
} from "#components";

const store = useWebsiteStore();

const components = [
  {
    label: "Pengaturan Umum",
    component: SettingGeneral,
  },
  {
    label: "Jenis Kendaraan & Tarif",
    component: SettingJenisKendaraan,
  },
  {
    label: "Shift",
    component: SettingShift,
  },
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
  // {
  //   label: "Area Parkir",
  //   component: SettingAreaParkir,
  // },
  // {
  //   label: "Backup & Restore",
  //   component: SettingBackup,
  // },
];

onMounted(async () => {
  await store.getKameraList();
  await store.getPrinterList();
});
</script>
