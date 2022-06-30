<template>
  <ScrollPage :offset="offset" :no-data="noData" :loading="loading" @load="load">
    <IdeaItem v-for="idea in ideas" :key="idea.id" v-bind="idea"></IdeaItem>
  </ScrollPage>
</template>

<script>
import ScrollPage from '@/components/scrollpage'
import IdeaItem from "@/components/idea/IdeaItem";
import {getIdeas} from "@/api/idea";

export default {
  name: "IdeaScrollPage",
  components: {
    ScrollPage, IdeaItem
  },
  data() {
    return {
      loading: false,
      offset: 0,
      noData: false,
      ideas: [],
      innerPage: {
        page: 1,
        pageSize: 10
      }
    }
  },
  props: {
    query: {
      type: Object,
      default() {
        return {
          tagId: null,
          categoryId: null,
          year: null,
          month: null
        }
      }
    }
  },
  methods: {
    load() {
      this.loading = true
      //模拟延迟效果
      window.setTimeout(() => {
        this.getIdeas()
      }, 800)
    },
    getIdeas() {
      this.innerPage.tagId = this.query.tagId
      this.innerPage.categoryId = this.query.categoryId
      this.innerPage.year = this.query.year
      this.innerPage.month = this.query.month
      getIdeas(this.innerPage).then(res => {
        if (res.data.success) {
          if (res.data.data.length === 0) {
            this.noData = true;
            this.$message.info("没有更多idea啦")
          } else {
            this.ideas = this.ideas.concat(res.data.data);
            this.innerPage.page++
          }
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$message.error("系统错误")
        console.log(err)
      }).finally(() => this.loading = false)
    },
  },
  created() {
    this.getIdeas()
  },
}
</script>

<style scoped>
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;

}
</style>