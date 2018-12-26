<template>
  <div>
          <nav class="mui-bar mui-bar-tab">
<router-link class="mui-tab-item" to="/index2/message">
<span class="mui-icon mui-icon-chat"></span>
<span class="mui-tab-label">消息</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/index3/accordingClass">
<span class="mui-icon mui-icon-pengyouquan"></span>
<span class="mui-tab-label">圈子</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/mailList">
<span class="mui-icon mui-icon-chatboxes"><span class="mui-badge">0</span></span>
<span class="mui-tab-label">通讯录</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/personal">
<span class="mui-icon mui-icon-contact"></span>
<span class="mui-tab-label">我的</span>
</router-link>
</nav>
  </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style scoped>
 @import '../../../lib/mui/css/mui.min.css';
</style>
