<template>
  <div class="admin">
    <div class="top">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="hover"
        @select="handleSelect"
        background-color="#09192a"
        text-color="#fff"
        active-text-color="#fff">
        <router-link
          class="title"
          to="/">Home-School Management</router-link>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-user"/>
          </template>
          <el-menu-item index="modifyPassword">修改密码</el-menu-item>
          <el-menu-item index="exit">退出</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont icon-letter"/>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-tasks"/>
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-bell"/>
          </template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirm" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="modifyPWD" type="primary">确认修改</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <div class="nav">
        <router-link to="/admin" :class="{ active: activeIndex==0 }">
          <i class="iconfont icon-chart"/>用户流量查询
        </router-link>
        <router-link to="/admin/userInfo" :class="{ active: activeIndex==1 }">
          <i class="iconfont icon-user"/>用户数据管理
        </router-link>
        <router-link to="/admin/news" :class="{ active: activeIndex==2 }">
          <i class="iconfont icon-form"/>动态管理
        </router-link>
        <router-link to="/admin/allAdmins" :class="{ active: activeIndex==3 }">
          <i class="iconfont icon-table"/>管理员查询
        </router-link>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      activeIndex: 0,
      dialogVisible: false,
      oldPWD: '',
      form: {}
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  methods: {
    handleSelect (key, keyPath) {
      if (key === 'exit') {
        this.$store.dispatch('user/exit')
        this.$router.push({ path: 'adminLogin' })
      } else if (key === 'modifyPassword') {
        this.dialogVisible = true
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getActiveIndex (routePath) {
      let path = routePath.split('/')
      if (!path[2]) {
        this.activeIndex = 0
      } else {
        let dict = {
          news: 2,
          userInfo: 1,
          allAdmins: 3
        }
        this.activeIndex = dict[path[2]]
      }
    },
    exit () {
      this.$store.dispatch('user/exit')
    },
    async modifyPWD () {
      if (!this.oldPWD) {
        const { data } = await this.$store.dispatch('admin/getUserPassword', { userId: this.userInfo.userId })
        this.oldPWD = data.data
        console.log(this.oldPWD)
      }
      let cryptoPWD = CryptoJS.MD5(this.form.oldPassword).toString()
      if (cryptoPWD !== this.oldPWD) {
        this.$message({
          message: '原密码错误',
          type: 'error'
        })
      } else {
        if (!this.form.password || !this.form.confirm) {
          this.$message({
            message: '请填写密码',
            type: 'warning'
          })
        } else if (this.form.password !== this.form.confirm) {
          this.$message({
            message: '两次密码输入不一致',
            type: 'warning'
          })
        } else {
          let newPassword = CryptoJS.MD5(this.form.password).toString()
          await this.$store.dispatch('admin/modifyPassword', { userId: this.userInfo.userId, userPassword: newPassword })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getActiveIndex(to.path)
    next()
  },
  created () {
    this.getActiveIndex(this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
.el-submenu {
  float: right;
}
.admin {
  .top {
    position: relative;
    .el-menu-demo {
      line-height: 61px;
    }
    .title {
      margin-left: 20px;
      color: #fff;
      font-size: 25px;
      text-decoration: none;
    }
  }
  .main {
    display: flex;
    .nav {
      position: relative;
      flex-shrink: 0;
      top: -1px;
      color: white;
      background: #09192a;
      width: 260px;
      min-height: 900px;
      .active {
        background: rgb(34, 80, 129);
      }
      a {
        color: #fff;
        text-decoration: none;
        display: block;
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        padding-left: 10px;
        i {
          margin-right: 10px;
        }
      }
    }
    .content {
      padding: 30px;
      width: 100%;
      background: #E5EBF2;
    }
  }
}
</style>
