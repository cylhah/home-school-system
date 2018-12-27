<template>
  <div>
          <nav class="mui-bar mui-bar-tab">
<router-link class="mui-tab-item" to="/index2/message">
<span class="mui-icon mui-icon-chat" @click="setHeaderTitle('消息')"></span>
<span class="mui-tab-label" @click="setHeaderTitle('消息')">消息</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/index3/accordingClass">
<span class="mui-icon mui-icon-pengyouquan" @click="setHeaderTitle('圈子')"></span>
<span class="mui-tab-label" @click="setHeaderTitle('圈子')">圈子</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/mailList">
<span class="mui-icon mui-icon-chatboxes" @click="setHeaderTitle('通讯录')"><span class="mui-badge">0</span></span>
<span class="mui-tab-label" @click="setHeaderTitle('通讯录')">通讯录</span>
</router-link>
<router-link class="mui-tab-item" to="/index2/personal">
<span class="mui-icon mui-icon-contact" @click="setHeaderTitle('我的')"></span>
<span class="mui-tab-label" @click="setHeaderTitle('我的')">我的</span>
</router-link>
</nav>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  methods: {
    setHeaderTitle (str) {
      console.log(str)
      this.$store.dispatch('user/changeHeaderTitle', { headerTitle: str })
    }
  }
}
</script>

<style scoped>
 @import '../../../lib/mui/css/mui.min.css';
</style>
