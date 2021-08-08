<template>
	<div>
		<div class="flex flex-row">
			<div class="text-lg text-blue-700 flex-grow">KELOLA USER</div>
			<el-form
				inline
				class="text-right"
				@submit.native.prevent="
					() => {
						return
					}
				"
			>
				<el-form-item>
					<el-button
						size="small"
						@click="openForm({ role: 0, password: '' })"
						type="primary"
						icon="el-icon-plus"
						>TAMBAH USER</el-button
					>
				</el-form-item>
				<el-form-item>
					<el-input
						size="small"
						v-model="keyword"
						placeholder="Cari"
						prefix-icon="el-icon-search"
						:clearable="true"
						@change="
							(v) => {
								keyword = v
								requestData()
							}
						"
					>
					</el-input>
				</el-form-item>
			</el-form>
		</div>

		<el-table
			:data="tableData"
			stripe
			height="calc(100vh - 165px)"
			v-loading="loading"
		>
			<el-table-column
				prop="name"
				label="Nama"
				sortable="custom"
			></el-table-column>
			<el-table-column prop="role" label="Level" sortable="custom">
				<template slot-scope="scope">
					{{ scope.row.role ? 'Admin' : 'Operator' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="status"
				label="Status"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					<el-tag size="mini" :type="scope.row.status ? 'success' : 'info'">{{
						scope.row.status ? 'Aktif' : 'Nonaktif'
					}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column width="40px" align="center" header-align="center">
				<template slot="header">
					<el-button
						type="text"
						class="text-white"
						@click="
							() => {
								keyword = ''
								requestData()
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

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT USER' : 'TAMBAH USER'"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="160px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.name"></el-input>
					<div class="el-form-item__error" v-if="formErrors.name">
						{{ formErrors.name[0] }}
					</div>
				</el-form-item>

				<el-form-item label="Level" :class="formErrors.role ? 'is-error' : ''">
					<el-select
						v-model="formModel.role"
						placeholder="Level"
						style="width: 100%"
					>
						<el-option
							v-for="(t, i) in [
								{ value: 0, label: 'Operator' },
								{ value: 1, label: 'Admin' },
							]"
							:value="t.value"
							:label="t.label"
							:key="i"
						>
						</el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.type">
						{{ formErrors.role[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Password"
					:class="formErrors.password ? 'is-error' : ''"
				>
					<el-input
						type="password"
						placeholder="Password"
						v-model="formModel.password"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.password">
						{{ formErrors.password[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Konfirmasi Password"
					:class="formErrors.password ? 'is-error' : ''"
				>
					<el-input
						type="password"
						placeholder="Konfirmasi Password"
						v-model="formModel.password_confirmation"
					></el-input>
				</el-form-item>

				<el-form-item
					label="Status"
					:class="formErrors.status ? 'is-error' : ''"
				>
					<el-switch
						:active-value="1"
						:inactive-value="0"
						v-model="formModel.status"
						active-color="#13ce66"
					>
					</el-switch>
					<el-tag
						:type="formModel.status ? 'success' : 'info'"
						size="small"
						style="margin-left: 10px"
						>{{ !!formModel.status ? 'Aktif' : 'Nonaktif' }}</el-tag
					>

					<div class="el-form-item__error" v-if="formErrors.status">
						{{ formErrors.status[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button
					type="primary"
					icon="el-icon-success"
					@click="() => (!!formModel.id ? update() : store())"
					>SIMPAN</el-button
				>
				<el-button type="info" icon="el-icon-error" @click="showForm = false"
					>BATAL</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/user',
		}
	},
}
</script>
