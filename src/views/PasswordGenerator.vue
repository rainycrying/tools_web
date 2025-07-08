<template>
  <div class="password-generator">
    <h1>密码生成器</h1>
    
    <div class="control-panel">
      <div class="option-group">
        <h3>所用字符</h3>
        <label>
          <input type="checkbox" v-model="useLowercase" checked> a-z
        </label>
        <label>
          <input type="checkbox" v-model="useUppercase" checked> A-Z
        </label>
        <label>
          <input type="checkbox" v-model="useNumbers" checked> 0-9
        </label>
        <label>
          <input type="checkbox" v-model="enableSpecialChars"> 特殊字符
        </label>
        <input type="text" v-model="customSpecialChars" placeholder="!@#$%^&*" :disabled="!enableSpecialChars">
      </div>

      <div class="option-group">
        <h3>排除字符</h3>
        <label>
          <input type="checkbox" v-model="enableExcludeChars"> 启用排除
        </label>
        <input type="text" v-model="excludeChars" placeholder="iIl1o0O" :disabled="!enableExcludeChars">
      </div>

      <div class="option-group">
        <h3>密码设置</h3>
        <label>
          长度:
          <input type="number" v-model="passwordLength" min="4" max="128" value="12">
        </label>
        <label>
          数量:
          <input type="number" v-model="passwordCount" min="1" max="20" value="5">
        </label>
      </div>

      <button @click="generatePasswords" class="generate-btn">生成密码</button>
    </div>

    <div class="result-area" v-if="passwords.length">
      <h3>生成的密码</h3>
      <div class="password-list">
        <div v-for="(pwd, index) in passwords" :key="index" class="password-item">
          {{ pwd }}
          <button @click="copyPassword(pwd)" class="copy-btn">复制</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PasswordGenerator',
  data() {
    return {
      useLowercase: true,
      useUppercase: true,
      useNumbers: true,
      enableSpecialChars: false,
      customSpecialChars: '!@#$%^&*',
      enableExcludeChars: false,
      excludeChars: 'iIl1o0O',
      passwordLength: 12,
      passwordCount: 5,
      passwords: [],
    }
  },
  methods: {
    generatePasswords() {
      let chars = '';
      if (this.useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (this.useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (this.useNumbers) chars += '0123456789';
      if (this.enableSpecialChars && this.customSpecialChars) chars += this.customSpecialChars;

      // 过滤排除字符
      if (this.enableExcludeChars && this.excludeChars) {
        const excludeSet = new Set(this.excludeChars.split(''));
        chars = chars.split('').filter(c => !excludeSet.has(c)).join('');
      }

      if (!chars) {
        console.log('请至少选择一种字符类型');
        return;
      }

      this.passwords = [];
      for (let i = 0; i < this.passwordCount; i++) {
        let password = '';
        for (let j = 0; j < this.passwordLength; j++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.passwords.push(password);
      }
    },
    copyPassword(password) {
      navigator.clipboard.writeText(password);
      console.log('密码已复制');
    },
  }
}
</script>

<style scoped>
.password-generator {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.control-panel {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 15px;
}

.option-group h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

label {
  display: inline-block;
  margin-right: 15px;
}

input[type="text"],
input[type="number"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.generate-btn {
  background-color: #2196F3;
}

.result-area {
  margin-top: 20px;
}

.password-list {
  margin-top: 10px;
}

.password-item {
  background: #f5f5f5;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy-btn {
  padding: 4px 8px;
  font-size: 12px;
}

.history-time {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}
</style>
