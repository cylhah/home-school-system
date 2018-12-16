<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  mounted () {
    this.renderChart({
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [
        {
          label: '用户动态发布量',
          backgroundColor: ['#ff6384', '#36A2EB', '#FFCE56', '#35B982', '#FFBBFF', '#EE3B3B', '#D2691E', '#9AFF9A', '#9AC0CD', '#4876FF', '#EEE685', '#FFC0CB'],
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }, { maintainAspectRatio: false })
  }
}
</script>
