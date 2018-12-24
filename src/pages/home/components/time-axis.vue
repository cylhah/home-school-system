<template>
  <div class="time-axis">
    <div class="time-axis-list">
      <div
        v-for="(item, index) in itemList" :key="index"
        class="list-item">
        <div class="item-header">
          <p>
            <i class="iconfont icon-circleo"/>
            <span>{{formatTime(item.time)}}</span>
          </p>
        </div>
        <div class="item-body">
          <div class="item-img-list">
            <div
              v-for="(img, index) in item.imgList" :key="index"
              :style="{ 'background-image': `url('api/img/userHead/${img}')`}"
              class="item-img">
            </div>
          </div>
          <div class="item-text">
            <p>{{item.content}}</p>
          </div>
          <div class="item-labels"></div>
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
    formatTime (time) {
      let now = new Date()
      let target = new Date(time)
      if (now.getFullYear() === target.getFullYear()) {
        return `${target.getMonth() + 1}月${target.getDate()}日`
      } else {
        return `${target.getFullYear()}年${target.getMonth() + 1}月${target.getDate()}日`
      }
    },
    getItemImgListHeight (length) {
    }
  }
}
</script>

<style lang="scss" scoped>
.time-axis {
  .time-axis-list {
    .list-item {
      .item-header {
        p {
          line-height: 24px;
          display: flex;
          i {
            color: rgb(66, 189, 86);
            margin-right: 10px;
            margin-left: -6px;
          }
          span {
            color: rgb(247, 98, 86);
            font-weight: bold;
            font-size: 22px;
          }
        }
      }
      .item-body {
        padding: 18px 0 18px 18px;
        border-left: 2px solid rgb(247, 163, 86);
        .item-img-list {
          display: flex;
          width: 100%;
          height: 200px;
          .item-img {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position:center center;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
