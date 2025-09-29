<script setup>
import { ref, onMounted } from 'vue'
import { NButton, NIcon, useMessage, NTooltip } from 'naive-ui'
import { Moon, Sun } from '@vicons/tabler'

// 主题状态
const isDark = ref(true)

// 切换主题
function toggleTheme() {
  isDark.value = !isDark.value
  // 更新全局样式
  if (isDark.value) {
    document.documentElement.style.setProperty('--bg-color', '#000000')
    document.documentElement.style.setProperty('--text-color', '#00ff00')
  } else {
    document.documentElement.style.setProperty('--bg-color', '#ffffff')
    document.documentElement.style.setProperty('--text-color', '#000000')
  }
}

// 组件挂载时同步主题
onMounted(() => {
  // 检查当前主题状态
  const currentBgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim()
  isDark.value = currentBgColor === '#000000' || currentBgColor === 'rgb(0, 0, 0)'
})
</script>

<template>

    <!-- ✅ 首页按钮 -->
    <router-link to="/" class="router-link">
      <n-button type="tertiary" class="home-tertiary-button">
        首页
      </n-button>
    </router-link>
    <n-tooltip trigger="hover" >
      <template #trigger>
        <n-button @click="toggleTheme" quaternary circle class="theme-toggle-button">
          <n-icon size="24">
            <component :is="isDark ? Sun : Moon" />
          </n-icon>
        </n-button>
      </template>
      <span>{{ isDark ? '切换为明亮模式' : '切换为暗黑模式' }}</span>
    </n-tooltip>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
.theme-toggle-button {
  margin-left: auto; /* ✅ 让按钮推到最右 */
  display: flex;
  align-items: center;
}
</style>
