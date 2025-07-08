<template>
  <div class="hash-service">
    <h1>Hash 计算服务</h1>
    <p class="description">支持多种哈希算法的在线计算服务，实时显示计算结果。</p>
    
    <div class="input-section">
      <textarea 
        v-model="inputText" 
        placeholder="输入要计算Hash的文本"
        @input="onInput"
      ></textarea>
    </div>
    
    <div class="hash-options">
      <button 
        v-for="hash in hashAlgorithms" 
        :key="hash"
        @click="calculateHash(hash)"
        :class="{ 'active': activeHash === hash }"
      >
        {{ hash.toUpperCase() }}
      </button>
    </div>
    
    <div v-if="isLoading" class="loading">
      正在计算Hash，请稍候...
    </div>
    
    <div v-else class="result-section">
      <h2>计算结果</h2>
      <div v-for="(value, key) in hashResults" :key="key" class="result-item">
        <div class="result-label">{{ key }}:</div>
        <div class="result-value">{{ value }}</div>
        <button class="copy-btn" @click="copyToClipboard(value)">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HashService',
  data() {
    return {
      inputText: '',
      hashResults: {},
      isLoading: false,
      hashAlgorithms: ['md5', 'sha1', 'sha256', 'sha512'],
      activeHash: null,
      debouncedCalculate: null
    }
  },
  methods: {
    onInput() {
      if (this.inputText && this.activeHash) {
        this.calculateHash(this.activeHash);
      }
    },
    
    async calculateHash(hashType) {
      this.activeHash = hashType;
      this.isLoading = true;
      
      if (!this.inputText) {
        this.hashResults = {};
        this.isLoading = false;
        return;
      }
      
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(this.inputText);
        const hashBuffer = await crypto.subtle.digest(hashType, data);
        
        // 将ArrayBuffer转换为十六进制字符串
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        this.$set(this.hashResults, hashType.toUpperCase(), hashHex);
      } catch (error) {
        console.error(`计算${hashType}失败:`, error);
        this.$set(this.hashResults, hashType.toUpperCase(), '计算失败');
      } finally {
        this.isLoading = false;
      }
    },
    
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('已成功复制到剪贴板');
        })
        .catch(err => {
          console.error('复制失败:', err);
          console.log('复制失败，请手动复制');
        });
    }
  }
}
</script>

<style scoped>
.hash-service {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.input-section textarea {
  width: 100%;
  height: 150px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  transition: border-color 0.3s;
}

.input-section textarea:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.hash-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hash-options button {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
}

.hash-options button.active {
  background-color: #42b883;
  color: white;
}

.hash-options button:hover {
  background-color: #e0e0e0;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #42b883;
  font-weight: bold;
}

.result-section {
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

.result-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  word-break: break-all;
}

.result-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.result-value {
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-left: 4px solid #42b883;
  font-family: monospace;
  font-size: 0.95rem;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow-x: auto;
}

.copy-btn {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s;
}

.copy-btn:hover {
  background-color: #36986d;
}
</style>