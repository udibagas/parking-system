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

		<el-dialog
			v-loading="loading"
			title="POS"
			:close-on-click-modal="false"
			:visible.sync="show"
			:before-close="
				(done) => {
					closeForm()
					done()
				}
			"
		>
			<el-form label-position="left" label-width="150px">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Alamat IP"
					:class="formErrors.ip_address ? 'is-error' : ''"
				>
					<el-input
						placeholder="Alamat IP"
						v-model="formModel.ip_address"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.ip_address">
						{{ formErrors.ip_address[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Printer"
					:class="formErrors.printer_id ? 'is-error' : ''"
				>
					<el-select
						v-model="formModel.printer_id"
						placeholder="Printer"
						style="width: 100%"
					>
						<el-option
							v-for="printer in printerList"
							:value="printer.id"
							:label="printer.nama"
							:key="printer.id"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.printer_id">
						{{ formErrors.printer_id[0] }}
					</div>
				</el-form-item>
			</el-form>

			<div slot="footer">
				<el-button icon="el-icon-error" @click="closeForm"> BATAL </el-button>
				<el-button type="primary" icon="el-icon-success" @click="save">
					SIMPAN
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],
	data() {
		return {
			url: '/api/pos',
		}
	},
}
</script>
