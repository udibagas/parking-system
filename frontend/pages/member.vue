<template>
	<el-tabs>
		<el-tab-pane lazy label="MEMBER">
			<ParkingMember />
		</el-tab-pane>
		<el-tab-pane lazy label="GROUP MEMBER" v-if="user.role == 1">
			<GroupMember />
		</el-tab-pane>
		<el-tab-pane lazy label="PEMBAYARAN"><MemberRenewal /></el-tab-pane>
		<el-tab-pane v-if="user.role == 1" lazy label="LAPORAN PENDAPATAN HARIAN"
			><MembershipReportDaily
		/></el-tab-pane>
		<el-tab-pane v-if="user.role == 1" lazy label="SUMMARY LAPORAN PENDAPATAN"
			><MembershipReport
		/></el-tab-pane>
	</el-tabs>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState(['user']),
	},
}
</script>
