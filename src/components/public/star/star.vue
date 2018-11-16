<template>
  <div class="Star">
      <div class="Star-icon" @click="toggle" :class="AnimateClass" :style='{color:ColorValue}' :dianzan="dianzan">
        <slot name="icon"></slot>
        <span name="number" >{{number}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Star',
  props: {
    animates: String,
    colors: String,
    number: Number,
    dianzan: Number
  },
  methods: {
    toggle () {
      this.active = !this.active
      this.toggleAnimate = !this.toggleAnimate
      this.toggleColor = !this.toggleColor
    }
  },
  data () {
    return {
      active: false,
      toggleAnimate: false,
      toggleColor: false
    }
  },
  computed: {
    AnimateClass () {
      return this.toggleAnimate ? this.animates : ''
    },
    ColorValue () {
      return this.toggleColor ? this.colors : ''
    }
  },
  mounted () {
    if (this.dianzan === 1) {
      this.active = true
      this.toggleAnimate = true
      this.toggleColor = true
    }
  }
}
</script>

<style scoped >
.Star{
  position: relative;
  width: 45px;
  height: 20px;
  /* position: absolute; */
}
/* .Star-icon {
  z-index: 888;
} */
</style>
