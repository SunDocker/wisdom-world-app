<template>
  <div class="me-allct-body">
    <el-container class="me-allct-container">
      <el-main>
        <!--        <el-tabs v-model="activeName">
                  <el-tab-pane label="idea分类" name="category">-->
        <template v-if="activeName === 'category'">
          <ul class="me-allct-items">
            <li v-for="c in categories" @click="view(c.id)" :key="c.id" class="me-allct-item">
              <div class="me-allct-content">
                <a class="me-allct-info">
                  <img class="me-allct-img" :src="c.avatar? c.avatar: defaultAvatar"/>
                  <h4 class="me-allct-name">{{ c.categoryName }}</h4>
                  <p class="me-allct-description">{{ c.description }}</p>
                </a>

                <div class="me-allct-meta">
                  <span>{{ c.ideas }} Idea</span>
                </div>
              </div>
            </li>
          </ul>
        </template>

        <!--          </el-tab-pane>-->

        <!--          <el-tab-pane label="标签" name="tag">-->
        <template v-else>
          <ul class="me-allct-items">
            <li v-for="t in tags" @click="view(t.id)" :key="t.id" class="me-allct-item">
              <div class="me-allct-content">
                <a class="me-allct-info">
                  <img class="me-allct-img" :src="t.avatar? t.avatar: defaultAvatar"/>
                  <h4 class="me-allct-name">{{ t.tagName }}</h4>
                </a>

                <div class="me-allct-meta">
                  <span>{{ t.ideas }}  Idea</span>
                </div>
              </div>
            </li>
          </ul>
        </template>

        <!--          </el-tab-pane>
                </el-tabs>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {listTags} from "@/api/tag";
import {listCategories} from "@/api/categories";
import defaultAvatar from '@/assets/img/logo.png'

export default {
  name: "IdeaAllCategory",
  data() {
    return {
      categories: [],
      tags: [],
      defaultAvatar: defaultAvatar
    }
  },
  computed: {
    /*categoryTagTitle() {
      if (this.activeName === 'category') {
        return 'idea分类'
      } else {
        return 'idea标签'
      }
    },*/
    activeName: {
      get() {
        return this.$route.params.type;
      },
      set() {

      },
    }
  },
  methods: {
    listCategories() {
      listCategories().then(res => {
        if (res) {
          if (res.data.success) {
            this.categories = res.data.data;
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
    listTags() {
      listTags().then(res => {
        if (res) {
          if (res.data.success) {
            this.tags = res.data.data;
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
    view(id) {
      this.$router.push(`${id}`)
    },
  },
  created() {
    this.listCategories()
    this.listTags()
  }
}
</script>

<style scoped>
.me-allct-body {
  margin: 80px auto 120px;
}

.me-allct-container {
  width: 1000px;
}

.me-allct-items {
  padding-top: 2rem;
}

.me-allct-item {
  width: 25%;
  display: inline-block;
  margin-bottom: 2.4rem;
  padding: 0 .7rem;
  box-sizing: border-box;
}

.me-allct-content {
  display: inline-block;
  width: 100%;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  transition: border-color .3s;
  text-align: center;
  padding: 1.5rem 0;
}

.me-allct-info {
  cursor: pointer;
}

.me-allct-img {
  margin: -40px 0 10px;
  width: 60px;
  height: 60px;
  vertical-align: middle;

}

.me-allct-name {
  font-size: 21px;
  font-weight: 150;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
}

.me-allct-description {
  min-height: 50px;
  font-size: 13px;
  line-height: 25px;
}

.me-allct-meta {
  font-size: 12px;
  color: #969696;
}
</style>