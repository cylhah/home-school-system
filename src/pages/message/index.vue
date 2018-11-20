<template>
  <div class="message">
    <div class="message-main">
      <div class="message-item" v-for="(item, index) in 5" :key="index">
        <div class="message-head">
          <img src="../../assets/img/head2.jpg">
        </div>
        <div class="message-content">
          <p class="to-user">江铮</p>
          <p class="content-part">
            今天天气真的不错今天天气真的不错今天天气真的不错今天天气真的不错
          </p>
        </div>
        <div class="message-time">
          <p class="time">11月18日</p>
          <p class="badge"><el-badge value="1"/></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
