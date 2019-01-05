<template>
  <div class="notification">
    <div class="notification-header">
      <div class="header-left">
        <router-link to="/index2/message">
          <i class="el-icon-arrow-left"/>
        </router-link>
      </div>
      <div class="header-mid">
        班级公告
      </div>
      <div class="header-right"></div>
    </div>
    <div class="notification-main" :style="{ minHeight: mainMinHeight }">
      <div class="notification-item" v-for="item in notificationList" :key="item.notificationTime">
        <div class="title">
          <p class="title-text">{{item.notificationTitle}}</p>
          <p class="from">
            <span class="from-user">{{item.notificationUser.userNickname}}</span>
            <span class="from-time">{{formatTime(item.notificationTime)}}</span>
          </p>
        </div>
        <div class="item-content">
          {{ item.notificationContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      mainMinHeight: `${window.screen.availHeight - 50}px`
    }
  },
  methods: {
    formatTime (time) {
      let date = new Date(time)
      return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    notificationList: state => state.myClass.notificationList
  }),
  mounted () {
    this.$store.dispatch('myClass/getNotificationList', { classId: this.userInfo.userClassId })
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .notification-header {
    width: 100%;
    display: flex;
    color: #fff;
    background: rgb(48, 48, 48);
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    flex-shrink: 0;
    .header-left {
      a {
        color: #fff;
        text-decoration: none;
      }
      width: 30%;
      font-size: 25px;
    }
    .header-mid {
      width: 40%;
      text-align: center;
    }
    .header-right {
      width: 30%;
      font-size: 25px;
      text-align: right;
    }
  }
  .notification-main {
    overflow-y: scroll;
    box-sizing: border-box;
    background: #f0f2f8;
    .notification-item {
      background: #fff;
      margin: 10px 0;
      .title {
        padding: 10px;
        border-bottom: 1px solid rgb(224, 223, 223);
        .title-text {
          font-size: 18px;
          font-family: "SimHei";
          margin-bottom: 10px;
        }
        .from {
          font-size: 14px;
          color: rgb(190, 190, 190);
        }
      }
      .item-content {
        padding: 10px;
        line-height: 20px;
        font-family: "SimHei";
      }
    }
  }
}
</style>
