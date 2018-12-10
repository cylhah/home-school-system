<template>
  <div id="newsDetail">
    <div id="newsContent">
      <el-row>
        <el-col :span="4">
          <div class="userHead">
            <img>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="userNews">
            <div class="username">陈永雷</div>
            <div class="newContent"><p>我和江铮一起堆了一个小雪人真的很开心我的雪人特别好看</p></div>
            <div class="NewsImgs">
            </div>
            <div class="tbottom">
              <span class="time">昨天下午 12.20</span>
              <span class="icon"><i class="iconfont icon-pinglun1"></i></span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="newsComment">
      <div class="zan">
        <el-row class="zanrow">
          <el-col :span="2"><div class="iconHead"><i class="iconfont icon-xin"></i></div></el-col>
          <el-col :span="22">
            <div class="zanUserHeads">
              <img >
              <img >
              <img >
              <img >
              <img >
              <img >
              <img >
              <img >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comment">
          <el-row class="commentrow">
            <el-col :span="2" ><div class="iconHead"><i class="iconfont icon-pinglun2"></i></div></el-col>
            <el-col :span="22">
              <!-- <div class="commentall">
                <el-row class="commentallrow">
                  <el-col :span="4">
                    <div class="userHead"><img></div>
                  </el-col>
                  <el-col :span="20">
                    <div>
                      <span>戴思瑶</span>
                      <span>昨天 下午12：29</span>
                    </div>
                    <div>
                      <span>回复</span>
                      <span>陈永雷</span>
                      <span>:</span>
                      <span><p>我是一只朴素的小雪人</p></span>
                    </div>
                  </el-col>
                </el-row>
              </div> -->
              <newsdetailcomment></newsdetailcomment>
              <newsdetailcomment></newsdetailcomment>
            </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import newsdetailcomment from '@/pages/dynamic/comment/newsdetailcomment'
export default {
  components: {
    newsdetailcomment
  }
}
</script>

<style lang="scss" scoped>
.iconHead{
  padding-left: 5%;
  padding-right: 5%;
}
.iconfont {
  color: #0000ff91;
}
#newsDetail {
  padding: 10px;
  #newsContent {
    padding-bottom: 20px;
    .userHead{
      img{
        width: 50px;
        height: 50px;
      }
    }
    .userNews{
      .username{
        color: #3577ad;
        margin-bottom: 10px;
      }
      .newContent{
        margin-bottom: 10px;
      }
      .NewsImgs{

      }
      .tbottom{
        .time{
          color: gray;
        }
        .icon{
          float: right;
        }
      }
    }
  }
  #newsComment {
    .zan{
      border-bottom: 1px solid gray;
      .zanrow{
        background-color: #f0f2f8;
        .icon{
        }
        .zanUserHeads{
          padding: 10px 10px;
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    .comment{
      .commentrow{
          background-color: #f0f2f8;
        .iconHead{
        }
        .commentall{
          .commentallrow{
            .userHead{
              img {
                width: 50px;
                height: 50px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
