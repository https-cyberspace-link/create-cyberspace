import { deepClone } from '@/utils/utils.js'

// 分页 mixin
export const PageMixin = {
  data () {
    return {
      loading: false,

      pagination: {
        sizes: [10, 20, 30, 50, 100],
        size: 10,
        total: 0,
        page: 1
      },

      tableData: []
    }
  },
  methods: {
    // size change
    handleSizeChange (size) {
      this.pagination.size = size

      const page = 1
      this.query(page)
    },
    // page change
    handlePageChange (page) {
      this.pagination.page = page
      this.query(page)
    },
    // 查询
    query (page = 1) {
      if (typeof page !== 'number') {
        page = 1
      }
      this.loading = true
      const { size } = this.pagination
      const params = {
        page,
        size,
        ...this.getQuery()
      }
      this.requestList(params)
    },
    // 赋值
    mutator (res) {
      const { total, list } = res.data
      this.pagination.total = total
      this.tableData = list
      this.loading = false
    }
  }
}

// form mixin
export const FormMxin = {
  data () {
    return {
      cache: {
        form: null
      },
      disabled: false
    }
  },
  created () {
    this.resetForm()
  },
  methods: {
    resetFields (formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    clearValidate (formName) {
      this.$refs[formName] && this.$refs[formName].clearValidate()
    },
    resetForm () {
      if (this.cache.form) {
        for (const key in this.cache.form) {
          this.form[key] = this.cache.form[key]
        }
      } else {
        this.cache.form = deepClone(this.form)
      }
      this.formName && this.clearValidate(this.formName)
    },
    validate () {
      this.formName && this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.disabled = true
          this.sureForm()
        } else {
          this.$message.warning('请正确填写后再提交~')
        }
      })
    }
  }
}

// 弹框 mixin
export const DialogMixin = {
  data () {
    return {
      dialog: {
        visible: false,
        title: '新增'
      }
    }
  },
  methods: {
    open () {
      this.resetForm()
      this.disabled = false
      this.dialog.visible = true
    },
    close () {
      this.dialog.visible = false
    },
    handleClose (done) {
      this.resetForm()
      done()
    }
  }
}
