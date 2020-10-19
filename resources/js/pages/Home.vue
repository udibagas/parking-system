<template>
	<GateOutApp />
</template>

<script>
import GateOutApp from "./GateOutApp";

export default {
	components: { GateOutApp },
	mounted() {
		this.$store.commit("getNavigationList");
	},
};
</script>
