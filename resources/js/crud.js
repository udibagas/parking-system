export default {

  mounted() {
    this.requestData();
  },

  data() {
    return {
      tableData: [],
      formModel: {},
      formErrors: {},
      loading: false,
      showForm: false,
      keyword: "",
      page: 1,
      sortColumn: 'nama',
      sortOrder: 'asc',
      pagination: { total: 0, from: 0, to: 0 },
      pageSize: 10,
      pageSizes: [10, 20, 50, 100]
    }
  },

  methods: {

    save() {
      this.loading = true;

      axios({
        method: this.formModel.id ? 'PUT' : 'POST',
        url: this.formModel.id ? `${this.url}/${this.formModel.id}` : this.url,
        data: this.formModel
      }).then(r => {
        this.closeForm();
        this.showMessage(r.data.message, 'success');
        this.requestData();
      }).catch(e => {
        if (e.response.status == 422) {
          this.formErrors = e.response.data.errors
        }
        this.showMessage(e.response.data.message, 'error');
      }).finally(() => this.loading = false);
    },

    requestData() {
      this.loading = true;

      const params = {
        page: this.page,
        sortColumn: this.sortColumn,
        sortOrder: this.sortOrder,
        keyword: this.keyword
      };

      axios.get(this.url, { params }).then(r => {
        this.tableData = r.data;
      }).catch(e => {
        this.showMessage(e.response.data.message, 'error');
      }).finally(() => this.loading = false);
    },

    refreshData() {
      this.page = 1;
      this.keyword = '';
      this.requestData();
    },

    deleteData(id) {
      this.$confirm('Anda yakin?', 'Konfirmasi', { type: 'warning' }).then(() => {
        this.loading = true;
        axios.delete(`${this.url}/${id}`).then(r => {
          this.showMessage(r.data.message, 'success');
          this.requestData();
        }).catch(e => {
          this.showMessage(e.response.data.message, 'error');
        }).finally(() => this.loading = false);
      }).catch(e => console.log(e))
    },

    openForm(data) {
      this.formModel = JSON.parse(JSON.stringify(data));
      this.formErrors = {};
      this.showForm = true;
    },

    closeForm() {
      this.formModel = {};
      this.showForm = false;
      this.formErrors = {};
    },

    showMessage(message, type) {
      this.$message({
        message: message,
        type: type,
        showClose: true,
        duration: 5000
      });
    }

  }

}
