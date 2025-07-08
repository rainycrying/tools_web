/**
 * 色彩方案工具
 * 提供夜间模式配色方案切换功能
 */

export const SCHEMES = {
  DEFAULT: 'default',
  BLUE: 'blue',
  WARM: 'warm'
};

export function setColorScheme(scheme) {
  const app = document.getElementById('app');
  // 移除所有方案类
  app.classList.remove(
    'scheme-blue',
    'scheme-warm'
  );
  
  // 添加选中的方案类
  switch(scheme) {
    case SCHEMES.BLUE:
      app.classList.add('scheme-blue');
      break;
    case SCHEMES.WARM:
      app.classList.add('scheme-warm');
      break;
    default:
      // 使用默认方案
      break;
  }
  
  localStorage.setItem('colorScheme', scheme);
}

export function getCurrentScheme() {
  return localStorage.getItem('colorScheme') || SCHEMES.DEFAULT;
}
