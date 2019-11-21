<template>
    <div>
        <el-page-header @back="$emit('back')" content="MEMBER"> </el-page-header>
        <el-divider></el-divider>

        <el-tabs type="card">
            <el-tab-pane lazy label="Member"><ParkingMember /></el-tab-pane>
            <el-tab-pane lazy label="Group Member"><GroupMember /></el-tab-pane>
            <el-tab-pane lazy label="Pembayaran"><MemberRenewal /></el-tab-pane>
            <el-tab-pane lazy label="Laporan Pendapatan"><MembershipReport /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParkingMember from './ParkingMember'
import MemberRenewal from './MemberRenewal'
import GroupMember from './GroupMember'
import MembershipReport from './MembershipReport'

export default {
    components: { ParkingMember, MemberRenewal, GroupMember, MembershipReport }
}
</script>

<style lang="scss" scoped>

</style>
