<template>
  <div class="message">
    <keep-alive>
      <div class="message-main">
        <div class="message-item" v-for="(item, index) in messageRecord" :key="index" @click="gotoChat(item)">
          <div class="message-head">
            <img :src="getHeadUrl(item)">
          </div>
          <div class="message-content">
            <p class="to-user">{{getUserName(item)}}</p>
            <p class="content-part">
              {{decrypt(item.lastMessage.messageContent)}}
            </p>
          </div>
          <div class="message-time">
            <p class="time">{{formatTime(item.lastMessage.messageTime)}}</p>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapState } from 'vuex'
export default {
  methods: {
    decrypt (word) {
      let key = CryptoJS.enc.Utf8.parse('1234567890000000')
      let iv = CryptoJS.enc.Utf8.parse('1234567890000000')
      let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
      let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
      return decryptedStr.toString()
    },
    getHeadUrl (item) {
      let prefix = 'img/userHead'
      if (item.class) {
        return `${prefix}/class.jpg`
      } else {
        return `${prefix}/${item.user.userHeadUrl}`
      }
    },
    getUserName (item) {
      if (item.class) {
        return item.class.className
      } else {
        return item.user.userNickname
      }
    },
    formatTime (time) {
      let date = new Date(time)
      let now = new Date()
      let day = 3600 * 24 * 1000
      let todayTimestamp = parseInt(now.getTime() / day) * day - 8 * 3600 * 1000
      let targetTimestamp = date.getTime()
      if (targetTimestamp >= todayTimestamp) {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (hours < 12) {
          return `上午${hours}:${minutes}`
        } else if (hours === 12) {
          return `中午${hours}:${minutes}`
        } else {
          return `下午${hours}:${minutes}`
        }
      } else if (todayTimestamp - targetTimestamp <= day) {
        return '昨天'
      } else {
        let month = date.getMonth() + 1
        let days = date.getDate()
        return `${month}月${days}日`
      }
    },
    gotoChat (item) {
      if (item.class) {
        this.$router.push({ path: '/class' })
      } else {
        this.$router.push({ path: `/chat/${item.user.userId}` })
      }
    }
  },
  computed: mapState({
    messageRecord: state => state.message.messageRecord,
    userInfo: state => state.user.userInfo
  }),
  mounted () {
    this.$store.dispatch('message/getMessageRecord', { userId: this.userInfo.userId, classId: this.userInfo.userClassId })
  }
}
</script>

<style lang="scss" scoped>
.message {
  .message-main {
    overflow-y: scroll;
    min-height: 800px;
    .message-item {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid rgb(224, 221, 221);
      .message-head {
        margin-right: 10px;
        flex-shrink: 0;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .message-content {
        max-width: 59%;
        padding-top: 5px;
        .to-user {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .content-part {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: rgb(163, 159, 159);
        }
      }
      .message-time {
        min-width: 75px;
        flex: 1;
        padding-top: 10px;
        flex-shrink: 0;
        .time {
          text-align: right;
          font-size: 14px;
          color: rgb(183, 183, 183);
          margin-bottom: 5px;
        }
        .badge {
          text-align: right;
        }
      }
    }
  }
}
</style>
