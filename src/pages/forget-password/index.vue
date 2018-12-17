<template>
  <div class="forget-password">
    <div class="top">
      <i class="el-icon-arrow-left" @click="$router.back(-1)"/>
    </div>
    <div class="main">
      <h1>请输入验证码</h1>
      <p class="send-to">验证码已发送至 <span>{{$route.query.userEmail}}</span></p>
      <div class="code-input" @click="inputFocus" ref="codeContainer">
        <div class="vertical-line" :style="{ left: `${getLeft()}px` }" :class="{ vHide: code.length >= 6 }"></div>
        <input maxlength="6" type="text" v-model="code" class="code-input-text" autofocus @blur="codeBlur" ref="codeInput">
        <div class="code-box">{{ code[0] }}</div>
        <div class="code-box">{{ code[1] }}</div>
        <div class="code-box">{{ code[2] }}</div>
        <div class="code-box">{{ code[3] }}</div>
        <div class="code-box">{{ code[4] }}</div>
        <div class="code-box">{{ code[5] }}</div>
      </div>
      <div class="tip">
        输入正确的验证码后即可获取密码
      </div>
      <div class="btn">
        <el-button type="primary" :disabled="count>0" @click="getCode">{{btnContent}}</el-button>
      </div>
      <div v-if="password">
        <p>您的密码是：{{ password }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      code: '',
      count: 30,
      btnContent: '30秒后重新发送',
      verifyCode: '',
      password: ''
    }
  },
  methods: {
    decrypt (word) {
      let key = CryptoJS.enc.Utf8.parse('1234567890000000')
      let iv = CryptoJS.enc.Utf8.parse('1234567890000000')
      let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
      let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
      return decryptedStr.toString()
    },
    codeBlur (e) {
      e.target.focus()
    },
    async getCode () {
      const { data } = await this.$store.dispatch('user/getForgetPasswordCode', { userEmail: this.$route.query.userEmail })
      if (data.code === 0) {
        this.verifyCode = String(data.data)
        this.count = 30
        this.btnContent = `${this.count}秒后重新发送`
        let tik = setInterval(() => {
          this.count--
          this.btnContent = `${this.count}秒后重新发送`
          if (this.count <= 0) {
            clearInterval(tik)
            this.btnContent = '发送验证码'
          }
        }, 1000)
      }
    },
    inputFocus () {
      this.$refs.codeInput.focus()
    },
    getLeft () {
      let windowWidth = window.screen.availWidth
      let slot = (windowWidth * 0.8 - 6 * 40) / 5
      let step = 40 + slot
      return 20 + this.code.length * step
    }
  },
  watch: {
    async code (curVal, oldVal) {
      if (curVal.length === 6 && curVal === this.verifyCode) {
        const { data } = await this.$store.dispatch('user/getUserPasswordByUserName', { userName: this.$route.query.userEmail })
        this.password = this.decrypt(data.data)
      }
    }
  },
  mounted () {
    this.getCode()
  }
}
</script>

<style lang="scss" scoped>
@keyframes blink {
  0% {
    visibility: visible;
  }
  50% {
    visibility: visible;
  }
  51% {
    visibility: hidden;
  }
  100% {
    visibility: hidden;
  }
}
.forget-password {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgb(250, 250, 250);
  .top {
    width: 100%;
    color: rgb(51, 204, 189);
    background: #fff;
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    flex-shrink: 0;
    font-size: 25px;
  }
  .main {
    width: 80%;
    margin: 50px auto;
    h1 {
      letter-spacing: 3px;
      font-size: 25px;
      margin: 20px 0;
    }
    .send-to {
      margin-bottom: 40px;
    }
    .code-input {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .vertical-line {
        position: absolute;
        top: 10px;
        animation: blink 0.8s infinite;
        width: 3px;
        height: 20px;
        background: rgb(51, 204, 189);
      }
      .vHide {
        display: none;
      }
      .code-box {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(90, 87, 87);
      }
      .code-input-text {
        position: absolute;
        z-index: -1;
      }
    }
    .tip {
      margin-bottom: 25px;
      font-size: 15px;
      letter-spacing: 2px;
      color: rgb(197, 197, 197);
    }
    .btn {
      margin-bottom: 20px;
    }
  }
}
</style>
