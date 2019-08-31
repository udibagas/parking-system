<template>
    <el-tabs type="card">
        <el-tab-pane label="GATE IN"><GateInApp /></el-tab-pane>
        <el-tab-pane label="GATE OUT"><GateOutApp /></el-tab-pane>
    </el-tabs>
</template>

<script>
import GateInApp from './GateInApp'
import GateOutApp from './GateOutApp'

export default {
    components: { GateInApp, GateOutApp }
}
</script>
