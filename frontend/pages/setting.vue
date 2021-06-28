<template>
	<el-card :body-style="{ padding: '0px' }">
		<el-page-header
			slot="header"
			@back="$emit('back')"
			content="SETTING"
		></el-page-header>
		<el-tabs type="border-card">
			<el-tab-pane v-for="(c, i) in components" :key="i" lazy :label="c.label">
				<component :is="c.component" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			formModel: {},
			formErrors: {},
			loading: false,
			components: [
				{ label: 'Global Setting', component: 'GlobalSetting' },
				{ label: 'Pos', component: 'Pos' },
				{ label: 'Jenis Kendaraan & Tarif', component: 'VehicleType' },
				{ label: 'Backup & Restore', component: 'Backup' },
			],
		}
	},
}
</script>
