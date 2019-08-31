<template>
    <div>
        <el-page-header @back="$emit('back')" content="MEMBER"> </el-page-header>
        <el-divider></el-divider>
        <ParkingMember />
    </div>
</template>

<script>
import ParkingMember from './ParkingMember'
export default {
    components: { ParkingMember }
}
</script>

<style lang="scss" scoped>

</style>
