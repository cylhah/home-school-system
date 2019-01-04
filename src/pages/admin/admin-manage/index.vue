<template>
  <div class="admin-manage">
    <div class="admin-list">
      <el-table
        :data="adminList"
        border
        style="height:100%">
        <el-table-column
          label="日期"
          sortable="true"
          width="180">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.userRegisterTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="240">
        </el-table-column>
        <el-table-column
          prop="userNickname"
          label="昵称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteAdmin(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="admin-me">
        <div class="admin-bg">
          <img src="../../../assets/img/admin-bg.jpg">
        </div>
        <div class="admin-head">
          <img :src="userHeadUrl" @click="$refs.headFile.click()">
          <input type="file" @change="fileChange" ref="headFile" style="display: none">
        </div>
        <div class="intro">
          <p class="admin-name">cylemon</p>
          <p class="description">michael24</p>
          <p class="des">"Lamborghini Mercy</p>
          <p class="des">Your chick she so thirsty</p>
          <p class="des">I'm in that two seat Lambo"</p>
        </div>
      </div>
    </div>
    <div class="add-admin">
      <p class="title">添加管理员</p>
      <el-form label-position="right" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirm" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        confirm: ''
      },
      userHeadUrl: ''
    }
  },
  computed: mapState({
    adminList: state => state.admin.adminList,
    userInfo: state => state.user.userInfo
  }),
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
    deleteAdmin (row) {
      this.$store.dispatch('admin/deleteAdmin', { userId: row.userId })
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    formatTime (time) {
      let date = new Date(time)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
    async fileChange (e) {
      if (e.target.files[0]) {
        this.userHeadUrl = window.URL.createObjectURL(e.target.files[0])
        let formData = new FormData()
        formData.append('head', e.target.files[0])
        await this.$store.dispatch('user/uploadHead', { userId: this.userInfo.userId, formData })
      }
    },
    async onSubmit () {
      const { data } = await this.$store.dispatch('admin/addAdmin',
        {userName: this.form.username, userPassword: this.encrypt(this.form.password)})
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      console.log(data)
    }
  },
  created () {
    this.userHeadUrl = this.userInfo.userHeadUrl
  },
  mounted () {
    this.$store.dispatch('admin/getAdminList')
  }
}
</script>

<style lang="scss" scoped>
.admin-manage {
  .admin-list {
    display: flex;
    justify-content: space-between;
    .admin-me {
      position: relative;
      width: 380px;
      margin-left: 20px;
      .admin-bg {
        position: absolute;
        height: 125px;
        overflow: hidden;
        img {
          width: 380px;
        }
      }
      .admin-head {
        position: absolute;
        left: 128px;
        top: 70px;
        img {
          width: 124px;
          height: 124px;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid #fff;
        }
      }
      .intro {
        height: 250px;
        margin-top: 125px;
        box-sizing: border-box;
        background: #fff;
        text-align: center;
        padding-top: 90px;
        .admin-name {
          font-weight: 700;
          font-size: 25px;
          color: #f96332;
          font-family: fantasy;
          margin-bottom: 15px;
        }
        .description {
          color: #9A9A9A;
          font-weight: 300;
          margin-bottom: 20px;
        }
        .des {
          color: #9A9A9A;
          font-weight: 300;
          line-height: 25px;
        }
      }
    }
  }
  .add-admin {
    margin-top: 40px;
    .title {
      font-weight: bold;
      font-size: 25px;
      padding: 10px 0;
      border-bottom: 1px solid rgb(202, 200, 200);
      margin-bottom: 20px;
    }
  }
}
</style>
