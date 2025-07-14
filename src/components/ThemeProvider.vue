<script setup>
import { ref, computed, provide } from 'vue'
import { NConfigProvider, darkTheme, zhCN, dateZhCN } from 'naive-ui'

// 暗黑状态
const isDark = ref(localStorage.getItem('theme') === 'dark')

// 提供切换函数
const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 提供给所有子组件使用
provide('isDark', isDark)
provide('toggleDark', toggleDark)

// 动态主题
const theme = computed(() => isDark.value ? darkTheme : null)

// 主题覆盖（浅一点的暗色）
const themeOverrides = computed(() => isDark.value ? {
  common: {
    bodyColor: '#2b2b2b',
    cardColor: '#333333',
    modalColor: '#2f2f2f',
    popoverColor: '#383838',
    primaryColor: '#18a058',
    textColorBase: '#e0e0e0'
  }
} : {})
</script>

<template>
  <n-config-provider
      :theme="theme"
      :theme-overrides="themeOverrides"
      :locale="zhCN"
      :date-locale="dateZhCN"
  >
    <slot />
  </n-config-provider>
</template>