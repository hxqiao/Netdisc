import myAxios from '@/api/api.js'

export function getFilesListApi(params) {
  return myAxios({
    url: '/getFilesList',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function uploadFilesApi(data) {
  return myAxios({
    url: '/uploadFiles',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}