<template>
    <el-dialog
      custom-class="m-dialog"
      :visible.sync="vis"
      width="100%"
      fullscreen
      >
      <div @click="close" class="my">
        <div v-if="imgSrc" class="imgContainer">
            <img :src="imgSrc" class="img-class"/>
        </div>
        <div v-else-if="videoSrc" class="videoContainer">
            <video :src="videoSrc"  controls="controls" class="video-class"/>
        </div>
      </div>
    </el-dialog>
</template>
<script>
export default {
  mounted () {
    let height = document.body.clientHeight
    let box = document.getElementsByClassName('my')
    box[0].height = height
  },
  props: ['Visible', 'imgSrc', 'videoSrc'],
  watch: {
    Visible (newValue, oldValue) {
      this.vis = newValue
    }
  },
  data () {
    return {
      vis: false
    }
  },
  methods: {
    bigImg () {
      // 发送事件
      // this.$emit('clickit')
      console.log('内部黑色的时候我在点击')
    },
    close () {
      console.log('点击全屏')
      this.$emit('close-dialogStatus', true)
    }
  }
}
</script>
<style  lang="scss">
.el-dialog .el-dialog__body{
  background: black;
  padding: 0;
    .my {
    width: 100%;
    height: 667px;
    .imgContainer {
      padding-top: 20%;
      padding-bottom: 20%;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .videoContainer {
      width: 100%;
      height: 100%;
      padding-top: 20%;
      padding-bottom: 20%;
      video {
        width: 100%;
        height: 100%;
      }
    }
    }
}
</style>
