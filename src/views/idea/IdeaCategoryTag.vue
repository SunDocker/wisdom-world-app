<template>
  <div class="me-ct-body">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area">
          <template v-if="this.$route.params.type === 'tag'">
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
            <h3 class="me-ct-name">{{ ct.tagName }}</h3>
            <span class="me-ct-meta">Idea</span>
          </template>

          <template v-else>
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
            <h3 class="me-ct-name">{{ ct.categoryName }}</h3>
            <p>{{ ct.description }}</p>
            <div class="me-ct-meta" style="margin: 10px">Idea</div>
          </template>
        </div>

        <div class="me-ct-ideas">
          <IdeaScrollPage v-bind:query="idea"></IdeaScrollPage>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import IdeaScrollPage from "@/components/common/IdeaScrollPage";
import {getTagDetailById} from "@/api/tag";
import defaultAvatar from '@/assets/img/logo.png'
import {getCategoryDetailById} from "@/api/categories";

export default {
  name: "IdeaCategoryTag",
  components: {
    IdeaScrollPage
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      ct: {
        tagName: '',
        categoryName: ''
      },
      idea: {}
    }
  },
  methods: {
    getTagDetailById(id) {
      getTagDetailById(id).then(res => {
        if (res) {
          if (res.data.success) {
            this.ct = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error('系统错误')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      })
    },
    getCategoryDetailById(id) {
      getCategoryDetailById(id).then(res => {
        if (res) {
          if (res.data.success) {
            this.ct = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error('系统错误')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      })
    },
    getCategoryOrTagAndIdeas() {
      let type = this.$route.params.type
      let id = this.$route.params.id
      if ('tag' === type) {
        this.getTagDetailById(id)
        this.idea.tagId = id
      } else if ('category' === type) {
        this.getCategoryDetailById(id)
        this.idea.categoryId = id
      }
    },
  },
  created() {
    this.getCategoryOrTagAndIdeas()
  }
}
</script>

<style scoped>
.me-ct-body {
  margin: 60px auto 100px;
  min-width: 100%;
}

.el-main {
  padding: 0;
}

.me-ct-title {
  text-align: center;
  min-height: 140px;
  padding: 25px 20px 0 20px;
}

.me-ct-picture {
  width: 60px;
  height: 60px;
}

.me-ct-name {
  font-size: 28px;
}

.me-ct-meta {
  font-size: 16px;
  color: #969696;
}

.me-ct-ideas {
  width: 640px;
  margin: auto;
}
</style>