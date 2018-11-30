<template>
  <div class="app-container">
    <el-card class="box-card" v-for="(item,index) in dongtaiList" :key="index" v-if="item.dongtaiAuthor=='张三'">
      <div slot="header" class="clearfix">
        <span>
          <span class="touxiang"></span>
          <span class="xinxi">
          <div class="username">{{item.dongtaiAuthor}}</div>
          <div class="time">发布时间：{{item.dongtaiTime}}</div>
          </span>
        </span>
      </div>
      <div class="text item1">{{item.dongtaiContent}}</div>
      <hr>
      <!-- 底部 转发评论点赞 -->
      <div>
        <el-row>
          <el-col :span="8" >
            <div @click="changedianzan">
            <star :animates="animates" :colors="colors" :number="number">
              <i slot="icon" class="iconfont icon-xihuan"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
          <el-col :span="8" >
            <div @click="changedianzan">
            <star :animates="animates" :colors="colors" :number="number">
              <i slot="icon" class="iconfont icon-xihuan"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
          <el-col :span="8" >
            <div @click="changedianzan(item)">
            <star :animates="animates" :colors="colors" :number="item.dongtaidianzanNum" :dianzan="item.dongtaiclick">
              <i slot="icon" class="iconfont icon-xihuan"></i>
              <span slot="number"></span>
            </star>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
import star from '@/components/public/star/star'
import {mapActions, mapState} from 'vuex'
export default {
  components: {
    header1, star
  },
  data () {
    return {
      color: 'red',
      colors: 'red',
      animates: 'animated rubberBand',
      number: 15
    }
  },
  computed: {
    ...mapState({
      dongtaiList: state => state.dongtai.dongtaiList
    })
  },
  created () {
    this.getDongtai()
    console.log()
  },
  methods: {
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
      if (item.dongtaiclick === 1) {
        item.dongtaidianzanNum--
        item.dongtaiclick = 0
      } else {
        item.dongtaidianzanNum++
        item.dongtaiclick = 1
      }
    }
  }
}
</script>

<style scoped>
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
    margin-bottom: 0px;
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
</style>
