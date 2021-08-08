<template>
	<div
		class="log-container bg-black text-white p-3 font-mono text-sm overflow-auto"
		v-html="log"
	></div>
</template>

<script>
export default {
	data() {
		return {
			log: "",
			requestInterval: null,
		};
	},
	methods: {
		getLog() {
			axios
				.get("controller-log")
				.then((r) => (this.log = r.data))
				.catch((e) => console.log(e));
		},
	},
	mounted() {
		this.requestInterval = setInterval(this.getLog, 2000);
	},
	destroyed() {
		clearInterval(this.requestInterval);
	},
};
</script>

<style lang="scss" scoped>
.log-container {
	height: calc(100vh - 155px);
}
</style>
