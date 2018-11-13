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
          <el-menu-item index="4-1">退出</el-menu-item>
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
    <div class="main">
      <div class="nav">
        <router-link to="/admin" :class="{ active: activeIndex==0 }">
          <i class="iconfont icon-user"/>用户流量查询
        </router-link>
        <router-link to="/admin/userInfo" :class="{ active: activeIndex==1 }">
          <i class="iconfont icon-user"/>用户数据管理
        </router-link>
        <router-link to="/admin/news" :class="{ active: activeIndex==2 }">
          <i class="iconfont icon-user"/>动态管理
        </router-link>
        <router-link to="/admin/allAdmins" :class="{ active: activeIndex==3 }">
          <i class="iconfont icon-user"/>管理员查询
        </router-link>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
