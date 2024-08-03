<template>
  <img
    style="width: 300px"
    v-for="kamera in tableData.data"
    :key="kamera.id"
    :src="snapshots[kamera.id]"
    alt="Snapshot"
  />
</template>

<script setup>
const { api, tableData, requestData } = useCrud("/api/kamera");
const snapshots = ref({});

const getSnapshot = () => {
  tableData.value.data.forEach(({ id }) => {
    api(`/api/kamera/test/${id}`).then((r) => {
      snapshots.value[id] = "data:image/jpeg;base64," + r.snapshot;
    });
  });
};

const interval = setInterval(getSnapshot, 1000);

onBeforeMount(() => {
  requestData();
});

onDeactivated(() => clearInterval(interval));
</script>
