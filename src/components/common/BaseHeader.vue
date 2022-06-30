<template>
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="1" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="@/assets/img/logo.png"/>
        </router-link>
      </el-col>

      <template v-if="!simple">
        <el-col :span="12" style="margin-left: 30px">
          <el-menu :router=true
                   menu-trigger="click"
                   active-text-color="#00aaff"
                   :default-active="activeIndex"
                   mode="horizontal">
            <el-menu-item index="/" style="margin-left: 110px">首页</el-menu-item>
            <el-menu-item index="/category/all">Idea分类</el-menu-item>
            <el-menu-item index="/tag/all">Idea标签</el-menu-item>
            <el-menu-item index="/archives/">Idea归档</el-menu-item>
            <el-menu-item
                v-if="this.$store.state.id"
                index="/write" style="margin-left: 60px">
              <i class="el-icon-edit"></i>记录Idea
            </el-menu-item>
            <el-menu-item
                index=""
                style="margin-left: 80px"
                v-else>
              <i class="el-icon-edit"></i>要记录idea请先登录
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="5">
          <el-menu mode="horizontal" active-text-color="#5FB878">
            <el-menu-item style="margin-left: 30px">
              <template>
                <el-autocomplete
                    v-model="search"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入并选择匹配的Idea"
                    @select="handleSelect"
                ></el-autocomplete>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </template>

      <template v-else>
        <slot></slot>
      </template>


      <el-col :span="5">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#00aaff">
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu style="margin-left: 80px; color: darkgray">
              <template slot="title">
                <span style="margin-right: 10px">{{ user.name }}</span>
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
              <el-menu-item @click="selfPage"><i class="el-icon-user"/>个人主页</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>

    </el-row>
  </el-header>
</template>

<script>

import {searchIdea} from "@/api/idea";

export default {
  name: 'BaseHeader',
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    user() {
      let login = this.$store.state.account
      let avatar = this.$store.state.avatar
      let name = this.$store.state.name
      return {
        login, avatar, name
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        //this.$router.go(0)
        this.$message.success('成功退出登录')
      }).catch(err => {
        console.error(err)
      });
    },
    querySearchAsync(queryString, cb) {
      searchIdea(this.search).then((res) => {
        if (res.data.success) {
          const results = [];
          for (const item of res.data.data) {
            results.push({
              id: item.id,
              value: item.title
            });
          }
          cb(results)
        }
      });
    },
    handleSelect(item) {
      this.search = ''
      this.$router.push({path: '/view/' + item.id})

    },
    selfPage() {
      this.$router.push('/selfPage/record')
    },
  }
}
</script>

<style scoped>
.el-button {
  color: #00aaff;
}

.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #00aaff;
}
</style>
