<template>
  <div>
    <el-dialog
      custom-class="m-dialog"
      :visible.sync="vis"
      width="100%"
      title="投诉"
      :top="mainMinHeight"
      @close="closeDialog"
      :show-close="true"
      >
      <div class="accuse">
        <!-- <div class="item" id="head"><div class="item-left">X</div><div class="item-right">投诉评论</div></div> -->
        <div class="item" id="usercontent">@{{accuseitem.newsUser.userNickname}} :{{accuseitem.newsContent}}</div>
        <div class="item2">
          <span
            v-for="(item, index) in accuseArr"
            :key=index
            @click="clickParentName(index)"
            :class="[item.name==accusationType ? 'typeselect' : '']">
            {{item.name}}
          </span>
        </div>
        <div class="item2" v-if="showchilren">
          <div>请选择具体原因</div>
          <span
            v-for="(itemChild, index) in accuseChild"
            :key=index
            @click="clickAccusationType(itemChild)"
            :class="[itemChild==accusationIntro ? 'typeselect' : '']">
            {{itemChild}}
          </span>
        </div>
        <div class="item" @click="sendaccuse" style=" justify-content: center;">提交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    accuseVisible: Boolean,
    accuseitem: Object
  },
  computed: {
    ...mapState({
      accuseToVisible: state => state.dongtai.accuseToVisible
    })
  },
  watch: {
    accuseVisible (newValue, oldValue) {
      this.vis = newValue
    }
  },
  data () {
    return {
      mainMinHeight: `${window.screen.availHeight / 3}px`,
      vis: false,
      showchilren: false,
      accuseArr: [
        {
          name: '垃圾营销',
          arrs: ['广告信息', '卖粉丝认证', '图片广告', '广告信息@我', '其他广告']
        },
        {
          name: '涉黄信息',
          arrs: ['售卖色情资源', '低俗信息', '色情图文', '侵害未成年人']
        },
        {
          name: '有害信息',
          arrs: ['暴恐血腥', '宗教民族问题', '侮辱英烈', '其他有害信息']
        },
        {
          name: '违法信息',
          arrs: ['涉枪爆刀', '毒品', '赌博', '假证', '其他违禁毒品']
        },
        {
          name: '侵犯人身权益',
          arrs: ['泄露我的隐私', '人身攻击我']
        }
      ],
      accuseChild: [],
      accusationType: '',
      accusationIntro: ''
    }
  },
  methods: {
    clickParentName (index) {
      this.showchilren = true
      this.accuseChild = this.accuseArr[index].arrs
      this.accusationType = this.accuseArr[index].name
      this.accusationIntro = ''
    },
    clickAccusationType (item) {
      this.accusationIntro = item
      console.log(item)
    },
    sendaccuse () {
      console.log('send')
      var param = new URLSearchParams()
      param.append('accusationUserId', 18)
      param.append('accusationType', this.accusationType)
      if (this.accuseitem.newsId) {
        param.append('accusationNewsId', this.accuseitem.newsId)
      }
      if (this.accuseitem.accusationCommentId) {
        param.append('accusationCommentId', this.accuseitem.accusationCommentId)
      }
      param.append('accusationIntro', this.accusationIntro)
      this.$store.dispatch('postAccuse', param).then((res) => {
        this.$message({
          message: '举报成功',
          type: 'success'
        })
        this.$emit('close-dialogStatus', true)
      })
    },
    closeDialog () {
      this.$emit('close-dialogStatus', true)
    }
  }
}
</script>

<style scoped lang="scss">
  .text-center{
    text-align: center;
  }
  .accuse{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      padding: 10px;
      margin: 0;
      display: flex;
      color: rgb(48, 48, 48);
      box-sizing: border-box;
      text-align: center;
      .item-left {
        width: 2%;
      }
      .item-right{
        width: 95%;
        text-align: center;
        font-weight: bold;
      }
    }
    .item2 {
      span {
        padding: 0 5px;
        text-align: center;
        display: inline-block;
        width: 26%;
        margin: 1% 1%;
        border-radius: 5px;
        background: #ddddddbd;
      }
      .typeselect{
        color: orangered ;
      }
    }
  }
</style>
