<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/hash-service">Hash计算</router-link>
        <router-link to="/uuid-generator">UUID生成</router-link>
        <router-link to="/base64">Base64工具</router-link>
        <router-link to="/json">JSON工具</router-link>
        <router-link to="/password">密码生成</router-link>
        <router-link to="/curl-converter">Curl转换</router-link>
        <router-link to="/privacy">隐私协议</router-link>   
      <button class="mode-toggle" @click="toggleDarkMode">{{ isDarkMode ? '日间模式' : '夜间模式' }}</button>
    </nav>
    <router-view class="router-view"/>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
    }
  },
  created() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.isDarkMode = JSON.parse(savedMode);
    }
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

.dark-mode {
  --background-color: #121212;
  --text-color: #e0e0e0;
  --card-background: #1e1e1e;
  --border-color: #333333;
  --input-background: #252525;
  --hover-color: #2d2d2d;
}

/* 确保所有背景元素使用正确的变量 */
.dark-mode body,
.dark-mode #app,
.dark-mode .home,
.dark-mode .tool-cards,
.dark-mode .tool-card,
.dark-mode .features,
.dark-mode .feature-card,
.dark-mode .stats {
  background-color: var(--background-color);
}

.dark-mode .card,
.dark-mode nav,
.dark-mode .scheme-selector {
  background-color: var(--card-background);
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

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

/* Force dark background for html element */
html {
  background-color: var(--background-color);
}

#app {
  background-color: var(--background-color);
  min-height: 100vh;
}

.router-view {
  background-color: var(--background-color);
  padding: 20px;
  min-height: calc(100vh - 60px);
}

.router-view > * {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark-mode .router-view > * {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
input, textarea, select, button:not(.mode-toggle) {
  font-family: inherit;
  font-size: inherit;
  color: var(--text-color);
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s;
}

button:not(.mode-toggle):hover {
  background-color: var(--hover-color);
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
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  width: 100%;
  min-height: 120px;
  padding: 10px;
}

.hash-service .hash-options button {
  background-color: var(--input-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  margin-right: 8px;
  padding: 6px 12px;
  transition: all 0.2s;
}

.hash-service .hash-options button:hover {
  background-color: var(--hover-color);
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
  background-color: var(--input-background);
  border-left: 4px solid var(--primary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 10px;
  margin: 8px 0;
  border-radius: 4px;
  word-break: break-all;
  font-family: monospace;
  font-size: 0.9em;
}

.hash-service .copy-btn {
  background-color: var(--primary-color);
}

.hash-service .copy-btn:hover {
  background-color: var(--primary-hover);
}
</style>
