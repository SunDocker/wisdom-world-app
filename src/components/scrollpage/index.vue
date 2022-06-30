<template>
  <div ref="scroll" id="scroll-page" style="overflow: hidden">
    <slot></slot>
    <!--loading动画，加载的数据的过程中显示 elementui load-->
    <div
        style="height: 46px;margin-top: 16px;z-index: 1;"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(245,245,245)">
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    loading: Boolean,
    noData: Boolean,
    offset: Number
  },
  mounted() {
    //绑定事件监听，滚动的时候触发
    window.addEventListener('scroll', this.handleScroll, false);
  },
  beforeDestroy() {
    //移出事件监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      scrollAction: {
        x: 'undefined',
        y: 'undefined'
      },
      //loading: false
    }
  },
  methods: {
    handleScroll() {
      //获取div区域
      //var scrollPage = document.getElementById('scroll-page');
      const that = this;
      let curHeight = document.documentElement.scrollTop || document.body.scrollTop
      //判断是否到达底部
      if ((curHeight + window.innerHeight >= that.$refs.scroll.offsetHeight + that.offset) && that.isDownDirection()) {
        //如果还有未加载的数据，触发
        if (!that.noData) {
          if (!that.loading) {
            //调用load加载数据
            that.$emit('load')
          }
        }
      }
    },
    isDownDirection() {
      if (typeof this.scrollAction.x == 'undefined') {
        this.scrollAction.x = window.pageXOffset;
        this.scrollAction.y = window.pageYOffset;
      }
      let diffX = this.scrollAction.x - window.pageXOffset;
      let diffY = this.scrollAction.y - window.pageYOffset;

      this.scrollAction.x = window.pageXOffset;
      this.scrollAction.y = window.pageYOffset;

      if (diffX < 0) {
        // Scroll right
      } else if (diffX > 0) {
        // Scroll left
      } else if (diffY < 0) {
        // Scroll down
        return true
      } else if (diffY > 0) {
        // Scroll up
      } else {
        // First scroll event
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>