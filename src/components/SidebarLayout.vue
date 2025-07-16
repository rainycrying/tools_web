<template>
  <n-menu
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuClick"
  />
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import {
  defineComponent,
  ref,
  inject,
  type Ref,
  markRaw,
  onMounted,
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
    const currentView = inject<Ref<any>>('currentView')
    const router = useRouter()

    async function handleMenuClick(key: string) {
      if (!currentView?.value) return

      try {
        const views = {
          home: (await import('./Home.vue')).default,
          'hash-service': (await import('./HashService.vue')).default,
          'uuid-generator': (await import('./UuidGenerator.vue')).default,
          base64: (await import('./Base64Tool.vue')).default,
          json: (await import('./JsonTool.vue')).default,
          password: (await import('./PasswordGenerator.vue')).default,
          privacy: (await import('./PrivacyPolicy.vue')).default
        }

        currentView.value = markRaw(views[key])
        activeKey.value = key // 设置高亮菜单项
        await router.push({ path: `/${key}` })
      } catch (err) {
        console.error('Failed to load component:', err)
      }
    }

    // 首次加载时，根据 URL 初始化
    onMounted(async () => {
      const path = router.currentRoute.value.path.replace('/', '')
      const exists = menuOptions.some((item) => item.key === path)
      if (exists) {
        await handleMenuClick(path)
      } else {
        await handleMenuClick('hash-service') // 默认加载页面
      }
    })

    return {
      menuOptions,
      activeKey,
      handleMenuClick
    }
  }
})
</script>