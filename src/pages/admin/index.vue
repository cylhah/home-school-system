<template>
  <div class="admin">
    <div class="top">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        @select="handleSelect"
        background-color="#09192a"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link
          class="title"
          to="/">Home-School Management</router-link>
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
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-user"/>
          </template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
          <el-menu-item index="4-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="line"></div>
    <div class="main">
      <div class="nav">
        n
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
    }
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
  .line {
    position: absolute;
    background: #09192a;
    top: 61px;
    width: 260px;
    height: 5px;
  }
  .main {
    .nav {
      float: left;
      color: white;
      background: #09192a;
      width: 260px;
      .el-menu-vertical-demo {
        height: 100%;
      }
    }
  }
}
</style>
