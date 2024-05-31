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
  SettingGeneral,
  SettingJenisKendaraan,
  SettingShift,
  SettingAreaParkir,
  SettingBackup,
} from "#components";

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
    label: "Area Parkir",
    component: SettingAreaParkir,
  },
  {
    label: "Backup & Restore",
    component: SettingBackup,
  },
];
</script>
