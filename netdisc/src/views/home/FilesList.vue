<template>
  <div class="pan__contain">
    <div class="pan__header">
      <div class="pan__header-tool-bar">
        <div class="pan__header-tool-bar--action">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            :limit="1"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="submitUploadLargeFiles"
          >
            <template #trigger>
              <el-button type="primary" round style="width: 100px;">
                上传
              </el-button>
            </template>
          </el-upload>

          
          <el-button 
            :type="uploading?'primary':'info'" 
            round 
            style="width: 100px;"
            @click="pauseUpload()"
          >
            暂停
          </el-button>

          <el-button type="primary" plain @click="submitUploadFiles()">
            MD5
          </el-button>
        </div>
        <div class="pan__header-tool-bar--customize">

        </div>
      </div>
    </div>
    <div class="pan__body">
      <div class="pan__body-contain">
        <div class="pan__body-contain--nav">
          <div class="nav__breadcrumb">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-if="currentPath.length !== 0" class="nav__pre" separator="|">
                <span style="color: #06a7ff;cursor: pointer;">返回上一级</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in currentPath" @click="jumpDir(item, index, currentPath)">
                {{ item === '' && index === 0 ? '全部文件' : item }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;height: 100%;">
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
          <el-table-column prop="name" label="文件名" min-width="500">
            <template #default="scope">
              <div class="files" @click="getDetails(scope.row)">
                <span class="files-name" @click="inFolder(scope.row)">
                  {{ scope.row.name }}
                </span>
                <div class="files-action__icon">
                  <Svgicon icon="icon-download" />
                  <Svgicon icon="icon-copy" />
                  <Svgicon icon="icon-move" />
                  <Svgicon icon="icon-zhongmingming" />
                  <Svgicon icon="icon-ashbin" @click="delectfile(scope.row.originalname)" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="修改时间" min-width="150">
            <template #default="scope">
              <div class="date">
                {{ scope.row.date }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="size" align="right" label="大小" min-width="120">
            <template #default="scope">
              <div class="size">
                {{ scope.row.size }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <FileDetail :info="currentDetail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import FileDetail from "./components/FileDetail.vue";
import type { UploadInstance, UploadFile } from 'element-plus'
import { getFilesListApi, delectFileApi, fileUploadApi, fileFinishApi } from '@/api/file.js';
import { useRouter, useRoute } from 'vue-router';
import { getFileHash } from './hook'
import { FilesDetail } from './props';

const router = useRouter()
const route = useRoute()

const uploadRef = ref<UploadInstance>()
async function submitUploadFiles() {
  const file = tempFile.raw
  const chunkSize = 10 * 1024 * 1024; // 每个chunk的大小，设置为10兆
  // const hash = await hashFile(file, chunkSize)
  // console.log(hash);
  getFileHash(file)
  
  const formData = new FormData();
  formData.append('dir', currentFolder.value)
  formData.append('singleFile', file);
  // await uploadFilesApi(formData)
  // uploadRef.value!.clearFiles()
  // initPage()
}

const emit = defineEmits(['getProgress'])

// 上传文件
const uploading = ref<boolean>(true)
let tempFile: UploadFile
async function submitUploadLargeFiles(uploadFile: UploadFile) {
  tempFile = uploadFile
  // return
  const file = uploadFile.raw
  const { size, name, type } = file;
  const chunkSize = 10 * 1024 * 1024; // 每个chunk的大小，设置为10兆
  const hash = await getFileHash(file); //文件 hash 
  let uploaded = 0;
  const local = localStorage.getItem(hash);
  if (local) {
    uploaded = Number(local);
  }
  while (uploaded < size && uploading.value) {
    const chunk = file.slice(uploaded, uploaded + chunkSize, type);
    const formData = new FormData();
    formData.append('dir', currentFolder.value)
    formData.append('name', name);
    formData.append('type', type);
    formData.append('size', String(size));
    formData.append('file', chunk);
    formData.append('hash', hash);
    formData.append('offset', String(uploaded));
    try {
      await fileUploadApi(formData)
    } catch (e) {
      // output.innerText = '上传失败。' + e.message;
      return;
    }
    uploaded += chunk.size;
    localStorage.setItem(hash, String(uploaded));
    emit('getProgress', parseInt(`${uploaded / size * 100}`));
    if (!uploading.value) {
      return
    }
  }
  localStorage.removeItem(hash);
  await fileFinishApi({ // 上传成功，改hash值
    name,
    size,
    type,
    offset: String(uploaded),
    hash,
    dir: currentFolder.value
  })
  uploadRef.value!.clearFiles()
  initPage()
}

function pauseUpload() {
  uploading.value = !uploading.value
  if (uploading.value) {
    // console.log(uploadRef.value);
    submitUploadLargeFiles(tempFile)
  }
}

const currentFolder = ref<string>('/')
const currentPath = computed(() => {
  return currentFolder.value.split('/')
})

// 点击进入文件夹
async function inFolder(detail: FilesDetail) {
  if (detail.type !== 'folder') return
  currentFolder.value = currentFolder.value.slice(0, currentFolder.value.length - 1) + detail.dir + detail.name + '/'
  router.push({
    path: route.path,
    query: {
      category: route.query.category,
      path: currentFolder.value
    }
  })
  initPage()
}

// 详情
const currentDetail = ref<FilesDetail>()
function getDetails(detail: FilesDetail) {
  currentDetail.value = detail
}

// 面包屑快速跳转
function jumpDir(itemDir: string, index: number, fullDir: string[]) {
  currentFolder.value = index === 0 ? '/' : fullDir.slice(0, index + 1).join('/') + '/'
  router.push({
    path: route.path,
    query: {
      category: route.query.category,
      path: currentFolder.value
    }
  })
  initPage()
}

// 删除文件
async function delectfile(name: string) {
  await delectFileApi({
    name,
    dir: currentFolder.value
  })
  initPage()
}

const tableData = ref([])
// 初始化页面
async function initPage() {
  const { list } = await getFilesListApi({
    dir: currentFolder.value
  })
  tableData.value = list
}

onMounted(() => {
  currentFolder.value = route.query.path as string || '/'
  initPage()
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
      width: calc(100% - 300px);
      height: 100%;
      padding: 0 20px;
      border-right: 1px solid #f0f0f0;
      .pan__body-contain--nav {
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        .nav__pre {
          display: inline-block;
          margin-right: 5px;
        }
        .nav__breadcrumb {
          vertical-align: middle;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          ::v-deep(.el-breadcrumb__item) {
            font-size: 12px;
          }
          ::v-deep(.el-breadcrumb__inner) {
            color: #06a7ff;
            cursor: pointer;
          }
        }
      }
      .files {
        width: calc(100% - 200px);
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        .files-name {
          &:hover {
            color: #06a7ff;
          }
        }
        .files-action__icon {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          display: flex;
          align-items: center;
          .svgicon {
            height: 100%;
            font-size: 16px;
            margin: 5px;
            color: #06a7ff;
          }
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
  }
}
</style>