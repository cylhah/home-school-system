<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: ['学生', '教师', '家长', '管理员'],
      datasets: [
        {
          label: '用户角色分布',
          backgroundColor: ['#ff6384', '#36A2EB', '#FFCE56', '#35B982'],
          data: [40, 20, 12, 39]
        }
      ]
    })
  }
}
</script>
