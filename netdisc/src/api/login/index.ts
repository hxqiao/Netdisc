import myAxios from '@/api'

export function logout(params: API.LogoutParams) {
  return myAxios({
    url: '/logout',
    method: 'get',
    params
  }, {
    loading: false
  })
}

export function loginApi(data: API.LoginParams) {
  return myAxios<API.TokenData>({
    url: '/login',
    method: 'post',
    data
  }, {
    loading: false
  })
}

export function registerApi(data: API.registerParams) {
  return myAxios({
    url: '/register',
    method: 'post',
    data
  }, {
    loading: false
  })
}