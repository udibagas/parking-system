<template>
  <div>
    <el-form inline @submit.native.prevent class="text-right">
      <el-form-item style="margin-bottom: 0">
        <el-button
          size="small"
          type="danger"
          :icon="Delete"
          @click="deleteSnapshot"
          :disabled="checkedNodes.length == 0"
          >HAPUS SNAPSHOT</el-button
        >
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <el-button
          :icon="Refresh"
          type="primary"
          plain
          size="small"
          @click="refresh"
        ></el-button>
      </el-form-item>
    </el-form>

    <div style="display: flex">
      <div class="file-browser">
        <el-tree
          v-if="show"
          :props="props"
          :load="loadNode"
          ref="tree"
          lazy
          show-checkbox
          highlight-current
          node-key="path"
          @node-click="({ isFile, url }) => (url = isFile ? url : '')"
          @check="(node, tree) => (checkedNodes = tree.checkedNodes)"
        >
        </el-tree>
      </div>

      <div class="img-container">
        <img :src="url" alt="" style="width: 100%" />
      </div>
    </div>
  </div>
</template>

<script setup>
const url = ref("");
const show = ref(true);
const checkedNodes = ref([]);
const props = ref({ label: "label", isLeaf: "isLeaf" });
const instance = getCurrentInstance();

const loadNode = (node, resolve) => {
  const params = {
    directory: node.data === undefined ? "snapshots" : node.data.path,
  };

  api("/api/snapshot", { params }).then((response) => resolve(response));
};

const deleteSnapshot = () => {
  ElMessageBox.confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
    .then(() => {
      return api("/api/snapshot/delete", {
        method: "POST",
        body: {
          checkedNodes: this.checkedNodes,
        },
      });
    })
    .then((r) => {
      url.value = "";
      ElMessage({ message: r.message, type: "success" });
      // TODO
      // checkedNodes.value.forEach((node) => $refs.tree.remove(node));
      checkedNodes.value = [];
    })
    .catch((e) => console.log(e));
};

const refresh = () => {
  show.value = false;
  instance?.proxy?.$nextTick(() => (show.value = true));
};
</script>

<style scoped>
.file-browser {
  padding: 15px;
  border: 1px solid #ddd;
  width: 400px;
  height: calc(100vh - 270px);
  overflow: auto;
  flex-shrink: 0;
}

.img-container {
  flex-grow: 1;
  padding: 15px;
}
</style>
