<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">

  <n-layout style="height: 100vh; display: flex; flex-direction: column;">

    <!-- 顶部 -->
    <n-layout-header
        bordered
        style="height: 60px; display: flex; align-items: center; padding-left: 20px;"
    >
      <Header/>
    </n-layout-header>
    <!-- 主体：左侧菜单 + 内容区 -->

<!--    <div style="flex: 1; display: flex; min-height: 0; height: 80%;">-->
    <n-layout has-sider style="flex: 1; min-height: 0; height: 80%;">
      <!-- 左侧菜单 -->
      <!-- 左侧菜单 -->
      <n-layout-sider
          bordered
          width="200px"
          content-style="padding: 20px;"

      >
        <SidebarLayout/>
      </n-layout-sider>
      <!-- 右侧内容区，动态切换 -->
      <n-layout-content style="padding: 10px; overflow: auto;">
        <component :is="currentView"/>
      </n-layout-content>
  </n-layout>
    <!-- 底部 -->
    <n-layout-footer
        bordered
        style="padding: 10px 20px; display: flex; align-items: center; justify-content: center;"
    >
      <Footer />
    </n-layout-footer>
  </n-layout>

  </n-config-provider>

</template>

<script setup>
import { ref, computed, shallowRef, provide } from 'vue'
import { NConfigProvider, darkTheme, zhCN, dateZhCN } from 'naive-ui'

// 主题状态：是否暗色模式
const isDark = ref(false)
const currentView = shallowRef(Home)  // ✅ 使用shallowRef替代ref避免组件响应式转换

// 提供给子组件使用（比如 Header）
provide('isDark', isDark)
provide('toggleDark', () => {
  isDark.value = !isDark.value
})
provide('currentView', currentView)

// 主题动态切换
const theme = computed(() => isDark.value ? darkTheme : null)

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import SidebarLayout from "./components/SidebarLayout.vue";
import Home from "./components/Home.vue";
</script>
