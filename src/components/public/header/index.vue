<template>
  <div class="app-container">
     <mt-header fixed :title="headerTitle"></mt-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'header',
  computed: mapState({
    headerTitle: state => state.user.headerTitle
  })
}
</script>

<style scoped>
.app-container {
  padding-top: 40px;
}
</style>
