<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item v-if="$auth.user.role == 1">
				<el-button
					size="small"
					@click="openForm({})"
					type="primary"
					icon="el-icon-plus"
					>TAMBAH GROUP</el-button
				>
			</el-form-item>

			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="searchData"
				>
				</el-input>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			height="calc(100vh - 310px)"
			v-loading="loading"
		>
			<el-table-column
				type="index"
				:index="tableData.from"
				label="#"
			></el-table-column>

			<el-table-column
				prop="nama"
				label="Nama"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="keterangan"
				label="Keterangan"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				header-align="center"
				align="center"
				v-if="$auth.user.role == 1"
			>
				<template slot="header">
					<el-button type="text" @click="refreshData" icon="el-icon-refresh">
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
							>
								Hapus</el-dropdown-item
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
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT GROUP MEMBER' : 'TAMBAH GROUP MEMBER'"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="150px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Keterangan"
					:class="formErrors.keterangan ? 'is-error' : ''"
				>
					<el-input
						placeholder="Keterangan"
						v-model="formModel.keterangan"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.keterangan">
						{{ formErrors.keterangan[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button type="primary" icon="el-icon-success" @click="save">
					SIMPAN
				</el-button>
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
			url: '/api/groupMember',
		}
	},

	methods: {
		afterSave() {
			this.$store.dispatch('getGroupMemberList')
		},
	},
}
</script>

