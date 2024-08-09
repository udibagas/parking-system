<template>
  <div class="streaming-container">
    <canvas
      v-if="urls.length"
      v-for="(url, i) in urls"
      :id="`canvas${i}`"
    ></canvas>
    <div v-else>Tidak ada streaming</div>
  </div>
</template>

<script setup>
import { loadPlayer } from "rtsp-relay/browser";
const store = useWebsiteStore();

const urls = computed(() => {
  return store.kameraList
    .filter((k) => k.status && k.streaming_url)
    .map((k) => k.streaming_url);
});

onMounted(async () => {
  for (const i = 0; i < urls.length; i++) {
    await loadPlayer({
      url: `ws://localhost:2000/api/stream?url=${urls[i]}`,
      canvas: document.querySelector(`#canvas${i}`),
      audio: false,
      onDisconnect: () => console.log("Connection lost"),
    });
  }
});

onBeforeMount(() => {
  store.getKameraList();
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
  width: 310px;
  height: 175px;
}
</style>
