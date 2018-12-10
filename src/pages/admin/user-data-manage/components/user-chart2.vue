<script>
import { Bar } from 'vue-chartjs'
export default {
  props: ['data'],
  extends: Bar,
  mounted () {
    let data = this.data
    this.renderChart({
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [
        {
          label: '用户动态发布量',
          backgroundColor: ['#ff6384', '#36A2EB', '#FFCE56', '#35B982', '#FFBBFF', '#EE3B3B', '#D2691E', '#9AFF9A', '#9AC0CD', '#4876FF', '#EEE685', '#FFC0CB'],
          data
        }
      ]
    }, { maintainAspectRatio: false })
  }
}
</script>
