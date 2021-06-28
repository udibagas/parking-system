<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button
					size="small"
					icon="el-icon-plus"
					@click="openForm({})"
					type="primary"
					>TAMBAH POS</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Search"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="searchData"
				></el-input>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			:default-sort="{ prop: sort, order: order }"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				label="#"
				:index="tableData.from"
			></el-table-column>

			<el-table-column
				prop="name"
				label="Nama"
				sortable="custom"
				min-width="120"
			></el-table-column>

			<el-table-column
				prop="ip_address"
				label="IP Address"
				min-width="120"
			></el-table-column>

			<el-table-column
				prop="printer_device"
				label="Device Printer"
				min-width="120"
			></el-table-column>

			<el-table-column
				prop="camera_snapshot_url"
				label="URL Kamera"
				min-width="200px"
			></el-table-column>

			<el-table-column
				prop="camera_snapshot_url"
				label="User/Pass Kamera"
				min-width="180"
			>
				<template slot-scope="scope">
					{{ scope.row.camera_username }}/{{ scope.row.camera_password }}
				</template>
			</el-table-column>

			<el-table-column label="Gate Device:Baudrate" min-width="180px">
				<template slot-scope="scope">
					{{ scope.row.gate_device_name }}:{{ scope.row.gate_device_baudrate }}
				</template>
			</el-table-column>

			<el-table-column label="Perintah Buka/Tutup" min-width="200px">
				<template slot-scope="scope">
					{{ scope.row.gate_command_open }}/{{
						scope.row.gate_command_close || '-'
					}}
				</template>
			</el-table-column>

			<el-table-column width="40px" align="center" header-align="center">
				<template slot="header">
					<el-button
						type="text"
						@click="refreshData"
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
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
							>
								Edit
							</el-dropdown-item>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
							>
								Hapus
							</el-dropdown-item>

							<el-dropdown-item
								icon="el-icon-printer"
								@click.native.prevent="testCamera(scope.row)"
							>
								Test Kamera
							</el-dropdown-item>

							<el-dropdown-item
								icon="el-icon-printer"
								@click.native.prevent="test(scope.row, 'printer')"
							>
								Test Printer
							</el-dropdown-item>

							<el-dropdown-item
								icon="el-icon-setting"
								@click.native.prevent="test(scope.row, 'gate')"
							>
								Test Gate
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<br />

		<el-pagination
			class="text-right"
			background
			@current-change="currentChange"
			@size-change="sizeChange"
			layout="total, sizes, prev, pager, next"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		></el-pagination>

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT POS' : 'TAMBAH POS'"
			width="600px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-alert
				type="error"
				title="ERROR"
				:description="error.message"
				v-show="error.message"
				style="margin-bottom: 15px"
			></el-alert>

			<el-form label-width="180px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.name"></el-input>
					<div class="el-form-item__error" v-if="formErrors.name">
						{{ formErrors.name[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="IP Address Komputer"
					:class="formErrors.ip_address ? 'is-error' : ''"
				>
					<el-input
						placeholder="IP Address Komputer"
						v-model="formModel.ip_address"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.ip_address">
						{{ formErrors.ip_address[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Device Printer"
					:class="formErrors.printer_device ? 'is-error' : ''"
				>
					<el-input
						placeholder="Device Printer"
						v-model="formModel.printer_device"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.printer_device">
						{{ formErrors.printer_device[0] }}
					</div>
				</el-form-item>
			</el-form>

			<el-tabs type="border-card">
				<el-tab-pane label="KAMERA">
					<el-form label-position="left" label-width="150px">
						<el-form-item
							label="URL"
							:class="formErrors.camera_snapshot_url ? 'is-error' : ''"
						>
							<el-input
								placeholder="URL"
								v-model="formModel.camera_snapshot_url"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.camera_snapshot_url"
							>
								{{ formErrors.camera_snapshot_url[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Username"
							:class="formErrors.camera_username ? 'is-error' : ''"
						>
							<el-input
								placeholder="Username"
								v-model="formModel.camera_username"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.camera_username"
							>
								{{ formErrors.camera_username[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Password"
							:class="formErrors.camera_password ? 'is-error' : ''"
						>
							<el-input
								placeholder="Password"
								v-model="formModel.camera_password"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.camera_password"
							>
								{{ formErrors.camera_password[0] }}
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="GATE">
					<el-form label-position="left" label-width="150px">
						<el-form-item
							label="Device"
							:class="formErrors.gate_device_name ? 'is-error' : ''"
						>
							<el-input
								placeholder="Device"
								v-model="formModel.gate_device_name"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.gate_device_name"
							>
								{{ formErrors.gate_device_name[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Baudrate"
							:class="formErrors.gate_device_baudrate ? 'is-error' : ''"
						>
							<el-input
								placeholder="Baudrate"
								v-model="formModel.gate_device_baudrate"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.gate_device_baudrate"
							>
								{{ formErrors.gate_device_baudrate[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Perintah Buka"
							:class="formErrors.gate_command_open ? 'is-error' : ''"
						>
							<el-input
								placeholder="Perintah Buka"
								v-model="formModel.gate_command_open"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.gate_command_open"
							>
								{{ formErrors.gate_command_open[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Perintah Tutup"
							:class="formErrors.gate_command_close ? 'is-error' : ''"
						>
							<el-input
								placeholder="Perintah Tutup"
								v-model="formModel.gate_command_close"
							></el-input>
							<div
								class="el-form-item__error"
								v-if="formErrors.gate_command_close"
							>
								{{ formErrors.gate_command_close[0] }}
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>

			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button icon="el-icon-success" type="primary" @click="save">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>

		<el-dialog title="SNAPSHOT KAMERA" center :visible.sync="showSnapshot">
			<img :src="snapshot" alt="" style="width: 100%" />
		</el-dialog>
	</div>
</template>

<script>
import crud from '~/mixins/crud'

export default {
	mixins: [crud],
	data() {
		return {
			url: '/api/pos',
			showSnapshot: false,
			snapshot: null,
		}
	},

	methods: {
		testCamera(id) {
			this.$axios
				.$get(`/api/testCamera/${id}`)
				.then((r) => {
					this.snapshot = 'data:image/jpeg;base64,' + r.snapshot
					this.showSnapshot = true
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
		},

		test(pos, device) {
			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE POS GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				if (device == 'printer') {
					ws.send(
						[
							'test_printer',
							pos.printer_device,
							`TEST PRINTER ${pos.name}`,
						].join(';')
					)
				}

				if (device == 'gate') {
					ws.send(
						[
							'open',
							pos.gate_device_name,
							pos.gate_device_baudrate,
							pos.gate_command_open,
							pos.gate_command_close,
						].join(';')
					)
				}
			}

			ws.onmessage = (event) => {
				let data = JSON.parse(event.data)
				this.$message({
					message: data.message,
					type: data.status ? 'success' : 'error',
				})
				ws.close()
			}
		},
	},
}
</script>
