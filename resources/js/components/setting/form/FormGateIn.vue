<template>
	<el-dialog
		v-loading="loading"
		title="GATE MASUK"
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
					maxlength="1"
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
				<el-input
					placeholder="Jenis Kendaraan"
					v-model="formModel.jenis_kendaraan"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
					{{ formErrors.jenis_kendaraan[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Alamat IP Kontroler"
				:class="formErrors.controller_ip_address ? 'is-error' : ''"
			>
				<el-input
					placeholder="Alamat IP Kontroler"
					v-model="formModel.controller_ip_address"
				></el-input>

				<div
					class="el-form-item__error"
					v-if="formErrors.controller_ip_address"
				>
					{{ formErrors.controller_ip_address[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Port Kontroler"
				:class="formErrors.controller_port ? 'is-error' : ''"
			>
				<el-input
					type="number"
					placeholder="Port Kontroler"
					v-model="formModel.controller_port"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.controller_port">
					{{ formErrors.controller_port[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Printer"
				:class="formErrors.printer_id ? 'is-error' : ''"
			>
				<el-select
					v-model="formModel.printer_id"
					placeholder="Printer"
					style="width: 100%"
				>
					<el-option
						v-for="printer in printerList"
						:value="printer.id"
						:label="printer.nama"
						:key="printer.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.printer_id">
					{{ formErrors.printer_id[0] }}
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
		...mapState(["kameraList", "printerList"]),
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
				.post("/gateIn", this.formModel)
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
				.put(`/gateIn/${this.formModel.id}`, this.formModel)
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
