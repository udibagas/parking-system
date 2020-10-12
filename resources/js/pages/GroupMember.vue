<template>
	<div>
		<el-form
			inline
			class="text-right"
			@submit.native.prevent="
				() => {
					return;
				}
			"
		>
			<el-form-item v-if="$store.state.user.role == 1">
				<el-button
					size="small"
					@click="openForm({})"
					type="primary"
					icon="el-icon-plus"
					>TAMBAH GROUP</el-button
				>
			</el-form-item>

			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="
						(v) => {
							keyword = v;
							requestData();
						}
					"
				>
				</el-input>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData"
			stripe
			height="calc(100vh - 220px)"
			v-loading="loading"
		>
			<el-table-column
				prop="nama"
				label="Nama"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="keterangan"
				label="Keterangan"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<!-- <el-table-column
				prop="contact_person_name"
				label="Nama Contact Person"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="contact_person_phone"
				label="No. HP Contact Person"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="contact_person_email"
				label="Alamat Email Contact Person"
				show-overflow-tooltip
				min-width="220px"
			></el-table-column> -->
			<el-table-column
				fixed="right"
				width="40px"
				header-align="center"
				align="center"
				v-if="$store.state.user.role == 1"
			>
				<template slot="header">
					<el-button
						class="text-white"
						type="text"
						@click="
							() => {
								page = 1;
								keyword = '';
								requestData();
							}
						"
						icon="el-icon-refresh"
					>
					</el-button>
				</template>
				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native.prevent="openForm(scope.row)"
								><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item
							>
							<el-dropdown-item @click.native.prevent="deleteData(scope.row.id)"
								><i class="el-icon-delete"></i> Hapus</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT GROUP MEMBER' : 'TAMBAH GROUP MEMBER'"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="150px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Keterangan"
					:class="formErrors.keterangan ? 'is-error' : ''"
				>
					<el-input
						placeholder="Keterangan"
						v-model="formModel.keterangan"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.keterangan">
						{{ formErrors.keterangan[0] }}
					</div>
				</el-form-item>

				<!-- <el-form-item
					label="Nama Contact Person"
					:class="formErrors.contact_person_name ? 'is-error' : ''"
				>
					<el-input
						placeholder="Nama Contact Person"
						v-model="formModel.contact_person_name"
					></el-input>
					<div
						class="el-form-item__error"
						v-if="formErrors.contact_person_name"
					>
						{{ formErrors.contact_person_name[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="No. HP Contact Person"
					:class="formErrors.contact_person_phone ? 'is-error' : ''"
				>
					<el-input
						placeholder="No. HP Contact Person"
						v-model="formModel.contact_person_phone"
					></el-input>
					<div
						class="el-form-item__error"
						v-if="formErrors.contact_person_phone"
					>
						{{ formErrors.contact_person_phone[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Alamat Email Contact Person"
					:class="formErrors.contact_person_email ? 'is-error' : ''"
				>
					<el-input
						placeholder="Alamat Email Contact Person"
						v-model="formModel.contact_person_email"
					></el-input>
					<div
						class="el-form-item__error"
						v-if="formErrors.contact_person_email"
					>
						{{ formErrors.contact_person_email[0] }}
					</div>
				</el-form-item>

                <el-form-item label="Buka Gate OUT Otomatis" :class="formErrors.contact_person_email ? 'is-error' : ''">
                    <el-input placeholder="Ya/Tidak" v-model="formModel.contact_person_email"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_email">{{formErrors.contact_person_email[0]}}</div>
                </el-form-item> -->
			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false"
					>BATAL</el-button
				>
				<el-button
					type="primary"
					icon="el-icon-success"
					@click="() => (!!formModel.id ? update() : store())"
					>SIMPAN</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showForm: false,
			formErrors: {},
			formModel: {},
			keyword: "",
			tableData: [],
			loading: false,
		};
	},
	methods: {
		openForm(data) {
			this.formErrors = {};
			this.formModel = JSON.parse(JSON.stringify(data));
			this.showForm = true;
		},
		store() {
			this.loading = true;
			axios
				.post("/groupMember", this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: r.data.message,
						type: "success",
					});
					this.requestData();
					this.$store.commit("getGroupMemberList");
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
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
				.put("/groupMember/" + this.formModel.id, this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: r.data.message,
						type: "success",
					});
					this.requestData();
					this.$store.commit("getGroupMemberList");
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
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
		deleteData(id) {
			this.$confirm("Anda yakin akan menghapus data ini?", "Warning", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete("/groupMember/" + id)
						.then((r) => {
							this.requestData();
							this.$store.commit("getGroupMemberList");
							this.$message({
								message: r.data.message,
								type: "success",
							});
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: "error",
							});
						});
				})
				.catch(() => console.log(e));
		},
		requestData() {
			let params = { keyword: this.keyword };
			this.loading = true;
			axios
				.get("/groupMember", { params: params })
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				})
				.finally(() => (this.loading = false));
		},
	},
	mounted() {
		this.requestData();
	},
};
</script>

