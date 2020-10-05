<template>
	<div>
		<el-form label-position="left" label-width="250px">
			<el-form-item
				label="Nama Lokasi"
				:class="formErrors.nama_lokasi ? 'is-error' : ''"
			>
				<el-input
					placeholder="Nama Lokasi"
					v-model="formModel.nama_lokasi"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.nama_lokasi">
					{{ formErrors.nama_lokasi[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Alamat Lokasi"
				:class="formErrors.alamat_lokasi ? 'is-error' : ''"
			>
				<el-input
					placeholder="Alamat Lokasi"
					type="textarea"
					rows="3"
					v-model="formModel.alamat_lokasi"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.alamat_lokasi">
					{{ formErrors.alamat_lokasi[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Info Tambahan Tiket"
				:class="formErrors.info_tambahan_tiket ? 'is-error' : ''"
			>
				<el-input
					placeholder="Info Tambahan Tiket"
					type="textarea"
					rows="3"
					v-model="formModel.info_tambahan_tiket"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.info_tambahan_tiket">
					{{ formErrors.info_tambahan_tiket[0] }}
				</div>
			</el-form-item>
			<el-form-item
				label="Plat Nomor Default"
				:class="formErrors.plat_nomor_default ? 'is-error' : ''"
			>
				<el-input
					placeholder="Plat Nomor Default"
					v-model="formModel.plat_nomor_default"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.plat_nomor_default">
					{{ formErrors.plat_nomor_default[0] }}
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
				label="Mode Transaksi Member"
				:class="formErrors.must_checkout ? 'is-error' : ''"
			>
				<el-select
					placeholder="Mode Transaksi Member"
					v-model="formModel.must_checkout"
					style="width: 100%"
				>
					<el-option
						v-for="(l, i) in ['Tidak harus check out', 'Harus check out']"
						:key="i"
						:value="i"
						:label="l"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.must_checkout">
					{{ formErrors.must_checkout[0] }}
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
				label="Disable Plat Nomor di Pos Keluar"
				:class="formErrors.disable_plat_nomor ? 'is-error' : ''"
			>
				<el-select
					placeholder="Disable Plat Nomor di Pos Keluar"
					v-model="formModel.disable_plat_nomor"
					style="width: 100%"
				>
					<el-option
						v-for="(l, i) in ['Tidak', 'Ya']"
						:key="i"
						:value="i"
						:label="l"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.disable_plat_nomor">
					{{ formErrors.disable_plat_nomor[0] }}
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
		</el-form>
		<el-button
			style="width: 100%"
			type="primary"
			@click="
				() => {
					!!formModel.id ? update() : store();
				}
			"
			icon="el-icon-success"
			>SIMPAN</el-button
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formModel: {},
			formErrors: {},
			loading: false,
		};
	},
	methods: {
		requestData() {
			axios
				.get("/setting")
				.then((r) => {
					this.formModel = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				});
		},
		store() {
			this.loading = true;
			axios
				.post("/setting", this.formModel)
				.then((r) => {
					this.$message({
						message: "Data berhasil disimpan.",
						type: "success",
						showClose: true,
					});
					this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
						this.$message({
							message: e.response.data.message,
							type: "error",
							showClose: true,
						});
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
		update() {
			this.loading = true;
			axios
				.put("/setting/" + this.formModel.id, this.formModel)
				.then((r) => {
					this.$message({
						message: "Data berhasil disimpan.",
						type: "success",
						showClose: true,
					});
					this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
						this.$message({
							message: e.response.data.message,
							type: "error",
							showClose: true,
						});
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.requestData();
	},
};
</script>
