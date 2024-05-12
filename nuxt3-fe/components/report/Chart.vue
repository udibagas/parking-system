<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="group in groupJenisKendaraanList"
        :key="`total${group}`"
        :span="12"
      >
        <el-card class="mb-3">
          <PieChart
            label="Jumlah Kendaraan"
            url="/api/totalByGroup"
            :date="date"
            :group="group"
            :title="`GROUP ${group}`"
            subtext="Jumlah Kendaraan Berdasarkan Group"
          />
        </el-card>
      </el-col>

      <el-col
        v-for="group in groupJenisKendaraanList"
        :key="`sum${group}`"
        :span="12"
      >
        <el-card class="mb-3">
          <PieChart
            label="Pendapatan"
            url="/api/sumByGroup"
            :date="date"
            :group="group"
            :title="`GROUP ${group}`"
            subtext="Pendapatan Berdasarkan Group"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "pinia";

export default {
  props: ["date"],

  computed: {
    ...mapState(useWebsiteStore, {
      groupJenisKendaraanList: "groupJenisKendaraanList",
    }),
  },
};
</script>
