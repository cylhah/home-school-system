<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: '用户动态发布量',
          backgroundColor: ['#ff6384', '#36A2EB', '#FFCE56', '#35B982', '#FFBBFF', '#EE3B3B', '#D2691E', '#9AFF9A', '#9AC0CD', '#4876FF', '#EEE685', '#FFC0CB'],
          data: [40, 20, 12, 39, 18, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }, { maintainAspectRatio: false })
  }
}
</script>
