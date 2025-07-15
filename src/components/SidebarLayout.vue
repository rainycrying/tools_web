<template>
  <n-menu :options="menuOptions" @update:value="handleMenuClick" />
</template>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { FileText } from '@vicons/tabler'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Hash计算',
    key: 'hash-service',
    icon: renderIcon(FileText),
    href: '/hash-service'  // 直接用 href 实现跳转（刷新）
  },
  {
    label: 'UUID生成',
    key: 'uuid-generator',
    icon: renderIcon(FileText),
    href: '/uuid-generator'
  },
  {
    label: 'Base64工具',
    key: 'base64',
    icon: renderIcon(FileText),
    href: '/base64'
  },
  {
    label: 'JSON工具',
    key: 'json',
    icon: renderIcon(FileText),
    href: '/json'
  },
  {
    label: '密码生成',
    key: 'password',
    icon: renderIcon(FileText),
    href: '/password'
  },
  {
    label: '隐私协议',
    key: 'privacy',
    icon: renderIcon(FileText),
    href: '/privacy'
  }
]

export default defineComponent({
  setup() {
    const activeKey = ref<string | null>(null)

    // 选中菜单，切换页面（浏览器跳转刷新）
    function handleMenuClick(key: string) {
      const option = menuOptions.find(o => o.key === key)
      if (option && option.href) {
        window.location.href = option.href
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