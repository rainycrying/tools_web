<template>
  <div class="home">
    <div class="hero">
      <h1>开发者工具集</h1>
      <p class="subtitle">一站式解决开发中的常见需求</p>
    </div>

    <div class="tool-cards">
      <router-link 
        v-for="tool in tools" 
        :key="tool.path"
        :to="tool.path"
        class="tool-card"
      >
        <div class="tool-icon">{{ tool.icon }}</div>
        <h3>{{ tool.name }}</h3>
        <p>{{ tool.desc }}</p>
      </router-link>
    </div>

    <div class="features">
      <h2>平台特点</h2>
      <div class="feature-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-value">6+</div>
        <div class="stat-label">实用工具</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">100%</div>
        <div class="stat-label">本地计算</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">0</div>
        <div class="stat-label">数据收集</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      tools: [
        { path: '/hash-service', name: 'Hash计算', desc: '支持多种哈希算法计算', icon: '🔢' },
        { path: '/uuid-generator', name: 'UUID生成', desc: '生成各种版本的UUID', icon: '🆔' },
        { path: '/base64', name: 'Base64工具', desc: '编码/解码Base64数据', icon: '📄' },
        { path: '/json', name: 'JSON工具', desc: '格式化验证JSON数据', icon: '{}' },
        { path: '/password', name: '密码生成', desc: '生成安全随机密码', icon: '🔑' },
        { path: '/privacy', name: '隐私协议', desc: '查看我们的隐私政策', icon: '📜' }
      ],
      features: [
        { title: '本地处理', desc: '所有计算在浏览器本地完成，数据不会上传', icon: '🔒' },
        { title: '开源透明', desc: '代码完全开源，可自由审查', icon: '📦' },
        { title: '无广告追踪', desc: '无广告、无追踪、无数据收集', icon: '🚫' },
        { title: '响应式设计', desc: '完美适配各种设备屏幕', icon: '📱' }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.tool-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tool-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.tool-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.features {
  margin: 4rem 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #2c3e50;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
}

.stat-label {
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .tool-cards {
    grid-template-columns: 1fr;
  }
  
  .stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
