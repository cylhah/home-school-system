<script>
import { Line } from 'vue-chartjs'
export default {
  props: ['data'],
  extends: Line,
  mounted () {
    let data = this.data
    this.renderChart({
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [
        {
          label: '用户注册量统计图',
          backgroundColor: '#f87979',
          data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
