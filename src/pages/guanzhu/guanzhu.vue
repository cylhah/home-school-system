<template>
  <div class="app-container">
    <app-header :title="'关注'" :url="'/#/index2/personal'"/>
  <div>
<div class="item1">
     <table style="width: 100%; text-align: center">
      <td style="padding: 15px;"><router-link to="/starguanzhunew">
         <span> <div><i class="iconfont icon-xihuan1"></i></div>
      <div style="color:black;font-size: 14px;">特别关注</div></span>
      </router-link></td>
      <td style="padding: 15px;"><router-link to="/allguanzhunew">
         <span to="/index2"> <div><i class="mui-icon-extra mui-icon-extra-peoples"></i></div>
      <div style="color:black;font-size: 14px;">全部关注</div></span>
      </router-link></td>
      <td style="padding: 15px;"><router-link to="/tuijain">
         <span to="/index2"> <div><i class="mui-icon mui-icon-pulldown"></i></div>
      <div style="color:black;font-size: 14px;">推荐用户</div></span>
      </router-link></td>
      </table>
  </div>
  </div>
 <div class="app-container1">
   <transition name="slide-fade">
   <router-view></router-view>
   </transition>
  </div>
  </div>
</template>

<script>
import appHeader from '../../components/public/header/header-index'
export default {
  data () {
    return {
      keywords: ''
    }
  },
  components: {
    appHeader
  }
}
</script>

<style scoped>
 @import '../../lib/mui/css/mui.min.css';
.slide-fade-enter-active ,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter{
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to{
  transform: translateX(-100%);
  opacity: 0;
  position: absolute;
}
.app-container{
padding-top: 0%;
width: 100%;
overflow-x: hidden;
}
.dongtao{
   padding: 1%;
}
.sousuo{
  margin: -16px;
  margin-bottom: -14px;
}
.item1 {
  background-color: rgb(255, 255, 255);
    margin: 0px;
  margin-bottom: 6px;
      height: 4%;
  }
.icon-xihuan1{
  font-size: 35px;
  color: red;
}
.icon-xihuan{
  font-size: 35px;
  color: red;
}
.guanzhu-icon{
  font-size: 15px;
  color: red;
}
.mui-icon-extra-peoples{
   font-size: 35px;
  color: rgb(255, 174, 0);
}
.mui-icon-pulldown{
   font-size: 35px;
  color: rgb(0, 240, 20);
}
.word{
  font-size: 14px;
}
.td, th {
    padding: 15px;
}
.app-container1{
padding-top: 1%;
width: 100%;
background-color: rgb(255, 255, 255);
    /* border: 1px solid #ccc!important;
    padding: 5px;
    border-radius: 5px!important; */
}
.kua{
  margin: 10px;
  margin-bottom: -16px;
}
.touxiang{
  margin: -2px;
    width: 58px;
    height: 58px;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 29px;
    background-clip: padding-box;
}
.xinxi{
    margin: 1%;
    width: 15%;
    display: inline-block;
}
.guanzhu{
    float: right;
    padding: 0px 0px;
    margin: 2%;
    width: 27%;
    border: 1px solid rgb(255, 255, 255)!important;
    background-color: rgb(255, 255, 255);
    border-radius: 5px!important;
}
.guanzhu1{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(250, 117, 7);
   border: 1px solid rgb(250, 117, 7)!important;
   border-radius: 5px!important;
}
.guanzhu2{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid rgb(130, 136, 130)!important;
  color: rgb(130, 136, 130);
  border-radius: 5px!important;
}
.username{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
.time{
  font-size: 5px;
}
.inconStar{
  font-size: 150%;
}
</style>
