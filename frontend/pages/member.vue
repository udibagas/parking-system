<template>
	<el-card :body-style="{ padding: '0px' }">
		<el-page-header slot="header" @back="$emit('back')" content="MEMBER">
		</el-page-header>

		<el-tabs type="border-card">
			<el-tab-pane lazy label="Member"><ParkingMember /></el-tab-pane>
			<el-tab-pane lazy label="Group Member"><GroupMember /></el-tab-pane>
			<el-tab-pane lazy label="Pembayaran"><MemberRenewal /></el-tab-pane>
			<el-tab-pane
				v-if="$auth.user.role == 1"
				lazy
				label="Laporan Pendapatan Harian"
				><MembershipReportDaily
			/></el-tab-pane>
			<el-tab-pane
				v-if="$auth.user.role == 1"
				lazy
				label="Summary Laporan Pendapatan"
				><MembershipReport
			/></el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {}
</script>
