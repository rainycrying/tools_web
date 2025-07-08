<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode, [`scheme-${currentScheme}`]: isDarkMode }">
    <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/hash-service">Hash计算</router-link>
        <router-link to="/uuid-generator">UUID生成</router-link>
        <router-link to="/base64">Base64工具</router-link>
        <router-link to="/json">JSON工具</router-link>
        <router-link to="/password">密码生成</router-link>
        <router-link to="/privacy">隐私协议</router-link>   
      <button class="mode-toggle" @click="toggleDarkMode">{{ isDarkMode ? '日间模式' : '夜间模式' }}</button>
    </nav>
    <router-view/>
    
    <div v-if="isDarkMode" class="scheme-selector">
      <button 
        v-for="scheme in availableSchemes" 
        :key="scheme"
        :class="{ active: currentScheme === scheme }"
        @click="changeColorScheme(scheme)"
      >
        {{ getSchemeName(scheme) }}
      </button>
    </div>
  </div>
</template>

<script>
import { setColorScheme, getCurrentScheme, SCHEMES } from './utils/colorScheme';
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      isDarkMode: false,
      currentScheme: SCHEMES.DEFAULT,
      availableSchemes: Object.values(SCHEMES)
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      if (!this.isDarkMode) {
        this.currentScheme = SCHEMES.DEFAULT;
      }
    },
    changeColorScheme(scheme) {
      this.currentScheme = scheme;
      setColorScheme(scheme);
    },
    getSchemeName(scheme) {
      const names = {
        [SCHEMES.DEFAULT]: '标准',
        [SCHEMES.BLUE]: '深蓝',
        [SCHEMES.WARM]: '暖色'
      };
      return names[scheme];
    }
  },
  created() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.isDarkMode = JSON.parse(savedMode);
    }
    
    this.currentScheme = getCurrentScheme();
    setColorScheme(this.currentScheme);
  }
}
</script>

<style>
:root {
  --primary-color: #42b883;
  --primary-hover: #36986d;
  --background-color: #ffffff;
  --text-color: #333333;
  --card-background: #f8f8f8;
  --border-color: #dddddd;
}

/* 方案1: 深灰背景 + 浅灰文字 (默认方案) */
.dark-mode {
  --background-color: #121212; /* 深灰 */
  --text-color: #e0e0e0; /* 浅灰 */
  --card-background: #1e1e1e; /* 中灰 */
  --border-color: #333333; /* 深灰 */
  /* 对比度: 12.6:1 (符合AAA标准) */
}

/* 方案2: 深蓝背景 + 米白文字 */
.dark-mode.scheme-blue {
  --background-color: #0A1929; /* 深蓝 */
  --text-color: #F5F5F0; /* 米白 */
  --card-background: #1A2B3C; /* 中蓝灰 */
  --border-color: #2A3B4C; /* 蓝灰 */
  /* 对比度: 10.3:1 (符合AAA标准) */
}

/* 方案3: 暖灰背景 + 浅黄文字 */
.dark-mode.scheme-warm {
  --background-color: #1A1A1A; /* 暖灰 */
  --text-color: #F0E6D2; /* 浅黄 */
  --card-background: #2A2A2A; /* 中暖灰 */
  --border-color: #3A3A3A; /* 暖灰 */
  /* 对比度: 8.7:1 (符合AA标准) */
}

.dark-mode p,
.dark-mode nav a,
.dark-mode h1,
.dark-mode h2,
.dark-mode h3,
.dark-mode h4,
.dark-mode .hash-service .result-section,
.dark-mode .hash-service .result-item,
.dark-mode .hash-service .result-label,
.dark-mode .hash-service .result-value {
  color: var(--text-color);
  font-weight: 500;
  text-shadow: 0 0 1px rgba(0,0,0,0.3);
}

.dark-mode .hash-service .result-value {
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.5;
}

.dark-mode h1 {
  font-weight: 500;
  text-shadow: 0 0 2px rgba(0,0,0,0.3);
}

.dark-mode h2 {
  font-weight: 500;
  text-shadow: 0 0 1px rgba(0,0,0,0.3);
}

/* 方案选择器样式 */
.scheme-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background-color: var(--card-background);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.scheme-selector button {
  padding: 8px 12px;
  background-color: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.scheme-selector button:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.scheme-selector button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

p {
  color: var(--text-color);
}

nav {
  background-color: var(--card-background);
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: var(--text-color);
}

nav a:hover {
  color: var(--primary-color);
}

.mode-toggle {
  float: right;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mode-toggle:hover {
  background-color: var(--primary-hover);
}

/* 全局表单元素样式 */
input, textarea, select, button {
  font-family: inherit;
  font-size: inherit;
  color: var(--text-color);
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

/* 全局卡片样式 */
.card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

/* Hash服务组件专用样式 */
.hash-service .input-section textarea {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
}

.hash-service .hash-options button {
  background-color: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.hash-service .hash-options button.active {
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
}

.hash-service .result-section {
  color: var(--text-color);
}

.hash-service .result-item {
  color: var(--text-color);
}

.hash-service .result-label {
  color: var(--text-color);
}

.hash-service .result-value {
  background-color: var(--card-background);
  border-left: 4px solid var(--primary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.hash-service .copy-btn {
  background-color: var(--primary-color);
}

.hash-service .copy-btn:hover {
  background-color: var(--primary-hover);
}
</style>
