<template>
    <div id="gate-out-app">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-card style="height:calc(100vh - 105px)">
                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">GATE IN</div>
                        </el-col>
                        <el-col :span="14">
                            <select :disabled="formModel.barcode_number.toLowerCase() != 'xxxxx'" v-model="formModel.gate_in_id" id="gate-in" class="my-input">
                                <option v-for="g in parkingGateList" :value="g.id" :key="g.id">{{g.name}}</option>
                            </select>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">GATE OUT</div>
                        </el-col>
                        <el-col :span="14">
                            <select v-model="formModel.gate_out_id" id="gate-out" class="my-input">
                                <option v-for="g in parkingGateList.filter(g => g.type == 'OUT')" :value="g.id" :key="g.id">{{g.name}}</option>
                            </select>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">[-] NO. PLAT</div>
                        </el-col>
                        <el-col :span="14">
                            <input id="plate-number" autocomplete="off" @keyup.enter="checkPlate" type="text" placeholder="NO. PLAT" v-model="formModel.plate_number" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">[+] NO. TIKET/KARTU</div>
                        </el-col>
                        <el-col :span="14">
                            <input id="ticket-number" maxlength="5" autocomplete="off" @keyup.enter="checkTicket" type="text" placeholder="NO. TIKET" v-model="formModel.barcode_number" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">[*] JENIS KENDARAAN</div>
                        </el-col>
                        <el-col :span="14">
                            <select @keyup.enter="submit" placeholder="JENIS KENDARAAN" @change="setFare" v-model="formModel.vehicle_type" id="vehicle-type" class="my-input">
                                <option v-for="g in vehicleTypeList" :value="g.name" :key="g.id">{{g.shortcut_key}} - {{g.name}}</option>
                            </select>
                            <!-- <input id="vehicle-type" type="text" placeholder="JENIS KENDARAAN" v-model="formModel.vehicle_type" class="my-input"> -->
                            <!-- <div style="padding:3px 10px;font-weight:bold;" class="bg-yellow">
                                {{vehicleTypeList.map(vt => vt.shortcut_key + ' = ' + vt.name).join(', ')}}
                            </div> -->
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">TARIF</div>
                        </el-col>
                        <el-col :span="14">
                            <input disabled v-model="formModel.fare" class="my-input tarif-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :span="8">
                            <div class="label">[/] IN</div>
                            <input @keyup.enter="submit" @change="setDuration" id="time-in" v-mask="'####-##-## ##:##:##'" :disabled="formModel.barcode_number.toLowerCase() != 'xxxxx'" v-model="formModel.time_in" class="my-input-time text-center">
                        </el-col>
                        <el-col :span="8">
                            <div class="label">OUT</div>
                            <input disabled v-model="formModel.time_out" class="my-input-time text-center">
                        </el-col>
                        <el-col :span="8">
                            <div class="label">DURASI</div>
                            <input disabled v-model="formModel.duration" class="my-input-time text-center">
                        </el-col>
                    </el-row>

                    <button class="my-big-btn" @click="submit">[ENTER] PRINT TIKET & BUKA GATE</button>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card style="height:calc(100vh - 105px)">
                    <div class="block">
                        <el-image :src="snapshot_in" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="el-image__error">
                                <h1>SNAPSHOT IN</h1>
                            </div>
                        </el-image>
                    </div>
                    <div class="block">
                        <el-image :src="snapshot_out" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="el-image__error">
                                <h1>SNAPSHOT OUT</h1>
                            </div>
                        </el-image>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import GateInApp from './GateInApp'

