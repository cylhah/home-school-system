<template>
  <div class="login">
    <div class="top">
      <router-link to="/">
        <i class="el-icon-close"/>
      </router-link>
    </div>
    <div class="main">
      <p class="title">登录注册</p>
      <p class="tip">未注册的邮箱，验证后即可完成注册</p>
      <div class="form">
        <div class="input-contain">
          <input
            maxlength="22"
            v-model="email" type="text" class="common username" placeholder="邮箱号"><label @click="getCode" class="get-code">获取验证码</label>
        </div>
        <div class="input-contain">
          <input
            v-model="codeInput" type="text" class="common" placeholder="请输入验证码">
        </div>
        <div class="input-contain">
          <input v-model="password" :type="inputType" class="common password" placeholder="密码"><i v-show="password" class="iconfont icon-eye1" @click="showPass" :style="{ color: eyeColor}"/>
        </div>
        <div class="login-btn">
          <button @click="register">注册</button>
        </div>
        <div class="options">
          <div class="free">
            <router-link to="/login">
              帐号密码登录
            </router-link>
          </div>
          <div class="forget">
            <router-link to="/login">
              收不到验证码？
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="third-party">
      <div class="intro">
        第三方登录
      </div>
      <div class="third-party-login">
        <i class="iconfont icon-yooxi"/>
        <i class="iconfont icon-qq"/>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      email: '',
      password: '',
      codeInput: '',
      inputType: 'password',
      code: 0,
      eyeColor: 'rgb(205, 205, 205)'
    }
  },
  methods: {
    async getCode () {
      let emailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      if (!(emailReg.test(this.email))) {
        this.$message({
          message: '邮箱格式错误',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        const { data } = await this.$store.dispatch('user/getCode', { email: this.email })
        this.code = data.data
      }
    },
    showPass () {
      let dict = {
        password: 'text',
        text: 'password'
      }
      this.inputType = dict[this.inputType]
      this.eyeColor = this.inputType === 'password' ? 'rgb(205, 205, 205)' : 'black'
    },
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
    async register () {
      if (parseInt(this.codeInput) === this.code) {
        const { data } = await this.$store.dispatch('user/register', { userName: this.email, userPassword: this.encrypt(this.password) })
        if (data.code === 0) {
          this.$router.push({ path: '/login' })
        }
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
  .main {
    margin-top: 100px;
    .title {
      text-align: center;
      font-size: 25px;
      margin-bottom: 10px;
    }
    .tip {
      text-align: center;
      font-size: 16px;
      margin-bottom: 30px;
      color: rgb(173, 173, 173);
    }
    .form {
      padding: 0 20px;
      .input-contain {
        position: relative;
        .common {
          width: 100%;
          border: 1px solid rgb(205, 205, 205);
          box-sizing: border-box;
          height: 45px;
          padding: 10px;
          outline: none;
        }
        .username {
          border-radius: 5px 5px 0 0;
          border-bottom: none;
        }
        .password {
          border-radius: 0 0 5px 5px;
        }
        .get-code {
          position: absolute;
          color: rgb(54, 188, 73);
          right: 10px;
          top: 14px;
        }
        i {
          position: absolute;
          color: rgb(205, 205, 205);
          right: 10px;
          top: 14px;
        }
      }
      .login-btn {
        margin-top: 20px;
        margin-bottom: 30px;
        button {
          width: 100%;
          height: 50px;
          color: #fff;
          background: rgb(66, 189, 86);
          font-size: 16px;
          outline: none;
          border: none;
          border-radius: 5px;
          box-sizing: border-box;
        }
      }
      .options {
        display: flex;
        justify-content: space-between;
        .free {
          a {
            color: rgb(66, 189, 86);
            text-decoration: none;
          }
        }
        .forget {
          a {
            color: rgb(173, 173, 173);
            text-decoration: none;
          }
        }
      }
    }
  }
  .third-party {
    position: absolute;
    width: 100%;
    height: 180px;
    bottom: 0;
    .intro {
      color: rgb(173, 173, 173);
      margin-bottom: 20px;
      text-align: center;
      width: 100%;
      font-size: 14px;
    }
    .third-party-login {
      position: relative;
      margin: 0 auto;
      width: 45%;
      display: flex;
      justify-content: space-between;
      i {
        font-size: 28px;
        padding: 20px;
        border-radius: 50%;
        box-shadow: 0 1px 2px rgb(173, 173, 173);
      }
      .icon-yooxi {
        color: rgb(54, 188, 73);
      }
      .icon-qq {
        color: rgb(48, 165, 211);
      }
    }
  }
}
</style>
