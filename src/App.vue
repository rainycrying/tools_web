<template>
  <div class="terminal">
    <!-- 终端顶部header -->
    <div class="terminal-header" v-if="useCustomHeader">
      <div class="header-title" @click="navigateToTool('home')" title="返回首页">Linux Tools</div>
      <div class="header-menu">
        <button class="header-btn" @click="navigateToTool('home')" title="返回首页">
          首页
        </button>
        <button class="header-btn" @click="navigateToTool('base64')" title="Base64工具">
          Base64
        </button>
        <button class="header-btn" @click="navigateToTool('password')" title="密码生成">
          密码
        </button>
        <button class="header-btn" @click="navigateToTool('uuid')" title="UUID生成">
          UUID
        </button>
        <button class="header-btn" @click="navigateToTool('hash')" title="Hash计算">
          Hash
        </button>
        <button class="header-btn" @click="navigateToTool('json')" title="JSON工具">
          JSON
        </button>
        <button class="header-btn" @click="navigateToTool('privacy')" title="隐私协议">
          隐私
        </button>
      </div>
      <div class="header-actions">
        <button class="header-btn" @click="toggleTheme" title="切换主题">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>

    <!-- Naive UI Header组件 -->
    <Header v-else />
    
    <!-- 路由视图区域 -->
    <router-view v-if="$route.path !== '/'" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    
  <!-- 主终端界面 -->
  <div v-else>
      <!-- 终端欢迎信息 -->
      <div class="output">
        <div class="success">Welcome to Linux Terminal Tools v1.0</div>
        <div class="info">Type 'help' to see available commands</div>
        <div class="info">Type 'clear' to clear the terminal</div>
        <div class="info">Type 'base64', 'password', 'uuid', 'hash', 'json' to use specific tools</div>
        <div class="info">在工具页面使用 'help' 查看具体用法</div>
        <br>
      </div>
      
      <!-- 命令历史输出区域 -->
      <div id="command-output"></div>
      
      <!-- 命令行输入区域 -->
      <div class="command-line">
        <span class="prompt">user@terminal-tools:~$</span>
        <input 
          type="text" 
          class="command-input" 
          v-model="currentCommand" 
          @keyup.enter="executeCommand"
          @keyup.up="navigateHistory(-1)"
          @keyup.down="navigateHistory(1)"
          @paste="handlePaste"
          ref="commandInput"
        />
        <span class="cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'

const router = useRouter()

const currentCommand = ref('')
const commandHistory = ref([])
const historyIndex = ref(-1)
const commandInput = ref(null)
const isDark = ref(true)
const useCustomHeader = ref(true) // 控制使用自定义菜单栏还是Header组件

// 切换主题
function toggleTheme() {
  isDark.value = !isDark.value
  // 更新全局样式
  if (isDark.value) {
    document.documentElement.style.setProperty('--bg-color', '#000000')
    document.documentElement.style.setProperty('--text-color', '#00ff00')
  } else {
    document.documentElement.style.setProperty('--bg-color', '#ffffff')
    document.documentElement.style.setProperty('--text-color', '#000000')
  }
}

// 可用命令列表
const commands = {
  help: '显示可用命令',
  clear: '清空终端',
  base64: 'Base64编码/解码工具',
  password: '密码生成工具',
  uuid: 'UUID生成工具',
  hash: 'Hash计算工具',
  json: 'JSON格式化工具',
  privacy: '查看隐私协议',
  exit: '退出终端'
}

