<template>
  <div class="Analysis">
    <div class="Analysis_content">
      <div v-show="analysisPage" class="analysis_info">
        正在分析{{ curPool }}：{{ analysisPage }}页
      </div>
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

// 抽卡链接
const drawcardUrl = ref<string>('https://api-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&win_mode=fullscreen&gacha_id=58d9ed53da77a3ebb1a52c311f892465c5fd&timestamp=1681910049&region=prod_gf_cn&default_gacha_type=2&lang=zh-cn&authkey=Q2jmqK2HMauCfaqew%2Bfd%2BCs0FDYbeVare91AAw7DyIntQqzT2iGNHe6pFvztW3rU5Y6U1n6Pnn9WTjvEdAHWGToo6jOEYaiw%2FhkR6yFeeMjmSClFCiEvm5gzAq6D7tqPuu8HbZ2zD051x3d7P3AZmAFx2mjZQnpEfcwmaJaRekGJFDVJisA08CkXwdaQ551%2Ftks%2FSr46bCjf4%2BJO7WqMewiuCVj2VuIoXSoPCLWzG6sPoAt%2BtxQVHRkD5iGTn15jJFnjTJSCPCWLUxDHCLlsMRRChFiyEg158id9ohhnOycUcQRcFXB8CtAHcIBbGNR5z3IO2DqT8JP8Mx488R1hAV6OenqvLlK8pAcwCIIbuxXf03xXuhwdNfNid37QhAUtmFmDytGGMcBBlAjza83RIoBSCD%2FdphpBKH26Iy2lwCIqCy16Wpi0Rsu20%2BT%2FJCQrtucUNEJABhYneE%2FEgZYWLriHVq%2Fs%2Bib5eD%2BH8QXYQUD4lXaxlV1n%2BuHlXva7v8xo24uHy1yBHCirtesNQCtR4LieCno322z%2B7EE9XcFURnWQqdBCcW0n7g4qx0PzXrPhXxCKcDFnGo%2FJeYI3DN5MjEPKNTrRf9FTtoQhszJGIUnSjnzDVzp1DZVnOOFgkywefV2WHuTuFKlfpM%2By%2BvUcajYMzlgqdlvQ0zjcJfvaKu0%3D&game_biz=hkrpg_cn&os_system=Windows%2011%20%20%2810.0.22621%29%2064bit&device_model=B360M-D2V%20%28Gigabyte%20Technology%20Co.%2C%20Ltd.%29&plat_type=pc&page=1&size=5&gacha_type=2&end_id=0')

// 抽卡类型
const drawcardTypeList = {
  '2': '新手卡池', // 新手卡池
  '1': '常驻卡池', // 常驻卡池
  '11': 'UP卡池', // UP 卡池
  '12': '光锥卡池' // 光锥卡池
}

// 分析第几个卡池
const cardpool = ref<number>(1)

// 正在分析的卡池
const curPool = ref('')

// 分析页数
const analysisPage = ref<number>(0)

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

  const analysis = (type: string): Promise<void> => {
    return new Promise(async (resolve) => {
      analysisPage.value = 1
      paramObj.end_id = '0'
      let stop = false
      while (!stop) {
        paramObj.page = String(1)
        paramObj.gacha_type = type
        paramObj.cardpool = cardpool.value
        let { list } = await drawcardAnalysisApi(paramObj)
        console.log(list.length);
        paramObj.end_id = list.length ? list[list.length - 1].id : '0'
        analysisPage.value += 1
        if (list.length < 5) {
          analysisPage.value = 0
          cardpool.value = cardpool.value + 1
          resolve()
          stop = true
        }
      }
    })
  }
  for (const pool in drawcardTypeList) {
    console.log('开始分析' + drawcardTypeList[pool]);
    curPool.value = drawcardTypeList[pool]
    let anay = await analysis(pool)
    anay = null
    console.log(drawcardTypeList[pool] + '分析完成');
    console.log('----------------------------------');
  }
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
    .analysis_info {
      text-align: center;
      line-height: 30px;
    }
    .Analysis_button {
      margin-top: 20px;
    }
  }
}
</style>