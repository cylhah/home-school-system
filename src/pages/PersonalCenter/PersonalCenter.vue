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
      <!-- <el-row class="m-intro-box">
        <el-col :span="6" v-for="(item,index) in mintro" :key="index">
          <a class="m-intro-item">
            <span class="m-intro-icon"><i :class=item.img></i></span>
            <span class="m-intro-title">{{item.title}}</span>
          </a>
        </el-col>
      </el-row> -->
    </div>
    <!-- 通知 -->
    <div class="m-info">
      <!-- <el-row>
        <el-col :span="4" class="m-info-sideicon">
          <span><i class="iconfont icon-xihuan"></i></span>
        </el-col>
        <el-col :span="20">
          <span class="m-info-message-dec">【提醒】九月悄然而至！不知不觉，一年又过了四分之三，弱弱的问一句：你年前信誓旦旦立下的目标现在都实现了吗？此外，
            很多小可爱都在盼望着中秋节的来临，不但有好吃的月饼还可以好好休整三天。2018年中秋节放假安排是哪几天呢？下面我们不妨一起来看看。</span>
          <span class="m-info-message-from">钉钉小主任</span>
          <span class="m-info-message-data">2018-2-24</span>
          <span class="m-info-message-num">7条动态</span>
        </el-col>
      </el-row> -->
      <div>
        <div class="tongzhi">通知</div>
      <div class="words2">【提醒】九月悄然而至！不知不觉，一年又过了四分之三，弱弱的问一句：你年前信誓旦旦立下的目标现在都实现了吗？此外，
            很多小可爱都在盼望着中秋节的来临，不但有好吃的月饼还可以好好休整三天。2018年中秋节放假安排是哪几天呢？下面我们不妨一起来看看。</div>
            <span class="m-info-message-from">钉钉小主任</span>
          <span class="m-info-message-data">2018-2-24</span>
          <span class="m-info-message-num">7条动态</span>
            <div class="queren">立即确认</div>
            </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      mintro: [
        {
          title: '我的相册',
          img: 'iconfont icon-tupian'
        },
        {
          title: '我的故事',
          img: 'iconfont icon-form'
        },
        {
          title: '我的赞',
          img: 'iconfont icon-zan1'
        },
        {
          title: '我的服务',
          img: 'iconfont icon-tasks'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      personalCenterInfo: state => state.personal.personalCenterInfo
    })
  },
  methods: {
    ...mapActions({
      personalCenter: 'personal/personalCenter'
    })
  },
  mounted () {
    let userId = this.userInfo.userId
    let classId = this.userInfo.userClassId
    this.personalCenter({userId, classId})
  }
}
</script>

<style scoped>
.iconfont{
  font-size: 40px;
}
.icon-zan1{
  color: rgb(250, 52, 52);
}
.icon-form{
  color: rgb(245, 243, 145);
}
.icon-tupian{
  color: rgb(58, 248, 33);
}
.icon-tasks{
  color: rgb(106, 128, 252);
}
.el-col-6 {
    width: 25%;
    height: 74px;
}
.el-row {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 0.5px solid rgb(216, 215, 215);
}
.words2{
  display: block;
  width: 80%;
  padding-left: 10%;
  margin-bottom: 4%;
}
.tongzhi{
  margin: 3%;
  color: rgb(216, 216, 216);
  font-size: 5%;
}
.queren{
  font-size: 17px;
    text-align: center;
    color: rgb(28, 124, 235);
    margin: 3%;
    background-color: rgb(230, 230, 230);
    padding: 10px;
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
  padding: 9px;
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
  font-size: 15px;
}
.m-tab-sort{
  font-size: 12px;
  color: #999;
}
.m-intro-box{
  margin-bottom: 15px;
}
.m-intro{
  margin-top: 10px;
  border-top: 6px solid rgb(216, 215, 215);
  border-bottom: 7px solid rgb(216, 215, 215);
  text-align: center;
  margin-top: 2%;
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
  font-size: 5%;
  margin-top: 11%;
}
.icon-xihuan{
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
  height: auto;
  margin-bottom: 10px;
  margin-top: 5%;
}
.m-info-message-from{
  display: inline;
  padding-right: 5px;
      padding-left: 11%;
}
.m-info-message-date{
  display: inline;
  padding-left: 5px;
}
.m-info-message-num{
  margin-top: 10px;
  display: block;
      padding-left: 11%;
}
</style>
