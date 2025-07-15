<template>
  <div class="base64-tool">
    <h1>Base64 工具</h1>

    <!-- 编码区域 -->
    <div class="tool-section">
      <h2>Base64 编码</h2>
      <n-input
          v-model:value="encodeInput"
          type="textarea"
          placeholder="输入要编码的文本"
          :autosize="{ minRows: 4, maxRows: 10 }"
      />
      <n-button type="primary" @click="encode" class="mt-2">编码</n-button>
      <div class="result" v-if="encodeResult">
        <p>{{ encodeResult }}</p>
        <n-button size="small" ghost @click="copyResult(encodeResult)">复制</n-button>
      </div>
    </div>

    <!-- 解码区域 -->
    <div class="tool-section">
      <h2>Base64 解码</h2>
      <n-input
          v-model:value="decodeInput"
          type="textarea"
          placeholder="输入要解码的Base64字符串"
          :autosize="{ minRows: 4, maxRows: 10 }"
      />
      <n-button type="primary" @click="decode" class="mt-2">解码</n-button>
      <div class="result" v-if="decodeResult">
        <p>{{ decodeResult }}</p>
        <n-button size="small" ghost @click="copyResult(decodeResult)">复制</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'

const encodeInput = ref('')
const encodeResult = ref('')
const decodeInput = ref('')
const decodeResult = ref('')

function encode() {
  try {
    encodeResult.value = btoa(unescape(encodeURIComponent(encodeInput.value)))
  } catch (e) {
    encodeResult.value = '编码失败'
  }
}

function decode() {
  try {
    decodeResult.value = decodeURIComponent(escape(atob(decodeInput.value)))
  } catch (e) {
    decodeResult.value = '解码失败: 无效的Base64输入'
  }
}

function copyResult(text) {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>
.base64-tool {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.tool-section {
  margin-bottom: 30px;
  padding: 20px;
  background: var(--card-background, #f5f5f5);
  border-radius: 8px;
}

h1, h2 {
  color: var(--primary-color, #3f51b5);
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  word-break: break-word;
  position: relative;
}

.result p {
  margin: 0;
  padding-right: 60px;
}
</style>