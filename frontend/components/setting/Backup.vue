<template>
	<div>
		<el-form class="text-right" inline @submit.native.prevent>
			<el-form-item>
				<el-button
					:disabled="selectedFiles.length == 0"
					@click="deleteFiles"
					type="danger"
					icon="el-icon-delete"
					size="small"
					title="Hapus File Backup"
					>HAPUS FILE BACKUP</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-button
					@click="triggerOpenFile"
					type="primary"
					icon="el-icon-upload2"
					size="small"
					title="Upload File Backup"
					>UPLOAD FILE BACKUP</el-button
				>
				<input
					type="file"
					style="display: none"
					id="input-file"
					@change="uploadFile"
				/>
			</el-form-item>

			<el-form-item>
				<el-button
					@click="backup"
					type="primary"
					icon="el-icon-plus"
					size="small"
					title="Generate Backup"
					:loading="processing"
					>GENERATE BACKUP</el-button
				>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData"
			v-loading="loading"
			stripe
			height="calc(100vh - 260px)"
			@selection-change="handleSelectionChange"
		>
			<el-table-column
				type="selection"
				width="55"
				align="center"
				header-align="center"
			></el-table-column>

			<el-table-column type="index" label="#"></el-table-column>

			<el-table-column
				prop="tanggal"
				label="Tanggal"
				width="200"
			></el-table-column>

			<el-table-column prop="file" label="File"></el-table-column>

			<el-table-column
				prop="size"
				label="Ukuran"
				width="100"
				align="right"
				header-align="right"
			>
			</el-table-column>

			<el-table-column width="60" align="center" header-align="center">
				<template slot="header">
					<el-button
						type="text"
						@click="getData"
						icon="el-icon-refresh"
					></el-button>
				</template>

				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								icon="el-icon-download"
								@click.native.prevent="download(scope.row.url)"
								>Download</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-refresh"
								@click.native.prevent="restore(scope.row.file)"
								>Restore</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.file)"
								>Hapus</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			loading: false,
			processing: false,
			selectedFiles: [],
		}
	},

	mounted() {
		this.getData()
	},

	methods: {
		getData() {
			this.loading = true
			this.$axios
				.$get('/api/backup')
				.then((response) => {
					this.tableData = response
				})
				.finally(() => (this.loading = false))
		},

		deleteData(file) {
			this.$confirm('Anda yakin akan menghapus file ini?', 'Konfirmasi', {
				type: 'warning',
			})
				.then(() => {
					const params = { file }
					this.$axios.$delete('/api/backup', { params }).then((response) => {
						this.$message({
							message: response.message,
							type: 'success',
							showClose: true,
						})
						this.getData()
					})
				})
				.catch((e) => console.log(e))
		},

		backup() {
			this.processing = true
			this.$axios
				.$post('/api/backup')
				.then((response) => {
					this.$message({
						message: response.message,
						type: 'success',
						showClose: true,
					})
					this.getData()
				})
				.finally(() => (this.processing = false))
		},

		restore(file) {
			this.$confirm('Anda yakin akan me-restore database?', 'Konfirmasi', {
				type: 'warning',
			})
				.then(() => {
					this.loading = true
					this.$axios
						.$put('/api/backup', { file })
						.then((response) => {
							this.$message({
								message: response.message,
								type: 'success',
								showClose: true,
							})
							this.getData()
						})
						.finally(() => (this.loading = false))
				})
				.catch((e) => console.log(e))
		},

		triggerOpenFile() {
			const f = document.getElementById('input-file')
			f.click()
		},

		uploadFile(event) {
			var formData = new FormData()
			formData.append('file', event.target.files[0])

			this.$axios
				.$post('/api/backup', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((response) => {
					this.$message({
						message: response.message,
						type: 'success',
						showClose: true,
					})
					this.getData()
				})
				.finally(() => {
					this.loading = false
					document.getElementById('input-file').value = ''
				})
		},

		handleSelectionChange(val) {
			this.selectedFiles = val.map((v) => v.file)
		},

		deleteFiles() {
			this.deleteData(this.selectedFiles)
		},

		download(url) {
			window.open(url, '_blank')
		},
	},
}
</script>
