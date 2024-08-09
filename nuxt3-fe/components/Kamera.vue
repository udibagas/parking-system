<template>
  <div class="streaming-container">
    <canvas v-for="camera in cameras" :id="`canvas${camera.id}`"></canvas>
  </div>
</template>

<script setup>
import { loadPlayer } from "rtsp-relay/browser";
const store = useWebsiteStore();

const cameras = computed(() => {
  return store.kameraList.filter((k) => k.status && k.streaming_url);
});

onMounted(async () => {
  await store.getKameraList();
  const cctv = store.kameraList.filter((k) => k.status && k.streaming_url);
  setTimeout(async () => {
    for (const camera of cctv) {
      await loadPlayer({
        url: `ws://localhost:2000/api/stream?url=${camera.streaming_url}`,
        canvas: document.querySelector(`#canvas${camera.id}`),
        audio: false,
        onDisconnect: () => console.log("Connection lost"),
      });
    }
  }, 1000);
});
</script>

<style scoped>
.streaming-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; */
  flex-direction: row;
  gap: 2px;
  flex-grow: 1;
}

canvas {
  border: 1px solid #ddd;
  width: 250px;
  height: 140px;
}
</style>
