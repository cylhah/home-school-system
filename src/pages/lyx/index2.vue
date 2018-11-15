<template>
  <div class="app-container">
    <header1></header1>
  <div>
    <!-- 导航栏 -->
<el-menu mode="horizontal">
  <el-menu-item index="1">班级动态排行</el-menu-item>
  <el-menu-item index="2">实时</el-menu-item>
  <el-menu-item index="3">排 行 榜</el-menu-item>
  <el-menu-item index="4">校园新闻</el-menu-item>
</el-menu>
</div>
<!-- 动态排行 -->
<div class="dongtao">
<dongtai1></dongtai1>
</div>
<tabbar></tabbar>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
import dongtai1 from '@/pages/lyx/dongtai'

import tabbar from '@/components/public/tabbar/tabbar'
export default {
  components: {
    header1,
    dongtai1,
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
