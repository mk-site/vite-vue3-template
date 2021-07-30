import { createRouter, createWebHashHistory } from 'vue-router';

// 使用tsx方式
// const routes = [
//     {
//         path: '/home',
//         name: 'Home',
//         component: () => import('@/pages/Home'),
//     },
//     {
//         path: '/about',
//         name: 'about',
//         component: () => import('@/pages/About'),
//     },
// ];

// 使用template方式
const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/Home/index.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About/index.vue'),
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
