// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
// 引入 Naive UI 插件
import naive from 'naive-ui'
// ✅ 引入路由实例
import router from './router'

createApp(App)
    .use(naive) // ✅ 注册 Naive UI
    .use(router)   // ✅ 注册路由
    .mount('#app')