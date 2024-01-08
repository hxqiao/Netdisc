import myAxios from '@/api/api.js'

export function getMusicListApi(params) {
  return myAxios({
    url: '/api/playlist/detail',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function getMusicListDetailApi(params) {
  return myAxios({
    url: '/api/song/detail',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function getMusicPlayListApi(params) {
  return myAxios({
    url: '/api/song/play',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function getsongApi(params) {
  return myAxios({
    url: '/api/onesong/play',
    method: 'get',
    params
  }, {
    loading: false
  })
}