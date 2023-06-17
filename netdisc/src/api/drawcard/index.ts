import myAxios from '@/api'

// 抽卡分析
export function drawcardAnalysisApi(data: any) {
  return myAxios({
    url: '/drawcard/analysis',
    method: 'post',
    data
  }, {
    loading: false
  })
}

// 获取抽卡列表
export function getDrawcardChartsApi(data: any) {
  return myAxios({
    url: '/drawcard/charts',
    method: 'post',
    data
  }, {
    loading: false
  })
}

// 获取抽卡列表
export function getDrawcardlistApi(data: any) {
  return myAxios({
    url: '/drawcard/list',
    method: 'post',
    data
  }, {
    loading: false
  })
}