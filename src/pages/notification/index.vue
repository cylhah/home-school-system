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
      <div class="header-right"><div v-if="this.userInfo.userType == 'teacher'" @click="open">+</div></div>
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
    <!-- 通知dialog -->
    <el-dialog title="通知" :visible.sync="dialogFormVisible" width="100%">
      <el-form :model="form">
        <el-form-item label="通知标题" :label-width="formLabelWidth">
          <el-input v-model="form.notificationTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" :label-width="formLabelWidth">
          <el-input v-model="form.notificationContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendNotification">确 定</el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formLabelWidth: '100px',
      mainMinHeight: `${window.screen.availHeight - 50}px`,
      dialogFormVisible: false,
      form: {
        notificationTitle: '',
        notificationContent: ''
      }
    }
  },
  methods: {
    formatTime (time) {
      let date = new Date(time)
      return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
    },
    open () {
      this.dialogFormVisible = true
    },
    sendNotification () {
      var params = new URLSearchParams()
      params.append('notificationTitle', this.form.notificationTitle)
      params.append('notificationContent', this.form.notificationContent)
      params.append('notificationClassId', this.userInfo.userClassId)
      params.append('notificationUserId', this.userInfo.userId)
      console.log(this.form.notificationTitle)
      console.log(this.userInfo.userClassId)
      this.$store.dispatch('myClass/postNotification', params).then(res => {
        let { data } = res
        if (data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        }
      })
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
