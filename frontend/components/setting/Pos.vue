<template>
	<div>
		<div class="text-right mb-4">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH POS</el-button
			>
		</div>

		<el-table :data="tableData" stripe height="calc(100vh - 205px)">
			<el-table-column type="index"></el-table-column>
			<el-table-column
				min-width="100"
				label="Nama"
				prop="nama"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="IP Address"
				prop="ip_address"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Printer"
				prop="printer.nama"
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
		<FormPos
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import FormPos from "./form/FormPos";

export default {
	components: { FormPos },
	mounted() {
		this.requestData();
	},
	data() {
		return {
			tableData: [],
			selectedData: {},
			showForm: false,
			loading: false
		};
	},
	methods: {
		requestData() {
			this.loading = true;
			axios
				.get("/pos")
				.then(r => {
					this.tableData = r.data;
				})
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error"
					});
				})
				.finally(() => (this.loading = false));

			this.$store.commit("getPosList");
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
						.delete(`/pos/${id}`)
						.then(r => {
							this.$message({
								message: r.data.message,
								type: "success"
							});
							this.requestData();
						})
						.catch(e => {
							this.$message({
								message: e.response.data.message,
								type: "error"
							});
						})
						.finally(() => (this.loading = false));
				})
				.catch(e => console.log(e));
		}
	}
};
</script>
