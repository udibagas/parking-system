<template>
	<el-card>
		<el-tabs>
			<el-tab-pane
				v-for="(tab, i) in tabs.filter((t) => t.visible)"
				:key="i"
				lazy
				:label="tab.label"
			>
				<component :is="`Member${tab.component}`" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
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
				{ component: 'Renewal', label: 'PEMBAYARAN', visible: true },
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

	mounted() {
		this.$store.dispatch('getGroupMemberList')
    this.$store.dispatch('getMemberList')
	},
}
</script>
