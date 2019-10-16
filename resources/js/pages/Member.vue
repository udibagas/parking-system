<template>
    <div>
        <el-page-header @back="$emit('back')" content="MEMBER"> </el-page-header>
        <el-divider></el-divider>

        <el-tabs type="card">
            <el-tab-pane lazy label="MEMBER"><ParkingMember /></el-tab-pane>
            <el-tab-pane lazy label="PEMBAYARAN"><MemberRenewal /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParkingMember from './ParkingMember'
import MemberRenewal from './MemberRenewal'

export default {
    components: { ParkingMember, MemberRenewal }
}
</script>

<style lang="scss" scoped>

</style>
