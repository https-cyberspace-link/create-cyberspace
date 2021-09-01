import LoginHeader from './component/header/index.vue'
export default {
  name: 'login',
  components: {
    LoginHeader
  },
  watch: {
    $route: {
      handler (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    const triggerEnter = (event) => {
      if (event.keyCode === 13 || event.keyCode === 100) {
        this.submitLogin()
        return false
      }
    }
    window.addEventListener('keydown', triggerEnter, false)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keydown', triggerEnter, false)
    })
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      loading: false,
      redirect: '/',
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码错误，请重新输入', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    submitLogin () {
      this.$refs.form.validate(async (valid) => {
        this.loading = true
        if (valid) {
          await this.$store.dispatch('user/login', this.form)
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        }
        this.loading = false
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },

    // 飞书登录
    feishuLogin () {
      this.$message.warning('暂不支持')
    },
    // 验证码登录
    codeLogin () {
      this.$message.warning('暂不支持')
    }
  },
  destroyed () {
    this.loading = false
  }
}
