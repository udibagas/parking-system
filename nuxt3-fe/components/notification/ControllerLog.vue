<template>
  <div>
    <el-form inline class="text-right">
      <el-form-item>
        <el-input
          size="small"
          autofocus
          placeholder="Cari log"
          v-model="keyword"
          prefix-:icon="Search"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="log-container" v-html="log"></div>
  </div>
</template>

<script setup>
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
  const params = { keyword: keyword };

  api(url, { params })
    .then((response) => (log.value = response))
    .catch((e) => console.log(e));
};
</script>

<style scoped>
.log-container {
  height: calc(100vh - 290px);
  background: black;
  color: white;
  padding: 15px;
  font-family: monospace;
  font-size: 0.9em;
  overflow: auto;
}
</style>
