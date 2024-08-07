<template>
  <el-row :gutter="20" class="mb-3">
    <el-col :span="8">
      <el-card>
        Hari Ini
        <div class="text-5xl text-purple-700">
          {{ toRupiah(summary.today) }}
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        Bulan Ini
        <div class="text-5xl text-blue-700">
          {{ toRupiah(summary.this_month) }}
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        Total
        <div class="text-5xl text-orange-700">
          {{ toRupiah(summary.total) }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
const api = useApi();
const summary = ref({});
const getData = () => {
  api("/api/summary").then((r) => (summary.value = r));
};

onBeforeMount(() => {
  getData();
});
</script>
