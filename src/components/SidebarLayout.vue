<template>
  <n-menu
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuClick"
  />
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import {
  defineComponent,
  ref,
  watch,
  h
} from 'vue'
import { FileText } from '@vicons/tabler'
import { NIcon } from 'naive-ui'

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  { label: 'Hash计算', key: 'hash-service', icon: renderIcon(FileText) },
  { label: 'UUID生成', key: 'uuid-generator', icon: renderIcon(FileText) },
  { label: 'Base64工具', key: 'base64', icon: renderIcon(FileText) },
  { label: 'JSON工具', key: 'json', icon: renderIcon(FileText) },
  { label: '密码生成', key: 'password', icon: renderIcon(FileText) },
  { label: '隐私协议', key: 'privacy', icon: renderIcon(FileText) }
]

export default defineComponent({
  setup() {
    const activeKey = ref<string | null>(null)
    const router = useRouter()
    const route = useRoute()

    function handleMenuClick(key: string) {
      router.push({ path: `/${key}` })
    }

    // 监听路由变化，更新菜单高亮
    watch(() => route.path, (newPath) => {
      const pathKey = newPath.replace('/', '')
      if (menuOptions.some(item => item.key === pathKey)) {
        activeKey.value = pathKey
      }
    }, { immediate: true })

    return {
      menuOptions,
      activeKey,
      handleMenuClick
    }
  }
})
</script>
