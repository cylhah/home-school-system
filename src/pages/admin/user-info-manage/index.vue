<template>
  <div class="user-info">
    <div class="title">
      <p>用户管理</p>
    </div>
    <div class="conditions">
      <span class="demonstration">条件筛选</span>
      <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
      </el-date-picker>
      <el-input class="username-input" v-model="username" placeholder="请输入用户名"/>
      <el-button icon="el-icon-search" circle  @click="search"></el-button>
  </div>
  <div class="user-list">
    <h3>用户列表:</h3>
    <el-table
      :data="userList"
      style="width: 100%"
      >
      <el-table-column
      prop="userId"
      label="用户编号"
      width="140">
      </el-table-column>
      <el-table-column
      prop="userRegisTime"
      label="注册日期"
      sortable="true"
      width="180">
      </el-table-column>
      <el-table-column
      prop="userEmail"
      label="用户邮箱"
      width="200">
      </el-table-column>
      <el-table-column
      prop="userRole"
      label="用户角色"
      width="200">
      </el-table-column>
      <el-table-column
      prop="userName"
      label="用户名">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="seeNewsList(scope.row)" type="text" size="small">查看动态</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog>
    <el-table :data="newsList">
      <el-table-column property="newsId" label="动态编号" width="150"></el-table-column>
      <el-table-column property="newsContent" label="动态内容" width="200"></el-table-column>
      <el-table-column property="newsUploadTime" label="上传时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="showNewsDetail(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      date: '',
      username: '',
      userList: [],
      commentList: [],
      outerVisible: false,
      innerVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: mapState('news/', {
    newsList: 'newsList'
  }),
  methods: {
    handleClick (row) {
      console.log(row.userName)
    },
    seeNewsList (row) {
      this.$store.dispatch('news/getNewsListByUserId', row.userId)
      this.outerVisible = true
    },
    showNewsDetail (row) {
    },
    async search () {
      try {
        const { data } = await axios.get('/user', {
          params: { sDate: this.date[0], eDate: this.date[1], username: this.username }
        })
        if (data.code === 0) {
          this.userList = data.userList
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  .title {
    p {
      font-size: 36px;
      font-weight: 500;
      border-bottom: 1px solid #C7D1DD;
      padding-bottom: 9px;
    }
  }
  .conditions {
    margin-top: 20px;
    display: flex;
    line-height: 40px;
    .demonstration {
      margin-right: 10px;
    }
    .username-input {
      width: 300px;
      margin: 0 10px;
    }
  }
  .user-list {
    h3 {
      margin: 20px 0;
    }
  }
}
</style>
