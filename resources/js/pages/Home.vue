<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="14">
                <el-card style="height:calc(100vh - 105px);position:relative;">
                    <el-row :gutter="15" style="margin-bottom:15px;">
                        <el-col :span="10">
                            <div class="label-big">[-] NO. POLISI</div>
                        </el-col>
                        <el-col :span="14">
                            <input id="plate-number" @blur="checkPlate" type="text" placeholder="NO. POLISI" v-model="formModel.plate_number" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="15" style="margin-bottom:15px;">
                        <el-col :span="10">
                            <div class="label-big">[+] NO. TIKET</div>
                        </el-col>
                        <el-col :span="14">
                            <input id="ticket-number" type="text" maxlength="5" placeholder="NO. TIKET" v-model="formModel.barcode_number" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="15" style="margin-bottom:15px;">
                        <el-col :span="10">
                            <div class="label-big">[*] JENIS KENDARAAN</div>
                        </el-col>
                        <el-col :span="14">
                            <input id="vehicle-type" type="text" placeholder="JENIS KENDARAAN" v-model="formModel.vehicle_type" class="my-input">
                            <div style="padding:3px 10px;font-weight:bold;" class="bg-yellow">
                                {{$store.state.vehicleTypeList.map(vt => vt.shortcut_key + ' = ' + vt.name).join(', ')}}
                            </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="15" style="margin-bottom:15px;">
                        <el-col :span="10">
                            <div class="label-big">TARIF</div>
                        </el-col>
                        <el-col :span="14">
                            <input disabled type="number" v-model="formModel.fare" class="my-input tarif-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="15">
                        <el-col :span="8">
                            <div class="label">[/] IN</div>
                            <input id="time-in" v-mask="'##:##:##'" :disabled="formModel.barcode_number.toLowerCase() != 'xxxxx'" type="text" placeholder="00:00:00" v-model="formModel.time_in" class="my-input text-center">
                        </el-col>
                        <el-col :span="8">
                            <div class="label">OUT</div>
                            <input disabled type="text" placeholder="00:00:00" v-model="formModel.time_out" class="my-input text-center">
                        </el-col>
                        <el-col :span="8">
                            <div class="label">DURASI</div>
                            <input disabled type="text" placeholder="00:00:00" v-model="formModel.duration" class="my-input text-center">
                        </el-col>
                    </el-row>

                    <el-divider></el-divider>
                    <button class="my-big-btn" @click="submit">[ENTER] PRINT TIKET & BUKA GATE</button>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card style="height:calc(100vh - 105px)">
                    <el-divider>SNAPSHOT IN</el-divider>
                    <div class="block">
                        <el-image src="" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <el-divider>SNAPSHOT OUT</el-divider>
                    <div class="block">
                        <el-image src="" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showTicketLostForm: false,
            formModel: { barcode_number: '' },
            formErrors: {},
        }
    },
    watch: {
        'formModel.barcode_number'(v, o) {
            if (v.length == 5) {
                this.formModel.time_out = moment().format('HH:mm:ss');

                if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                    // todo : ticket hilang
                } else {
                    let params = { barcode_number: v }
                    axios.get('/parkingTransaction/search', { params: params }).then(r => {
                        this.formModel.id = r.data.id
                        this.formModel.time_in = moment(r.data.time_in).format('HH:mm:ss')
                        this.$forceUpdate()
                    }).catch(e => {
                        this.$message({
                            message: 'NOMOR TIKET INVALID!',
                            type: 'error',
                            showClose: true,
                        })
                    })
                }

                document.getElementById('ticket-number').blur()
                document.getElementById('vehicle-type').focus()
            }
        },
        'formModel.vehicle_type'(v, o) {
            let vehicle = this.$store.state.vehicleTypeList.find(vt => vt.shortcut_key == v)
            if (vehicle) {
                document.getElementById('vehicle-type').blur()
                this.formModel.vehicle_type = vehicle.name

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
            }
        },
        'formModel.time_in'(v, o) {
            // this.formModel.duration = moment()
        }
    },
    methods: {
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
                this.formModel.fare = '';
                this.formModel.is_member = 0;
                this.formModel.parking_member_id = null;
                this.$forceUpdate();
            })
        },
        submit() {
            // if (!this.formModel.barcode_number || !this.formModel.plate_number || !this.vehicle_type || !this.formModel.time_in) {
            //     return
            // }

            if (this.formModel.barcode_number.length !== 5) {
                this.$message({
                    message: 'NOMOR TIKET INVALID!',
                    type: 'error',
                    showClose: true,
                })
                return
            }

            if (!!this.formModel.id) {
                this.update()
            } else {
                this.store()
            }
        },
        store() {
            let data = JSON.parse(JSON.stringify(this.formModel))
            data.time_out = moment().format('YYYY-MM-DD') + ' ' + this.formModel.time_out

            axios.post('/parkingTransaction', data).then(r => {
                this.printTicket(r.data, 'OUT')
            }).catch(e => {
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: true
                })
            })
        },
        update() {
            let data = JSON.parse(JSON.stringify(this.formModel))
            data.time_out = moment().format('YYYY-MM-DD') + ' ' + this.formModel.time_out
            delete data.time_in

            axios.put('/parkingTransaction/' + data.id, data).then(r => {
                this.printTicket(r.data.id, 'OUT')
            }).catch(e => {
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: true
                })
            })
        },
        printTicket(id, trx) {
            axios.post('/parkingTransaction/printTicket/' + id, { trx: trx }).then(r => {
                console.log(r.data)
            }).catch(e => {
                this.$message({
                    message: 'GAGAL MENCETAK STRUK',
                    type: 'error',
                    showClose: true
                })
            }).finally(() => {
                setTimeout(this.openGate, 3000);
            })
        },
        openGate() {
            axios.post('/parkingTransaction/openGate').then(r => {
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
            })
        },
        manualOpen() {
            this.$confirm(
                'Anda yakin akan membuka gate manual?',
                'Warning',
                { type: 'warning' }
            ).then(() => {
                alert('ok')
            }).catch(e => console.log(e))
        },
    },
    mounted() {
        this.$store.commit('getVehicleTypeList')
        document.getElementById('plate-number').focus()

        document.onkeypress = (e) => {
            // console.log(e.key)
            if (e.key == 'Enter') {
                this.submit()
            }

            if (e.key == '-') {
                e.preventDefault()
                this.formModel = { barcode_number: '' }
                document.getElementById('plate-number').focus()
            }

            if (e.key == '+') {
                e.preventDefault()
                this.formModel.barcode_number = ''
                this.formModel.vehicle_type = ''
                this.formModel.fare = ''
                this.formModel.time_out = ''
                document.getElementById('ticket-number').focus()
            }

            if (e.key == '*') {
                e.preventDefault()
                this.formModel.vehicle_type = ''
                this.formModel.fare = ''
                document.getElementById('vehicle-type').focus()
            }

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
    height: calc(50vh - 120px);
}

.my-input {
    border: 2px solid #160047;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    display: block;
    width: 100%;
    padding: 0px 15px;
    box-sizing: border-box;
}

.label-big {
    box-sizing: border-box;
    background-color: #160047;
    color: #fff;
    padding-left: 15px;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
}

.tarif-input {
    background: rgb(199, 24, 24);
    color: #fff;
}

.my-big-btn {
    box-sizing: border-box;
    width: 100%;
    border: none;
    font-size: 30px;
    height: 60px;
    line-height: 60px;
    background-color: #254ec1;
    color: #fff;
    border-radius: 4px;
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
