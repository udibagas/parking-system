<template>
    <div id="gate-out-app">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-card style="height:calc(100vh - 105px)">
                    <el-row v-if="parkingGateList.filter(g => g.type == 'OUT').length > 1" :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">GATE OUT</div>
                        </el-col>
                        <el-col :span="14">
                            <select v-model="formModel.gate_out_id" id="gate-out" class="my-input">
                                <option v-for="g in parkingGateList.filter(g => g.type == 'OUT')" :value="g.id" :key="g.id">{{g.name}}</option>
                            </select>
                        </el-col>
                    </el-row>

                    <el-row v-if="!setting.disable_plat_nomor" :gutter="10" style="margin-bottom:10px;">
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
                            <input id="ticket-number" autocomplete="off" @keyup.enter="checkTicket" type="text" placeholder="NO. TIKET/KARTU" v-model="formModel.barcode_number" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">[*] JENIS KENDARAAN</div>
                        </el-col>
                        <el-col :span="14">
                            <select @change="setFare" v-model="formModel.vehicle_type" id="vehicle-type" class="my-input">
                                <option v-for="g in vehicleTypeList" :value="g.name" :key="g.id">{{g.shortcut_key}} - {{g.name}}</option>
                            </select>
                            <!-- <div style="padding:3px 10px;font-weight:bold;" class="bg-yellow">
                                {{vehicleTypeList.map(vt => vt.shortcut_key + ' = ' + vt.name).join(', ')}}
                            </div> -->
                        </el-col>
                    </el-row>

                    <el-row v-show="formModel.barcode_number == 'xxxxx'" :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">[*] JAM MASUK</div>
                        </el-col>
                        <el-col :span="14">
                            <input @keyup.enter="toGateIn" @change="setDuration" id="time-in" v-mask="'####-##-## ##:##'" v-model="formModel.time_in" class="my-input">
                        </el-col>
                    </el-row>

                    <el-row v-show="formModel.barcode_number == 'xxxxx'" v-if="parkingGateList.filter(g => g.type == 'IN').length > 1" :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">GATE IN</div>
                        </el-col>
                        <el-col :span="14">
                            <select @change="toSubmit" v-model="formModel.gate_in_id" id="gate-in" class="my-input">
                                <option v-for="g in parkingGateList.filter(g => g.type == 'IN')" :value="g.id" :key="g.id">{{g.shortcut_key}} - {{g.name}}</option>
                            </select>
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

                    <el-row v-if="formModel.barcode_number == 'xxxxx'" :gutter="10" style="margin-bottom:10px;">
                        <el-col :span="10">
                            <div class="label-big">TARIF + DENDA</div>
                        </el-col>
                        <el-col :span="14">
                            <input disabled v-model="totalBayar" class="my-input tarif-input">
                        </el-col>
                    </el-row>

                    <!-- <el-row :gutter="10">
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
                    </el-row> -->

                    <button id="submit-btn" @keyup.right="nextBtn" @keyup.down="nextBtn" @keydown.enter="submit(false)" class="my-big-btn" @click="submit(false)">BUKA GATE</button>
                    <button id="submit-btn1" @keyup.left="prevBtn" @keyup.up="prevBtn" @keydown.enter="printLastTrx" class="my-big-btn" @click="printLastTrx">[F12] PRINT STRUK TRANSAKSI TERAKHIR</button>

                    <el-row :gutter="10">
                        <el-col :span="12">
                            <button @keydown.enter="printReport" class="my-big-btn" @click="printReport">[F10] PRINT LAPORAN</button>
                        </el-col>
                        <el-col :span="12">
                            <button @keydown.enter="() => { showManualOpenForm = true; formModelManualOpen = {} }" class="my-big-btn" @click="() => { showManualOpenForm = true; formModelManualOpen = {} }">[F11] BUKA GATE MANUAL</button>
                        </el-col>
                    </el-row>


                    <!-- <el-row :gutter="10">
                        <el-col :span="12">
                            <button id="submit-btn" @keyup.right="nextBtn" @keydown.enter="submit(false)" class="my-big-btn" @click="submit(false)">BUKA GATE TANPA PRINT TIKET</button>
                        </el-col>
                        <el-col :span="12">
                            <button id="submit-btn1" @keyup.left="prevBtn" @keydown.enter="submit(true)" class="my-big-btn" @click="submit(true)">PRINT TIKET & BUKA GATE</button>
                        </el-col>
                    </el-row> -->
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

        <el-dialog title="FORM BUKA MANUAL" center :visible.sync="showManualOpenForm">
            <el-form label-position="left" label-width="200px">
                <el-form-item label="Alasan buka manual" :class="formErrors.alasan ? 'is-error' : ''">
                    <el-input autofocus type="textarea" v-model="formModelManualOpen.alasan" rows="3" placeholder="Alasan buka manual"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.alasan">{{formErrors.alasan[0]}}</div>
                </el-form-item>
                <!-- <el-form-item label="Masukkan password Anda" :class="formErrors.password ? 'is-error' : ''">
                    <el-input type="password" v-model="formModelManualOpen.password" placeholder="Password"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.password">{{formErrors.password[0]}}</div>
                </el-form-item> -->
            </el-form>
            <div slot="footer">
                <el-button icon="el-icon-success" type="primary" @click="manualOpen">SIMPAN</el-button>
                <el-button icon="el-icon-error" type="info" @click="showManualOpenForm = false">BATAL</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import GateInApp from './GateInApp'

