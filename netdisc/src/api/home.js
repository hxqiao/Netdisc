import myAxios from '@/api/api.js'

export function getFilesList(params) {
  return myAxios({
    url: '/getFilesList',
    method: 'get',
    params
  }, {
    loading: false
  })
}