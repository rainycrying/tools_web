import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hash-service',
    name: 'HashService',
    component: () => import('../views/HashService.vue'),
    meta: {
      title: 'Hash计算服务'
    }
  },
  {
    path: '/uuid-generator',
    name: 'UUIDGenerator',
    component: () => import('../views/UUIDGenerator.vue'),
    meta: {
      title: 'UUID生成器'
    }
  },
  {
    path: '/base64',
    name: 'Base64Tool',
    component: () => import('../views/Base64Tool.vue'),
    meta: {
      title: 'Base64工具'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue'),
    meta: {
      title: '隐私协议'
    }
  },
  {
    path: '/json',
    name: 'JsonTool',
    component: () => import('../views/JsonTool.vue'),
    meta: {
      title: 'JSON工具'
    }
  },
  {
    path: '/password',
    name: 'PasswordGenerator',
    component: () => import('../views/PasswordGenerator.vue'),
    meta: {
      title: '密码生成器'
    }
  },
  {
    path: '/curl-converter',
    name: 'CurlConverter',
    component: () => import('../views/CurlConverter.vue'),
    meta: {
      title: 'Curl命令转换'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
