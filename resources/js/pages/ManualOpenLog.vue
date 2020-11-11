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
			@row-dblclick="
				(row, column, event) => {
					snapshots = row.snapshots;
					showSnapshot = true;
				}
			"
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 260px)"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				prop="created_at"
				label="Tanggal"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="gate_out.nama"
				label="Gate Out"
				show-overflow-tooltip
				min-width="150px"
			>
			</el-table-column>

			<el-table-column
				prop="user.name"
				label="Operator"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="alasan"
				label="Alasan"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
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
								icon="el-icon-camera"
								@click.native.prevent="
									() => {
										snapshots = scope.row.snapshots;
										showSnapshot = true;
									}
								"
								>Lihat Snapshot</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			class="mt-3"
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

		<el-dialog
			center
			top="60px"
			width="600px"
			:visible.sync="showSnapshot"
			title="SNAPSHOT"
		>
			<el-image
				v-for="(snapshot, i) in snapshots"
				:key="i"
				:src="snapshot.url"
				style="width: 100%; height: 100%"
				fit="cover"
			>
				<div slot="error" class="el-image__error">
					<i class="el-icon-picture-outline"></i>
				</div>
			</el-image>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: ["range"],
	watch: {
		range(v) {
			this.requestData();
		},
	},
	data() {
		return {
			keyword: "",
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "updated_at",
			order: "descending",
			loading: false,
			showSnapshot: false,
			snapshots: [],
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
		requestData() {
			let params = {
				page: this.page,
				keyword: this.keyword,
				pageSize: this.pageSize,
				sort: this.sort,
				order: this.order,
				dateRange: this.range,
			};

			this.loading = true;
			axios
				.get("/manualOpenLog", { params: params })
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					if (e.response.status == 500) {
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
