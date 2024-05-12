<template>
  <el-container>
    <el-aside width="auto">
      <div v-show="!collapse" class="brand-box">
        <img
          src="/images/logo.jpeg"
          style="
            height: 60px;
            width: 60px;
            margin: 25px 0 10px 0;
            border-radius: 5px;
          "
          alt
        />

        <div>
          <strong>{{ user.name }}</strong>
          <br />
          <small>{{ user.role ? "Admin" : "Operator" }}</small>
        </div>
      </div>
      <el-menu
        router
        :collapse="collapse"
        :default-active="$route.path"
        background-color="#060446"
        text-color="#fff"
        class="sidebar"
        active-text-color="#cc0000"
      >
        <el-menu-item v-for="(m, i) in navigationList" :index="m.path" :key="i">
          <i :class="m.icon"></i>
          <span slot="title">{{ m.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <el-button
              link
              class="btn-big text-white"
              @click.prevent="collapse = !collapse"
              :icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            ></el-button>
            <span class="brand">MITRATEKNIK PARKING SYSTEM</span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link text-white" style="cursor: pointer"
                >Selamat Datang, {{ user.name }}!</span
              >
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" command="profile">
                  Profil Saya
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-arrow-right" command="logout">
                  Keluar
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="padding: 20px; height: calc(100vh - 60px); overflow: auto"
      >
        <slot @back="goBack" />
        <Profile :show="showProfile" @close="showProfile = false" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapStores, mapState } from "pinia";
const { user, logout } = useSanctumAuth();

export default {
  middleware: ["auth"],

  computed: {
    ...mapState(useWebsiteStore, {
      navigationList: "navigationList",
    }),
    ...mapStores(useWebsiteStore),
  },

  data() {
    return {
      user: {
        name: "Dummy",
      },
      collapse: true,
      showProfile: false,
    };
  },

  methods: {
    goBack() {
      window.history.back();
    },

    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("Anda yakin ingin keluar?", "Konfirmasi", {
          type: "warning",
        }).then(() => false);
      }

      if (command === "profile") {
        this.showProfile = true;
      }
    },
  },

  async created() {
    await this.websiteStore.getNavigationList();
    await this.websiteStore.getSetting();
    await this.websiteStore.getGateInList();
    await this.websiteStore.getJenisKendaraanList();
  },
};
</script>
