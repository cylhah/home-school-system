<template>
<div class="c-tabbar">
  <el-row class="c-tabbar-comment">
    <el-col :span="18">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" :maxlength="150" style="width:80%;">1231</el-input>
    </el-col>
    <el-col :span="6">
      <div class="big">放大</div>
      <div class="send">发送</div>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.c-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 200px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    padding: 0;
    .c-tabbar-comment{
      flex: 1;
      width: 100%;
      height: 60px;
      .c-tabbar-comment-content{
        width: 80%;
        height: 100%;
      }
      .c-tabbar-comment-sidebar{
        width: 20%;
        height: 100%;
      }
      .big{
        padding-bottom: 20%;
      }
    }
    .c-tabbar-bottom{
      width: 100%;
      height: 20px;
    }
}
</style>
