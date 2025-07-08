<template>
  <div class="uuid-generator">
    <h1>UUID 在线生成器</h1>
    <div class="info">
      <p>UUID (Universally Unique Identifier) 是一个128位的标识符，用于在分布式系统中唯一标识信息。</p>
      <p>版本4 UUID是随机生成的，碰撞概率极低。</p>
    </div>
    <div class="controls">
      <button @click="generateUUIDs">生成5个UUID</button>
      <button @click="copyAllToClipboard" :disabled="uuids.length === 0">复制全部</button>
    </div>
    <div class="results" v-if="uuids.length > 0">
      <div class="uuid-item" v-for="(uuid, index) in uuids" :key="index">
        <p class="uuid-value">{{ uuid }}</p>
        <button @click="copyToClipboard(uuid)">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UUIDGenerator',
  data() {
    return {
      uuids: []
    }
  },
  methods: {
    generateUUIDs() {
      this.uuids = Array(5).fill().map(() => crypto.randomUUID())
    },
    copyToClipboard(uuid) {
      navigator.clipboard.writeText(uuid)
    },
    copyAllToClipboard() {
      navigator.clipboard.writeText(this.uuids.join('\n'))
    }
  }
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
  background: #f5f5f5;
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

button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--primary-hover);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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
  background: #f5f5f5;
  border-radius: 4px;
}

.uuid-value {
  flex-grow: 1;
  word-break: break-all;
  margin: 0;
}
</style>
