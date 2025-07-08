<template>
  <div class="base64-tool">
    <h1>Base64 工具</h1>
    
    <div class="tool-section">
      <h2>Base64 编码</h2>
      <textarea v-model="encodeInput" placeholder="输入要编码的文本"></textarea>
      <button @click="encode">编码</button>
      <div class="result" v-if="encodeResult">
        <p>{{ encodeResult }}</p>
        <button @click="copyResult(encodeResult)">复制</button>
      </div>
    </div>

    <div class="tool-section">
      <h2>Base64 解码</h2>
      <textarea v-model="decodeInput" placeholder="输入要解码的Base64字符串"></textarea>
      <button @click="decode">解码</button>
      <div class="result" v-if="decodeResult">
        <p>{{ decodeResult }}</p>
        <button @click="copyResult(decodeResult)">复制</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Base64Tool',
  data() {
    return {
      encodeInput: '',
      encodeResult: '',
      decodeInput: '',
      decodeResult: ''
    }
  },
  methods: {
    encode() {
      this.encodeResult = btoa(unescape(encodeURIComponent(this.encodeInput)))
    },
    decode() {
      try {
        this.decodeResult = decodeURIComponent(escape(atob(this.decodeInput)))
      } catch (e) {
        this.decodeResult = '解码失败: 无效的Base64输入'
      }
    },
    copyResult(text) {
      navigator.clipboard.writeText(text)
    }
  }
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
  padding: 15px;
  background: var(--card-background);
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  color: var(--primary-color);
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
}

button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--primary-hover);
}

.crypto-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.crypto-controls input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
}

.button-group {
  display: flex;
  gap: 10px;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
  word-break: break-all;
  position: relative;
}

.result p {
  margin: 0;
  padding-right: 60px;
}

.result button {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
