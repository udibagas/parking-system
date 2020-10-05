<template>
	<div>
		<div class="text-right mb-4">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH KAMERA</el-button
			>
		</div>

		<el-table :data="tableData" stripe height="calc(100vh - 205px)">
			<el-table-column type="index"></el-table-column>
			<el-table-column min-width="100" label="Status" prop="status">
				<template slot-scope="scope">
					<el-tag
						effect="dark"
						:type="scope.row.status ? 'success' : 'info'"
						size="small"
						>{{ scope.row.status ? "Aktif" : "Tidak Aktif" }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				min-width="150"
				label="Nama"
				prop="nama"
			></el-table-column>
			<el-table-column
				min-width="150"
				label="IP Address"
				prop="ip_address"
			></el-table-column>
			<el-table-column
				min-width="150"
				label="Snapshot URL"
				prop="snapshot_url"
			></el-table-column>
			<el-table-column
				min-width="150"
				label="Username"
				prop="username"
			></el-table-column>
			<el-table-column
				min-width="150"
				label="Password"
				prop="password"
			></el-table-column>
			<el-table-column
				min-width="150"
				label="Auth Type"
				prop="auth_type"
			></el-table-column>
			<el-table-column
				fixed="right"
				width="60px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button type="text" @click="requestData" icon="el-icon-refresh">
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
								@click.native.prevent="testKamera(scope.row.id)"
								>Test Kamera</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit"
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

		<FormKamera
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>

		<el-dialog title="SNAPSHOT KAMERA" center :visible.sync="showSnapshot">
			<img :src="snapshot" alt="" style="width: 100%" />
		</el-dialog>
	</div>
</template>

<script>
import FormKamera from "./form/FormKamera";

export default {
	components: { FormKamera },
	mounted() {
		this.requestData();
	},
	data() {
		return {
			tableData: [],
			selectedData: {},
			showForm: false,
			loading: false,
			showSnapshot: false,
			snapshot: null,
		};
	},
	methods: {
		requestData() {
			this.loading = true;
			axios
				.get("/kamera")
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

			this.$store.commit("getJenisKameraList");
		},
		openForm(data = null) {
			this.selectedData = data ? JSON.parse(JSON.stringify(data)) : {};
			this.showForm = true;
		},
		deleteData(id) {
			this.$confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
				.then(() => {
					this.loading = true;
					axios
						.delete(`/kamera/${id}`)
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: "success",
							});
							this.requestData();
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: "error",
							});
						})
						.finally(() => (this.loading = false));
				})
				.catch((e) => console.log(e));
		},
		testKamera(id) {
			axios
				.get(`/kamera/test/${id}`)
				.then((r) => {
					this.snapshot = "data:image/jpeg;base64," + r.data.snapshot;
					this.showSnapshot = true;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				});
		},
	},
};
</script>
