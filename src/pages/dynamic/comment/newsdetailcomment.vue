<template>
  <div class="commentall">
    <el-row class="commentallrow">
      <el-col :span="4">
        <div class="userHead"><img :src="getHead(Acomment.commentUser)"></div>
      </el-col>
      <el-col :span="20">
        <div class="commentcontent">
          <div class="top">
            <span class="username">{{Acomment.commentUser.userNickname}}</span>
            <span class="time">
            {{formatTime(Acomment.commentTime)}}
            <!-- 2017-02-17 -->
            </span>
          </div>
          <div class="content">
            <p>
              <span v-if="Acomment.commentType === 1">
                <span>回复</span>
                <span class="username">{{Acomment.replyUser.userNickname}}</span>
                <span>:</span>
              </span>
              {{Acomment.commentContent}}
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    Acomment: Object
  },
  methods: {
    formatTime (time) {
      let date = new Date(time)
      let now = new Date()
      let day = 3600 * 24 * 1000
      let todayTimestamp = parseInt(now.getTime() / day) * day - 8 * 3600 * 1000
      let targetTimestamp = date.getTime()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let resttime = ''
      if (hours < 12) {
        resttime = `上午${hours}:${minutes}`
      } else if (hours === 12) {
        resttime = `中午${hours}:${minutes}`
      } else {
        hours = hours - 12
        resttime = `下午${hours}:${minutes}`
      }
      if (targetTimestamp >= todayTimestamp) {
        return resttime
      } else if (todayTimestamp - targetTimestamp <= day) {
        return '昨天 ' + resttime
      } else {
        let month = date.getMonth() + 1
        let days = date.getDate()
        return `${month}月${days}日 ` + resttime
      }
    },
    getHead (item) {
      let userHead = item.userHeadUrl
      if (userHead) {
        return `img/userHead/${userHead}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.username{
  color: #3577ad;
}
.commentall{
  border-bottom: 1px solid gray;
  background-color: #f0f2f8;
  .commentallrow{
    padding: 10px 10px;
    .userHead{
      img {
        width: 50px;
        height: 50px;
      }
    }
    .commentcontent{
      margin-left: 5px;
      // padding-left: 5px;
      .top{
        margin-bottom: 5px;
        .time{
          float: right;
          color: gray;
        }
      }
      .content{
        span{
          display: inline-block;
        }
      }
    }
  }
}
</style>
