<template>
<div>
  <div class="me-ct-ideas">
    <IdeaItem v-for="idea in ideas" :key="idea.id" v-bind="idea" style="margin-top: 20px"></IdeaItem>
  </div>
</div>
</template>

<script>

import IdeaItem from "@/components/idea/IdeaItem";
import {getIdeasByAuthor} from "@/api/idea";

export default {
  name: "Record",
  components: {
    IdeaItem
  },
  data() {
      return {
          ideas: []
      }
  },
  methods: {
    getIdeasByAuthor() {
      getIdeasByAuthor(this.$store.state.id).then(res => {
        if (res.data.success) {
          this.ideas = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$message.error('系统错误')
        console.error(err)
      });
    },
  },
  created() {
    this.getIdeasByAuthor()
  }
}
</script>

<style scoped>
.me-ct-ideas {
  width: 640px;
  margin: auto;
}
</style>