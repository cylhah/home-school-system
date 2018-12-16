<template>
  <div>
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
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <!-- <img width="100%" :src="dialogImageUrl" alt=""> -->
        <img width="100%" :src="dialogImageUrl" alt=""/>
        <!-- <video :src="dialogImageUrl" ></video> -->
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      productImgs: [],
      isMultiple: true,
      imgLimit: 6
    }
  },
  methods: {
    handleRemove (file, fileList) { // 移除图片
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) { // 预览图片时调用
      console.log(file)
      let str = file.name
      if (str.indexOf('jpg') >= 0) {
        this.dialogImageUrl = file.url
      }
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
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleExceed (files, fileList) { // 图片上传超过数量限制
      this.$message.error('上传图片不能超过6张!')
    },
    imgUploadError (err, file, fileList) { // 图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!')
    }
  }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
