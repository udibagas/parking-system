<template>
	<el-card>
		<el-page-header slot="header" @back="$emit('back')" content="SNAPSHOT">
		</el-page-header>
		<el-form inline @submit.native.prevent class="text-right">
			<el-form-item class="mb-0">
				<el-button
					size="small"
					type="danger"
					icon="el-icon-delete"
					@click="deleteSnapshot"
					:disabled="checkedNodes.length == 0"
					>HAPUS SNAPSHOT</el-button
				>
			</el-form-item>
			<el-form-item class="mb-0">
				<el-button
					icon="el-icon-refresh"
					type="primary"
					size="small"
					@click="refresh"
				></el-button>
			</el-form-item>
		</el-form>

		<div class="flex">
			<div
				class="p-3 border"
				style="width: 400px; height: calc(100vh - 290px); overflow: auto"
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

			<div
				class="
					p-3
					flex-grow flex
					align-items-center
					justify-content-center
					flex-column
				"
			>
				<img :src="url" alt="" style="max-width: 800px" />
			</div>
		</div>
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
			this.$axios.$get('/api/snapshot', { params }).then((r) => resolve(r.data))
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
