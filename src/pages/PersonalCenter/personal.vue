<template>
  <div class="app-container">
<div class="mui-content">
<h5 class="mui-content-padded" style="margin: 1px 10px 15px 10px;">账号信息</h5>
<ul id="OA_task_1" class="mui-table-view">
<li class="mui-table-view-cell">
<span>姓名</span><span class="twoword">{{ name }}</span>
</li>
<li class="mui-table-view-cell" @click="nlist()">
<span>简介</span><span class="twoword">{{ jianjie }}</span>
</li>
<li class="mui-table-view-cell">
<span>关联学校</span><span class="fourword">{{ school }}</span>
</li>
<li class="mui-table-view-cell">
<span>关联班级</span><span class="fourword">{{ stuclass }}</span>
</li>
</ul>
<h5 class="mui-content-padded" style="margin:  1px 10px 15px 10px;">个人信息</h5>
<ul id="OA_task_2" class="mui-table-view">
<li class="mui-table-view-cell">
<div class="mui-slider-handle mui-table">
<span>性别</span><span class="oneword">{{ sex }}</span>
</div>
</li>
<li class="mui-table-view-cell">
<span>联系方式</span>
                    <span class="fourword">{{ number }}</span>
</li>
<li class="mui-table-view-cell">
<span>家庭地址</span>
<span class="fourword">{{ addr }}</span>
</li>
</ul>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      keywords: '',
      id: 1,
      name: '张三',
      jianjie: '我叫张三，我是张三三的家长',
      school: '希望中学',
      stuclass: '高二三班',
      sex: '女',
      number: '15954262483',
      addr: '学院路154号'
    }
  },
  methods: {
    nlist () {
      this.$prompt('修改简介', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.jianjie = value
        this.$message({
          type: 'success',
          message: '简介已修改！ 信息: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
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
</style>
