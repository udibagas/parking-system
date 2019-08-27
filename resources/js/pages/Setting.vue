<template>
    <div>
        <el-page-header @back="$emit('back')" content="SETTING"> </el-page-header>
        <el-divider></el-divider>

        <el-tabs type="card">
            <el-tab-pane label="Gates">
                <ParkingGate />
            </el-tab-pane>
            <el-tab-pane label="Location Identity">
                <LocationIdentity />
            </el-tab-pane>
            <el-tab-pane label="Vehicle Type">
                <VehicleType />
            </el-tab-pane>
            <el-tab-pane label="Parking Member">
                <ParkingMember />
            </el-tab-pane>
            <el-tab-pane label="User">
                <User />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParkingGate from './ParkingGate'
import User from './User'
import LocationIdentity from './LocationIdentity'
import VehicleType from './VehicleType'
import ParkingMember from './ParkingMember'

export default {
    components: { ParkingGate, User, LocationIdentity, VehicleType, ParkingMember }
}
</script>

<style lang="scss" scoped>

</style>
