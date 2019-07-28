<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="summary-container bg-cyan">

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="summary-container bg-pink">
                    <h1 class="summary-info">Rp 200.000.000,-</h1>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="summary-container bg-teal">

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="summary-container bg-orange">

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
.summary-container {
    height: 150px;
    text-align: center;
}

.summary-info {
    font-size: 30px;
}
</style>
