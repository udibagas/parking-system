<template>
  <div id="gate-in-app" style="padding: 0px 200px">
    <h1 style="text-align: center; font-size: 26px">{{ location.name }}</h1>
    <div style="text-align: center">{{ location.address }}</div>
    <el-divider></el-divider>
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="10">
        <div class="label-big">GATE IN</div>
      </el-col>
      <el-col :span="14">
        <select v-model="formModel.gate_in_id" id="gate-in" class="my-input">
          <option
            v-for="g in parkingGateList.filter((g) => g.type == 'IN')"
            :value="g.id"
            :key="g.id"
          >
            {{ g.name }}
          </option>
        </select>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="10">
        <div class="label-big">[*] JENIS KENDARAAN</div>
      </el-col>
      <el-col :span="14">
        <select
          placeholder="JENIS KENDARAAN"
          @change="setFare"
          v-model="formModel.vehicle_type"
          id="vehicle-type"
          class="my-input"
        >
          <option v-for="g in vehicleTypeList" :value="g.name" :key="g.id">
            {{ g.shortcut_key }} - {{ g.name }}
          </option>
        </select>
        <!-- <div style="padding:3px 10px;font-weight:bold;" class="bg-yellow">
                    {{vehicleTypeList.map(vt => vt.shortcut_key + ' = ' + vt.name).join(', ')}}
                </div> -->
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="10">
        <div class="label-big">[-] NO. PLAT</div>
      </el-col>
      <el-col :span="14">
        <input
          id="plate-number"
          autocomplete="off"
          @keyup.enter="submit"
          type="text"
          placeholder="NO. PLAT"
          v-model="formModel.plate_number"
          class="my-input"
        />
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="10">
        <div class="label-big">TARIF</div>
      </el-col>
      <el-col :span="14">
        <input disabled v-model="formModel.fare" class="my-input tarif-input" />
      </el-col>
    </el-row>

    <button class="my-big-btn" @click="submit">
      [ENTER] PRINT TIKET & BUKA GATE
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {},
      formErrors: {},
      location: {},
      parkingGateList: [],
      vehicleTypeList: [],
    };
  },

  methods: {
    setFare() {
      let vehicle = this.vehicleTypeList.find(
        (vt) => vt.name == this.formModel.vehicle_type
      );

      if (vehicle) {
        this.formModel.fare = this.formModel.is_member ? 0 : vehicle.tarif_flat;
        this.$forceUpdate();
      }

      document.querySelector("#plate-number").focus();
    },

    resetForm() {
      let default_vehicle = this.vehicleTypeList.find((v) => v.is_default == 1);
      this.formModel.plate_number = this.location.default_plate_number;

      if (default_vehicle) {
        this.formModel.vehicle_type = default_vehicle.name;
        this.formModel.fare = default_vehicle.tarif_flat;
      } else {
        this.formModel.vehicle_type = "";
        this.formModel.fare = "";
      }

      this.$forceUpdate();
      document.querySelector("#plate-number").focus();
    },

    submit() {
      if (
        !this.formModel.gate_in_id ||
        !this.formModel.plate_number ||
        !this.formModel.vehicle_type
      ) {
        return;
      }

      let params = { plate_number: this.formModel.plate_number };
      this.$axios
        .$get("/parkingMember/search", { params: params })
        .then((r) => {
          this.formModel.fare = 0;
          this.formModel.is_member = 1;
          this.formModel.member_id = r.id;
        })
        .catch((e) => {
          this.formModel.is_member = 0;
          this.formModel.member_id = null;
        })
        .finally(() => {
          this.formModel.time_in = moment().format("YYYY-MM-DD HH:mm:ss");
          this.$axios.$post("/parkingTransaction", this.formModel);
        });
    },
  },

  mounted() {
    document.querySelector("#plate-number").focus();

    document.querySelector("#gate-in-app").onkeypress = (e) => {
      // ke field nomor plat
      if (e.key == "-") {
        e.preventDefault();
        this.resetForm();
        this.$forceUpdate();
        document.querySelector("#plate-number").focus();
      }

      // ke field jenis kendaraan
      if (e.key == "*") {
        e.preventDefault();
        this.formModel.vehicle_type = "";
        this.formModel.fare = "";
        document.querySelector("#vehicle-type").focus();
      }
    };
  },
};
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
