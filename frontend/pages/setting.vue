<template>
	<div>
		<el-page-header @back="$emit('back')" content="SETTING"></el-page-header>
		<br />
		<el-tabs type="card">
			<el-tab-pane v-for="(c, i) in components" :key="i" lazy :label="c.label">
				<component :is="c.component" />
			</el-tab-pane>
		</el-tabs>
	</div>
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
