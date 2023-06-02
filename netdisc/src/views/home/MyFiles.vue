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

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
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