<template>
  <div class="pan__contain">
    <div class="pan__header">
      <div class="pan__header-tool-bar">
        <div class="pan__header-tool-bar--action">
          <el-upload
            ref="upload"
            class="upload-demo"
            :limit="1"
            :auto-upload="false"
            :on-change="uploadFiles"
          >
            <template #trigger>
              <el-button type="primary" round style="width: 100px;">
                上传
              </el-button>
            </template>
          </el-upload>
        </div>
        <div class="pan__header-tool-bar--customize">

        </div>
      </div>
    </div>
    <div class="pan__body">
      <div class="pan__body-contain">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column width="55">
            <template #default="scope"> 
              <img v-if="scope.row.type==='jpg'" :src="scope.row.url" alt="" style="width: 30px;">
              <Svgicon v-else-if="scope.row.type==='txt'" icon="icon-txt" style="font-size: 30px;" />
              <Svgicon v-else-if="scope.row.type==='exe'" icon="icon-exe" style="font-size: 30px;" />
              <Svgicon v-else-if="scope.row.type==='mp3'" icon="icon-mp3" style="font-size: 30px;" />
              <Svgicon v-else-if="scope.row.type==='zip'" icon="icon-zip" style="font-size: 30px;" />
              <Svgicon v-else-if="scope.row.type==='pdf'" icon="icon-pdf" style="font-size: 30px;" />
              <div v-else-if="scope.row.type==='folder'" class="folder" @click="inFolder(scope.row)">
                <Svgicon icon="icon-wenjianjia" style="font-size: 30px;" />
              </div>
              <Svgicon v-else icon="icon-yunwenjianweishibie" style="font-size: 30px;" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="文件名" width="500">
            <template #default="scope">
              <div class="name">
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="修改时间">
            <template #default="scope">
              <div class="date">
                {{ scope.row.date }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="size" align="right" label="大小">
            <template #default="scope">
              <div class="size">
                {{ scope.row.size }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pan__body-detail">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UploadFile, UploadFiles } from 'element-plus'
import { getFilesListApi, uploadFilesApi } from '@/api/home.js';

// 文件详情
interface FilesDetail {
  date: string
  name: string
  size: string
  dir: string
  type: string
  url: string
}

function uploadFiles(uploadFile: UploadFile, uploadFiles: UploadFiles): void {
  console.log(uploadFile);
  const formData = new FormData();
  formData.append('singleFile', uploadFile.raw);
  uploadFilesApi(formData).then(() => {
    init()
  })
}

function inFolder(detail: FilesDetail) {
  console.log('?????');
  
  getFilesListApi({
    dir: detail.dir + detail.name + '/'
  })
}

const tableData = ref([])

function init() {
  getFilesListApi({
    dir: '/'
  }).then(res => {
    tableData.value = res.list
  })
}

onMounted(() => {
  init()
})


function getArr<T>(cont:T, len:number): T[] {
    // const arr:T[]=[] //这是一个泛型数组 或者这样写
    const arr: Array<T> = []; //泛型必须要有一个初始值
    for (let i = 0; i < len;i++) {
      arr.push(cont)
    }
    return arr
}
const arr1 = getArr<number>(11.1, 3);
console.log(arr1)
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
        display: flex;
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
      .name {
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #06a7ff;
        }
      }
      .date {
        font-size: 12px;
      }
      .size {
        font-size: 12px;
      }
      .folder {
        cursor: pointer;
      }
    }
    .pan__body-detail {
      width: 20%;
      height: 100%;
      border-left: 1px solid #f0f0f0;
    }
  }
}
</style>