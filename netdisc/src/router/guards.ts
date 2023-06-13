import type { Router } from 'vue-router';

export function createRouterGuards(router: Router) {
  
  router.beforeEach(async (to, from, next) => {
    
    next()
  })

  router.afterEach((to, from, failure) => {})

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}