<template>
  <div>
    <form @submit.prevent class="flex justify-content-end">
      <el-button
        size="small"
        type="danger"
        :icon="Delete"
        @click="deleteSnapshot"
        :disabled="checkedNodes.length == 0"
        >HAPUS SNAPSHOT</el-button
      >
      <el-button
        :icon="Refresh"
        type="primary"
        plain
        size="small"
        @click="refresh"
      ></el-button>
    </form>

    <div style="display: flex">
      <div class="file-browser">
        <el-tree
          v-if="show"
          :props="props"
          :load="loadNode"
          ref="treeRef"
          lazy
          show-checkbox
          highlight-current
          node-key="path"
          @node-click="onNodeClick"
          @check="(node, tree) => (checkedNodes = tree.checkedNodes)"
        >
        </el-tree>
      </div>

      <div class="img-container">
        <img :src="imageURL" alt="" style="width: 100%" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Delete, Refresh } from "@element-plus/icons-vue";

const api = useApi();
const imageURL = ref("");
const show = ref(true);
const checkedNodes = ref([]);
const props = ref({ label: "label", isLeaf: "isLeaf" });
const treeRef = ref("");

const loadNode = (node, resolve) => {
  const params = {
    directory: node.data == false ? "snapshots" : node.data.path,
  };

  api("/api/snapshot", { params }).then((response) => resolve(response));
};

const deleteSnapshot = () => {
  ElMessageBox.confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
    .then(() => {
      return api("/api/snapshot/delete", {
        method: "POST",
        body: {
          checkedNodes: checkedNodes.value,
        },
      });
    })
    .then((r) => {
      imageURL.value = "";
      ElMessage({ message: r.message, type: "success" });
      checkedNodes.value.forEach((node) => treeRef.value.remove(node));
      checkedNodes.value = [];
    })
    .catch((e) => console.log(e));
};

const onNodeClick = ({ isLeaf, url }) => {
  if (isLeaf) {
    imageURL.value = url;
  }
};

const refresh = () => {
  show.value = false;
  nextTick(() => (show.value = true));
};
</script>

<style scoped>
.file-browser {
  padding: 15px;
  border: 1px solid #ddd;
  width: 400px;
  height: calc(100vh - 212px);
  overflow: auto;
  flex-shrink: 0;
}

.img-container {
  flex-grow: 1;
  padding: 15px;
}
</style>
