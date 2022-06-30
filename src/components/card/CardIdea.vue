<template>
  <el-card :body-style="{ padding: '8px 18px' }">
    <div slot="header" class="me-category-header">
      <span>{{ cardHeader }}</span>
    </div>

    <ul class="me-category-list">
      <li v-for="i in ideas" @click="view(i.id)" :style="itemStyle" :key="i.id" class="me-category-item">
        <a>{{ i.title }}</a>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: "CardIdea",
  props: {
    cardHeader: String,
    ideas: Array,
    itemStyle: Object
  },
  methods: {
    view(id) {
      this.$router.push(`/view/${id}`)
    },
  },
}
</script>

<style scoped>
.me-category-header {
  font-weight: 600;
}

.me-category-list {
  list-style-type: none;
}

.me-category-item {
  padding: 4px;
  font-size: 14px;
  color: #52a2f3;
}

.me-category-item a:hover {
  text-decoration: underline;
}
</style>