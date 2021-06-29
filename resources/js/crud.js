export default {
  data() {
    return {
      showForm: false,
      formErrors: {},
      error: {},
      formModel: {},
      keyword: '',
      page: 1,
      pageSize: 10,
      tableData: {},
      sort: 'name',
      order: 'ascending',
      filters: {},
      loading: false
    }
  },
  methods: {
    sortChange(c) {
      if (c.prop != this.sort || c.order != this.order) {
        this.sort = c.prop; this.order = c.order; this.requestData()
      }
    },

    currentChange(page) {
      this.page = page;
			this.requestData();
    },

    sizeChange(pageSize) {
      this.pageSize = pageSize;
			this.requestData();
    },

    openForm(data) {
      this.error = {}
      this.formErrors = {}
      this.formModel = Object.assign({}, data);
      this.showForm = true
    },

    save() {
      this.loading = true;

      axios({
        url: this.formModel.id ? `${this.url}/${this.formModel.id}` : this.url,
        method: this.formModel.id ? 'PUT' : 'POST',
        data: this.formModel
      })
        .then(r => {
          this.showForm = false
          this.$message({
            message: 'Data berhasil disimpan.',
            type: 'success',
            showClose: true
          });
          this.requestData()
        })
        .catch(e => {
          if (e.response.status == 422) {
            this.error = {}
            this.formErrors = e.response.data.errors;
          }

          if (e.response.status == 500) {
            this.formErrors = {}
            this.error = e.response.data;
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    deleteData(id) {
      this.$confirm('Anda yakin akan menghapus data ini?', 'Warning', { type: 'warning' }).then(() => {
        axios.delete(`${this.url}/${id}`).then(r => {
          this.requestData();
          this.$message({
            message: r.data.message,
            type: 'success',
            showClose: true
          });
        }).catch(e => {
          this.$message({
            message: e.response.data.message,
            type: 'error',
            showClose: true
          });
        })
      }).catch(() => console.log(e));
    },

    searchData(v) {
      this.page = 1;
      this.keyword = v;
      this.requestData();
    },

    refreshData() {
      this.page = 1;
      this.keyword = '';
      this.requestData();
    },

    requestData() {
      let params = {
        page: this.page,
        keyword: this.keyword,
        pageSize: this.pageSize,
        sort: this.sort,
        order: this.order,
        paginated: true
      }

      this.loading = true;
      axios.get(this.url, {params: params}).then(r => {
        this.loading = false;
        this.tableData = r.data
      })
        .catch(e => {
          this.$message({
            message: e.response.data.message,
            type: 'error',
            showClose: true
          });
        })
        .finally(() => (this.loading = false))
    }
  },

  mounted() {
    this.requestData();
  }
}
