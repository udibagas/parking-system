<template>
  <div style="display: flex; justify-items: center">
    <img
      v-for="kamera in tableData.data?.filter((k) => k.status)"
      :key="kamera.id"
      :src="snapshots[kamera.id]"
      alt="Snapshot"
    />
  </div>
</template>

<script setup>
const { api, tableData, requestData } = useCrud("/api/kamera");
const snapshots = ref({});

const getSnapshot = () => {
  tableData.value.data
    ?.filter((k) => k.status)
    .forEach(({ id }) => {
      api(`/api/kamera/test/${id}`).then((r) => {
        snapshots.value[id] = "data:image/jpeg;base64," + r.snapshot;
      });
    });
};

const interval = setInterval(getSnapshot, 3000);

onBeforeMount(() => {
  requestData();
});

onDeactivated(() => clearInterval(interval));
</script>

<style scoped>
img {
  border: 1px solid #eee;
  width: 300px;
  height: 300px;
}
</style>
