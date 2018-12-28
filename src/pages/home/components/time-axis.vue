<template>
  <div class="time-axis">
    <div class="time-axis-list">
      <div
        v-for="(item, index) in itemList" :key="index"
        class="list-item">
        <div
          v-if="showHeader(item.insertTime)"
          class="item-header">
          <p>
            <i class="iconfont icon-circleo"/>
            <span>{{formatTime(item.insertTime)}}</span>
          </p>
        </div>
        <div class="item-body">
          <div
            :style="{ 'flex-wrap': getFlexWrap(item.news.newsImageURLs) }"
            class="item-img-list">
            <div
              v-for="(img, index) in getImg(item.news.newsImageURLs)" :key="index"
              :style="{ 'background-image': `url('api/img/newsPic/${img}')`, width: getItemImgWidth(item.news.newsImageURLs), height: getItemImgHeight(item.news.newsImageURLs)}"
              class="item-img">
            </div>
          </div>
          <div class="item-text">
            <p>{{item.content}}</p>
          </div>
          <div class="item-labels">
            <div class="labels-left">
              <span class="label-user">{{item.comment}}</span>
              <span class="label-time">{{getLabelTime(item.insertTime)}}</span>
            </div>
            <div class="label-right">
              <div class="comment">
                <i class="el-icon-more"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeFormat from '../../../util/formatTime'
export default {
  data () {
    return {
      timeSet: new Set(),
      image: []
    }
  },
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
      if (length <= 1) {
        return '200px'
      } else if (length <= 2) {
        return '190px'
      } else if (length <= 3) {
        return '130px'
      } else if (length <= 6) {
        return '175px'
      } else if (length <= 9) {
        return '285px'
      }
    },
    getFlexWrap (length1) {
      if (length1 == null) {
        return 'nowrap'
      } else {
        var count = length1.split(',').length
        return count > 3 ? 'wrap' : 'nowrap'
      }
    },
    getItemImgWidth (length1) {
      if (length1 == null) return '100%'
      else {
        var count = length1.split(',').length
        return count > 3 ? '32%' : '100%'
      }
    },
    getItemImgHeight (length1) {
      var count = 0
      if (length1 == null) count = 0
      else {
        count = length1.split(',').length
      }
      if (count <= 1) {
        return '200px'
      } else if (count <= 2) {
        return '190px'
      } else if (count <= 3) {
        return '130px'
      } else if (count <= 9) {
        return '87px'
      }
    },
    getLabelTime (time) {
      let target = new Date(time)
      return TimeFormat('MM-dd hh:mm', target)
    },
    getImg (img) {
      var imgg = this.image
      if (img == null) {
        imgg = null
      } else {
        var result = img.split(',')
        for (var i = 0; i < result.length; i++) {
          imgg[i] = result[i]
        }
      }
      return imgg
    },
    showHeader (time) {
      let target = new Date(time)
      let dayStr = TimeFormat('yyyy-MM-dd', target)
      if (this.timeSet.has(dayStr)) {
        return false
      } else {
        this.timeSet.add(dayStr)
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-axis {
  .time-axis-list {
    background: white;
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
          margin-bottom: 10px;
          .item-img {
            background-repeat: no-repeat;
            background-position:center center;
            background-size: cover;
          }
        }
        .item-text {
          margin-bottom: 10px;
        }
      }
      .item-labels {
        display: flex;
        justify-content: space-between;
        padding: 5px 15px 0 0;
        .labels-left {
          color: rgb(201, 197, 197);
          .label-user {
            font-size: 15px;
          }
          .label-time {
            font-size: 14px;
          }
        }
        .label-right {
          .comment:before{
            content: "";
            width: 0px;
            height: 0px;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-right: 4px solid rgb(133, 147, 176);
            position: absolute;
            top: 4px;
            left: -4px;
           }
          .comment {
            position: relative;
            padding: 0 1px;
            color: #fff;
            background: rgb(133, 147, 176);
          }
        }
      }
    }
  }
}
</style>
