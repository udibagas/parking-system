<template>
	<el-dialog
		v-loading="loading"
		title="PRINTER"
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

			<el-form-item label="Port" :class="formErrors.port ? 'is-error' : ''">
				<el-input placeholder="Port" v-model="formModel.port"></el-input>

				<div class="el-form-item__error" v-if="formErrors.port">
					{{ formErrors.port[0] }}
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
				.post("/printer", this.formModel)
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
				.put(`/printer/${this.formModel.id}`, this.formModel)
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
