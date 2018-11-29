<template>
  <div class="login">
    <div class="top">
      <router-link to="/">
        <i class="el-icon-close"/>
      </router-link>
    </div>
    <div class="main">
      <p class="title">登录家校通</p>
      <div class="form">
        <div class="input-contain">
          <input v-model="username" type="text" class="common username" placeholder="用户名/手机号"><i v-show="username" class="el-icon-error" @click="clear"/>
        </div>
        <div class="input-contain">
          <input v-model="password" :type="inputType" class="common password" placeholder="密码"><i v-show="password" class="iconfont icon-eye1" @click="showPass" :style="{ color: eyeColor}"/>
        </div>
        <div class="login-btn">
          <button>登录</button>
        </div>
        <div class="options">
          <div class="free">
            <router-link to="/register">
              注册
            </router-link>
          </div>
          <div class="forget">
            <router-link to="/login">
              找回密码
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
export default {
  data () {
    return {
      username: '',
      password: '',
      inputType: 'password',
      eyeColor: 'rgb(205, 205, 205)'
    }
  },
  methods: {
    clear () {
      this.username = ''
    },
    showPass () {
      let dict = {
        password: 'text',
        text: 'password'
      }
      this.inputType = dict[this.inputType]
      this.eyeColor = this.inputType === 'password' ? 'rgb(205, 205, 205)' : 'black'
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
      margin-bottom: 60px;
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
