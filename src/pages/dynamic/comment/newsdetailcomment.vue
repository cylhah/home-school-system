<template>
  <div class="commentall">
    <el-row class="commentallrow">
      <el-col :span="4">
        <div class="userHead"><img></div>
      </el-col>
      <el-col :span="20">
        <div class="commentcontent">
          <div class="top">
            <span class="username">戴思瑶</span>
            <span class="time">昨天 下午12：29</span>
          </div>
          <div class="content">
            <p>
              <span>
                <span>回复</span>
                <span class="username">陈永雷</span>
                <span>:</span>
              </span>
              我们是一个朴素的大雪人。。。。。。。。。
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
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
      padding-left: 5px;
      .top{
        margin-bottom: 5px;
        .username{
        }
        .time{
          float: right;
          color: gray;
        }
      }
      .content{
        span{
          display: inline-block;
        }
        .username{
        }
      }
    }
  }
}
</style>
