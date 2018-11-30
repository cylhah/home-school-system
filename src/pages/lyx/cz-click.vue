<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <span class="touxiang"></span>
          <span class="xinxi">
          <div class="username">{{ name }}</div>
          </span>
          <div class="tog">
          <div class="text item1">{{ dongtaiContent }}</div>
      <img class="imgcss">
      <div class="time">发布时间：{{ dongtaiTime }} <a> 删除 </a></div>
      </div>
        </span>
      </div>
      <span><i class="iconfont icon-xihuan1"></i></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
      <span class="zant"></span>
    </el-card>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
export default {
  components: {
    header1
  },
  data () {
    return {
      keywords: '',
      id: 1,
      name: '张三',
      dongtaiContent: '我叫张三，我是张三三的家长',
      dongtaiTime: '2018.11.12'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.app-container{
padding-top: 0%;
width: 100%;
background-color: antiquewhite;
}
.imgcss{
    background-color: rgb(188, 212, 212);
   width: 219px;
    height: 139px;
    margin: 7px;
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
    position: relative;
    top: -30px;
}
.tog{
    position: relative;
    left: 73px;
    top: -24px;
}
.zant{
    background-color: #ddd;
    width: 10%;
    height: 34px;
    display: inline-block;
    margin: 0%;
    margin-left: 2%;
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
