<template>
  <div class="aside-nav__sub">
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      default-expand-all
      highlight-current
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface Tree {
  label: string
  children?: Tree[]
}

const data: Tree[] = [
  {
    label: '我的文件',
    children: [
      {
        label: '图片'
      },
      {
        label: '文档',
        children: [],
      },
      {
        label: '视频',
        children: [],
      },
      {
        label: '音频',
        children: [],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

// 当前分类
type filesCategory = 'all' | 'image' | 'document' | 'video' | 'audio'
let currentCategory: filesCategory = 'all'

const router = useRouter()
const route = useRoute()
const handleNodeClick = (data: Tree) => {
  router.push({
    path: '/music'
  })
}

onMounted(() => {
  if (route.query.path) {
    router.push({
      path: route.path,
      query: {
        category: currentCategory,
        path: route.query.path
      }
    })
  } else
  router.push({
    path: route.path,
    query: {
      category: currentCategory
    }
  })
})
</script>

<style lang="scss" scoped>

.aside-nav__sub {
  width: 200px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  padding-left: 5px;
  padding-top: 5px;
  border-right: 1px solid #f1f2f4;
  ::v-deep(.el-tree-node__content) {
    height: 40px;
  }
}
</style>