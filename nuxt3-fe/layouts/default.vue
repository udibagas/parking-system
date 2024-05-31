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
          <el-icon><component :is="icon[m.icon2]" /></el-icon>
          <span slot="title">{{ m.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="flex align-items-center">
          <el-icon
            :size="24"
            @click.prevent="collapse = !collapse"
            style="cursor: pointer"
          >
            <Expand v-if="collapse" />
            <Fold v-else />
          </el-icon>

          <div class="brand" style="flex-grow: 1">
            MITRATEKNIK PARKING SYSTEM
          </div>

          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link text-white" style="cursor: pointer"
              >Selamat Datang, {{ user.name }}!</span
            >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="User" command="profile">
                  Profil Saya
                </el-dropdown-item>
                <el-dropdown-item :icon="ArrowRight" command="logout">
                  Keluar
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="height: calc(100vh - 60px); overflow: auto">
        <slot @back="goBack" />
        <Profile :show="showProfile" @close="showProfile = false" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
const { user, logout } = useSanctumAuth();
import {
  Fold,
  Expand,
  User,
  HomeFilled,
  Bell,
  Operation,
  DocumentCopy,
  CreditCard,
  DataAnalysis,
  ArrowRight,
  Setting,
} from "@element-plus/icons-vue";

const icon = {
  User,
  HomeFilled,
  Bell,
  Operation,
  DocumentCopy,
  CreditCard,
  DataAnalysis,
  Setting,
};

const store = useWebsiteStore();
const collapse = ref(true);
const showProfile = ref(false);
const navigationList = computed(() => store.navigationList);
useHead({
  title: "MITRATEKNIK PARKING SYSTEM",
});

const goBack = () => {
  window.history.back();
};

const handleCommand = (command) => {
  if (command === "logout") {
    ElMessageBox.confirm("Anda yakin ingin keluar?", "Konfirmasi", {
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      type: "warning",
    })
      .then(() => logout())
      .catch(() => console.log("Action cancelled"));
  }

  if (command === "profile") {
    showProfile.value = true;
  }
};

onBeforeMount(async () => {
  await store.getNavigationList();
  await store.getSetting();
  await store.getGateInList();
  await store.getGateOutList();
  await store.getJenisKendaraanList();
});
</script>
