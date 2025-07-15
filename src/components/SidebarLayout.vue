<template>
  <n-menu :options="menuOptions" @update:value="handleMenuClick" />
</template>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import { defineComponent, ref, inject, type Ref } from 'vue'
import { FileText } from '@vicons/tabler'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
    icon: renderIcon(FileText)
  },
  {
    label: 'Hash计算',
    key: 'hash-service',
    icon: renderIcon(FileText)
  },
  {
    label: 'UUID生成',
    key: 'uuid-generator',
    icon: renderIcon(FileText)
  },
  {
    label: 'Base64工具',
    key: 'base64',
    icon: renderIcon(FileText)
  },
  {
    label: 'JSON工具',
    key: 'json',
    icon: renderIcon(FileText)
  },
  {
    label: '密码生成',
    key: 'password',
    icon: renderIcon(FileText)
  },
  {
    label: '隐私协议',
    key: 'privacy',
    icon: renderIcon(FileText)
  }
]


export default defineComponent({
  setup() {
    const activeKey = ref<string | null>(null)

    const currentView = inject<Ref<any>>('currentView')

    // 选中菜单，切换视图
    async function handleMenuClick(key: string) {
      if (!currentView?.value) return
      
      try {
        currentView.value = {
          'home': (await import('./Home.vue') as any).default,
          'hash-service': (await import('./HashService.vue') as any).default,
          'uuid-generator': (await import('./UuidGenerator.vue') as any).default,
          'base64': (await import('./Base64Tool.vue') as any).default,
          'json': (await import('./JsonTool.vue') as any).default,
          'password': (await import('./PasswordGenerator.vue') as any).default,
          'privacy': (await import('./PrivacyPolicy.vue') as any).default
        }[key]
      } catch (err) {
        console.error('Failed to load component:', err)
      }
    }

    return {
      menuOptions,
      activeKey,
      handleMenuClick
    }
  }
})
</script>
