<template>
	<div>
		<!-- TODO: kasih filter -->
		<el-input autofocus placeholder="Cari log" v-model="keyword"></el-input>
		<div class="log-container" v-html="log"></div>
	</div>
</template>

<script>
export default {
	props: ['url'],
	data() {
		return {
			log: '',
			requestInterval: null,
			keyword: '',
		}
	},
	methods: {
		getLog() {
			const params = { keyword: this.keyword }

			this.$axios
				.$get(this.url, { params })
				.then((response) => (this.log = response))
				.catch((e) => console.log(e))
		},
	},
	mounted() {
		this.requestInterval = setInterval(this.getLog, 2000)
	},
	destroyed() {
		clearInterval(this.requestInterval)
	},
}
</script>

<style lang="scss" scoped>
.log-container {
	height: calc(100vh - 230px);
	background: black;
	color: white;
	padding: 15px;
	font-family: monospace;
	font-size: 0.9em;
	overflow: auto;
}
</style>
