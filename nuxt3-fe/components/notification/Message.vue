<template>
  <el-dialog
    :visible.sync="show"
    center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <div class="text-center" style="font-size: 50px; color: orange">
      <i class="el-icon-warning-outline"></i>
    </div>

    <div class="text-center" style="font-size: 24px; margin-top: 20px">
      {{ notification.message }}
    </div>

    <div slot="footer">
      <el-button
        type="primary"
        icon="el-icon-circle-close"
        @click="show = false"
        >TUTUP</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;

const store = useWebsiteStore();
const show = ref(false);
const notification = ref({});
const echo = ref(null);
const setting = computed(() => store.setting);
const api = useApi();

onMounted(async () => {
  await store.getSetting();
  echo.value = new Echo({
    broadcaster: "reverb",
    key: "g2iix2c1zwlt3dgvo35h",
    wsHost: setting.value.server_address,
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          api("/api/broadcasting/auth", {
            method: "POST",
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          })
            .then((response) => callback(false, response))
            .catch((error) => callback(true, error));
        },
      };
    },
  });

  echo.value.private("notification").notification((notification) => {
    notification.value = notification;
    show.value = true;
  });
});

onUnmounted(() => {
  echo.value.leave("log");
});
</script>
