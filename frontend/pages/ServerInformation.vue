<template>
<div>
    <el-page-header @back="$emit('back')" content="SERVER INFORMATION"> </el-page-header>
    <el-divider></el-divider>
    <el-row :gutter="15">
        <el-col :span="12">
            <el-card style="height:320px">
                <div slot="header" class="clearfix">
                    <span>Disk Space</span>
                </div>
                <table v-if="diskSpace">
                    <tbody>
                        <tr v-for="(d, i) in diskSpace" :key="i">
                            <td>{{d}}</td>
                        </tr>
                    </tbody>
                </table>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card style="height:320px">
                <div slot="header" class="clearfix">
                    <span>Memory Usage</span>
                </div>
                <table v-if="memoryUsage">
                    <tbody>
                        <tr v-for="(d, i) in memoryUsage" :key="i">
                            <td>{{d}}</td>
                        </tr>
                    </tbody>
                </table>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            diskSpace: [],
            memoryUsage: []
        }
    },
    methods: {
        getDiskSpace() {
            let params = { cmd: 'df -h' }
            axios.get('/serverInformation', { params: params }).then(r => {
                this.diskSpace = r.data.split('\n')
            });
        },
        getMemoryUsage() {
            let params = { cmd: 'free -m' }
            axios.get('/serverInformation', { params: params }).then(r => {
                this.memoryUsage = r.data.split('\n')
            });
        }
    },
    mounted() {
        this.getDiskSpace()
        this.getMemoryUsage()
    }
}
</script>

<style lang="scss" scoped>

</style>