// 执行命令
function executeCommand() {
  const command = currentCommand.value.trim()
  if (!command) return
  
  // 添加到历史记录
  commandHistory.value.push(command)
  historyIndex.value = commandHistory.value.length
  
  // 显示命令
  addOutput(`user@terminal-tools:~$ ${command}`)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'help':
      showHelp()
      break
    case 'clear':
      clearTerminal()
      break
    case 'base64':
      navigateTo('/base64')
      break
    case 'password':
      navigateTo('/password')
      break
    case 'uuid':
      navigateTo('/uuid-generator')
      break
    case 'hash':
      navigateTo('/hash-service')
      break
    case 'json':
      navigateTo('/json')
      break
    case 'privacy':
      navigateTo('/privacy')
      break
    case 'exit':
      addOutput('exit命令已禁用，请使用浏览器关闭页面', 'info')
      break
    default:
      addOutput(`Command not found: ${cmd}`, 'error')
      addOutput(`Type 'help' to see available commands`, 'info')
  }
  
  // 清空当前命令
  currentCommand.value = ''
  
  // 滚动到底部
  scrollToBottom()
}

// 显示帮助信息
function showHelp() {
  addOutput('Available commands:', 'info')
  Object.entries(commands).forEach(([cmd, desc]) => {
    addOutput(`  ${cmd.padEnd(12)} - ${desc}`, 'info')
  })
  addOutput('', 'info')
  addOutput('工具具体用法:', 'info')
  addOutput('  password generate [长度] [数量] [选项] - 生成密码', 'info')
  addOutput('  base64 encode [文本] 或 decode [Base64] - Base64编码/解码', 'info')
  addOutput('  uuid generate [数量] [选项] - 生成UUID', 'info')
  addOutput('  hash [算法] [文本] 或 all [文本] - 计算哈希', 'info')
  addOutput('  json [操作] [JSON字符串] - JSON处理', 'info')
  addOutput('  在工具页面使用 "help" 查看详细用法', 'info')
}

// 清空终端
function clearTerminal() {
  const output = document.getElementById('command-output')
  if (output) {
    output.innerHTML = ''
    addOutput('终端已清空', 'success')
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('command-output')
  if (output) {
    const div = document.createElement('div')
    div.className = type
    div.textContent = text
    output.appendChild(div)
  }
}

// 导航到工具页面
function navigateToTool(tool) {
  let path = '/'
  switch (tool) {
    case 'base64':
      path = '/base64'
      break
    case 'password':
      path = '/password'
      break
    case 'uuid':
      path = '/uuid-generator'
      break
    case 'hash':
      path = '/hash-service'
      break
    case 'json':
      path = '/json'
      break
    case 'privacy':
      path = '/privacy'
      break
    case 'home':
      path = '/'
      break
  }
  setTimeout(() => {
    router.push(path)
  }, 100)
}

// 导航到指定页面
function navigateTo(path) {
  addOutput(`Navigating to ${path}...`, 'info')
  setTimeout(() => {
    router.push(path)
  }, 500)
}

// 历史记录导航
function navigateHistory(direction) {
  if (commandHistory.value.length === 0) return
  
  historyIndex.value = Math.max(0, Math.min(commandHistory.value.length, historyIndex.value + direction))
  
  if (historyIndex.value >= 0 && historyIndex.value < commandHistory.value.length) {
    currentCommand.value = commandHistory.value[historyIndex.value]
  } else if (historyIndex.value === commandHistory.value.length) {
    currentCommand.value = ''
  }
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const terminal = document.querySelector('.terminal')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  })
}

// 拦截Tab键和Command+数字键功能
function handleKeydown(event) {
  // 拦截Tab键，防止浏览器默认的焦点切换行为
  if (event.key === 'Tab') {
    event.preventDefault()
    // Tab命令补全功能
    handleTabCompletion()
  }
  
  // Command+数字键切换工具功能
  if (event.metaKey && event.key >= '1' && event.key <= '9') {
    event.preventDefault()
    
    const toolMap = {
      '1': 'home',
      '2': 'base64',
      '3': 'password',
      '4': 'uuid',
      '5': 'hash',
      '6': 'json',
      '7': 'privacy'
    }
    
    const toolNumber = event.key
    const tool = toolMap[toolNumber]
    
    if (tool) {
      addOutput(`Command+${toolNumber}: 切换到${getToolName(tool)}`, 'info')
      navigateToTool(tool)
    } else {
      addOutput(`Command+${toolNumber}: 未分配功能`, 'info')
    }
  }
  
  // 拦截Command+0（切换到第一个标签页）
  if (event.metaKey && event.key === '0') {
    event.preventDefault()
    addOutput('Command+0: 切换到首页', 'info')
    navigateToTool('home')
  }
}

