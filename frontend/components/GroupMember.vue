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
				prop="name"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="description"
				label="Deskripsi"
				sortable="custom"
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
							<el-dropdown-item @click.native.prevent="openForm(scope.row)">
								<i class="el-icon-edit-outline"></i> Edit
							</el-dropdown-item>
							<el-dropdown-item
								@click.native.prevent="deleteData(scope.row.id)"
							>
								<i class="el-icon-delete"></i> Hapus
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
			:title="!!formModel.id ? 'EDIT GROUP MEMBER' : 'TAMBAH GROUP MEMBER'"
			v-loading="loading"
			width="500px"
			:close-on-click-modal="false"
		>
			<el-alert
				type="error"
				title="ERROR"
				:description="error.message + '\n' + error.file + ':' + error.line"
				v-show="error.message"
				style="margin-bottom: 15px"
			></el-alert>

			<el-form
				label-width="120px"
				label-position="left"
				@submit.native.prevent="save"
			>
				<el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.name"></el-input>
					<div class="el-form-item__error" v-if="formErrors.name">
						{{ formErrors.name[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Deskripsi"
					:class="formErrors.description ? 'is-error' : ''"
				>
					<el-input
						placeholder="Deskripsi"
						v-model="formModel.description"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.description">
						{{ formErrors.description[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button
					type="primary"
					native-type="submit"
					icon="el-icon-success"
					@click="save"
				>
					SIMPAN
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import crud from '~/mixins/crud'

export default {
	mixins: [crud],
	data() {
		return {
			url: '/api/groupMember',
		}
	},

	// TODO: reload data group member
}
</script>
