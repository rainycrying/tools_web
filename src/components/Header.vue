<script setup>
import { inject } from 'vue'
import { NButton, NIcon, useMessage, NTooltip } from 'naive-ui'
import { Moon, Sun } from '@vicons/tabler'

// 注入主题状态与切换函数
const isDark = inject('isDark')
const toggleDark = inject('toggleDark')

// 切换主题按钮事件
const handleClick = () => {
  toggleDark()
}
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
        <n-button @click="handleClick" quaternary circle class="theme-toggle-button">
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