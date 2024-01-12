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

export async function getSongUrlApi(params) {
  const res = await myAxios({
    url: '/eapi/song/url',
    method: 'get',
    params
  }, {
    loading: false
  })
  return '/eapi/onesong/play?url=' + res.data[0].url
}