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
			<el-form-item>
				<el-button size="small" @click="openForm({})" type="primary"
					><i class="el-icon-plus"></i> INPUT PEMBAYARAN KEANGGOTAAN</el-button
				>
			</el-form-item>

			<el-form-item>
				<el-date-picker
					size="small"
					@change="requestData"
					v-model="dateRange"
					format="dd/MMM/yyyy"
					value-format="yyyy-MM-dd"
					type="daterange"
					range-separator="-"
					start-placeholder="Dari tanggal"
					end-placeholder="Sampai tanggal"
				>
				</el-date-picker>
			</el-form-item>

			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					clearable
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
			:data="tableData.data"
			stripe
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 260px)"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column prop="created_at" label="Tanggal Trx" sortable="custom">
				<template slot-scope="scope">
					{{ scope.row.created_at | readableDateTime }}
				</template>
			</el-table-column>
			<el-table-column
				prop="member_name"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
			>
			</el-table-column>
			<el-table-column
				prop="card_number"
				label="Nomor Kartu"
				sortable="custom"
			></el-table-column>
			<el-table-column
				prop="dari_tanggal"
				label="Dari Tanggal"
				width="150px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.dari_tanggal | readableDate }}
				</template>
			</el-table-column>
			<el-table-column
				prop="sampai_tanggal"
				label="Sampai Tanggal"
				width="160px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.sampai_tanggal | readableDate }}
				</template>
			</el-table-column>
			<el-table-column
				prop="amount"
				label="Jumlah"
				sortable="custom"
				align="right"
				header-align="right"
			>
				<template slot-scope="scope">
					Rp. {{ scope.row.amount | formatNumber }}
				</template>
			</el-table-column>
			<el-table-column
				prop="operator"
				label="Operator"
				sortable="custom"
			></el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button
						type="text"
						class="text-white"
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
							<el-dropdown-item
								icon="el-icon-printer"
								@click.native.prevent="printSlip(scope.row.id)"
								>Print Slip</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
								>Edit</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
								>Hapus</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<div class="flex flex-row mt-3">
			<el-pagination
				class="flex-grow"
				background
				@current-change="
					(p) => {
						page = p;
						requestData();
					}
				"
				@size-change="
					(s) => {
						pageSize = s;
						requestData();
					}
				"
				layout="total, sizes, prev, pager, next"
				:page-size="pageSize"
				:page-sizes="[10, 25, 50, 100]"
				:total="tableData.total"
			>
			</el-pagination>

			<div class="text-sm">
				Menampilkan {{ tableData.from }} - {{ tableData.to }} dari
				{{ tableData.total }}
			</div>
		</div>

		<el-dialog
			:visible.sync="showForm"
			:title="
				!!formModel.id
					? 'EDIT PEMBAYARAN KEANGGOTAAN'
					: 'INPUT PEMBAYARAN KEANGGOTAAN'
			"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="180px" label-position="left">
				<el-form-item
					label="Member"
					:class="formErrors.parking_member_id ? 'is-error' : ''"
				>
					<el-select
						filterable
						default-first-option
						clearable
						v-model="formModel.parking_member_id"
						placeholder="Member"
						style="width: 100%"
					>
						<el-option
							v-for="(m, i) in $store.state.memberList.filter((m) => m.paid)"
							:value="m.id"
							:label="m.card_number + ' - ' + m.name"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.parking_member_id">
						{{ formErrors.parking_member_id[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Siklus Pembayaran"
					:class="formErrors.siklus_pembayaran ? 'is-error' : ''"
				>
					<el-input
						type="number"
						v-model="formModel.siklus_pembayaran"
						style="width: 30%"
					></el-input>
					<el-select
						placeholder="Pilih"
						v-model="formModel.siklus_pembayaran_unit"
						style="width: 66%; float: right; clear: right"
					>
						<el-option
							v-for="(s, i) in $store.state.siklus"
							:value="s.value"
							:label="s.label"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.siklus_pembayaran">
						{{ formErrors.siklus_pembayaran[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Dari Tanggal"
					:class="formErrors.dari_tanggal ? 'is-error' : ''"
				>
					<el-date-picker
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Dari Tanggal"
						v-model="formModel.dari_tanggal"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.dari_tanggal">
						{{ formErrors.dari_tanggal[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Sampai Tanggal"
					:class="formErrors.sampai_tanggal ? 'is-error' : ''"
				>
					<el-date-picker
						disabled
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Sampai Tanggal"
						v-model="sampai_tanggal"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.sampai_tanggal">
						{{ formErrors.sampai_tanggal[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jumlah"
					:class="formErrors.amount ? 'is-error' : ''"
				>
					<el-input
						type="number"
						placeholder="Jumlah"
						v-model="formModel.amount"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.amount">
						{{ formErrors.amount[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button icon="el-icon-success" type="primary" @click="save"
					>SIMPAN</el-button
				>
				<el-button icon="el-icon-error" type="info" @click="showForm = false"
					>BATAL</el-button
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
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "created_at",
			order: "descending",
			loading: false,
			dateRange: "",
		};
	},
	computed: {
		sampai_tanggal() {
			try {
				return moment(this.formModel.dari_tanggal, "YYYY-MM-DD")
					.add(
						this.formModel.siklus_pembayaran,
						this.formModel.siklus_pembayaran_unit
					)
					.format("YYYY-MM-DD");
			} catch (error) {
				return "";
			}
		},
	},
	methods: {
		sortChange(c) {
			if (c.prop != this.sort || c.order != this.order) {
				this.sort = c.prop;
				this.order = c.order;
				this.requestData();
			}
		},
		openForm(data) {
			this.error = {};
			this.formErrors = {};
			this.formModel = JSON.parse(JSON.stringify(data));
			this.showForm = true;
		},
		save() {
			this.formModel.sampai_tanggal = this.sampai_tanggal;
			this.$confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
				.then(() => {
					if (!!this.formModel.id) {
						this.update();
					} else {
						this.store();
					}
				})
				.catch((e) => console.log(e));
		},
		store() {
			this.loading = true;
			axios
				.post("/memberRenewal", this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: r.data.message,
						type: "success",
					});
					this.requestData();
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
				.put("/memberRenewal/" + this.formModel.id, this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: r.data.message,
						type: "success",
					});
					this.requestData();
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
						.delete("/memberRenewal/" + id)
						.then((r) => {
							this.requestData();
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
			let params = {
				page: this.page,
				keyword: this.keyword,
				pageSize: this.pageSize,
				sort: this.sort,
				order: this.order,
				dateRange: this.dateRange,
			};

			this.loading = true;
			axios
				.get("/memberRenewal", { params: params })
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		printSlip(id) {
			axios
				.post("/memberRenewal/printSlip/" + id)
				.then((r) => {
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
		},
	},
	mounted() {
		this.requestData();
		this.$store.commit("getMemberList");
	},
};
</script>
