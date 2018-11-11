<template>
  <div class="login">
    <div class="form">
      <div class="form-item">
        <label>用户名</label>
        <input
          v-model="username"
          type="text">
      </div>
      <div class="form-item">
        <label>密码</label>
        <input
          v-model="password"
          type="password">
      </div>
      <div>
        <button @click="login">登录</button>
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
      password: ''
    }
  },
  methods: {
    login () {
      // e10adc3949ba59abbe56e057f20f883e
      this.$store.dispatch('user/login', this.username, CryptoJS.MD5(this.password).toString())
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
