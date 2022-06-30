<template>
  <div>
    <el-container>

      <el-aside class="me-area">
        <ul class="me-month-list">
          <li v-for="a in archives" :key="a.year + a.month" class="me-month-item">
            <el-badge :value="a.count" type="primary">
              <el-button @click="changeArchive(a.year, a.month)" size="small">{{ a.year + '年' + a.month + '月' }}
              </el-button>
            </el-badge>
          </li>
        </ul>

      </el-aside>


      <el-main class="me-articles">
        <div class="me-month-title">{{ currentArchive }}</div>
        <IdeaScrollPage v-bind:query="idea" :key="`${this.idea.year}${this.idea.month}`"></IdeaScrollPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import IdeaScrollPage from "@/components/common/IdeaScrollPage";
import {listArchives} from "@/api/idea";

export default {
  name: "IdeaArchive",
  components: {
    IdeaScrollPage
  },
  data() {
    return {
      archives: {},
    }
  },
  computed: {
    currentArchive() {
      if (this.$route.params.year && this.$route.params.month) {
        return `${this.$route.params.year}年${this.$route.params.month}月`;
      }
      return '全部'
    },
    idea() {
      return {
        year: this.$route.params.year,
        month: this.$route.params.month
      }
    }
  },
  methods: {
    changeArchive(year, month) {
      if (this.idea.month !== month || this.idea.year !== year) {
        this.$router.push({path: `/archives/${year}/${month}`});
      }
      console.log(this.idea)
    },
    listArchives() {
      listArchives().then((res => {
        this.archives = res.data.data
      })).catch(error => {
        console.log(error)
        this.$message({type: 'error', message: 'Idea归档加载失败!', showClose: true})
      })
    },
  },
  created() {
    this.listArchives()
  }
}
</script>

<style scoped>
.el-container {
  width: 640px;
}

.el-aside {
  position: fixed;
  left: 200px;
  margin-right: 50px;
  width: 150px !important;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.me-month-list {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  list-style-type: none;
}

.me-month-item {
  margin-top: 18px;
  padding: 4px;
  font-size: 18px;
  color: #5FB878;
}

.me-order-list {
  float: right;
}

.me-month-title {
  margin-left: 4px;
  margin-bottom: 12px;
}

.me-area {
  background: white;
  position: fixed;
  z-index: 99999;
}
</style>