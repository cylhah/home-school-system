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
        prop="accusationUserId"
        label="举报者编号"
        width="140">
        </el-table-column>
        <el-table-column
        label="举报时间"
        sortable="true"
        width="180">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.accusationTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
        prop="accusationCommentId"
        label="举报评论编号"
        width="200">
        </el-table-column>
        <el-table-column
        prop="accusationNewsId"
        label="举报动态编号"
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
            <el-button @click="deleteItem(scope.row)" type="text" size="small">删除消息</el-button>
            <el-button @click="ignore(scope.row)" type="text" size="small">忽略</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="menu">
      <div class="menu-box">
        <el-button type="primary" icon="el-icon-arrow-left" circle @click="prePage"></el-button>
        <span>{{pageNumber}}</span>
        <el-button type="primary" icon="el-icon-arrow-right" circle @click="nextPage"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TimeFormat from '../../../util/formatTime'
export default {
  data () {
    return {
      pageNumber: 1,
      pageSize: 5
    }
  },
  methods: {
    formatTime (time) {
      let date = new Date(time)
      return TimeFormat('yyyy-MM-dd hh:mm', date)
    },
    ignore (row) {
      this.$store.dispatch('accusation/updateAccusationStatus', {
        accusationId: row.accusationId,
        accusationStatus: 1
      })
    },
    deleteItem (row) {
      if (row.accusationNewsId) {
        this.$store.dispatch('news/deleteNewsById', { newsId: row.accusationNewsId })
      }
    },
    getAccusationList () {
      this.$store.dispatch('accusation/getAccusationList', {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
    },
    prePage () {
      this.pageNumber -= 1
      this.getAccusationList()
    },
    nextPage () {
      this.pageNumber += 1
      this.getAccusationList()
    }
  },
  mounted () {
    this.getAccusationList()
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
    margin-bottom: 15px;
    h3 {
      margin: 20px 0;
    }
  }
  .menu {
    display: flex;
    justify-content: center;
    .menu-box {
      display: flex;
      align-items: center;
      span {
        font-size: 25px;
        margin: 0 10px;
      }
    }
  }
}
</style>
