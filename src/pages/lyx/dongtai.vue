<template>
  <div class="app-container">
    <el-card class="box-card" v-for="(item,index) in dongtaiList" :key="index">
      <div slot="header" class="clearfix">
        <span>
          <span class="touxiang1">
            <span class="message-head">
            <img :src="getHeadUrl(item)">
          </span>
          </span>
          <span class="xinxi1">
          <div class="username">{{item.newsUser.userNickname}}</div>
          <div class="time">发布时间：{{changetime(item.newsUploadTime,item)}}</div>
          </span>
        </span>
        <el-button style="float: right; padding: 3px 8px" type="text" @click="report">
          <span class="mui-icon mui-icon-minus"></span></el-button>
        <el-button style="float: right; padding: 3px 8px" type="text" @click="keep">
          <span class="mui-icon mui-icon-star"></span></el-button>
      </div>
      <div class="text item1">{{item.newsContent}}</div>
      <gallery :itemList="itemList" />
      <hr>
      <!-- 底部 转发评论点赞 -->
      <div>
        <el-row>
          <el-col :span="8" >
            <div @click="changedianzan">
            <star :animates="animates" :colors="colors" :number="number">
              <i slot="icon" class="mui-icon mui-icon-redo"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
          <el-col :span="8" >

            <div @click="pinglun(item.dongtaiid)">
            <star :animates="animates" :colors="colors.pinglun" :number="number">
              <i slot="icon" class="iconfont icon-pinglun"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
          <el-col :span="8" >
            <div @click="changedianzan(item)">
            <star :animates="animates" :colors="colors.dianzan" :number="item.newLikeNum" :dianzan="item.newsLikeornotlike">
              <i slot="icon" class="iconfont icon-xihuan"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      custom-class="m-dialog"
      :visible.sync="dialogVisible"
      width="100%"
      top="0px"
      :show-close="false"
      >
      <span>
        <el-row >
          <el-col :span="20">
            <el-input type="textarea"
              :minlength="12"
              :maxlength="150"
              style="width:100%;"
              ref="comment"
              id="comment"
              v-model="textarea"
              @blur="childinputblur()">
            </el-input>
          </el-col>
          <el-col :span="4" class="sidebar">
            <div class="big"><i class="iconfont icon-icon--"></i></div>
            <div class="send" @click="sendcomment()">发送</div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
          <span class="footer-item"><el-checkbox v-model="checked">同时转发</el-checkbox></span>
          <span class="footer-item"><i>@</i></span>
          <span class="footer-item"><i class="iconfont icon-biaoqing"></i></span>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
