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
            <el-tab-pane label="Group Member">
                <GroupMember />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParkingGate from './ParkingGate'
import LocationIdentity from './LocationIdentity'
import VehicleType from './VehicleType'
import GroupMember from './GroupMember'

export default {
    components: { ParkingGate, LocationIdentity, VehicleType, GroupMember }
}
</script>
