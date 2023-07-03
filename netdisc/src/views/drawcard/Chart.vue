<template>
  <div class="mychart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

const props = defineProps({
  xdata: {
    type: Array,
    default: () => []
  },
  ydata: {
    type: Array,
    default: () => []
  }
})

const updateChart = () => {
  if (!props.ydata.length) {
    return
  }
  
  const chartDom = document.getElementsByClassName('mychart')[0];
  
  const option = {
    tooltip:{
      enterable: true, // 鼠标是否可进入提示框浮层中
      textStyle: { align: 'left' },
      appendToBody: true
    },
    legend: {
      width: '200px'
    },
    xAxis: {
      type: 'category',
      data: props.xdata.map((name: string) => {
        return name
      })
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    grid: {
      containLabel: true,
      top: 50,
      bottom: 100,
      left: 30,
      right: 30
    },
    series: [
      {
        data: props.ydata.map((value: number) => {
          let color = 'red'
          if (value < 60) {
            color = 'green'
          } else if (value < 70) {
            color = 'yellow'
          } else {
            color = 'red'
          }
          return {
            value,
            itemStyle: {
              color
            }
          }
        }),
        type: 'bar',
        barWidth: 40,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top'
            }
          }
        },
      }
    ]
  };
  
  const myChart = echarts.init(chartDom);
  myChart.setOption(option);
}

watch(() => props.ydata, (newval, oldval) => {
  if (newval)
    updateChart()
})

onMounted(() => {
})
</script>

<style scoped>
.mychart {
  width: 100%;
  height: 100%;
}
</style>