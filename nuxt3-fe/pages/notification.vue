<template>
  <el-tabs>
    <el-tab-pane lazy label="SNAPSHOT">
      <NotificationSnapshot />
    </el-tab-pane>

    <el-tab-pane lazy label="ABSENSI OPERATOR">
      <AbsensiOperator />
    </el-tab-pane>

    <el-tab-pane lazy label="LOG USER">
      <NotificationUserLog />
    </el-tab-pane>

    <el-tab-pane lazy label="LOG GATE MASUK">
      <NotificationControllerLog url="/api/controller-log" />
    </el-tab-pane>

    <el-tab-pane lazy label="LOG GATE KELUAR">
      <NotificationControllerLog url="/api/uhf-log" />
    </el-tab-pane>
  </el-tabs>
</template>
