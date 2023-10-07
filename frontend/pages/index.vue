<template>
  <el-card>
    <div v-if="pos" class="flex" id="gate-out-app">
      <div style="width: 600px; flex-shrink: 0">
        <h1 class="mt-0 mb-3 p-2 bg-red text-white text-center text-xl">
          {{ pos.nama }}
        </h1>

        <el-row v-if="!setting.disable_plat_nomor" :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">[-] NO. PLAT</div>
          </el-col>
          <el-col :span="14">
            <input id="plat-nomor" autocomplete="off" @keyup.enter="cekPlatNomor" type="text" placeholder="NO. PLAT"
              v-model="formModel.plat_nomor" class="my-input" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">[+] NO. TIKET/KARTU</div>
          </el-col>
          <el-col :span="14">
            <input id="nomor-tiket" autocomplete="off" @keyup.enter="cekTiket" @keydown.tab="cekTiket" type="text"
              placeholder="NO. TIKET/KARTU" v-model="formModel.nomor_barcode" class="my-input" />
          </el-col>
        </el-row>

        <el-row v-if="jenisKendaraanList.length > 1" :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">[*] JENIS KENDARAAN</div>
          </el-col>
          <el-col :span="14">
            <select @change="hitungTarif" v-model="formModel.jenis_kendaraan" id="jenis-kendaraan" class="my-input"
              placeholder="JENIS KENDARAAN">
              <option v-for="g in jenisKendaraanList" :value="g.nama" :key="g.id">
                {{ g.shortcut_key }} - {{ g.nama }}
              </option>
            </select>
          </el-col>
        </el-row>

        <el-row v-show="formModel.nomor_barcode == 'xxxxx'" :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">[*] JAM MASUK</div>
          </el-col>
          <el-col :span="14">
            <input @keyup.enter="toGateIn" @change="hitungTarif" id="time-in" v-mask="'####-##-## ##:##'"
              v-model="formModel.time_in" class="my-input" />
          </el-col>
        </el-row>

        <el-row v-show="formModel.nomor_barcode == 'xxxxx'" v-if="gateInList.length > 1" :gutter="10"
          style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">GATE MASUK</div>
          </el-col>
          <el-col :span="14">
            <select @change="toSubmit" v-model="formModel.gate_in_id" id="gate-in" class="my-input">
              <option v-for="g in gateInList" :value="g.id" :key="g.id">
                {{ g.shortcut_key }} - {{ g.nama }}
              </option>
            </select>
          </el-col>
        </el-row>

        <el-row :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">TARIF</div>
          </el-col>
          <el-col :span="14">
            <input disabled v-model="formModel.tarif" class="my-input bg-red-700 text-white" />
          </el-col>
        </el-row>

        <el-row v-if="formModel.nomor_barcode == 'xxxxx'" :gutter="10" style="margin-bottom: 10px">
          <el-col :span="10">
            <div class="label-big">TARIF + DENDA</div>
          </el-col>
          <el-col :span="14">
            <input disabled :value="Number(formModel.tarif) + Number(formModel.denda)"
              class="my-input bg-red-700 text-white" />
          </el-col>
        </el-row>

        <button id="submit-btn" @keyup.right="nextBtn" @keyup.down="nextBtn" @keydown.enter="submit(false)"
          class="my-big-btn" @click="submit(false)">
          BUKA GATE
        </button>
        <button id="submit-btn1" @keyup.left="prevBtn" @keyup.up="prevBtn" @keydown.enter="printLastTrx"
          class="my-big-btn" @click="printLastTrx">
          [F12] PRINT STRUK TRANSAKSI TERAKHIR
        </button>

        <el-row :gutter="10">
          <el-col :span="12">
            <button @keydown.enter="printReport" class="my-big-btn" @click="printReport">
              [F10] PRINT LAPORAN
            </button>
            <!-- <button
							@keydown.enter="openGateMemberUHF"
							class="my-big-btn"
							@click="openGateMemberUHF"
						>
							[F10] BUKA GATE UHF
						</button> -->
          </el-col>
          <el-col :span="12">
            <button class="my-big-btn" @keydown.enter="showManualOpenForm = true" @click="showManualOpenForm = true">
              [F11] BUKA GATE MANUAL
            </button>
          </el-col>
        </el-row>
      </div>

      <div :class="{ 'ml-5': true, flex: setting.orientasi_kamera == 'POTRAIT' }" style="width: 100%">
        <div class="mb-1" style="width: 100%" v-for="s in snapshots" :key="s.id">
          <img :src="s.url" style="width: 650px" />
        </div>
      </div>

      <TransactionFormBukaManual :show="showManualOpenForm" @close="showManualOpenForm = false"
        :gateOutList="pos.gate_outs" @open-gate="(gate_out_id) => openGate(gate_out_id)" />

      <NotificationMessage />
    </div>

    <div v-else class="flex flex-row justify-content-center align-items-center" style="height: calc(100vh - 145px)">
      <div class="text-center text-5xl text-danger">
        KOMPUTER INI TIDAK TERDAFTAR SEBAGAI POS
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    totalBayar() {
      return Number(this.formModel.tarif) + Number(this.formModel.denda)
    },

    duration() {
      if (!this.formModel.time_in || !this.formModel.time_out) {
        return '00:00:00'
      }

      let time_in = this.$moment(this.formModel.time_in)
      let time_out = this.$moment(this.formModel.time_out)
      let day = time_out.diff(time_in, 'days')
      let hour = time_out.diff(time_in, 'hours')
      let minute = time_out.diff(time_in, 'minutes')
      let second = time_out.diff(time_in, 'seconds')

      return `${day}HR ${String(hour % 24).padStart(2, '0')}:${String(
        minute % 60
      ).padStart(2, '0')}`
    },

    ...mapState(['pos', 'setting', 'gateInList', 'jenisKendaraanList']),
  },

  data() {
    return {
      formModel: { nomor_barcode: '', tarif: '', denda: '' },
      formErrors: {},
      snapshots: [
        // { id: 1, url: 'https://via.placeholder.com/150' },
        // { id: 2, url: 'https://via.placeholder.com/150' },
      ],
      showManualOpenForm: false,
      ws: null,
      updateTarifInterval: null,
    }
  },

  methods: {
    toSubmit() {
      this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
      document.getElementById('submit-btn').focus()
    },

    toGateIn() {
      if (this.gateInList.length == 1) {
        this.formModel.gate_in_id = this.gateInList[0].id
      }

      if (!this.formModel.gate_in_id) {
        document.getElementById('gate-in').focus()
      } else {
        document.getElementById('submit-btn').focus()
      }

      this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
    },

    nextBtn() {
      document.getElementById('submit-btn1').focus()
    },

    prevBtn() {
      document.getElementById('submit-btn').focus()
    },

    hitungTarif() {
      this.formModel.group = this.jenisKendaraanList.find(
        (k) => k.nama == this.formModel.jenis_kendaraan
      ).group

      const gateOut = this.pos.gate_outs.find((g) => {
        return g.jenis_kendaraan.includes(this.formModel.jenis_kendaraan)
      })

      if (!gateOut) {
        this.$message({
          message: 'Tidak ada gate keluar untuk jenis kendaraan terkait',
          type: 'error',
        })
        return
      }

      this.formModel.gate_out_id = gateOut.id

      if (this.formModel.id) {
        this.takeSnapshot()
      }

      if (this.formModel.is_member) {
        this.formModel.tarif = 0
        document.getElementById('submit-btn').focus()
        return
      }

      const tarif = this.jenisKendaraanList.find(
        (v) => v.nama == this.formModel.jenis_kendaraan
      )

      if (!tarif) {
        this.$message({
          message:
            'Tarif tidak ditemukan untuk jenis kendaraan ' +
            this.formModel.jenis_kendaraan,
          type: 'error',
          showClose: true,
        })

        this.formModel.tarif = 0
        return
      }

      if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
        this.formModel.denda = Number(tarif.denda_tiket_hilang)
      } else {
        this.formModel.denda = 0
      }

      var timeIn = this.$moment(this.formModel.time_in)
      var timeOut = this.formModel.time_out
        ? this.$moment(this.formModel.time_out)
        : this.$moment()
      var durasiMenit = timeOut.diff(timeIn, 'minutes') || 1

      var tarifMenitPertama = tarif.tarif_menit_pertama

      // tak peduli flat atau progressif berlaku seperti ini
      if (durasiMenit <= tarif.menit_pertama) {
        this.formModel.tarif = tarifMenitPertama
        document.getElementById('submit-btn').focus()
        this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
        return
      }

      var durasiReal = durasiMenit - tarif.menit_pertama

      // mode menginap 24 jam
      if (tarif.mode_menginap == 0) {
        var hariParkir = Math.ceil(durasiMenit / (60 * 24))

        // mode tarif flat
        if (hariParkir == 0 && tarif.mode_tarif == 0) {
          hariParkir = 1
        }
      }

      // mode menginap lewat tengah malam
      if (tarif.mode_menginap == 1) {
        var hariIn = this.$moment(timeIn.format('YYYY-MM-DD'))
        var hariOut = this.$moment(timeOut.format('YYYY-MM-DD'))
        var hariParkir = 0

        if (durasiMenit >= 60) {
          hariParkir = hariOut.diff(hariIn, 'days') + 1
        } else {
          hariParkir = 1
        }
      }

      var hariMenginap = hariParkir >= 1 ? hariParkir - 1 : 0
      var tarifMenginap = hariMenginap * tarif.tarif_menginap

      // tarif flat per hari, kena tarif menginap, kena tarif maximal
      if (tarif.mode_tarif == 0) {
        this.formModel.tarif =
          tarifMenitPertama + hariParkir * tarif.tarif_flat + tarifMenginap
      }

      // tarif progresif
      if (tarif.mode_tarif == 1) {
        var tarifMaksimum = hariMenginap * tarif.tarif_maksimum

        // menginap 24 jam
        if (tarif.mode_menginap == 0) {
          const sisaMenit = durasiMenit % (60 * 24)
          var tarifHariTerakhir = 0

          if (sisaMenit <= tarif.menit_pertama) {
            tarifHariTerakhir = tarif.tarif_menit_pertama
          } else {
            tarifHariTerakhir =
              tarif.tarif_menit_pertama +
              Math.ceil(
                (sisaMenit - tarif.menit_pertama) / tarif.menit_selanjutnya
              ) *
              tarif.tarif_menit_selanjutnya
          }

          if (tarifHariTerakhir > tarif.tarif_maksimum) {
            tarifHariTerakhir = tarif.tarif_maksimum
          }

          this.formModel.tarif =
            tarifMaksimum + tarifHariTerakhir + tarifMenginap
        }

        // menginap lewat lengahmalam
        if (tarif.mode_menginap == 1) {
          if (hariParkir > 1) {
            var menitHariPertama =
              this.$moment(timeIn.format('YYYY-MM-DD') + ' 24:00:00').diff(
                timeIn,
                'minutes'
              ) - tarif.menit_pertama

            var menitHariTerakhir = timeOut.diff(
              this.$moment(timeOut.format('YYYY-MM-DD') + ' 00:00:00'),
              'minutes'
            )

            var tarifHariPertama =
              Math.ceil(menitHariPertama / tarif.menit_selanjutnya) *
              tarif.tarif_menit_selanjutnya
            tarifHariTerakhir =
              Math.ceil(menitHariTerakhir / tarif.menit_selanjutnya) *
              tarif.tarif_menit_selanjutnya

            if (tarifHariPertama > tarif.tarif_maksimum) {
              tarifHariPertama = tarif.tarif_maksimum
            }

            if (tarifHariTerakhir > tarif.tarif_maksimum) {
              tarifHariTerakhir = tarif.tarif_maksimum
            }

            if (hariParkir <= 2) {
              tarifMaksimum = 0
            }

            this.formModel.tarif =
              tarifMenitPertama +
              tarifMaksimum +
              tarifHariPertama +
              tarifHariTerakhir +
              tarifMenginap
          } else {
            tarifHariPertama =
              Math.ceil(durasiReal / tarif.menit_selanjutnya) *
              tarif.tarif_menit_selanjutnya

            if (tarifHariPertama > tarif.tarif_maksimum) {
              tarifHariPertama = tarif.tarif_maksimum
            }

            this.formModel.tarif = tarifMenitPertama + tarifHariPertama
          }
        }
      }

      if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
        document.getElementById('time-in').focus()
      } else {
        document.getElementById('submit-btn').focus()
      }

      this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
    },

    cekPlatNomor() {
      let params = { plat_nomor: this.formModel.plat_nomor }
      this.$axios
        .$get('/api/member/search', { params: params })
        .then((r) => {
          this.formModel.is_member = 1
          this.formModel.tarif = 0
        })
        .catch((e) => {
          this.formModel.is_member = 0
        })
        .finally(() => {
          console.log('chekPlatNomor')
          document.getElementById('nomor-tiket').focus()
          this.$forceUpdate()
        })
    },

    // hasil akhir ini harusnya tergantung dia ada jenis kendaraan berapa
    async cekTiket() {
      if (this.formModel.nomor_barcode.length < 5) return

      let now = this.$moment().format('YYYY-MM-DD HH:mm:ss')

      if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
        this.formModel.time_in = this.$moment().format('Y-MM-DD')
        this.$forceUpdate()
        this.formModel.time_out = now

        if (this.jenisKendaraanList.length > 1) {
          document.getElementById('jenis-kendaraan').focus()
        } else {
          this.formModel.jenis_kendaraan = this.jenisKendaraanList[0].nama
          document.getElementById('time-in').focus()
        }

        return
      }

      try {
        var data = await this.$axios.$get('/api/parkingTransaction/search', {
          params: { nomor_barcode: this.formModel.nomor_barcode },
        })
      } catch (error) {
        if (error.response.status == 404) {
          this.$message({
            message: error.response.data.message,
            type: 'error',
            center: true,
            showClose: true,
            duration: 3000,
          })
        }
        document.getElementById('nomor-tiket').focus()
      }

      this.snapshots = data.snapshots

      const { id, gate_in_id, time_in, is_member } = data

      this.formModel = {
        ...this.formModel,
        id,
        gate_in_id,
        time_in,
        is_member,
        time_out: now,
        tarif: 0,
      }

      this.$forceUpdate()

      // jika bukan member
      if (!data.is_member && this.jenisKendaraanList.length > 1) {
        document.getElementById('jenis-kendaraan').focus()
        return
      }

      if (data.is_member) {
        if (!!data.member.expired) {
          this.$alert('Kartu telah habis masa berlaku', 'Perhatian', {
            type: 'warning',
            center: true,
            roundButton: true,
            confirmButtonText: 'OK',
            confirmButtonClass: 'bg-red',
          })
          this.formModel.is_member = 0
          return false
        }

        if (!data.member.expired && data.member.expired_in <= 5) {
          this.$alert(
            `Kartu akan habis masa berlaku dalam ${data.member.expired_in} hari`,
            'Perhatian',
            {
              type: 'warning',
              center: true,
              roundButton: true,
              confirmButtonText: 'OK',
              confirmButtonClass: 'bg-red',
            }
          )
        }

        if (!!this.setting.disable_plat_nomor) {
          const vehicle = data.member.vehicles[0]
          this.formModel.jenis_kendaraan = vehicle.jenis_kendaraan
          this.formModel.plat_nomor = vehicle.plat_nomor

          // member auto open sesuai setingan
          if (!!this.setting.member_auto_open) {
            const gateOut = this.pos.gate_outs.find((g) => {
              return g.jenis_kendaraan.includes(this.formModel.jenis_kendaraan)
            })

            if (!gateOut) {
              this.$message({
                message: 'Tidak ada gate keluar untuk jenis kendaraan terkait',
                type: 'error',
              })
              return
            }

            this.formModel.gate_out_id = gateOut.id

            if (this.formModel.id) {
              this.takeSnapshot()
            }

            this.save(false)
          }
        } else {
          let vehicle = data.member.vehicles.find(
            (v) => v.plat_nomor == this.formModel.plat_nomor
          )

          if (!vehicle) {
            this.$alert(
              'Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah ' +
              data.member.vehicles.map((v) => v.plat_nomor).join(', '),
              'Perhatian',
              {
                type: 'warning',
                center: true,
                roundButton: true,
                confirmButtonText: 'OK',
                confirmButtonClass: 'bg-red',
              }
            )
            document.getElementById('plat-nomor').focus()
          } else {
            if (this.jenisKendaraanList.length > 1) {
              document.getElementById('jenis-kendaraan').focus()
            }
          }
        }
      }

      if (this.jenisKendaraanList.length == 1) {
        this.formModel.jenis_kendaraan = this.jenisKendaraanList[0].nama
        this.hitungTarif()
      }
    },

    resetForm() {
      this.resetRunningText()
      this.formModel.tarif = ''
      this.formModel.denda = ''
      this.formModel.gate_in_id = null
      this.formModel.gate_out_id = null
      this.formModel.jenis_kendaraan = null
      this.formModel.plat_nomor = this.setting.plat_nomor_default
      this.formModel.nomor_barcode = ''
      this.formModel.time_out = ''
      this.formModel.time_in = ''
      this.formModel.duration = ''

      this.snapshots = []
      this.$forceUpdate()

      if (this.setting.disable_plat_nomor) {
        console.log('ke nomor tiket')
        document.getElementById('nomor-tiket').focus()
      } else {
        console.log('ke plat nomor')
        document.getElementById('plat-nomor').focus()
      }
    },

    submit(ticket) {
      // kalau tiket hilang harus isi time in dulu
      if (
        this.formModel.nomor_barcode.toLowerCase() == 'xxxxx' &&
        !this.formModel.time_in
      ) {
        document.getElementById('time-in').focus()
        return
      } else {
        document.getElementById('submit-btn').blur()
      }

      if (this.gateInList.length == 1) {
        this.formModel.gate_in_id = this.gateInList[0].id
      }

      if (!this.formModel.gate_in_id) {
        this.$message({
          message: 'MOHON ISI GATE IN',
          type: 'error',
          showClose: true,
        })
        return
      }

      if (
        !this.formModel.nomor_barcode ||
        !this.formModel.gate_out_id ||
        !this.formModel.jenis_kendaraan ||
        !this.formModel.time_out ||
        !this.formModel.time_in
      ) {
        return
      }

      if (this.formModel.time_in.length < 16) {
        this.$message({
          message: 'FORMAT TIME IN SALAH',
          type: 'error',
          showClose: true,
        })
        return
      }

      if (this.formModel.time_in.length == 16) {
        this.formModel.time_in += ':00'
      }

      this.save(ticket)
    },

    save(ticket) {
      this.formModel.ticket = ticket

      this.$axios({
        method: this.formModel.id ? 'put' : 'post',
        url: this.formModel.id
          ? `/api/parkingTransaction/${this.formModel.id}`
          : '/api/parkingTransaction',
        data: this.formModel,
      }).then((r) => {
        this.$message({
          message: r.data.message,
          type: 'success',
        })
        this.openGate(this.formModel.gate_out_id)
        this.resetForm()
      })
    },

    async connectPos() {
      this.ws = new WebSocket(`ws://${this.pos.ip_address}:5678/`)

      this.ws.onerror = (event) => {
        this.$message({
          message: 'KONEKSI KE POS GAGAL',
          type: 'error',
        })
      }

      this.ws.onopen = (event) => {
        console.log('POS TEKONEKSI')
      }

      this.ws.onmessage = (event) => {
        let data = JSON.parse(event.data)
        console.error(data)
        // this.$message({
        // 	message: data.message,
        // 	type: data.status ? 'success' : 'error',
        // })
      }
    },

    openGate(gate_out_id) {
      const gate = this.pos.gate_outs.find((g) => g.id == gate_out_id)

      this.ws.send(
        [
          'open',
          gate.device,
          gate.baudrate,
          gate.open_command,
          gate.close_command,
        ].join(';')
      )

      setTimeout(this.resetForm, 3000)
    },

    openGateMemberUHF() {
      // asumsi gate out cuma 1
      const gate_id = this.pos.gate_outs[0].id
      this.openGate(gate_id)
      this.$axios.$post(`/api/takeSnapshot/${gate_id}`).then((r) => {
        this.snapshots = r
        this.$forceUpdate()
      })
    },

    runningText(text) {
      const gate = this.pos.gate_outs.find(
        (g) => g.id == this.formModel.gate_out_id
      )

      if (!gate) {
        return
      }

      if (!gate.running_text_device || !gate.running_text_baudrate) {
        return
      }

      this.ws.send(
        ['rt', gate.running_text_device, gate.running_text_baudrate, text].join(
          ';'
        )
      )
    },

    resetRunningText() {
      const gate = this.pos.gate_outs.find(
        (g) => g.id == this.formModel.gate_out_id
      )

      if (!gate) {
        return
      }

      if (!gate.running_text_device || !gate.running_text_baudrate) {
        return
      }

      this.ws.send(
        ['rrt', gate.running_text_device, gate.running_text_baudrate].join(';')
      )
    },

    printLastTrx() {
      this.$axios
        .$post('/api/parkingTransaction/printLastTransaction', {
          pos_id: this.formModel.pos_id,
        })
        .then((r) => {
          this.$message({
            message: r.message,
            type: 'success',
            showClose: true,
          })
        })
    },

    printReport() {
      if (this.HIDE_PRINT_REPORT) {
        return
      }

      let payload = {
        pos_id: this.formModel.pos_id,
        date: this.$moment().format('YYYY-MM-DD'),
      }

      this.$axios
        .$post('/api/parkingTransaction/printReport', payload)
        .then((r) => {
          this.$message({
            message: 'SILAKAN AMBIL STRUK',
            type: 'success',
            showClose: true,
          })
        })
    },

    async initialize() {
      await this.$store.dispatch('getPos')

      if (!this.pos) {
        return
      }

      this.formModel.pos_id = this.pos.id

      if (this.pos.gate_outs.length == 1) {
        this.formModel.gate_out_id = this.pos.gate_outs[0].id
      }

      this.formModel.plat_nomor = this.setting.plat_nomor_default

      if (this.setting.disable_plat_nomor) {
        document.getElementById('nomor-tiket').focus()
      } else {
        document.getElementById('plat-nomor').focus()
      }

      await this.connectPos()
      // todo: kasih popup bahwa tidak terkoneksi dengan pos sehingga tidak bisa buka gate
    },

    takeSnapshot() {
      this.$axios
        .$post(`/api/parkingTransaction/takeSnapshot/${this.formModel.id}`, {
          gate_out_id: this.formModel.gate_out_id,
        })
        .then((r) => {
          this.snapshots = r
          this.$forceUpdate()
        })
    },
  },

  async mounted() {
    await this.initialize()

    if (!this.pos) {
      return
    }

    document.getElementById('gate-out-app').addEventListener('keydown', (e) => {
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
        this.formModel.nomor_barcode = ''
        this.formModel.time_out = ''
        this.formModel.jenis_kendaraan = ''
        this.formModel.tarif = ''
        document.getElementById('nomor-tiket').focus()
      }

      // ke field jenis kendaraan
      if (e.key == '*') {
        e.preventDefault()
        this.formModel.jenis_kendaraan = ''
        this.formModel.tarif = ''
        document.getElementById('jenis-kendaraan').focus()
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
        // this.openGateMemberUHF()
      }

      if (e.key == 'F11') {
        e.preventDefault()
        this.showManualOpenForm = true
      }

      if (e.key == 'F12') {
        e.preventDefault()
        this.printLastTrx()
      }
    })

    this.updateTarifInterval = setInterval(
      this.$store.dispatch('getJenisKendaraanList'),
      60000
    )
  },

  destroyed() {
    if (this.ws) {
      this.ws.close()
    }

    clearInterval(this.updateTarifInterval)
  },
}
</script>

<style lang="css" scoped>
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

.my-input:focus,
.my-input-time:focus {
  background: rgb(255, 246, 122);
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

.my-big-btn:focus {
  background: rgb(199, 24, 24);
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
