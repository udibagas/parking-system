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

<script>
import Echo from "laravel-echo";
import { mapState } from "pinia";

export default {
  data() {
    return {
      show: false,
      notification: {},
      echo: null,
    };
  },

  computed: {
    ...mapState(useWebsiteStore, { setting: "setting" }),
  },

  mounted() {
    this.echo = new Echo({
      broadcaster: "reverb",
      key: "ini diisi",
      wsHost: this.setting.server_address,
      wsPort: 8080,
      forceTLS: false,
      disableStats: true,
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            $axios
              .$post("/api/broadcasting/auth", {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => callback(false, response))
              .catch((error) => callback(true, error));
          },
        };
      },
    });

    this.echo.private("notification").notification((notification) => {
      this.notification = notification;
      this.show = true;
    });
  },

  destroyed() {
    this.echo.leave("log");
  },
};
</script>
