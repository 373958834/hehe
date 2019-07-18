<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 账号:<el-input placeholder="请输入内容" v-model="input" clearable></el-input> -->
      <el-form ref="loginForm" :model="loginForm" :status-icon="true" :rules="loginRules" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style= "width:230px" ></el-input>
          <el-button style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" @keyup.enter.native="login()" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('格式不正确'))
      }
    }

    return {
      loginForm: {
        mobile: '17310625607',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    var _self = this

    document.onkeydown = function (e) {
      var key = window.event.keyCode

      if (key === 13) {
        _self.login()
      }
    }
  },
  beforeDestroy () {
    document.onkeydown = function (e) {
      var key = window.event.keyCode

      if (key === 13) {

      }
    }
  },

  methods: {

    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http
          //   .post(
          //     'authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     window.sessionStorage.setItem('hehe', JSON.stringify(res.data.data))
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          // this.router.push('/')
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hehe', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.login-box {
  width: 500px;
  height: 400px;
  padding: 0px 50px;
  position: absolute;
  background: url(../../assets/images/hh.jpeg) no-repeat center / cover;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  width: 200px;
  margin: 10px auto;
}
.demo-ruleForm {
  margin-top: 20px;
  /* text-align: center; */
  opacity: .6;
}
.el-form-item__label {
  color: #409eff;
}
</style>
