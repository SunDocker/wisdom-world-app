<template>
  <div>
    <el-container>
      <el-main>
        <IdeaScrollPage></IdeaScrollPage>
      </el-main>

      <el-aside>
        <CardMe></CardMe>
        <CardTag :tags="hotTags"></CardTag>
        <CardIdea cardHeader="最热ideas" :ideas="hotIdeas"></CardIdea>
        <CardIdea cardHeader="最新ideas" :ideas="latestIdeas"></CardIdea>
        <CardArchive cardHeader="ideas归档" :archives="archives"></CardArchive>
      </el-aside>

    </el-container>
  </div>
</template>

<script>
//import IdeaItem from "@/components/idea/IdeaItem";
import IdeaScrollPage from "@/components/common/IdeaScrollPage";
import CardMe from "@/components/card/CardMe";
import CardTag from "@/components/card/CardTag";
import CardIdea from "@/components/card/CardIdea";
import CardArchive from "@/components/card/CardArchive";
import {getHotTags} from "@/api/tag";
import {getHotIdeas, getLatestIdeas, getArchives} from "@/api/idea";

export default {
  name: "Index",
  components: {
    IdeaScrollPage,
    //IdeaItem
    CardMe,
    CardTag,
    CardIdea,
    CardArchive
  },
  data() {
    return {
      hotTags: [],
      hotIdeas: [],
      latestIdeas: [],
      archives: []
    }
  },
  created() {
    this.getHotTags()
    this.getHotIdeas()
    this.getLatestIdeas()
    this.getArchives()
  },
  methods: {
    getHotTags() {
      getHotTags().then(res => {
        if (res) {
          if (res.data.success) {
            this.hotTags = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error('系统错误')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      })
    },
    getHotIdeas() {
      getHotIdeas().then(res => {
        if (res) {
          if (res.data.success) {
            this.hotIdeas = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error('系统错误')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      })
    },
    getLatestIdeas() {
      getLatestIdeas().then(res => {
        if (res) {
          if (res.data.success) {
            this.latestIdeas = res.data.data;
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
    getArchives() {
      getArchives().then(res => {
        if (res) {
          if (res.data.success) {
            this.archives = res.data.data;
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
  },
}
</script>

<style scoped>
/**
在ElementUI中标签名也是样式名
 */

.el-container {
  width: 960px;
}

.el-aside {
  margin-left: 20px;
  width: 260px;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}
</style>