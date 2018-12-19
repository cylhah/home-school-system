<template>
  <div class="app-container">
    <el-card class="box-card" v-for="(item,index) in dongtaiList" :key="index">
      <div slot="header" class="clearfix">
        <span>
          <span class="touxiang"></span>
          <span class="xinxi">
          <div class="username">{{item.newsUser.userNickname}}</div>
          <div class="time">发布时间：{{item.newsUploadTime}}</div>
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
      itemList: []
    }
  },
  computed: {
    ...mapState({
      dongtaiList: state => state.dongtai.dongtaiList
    })
  },
  created () {
    this.getGaleryItemList()
    this.getDongtai()
    console.log()
  },
  methods: {
    childinputblur () {
      // childValue就是子组件传过来的值
      this.textarea = ''
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
background-color: antiquewhite;
}
.touxiang{
  margin: 3px;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 25px;
    background-clip: padding-box;
}
.xinxi{
    margin: 1%;
    width: 35%;
    display: inline-block;
}
.username{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
.time{
  padding: 5px;
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
  .box-card {
    width: 100%;
  }

/* .iconfont {
  font-size:50px;
} */

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
