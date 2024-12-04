<template>
  <div class="text-right mb-3">
    <el-input
      clearable
      autofocus
      size="small"
      placeholder="Cari log"
      style="width: 180px"
      v-model="keyword"
      :prefix-icon="Search"
    ></el-input>
  </div>
  <div class="log-container" v-html="log"></div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";

const api = useApi();
const { url } = defineProps(["url"]);
const log = ref("");
const requestInterval = ref(null);
const keyword = ref(null);

onMounted(() => {
  requestInterval.value = setInterval(getLog, 2000);
});

onUnmounted(() => {
  clearInterval(requestInterval.value);
});

const getLog = () => {
  const params = { keyword: keyword.value };

  api(url, { params })
    .then((response) => (log.value = response))
    .catch((e) => console.log(e));
};
</script>

<style scoped>
.log-container {
  height: calc(100vh - 225px);
  background: black;
  color: white;
  padding: 15px;
  font-family: monospace;
  font-size: 0.9em;
  overflow: auto;
}
</style>
