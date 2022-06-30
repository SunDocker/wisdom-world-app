<template>
  <div id="home">
    <el-container>

      <BaseHeader :activeIndex="activeIndex"></BaseHeader>

      <router-view class="me-container" :key="this.$route.path"/>

      <BaseFooter v-show="footerShow"></BaseFooter>

    </el-container>

  </div>
</template>

<script>
import BaseHeader from "@/components/common/BaseHeader";
import BaseFooter from "@/components/common/BaseFooter";

export default {
  name: "Home",
  components: {
    BaseHeader, BaseFooter
  },
  data() {
    return {
      activeIndex: '/',
      footerShow: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vc => {
      vc.activeIndex = to.path
    });
  },
  beforeRouteUpdate(to, from, next) {
    //this.footerShow = to.path === '/';
    this.activeIndex = to.path
    next()
  }
}
</script>

<style scoped>
.me-container {
  margin: 100px auto 80px;
}
</style>