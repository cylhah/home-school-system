<template>
  <div class="app-container">

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>
      <span class="touxiang"></span>
      <span class="xinxi">
      <div class="username">张三</div>
      <div class="time">发布时间：2018.11.11</div>
      </span>
    </span>
    <el-button style="float: right; padding: 3px 8px" type="text" @click="report">
      <span class="mui-icon mui-icon-minus"></span></el-button>
    <el-button style="float: right; padding: 3px 8px" type="text" @click="keep">
      <span class="mui-icon mui-icon-star"></span></el-button>
  </div>
  <div class="text item1">【提醒】九月悄然而至！不知不觉，一年又过了四分之三，弱弱的问一句：你年前信誓旦旦立下的目标现在都实现了吗？此外，
            很多小可爱都在盼望着中秋节的来临，不但有好吃的月饼还可以好好休整三天。2018年中秋节放假安排是哪几天呢？下面我们不妨一起来看看。</div>
  <hr>
</el-card>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
export default {
  components: {
    header1
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
    }
  }
}
</script>

<style scoped>
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
