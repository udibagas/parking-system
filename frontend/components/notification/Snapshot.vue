<template>
	<div>
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
					plain
					size="small"
					@click="refresh"
				></el-button>
			</el-form-item>
		</el-form>

		<div style="display: flex">
			<div class="file-browser">
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

			<div class="img-container">
				<img :src="url" alt="" style="width: 100%" />
			</div>
		</div>
	</div>
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
			this.$axios
				.$get('/api/snapshot', { params })
				.then((response) => resolve(response))
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

<style scoped>
.file-browser {
	padding: 15px;
	border: 1px solid #ddd;
	width: 400px;
	height: calc(100vh - 270px);
	overflow: auto;
	flex-shrink: 0;
}

.img-container {
	flex-grow: 1;
	padding: 15px;
}
</style>
