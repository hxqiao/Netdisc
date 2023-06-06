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

export function delectFileApi(data) {
  return myAxios({
    url: '/delectFile',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}

export function fileUploadApi(data) {
  return myAxios({
    url: '/file/upload',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}

export function fileMergeApi(data) {
  return myAxios({
    url: '/file/merge_chunks',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}