<template>
  <div class="log-container">
    <div v-for="(log, i) in logs" :key="i">
      {{ moment(log.timestamp).format("YYYY-MM-DD HH:mm:ss") }}
      [{{ log.level.toUpperCase() }}]
      {{ log.message }}
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const logs = ref([]);
const socket = ref(null);

onMounted(() => {
  const host = window.location.host.split(":")[0];
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${host}:8090`;
  socket.value = new WebSocket(wsUrl);

  socket.value.onmessage = (event) => {
    logs.value.unshift(JSON.parse(event.data));
  };

  socket.value.onopen = () => {
    console.log("WebSocket connection established!!!");
  };

  socket.value.onclose = () => {
    console.log("WebSocket connection closed!!!");
  };

  socket.value.onerror = (error) => {
    console.error("WebSocket error:", error.message);
  };
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});
</script>

<style scoped>
.log-container {
  height: calc(100vh - 185px);
  background: black;
  color: white;
  padding: 15px;
  font-family: monospace;
  font-size: 1rem;
  overflow: auto;
}
</style>
