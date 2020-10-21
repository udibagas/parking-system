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
				prop="nama_member"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
			>
			</el-table-column>
			<el-table-column
				prop="nomor_kartu"
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
				prop="jumlah"
				label="Jumlah"
				sortable="custom"
				align="right"
				header-align="right"
			>
				<template slot-scope="scope">
					Rp. {{ scope.row.jumlah | formatNumber }}
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
								@click.native.prevent="
									() => {
										selectedData = scope.row;
										showPrintDialog = true;
									}
								"
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

		<FormRenewal
			:model="formModel"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>

		<PrintDialog
			:show="showPrintDialog"
			@print="(printer_id) => printSlip(printer_id)"
			@close="showPrintDialog = false"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";
import FormRenewal from "../components/FormRenewal";
import PrintDialog from "../components/PrintDialog";

export default {
	components: { FormRenewal, PrintDialog },
	data() {
		return {
			showForm: false,
			formModel: {},
			keyword: "",
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "created_at",
			order: "descending",
			loading: false,
			dateRange: "",
			showPrintDialog: false,
			selectedData: {},
		};
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
			this.formModel = JSON.parse(JSON.stringify(data));
			this.showForm = true;
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
		printSlip(printer_id) {
			axios
				.post(`/memberRenewal/printSlip/${this.selectedData.id}`, {
					printer_id,
				})
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
				})
				.finally(() => {
					this.showPrintDialog = false;
				});
		},
	},
	mounted() {
		this.requestData();
		this.$store.commit("getMemberList");
	},
};
</script>
