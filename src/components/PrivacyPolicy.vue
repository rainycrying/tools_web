<template>
  <div class="terminal-tool">
    <!-- 隐私协议内容 -->
    <div class="output">
      <div class="success">隐私协议 - Linux Terminal Tools</div>
      <div class="info">输入 'back' 或 'exit' 返回主终端</div>
      <br>
      
      <div class="privacy-content">
        <div class="section-title">数据收集与使用</div>
        <div class="section-content">本平台不会收集、存储或传输您的任何输入数据。所有计算处理均在您的浏览器本地完成。</div>
        
        <div class="section-title">Cookies与追踪</div>
        <div class="section-content">我们不使用任何追踪技术或Cookies来收集用户信息。</div>
        
        <div class="section-title">第三方服务</div>
        <div class="section-content">本平台不集成任何第三方分析或广告服务。</div>
        
        <div class="section-title">数据安全</div>
        <div class="section-content">由于所有计算都在本地完成，您的数据永远不会离开您的设备，确保了最高级别的隐私保护。</div>
        
        <div class="section-title">开源声明</div>
        <div class="section-content">本平台完全开源，代码可审计。您可以在我们的GitHub仓库查看所有源代码。</div>
        
        <div class="section-title">联系方式</div>
        <div class="section-content">如有任何隐私相关问题，请联系：privacy@rainycrying.com</div>
      </div>
    </div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">privacy:~$</span>
      <div class="input-container">
        <input 
          type="text" 
          class="command-input" 
          v-model="currentCommand" 
          @keyup.enter="executeCommand"
          @keyup.up="navigateHistory(-1)"
          @keyup.down="navigateHistory(1)"
          ref="commandInput"
          inputmode="none"
          placeholder="输入命令..."
        />
        <span class="cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const currentCommand = ref('')
const commandHistory = ref([])
const historyIndex = ref(-1)
const commandInput = ref(null)
const router = useRouter()

// 执行命令
function executeCommand() {
  const command = currentCommand.value.trim()
  if (!command) return
  
  // 添加到历史记录
  commandHistory.value.push(command)
  historyIndex.value = commandHistory.value.length
  
  // 显示命令
  addOutput(`privacy:~$ ${command}`)
  
  const [cmd] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'back':
    case 'exit':
      router.push('/')
      break
    case 'help':
      showHelp()
      break
    case 'clear':
      clearOutput()
      break
    default:
      showHelp()
  }
  
  currentCommand.value = ''
}

// 历史记录导航
function navigateHistory(direction) {
  if (commandHistory.value.length === 0) return
  
  historyIndex.value += direction
  
  // 限制索引范围在 -1 到 commandHistory.value.length - 1 之间
  if (historyIndex.value < -1) {
    historyIndex.value = -1
  } else if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length - 1
  }
  
  if (historyIndex.value >= 0) {
    currentCommand.value = commandHistory.value[historyIndex.value]
  } else {
    currentCommand.value = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.querySelector('.output')
  if (output) {
    const div = document.createElement('div')
    div.className = type
    div.textContent = text
    output.appendChild(div)
  }
}

// 清空输出
function clearOutput() {
  const output = document.querySelector('.output')
  if (output) {
    output.innerHTML = ''
    addOutput('输出已清空', 'success')
  }
}

// 显示帮助信息
function showHelp() {
  addOutput('可用命令:', 'info')
  addOutput('  back/exit - 返回主终端', 'info')
  addOutput('  help     - 显示帮助信息', 'info')
  addOutput('  clear    - 清空输出内容', 'info')
}


</script>

<style scoped>
.terminal-tool {
  font-family: 'Courier New', Monaco, monospace;
  background-color: #000000;
  color: #00ff00;
  padding: 10px;
  height: 100vh;
  overflow: auto;
}

.command-line {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  margin-top: auto;
  min-height: 50px;
  padding: 10px 0;
  border-top: 1px solid #008800;
}

.prompt {
  color: #00ff00;
  margin-right: 5px;
  white-space: nowrap;
}

.input-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 40px;
  background-color: rgba(0, 136, 0, 0.1);
  border-radius: 4px;
  padding: 0 10px;
}

.command-input {
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: 100%;
  caret-color: #00ff00;
  height: 100%;
  font-size: 16px;
}

.command-input::placeholder {
  color: #008800;
}

.cursor {
  animation: blink 1s step-end infinite;
  background-color: #00ff00;
  width: 8px;
  height: 1em;
  display: inline-block;
  position: absolute;
  right: 0;
  pointer-events: none;
}

.output {
  margin-bottom: 10px;
  line-height: 1.4;
}

.privacy-content {
  margin-top: 20px;
}

.section-title {
  color: #00ffff;
  font-weight: bold;
  margin: 15px 0 5px 0;
  border-bottom: 1px solid #008800;
  padding-bottom: 3px;
}

.section-content {
  margin: 0 0 15px 0;
  padding-left: 10px;
  line-height: 1.5;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
