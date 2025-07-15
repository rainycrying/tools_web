<template>
  <div class="uuid-generator">
    <h1>UUID 在线生成器</h1>

    <div class="info">
      <p>UUID（Universally Unique Identifier）是一个 128 位的标识符，用于在分布式系统中唯一标识信息。</p>
      <p>版本 4 UUID 是随机生成的，碰撞概率极低。</p>
    </div>

    <div class="controls">
      <n-button type="primary" @click="generateUUIDs">生成 5 个 UUID</n-button>
      <n-button type="primary" ghost @click="copyAllToClipboard" :disabled="uuids.length === 0">复制全部</n-button>
    </div>

    <div class="results" v-if="uuids.length > 0">
      <div class="uuid-item" v-for="(uuid, index) in uuids" :key="index">
        <p class="uuid-value">{{ uuid }}</p>
        <n-button size="small" ghost @click="copyToClipboard(uuid)">复制</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'

const uuids = ref([])

function generateUUIDs() {
  uuids.value = Array.from({ length: 5 }, () => crypto.randomUUID())
}

function copyToClipboard(uuid) {
  navigator.clipboard.writeText(uuid)
}

function copyAllToClipboard() {
  navigator.clipboard.writeText(uuids.value.join('\n'))
}
</script>

<style scoped>
.uuid-generator {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.info {
  margin: 20px 0;
  padding: 15px;
  background: var(--card-background, #f5f5f5);
  border-radius: 4px;
}

.info p {
  margin: 5px 0;
}

.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.results {
  margin-top: 20px;
}

.uuid-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: var(--card-background, #f5f5f5);
  border-radius: 4px;
}

.uuid-value {
  flex-grow: 1;
  word-break: break-word;
  margin: 0;
}
</style>