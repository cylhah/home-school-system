<template>
  <div class="news-mng">
    <div class="title">
      <p>动态管理</p>
    </div>
    <div class="accusation">
      <h3 class="accusation-title">举报列表:</h3>
      <el-table
        :data="accusationList"
        style="width: 100%"
        >
        <el-table-column
        prop="accusationUser.userName"
        label="举报者用户名"
        width="140">
        </el-table-column>
        <el-table-column
        prop="accusationTime"
        label="举报时间"
        sortable="true"
        width="180">
        </el-table-column>
        <el-table-column
        prop="accusationComment.commentContent"
        label="举报评论内容"
        width="200">
        </el-table-column>
        <el-table-column
        prop="accusationNews.newsContent"
        label="举报动态内容"
        width="200">
        </el-table-column>
        <el-table-column
        prop="accusationIntro"
        label="举报原因">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
            <el-button @click="reject(scope.row)" type="text" size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('accusation/getAccusationList')
  },
  computed: mapState({
    accusationList: state => state.accusation.accusationList
  })
}
</script>

<style lang="scss" scoped>
.news-mng {
  .title {
    p {
      font-size: 36px;
      font-weight: 500;
      border-bottom: 1px solid #C7D1DD;
      padding-bottom: 9px;
    }
  }
  .accusation {
    h3 {
      margin: 20px 0;
    }
  }
}
</style>
