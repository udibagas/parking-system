<template>
	<el-card>
		<el-tabs>
			<el-tab-pane
				lazy
				v-for="(c, i) in components"
				:key="i"
				:label="c.label.toUpperCase()"
			>
				<component :is="c.component"></component>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			components: [
				{
					label: 'Pengaturan Umum',
					component: 'SettingGeneralSetting',
				},
				{
					label: 'Jenis Kendaraan & Tarif',
					component: 'SettingJenisKendaraan',
				},
				{
					label: 'Shift',
					component: 'SettingShift',
				},
				{
					label: 'Kamera',
					component: 'SettingKamera',
				},
				{
					label: 'Printer',
					component: 'SettingPrinter',
				},
				{
					label: 'Pos',
					component: 'SettingPos',
				},
				{
					label: 'Gate Keluar',
					component: 'SettingGateOut',
				},
				{
					label: 'Gate Masuk',
					component: 'SettingGateIn',
				},
				{
					label: 'Area Parkir',
					component: 'SettingAreaParkir',
				},
				{
					label: 'Backup & Restore',
					component: 'SettingBackup',
				},
			],
		}
	},

	mounted() {
		this.$store.dispatch('getKameraList')
		this.$store.dispatch('getPrinterList')
	},
}
</script>
