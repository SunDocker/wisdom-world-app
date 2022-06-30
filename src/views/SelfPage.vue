<template>
  <div>
    <el-container>
      <el-aside width="200px"
                style="background-color: #52a2f3;
                overflow: hidden;
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0">
        <div>
          <i class="el-icon-back" style="color: white;margin: 10px;cursor: pointer" @click="$router.push('/')"></i>
          <span style="color: white">返回首页</span>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 20px">
          <img class="me-header-picture" :src="user.avatar"/>
        </div>
        <div style="color: white;display: flex;justify-content: center">{{user.name}}</div>
        <el-divider></el-divider>
        <el-menu
            router
            default-active="/selfPage/record"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#52a2f3"
            text-color="#fff"
            active-text-color="#00008b">
          <el-menu-item index="/selfPage/record">
            <i class="el-icon-edit" style="color: white"></i>
            <span>记录的Idea</span>
          </el-menu-item>
          <el-menu-item index="/selfPage/collect">
            <i class="el-icon-star-off" style="color: white"></i>
            <span slot="title">收藏的Idea</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-left: 200px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SelfPage",
  data() {
    return {}
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
  },
  computed: {
    user() {
      let account = this.$store.state.account
      let avatar = this.$store.state.avatar
      let name = this.$store.state.name
      return {
        account, avatar, name
      }
    },
  }
}
</script>

<style scoped>


.me-header-picture {
  width: 46px;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>