<template>
  <div class="app-container">
    <header1></header1>
  <div>
    <!-- 导航栏 -->
<el-menu mode="horizontal">
  <el-menu-item index="1"><router-link to="/accordingClass">班级排行</router-link></el-menu-item>
  <el-menu-item index="2"><router-link to="/accordingTime">实时</router-link></el-menu-item>
  <el-menu-item index="3"><router-link to="/accordingLike">排行榜</router-link></el-menu-item>
  <el-menu-item index="4"><router-link to="/accordingConcern">我的关注</router-link></el-menu-item>
</el-menu>
</div>
<!-- 动态排行 -->
<div class="dongtao">
<router-view></router-view>
</div>
<tabbar></tabbar>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
import tabbar from '@/components/public/tabbar/tabbar'
export default {
  components: {
    header1,
    tabbar
  }
}
</script>

<style scoped>
.app-container{
padding-top: 0%;
width: 100%;
}
.dongtao{
   padding: 1%;
}
</style>
