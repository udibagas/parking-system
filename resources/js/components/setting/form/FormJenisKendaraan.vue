<template>
	<el-dialog
		width="650px"
		v-loading="loading"
		:visible.sync="show"
		:title="!!formModel.id ? 'EDIT JENIS KENDARAAN' : 'TAMBAH JENIS KENDARAAN'"
		:close-on-click-modal="false"
		:before-close="
			(done) => {
				closeForm();
				done();
			}
		"
	>
		<el-form label-width="180px" label-position="left">
			<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
				<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
				<div class="el-form-item__error" v-if="formErrors.nama">
					{{ formErrors.nama[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Shortcut Key"
				:class="formErrors.shortcut_key ? 'is-error' : ''"
			>
				<el-input
					maxlength="1"
					placeholder="Shortcut Key"
					v-model="formModel.shortcut_key"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.shortcut_key">
					{{ formErrors.shortcut_key[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Mode Tarif"
				:class="formErrors.mode_tarif ? 'is-error' : ''"
			>
				<el-select
					placeholder="FLAT/PROGRESIF"
					v-model="formModel.mode_tarif"
					style="width: 100%"
				>
					<el-option :value="0" label="FLAT"></el-option>
					<el-option :value="1" label="PROGRESIF"></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.mode_tarif">
					{{ formErrors.mode_tarif[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Mode Inap"
				:class="formErrors.mode_menginap ? 'is-error' : ''"
			>
				<el-select
					placeholder="Mode Inap"
					v-model="formModel.mode_menginap"
					style="width: 100%"
				>
					<el-option :value="0" label="24 JAM DARI CHECK IN"></el-option>
					<el-option :value="1" label="LEWAT TENGAH MALAM"></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.mode_menginap">
					{{ formErrors.mode_menginap[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Tarif Flat (Rp)"
				:class="formErrors.tarif_flat ? 'is-error' : ''"
			>
				<el-input
					type="number"
					:step="500"
					placeholder="Tarif Flat (Rp)"
					v-model="formModel.tarif_flat"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.tarif_flat">
					{{ formErrors.tarif_flat[0] }}
				</div>
			</el-form-item>

			<el-form-item label="Tarif Progresif">
				<div>
					Tarif
					<el-input
						size="small"
						style="width: 80px; margin: 0 5px"
						type="number"
						v-model="formModel.menit_pertama"
					></el-input>
					menit pertama = Rp.
					<el-input
						size="small"
						style="width: 111px; margin-left: 23px"
						type="number"
						v-model="formModel.tarif_menit_pertama"
					></el-input>
				</div>
				<div>
					Tarif
					<el-input
						size="small"
						style="width: 80px; margin: 0 5px"
						type="number"
						v-model="formModel.menit_selanjutnya"
					></el-input>
					menit selanjutnya = Rp.
					<el-input
						size="small"
						style="width: 111px; margin-left: 6px"
						type="number"
						v-model="formModel.tarif_menit_selanjutnya"
					></el-input>
				</div>
				<div>
					Tarif maksimal per hari = Rp
					<el-input
						size="small"
						style="width: 205px; margin-left: 10px"
						type="number"
						v-model="formModel.tarif_maksimum"
					></el-input>
				</div>
				<div>
					Tarif menginap per hari = Rp
					<el-input
						size="small"
						style="width: 205px; margin-left: 5px"
						type="number"
						v-model="formModel.tarif_menginap"
					></el-input>
				</div>
			</el-form-item>

			<el-form-item
				label="Denda Tiket Hilang (Rp)"
				:class="formErrors.denda_tiket_hilang ? 'is-error' : ''"
			>
				<el-input
					type="number"
					:step="500"
					placeholder="Denda Tiket Hilang (Rp)"
					v-model="formModel.denda_tiket_hilang"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.denda_tiket_hilang">
					{{ formErrors.denda_tiket_hilang[0] }}
				</div>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button icon="el-icon-error" type="info" @click="closeForm"
				>BATAL</el-button
			>
			<el-button
				icon="el-icon-success"
				type="primary"
				@click="formModel.id ? update() : store()"
				>SIMPAN</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
export default {
	props: ["show", "model"],
	computed: {
		formModel() {
			return this.model;
		},
	},
	data() {
		return {
			formErrors: {},
			loading: false,
		};
	},
	methods: {
		store() {
			this.loading = true;
			axios
				.post("/jenisKendaraan", this.formModel)
				.then((r) => {
					this.$emit("close");
					this.$emit("reload");
					this.$message({
						message: r.data.message,
						type: "success",
					});
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		update() {
			this.loading = true;
			axios
				.put(`/jenisKendaraan/${this.formModel.id}`, this.formModel)
				.then((r) => {
					this.$emit("close");
					this.$emit("reload");
					this.$message({
						message: r.data.message,
						type: "success",
					});
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		closeForm() {
			this.formErrors = {};
			this.$emit("close");
		},
	},
};
</script>

<style>
</style>
