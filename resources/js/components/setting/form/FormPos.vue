<template>
	<el-dialog
		v-loading="loading"
		title="POS"
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
				label="Alamat IP"
				:class="formErrors.ip_address ? 'is-error' : ''"
			>
				<el-input
					placeholder="Alamat IP"
					v-model="formModel.ip_address"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.ip_address">
					{{ formErrors.ip_address[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="SSH Port"
				:class="formErrors.ssh_port ? 'is-error' : ''"
			>
				<el-input
					type="number"
					placeholder="SSH Port"
					v-model="formModel.ssh_port"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.ssh_port">
					{{ formErrors.ssh_port[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Username"
				:class="formErrors.username ? 'is-error' : ''"
			>
				<el-input
					placeholder="Username"
					v-model="formModel.username"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.username">
					{{ formErrors.username[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Password"
				:class="formErrors.password ? 'is-error' : ''"
			>
				<el-input
					placeholder="Password"
					v-model="formModel.password"
				></el-input>

				<div class="el-form-item__error" v-if="formErrors.password">
					{{ formErrors.password[0] }}
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

			<!-- <el-form-item
				label="Gate Keluar"
				:class="formErrors.gate_out ? 'is-error' : ''"
			>
				<el-select
					v-model="formModel.gate_out"
					placeholder="Gate Keluar"
					style="width: 100%"
					multiple
				>
					<el-option
						v-for="gate in gateOutList"
						:value="gate.id"
						:label="gate.nama"
						:key="gate.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.gate_out">
					{{ formErrors.gate_out[0] }}
				</div>
			</el-form-item> -->
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
		...mapState(["printerList", "gateOutList"]),
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
				.post("/pos", this.formModel)
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
				.put(`/pos/${this.formModel.id}`, this.formModel)
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
