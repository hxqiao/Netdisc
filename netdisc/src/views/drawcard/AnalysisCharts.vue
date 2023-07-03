<template>
  <div class="AnalysisCharts">
    <el-radio-group v-model="gachaType" style="margin: 20px 0" >
      <el-radio-button v-for="gacha of gachaTypeList" :label="gacha" @change="changeCardType">
        {{ drawcardTypeList[gacha] }}
      </el-radio-button>
    </el-radio-group>
    <MyCharts :xdata="namelist" :ydata="indexList" />
  </div>
</template>

<script setup lang="ts">
import { getDrawcardChartsApi } from '@/api/drawcard';
import MyCharts from './Chart.vue'
import { ref, onMounted } from 'vue';

const indexList = ref<any>([])

const namelist = ref<any>([])

// 抽卡类型
const drawcardTypeList = {
  '2': '新手卡池', // 新手卡池
  '1': '常驻卡池', // 常驻卡池
  '11': 'UP卡池', // UP 卡池
  '12': '光锥卡池' // 光锥卡池
}

const gachaTypeList = ['1', '2', '11', '12']

const gachaType = ref<API.GachaType>('1')

const getList = async () => {
  const { index, name } = await getDrawcardChartsApi({
    gacha_type: gachaType.value
  })
  
  indexList.value = index
  namelist.value = ['已抽', ...name]
  
}

const changeCardType = () => {
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.AnalysisCharts {
  width: 100%;
  height: 350px;
  border: 1px solid #ccc;
}
</style>