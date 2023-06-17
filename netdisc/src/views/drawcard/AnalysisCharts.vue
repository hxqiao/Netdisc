<template>
  <div class="AnalysisCharts">
    <div id="AnalysisCharts">

    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { getDrawcardChartsApi } from '@/api/drawcard';

onMounted(async () => {
  const { index: indexList } = await getDrawcardChartsApi({})
  const chartDom = document.getElementsByClassName('AnalysisCharts')[0];
  const option = {
    xAxis: {
      type: 'category',
      data: indexList.map((i: number, index: number) => {
        return index
      })
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: indexList,
        type: 'bar'
      }
    ]
  };
  const myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
.AnalysisCharts {
  width: 30%;
  height: 200px;
  border: 1px solid #ccc;
}
</style>