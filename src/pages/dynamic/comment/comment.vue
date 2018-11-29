<template>
<div class="c-tabbar">
  <el-row class="c-tabbar-comment">
    <el-col :span="18">
      <el-input type="textarea"
        :minlength="12"
        :maxlength="150"
        style="width:100%;"
        ref="comment"
        @blur="childinputblur('blur')">
        1231
      </el-input>
    </el-col>
    <el-col :span="6" class="sidebar">
      <div class="big"><i class="iconfont icon-icon--"></i></div>
      <div class="send">发送</div>
    </el-col>
  </el-row>
  <el-row class="c-tabbar-bottom">
    <el-checkbox v-model="checked">同时转发</el-checkbox>
    <i>@</i>
    <i class="iconfont icon-biaoqing"></i>
  </el-row>
</div>
</template>

<script>
export default {
  props: {
    dongtaiid: Number
  },
  data () {
    return {
      checked: 'checked'
    }
  },
  mounted () {
    // if (this.dongtaiid) {
    //   this.$refs.comment.focus()
    // }
    // this.$refs.comment.focus()
  },
  methods: {
    childinputblur (mes) {
      this.$emit('childinputblur', mes)
    }
  },
  computed: {
    // isfocus () {
    //   return this.$parent.data.xianshi
    // }
  },
  watch: {
    isshow (newValue) {
      if (newValue === true) {
        this.$refs.comment.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-tabbar{
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 16.67%;
    overflow: hidden;
    background: #ffffff;
    border-top: 1px solid #e4e4e4;
    padding: 0;
    .c-tabbar-comment{
      width: 100%;
      height: 60%;
      padding-left: 5%;
      padding-right: 5%;
      padding-top: 2%;
      .sidebar{
        padding-left: 8%;
        .big{
          padding-bottom: 20%;
        }
      }
    }
    .c-tabbar-bottom{
      width: 100%;
      height: 20%;
      padding-left: 5%;
      padding-right: 5%;
    }
}
</style>
