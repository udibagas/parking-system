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

<script>
export default {
	data() {
		return {
			tabs: [
				{ component: 'ParkingMember', label: 'MEMBER', visible: true },
				{
					component: 'GroupMember',
					label: 'GROUP MEMBER',
					visible: this.$auth.user.role == 1,
				},
				{ component: 'MemberRenewal', label: 'PEMBAYARAN', visible: true },
				{
					component: 'MembershipReportDaily',
					label: 'LAPORAN PENDAPATAN HARIAN',
					visible: this.$auth.user.role == 1,
				},
				{
					component: 'MembershipReport',
					label: 'SUMMARY LAPORAN PENDAPATAN',
					visible: this.$auth.user.role == 1,
				},
			],
		}
	},
}
</script>
