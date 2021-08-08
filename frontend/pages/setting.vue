<template>
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
</template>

<script>
export default {
	data() {
		return {
			components: [
				{
					label: 'Pengaturan Umum',
					component: 'GeneralSetting',
				},
				{
					label: 'Jenis Kendaraan & Tarif',
					component: 'JenisKendaraan',
				},
				{
					label: 'Shift',
					component: 'Shift',
				},
				{
					label: 'Kamera',
					component: 'Kamera',
				},
				{
					label: 'Printer',
					component: 'Printer',
				},
				{
					label: 'Pos',
					component: 'Pos',
				},
				{
					label: 'Gate Keluar',
					component: 'GateOut',
				},
				{
					label: 'Gate Masuk',
					component: 'GateIn',
				},
				{
					label: 'Area Parkir',
					component: 'AreaParkir',
				},
				{
					label: 'Backup & Restore',
					component: 'Backup',
				},
			],
		}
	},

	mounted() {
		this.$store.commit('getKameraList')
		this.$store.commit('getGateInList')
		this.$store.commit('getGateOutList')
		this.$store.commit('getJenisKendaraanList')
		this.$store.commit('getPosList')
		this.$store.commit('getPrinterList')
	},
}
</script>
