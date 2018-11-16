<template>
  <div class="user-manage">
    <div class="title">
      <p>用户流量查询</p>
    </div>
    <div class="user-data">
      <div class="user-data-show">
        <p class="myicon font-green"><i class="iconfont icon-tasks"/></p>
        <p class="number font-green">10</p>
        <div class="intro footer-green">
            <span>今日注册用户</span>
        </div>
      </div>
      <div class="user-data-show">
        <p class="myicon font-blue"><i class="iconfont icon-chart"/></p>
        <p class="number font-blue">60</p>
        <div class="intro footer-blue">
            <span>本周注册用户</span>
        </div>
      </div>
      <div class="user-data-show">
        <p class="myicon font-red"><i class="iconfont icon-user"/></p>
        <p class="number font-red">100</p>
        <div class="intro footer-red">
            <span>本月注册用户</span>
        </div>
      </div>
      <div class="user-data-show">
        <p class="myicon font-orange"><i class="iconfont icon-form"/></p>
        <p class="number font-orange">972</p>
        <div class="intro footer-orange">
            <span>今日动态发布量</span>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="chart chart1">
        <chart1/>
      </div>
      <div class="chart chart3">
        <chart3/>
      </div>
      <div class="chart chart2">
        <chart2/>
      </div>
    </div>
  </div>
</template>

<script>
import chart1 from './components/user-chart1'
import chart2 from './components/user-chart2'
import chart3 from './components/user-chart3'
export default {
  components: {
    chart1,
    chart2,
    chart3
  }
}
</script>

<style lang="scss" scoped>
.user-manage {
  .title {
    p {
      font-size: 36px;
      font-weight: 500;
      border-bottom: 1px solid #C7D1DD;
      padding-bottom: 9px;
    }
  }
  .user-data {
    display: flex;
    justify-content: space-between;
    .user-data-show {
      width: 270px;
      margin: 10px;
      background: white;
      border-radius: 5px;
      text-align: center;
      p {
        margin: 5px 0;
      }
      .myicon {
        i {
          font-size: 80px;
        }
      }
      .number {
        font-size: 25px;
      }
      .intro {
        width: 100%;
        font-size: 14px;
        padding: 10px 0;
        color: white;
        text-align: center;
      }
      .footer-green {
        background: rgb(92, 184, 92);
      }
      .font-green {
        color: rgb(92, 184, 92);
      }
      .footer-blue {
        background: #4CB1CF;
      }
      .font-blue {
        color: #4CB1CF;
      }
      .footer-red {
        background: #F0433D;
      }
      .font-red {
        color: #F0433D;
      }
      .footer-orange {
        background: #f0ad4e;
      }
      .font-orange {
        color: #f0ad4e;
      }
    }
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
    .chart {
      position: relative;
      background: #fff;
      margin: 10px;
      padding: 20px;
    }
    .chart1 {
      width: 750px;
      height: 380px;
    }
    .chart3 {
      width: 320px;
      height: 380px;
    }
    .chart2 {
      width: 800px;
    }
  }
}
</style>
