<template>
  <div class="login">
    <div class="form">
      <div class="head">
        <p>管理员登录</p>
      </div>
      <div class="form-item">
        <i class="iconfont icon-user"/>
        <input
          v-model="username"
          placeholder="用户名"
          type="text">
      </div>
      <div class="form-item">
        <i class="iconfont icon-suo"/>
        <input
          v-model="password"
          placeholder="密码"
          type="password">
      </div>
      <div class="mylogin">
        <button
          class="login-btn"
          @click="login">登录</button>
      </div>
      <div
        v-show="warning"
        class="warning-div">
        <i class="el-icon-warning"/>
        <label class="warning">{{warning}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      username: '',
      password: '',
      warning: ''
    }
  },
  methods: {
    encrypt (word) {
      let key = CryptoJS.enc.Utf8.parse('1234567890000000')
      let iv = CryptoJS.enc.Utf8.parse('1234567890000000')
      let encrypted = ''
      let srcs = CryptoJS.enc.Utf8.parse(word)
      encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.ciphertext.toString()
    },
    async login () {
      await this.$store.dispatch('user/login', { userName: this.username, userPassword: this.encrypt(this.password) })
      if (this.$store.state.user.userInfo.userType === 'admin') {
        this.$router.push({ path: '/admin' })
      } else {
        this.warning = '用户名或密码错误'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  background: url('../../assets/img/login-bg.jpg') no-repeat;
  background-size: 100% 100%;
  .form {
    width: 400px;
    padding: 30px 0 30px 0;
    position: relative;
    margin: 120px auto;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    .head {
      color: #777;
      margin-bottom: 35px;
      text-align: center;
    }
    .warning-div {
      line-height: 26px;
      margin-top: 10px;
      font-size: 14px;
      color: #b74d46;
      margin-left: 120px;
    }
    .form-item {
      position: relative;
      width: 300px;
      margin: 10px auto;
      .icon-user {
        color: #777;
      }
      i {
        padding: 8px 20px;
        background: rgb(246, 246, 246);
        border-radius: 5px 0 0 5px;
        border-right: 1px solid rgb(230, 223, 223);
      }
      input {
        position: relative;
        left: -5px;
        top: -2px;
        box-sizing: border-box;
        width: 230px;
        height: 33px;
        border-radius: 0 5px 5px 0;
        outline: none;
        border: 1px solid rgb(246, 246, 246);
        border-left: none;
        padding: 10px;
        &:focus {
          box-shadow: 0 0 10px rgb(64, 158, 254);
        }
      }
    }
    .mylogin {
      width: 287px;
      position: relative;
      left: -7px;
      margin: 20px auto;
      .login-btn {
        width: 100%;
        padding: 7px 0;
        background: rgb(64, 158, 254);
        border: none;
        color: #fff;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgb(39, 139, 240);
        }
      }
    }
  }
}
</style>
