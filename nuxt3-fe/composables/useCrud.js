import exportFromJSON from "export-from-json";

export default (url) => {
  const api = useApi();
  const showForm = ref(false);
  const formErrors = ref({});
  const formModel = ref({});
  const keyword = ref("");
  const page = ref(1);
  const pageSize = ref(10);
  const tableData = ref({});
  const sort_prop = ref(null);
  const sort_order = ref(null);
  const filters = ref({});
  const loading = ref(false);

  const sortChange = ({ prop, order }) => {
    if (prop != sort_prop.value || order != sort_order.value) {
      if (order == "ascending") {
        sort_order.value = "asc";
      } else if (order == "descending") {
        sort_order.value = "desc";
      } else {
        sort_order.value = "asc";
      }

      sort_prop.value = prop;
      requestData();
    }
  };

  const currentChange = (p) => {
    page.value = p;
    requestData();
  };

  const sizeChange = (size) => {
    pageSize.value = size;
    requestData();
  };

  const filterChange = (filter) => {
    filters.value = { ...filters.value, ...filter };
    page.value = 1;
    requestData();
  };

  const openForm = (data) => {
    formErrors.value = {};
    formModel.value = { ...data };
    showForm.value = true;
  };

  const save = (cb) => {
    loading.value = true;
    api(formModel.value.id ? `${url}/${formModel.value.id}` : url, {
      method: formModel.value.id ? "PUT" : "POST",
      body: formModel.value,
    })
      .then((r) => {
        showForm.value = false;
        ElMessage({
          message: "Data berhasil disimpan.",
          type: "success",
          showClose: true,
        });

        requestData();
        if (typeof cb == "function") cb();
      })
      .catch((e) => {
        if (e.response.status == 422) {
          formErrors.value = e.response._data.errors;
        } else {
          formErrors.value = {};
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const deleteData = (id, cb) => {
    ElMessageBox.confirm("Anda yakin akan menghapus data ini?", "Warning", {
      type: "warning",
    })
      .then(() => {
        api(`${url}/${id}`, { method: "DELETE" }).then((r) => {
          requestData();
          if (typeof cb == "function") cb();
          ElMessage({
            message: r.message,
            type: "success",
            showClose: true,
          });
        });
      })
      .catch(() => console.log(e));
  };

  const searchData = () => {
    page.value = 1;
    requestData();
  };

  const refreshData = () => {
    page.value = 1;
    keyword.value = "";
    filters.value = {};
    requestData();
  };

  const closeForm = () => {
    showForm.value = false;
    formModel.value = {};
    formErrors.value = {};
  };

  const requestData = () => {
    let params = {
      page: page.value,
      keyword: keyword.value,
      pageSize: pageSize.value,
      sort_prop: sort_prop.value,
      sort_order: sort_order.value,
      paginated: true,
      ...filters.value,
    };

    // parse array
    for (let key in params) {
      if (Array.isArray(params[key])) {
        delete params[key];
        params[`${key}[0]`] = filters.value[key][0];
        params[`${key}[1]`] = filters.value[key][1];
      }
    }

    loading.value = true;
    api(url, { params })
      .then((response) => {
        loading.value = false;
        tableData.value = response;

        if (response.meta) {
          const { from, to, total } = response.meta;
          tableData.value = {
            ...tableData.value,
            from,
            to,
            total,
          };
        }
      })
      .finally(() => (loading.value = false));
  };

  const exportData = (fileName) => {
    const params = {
      sort_prop: sort_prop.value,
      sort_order: this.sort_order.value,
      ...filters.value,
      action: "export",
    };

    loading.value = true;
    api(url, { params })
      .then((data) => exportFromJSON({ data, fileName, exportType: "xls" }))
      .catch((e) => console.log(e))
      .finally(() => (loading.value = false));
  };

  const toRupiah = (value) => {
    if (!value) return "-";
    value = Number(value);
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  return {
    api,
    showForm,
    formErrors,
    formModel,
    keyword,
    page,
    pageSize,
    tableData,
    sort_prop,
    sort_order,
    filters,
    loading,
    sortChange,
    currentChange,
    sizeChange,
    filterChange,
    openForm,
    save,
    deleteData,
    searchData,
    refreshData,
    closeForm,
    requestData,
    exportData,
    toRupiah,
  };
};
