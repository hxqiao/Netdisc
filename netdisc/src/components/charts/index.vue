<template>
  <div id="mychart" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { getDrawcardChartsApi } from '@/api/drawcard';

onMounted(async () => {
  const { index: indexList } = await getDrawcardChartsApi({})
  const chartDom = document.getElementsByClassName('mychart')[0];
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

<style scoped>
#mychart {
  width: 100%;
}
</style>