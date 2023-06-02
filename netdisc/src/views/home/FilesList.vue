<template>
  <div class="pan__contain">
    <div class="pan__header">
      <div class="pan__header-tool-bar">
        <div class="pan__header-tool-bar--action">
          <el-button type="primary" round style="width: 100px;">
            上传
          </el-button>
        </div>
        <div class="pan__header-tool-bar--customize">

        </div>
      </div>
    </div>
    <div class="pan__body">
      <div class="pan__body-contain">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="文件名" width="300" />
          <el-table-column prop="date" label="修改时间" />
          <el-table-column prop="size" align="right" label="大小" />
        </el-table>
      </div>
      <div class="pan__body-detail">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getFilesList } from '@/api/home.js';

interface FilesList {
  date: string
  name: string
  size: string
}
const tableData = ref([])

onMounted(() => {
  getFilesList().then(res => {
    console.log(res);
    
    tableData.value = res.list
  })
})
</script>

<style lang="scss" scoped>
.pan__contain {
  height: 100%;
  padding: 20px 0 0 0;
  .pan__header {
    padding: 4px 24px;
    .pan__header-tool-bar {
      height: 32px;
      display: flex;
      .pan__header-tool-bar--action {
        width: 80%;
      }
      .pan__header-tool-bar--customize {
        width: 20%;
      }
    }
  }
  .pan__body {
    height: calc(100% - 40px);
    display: flex;
    .pan__body-contain {
      width: 80%;
      height: 100%;
      padding: 0 20px;
    }
    .pan__body-detail {
      width: 20%;
      height: 100%;
      border-left: 1px solid #f0f0f0;
    }
  }
}
</style>