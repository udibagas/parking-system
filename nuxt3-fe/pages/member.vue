<template>
  <el-tabs>
    <el-tab-pane
      v-for="(tab, i) in tabs.filter((t) => t.visible)"
      :key="i"
      lazy
      :label="tab.label"
    >
      <component :is="tab.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
const { user } = useSanctumAuth();
const { getGroupMemberList, getMemberList } = useWebsiteStore();

import {
  MemberParkingMember,
  MemberGroupMember,
  MemberRenewal,
  MemberMembershipReportDaily,
  MemberMembershipReport,
} from "#components";

const tabs = [
  { component: MemberParkingMember, label: "MEMBER", visible: true },
  {
    component: MemberGroupMember,
    label: "GROUP MEMBER",
    visible: user.value.role == 1,
  },
  { component: MemberRenewal, label: "PEMBAYARAN", visible: true },
  {
    component: MemberMembershipReportDaily,
    label: "LAPORAN PENDAPATAN HARIAN",
    visible: user.value.role == 1,
  },
  {
    component: MemberMembershipReport,
    label: "SUMMARY LAPORAN PENDAPATAN",
    visible: user.value.role == 1,
  },
];

onMounted(() => {
  getGroupMemberList();
  getMemberList();
});
</script>