export default {
    components: { GateInApp },
    computed: {
        totalBayar() {
            return this.formModel.fare + this.formModel.denda
        }
    },
    data() {
        return {
            showTicketLostForm: false,
            formModel: { barcode_number: '' },
            formErrors: {},
            snapshot_in: null,
            snapshot_out: null,
            parkingGateList: [],
            vehicleTypeList: [],
            setting: {},
            showManualOpenForm: false,
            formModelManualOpen: {},
            ws: null
        }
    },
    methods: {
        toSubmit() {
            document.getElementById('submit-btn').focus()
        },
        toGateIn() {
            document.getElementById('gate-in').focus()
        },
        nextBtn() {
            document.getElementById('submit-btn1').focus()
        },
        prevBtn() {
            document.getElementById('submit-btn').focus()
        },
        manualOpen() {
            this.$confirm('Aksi ini akan dicatat oleh sistem. Anda yakin?', 'Peringatan', { type: 'warning'} ).then(() => {
                this.formModelManualOpen.parking_gate_id = this.formModel.gate_out_id
                axios.post('/manualOpenLog', this.formModelManualOpen).then(r => {
                    this.openGate();
                    this.showManualOpenForm = false
                    this.formModelManualOpen = {}
                }).catch(e => {
                    if (e.response.status == 422) {
                        this.formErrors = e.response.data.errors;
                    } else {
                        this.$message({
                            message: e.response.data.message,
                            type: 'error',
                            showClose: true,
                        })
                    }
                })
            }).catch(() => console.log(e))
        },
        setDuration() {
            var date1 = moment(this.formModel.time_in)
            var date2 = moment(this.formModel.time_out);
            var duration = moment.duration(date2.diff(date1));
            this.formModel.duration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
            // console.log(this.formModel.duration)
            this.$forceUpdate()
        },
        checkPlate() {
            let params = { plate_number: this.formModel.plate_number }
            axios.get('/parkingMember/search', { params: params }).then(r => {
                this.formModel.is_member = 1
                this.formModel.fare = 0
            }).catch(e => {
                this.formModel.is_member = 0
            }).finally(() => {
                document.getElementById('ticket-number').focus()
                this.$forceUpdate()
            })
        },
        checkTicket() {
            let now = moment().format('YYYY-MM-DD HH:mm:ss')

            if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                this.formModel.time_in = moment().format('YYYY-MM-DD');
                this.formModel.time_out = now;
                document.getElementById('vehicle-type').focus()
            } else {
                let params = { barcode_number: this.formModel.barcode_number }
                axios.get('/parkingTransaction/search', { params: params }).then(r => {
                    if (r.data.is_member) {
                        if (r.data.member.expired) {
                            this.$alert('Kartu telah habis masa berlaku', 'Perhatian', {
                                type: 'warning',
                                center: true,
                                roundButton: true,
                                confirmButtonText: 'OK',
                                confirmButtonClass: 'bg-red',
                            })
                            return
                        }

                        if (!r.data.member.expired && r.data.member.expired_in <= 5) {
                            this.$alert('Kartu akan habis masa berlaku dalam ' + r.data.member.expired_in + ' hari', 'Perhatian', {
                                type: 'warning',
                                center: true,
                                roundButton: true,
                                confirmButtonText: 'OK',
                                confirmButtonClass: 'bg-red',
                            })
                        }

                        let vehicle = r.data.member.vehicles.find(v => v.plate_number == this.formModel.plate_number)

                        if (!vehicle) {
                            this.$alert('Nomor plat tidak cocok dengan kartu. Nomor plat yang terdaftar adalah '
                            + r.data.member.vehicles.map(v => v.plate_number).join(', '), 'Notifikasi', {
                                type: 'warning',
                                center: true,
                                roundButton: true,
                                confirmButtonText: 'SAYA TELAH MEMBACA NOTIFIKASI INI',
                                confirmButtonClass: 'bg-red'
                            })
                        }

                        this.formModel.fare = 0
                    }

                    this.snapshot_in = r.data.snapshot_in
                    this.formModel.id = r.data.id
                    this.formModel.gate_in_id = r.data.gate_in_id
                    this.formModel.time_in = r.data.time_in
                    this.formModel.is_member = r.data.is_member
                    this.formModel.time_out = now
                    this.$forceUpdate()
                    this.setDuration()

                    // member auto open sesuai setingan
                    if (r.data.is_member && !r.data.member.expired && this.setting.member_auto_open) {
                        this.update(false)
                    }

                    document.getElementById('vehicle-type').focus()
                }).then(() => {
                    this.takeSnapshot(this.formModel.id)
                }).catch(e => {
                    console.log(e)
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true,
                    })
                })
            }
        },
        setFare() {
            let vehicle = this.vehicleTypeList.find(vt => vt.name == this.formModel.vehicle_type)
            if (vehicle) {
                document.getElementById('vehicle-type').blur()

                if (!this.formModel.is_member)
                {
                    this.formModel.fare = vehicle.tarif_flat
                    if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                        this.formModel.denda = vehicle.denda_tiket_hilang
                    }
                } else {
                    this.formModel.fare = 0
                }

                this.$forceUpdate()

                if (this.formModel.barcode_number.toLowerCase() == 'xxxxx') {
                    document.getElementById('time-in').focus()
                } else {
                    document.getElementById('submit-btn').focus()
                }
            }
        },
        resetForm() {
            let default_vehicle = this.vehicleTypeList.find(v => v.is_default == 1)
            this.formModel.gate_in_id = null
            this.formModel.plate_number = this.setting.default_plate_number
            this.formModel.barcode_number = ''
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

            if (this.setting.disable_plat_nomor) {
                document.getElementById('ticket-number').focus()
            } else {
                document.getElementById('plate-number').focus()
            }
        },
        submit(ticket) {
            // kalau tiket hilang harus isi time in dulu
            if (this.formModel.barcode_number.toLowerCase() == 'xxxxx' && !this.formModel.time_in) {
                document.getElementById('time-in').focus()
                return
            } else {
                document.getElementById('submit-btn').blur()
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
            || !this.formModel.vehicle_type
            || !this.formModel.time_out
            || !this.formModel.time_in) {
                return
            }

            if (this.formModel.time_in.length < 16) {
                this.$message({
                    message: 'FORMAT TIME IN SALAH',
                    type: 'error',
                    showClose: true
                })
                return
            }

            if (this.formModel.time_in.length == 16) {
                this.formModel.time_in += ':00'
            }

            if (!!this.formModel.id) {
                this.update(ticket)
            } else {
                this.store(ticket)
            }
        },
        store(ticket) {
            axios.post('/parkingTransaction', this.formModel).then(r => {
                this.takeSnapshot(r.data.id)
                if (ticket) {
                    this.printTicket(r.data.id)
                }
                this.openGate()
            }).catch(e => {
                // kecil kemungkinan
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: true
                })
            })
        },
        update(ticket) {
            axios.put('/parkingTransaction/' + this.formModel.id, this.formModel).then(r => {
                // print tiket hanya untuk non member
                if (r.data.is_member == 0 && ticket) {
                    this.printTicket(r.data.id)
                }
            }).catch(e => {
                this.$message({
                    message: 'DATA GAGAL DISIMPAN',
                    type: 'error',
                    showClose: true
                })
            }).finally(() => {
                this.openGate()
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
            })
        },
        openGate() {
            // get gate out
            const gate = this.parkingGateList.find(g => g.id == this.formModel.gate_out_id);

            if (!gate) {
                this.$message({
                    message: 'MOHON PILIH GATE OUT',
                    type: 'error',
                    showClose: true
                })
                return
            }

            // kalau ga ada ip berarti langsung nancep
            if (!gate.controller_ip_address) {
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
            } else {
                this.ws.send([
                    'open',
                    gate.controller_device,
                    gate.controller_baudrate,
                    gate.cmd_open,
                    gate.cmd_close
                ].join(';'));
            }
        },
        getParkingGateList() {
            axios.get('/parkingGate/getList').then(r => {
                this.parkingGateList = r.data

                if (r.data.filter(g => g.type == 'IN').length == 0) {
                    this.$message({
                        message: 'MOHON SET GATE IN',
                        type: 'error',
                        showClose: true
                    })
                    return
                }

                if (r.data.filter(g => g.type == 'IN').length == 1) {
                    this.formModel.gate_in_id = r.data.find(g => g.type == 'IN').id
                }

                if (r.data.filter(g => g.type == 'OUT').length == 0) {
                    this.$message({
                        message: 'MOHON SET GATE OUT',
                        type: 'error',
                        showClose: true
                    })
                    return
                }

                // kalau cuma 1 gate outnya set default
                if (r.data.filter(g => g.type == 'OUT').length == 1) {
                    this.formModel.gate_out_id = r.data.find(g => g.type == 'OUT').id
                }
            }).catch(e => {
                this.$message({
                    message: 'MOHON SET GATE',
                    type: 'error',
                    showClose: true
                })
            })
        },
        printLastTrx() {
            if (!this.formModel.gate_out_id) {
                return
            }

            let params = { gate_out_id: this.formModel.gate_out_id }
            axios.get('/parkingTransaction/search', { params: params }).then(r => {
                this.printTicket(r.data.id)
            }).catch(e => {
                this.$message({
                    message: 'BELUM ADA TRANSAKSI',
                    type: 'error',
                    showClose: true
                })
            })
        },
        printReport() {
            let payload = {
                gate_out_id: this.formModel.gate_out_id,
                date: moment().format('YYYY-MM-DD')
            }

            axios.post('/parkingTransaction/printReport', payload).then(r => {
                this.$message({
                    message: 'SILAKAN AMBIL STRUK',
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
        getVehicleTypeList() {
            axios.get('/vehicleType/getList').then(r => {
                if (r.data.length == 0) {
                    this.$message({
                        message: 'MOHON SET JENIS KENDARAAN',
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
                }
            }).catch(e => {
                this.$message({
                    message: 'MOHON SET JENIS KENDARAAN',
                    type: 'error',
                    showClose: true
                })
            })
        },
        getSetting(state) {
            axios.get('/setting').then(r => {
                this.setting = r.data
                this.formModel.plate_number = r.data.default_plate_number

                if (this.setting.disable_plat_nomor) {
                    document.getElementById('ticket-number').focus()
                } else {
                    document.getElementById('plate-number').focus()
                }
            }).catch(e => {
                this.$message({
                    message: 'BELUM ADA SETTING',
                    type: 'error',
                    showClose: true,
                    duration: 10000
                })
            })
        },
        connectToGateOut() {
            this.ws = new WebSocket("ws://127.0.0.1:5678/");
            this.ws.onerror = (event) => {
                this.$message({
                    message: 'KONEKSI KE CONTROLLER GATE KELUAR GAGAL',
                    type: 'error',
                    showClose: true,
                    duration: 10000
                })
            }
            this.ws.onmessage = (event) => {
                let data = JSON.parse(event.data)
                this.$message({
                    message: data.message,
                    type: data.status ? 'success' : 'error',
                    showClose: true
                })

                this.resetForm()
            }
        }
    },
    mounted() {
        this.connectToGateOut()
        this.getSetting()
        this.getParkingGateList()
        this.getVehicleTypeList()

        document.getElementById('gate-out-app').onkeydown = (e) => {
            // console.log(e.key)
            // ke field nomor plat
            if (e.key == '-') {
                e.preventDefault()
                this.resetForm()
                this.$forceUpdate()
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

            if (e.key == 'F10') {
                e.preventDefault()
                this.printReport()
            }

            if (e.key == 'F11') {
                e.preventDefault()
                this.showManualOpenForm = true;
                this.formModelManualOpen = {}
            }

            if (e.key == 'F12') {
                e.preventDefault()
                this.printLastTrx()
            }
        }
    },
    destroyed() {
        this.ws.close(1000, 'Leaving app')
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
    height: 43px;
    line-height: 43px;
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
    height: 43px;
    line-height: 43px;
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
    height: 43px;
    line-height: 43px;
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
    height: 43px;
    line-height: 43px;
    background-color: #254ec1;
    color: #fff;
    border-radius: 4px;
    margin-top: 10px;
}

.my-big-btn:focus {
    // border: 3px dotted red;
    background-color: #cd0000;
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
