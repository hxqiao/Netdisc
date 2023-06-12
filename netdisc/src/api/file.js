import myAxios from '@/api/api.js'

export function getFilesListApi(params) {
  return myAxios({
    url: '/file/list',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function delectFileApi(data) {
  return myAxios({
    url: '/file/delect',
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

export function fileFinishApi(data) {
  return myAxios({
    url: '/file/finish',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}

export function fileRenameApi(data) {
  return myAxios({
    url: '/file/rename',
    method: 'post',
    processData: false,
    contentType: false,
    data
  }, {
    loading: false
  })
}