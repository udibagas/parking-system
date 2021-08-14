<template>
	<div>
		<div class="text-right">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH KAMERA</el-button
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
			title="KAMERA"
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
					label="URL Snapshot"
					:class="formErrors.snapshot_url ? 'is-error' : ''"
				>
					<el-input
						placeholder="URL Snapshot"
						v-model="formModel.snapshot_url"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.snapshot_url">
						{{ formErrors.snapshot_url[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Username"
					:class="formErrors.username ? 'is-error' : ''"
				>
					<el-input
						placeholder="Username"
						v-model="formModel.username"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.username">
						{{ formErrors.username[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Password"
					:class="formErrors.password ? 'is-error' : ''"
				>
					<el-input
						placeholder="Password"
						v-model="formModel.password"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.password">
						{{ formErrors.password[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Otentifikasi"
					:class="formErrors.auth_type ? 'is-error' : ''"
				>
					<el-select
						v-model="formModel.auth_type"
						placeholder="Otentifikasi"
						style="width: 100%"
					>
						<el-option
							v-for="(t, i) in ['basic', 'digest']"
							:value="t"
							:label="t"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.auth_type">
						{{ formErrors.auth_type[0] }}
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
				<el-button icon="el-icon-error" @click="closeForm"> BATAL </el-button>
				<el-button type="primary" icon="el-icon-success" @click="save">
					SIMPAN
				</el-button>
			</div>
		</el-dialog>

		<el-dialog title="SNAPSHOT KAMERA" center :visible.sync="showSnapshot">
			<img :src="snapshot" alt="" style="width: 100%" />
		</el-dialog>
	</div>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/kamera',
			showSnapshot: false,
			snapshot: null,
		}
	},
	methods: {
		afterSave() {
			this.$store.dispatch('getKameraList')
		},

		testKamera(id) {
			this.$axios
				.$get(`/kamera/test/${id}`)
				.then((response) => {
					this.snapshot = 'data:image/jpeg;base64,' + response.snapshot
					this.showSnapshot = true
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
		},
	},
}
</script>
