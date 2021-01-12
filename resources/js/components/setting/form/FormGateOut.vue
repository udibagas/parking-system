<template>
	<el-dialog
		v-loading="loading"
		title="GATE KELUAR"
		:close-on-click-modal="false"
		:visible.sync="show"
		:before-close="
			(done) => {
				closeForm();
				done();
			}
		"
	>
		<el-form label-position="left" label-width="150px">
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
					placeholder="Shortcut Key"
					v-model="formModel.shortcut_key"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.shortcut_key">
					{{ formErrors.shortcut_key[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Jenis Kendaraan"
				:class="formErrors.jenis_kendaraan ? 'is-error' : ''"
			>
				<el-select
					v-model="formModel.jenis_kendaraan"
					placeholder="Jenis Kendaraan"
					style="width: 100%"
					multiple
				>
					<el-option
						v-for="k in jenisKendaraanList"
						:value="k.nama"
						:label="k.nama"
						:key="k.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
					{{ formErrors.jenis_kendaraan[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Controller"
				:class="formErrors.device ? 'is-error' : ''"
			>
				<div class="flex">
					<el-input
						class="mr-2"
						placeholder="Device"
						v-model="formModel.device"
					></el-input>
					<el-input
						type="number"
						placeholder="Baudrate"
						v-model="formModel.baudrate"
					></el-input>
				</div>

				<div class="el-form-item__error" v-if="formErrors.device">
					{{ formErrors.device[0] }}
				</div>

				<div class="el-form-item__error" v-if="formErrors.baudrate">
					{{ formErrors.baudrate[0] }}
				</div>
			</el-form-item>

			<el-form-item label="Running Text">
				<div class="flex">
					<el-input
						class="mr-2"
						placeholder="Device"
						v-model="formModel.running_text_device"
					></el-input>
					<el-input
						type="number"
						placeholder="Baudrate"
						v-model="formModel.running_text_baudrate"
					></el-input>
				</div>
			</el-form-item>

			<el-form-item
				label="Perintah Buka"
				:class="formErrors.open_command ? 'is-error' : ''"
			>
				<el-input
					placeholder="Perintah Buka"
					v-model="formModel.open_command"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.open_command">
					{{ formErrors.open_command[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Perintah Tutup"
				:class="formErrors.close_command ? 'is-error' : ''"
			>
				<el-input
					placeholder="Perintah Tutup"
					v-model="formModel.close_command"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.close_command">
					{{ formErrors.close_command[0] }}
				</div>
			</el-form-item>

			<el-form-item label="Pos" :class="formErrors.pos_id ? 'is-error' : ''">
				<el-select
					v-model="formModel.pos_id"
					placeholder="Pos"
					style="width: 100%"
				>
					<el-option
						v-for="pos in posList"
						:value="pos.id"
						:label="pos.nama"
						:key="pos.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.pos_id">
					{{ formErrors.pos_id[0] }}
				</div>
			</el-form-item>

			<el-form-item label="Kamera" :class="formErrors.kamera ? 'is-error' : ''">
				<el-select
					v-model="formModel.kamera"
					placeholder="Kamera"
					style="width: 100%"
					multiple
				>
					<el-option
						v-for="kamera in kameraList"
						:value="kamera.id"
						:label="kamera.nama"
						:key="kamera.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.kamera">
					{{ formErrors.kamera[0] }}
				</div>
			</el-form-item>

			<el-form-item label="Status" :class="formErrors.status ? 'is-error' : ''">
				<el-select
					v-model="formModel.status"
					placeholder="Status"
					style="width: 100%"
				>
					<el-option
						v-for="(t, i) in ['Tidak Aktif', 'Aktif']"
						:value="i"
						:label="t"
						:key="i"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.status">
					{{ formErrors.status[0] }}
				</div>
			</el-form-item>
		</el-form>

		<div slot="footer">
			<el-button type="info" icon="el-icon-error" @click="closeForm"
				>BATAL</el-button
			>
			<el-button
				type="primary"
				icon="el-icon-success"
				@click="formModel.id ? update() : store()"
				>SIMPAN</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: ["show", "model"],
	computed: {
		formModel() {
			return this.model;
		},
		...mapState(["kameraList", "posList", "jenisKendaraanList"])
	},
	data() {
		return {
			formErrors: {},
			loading: false
		};
	},
	methods: {
		store() {
			this.loading = true;
			axios
				.post("/gateOut", this.formModel)
				.then(r => {
					this.$emit("close");
					this.$emit("reload");
					this.$message({
						message: r.data.message,
						type: "success"
					});
				})
				.catch(e => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					this.$message({
						message: e.response.data.message,
						type: "error"
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		update() {
			this.loading = true;
			axios
				.put(`/gateOut/${this.formModel.id}`, this.formModel)
				.then(r => {
					this.$emit("close");
					this.$emit("reload");
					this.$message({
						message: r.data.message,
						type: "success"
					});
				})
				.catch(e => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					this.$message({
						message: e.response.data.message,
						type: "error"
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		closeForm() {
			this.formErrors = {};
			this.$emit("close");
		}
	}
};
</script>
