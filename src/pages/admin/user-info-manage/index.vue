<template>
  <div class="user-info">
    <div class="title">
      <p>用户数据管理</p>
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
          value-format="timestamp"
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
      prop="userRegisterTime"
      label="注册日期"
      sortable="true"
      width="180">
      </el-table-column>
      <el-table-column
      prop="userNickname"
      label="用户昵称"
      width="200">
      </el-table-column>
      <el-table-column
      prop="userType"
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
          <el-button @click="seeCommentList(scope.row)" type="text" size="small">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog :title="outerTitle" :visible.sync="outerVisible">
    <el-dialog
      width="60%"
      title="动态详情"
      :visible.sync="innerVisible"
      append-to-body>
      <div class="detail">
        <div class="head">
          <img src="../../../assets/img/admin-head.jpg">
        </div>
        <div class="main">
          <div class="user-name">
            小猴的家长
          </div>
          <div class="content">
            {{ news.newsContent }}
          </div>
          <div class="comment">
            <p class="item">
              <span>梁爽：</span>陪安东尼度过
            </p>
            <p class="item">
              <span>梁爽：</span>陪安东尼度过
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-table :data="newsList" v-show="showType === 1">
      <el-table-column property="newsId" label="动态编号" width="150"></el-table-column>
      <el-table-column property="newsContent" label="动态内容" width="200"></el-table-column>
      <el-table-column property="newsUploadTime" label="上传时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="showNewsDetail(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="commentList" v-show="showType === 2">
      <el-table-column property="commentId" label="评论编号" width="150"></el-table-column>
      <el-table-column property="commentContent" label="评论内容" width="200"></el-table-column>
      <el-table-column property="commentTime" label="评论时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="deleteComment(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      date: '',
      showType: 1,
      outerTitle: '',
      username: '',
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
  computed: mapState({
    newsList: state => state.news.newsList,
    news: state => state.news.news,
    commentList: state => state.comment.commentList,
    userList: state => state.admin.userList
  }),
  methods: {
    seeCommentList (row) {
      this.showType = 2
      this.outerTitle = '用户评论'
      this.$store.dispatch('comment/getCommentListByUserId', row.userId)
      this.outerVisible = true
    },
    seeNewsList (row) {
      this.showType = 1
      this.outerTitle = '用户动态'
      this.$store.dispatch('news/getNewsListByUserId', row.userId)
      this.outerVisible = true
    },
    showNewsDetail (row) {
      this.$store.dispatch('news/getNewsById', row.newsId)
      this.innerVisible = true
    },
    search () {
      this.$store.dispatch('admin/getUserList',
        { startTime: this.date[0], endTime: this.date[1], userName: this.username })
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
.detail {
  display: flex;
  .head {
    margin-right: 10px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .main {
    width: 500px;
    div {
      margin-bottom: 10px;
    }
    .user-name {
      color: rgb(64, 136, 218);
    }
    .comment {
      background: rgb(238, 238, 238);
      padding: 5px;
      .item {
        margin: 5px 0;
        span {
          color: rgb(64, 136, 218);
        }
      }
    }
  }
}
</style>
