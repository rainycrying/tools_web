// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 引入页面组件

import Home from '../components/Home.vue'
import HashService from '../components/HashService.vue'
import UuidGenerator from '../components/UuidGenerator.vue'
import Base64Tool from '../components/Base64Tool.vue'
import PasswordGenerator from '../components/PasswordGenerator.vue'
import JsonTool from '../components/JsonTool.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/hash-service',
        name: 'HashService',
        component: HashService
    },
    {
        path: '/uuid-generator',
        name: 'UuidGenerator',
        component: UuidGenerator
    },
    {
        path: '/base64',
        name: 'Base64Tool',
        component: Base64Tool
    },
    {
        path: '/json',
        name: 'JsonTool',
        component: JsonTool
    },
    {
        path: '/password',
        name: 'PasswordGenerator',
        component: PasswordGenerator
    },
    {
        path: '/privacy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy
    },{
        path: '/:pathMatch(.*)*',  // 匹配所有未定义路径
        redirect: '/home'              // 重定向到首页
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router