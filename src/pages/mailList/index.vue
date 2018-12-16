<template>
  <div class="mail-list">
    <IndexList>
      <IndexSection v-for="itemOuter in 26" :key="itemOuter" :index="String.fromCharCode(64+itemOuter)" v-show="userListDict[String.fromCharCode(64+itemOuter)]">
        <mt-cell
          v-for="(item, index) in userListDict[String.fromCharCode(64+itemOuter)]"
          :key="index"
          :title="item.userNickname"
          @click.native="gotoChat(item.userId)"/>
      </IndexSection>
    </IndexList>
  </div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  components: {
    IndexList, IndexSection
  },
  methods: {
    gotoChat (userId) {
      this.$router.push({ path: `chat/${userId}` })
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    userListDict: state => state.myClass.userListDict
  }),
  async mounted () {
    await this.$store.dispatch('myClass/getUserList', { classId: this.userInfo.userClassId })
    this.$store.commit('myClass/setUserListDict')
  }
}
</script>

<style lang="scss" scoped>

</style>
