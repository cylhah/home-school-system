<template>
  <div class="chat">
    <div class="chat-header">
      <div class="header-left">
        <i class="el-icon-arrow-left"/>
      </div>
      <div class="header-mid">
        {{ toUserInfo.userNickname }}
      </div>
      <div class="header-right">
        <i class="el-icon-more"/>
      </div>
    </div>
    <div class="main" :style="{ minHeight: mainMinHeight }" ref="main">
      <div
        v-for="(item, index) in messageList"
        :key="index"
        class="message-item"
        :class="{right: item.fromUserId == userInfo.userId}">
        <div class="item-container-me" v-if="item.fromUserId == userInfo.userId">
          <div class="item-content-me">{{ item.messageContent }}</div>
          <div class="item-head-me">
            <img :src="userInfo.userHeadUrl">
          </div>
        </div>
        <div class="item-container" v-else>
          <div class="item-head">
            <img :src="`api/img/userHead/${toUserInfo.userHeadUrl}`">
          </div>
          <div class="item-content">{{ item.messageContent }}</div>
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <div class="content">
        <input
          @keyup.enter="send"
          type="text" v-model="content">
      </div>
      <div class="send">
        <button
          @click="send"
          :class="{ disabled: !content }"
          :disabled="!content">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      content: '',
      mainMinHeight: `${window.screen.availHeight - 105}px`,
      websocket: null
    }
  },
  methods: {
    async send () {
      if (this.content) {
        let message = {
          fromUserId: this.userInfo.userId,
          toUserId: this.toUserInfo.userId,
          toClassId: '',
          messageContent: this.content
        }
        await this.$store.dispatch('message/sendMessage', message)
        this.websocket.send(JSON.stringify(message))
        this.content = ''
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      }
    },
    initWebsocket () {
      let self = this
      this.websocket = new WebSocket(`ws://localhost:8080/api/websocket/${this.userInfo.userId}`)
      this.websocket.onmessage = function (event) {
        self.messageList.push(JSON.parse(event.data))
      }
      window.onbeforeunload = function () {
        self.websocket.close()
      }
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    messageList: state => state.message.messageList,
    toUserInfo: state => state.message.toUserInfo
  }),
  mounted () {
    this.$store.dispatch('message/getToUserInfo', { toUserId: this.$route.params.toUserId })
    this.$store.dispatch('message/getMessageListOfOne',
      { fromUserId: this.userInfo.userId, toUserId: this.$route.params.toUserId })
    this.initWebsocket()
  },
  destroyed () {
    this.websocket.close()
  }
}
</script>

<style lang="scss" scoped>
.chat {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .chat-header {
    width: 100%;
    display: flex;
    color: #fff;
    /* background: linear-gradient(to right, rgb(66,189,68), rgb(104, 228, 121)); */
    background: rgb(48, 48, 48);
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    flex-shrink: 0;
    .header-left {
      width: 15%;
      font-size: 25px;
    }
    .header-mid {
      width: 70%;
      text-align: center;
    }
    .header-right {
      width: 15%;
      font-size: 25px;
      text-align: right;
    }
  }
  .main {
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 0 10px;
    background: #f0f2f8;
    .right {
      justify-content: flex-end;
    }
    .message-item {
      margin: 15px 0;
      display: flex;
      .item-container-me {
        display: flex;
        .item-head-me {
          img {
            width: 40px;
            height: 40px;
          }
        }
        .item-content-me::before {
          content: "";
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid rgb(160, 231, 90);
          position: absolute;
          top: 10px;
          right: -8px;
        }
        .item-content-me {
          line-height: 25px;
          margin-right: 10px;
          max-width: 250px;
          position: relative;
          background: rgb(160, 231, 90);
          border-radius: 5px;
          padding: 10px;
        }
      }
      .item-container {
        display: flex;
        .item-head {
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .item-content::before {
          content: "";
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid #fff;
          position: absolute;
          top: 10px;
          left: -8px;
        }
        .item-content {
          line-height: 25px;
          max-width: 250px;
          position: relative;
          background: #fff;
          border-radius: 5px;
          padding: 10px;
        }
      }
    }
  }
  .chat-bottom {
    flex-shrink: 0;
    width: 100%;
    background: rgb(240, 242, 248);
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    .content {
      width: 90%;
      input {
        width: 100%;
        height: 35px;
        box-sizing: border-box;
        padding: 5px;
        border-radius: 5px;
        border: none;
        outline: none;
      }
    }
    .send {
      width: 10%;
      margin-left: 10px;
      min-width: 50px;
      button {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: none;
        outline: none;
        background: rgb(66,189,68);
        color: #fff;
      }
      .disabled {
        background: rgb(211, 222, 226);
      }
    }
  }
}
</style>