// Tab命令补全功能
function handleTabCompletion() {
  const input = currentCommand.value.trim()
  if (!input) {
    // 如果没有输入，显示所有可用命令（类似Linux的tab补全）
    addOutput('', 'info')  // 空行分隔
    addOutput('所有可用命令:', 'info')
    Object.keys(commands).forEach(cmd => {
      addOutput(`  ${cmd}`, 'info')
    })
    return
  }

  // 匹配以当前输入开头的命令
  const matchingCommands = Object.keys(commands).filter(cmd => 
    cmd.startsWith(input.toLowerCase())
  )

  if (matchingCommands.length === 1) {
    // 只有一个匹配项，自动补全（类似Linux终端行为）
    currentCommand.value = matchingCommands[0]
  } else if (matchingCommands.length > 1) {
    // 多个匹配项，显示所有匹配项（类似Linux的tab补全）
    addOutput('', 'info')  // 空行分隔
    addOutput(`匹配 ${input} 的命令:`, 'info')
    matchingCommands.forEach(cmd => {
      addOutput(`  ${cmd}`, 'info')
    })
    // 显示当前输入，让用户可以继续输入来缩小范围
    currentCommand.value = input
  } else {
    // 没有匹配项，发出提示音效果（模拟Linux终端行为）
    addOutput(`没有找到以 "${input}" 开头的命令`, 'info')
    addOutput('输入 "help" 查看所有可用命令', 'info')
  }
}

// 获取工具名称
function getToolName(tool) {
  const toolNames = {
    'home': '首页',
    'base64': 'Base64工具',
    'password': '密码生成',
    'uuid': 'UUID生成',
    'hash': 'Hash计算',
    'json': 'JSON工具',
    'privacy': '隐私协议'
  }
  return toolNames[tool] || tool
}

// 处理粘贴事件
function handlePaste(event) {
  // 获取粘贴的文本内容
  const pastedText = event.clipboardData.getData('text')
  if (pastedText) {
    // 获取当前输入框的选中文本范围
    const input = event.target
    const startPos = input.selectionStart
    const endPos = input.selectionEnd
    
    // 总是追加粘贴的内容，不替换选中的文本
    // 这样用户可以选择文本进行复制，而不会在粘贴时替换选中的内容
    currentCommand.value = currentCommand.value.substring(0, startPos) + 
                          pastedText + 
                          currentCommand.value.substring(startPos)
    
    // 设置光标位置到粘贴文本之后
    const newPos = startPos + pastedText.length
    nextTick(() => {
      input.setSelectionRange(newPos, newPos)
    })
    
    // 阻止默认的粘贴行为，因为我们手动处理了
    event.preventDefault()
  }
}


onMounted(() => {
  // 添加全局键盘事件监听
  document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.terminal {
  font-family: 'Courier New', Monaco, monospace;
  background-color: var(--bg-color, #000000);
  color: var(--text-color, #00ff00);
  padding: 10px;
  height: 100vh;
  overflow: auto;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--text-color, #00ff00);
}

.header-title {
  font-weight: bold;
  font-size: 16px;
  color: var(--text-color, #00ff00);
  cursor: pointer;
  border: none;
}

.header-menu {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.header-btn {
  background: transparent;
  border: 1px solid var(--text-color, #00ff00);
  color: var(--text-color, #00ff00);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
}

.header-btn:hover {
  background-color: var(--text-color, #00ff00);
  color: var(--bg-color, #000000);
}

.command-line {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.prompt {
  color: #00ff00;
  margin-right: 5px;
  white-space: nowrap;
}

.command-input {
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  flex: 1;
  caret-color: #00ff00;
}

.cursor {
  animation: blink 1s step-end infinite;
  background-color: #00ff00;
  width: 8px;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
}

.output {
  margin-bottom: 10px;
  line-height: 1.4;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