import star from '@/components/public/star/star'
import gallery from './components/gallery'
// import comment from '@/pages/dynamic/comment/comment'
import {mapActions, mapState} from 'vuex'
export default {
  components: {
    header1, star, gallery
  },
  data () {
    return {
      color: 'red',
      colors: 'red',
      animates: 'animated rubberBand',
      number: 15,
      dongtaiid: 0,
      checked: 'checked',
      textarea: '',
      dialogVisible: false,
      comment_news_id: 0,
      itemList: [],
      mypath: ''
    }
  },
  computed: {
    ...mapState({
      dongtaiList: state => state.dongtai.dongtaiList,
      userInfo: state => state.user.userInfo,
      personalInfo: state => state.personal.personalInfo
    })
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      let userId = this.userInfo.userId
      this.mypath = newVal
      let pp = this.mypath
      this.getDongtai({pp, userId})
    }
  },
  created () {
    this.getGaleryItemList()
    let userId = this.userInfo.userId
    let pp = this.$route.path
    this.getDongtai({pp, userId})
  },
  methods: {
    childinputblur () {
      // childValue就是子组件传过来的值
      this.textarea = ''
    },
    getHeadUrl (item) {
      let prefix = 'api/img/userHead'
      if (item.newsUser.userHeadUrl) {
        return `${prefix}/${item.newsUser.userHeadUrl}`
      } else {
        return `${prefix}/class.jpg`
      }
    },
    changetime (data, item) {
      var now = new Date()
      var oldTime = new Date(data).getTime()
      var difference = now.getTime() - oldTime
      var minute = 1000 * 60
      var hour = minute * 60
      var day = hour * 24
      var month = day * 30
      var year = month * 12
      var _year = difference / year
      var _month = difference / month
      var _week = difference / (7 * day)
      var _day = difference / day
      var _hour = difference / hour
      var _min = difference / minute
      if (_year >= 1) item.newsUploadTime = '发表于' + ~~(_year) + '年前'
      else if (_month >= 1) item.newsUploadTime = '发表于' + ~~(_month) + '个月前'
      else if (_week >= 1) item.newsUploadTime = '发表于' + ~~(_week) + '周前'
      else if (_day >= 1) item.newsUploadTime = '发表于' + ~~(_day) + '天前'
      else if (_hour >= 1) item.newsUploadTime = '发表于' + ~~(_hour) + '个小时前'
      else if (_min >= 1) item.newsUploadTime = '发表于' + ~~(_min) + '分钟前'
      else if (_min < 1) item.newsUploadTime = '刚刚'
      return item.newsUploadTime
    },
    keep () {
      this.$confirm('收藏？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '收藏成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    report () {
      this.$confirm('举报？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已举报!正在等待管理员审查'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    ...mapActions({
      getDongtai: 'getDongtai'
    }),
    changedianzan (item) {
      let likeNewsId = item.newsId
      let likeUserId = 18
      let likeType = -1
      if (item.newsLikeornotlike === 1) {
        item.newLikeNum--
        item.newsLikeornotlike = 0
        likeType = 0
      } else {
        item.newLikeNum++
        item.newsLikeornotlike = 1
        likeType = 1
      }
      var params = new URLSearchParams()
      params.append('likeNewsId', likeNewsId)
      params.append('likeUserId', likeUserId)
      params.append('likeType', likeType)
      this.$store.dispatch('sendZan', params).then((res) => {
        console.log(res)
      })
    },
    pinglun (id) {
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.comment.focus()
      }, 200)
      this.comment_news_id = id
    },
    async getGaleryItemList () {
      setTimeout(() => {
        this.itemList = ['18_1543476287863.jpg', '18_1543478354418.jpg', '21_1543652329858.jpg', '22_1543652223158.jpg', 'test.mp4', 'test1.mp4']
      }, 500)
    }
  }
}
</script>

<style  lang="scss">
 @import '../../lib/mui/css/mui.min.css';
.app-container{
padding-top: 0%;
width: 100%;
background-color:  #ddd;
}
.message-head {
        margin-right: 10px;
        flex-shrink: 0;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
.box-card {
    width: 100%;
    margin-bottom: 1%;
}
.touxiang1{
  margin: 3px;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    background-color:  #ddd;
    border: 1px solid #ddd;
    border-radius: 25px;
    background-clip: padding-box;
}
.el-card__header {
    padding: 9px 26px;
    padding-bottom: 0px;
    border-bottom: 1px solid  #ddd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.xinxi1{
    margin: 1%;
    width: 50%;
    display: inline-block;
}
.username{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
.time{
  padding: 3%;
  font-size: 10px;
}
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
.item1 {
    margin-bottom: 15px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.iconfont{
    font-size: 20px;
}
.mui-icon{
    font-size: 20px;
}
.icon-zan1{
    color: red;
}
.mui-icon-chatbubble{
    color: aqua;
}
.mui-icon-redo{
    color: steelblue;
}
  .el-dialog{
    margin: 0;
    position:fixed;
    bottom:0;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding: 5px 10px;
      .sidebar{
        padding-left: 20px;
        height: 100%;
        .big{
          width: 100%;
          position: absolute;
          top:0;
        }
        .send{
          width: 100%;
          position: absolute;
          bottom:0;
        }
      }
    }
   .el-dialog__footer{
      text-align: left;
      .footer-item{
        display: inline;
        margin-right: 10px;
      }
    }
   }
</style>
