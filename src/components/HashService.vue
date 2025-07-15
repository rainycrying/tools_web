<template>
  <div class="hash-service">
    <h1>Hash 计算服务</h1>
    <p class="description">输入文本后，实时计算并展示 MD5、SHA-1、SHA-256、SHA-512 哈希值。</p>

    <div class="input-section">
      <textarea
          v-model="inputText"
          placeholder="输入要计算Hash的文本"
      ></textarea>
    </div>

    <div class="result-section">
      <div class="result-item" v-for="(hash, algo) in hashes" :key="algo">
        <div class="result-label">{{ algo }}:</div>
        <div class="result-value">{{ hash }}</div>
        <button class="copy-btn" @click="copyToClipboard(hash)">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import CryptoJS from 'crypto-js'

export default {
  name: 'HashService',
  data() {
    return {
      inputText: '',
      hashes: {
        MD5: '',
        SHA1: '',
        SHA256: '',
        SHA512: ''
      }
    }
  },
  methods: {
    calculateHashes() {
      if (!this.inputText) {
        this.resetHashes()
        return
      }

      this.hashes = {
        MD5: CryptoJS.MD5(this.inputText).toString(),
        SHA1: CryptoJS.SHA1(this.inputText).toString(),
        SHA256: CryptoJS.SHA256(this.inputText).toString(),
        SHA512: CryptoJS.SHA512(this.inputText).toString()
      }
    },
    resetHashes() {
      for (let algo in this.hashes) {
        this.hashes[algo] = ''
      }
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error('复制失败:', err)
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
    }
  },
  watch: {
    inputText: {
      handler: 'calculateHashes',
      immediate: true
    }
  }
}
</script>

<style scoped>
.hash-service {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.input-section textarea {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color, #ccc);
  resize: vertical;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
}

.result-section {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.result-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  line-height: 1.4;
}

.result-label {
  width: 100px;
  font-weight: bold;
}

.result-value {
  flex: 1;
  padding: 6px 10px;
  background-color: var(--card-background, #f5f5f5);
  border-left: 4px solid var(--primary-color, #42b983);
  word-break: break-all;
  border-radius: 0 4px 4px 0;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.3;
}

.copy-btn {
  margin-left: 10px;
  padding: 6px 10px;
  background-color: var(--primary-color, #42b983);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: var(--primary-hover, #369f77);
}

/* 夜间模式支持 */
@media (prefers-color-scheme: dark) {
  .result-value {
    color: #e0e0e0;
    background-color: #2d2d2d;
  }

  .input-section textarea {
    background-color: #2d2d2d;
    color: #e0e0e0;
    border-color: #444;
  }
}
</style>