export default {
    components: { GateInApp },
    data() {
        return {
            showTicketLostForm: false,
            formModel: { barcode_number: '' },
            formErrors: {},
            snapshot_in: null,
            snapshot_out: null,
            location: null,
            parkingGateList: [],
            vehicleTypeList: []
        }
    },
    methods: {
        setDuration() {
            var date1 = moment(this.formModel.time_in)
            var date2 = moment(this.formModel.time_out);
            var duration = moment.duration(date2.diff(date1));
            this.formModel.duration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
            console.log(this.formModel.duration)
            this.$forceUpdate()
        },
        checkTicket() {
            let now = moment().format('YYYY-MM-DD HH:mm:ss')

            if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                this.formModel.time_out = now;
                document.getElementById('vehicle-type').focus()
            } else {
                let params = { barcode_number: this.formModel.barcode_number }
                axios.get('/parkingTransaction/search', { params: params }).then(r => {
                    this.snapshot_in = r.data.snapshot_in
                    this.formModel.id = r.data.id
                    this.formModel.time_out = now
                    this.formModel.gate_in_id = r.data.gate_in_id
                    this.formModel.time_in = r.data.time_in
                    this.setDuration()
                    this.$forceUpdate()
                    this.takeSnapshot(r.data.id)
                    document.getElementById('vehicle-type').focus()
                }).catch(e => {
                    this.$message({
                        message: 'NOMOR TIKET INVALID!',
                        type: 'error',
                        showClose: true,
                    })
                })
            }
        },
        // checkCard() {
        //     if (!this.formModel.gate_out_id) {
        //         this.$message({
        //             message: 'MOHON PILIH GATE OUT',
        //             type: 'error',
        //             showClose: true,
        //         })
        //         return
        //     }

        //     let now = moment().format('YYYY-MM-DD HH:mm:ss')
        //     let params = { card_number: this.formModel.card_number, gate_in_id: this.formModel.gate_out_id }
        //     axios.get('/parkingTransaction/search', { params: params }).then(r => {
        //         this.formModel.id = r.data.id
        //         this.formModel.gate_in_id = r.data.gate_in_id
        //         this.formModel.barcode_number = r.data.barcode_number
        //         this.formModel.vehicle_type = r.data.vehicle_type
        //         this.formModel.time_in = r.data.time_in
        //         this.formModel.time_out = now
        //         this.formModel.fare = 0
        //         this.snapshot_in = r.data.snapshot_in
        //         this.setDuration()
        //         this.$forceUpdate()
        //         this.takeSnapshot(r.data.id)
        //         // langsung update & buka gate. gak perlu print tiket
        //         setTimeout(() => {
        //             this.update()
        //             this.openGate()
        //         }, 1000)
        //         document.getElementById('vehicle-type').focus()
        //     }).catch(e => {
        //         this.$message({
        //             message: e.response.data.message,
        //             type: 'error',
        //             showClose: true,
        //         })
        //     })
        // },
        checkPlate(e) {
            if (!this.formModel.plate_number) {
                return
            }

            let params = { plate_number: this.formModel.plate_number }
            axios.get('/parkingMember/search', { params: params }).then(r => {
                this.formModel.fare = 0;
                this.formModel.is_member = 1;
                this.formModel.parking_member_id = r.data.id;
                this.$forceUpdate();
            }).catch(e => {
                this.formModel.is_member = 0;
                this.formModel.parking_member_id = null;
                this.$forceUpdate();
            })

            document.getElementById('ticket-number').focus()
        },
        setFare() {
            let vehicle = this.vehicleTypeList.find(vt => vt.name == this.formModel.vehicle_type)
            if (vehicle) {
                document.getElementById('vehicle-type').blur()

                if (!this.formModel.is_member)
                {
                    this.formModel.fare = vehicle.tarif_flat
                    if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                        this.formModel.fare += vehicle.denda_tiket_hilang
                    }
                }

                if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                    document.getElementById('time-in').focus()
                }

                this.$forceUpdate()
            }
        },
        resetForm() {
            let default_vehicle = this.vehicleTypeList.find(v => v.is_default == 1)
            this.formModel.gate_in_id = null
            this.formModel.plate_number = this.location.default_plate_number
            this.formModel.barcode_number = ''
            this.formModel.card_number = ''
            this.formModel.time_out = ''
            this.formModel.time_in = ''
            this.formModel.duration = ''
            this.snapshot_in = ''
            this.snapshot_out = ''

            if (default_vehicle) {
                this.formModel.vehicle_type = default_vehicle.name
                this.formModel.fare = default_vehicle.tarif_flat
            } else {
                this.formModel.vehicle_type = ''
                this.formModel.fare = ''
            }

            document.getElementById('plate-number').focus()
        },
        submit() {
            // kalau tiket hilang harus isi time in dulu
            if (this.formModel.barcode_number.toLowerCase() == 'xxxxx' && !this.formModel.time_in) {
                document.getElementById('time-in').focus()
                return
            }

            if (!this.formModel.gate_in_id) {
                this.$message({
                    message: 'MOHON ISI GATE IN',
                    type: 'error',
                    showClose: true,
                })
                return
            }

            if (!this.formModel.barcode_number
            || !this.formModel.gate_out_id
            || !this.formModel.plate_number
            || !this.formModel.vehicle_type
            || !this.formModel.time_out
            || !this.formModel.time_in) {
                return
            }

            if (!!this.formModel.id) {
                this.update()
            } else {
                this.store()
            }
        },
        store() {
            axios.post('/parkingTransaction', this.formModel).then(r => {
                this.takeSnapshot(r.data.id)
                this.printTicket(r.data.id)
            }).catch(e => {
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: true
                })
            })
        },
        update() {
            axios.put('/parkingTransaction/' + this.formModel.id, this.formModel).then(r => {
                // print tiket hanya untuk non member
                if (r.data.is_member == 0) {
                    this.printTicket(r.data.id)
                }
                this.$forceUpdate()
            }).catch(e => {
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: truetrx
                })
            })
        },
        takeSnapshot(id) {
            axios.post('/parkingTransaction/takeSnapshot/' + id, { gate_out_id: this.formModel.gate_out_id }).then(r => {
                this.snapshot_out = r.data.snapshot_out
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: true
                })
            })
        },
        printTicket(id) {
            axios.post('/parkingTransaction/printTicket/' + id, { trx: 'OUT' }).then(r => {
                this.$message({
                    message: r.data.message,
                    type: 'success',
                    showClose: true
                })
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: true
                })
            }).finally(() => {
                setTimeout(this.openGate, 3000);
            })
        },
        openGate() {
            axios.post('/parkingGate/openGate/' + this.formModel.gate_out_id).then(r => {
                this.$message({
                    message: r.data.message,
                    type: 'success',
                    showClose: true
                })
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: true
                })
            }).finally(() => {
                this.resetForm()
            })
        },
        getLocationIdentity() {
            axios.get('/locationIdentity/search', {params: {active: 1}}).then(r => {
                this.location = r.data
                this.formModel.plate_number = r.data.default_plate_number
            }).catch(e => {
                this.$message({
                    message: 'PLEASE SET LOCATION',
                    type: 'error',
                    showClose: true
                })
            })
        },
        getParkingGateList() {
            axios.get('/parkingGate/getList').then(r => {
                this.parkingGateList = r.data

                if (r.data.filter(g => g.type == 'IN').length == 0) {
                    this.$message({
                        message: 'PLEASE SET GATE IN',
                        type: 'error',
                        showClose: true
                    })
                    return
                }

                if (r.data.filter(g => g.type == 'OUT').length == 0) {
                    this.$message({
                        message: 'PLEASE SET GATE OUT',
                        type: 'error',
                        showClose: true
                    })
                    return
                }
            }).catch(e => {
                this.$message({
                    message: 'PLEASE SET GATE',
                    type: 'error',
                    showClose: true
                })
            })
        },
        getVehicleTypeList() {
            axios.get('/vehicleType/getList').then(r => {
                if (r.data.length == 0) {
                    this.$message({
                        message: 'PLEASE SET VEHICLE TYPE',
                        type: 'error',
                        showClose: true
                    })
                    return
                }

                this.vehicleTypeList = r.data
                let default_vehicle = r.data.find(v => v.is_default == 1)

                if (default_vehicle) {
                    this.formModel.vehicle_type = default_vehicle.name
                    this.formModel.fare = default_vehicle.tarif_flat
                    this.$forceUpdate()
                } else {
                    this.$message({
                        message: 'PLEASE SET DEFAULT VEHICLE TYPE',
                        type: 'error',
                        showClose: true
                    })
                }
            }).catch(e => {
                this.$message({
                    message: 'PLEASE SET VEHICLE TYPE',
                    type: 'error',
                    showClose: true
                })
            })
        },
    },
    mounted() {
        this.getLocationIdentity()
        this.getParkingGateList()
        this.getVehicleTypeList()
        document.getElementById('plate-number').focus()

        document.getElementById('gate-out-app').onkeypress = (e) => {
            // console.log(e.key)
            // if (e.key == 'Enter') {
            //     this.submit()
            // }

            // ke field nomor plat
            if (e.key == '-') {
                e.preventDefault()
                this.resetForm()
                this.$forceUpdate()
                document.getElementById('plate-number').focus()
            }

            // ke field nomor tiket
            if (e.key == '+') {
                e.preventDefault()
                let default_vehicle = this.vehicleTypeList.find(v => v.is_default == 1)
                this.formModel.barcode_number = ''
                this.formModel.time_out = ''

                if (default_vehicle) {
                    this.formModel.vehicle_type = default_vehicle.name
                    this.formModel.fare = default_vehicle.tarif_flat
                } else {
                    this.formModel.vehicle_type = ''
                    this.formModel.fare = ''
                }

                document.getElementById('ticket-number').focus()
            }

            // ke field jenis kendaraan
            if (e.key == '*') {
                e.preventDefault()
                this.formModel.vehicle_type = ''
                this.formModel.fare = ''
                document.getElementById('vehicle-type').focus()
            }

            // ke field time in
            if (e.key == '/') {
                e.preventDefault()
                this.formModel.time_in = ''
                document.getElementById('time-in').focus()
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.block {
    background-color: #eee;
    height: calc(50vh - 73px);
}

.my-input {
    border: 2px solid #160047;
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    display: block;
    width: 100%;
    padding: 0px 15px;
    box-sizing: border-box;
}

.my-input:focus, .my-input-time:focus {
    background: rgb(255, 246, 122);
}

.my-input-time {
    border: 2px solid #160047;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    display: block;
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
}

.label-big {
    box-sizing: border-box;
    background-color: #160047;
    color: #fff;
    padding-left: 15px;
    font-size: 20px;
    height: 45px;
    line-height: 45px;
}

.tarif-input {
    background: rgb(199, 24, 24);
    color: #fff;
}

.my-big-btn {
    box-sizing: border-box;
    width: 100%;
    border: none;
    font-size: 20px;
    height: 45px;
    line-height: 45px;
    background-color: #254ec1;
    color: #fff;
    border-radius: 4px;
    margin-top: 10px;
}

.label {
    box-sizing: border-box;
    background-color: #160047;
    color: #fff;
    text-align: center;
    padding: 10px;
}

.text-center {
    text-align: center;
}
</style>
