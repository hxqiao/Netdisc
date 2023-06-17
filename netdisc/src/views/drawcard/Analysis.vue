<template>
  <div class="Analysis">
    <div class="Analysis_content">
      <el-input
        v-model="drawcardUrl"
        :rows="12"
        type="textarea"
        placeholder="请输入链接"
      />
      <el-button class="Analysis_button" @click="drawcardAnalysis">
        分析
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { drawcardAnalysisApi } from '@/api/drawcard';

const drawcardUrl = ref<string>('')

// 点击分析
const drawcardAnalysis = async () => {
  const decodeUrl = decodeURIComponent(drawcardUrl.value)
  const host = decodeUrl.split('?')[0]
  let paramObj = {} as any
  paramObj.host = host
  const paramslist = decodeUrl.split('?')[1].split('&')
  
  paramslist.forEach(el => {
    const index = el.indexOf('=')
    const param = el.slice(0, index)
    const paramValue = el.slice(index + 1, el.length)
    paramObj[param] = paramValue
  })
  paramObj.page = '1'
  await drawcardAnalysisApi(Object.assign(paramObj))
}
</script>

<style lang="scss" scoped>
.Analysis {
  .Analysis_content {
    margin: 0 auto;
    width: 1000px;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .Analysis_button {
      margin-top: 20px;
    }
  }
}
</style>