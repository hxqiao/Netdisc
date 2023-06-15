import myAxios from '@/api'

// 获取文件列表
export function getFilesListApi(params: API.GetFilesListParams) {
  return myAxios({
    url: '/file/list',
    method: 'get',
    params
  }, {
    loading: false
  })
}

// 删除文件
export function delectFileApi(data: API.DelectFileParams) {
  return myAxios({
    url: '/file/delect',
    method: 'post',
    data
  }, {
    loading: false
  })
}

// 上传文件
export function fileUploadApi(data: FormData) {
  return myAxios({
    url: '/file/upload',
    method: 'post',
    data
  }, {
    loading: false
  })
}

// 完成上传文件
export function fileFinishApi(data: API.FileFinishParams) {
  return myAxios({
    url: '/file/finish',
    method: 'post',
    data
  }, {
    loading: false
  })
}

export function fileRenameApi(data: any) {
  return myAxios({
    url: '/file/rename',
    method: 'post',
    data
  }, {
    loading: false
  })
}