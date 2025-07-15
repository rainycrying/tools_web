<template>
  <div class="home">

    <div class="tool-cards">
      <a href="/hash-service" class="tool-card">
        <div class="tool-icon">🔢</div>
        <h3>Hash计算</h3>
        <p>支持多种哈希算法计算</p>
      </a>
      <a href="/uuid-generator" class="tool-card">
        <div class="tool-icon">🆔</div>
        <h3>UUID生成</h3>
        <p>生成各种版本的UUID</p>
      </a>
      <a href="/base64" class="tool-card">
        <div class="tool-icon">📄</div>
        <h3>Base64工具</h3>
        <p>编码/解码Base64数据</p>
      </a>
      <a href="/json" class="tool-card">
        <div class="tool-icon">{}</div>
        <h3>JSON工具</h3>
        <p>格式化验证JSON数据</p>
      </a>
      <a href="/password" class="tool-card">
        <div class="tool-icon">🔑</div>
        <h3>密码生成</h3>
        <p>生成安全随机密码</p>
      </a>
    </div>

    <div class="features">
      <h2>平台特点</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>本地处理</h3>
          <p>所有计算在浏览器本地完成，数据不会上传</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>开源透明</h3>
          <p>代码完全开源，可自由审查</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚫</div>
          <h3>无广告追踪</h3>
          <p>无广告、无追踪、无数据收集</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// 无需业务逻辑
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero {
  text-align: center;
  margin-bottom: 30px;
}

.subtitle {
  color: #666;
  font-size: 1.1em;
}

.tool-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
}

.tool-card {
  display: block;
  width: 140px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  color: #333;
  text-decoration: none;
  transition: box-shadow 0.3s ease;
}

.tool-card:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.tool-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.features {
  margin-bottom: 40px;
  text-align: center;
}

.feature-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
}

.feature-card {
  width: 180px;
  padding: 16px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.stat-label {
  color: #666;
}
</style>