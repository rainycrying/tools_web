// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
// 引入 Naive UI 插件
import naive from 'naive-ui'

createApp(App)
    .use(naive) // ✅ 注册 Naive UI
    .mount('#app')