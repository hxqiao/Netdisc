import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: "/", redirect: "/login" },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue")
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