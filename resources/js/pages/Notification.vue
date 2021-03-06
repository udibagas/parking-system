<template>
	<div>
		<el-tabs>
			<el-tab-pane label="NOTIFIKASI">
				<el-form
					:inline="true"
					style="text-align: right"
					@submit.native.prevent="
						() => {
							return;
						}
					"
				>
					<el-form-item>
						<el-button
							size="small"
							@click="clearNotification"
							type="danger"
							icon="el-icon-delete"
							>HAPUS NOTIFIKASI</el-button
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
							range-separator="To"
							start-placeholder="Start date"
							end-placeholder="End date"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item style="margin-right: 0">
						<el-input
							size="small"
							v-model="keyword"
							placeholder="Search"
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
					:data="tableData.data"
					stripe
					:default-sort="{ prop: sort, order: order }"
					height="calc(100vh - 275px)"
					v-loading="loading"
					@sort-change="sortChange"
				>
					<el-table-column
						prop="created_at"
						label="Time"
						sortable="custom"
						width="150px"
					>
						<template slot-scope="scope">
							{{ scope.row.created_at | readableDateTime }}
						</template>
					</el-table-column>
					<el-table-column label="Message" min-width="150px">
						<template slot-scope="scope">
							{{ JSON.parse(scope.row.data).message }}
						</template>
					</el-table-column>
					<el-table-column width="70px" align="center" header-align="center">
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
							<el-button
								size="small"
								type="text"
								plain
								icon="el-icon-delete"
								@click="deleteData(scope.row.id)"
							></el-button>
						</template>
					</el-table-column>
				</el-table>

				<br />

				<el-pagination
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
					layout="prev, pager, next, sizes, total"
					:page-size="pageSize"
					:page-sizes="[10, 25, 50, 100]"
					:total="tableData.total"
				>
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane lazy label="SNAPSHOT">
				<Snapshot />
			</el-tab-pane>
			<el-tab-pane lazy label="LOG USER">
				<UserLog :range="dateRange" />
			</el-tab-pane>
			<el-tab-pane lazy label="LOG GATE MASUK">
				<ControllerLog />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import ControllerLog from "./ControllerLog";
import UserLog from "./UserLog";
import Snapshot from "./Snapshot";

export default {
	components: { ControllerLog, UserLog, Snapshot },
	data() {
		return {
			keyword: "",
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "created_at",
			order: "ascending",
			loading: false,
			dateRange: [moment().format("YYYY-MM-01"), moment().format("YYYY-MM-DD")],
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
		deleteData(id) {
			this.$confirm("Anda yakin akan menghapus data ini?", "Warning", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete(`/notification/${id}`)
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
				read: 1,
			};

			this.loading = true;
			axios
				.get("/notification", { params: params })
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		clearNotification() {
			this.$confirm("Anda yakin akan menghapus semua notifikasi?", "Warning", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete("/notification/clearNotification")
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
	},
	mounted() {
		this.requestData();
	},
};
</script>
