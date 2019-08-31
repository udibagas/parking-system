<template>
    <div>
        <el-page-header @back="$emit('back')" content="SETTING"> </el-page-header>
        <el-divider></el-divider>

        <el-tabs type="card">
            <el-tab-pane label="Gate">
                <ParkingGate />
            </el-tab-pane>
            <el-tab-pane label="Identitas Lokasi">
                <LocationIdentity />
            </el-tab-pane>
            <el-tab-pane label="Jenis Kendaraan">
                <VehicleType />
            </el-tab-pane>
            <el-tab-pane label="Member">
                <ParkingMember />
            </el-tab-pane>
            <el-tab-pane label="User">
                <User />
            </el-tab-pane>
            <!-- <el-tab-pane label="Notifikasi">
                <Notification />
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import ParkingGate from './ParkingGate'
import User from './User'
import LocationIdentity from './LocationIdentity'
import VehicleType from './VehicleType'
import ParkingMember from './ParkingMember'
import Notification from './Notification'

export default {
    components: { ParkingGate, User, LocationIdentity, VehicleType, ParkingMember, Notification }
}
</script>

<style lang="scss" scoped>

</style>
