<template>
  <n-menu :options="menuOptions" @update:value="handleMenuClick" />
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { defineComponent, ref, inject, type Ref, markRaw ,onMounted} from 'vue'
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
    const router = useRouter()
    // 选中菜单，切换视图
    async function handleMenuClick(key: string) {
      if (!currentView?.value) return
      
      try {
        currentView.value = markRaw({
          'home': (await import(/* @vite-ignore */ './Home.vue') as any).default,
          'hash-service': (await import(/* @vite-ignore */ './HashService.vue') as any).default,
          'uuid-generator': (await import(/* @vite-ignore */ './UuidGenerator.vue') as any).default,
          'base64': (await import(/* @vite-ignore */ './Base64Tool.vue') as any).default,
          'json': (await import(/* @vite-ignore */ './JsonTool.vue') as any).default,
          'password': (await import(/* @vite-ignore */ './PasswordGenerator.vue') as any).default,
          'privacy': (await import(/* @vite-ignore */ './PrivacyPolicy.vue') as any).default
        }[key])
        await router.push({ path: `/${key}` })
      } catch (err) {
        console.error('Failed to load component:', err)
      }
    }
// 页面首次加载，根据当前 URL 初始化视图
    onMounted(async () => {
      const path = router.currentRoute.value.path.replace('/', '')
      if (path && Object.keys(menuOptions.map(o => o.key)).includes(path)) {
        await handleMenuClick(path)
        activeKey.value = path
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
