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

<script setup>
import moment from "moment";
const formModel = ref({});
const formErrors = ref({});
const location = ref({});
const parkingGateList = ref([]);
const vehicleTypeList = ref([]);
const instance = getCurrentInstance();

const setFare = () => {
  let vehicle = vehicleTypeList.value.find(
    (vt) => vt.name == formModel.value.vehicle_type
  );

  if (vehicle) {
    formModel.value.fare = formModel.value.is_member ? 0 : vehicle.tarif_flat;
    instance?.proxy?.$forceUpdate();
  }

  document.querySelector("#plate-number").focus();
};

const resetForm = () => {
  let default_vehicle = vehicleTypeList.value.find((v) => v.is_default == 1);
  formModel.value.plate_number = location.value.default_plate_number;

  if (default_vehicle) {
    formModel.value.vehicle_type = default_vehicle.name;
    formModel.value.fare = default_vehicle.tarif_flat;
  } else {
    formModel.value.vehicle_type = "";
    formModel.value.fare = "";
  }

  instance?.proxy?.$forceUpdate();
  document.querySelector("#plate-number").focus();
};

const submit = () => {
  if (
    !formModel.value.gate_in_id ||
    !formModel.value.plate_number ||
    !formModel.value.vehicle_type
  ) {
    return;
  }

  let params = { plate_number: formModel.value.plate_number };
  api("/parkingMember/search", { params })
    .then((r) => {
      formModel.value.fare = 0;
      formModel.value.is_member = 1;
      formModel.value.member_id = r.id;
    })
    .catch((e) => {
      formModel.value.is_member = 0;
      formModel.value.member_id = null;
    })
    .finally(() => {
      formModel.value.time_in = moment().format("YYYY-MM-DD HH:mm:ss");
      api("/parkingTransaction", {
        method: "POST",
        body: formModel.value,
      });
    });
};

onMounted(() => {
  document.querySelector("#plate-number").focus();

  document.querySelector("#gate-in-app").onkeypress = (e) => {
    // ke field nomor plat
    if (e.key == "-") {
      e.preventDefault();
      resetForm();
      instance?.proxy?.$forceUpdate();
      document.querySelector("#plate-number").focus();
    }

    // ke field jenis kendaraan
    if (e.key == "*") {
      e.preventDefault();
      formModel.value.vehicle_type = "";
      formModel.value.fare = "";
      document.querySelector("#vehicle-type").focus();
    }
  };
});
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
