<template>
  <div class="m-tab">
    <!-- 我的头像我的简介 -->
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <a class="m-tab-headphoto"></a>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <div class="m-tab-name">王思聪</div>
          <div class="m-tab-desc">简介：我爱吃热狗</div>
        </div>
      </el-col>
    </el-row>
    <!-- 关注、粉丝、发布的动态 -->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <a class="m-tab-item">
            <div class="m-tab-number">440</div>
            <div class="m-tab-sort">微博</div>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <a class="m-tab-item">
            <div class="m-tab-number">440</div>
            <div class="m-tab-sort">关注</div>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <a class="m-tab-item">
            <div class="m-tab-number">440</div>
            <div class="m-tab-sort">粉丝</div>
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 两排四个组件 -->
    <div class="m-intro">
      <el-row class="m-intro-box">
        <el-col :span="6" v-for="(item,index) in mintro" :key="index">
          <a class="m-intro-item">
            <span class="m-intro-icon"><i :class=item.img></i></span>
            <span class="m-intro-title">{{item.title}}</span>
          </a>
        </el-col>
      </el-row>
      <el-row class="m-intro-box">
        <el-col :span="6" v-for="(item,index) in mintro" :key="index">
          <a class="m-intro-item">
            <span class="m-intro-icon"><i :class=item.img></i></span>
            <span class="m-intro-title">{{item.title}}</span>
          </a>
        </el-col>
      </el-row>
    </div>
    <!-- 通知 -->
    <div class="m-info">
      <el-row>
        <el-col :span="4" class="m-info-sideicon">
          <span><i class="iconfont home-school-xihuan"></i></span>
        </el-col>
        <el-col :span="20">
          <span class="m-info-message-dec">【提醒】九月悄然而至！不知不觉，一年又过了四分之三，弱弱的问一句：你年前信誓旦旦立下的目标现在都实现了吗？此外，
            很多小可爱都在盼望着中秋节的来临，不但有好吃的月饼还可以好好休整三天。2018年中秋节放假安排是哪几天呢？下面我们不妨一起来看看。</span>
          <span class="m-info-message-from">钉钉小主任</span>
          <span class="m-info-message-data">2018-2-24</span>
          <span class="m-info-message-num">7条动态</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mintro: [
        {
          title: '我的相册',
          img: 'iconfont home-school-tupian'
        },
        {
          title: '我的故事',
          img: 'iconfont home-school-tupian'
        },
        {
          title: '我的赞',
          img: 'iconfont home-school-tupian'
        },
        {
          title: '我的服务',
          img: 'iconfont home-school-tupian'
        }
      ]
    }
  }
}
</script>

<style scoped>
.iconfont{
  font-size: 40px;
}
.m-tab-headphoto{
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
.m-tab-name{
  height: 50%;
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
}
.m-tab-desc{
  height: 50%;
  padding: 5px;
  font-size: 12px;
  color: #999;
}
.m-tab-item{
  padding: 5% 35% 5% 35%;
  display: inline-block;
  width: 50px;
}
.m-tab-number{
  font-size: 16px;
  font-weight: bold;
}
.m-tab-sort{
  font-size: 14px;
  color: #999;
}
.m-intro-box{
  margin-bottom: 15px;
}
.m-intro{
  margin-top: 10px;
  border-top: 1px solid gray;
  text-align: center;
}
.m-intro-item{
  padding: 3% 5% 0% 5%;
}
.m-intro-icon{
  display: block;
  font-size: 30px;
}
.m-intro-icon i{
  width: 50px;
  height: 50px;
}
.m-intro-title{
  display: block;
}
.home-system-xihuan{
  font-size: 20px;
}
.m-info-sideicon{
  padding-left: 5%;
  padding-right: 5%;
}
.m-info-message-dec{
  display: block;
  overflow: hidden;
  text-overflow: ellipse;
  height: 40px;
  margin-bottom: 10px;
}
.m-info-message-from{
  display: inline;
  padding-right: 5px;
}
.m-info-message-date{
  display: inline;
  padding-left: 5px;
}
.m-info-message-num{
  margin-top: 10px;
  display: block;
}
</style>
