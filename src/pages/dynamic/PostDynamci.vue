<template>
  <div class="container">
     <mt-header title="发动态" class="header">
        <mt-button  icon="back" slot="left">返回</mt-button>
        <mt-button class="mui-icon mui-icon-camera" slot="right">
          <i class="el-icon-edit-outline"></i>
        </mt-button>
    </mt-header>
    <div class="m-text">
      <el-input type="textarea" class="m-text-message" :autosize="{ minRows: 6, maxRows: 10 }" id="abc" :maxlength="150"></el-input>
      <!-- 添加图片视频 -->
      <!-- <div>
        <el-upload
          class="avatar-uploader"
          action="/api/posts/"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview">
          <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <! 展示的栏目 -->
        <!-- <div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
        </div>
      </div> -->
            <!-- lieiz2 -->
      <div>
        <el-upload
          action="/api/posts/"
          class="avatar-uploader"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <!-- 添加标签，添加地点，发布公开 -->
      <div>
          <span><a class="m-text-tuoyuan"><i class="el-icon-location">添加地点</i></a></span>
          <span><a class="m-text-tuoyuan"><i class="el-icon-location">添加标签</i></a></span>
          <span class="m-text-tuoyuan-right"><a class="m-text-tuoyuan"><i class="el-icon-location">公开</i></a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-share',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePictureCardPreview (file) {
      console.log(file.URL)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style scoped>
.app-container {
  padding-top: 40px;
}
.m-text{
  width: 100%;
  height: 50%;
}
#abc{
  height: 1500px;
  padding: 100px;
  autosize:
}
.m-text-tuoyuan{
  width: 100px;
  height: 20px;
  background-color: #dfdada;
  border-radius: 25px;
  color: #888;
}
.m-text-tuoyuan-right{
  float: right;
}
.m-upload-box{
  width: 25%;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: inline-block;
  }
</style>
