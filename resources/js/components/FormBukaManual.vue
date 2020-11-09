<template>
	<el-dialog
		title="FORM BUKA MANUAL"
		center
		:visible.sync="show"
		:before-close="closeForm"
	>
		<el-form label-position="left" label-width="200px">
			<el-form-item
				label="Alasan buka manual"
				:class="{ 'is-error': formErrors.alasan }"
			>
				<el-input
					autofocus
					type="textarea"
					v-model="formModel.alasan"
					rows="3"
					placeholder="Alasan buka manual"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.alasan">
					{{ formErrors.alasan[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Gate Keluar"
				:class="{ 'is-error': formErrors.gate_out_id }"
			>
				<el-select
					v-model="formModel.gate_out_id"
					style="width: 100%"
					placeholder="Gate Keluar"
				>
					<el-option
						v-for="gate in gateOutList"
						:key="gate.id"
						:label="gate.nama"
						:value="gate.id"
					></el-option>
				</el-select>
				<div class="el-form-item__error" v-if="formErrors.gate_out_id">
					{{ formErrors.gate_out_id[0] }}
				</div>
			</el-form-item>

			<el-form-item
				label="Masukkan password Admin"
				:class="formErrors.password ? 'is-error' : ''"
			>
				<el-input
					type="password"
					v-model="formModel.password"
					placeholder="Password"
				></el-input>
				<div class="el-form-item__error" v-if="formErrors.password">
					{{ formErrors.password[0] }}
				</div>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button icon="el-icon-success" type="primary" @click="save">
				SIMPAN
			</el-button>
			<el-button icon="el-icon-error" type="info" @click="closeForm">
				BATAL
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: ["show"],
	computed: {
		...mapState(["gateOutList"]),
	},
	data() {
		return {
			formModel: {},
			formErrors: {},
		};
	},
	methods: {
		closeForm() {
			this.formModel = {};
			this.formErrors = {};
			this.$emit("close");
		},
		save() {
			this.$confirm(
				"Aksi ini akan dicatat oleh sistem. Anda yakin?",
				"Peringatan",
				{ type: "warning" }
			)
				.then(() => {
					axios
						.post("/manualOpenLog", this.formModel)
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: "success",
							});
							this.$emit("open-gate", this.formModel.gate_out_id);
							this.closeForm();
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: "error",
							});

							if (e.response.status == 422) {
								this.formErrors = e.response.data.errors;
							}
						});
				})
				.catch((e) => console.log(e));
		},
	},
};
</script>
