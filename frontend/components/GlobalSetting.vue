<template>
	<el-form label-position="left" label-width="250px">
		<el-form-item
			label="Nama Lokasi"
			:class="formErrors.location_name ? 'is-error' : ''"
		>
			<el-input
				placeholder="Nama Lokasi"
				v-model="formModel.location_name"
			></el-input>
			<div class="el-form-item__error" v-if="formErrors.location_name">
				{{ formErrors.location_name[0] }}
			</div>
		</el-form-item>

		<el-form-item
			label="Alamat Lokasi"
			:class="formErrors.location_address ? 'is-error' : ''"
		>
			<el-input
				placeholder="Alamat Lokasi"
				type="textarea"
				rows="3"
				v-model="formModel.location_address"
			></el-input>
			<div class="el-form-item__error" v-if="formErrors.location_address">
				{{ formErrors.location_address[0] }}
			</div>
		</el-form-item>

		<el-form-item
			label="Info Tambahan Tiket"
			:class="formErrors.additional_info_ticket ? 'is-error' : ''"
		>
			<el-input
				placeholder="Info Tambahan Tiket"
				type="textarea"
				rows="3"
				v-model="formModel.additional_info_ticket"
			></el-input>
			<div class="el-form-item__error" v-if="formErrors.additional_info_ticket">
				{{ formErrors.additional_info_ticket[0] }}
			</div>
		</el-form-item>
		<el-form-item
			label="Plat Nomor Default"
			:class="formErrors.default_plate_number ? 'is-error' : ''"
		>
			<el-input
				placeholder="Plat Nomor Default"
				v-model="formModel.default_plate_number"
			></el-input>
			<div class="el-form-item__error" v-if="formErrors.default_plate_number">
				{{ formErrors.default_plate_number[0] }}
			</div>
		</el-form-item>
		<el-form-item
			label="Jumlah Kendaraan Per Kartu"
			:class="formErrors.jml_kendaraan_per_kartu ? 'is-error' : ''"
		>
			<el-input
				type="number"
				placeholder="Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)"
				v-model="formModel.jml_kendaraan_per_kartu"
			></el-input>
			<div
				class="el-form-item__error"
				v-if="formErrors.jml_kendaraan_per_kartu"
			>
				{{ formErrors.jml_kendaraan_per_kartu[0] }}
			</div>
		</el-form-item>

		<el-form-item
			label="Mode Buka Gate Untuk Member"
			:class="formErrors.member_auto_open ? 'is-error' : ''"
		>
			<el-select
				placeholder="Mode Buka Gate Untuk Member"
				v-model="formModel.member_auto_open"
				style="width: 100%"
			>
				<el-option
					v-for="(l, i) in [
						'Ketik Plat Nomor (Buka oleh operator)',
						'Tempel Kartu (Otomatis)',
					]"
					:key="i"
					:value="i"
					:label="l"
				></el-option>
			</el-select>
			<div class="el-form-item__error" v-if="formErrors.member_auto_open">
				{{ formErrors.member_auto_open[0] }}
			</div>
		</el-form-item>

		<el-form-item
			label="Hapus Snapshot dalam x hari"
			:class="formErrors.hapus_snapshot_dalam_hari ? 'is-error' : ''"
		>
			<el-input
				type="number"
				placeholder="Hapus Snapshot dalam x hari (0 untuk hapus manual)"
				v-model="formModel.hapus_snapshot_dalam_hari"
			></el-input>
			<div
				class="el-form-item__error"
				v-if="formErrors.hapus_snapshot_dalam_hari"
			>
				{{ formErrors.hapus_snapshot_dalam_hari[0] }}
			</div>
		</el-form-item>

		<el-form-item
			label="Hapus Transaksi dalam x hari"
			:class="formErrors.hapus_transaksi_dalam_hari ? 'is-error' : ''"
		>
			<el-input
				type="number"
				placeholder="Hapus Transaksi dalam x hari"
				v-model="formModel.hapus_transaksi_dalam_hari"
			></el-input>
			<div
				class="el-form-item__error"
				v-if="formErrors.hapus_transaksi_dalam_hari"
			>
				{{ formErrors.hapus_transaksi_dalam_hari[0] }}
			</div>
		</el-form-item>

		<el-form-item>
			<el-button
				type="primary"
				@click="
					() => {
						!!formModel.id ? update() : store()
					}
				"
				icon="el-icon-success"
				>SIMPAN</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			formModel: {},
			formErrors: {},
			loading: false,
		}
	},
	methods: {
		requestData() {
			this.$axios
				.$get('/api/setting')
				.then((r) => (this.formModel = r))
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
				})
		},
		store() {
			this.loading = true
			this.$axios
				.$post('/api/setting', this.formModel)
				.then((r) => {
					this.$message({
						message: 'Data berhasil disimpan.',
						type: 'success',
						showClose: true,
					})
					this.requestData()
					this.$store.dispatch('getSetting')
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
					}

					if (e.response.status == 500) {
						this.formErrors = {}
						this.$message({
							message: e.response.data.message,
							type: 'error',
							showClose: true,
						})
					}
				})
				.finally(() => (this.loading = false))
		},

		update() {
			this.loading = true
			this.$axios
				.$put('/api/setting/' + this.formModel.id, this.formModel)
				.then((r) => {
					this.$message({
						message: 'Data berhasil disimpan.',
						type: 'success',
						showClose: true,
					})
					this.requestData()
					this.$store.dispatch('getSetting')
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
					}

					if (e.response.status == 500) {
						this.formErrors = {}
						this.$message({
							message: e.response.data.message,
							type: 'error',
							showClose: true,
						})
					}
				})
				.finally(() => (this.loading = false))
		},
	},
	mounted() {
		this.requestData()
	},
}
</script>
