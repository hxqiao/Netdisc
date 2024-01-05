import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuards } from './guards';
import type { App } from 'vue';

const routes = [
	{ path: "/", redirect: "/login" },
	{
		path: "/home",
		name: "home",
		component: () => import("../views/home/index.vue")
	},
	{
		path: "/music",
		name: "music",
		component: () => import("../views/music/index.vue")
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login/index.vue")
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export async function setupRouter(app: App) {
	// 路由守卫
	createRouterGuards(router);

	app.use(router);
	// 路由准备就绪后挂载APP实例
	await router.isReady();
}