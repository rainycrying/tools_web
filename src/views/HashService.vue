<template>
  <div class="hash-service">
    <h1>Hash计算服务</h1>
    <div class="input-section">
      <textarea 
        v-model="inputText" 
        placeholder="输入要计算Hash的文本"
        @input="calculateHashes"
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
import CryptoJS from 'crypto-js';

export default {
  name: 'HashService',
  data() {
    return {
      inputText: '',
      hashes: {
        'MD5': '',
        'SHA1': '',
        'SHA256': '',
        'SHA512': ''
      }
    }
  },
  methods: {
    calculateHashes() {
      if (!this.inputText) {
        this.resetHashes();
        return;
      }

      this.hashes = {
        'MD5': CryptoJS.MD5(this.inputText).toString(),
        'SHA1': CryptoJS.SHA1(this.inputText).toString(),
        'SHA256': CryptoJS.SHA256(this.inputText).toString(),
        'SHA512': CryptoJS.SHA512(this.inputText).toString()
      };
    },
    resetHashes() {
      for (let algo in this.hashes) {
        this.hashes[algo] = '';
      }
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('复制失败:', err);
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
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
  min-height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  resize: vertical;
}

.hash-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.hash-options button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.hash-options button.active {
  background-color: var(--primary-color);
  color: white;
}

.result-section {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.result-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.result-label {
  width: 100px;
  font-weight: bold;
}

.result-value {
  flex: 1;
  padding: 8px;
  background-color: var(--card-background);
  border-left: 4px solid var(--primary-color);
  word-break: break-all;
  border-radius: 0 4px 4px 0;
}

.copy-btn {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: var(--primary-hover);
}

/* 夜间模式字体优化 */
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
