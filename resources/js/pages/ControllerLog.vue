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
            axios.get('controller-log').then(r => this.log = r.data)
                .catch(e => console.log(e))
        }
    },
    mounted() {
        this.requestInterval = setInterval(this.getLog, 2000)
    },
    destroyed() {
        clearInterval(this.requestInterval)
    }
}
</script>

<style lang="scss" scoped>
.log-container {
    font-family: monospace;
    background-color: #000;
    color: #fff;
    height: calc(100vh - 240px);
    overflow: auto;
    padding: 15px;
}
</style>
