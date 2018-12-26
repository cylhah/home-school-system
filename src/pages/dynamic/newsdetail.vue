<template>
  <div id="newsDetail">
    <div id="srollTab">
      <div id="newsContent">
        <el-row>
          <el-col :span="4">
            <div class="userHead">
              <img :src="getHead(NewsDetail.newsUser)">
            </div>
          </el-col>
          <el-col :span="20">
            <div class="userNews">
              <div class="username">{{NewsDetail.newsUser.userNickname}}</div>
              <div class="newContent"><p>{{NewsDetail.newsContent}}</p></div>
              <div class="NewsImgs">
              <gallery :itemList="PicList" v-if="PicList.length>0"/>
              </div>
              <div class="tbottom">
                <span class="time"> {{formatTime(NewsDetail.newsUploadTime)}}</span>
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
                <img v-for="(item, index) in NewsDetail.newsLikeUser" :key="index" :src="getHead(item)">
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="comment" v-if="CommentList.length">
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
                <newsdetailcomment
                  v-for="(comment,index) in CommentList"
                  :key="index"
                  :Acomment="comment"
                  @click.native="inputFocus(comment)">
                </newsdetailcomment>
              </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div id="newsSendComment">
      <div class="content">
        <input
          ref="sendinput"
          @keyup.enter="sendcomment"
          :placeholder= replyplaceholder
          type="text" v-model="content">
      </div>
      <div class="send">
        <button
          :class="{ disabled: !content }"
          :disabled="!content">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import newsdetailcomment from '@/pages/dynamic/comment/newsdetailcomment'
import gallery from '@/pages/lyx/components/gallery'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      content: '',
      replyplaceholder: '评论',
      NewsId: 0,
      commentTargetId: 0,
      commentType: 0
    }
  },
  components: {
    newsdetailcomment, gallery
  },
  // computed: mapState({
  //   userInfo: state => state.user.userInfo,
  //   NewsDetail: state => state.dongtai.NewsDetail,
  //   CommentList: state => state.dongtai.CommentList
  // }),
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      NewsDetail: state => state.dongtai.NewsDetail,
      CommentList: state => state.dongtai.CommentList
    }),
    PicList () {
      let NewsImgs = this.NewsDetail.newsImageURLs
      let NewsVideos = this.NewsDetail.newsVideoURLs
      var ImgArr
      var VideoArr
      var NewsRes = []
      if (NewsImgs) {
        ImgArr = NewsImgs.split(',')
        NewsRes = ImgArr
      }
      if (NewsVideos) {
        VideoArr = NewsVideos.split(',')
        NewsRes = ImgArr
      }
      if (NewsImgs && NewsVideos) {
        NewsRes = ImgArr.concat(VideoArr)
      }
      // let map1 = NewsRes.map(x => `newsPic/${x}`)
      return NewsRes
    }
  },
  methods: {
    inputFocus (comment) {
      this.$refs.sendinput.focus()
      this.stateChange(comment)
    },
    sendcomment () {
      console.log('Type' + this.commentType)
      console.log('回复第几条评论' + this.commentTargetId)
      console.log('哪条新闻' + this.NewsId)
      console.log(this.content)
      var params = new URLSearchParams()
      params.append('commentNewsId', this.NewsId)
      params.append('commentUserId', this.userInfo.userId)
      params.append('commentContent', this.content)
      params.append('commentTargetId', this.commentTargetId)
      params.append('commentType', this.commentType)
      this.$store.dispatch('sendComment', params)
      this.backinit()
    },
    backinit () {
      this.content = ''
      this.replyplaceholder = '评论'
      this.commentTargetId = 0
      this.commentType = 0
    },
    stateChange (comment) {
      let username = comment.commentUser.userNickname
      this.replyplaceholder = `回复${username}:`
      this.commentTargetId = comment.commentId
      this.commentType = 1
    },
    getHead (item) {
      let userHead = item.userHeadUrl
      if (userHead) {
        return `api/img/userHead/${userHead}`
      }
    },
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
    async getGaleryItemList () {
      setTimeout(() => {
        this.itemList = ['18_1543476287863.jpg', '18_1543478354418.jpg', '21_1543652329858.jpg', '22_1543652223158.jpg', 'test.mp4', 'test1.mp4']
      }, 500)
    }
  },
  created () {
    let toNewsId = this.$route.params.toNewsId
    this.NewsId = toNewsId
    this.$store.dispatch('getNewsDetailByNewsId', { toNewsId: toNewsId })
    this.getGaleryItemList()
  }
}
</script>

<style lang="scss" scoped>
.iconHead{
  padding-top: 40%;
  padding-left: 40%;
  padding-bottom: 40%;
}
.iconfont {
  color: #0000ff91;
}
#newsDetail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  #srollTab{
    padding: 10px;
    flex:1;
    overflow-y: scroll;
    #newsContent {
      flex: 1;
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
              padding: 5px;
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
  #newsSendComment {
    flex-shrink: 0;
    width: 100%;
    background: rgb(240, 242, 248);
    display: flex;
    flex: 0 0 auto;
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
