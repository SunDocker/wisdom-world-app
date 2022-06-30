<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-idea-header">
      <a @click="view(id)" class="me-idea-title">{{ title }}</a>
      <el-button v-if="weight > 0" class="me-idea-icon" type="text">置顶</el-button>
      <span class="me-pull-right me-idea-count">
        <i class="el-icon-s-comment"></i>&nbsp;{{ commentCounts }}
      </span>
      <span class="me-pull-right me-idea-count">
        <i class="el-icon-view"></i>&nbsp;{{ viewCounts }}
      </span>
      <span class="me-pull-right me-idea-count">
        <i class="el-icon-star-on"></i>{{ collectCounts }}
      </span>
    </div>
    <div class="me-idea-description">
      {{ summary }}
    </div>
    <div class="me-idea-footer">
      <span class="me-idea-author">
        <i class="me-icon-author"></i>&nbsp;{{ author.nickname }}
      </span>

      <el-tag v-for="t in tags" :key="t.tagName" size="mini" type="primary">{{ t.tagName }}</el-tag>

      <span class="me-pull-right me-idea-count">
        <i class="el-icon-time"></i>&nbsp;{{ fmtTime }}
      </span>

    </div>
  </el-card>
</template>

<script>
import {formatTime} from "@/utils/time";

export default {
  name: "IdeaItem",
  data() {
    return {}
  },
  props: {
    id: String,
    weight: Number,
    title: String,
    commentCounts: Number,
    viewCounts: Number,
    collectCounts: Number,
    summary: String,
    author: Object,
    tags: Array,
    createDate: Number
  },
  computed: {
    fmtTime() {
      return formatTime(this.createDate)
    },
  },
  methods: {
    view(id) {
      this.$router.push({path: `/view/${id}`})
    },
  },
}
</script>

<style scoped>

.me-idea-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-idea-title {
  font-weight: 600;
}

.me-idea-title:hover {
  cursor: pointer;
}

.me-idea-icon {
  padding: 2px 20px;
}

.me-idea-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-idea-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-idea-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
</style>