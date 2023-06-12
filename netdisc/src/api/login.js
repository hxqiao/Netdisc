import myAxios from '@/api/api.js'

export function logout(params) {
  return myAxios({
    url: '/logout',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function loginApi(data) {
  return myAxios({
    url: '/login',
    method: 'post',
    data
  }, {
    loading: false
  })
}

export function registerApi(data) {
  return myAxios({
    url: '/register',
    method: 'post',
    data
  }, {
    loading: false
  })
}