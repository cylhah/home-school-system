<template>
  <div class="app-container">
<div class="mui-content">
<h5 class="mui-content-padded" style="margin: 10px 10px 15px 10px;">账号信息</h5>
<ul id="OA_task_1" class="mui-table-view">
<li class="mui-table-view-cell">
<span>姓名</span><span class="twoword">{{ name }}</span>
</li>
<li class="mui-table-view-cell" @click="nlist('jianjie')">
<span>简介</span><span class="twoword">{{ person.jianjie }}</span>
</li>
<li class="mui-table-view-cell" @click="nlist('interest')">
<span>我的爱好</span><span class="fourword">{{ person.interest }}</span>
</li>
<li class="mui-table-view-cell" @click="nlist('work')">
<span>职业</span><span class="oneword">{{ person.work }}</span>
</li>
</ul>
<h5 class="mui-content-padded" style="margin:  1px 10px 15px 10px;">个人信息</h5>
<ul id="OA_task_2" class="mui-table-view">
<li class="mui-table-view-cell">
<div class="mui-slider-handle mui-table">
<span>性别</span><span class="oneword">{{ person.sex }}</span>
</div>
</li>
<li class="mui-table-view-cell" @click="nlist('phone')">
<span>联系方式</span>
                    <span class="fourword">{{ person.phone }}</span>
</li>
<li class="mui-table-view-cell" @click="nlist('address')">
<span>家庭地址</span>
<span class="fourword">{{ person.address }}</span>
</li>
</ul>
</div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      keywords: '',
      id: 18,
      name: '',
      person: {}
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    personalInfo: state => state.personal.personalInfo
  }),
  methods: {
    nlist (word) {
      this.$prompt('修改信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        var userId = this.person.userId
        this.$store.dispatch('personal/' + word, { userId, value }).then((res) => {
          if (res.data.code === 0) {
            this.person[word] = value
          }
        })
        this.$message({
          type: 'success',
          message: '已修改！ 信息: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    getInfo () {
      let userId = this.userInfo.userId
      this.name = this.userInfo.userNickname
      this.$store.dispatch('personal/sendPersonalInform', { userId }).then((res) => {
        this.person = res.data.data
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style scoped>
 @import '../../lib/mui/css/mui.min.css';
.fourword{
    margin-left: 10%;
}
.twoword{
    margin-left: 19%;
}
.oneword{
    margin-left: 22%;
}
.el-message-boxs{
  width: 100%;
}
</style>
