<template>
  <div class="gallery">
    <div class="gallery-list">
      <div
        v-for="(item, index) in itemList" :key="index"
        class="gallery-list-item">
          <div
            v-if="isPicture(item)"
            :style="{ 'background-image': `url('api/img/userHead/${item}')`}"
            class="item-img"></div>
          <div
            v-else
            class="item-video-container">
            <video
              class="item-video"
              :src="`api/img/userHead/${item}`"
            >
            </video>
            <div class="play-icon">
              <i class="el-icon-caret-right"/>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isPicture (str) {
      let reg = /\.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/
      return reg.test(str)
    },
    isVideo (str) {
      let reg = /\.(mp4|avi|rmvb|rm|wma|MP4|AVI|RMVB|RM|WMA)$/
      return reg.test(str)
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  .gallery-list {
    display: flex;
    flex-wrap: wrap;
    .gallery-list-item {
      position: relative;
      margin-right: 5px;
      margin-bottom: 5px;
      width: 30%;
      height: 100px;
      .item-img {
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
      .item-video-container {
        width: 100%;
        height: 100%;
        position: relative;
        .item-video {
          width: 100%;
          height: 100%;
        }
        .play-icon {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          font-size: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
        }
      }
    }
  }
}
</style>
