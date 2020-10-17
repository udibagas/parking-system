<template>
	<el-tabs>
		<el-tab-pane label="TRANSAKSI PARKIR">
			<ParkingTransaction />
		</el-tab-pane>
		<el-tab-pane label="BUKA MANUAL">
			<ManualOpenLog />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import ParkingTransaction from "./ParkingTransaction";
import ManualOpenLog from "./ManualOpenLog";

export default {
	components: { ParkingTransaction, ManualOpenLog },
};
</script>
