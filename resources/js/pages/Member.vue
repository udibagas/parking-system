<template>
	<el-tabs>
		<el-tab-pane lazy label="MEMBER"><ParkingMember /></el-tab-pane>
		<el-tab-pane lazy label="GROUP MEMBER"><GroupMember /></el-tab-pane>
		<el-tab-pane lazy label="PEMBAYARAN"><MemberRenewal /></el-tab-pane>
		<el-tab-pane
			v-if="$store.state.user.role == 1"
			lazy
			label="LAPORAN PENDAPATAN HARIAN"
			><MembershipReportDaily
		/></el-tab-pane>
		<el-tab-pane
			v-if="$store.state.user.role == 1"
			lazy
			label="SUMMARY LAPORAN PENDAPATAN"
			><MembershipReport
		/></el-tab-pane>
	</el-tabs>
</template>

<script>
import ParkingMember from "./ParkingMember";
import MemberRenewal from "./MemberRenewal";
import GroupMember from "./GroupMember";
import MembershipReport from "./MembershipReport";
import MembershipReportDaily from "./MembershipReportDaily";

export default {
	components: {
		ParkingMember,
		MemberRenewal,
		GroupMember,
		MembershipReport,
		MembershipReportDaily,
	},
};
</script>
