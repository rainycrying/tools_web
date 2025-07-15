<template>
  <div class="privacy">
    <h1>隐私协议</h1>

    <div class="privacy-content">
      <h2>数据收集与使用</h2>
      <p>本平台不会收集、存储或传输您的任何输入数据。所有计算处理均在您的浏览器本地完成。</p>
      <h2>Cookies与追踪</h2>
      <p>我们不使用任何追踪技术或Cookies来收集用户信息。</p>
      <h2>第三方服务</h2>
      <p>本平台不集成任何第三方分析或广告服务。</p>
      <h2>数据安全</h2>
      <p>由于所有计算都在本地完成，您的数据永远不会离开您的设备，确保了最高级别的隐私保护。</p>
      <h2>开源声明</h2>
      <p>本平台完全开源，代码可审计。您可以在我们的GitHub仓库查看所有源代码。</p>
      <h2>联系方式</h2>
      <p>如有任何隐私相关问题，请联系：privacy@rainycrying.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyView'
}
</script>

<style scoped>
.privacy {
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

.privacy-content {
  margin: 30px 0;
}

.privacy-content h2 {
  margin-top: 25px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.privacy-content p {
  margin: 15px 0;
  line-height: 1.6;
}

.back-home {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.back-home a {
  color: #666;
  text-decoration: none;
}

.back-home a:hover {
  text-decoration: underline;
}
</style>
