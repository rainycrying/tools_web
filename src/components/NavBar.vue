<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🔧</span>
        <span>工具网站</span>
      </router-link>
      
      <div class="nav-links">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="nav-link"
          active-class="active"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span class="link-text">{{ link.text }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navLinks: [
        { path: '/hash-service', text: 'Hash计算', icon: '🔢' },
        { path: '/uuid-generator', text: 'UUID生成', icon: '🆔' },
        { path: '/base64', text: 'Base64工具', icon: '📄' },
        { path: '/json', text: 'JSON工具', icon: '{}' },
        { path: '/password', text: '密码生成', icon: '🔑' },
        { path: '/privacy', text: '隐私协议', icon: '📜' }
      ]
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 0.8rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.link-icon {
  font-size: 1.1rem;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #42b983;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .link-text {
    display: none;
  }
}
</style>
