<template>
  <div class="container">
     <mt-header title="发动态" class="header">
        <mt-button  icon="back" slot="left">返回</mt-button>
        <mt-button  class="mui-icon mui-icon-camera" slot="right">
          <i @click="sendnews" class="el-icon-edit-outline"></i>
        </mt-button>
    </mt-header>
    <div class="m-text">
      <el-input
        type="textarea"
        class="m-text-message"
        :autosize="{ minRows: 6, maxRows: 10 }"
        id="abc"
        :maxlength="150"
        v-model="content">
        </el-input>
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
        <el-form>
        <el-upload
          action="/api/news/upload"
          list-type="picture-card"
          name="picture"
          :limit="imgLimit"
          :file-list="productImgs"
          :multiple="isMultiple"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
          :on-error="imgUploadError">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" width="100%">
          <span v-if="isvideo"><video  width="100%" :src="dialogVideoUrl" alt="" controls="controls"  /></span>
          <span v-if="isimg"><img width="100%" :src="dialogImageUrl" alt=""/></span>
          <!-- <img width="100%" :src="dialogImageUrl" alt=""/> -->
        </el-dialog>
        </el-form>
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
import {mapState} from 'vuex'
export default {
  name: 'header-share',
  data () {
    return {
      content: '',
      dialogImageUrl: '',
      dialogVideoUrl: '',
      dialogVisible: false,
      productImgs: [],
      isMultiple: true,
      imgLimit: 6,
      TOLIST: [],
      isvideo: false,
      isimg: false,
      VideoArr: [],
      ImgArr: [],
      VideoStr: '',
      ImgStr: ''
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    sendNewsState: state => state.dongtai.sendNewsState
  }),
  methods: {
    isPicture (str) {
      let reg = /\.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/
      return reg.test(str)
    },
    isVideo (str) {
      let reg = /\.(mp4|avi|rmvb|rm|wma|MP4|AVI|RMVB|RM|WMA)$/
      return reg.test(str)
    },
    handleRemove (file, fileList) { // 移除图片
      console.log(file, fileList)
      let arr = this.TOLIST
      // 移除遍历
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].uid === file.uid) {
          arr.splice(i, 1)
        }
      }
    },
    handlePictureCardPreview (file) { // 预览图片时调用
      console.log('yulian' + file)
      let str = file.name
      if (str.indexOf('jpg') >= 0) {
        this.dialogImageUrl = file.url
        this.isimg = true
        this.isvideo = false
      } else if (str.indexOf('mp4') >= 0) {
        this.dialogVideoUrl = file.url
        this.isimg = false
        this.isvideo = true
      }
      console.log('image' + this.dialogImageUrl)
      console.log('video' + this.dialogVideoUrl)
      this.dialogVisible = true
    },

    beforeAvatarUpload (file) { // 文件上传之前调用做一些拦截限制
      console.log(file)
      const isJPG = true
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess (res, file) { // 图片上传成功
      console.log(res)
      console.log(file)
      // if (file.type === 'image/jepg/png') {
      //   this.imageUrl = URL.createObjectURL(file.raw)
      // } else if (file.type === 'mp4') {
      //   this.videoUrl = URL.createObjectURL(file.raw)
      // }
      this.TOLIST.push({uid: file.uid, fileurl: res.data})
    },
    handleExceed (files, fileList) { // 图片上传超过数量限制
      this.$message.error('上传图片不能超过6张!')
    },
    imgUploadError (err, file, fileList) { // 图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!')
    },
    sendnews () {
      console.log(JSON.stringify(this.TOLIST))
      let arr = this.TOLIST
      for (var i = 0; i < arr.length; i++) {
        if (this.isPicture(arr[i].fileurl)) {
          this.ImgArr.push(arr[i].fileurl)
        }
        if (this.isVideo(arr[i].fileurl)) {
          this.VideoArr.push(arr[i].fileurl)
        }
      }
      this.ImgStr = this.ImgArr.join()
      this.VideoStr = this.VideoArr.join()
      this.$store.dispatch('sendnews', {userId: this.userInfo.userId, Imgstr: this.ImgStr, VideoStr: this.VideoStr, Content: this.content}).then((res) => {
        this.$message({
          message: res,
          type: 'success'
        })
      })
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

  .el-dialog {
    margin: 0;
    position: fixed;
    bottom: 40%;
}
</style>
