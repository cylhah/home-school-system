<template>
  <div>
     <mt-header :title="title" @click.native="gotoUrl">
  <mt-button  icon="back" slot="left">返回</mt-button>
  <mt-button class="mui-icon mui-icon-plusempty" slot="right"></mt-button>
</mt-header>
  </div>
</template>

<script>
export default {
  props: ['title', 'url'],
  name: 'hearder-index',
  methods: {
    gotoUrl () {
      console.log(this.url)
      window.location.href = this.url
    }
  }
}
</script>

<style scoped>
.app-container {
  padding-top: 40px;
}
</style>
