<template>
	<div>
		<div class="text-right">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH GATE KELUAR</el-button
			>
		</div>

		<br />

		<el-table :data="tableData.data" stripe height="calc(100vh - 300px)">
			<el-table-column
				type="index"
				:index="tableData.from"
				label="#"
			></el-table-column>

			<el-table-column min-width="100" label="Status" prop="status">
				<template slot-scope="scope">
					<el-tag
						effect="dark"
						:type="scope.row.status ? 'success' : 'info'"
						size="small"
						>{{ scope.row.status ? 'Aktif' : 'Tidak Aktif' }}</el-tag
					>
				</template>
			</el-table-column>

			<el-table-column
				min-width="150"
				label="Nama"
				prop="nama"
			></el-table-column>

			<el-table-column
				prop="shortcut_key"
				label="Shortcut"
				align="center"
				header-align="center"
				min-width="100"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Pos"
				prop="pos.nama"
			></el-table-column>

			<el-table-column
				min-width="150"
				label="Jenis Kendaraan"
				prop="jenis_kendaraan"
			>
				<template slot-scope="scope">
					{{
						scope.row.jenis_kendaraan
							? scope.row.jenis_kendaraan.join(', ')
							: ''
					}}
				</template>
			</el-table-column>

			<el-table-column min-width="150" label="Controller Device">
				<template slot-scope="scope">
					{{ scope.row.device }}:{{ scope.row.baudrate }}
				</template>
			</el-table-column>

			<el-table-column
				min-width="120"
				label="Perintah Buka"
				prop="open_command"
			></el-table-column>

			<el-table-column
				min-width="120"
				label="Perintah Tutup"
				prop="close_command"
			></el-table-column>

			<el-table-column min-width="200" label="Running Text Device">
				<template slot-scope="scope">
					{{ scope.row.running_text_device }}:{{
						scope.row.running_text_baudrate
					}}
				</template>
			</el-table-column>

			<el-table-column min-width="150" label="Kamera">
				<template slot-scope="scope">
					{{
						scope.row.kameraList
							? scope.row.kameraList.map((k) => k.nama).join(',')
							: ''
					}}
				</template>
			</el-table-column>

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
								icon="el-icon-minus"
								@click.native.prevent="testGate(scope.row)"
								>Test Gate</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-chat-dot-square"
								@click.native.prevent="testRunningText(scope.row)"
								>Test Running Text</el-dropdown-item
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
			v-loading="loading"
			title="GATE KELUAR"
			:close-on-click-modal="false"
			:visible.sync="showForm"
		>
			<el-form label-position="left" label-width="150px">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Shortcut Key"
					:class="formErrors.shortcut_key ? 'is-error' : ''"
				>
					<el-input
						placeholder="Shortcut Key"
						v-model="formModel.shortcut_key"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.shortcut_key">
						{{ formErrors.shortcut_key[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jenis Kendaraan"
					:class="formErrors.jenis_kendaraan ? 'is-error' : ''"
				>
					<el-select
						v-model="formModel.jenis_kendaraan"
						placeholder="Jenis Kendaraan"
						style="width: 100%"
						multiple
					>
						<el-option
							v-for="k in jenisKendaraanList"
							:value="k.nama"
							:label="k.nama"
							:key="k.id"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
						{{ formErrors.jenis_kendaraan[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Controller"
					:class="formErrors.device ? 'is-error' : ''"
				>
					<div class="flex">
						<el-input
							class="mr-2"
							placeholder="Device"
							v-model="formModel.device"
						></el-input>
						<el-input
							type="number"
							placeholder="Baudrate"
							v-model="formModel.baudrate"
						></el-input>
					</div>

					<div class="el-form-item__error" v-if="formErrors.device">
						{{ formErrors.device[0] }}
					</div>

					<div class="el-form-item__error" v-if="formErrors.baudrate">
						{{ formErrors.baudrate[0] }}
					</div>
				</el-form-item>

				<el-form-item label="Running Text">
					<div class="flex">
						<el-input
							class="mr-2"
							placeholder="Device"
							v-model="formModel.running_text_device"
						></el-input>
						<el-input
							type="number"
							placeholder="Baudrate"
							v-model="formModel.running_text_baudrate"
						></el-input>
					</div>
				</el-form-item>

				<el-form-item
					label="Perintah Buka"
					:class="formErrors.open_command ? 'is-error' : ''"
				>
					<el-input
						placeholder="Perintah Buka"
						v-model="formModel.open_command"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.open_command">
						{{ formErrors.open_command[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Perintah Tutup"
					:class="formErrors.close_command ? 'is-error' : ''"
				>
					<el-input
						placeholder="Perintah Tutup"
						v-model="formModel.close_command"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.close_command">
						{{ formErrors.close_command[0] }}
					</div>
				</el-form-item>

				<el-form-item label="Pos" :class="formErrors.pos_id ? 'is-error' : ''">
					<el-select
						v-model="formModel.pos_id"
						placeholder="Pos"
						style="width: 100%"
					>
						<el-option
							v-for="pos in posList"
							:value="pos.id"
							:label="pos.nama"
							:key="pos.id"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.pos_id">
						{{ formErrors.pos_id[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Kamera"
					:class="formErrors.kamera ? 'is-error' : ''"
				>
					<el-select
						v-model="formModel.kamera"
						placeholder="Kamera"
						style="width: 100%"
						multiple
					>
						<el-option
							v-for="kamera in kameraList"
							:value="kamera.id"
							:label="kamera.nama"
							:key="kamera.id"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.kamera">
						{{ formErrors.kamera[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Status"
					:class="formErrors.status ? 'is-error' : ''"
				>
					<el-select
						v-model="formModel.status"
						placeholder="Status"
						style="width: 100%"
					>
						<el-option
							v-for="(t, i) in ['Tidak Aktif', 'Aktif']"
							:value="i"
							:label="t"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.status">
						{{ formErrors.status[0] }}
					</div>
				</el-form-item>
			</el-form>

			<div slot="footer">
				<el-button type="info" icon="el-icon-error" @click="closeForm">
					BATAL
				</el-button>
				<el-button type="primary" icon="el-icon-success" @click="save">
					SIMPAN
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import crud from '@/mixins/crud'
import { mapState } from 'vuex'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/gateOut',
			ws: null,
		}
	},

	computed: {
		...mapState(['jenisKendaraanList', 'printerList', 'kameraList', 'posList']),
	},

	methods: {
		afterSave() {
			this.$store.dispatch('getShiftList')
		},

		testGate(gate) {
			console.log(`connecting to ${gate.pos.ip_address}:5678`)
			const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE POS GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				console.log(`connected to ${gate.pos.ip_address}:5678`)
				ws.send(
					[
						'open',
						gate.device,
						gate.baudrate,
						gate.open_command,
						gate.close_command,
					].join(';')
				)
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

		testRunningText(gate) {
			if (!gate.running_text_device || !gate.running_text_baudrate) {
				this.$message({
					message: 'RUNNING TEXT TIDAK TERPASANG',
					type: 'error',
				})
				return
			}

			console.log(`connecting to ${gate.pos.ip_address}:5678`)
			const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE POS GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				console.log(`connected to ${gate.pos.ip_address}:5678`)
				ws.send(
					[
						'rt',
						gate.running_text_device,
						gate.running_text_baudrate,
						`TEST|${gate.nama}`,
					].join(';')
				)
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
