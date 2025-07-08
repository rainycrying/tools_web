<template>
  <div class="json-tool">
    <h1>JSON工具</h1>
    
    <div class="tool-section">
      <h2>JSON格式化/压缩</h2>
      <textarea 
        v-model="jsonInput" 
        placeholder="输入JSON字符串"
        :class="{ 'error': jsonError }"
      ></textarea>
      <div class="button-group">
        <button @click="formatJson">格式化</button>
        <button @click="compressJson">压缩</button>
        <button @click="validateJson">验证</button>
        <button @click="escapeJson">转译</button>
        <button @click="unescapeJson">去转译</button>
        <button @click="copyResult(jsonInput)">复制</button>
      </div>
      <div class="error-message" v-if="jsonError">
        {{ jsonError }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonTool',
  data() {
    return {
      jsonInput: '',
      jsonError: ''
    }
  },
  methods: {
    formatJson() {
      try {
        const obj = JSON.parse(this.jsonInput);
        this.jsonInput = JSON.stringify(obj, null, 2);
        this.jsonError = '';
      } catch (e) {
        this.jsonError = '无效的JSON: ' + e.message;
      }
    },
    compressJson() {
      try {
        const obj = JSON.parse(this.jsonInput);
        this.jsonInput = JSON.stringify(obj);
        this.jsonError = '';
      } catch (e) {
        this.jsonError = '无效的JSON: ' + e.message;
      }
    },
    validateJson() {
      try {
        JSON.parse(this.jsonInput);
        this.jsonError = '✅ 有效的JSON';
      } catch (e) {
        this.jsonError = '❌ 无效的JSON: ' + e.message;
      }
    },
    copyResult(text) {
      navigator.clipboard.writeText(text);
    },
    escapeJson() {
      try {
        this.jsonInput = JSON.stringify(this.jsonInput)
          .replace(/^"|"$/g, '');
        this.jsonError = '';
      } catch (e) {
        this.jsonError = '转译失败: ' + e.message;
      }
    },
    unescapeJson() {
      try {
        this.jsonInput = JSON.parse('"' + this.jsonInput + '"');
        this.jsonError = '';
      } catch (e) {
        this.jsonError = '去转译失败: ' + e.message;
      }
    },
  }
}
</script>

<style scoped>
.json-tool {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.tool-section {
  margin-bottom: 30px;
}

textarea {
  width: 100%;
  min-height: 200px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
}

textarea.error {
  border-color: #ff4444;
}

.button-group {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

.result {
  position: relative;
  margin-top: 20px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 4px;
}

.result pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.result button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2196F3;
}

.error-message {
  color: #ff4444;
  margin-top: 10px;
}
</style>
