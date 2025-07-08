import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 设置Vue生产环境特性标志
app.config.globalProperties.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true

app
  .use(router)
  .mount('#app')
