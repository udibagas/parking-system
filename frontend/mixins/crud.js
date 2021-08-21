export default {
  data() {
    return {
      showForm: false,
      formErrors: {},
      formModel: {},
      keyword: '',
      page: 1,
      pageSize: 10,
      tableData: {},
      sort: 'name',
      order: 'ascending',
      filters: {},
      loading: false,
    }
  },
  methods: {
    sortChange(c) {
      if (c.prop != this.sort || c.order != this.order) {
        if (c.prop == 'ascending') {
          this.sort = 'asc'
        } else if (c.prop == 'descending') {
          this.sort = 'desc'
        } else {
          this.sort = null
        }

        this.order = c.order
        this.requestData()
      }
    },

    currentChange(page) {
      this.page = page
      this.requestData()
    },

    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.requestData()
    },

    filterChange(filter) {
      this.filters = { ...this.filters, ...filter }
      this.page = 1
      this.requestData()
    },

    openForm(data) {
      this.formErrors = {}
      this.formModel = { ...data }
      this.showForm = true
    },

    save() {
      this.loading = true

      this.$axios({
        url: this.formModel.id ? `${this.url}/${this.formModel.id}` : this.url,
        method: this.formModel.id ? 'PUT' : 'POST',
        data: this.formModel,
      })
        .then((r) => {
          this.showForm = false
          this.$message({
            message: 'Data berhasil disimpan.',
            type: 'success',
            showClose: true,
          })
          this.requestData()
          this.afterSave()
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.formErrors = e.response.data.errors
          } else {
            this.formErrors = {}
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    afterSave() {
      // please override
    },

    afterDelete() {
      // please override
    },

    deleteData(id) {
      this.$confirm('Anda yakin akan menghapus data ini?', 'Warning', {
        type: 'warning',
      })
        .then(() => {
          this.$axios.$delete(`${this.url}/${id}`).then((r) => {
            this.requestData()
            this.afterDelete()
            this.$message({
              message: r.message,
              type: 'success',
              showClose: true,
            })
          })
        })
        .catch(() => console.log(e))
    },

    searchData(v) {
      this.page = 1
      this.keyword = v
      this.requestData()
    },

    refreshData() {
      this.page = 1
      this.keyword = ''
      this.filters = {}
      this.requestData()
    },

    closeForm() {
      this.showForm = false
      this.formModel = {}
      this.formErrors = {}
    },

    requestData() {
      let params = {
        page: this.page,
        keyword: this.keyword,
        pageSize: this.pageSize,
        sort: this.sort,
        order: this.order == 'descending' ? 'desc' : 'asc',
        paginated: true,
        ...this.filters,
      }

      this.loading = true
      this.$axios
        .$get(this.url, { params })
        .then((response) => {
          this.loading = false
          this.tableData = response

          if (response.meta) {
            const { from, to, total } = response.meta
            this.tableData = {
              ...this.tableData,
              from,
              to,
              total,
            }
          }
        })
        .finally(() => (this.loading = false))
    },
  },
  mounted() {
    this.requestData()
  },
}
