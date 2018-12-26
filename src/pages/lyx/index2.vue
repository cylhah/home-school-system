<template>
  <div class="app-container">
    <header1></header1>
  <div>
</div>
<!-- 动态排行 -->
<div class="dongtao">
<router-view></router-view>
</div>
  </div>
</template>

<script>
import header1 from '@/components/public/header/index'
import tabbar from '@/components/public/tabbar/tabbar'
export default {
  components: {
  }
}
</script>

<style scoped>
.app-container{
padding-top: 0%;
width: 100%;
}
.dingwei{
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 999;
    width: 100%;
}
.dongtao{
  width: 100%;
  height: 100%;
   padding: 1%;
   margin-top: 16%;
}
</style>
