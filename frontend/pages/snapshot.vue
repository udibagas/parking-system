<template>
	<el-card>
		<el-row slot="header">
			<el-col :span="6">
				<el-page-header @back="$emit('back')" content="SNAPSHOTS">
				</el-page-header>
			</el-col>
			<el-col :span="18">
				<el-form inline @submit.native.prevent class="text-right">
					<el-form-item style="margin-bottom: 0">
						<el-button
							size="small"
							type="danger"
							icon="el-icon-delete"
							@click="deleteSnapshot"
							:disabled="checkedNodes.length == 0"
							>HAPUS SNAPSHOT</el-button
						>
					</el-form-item>
					<el-form-item style="margin-bottom: 0">
						<el-button
							icon="el-icon-refresh"
							type="primary"
							size="small"
							@click="refresh"
						></el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="8">
				<div
					style="
						width: 370px;
						height: calc(100vh - 220px);
						overflow: auto;
						border-right: 1px solid #eee;
					"
				>
					<el-tree
						v-if="show"
						:props="props"
						:load="loadNode"
						ref="tree"
						lazy
						show-checkbox
						highlight-current
						node-key="path"
						@node-click="({ isFile, url }) => (this.url = isFile ? url : '')"
						@check="(node, tree) => (checkedNodes = tree.checkedNodes)"
					>
					</el-tree>
				</div>
			</el-col>
			<el-col :span="16">
				<img :src="url" alt="" style="width: 100%" />
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			url: '',
			show: true,
			checkedNodes: [],
			expandedNodes: [],
			props: {
				label: 'label',
				isLeaf: 'isFile',
			},
		}
	},

	methods: {
		loadNode(node, resolve) {
			const params = {
				directory: node.data === undefined ? 'snapshots' : node.data.path,
			}
			this.$axios.$get('/api/snapshot', { params }).then((r) => resolve(r))
		},

		deleteSnapshot() {
			this.$confirm('Anda yakin?', 'Konfirmasi', { type: 'warning' })
				.then(() => {
					this.$axios
						.$post('/api/snapshot/delete', { checkedNodes: this.checkedNodes })
						.then((r) => {
							this.url = ''
							this.$message({ message: r.message, type: 'success' })
							this.checkedNodes.forEach((node) => this.$refs.tree.remove(node))
							this.checkedNodes = []
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: 'error',
							})
						})
				})
				.catch((e) => console.log(e))
		},

		refresh() {
			this.show = false
			this.$nextTick(() => (this.show = true))
		},
	},
}
</script>
