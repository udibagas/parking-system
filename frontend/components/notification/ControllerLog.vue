<template>
	<div class="log-container" v-html="log"></div>
</template>

<script>
export default {
	data() {
		return {
			log: '',
			requestInterval: null,
		}
	},
	methods: {
		getLog() {
			this.$axios
				.$get('/api/controller-log')
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
