<template>
  <div class="terminal-tool">
    <!-- 工具标题和说明 -->
    <div class="output">
      <div class="success">Hash Service - 哈希计算工具</div>
      <div class="info">支持算法: MD5, SHA1, SHA256, SHA512</div>
      <div class="info">用法: hash [算法] [文本] 或 hash all [文本]</div>
      <div class="info">示例: hash md5 hello 或 hash all password123</div>
      <br>
    </div>
    
    <!-- 命令历史输出区域 -->
    <div id="hash-output"></div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">hash-tool:~$</span>
      <div class="input-container">
        <input 
          type="text" 
          class="command-input" 
          v-model="currentCommand" 
          @keyup.enter="executeCommand"
          @keydown.up="navigateHistoryUp"
          @keydown.down="navigateHistoryDown"
          @paste="handlePaste"
          ref="commandInput"
          inputmode="none"
          placeholder="输入hash命令..."
        />
        <span class="cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const currentCommand = ref('')
const commandInput = ref(null)
const router = useRouter()
const commandHistory = ref([])
const historyIndex = ref(-1)

// 支持的哈希算法
const hashAlgorithms = {
  md5: CryptoJS.MD5,
  sha1: CryptoJS.SHA1,
  sha256: CryptoJS.SHA256,
  sha512: CryptoJS.SHA512
}

// 执行命令
function executeCommand() {
  const command = currentCommand.value.trim()
  if (!command) return
  
  // 显示命令
  addOutput(`hash-tool:~$ ${command}`)
  
  // 添加命令到历史记录
  addToHistory(command)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'hash':
      calculateHash(args)
      break
    case 'help':
      showHelp()
      break
    case 'clear':
      clearTerminal()
      break
    case 'back':
    case 'exit':
      addOutput('返回主终端...', 'info')
      setTimeout(() => {
        router.push('/')
      }, 500)
      break
    default:
      addOutput(`命令未找到: ${cmd}`, 'error')
      showHelp()
  }
  
  // 清空当前命令
  currentCommand.value = ''
  
  // 滚动到底部
  scrollToBottom()
}

// 计算哈希值
function calculateHash(args) {
  if (args.length < 2) {
    addOutput('错误: 用法: hash [算法] [文本] 或 hash all [文本]', 'error')
    return
  }

  const algorithm = args[0].toLowerCase()
  const text = args.slice(1).join(' ')

  if (!text) {
    addOutput('错误: 请输入要计算哈希的文本', 'error')
    return
  }

  if (algorithm === 'all') {
    // 计算所有算法
    addOutput(`计算所有哈希值: "${text}"`, 'success')
    Object.entries(hashAlgorithms).forEach(([algoName, algoFunc]) => {
      const hash = algoFunc(text).toString()
      addOutput(`  ${algoName.toUpperCase()}: ${hash}`, 'info')
    })
  } else if (hashAlgorithms[algorithm]) {
    // 计算指定算法
    const hash = hashAlgorithms[algorithm](text).toString()
    addOutput(`${algorithm.toUpperCase()}("${text}"): ${hash}`, 'success')
  } else {
    addOutput(`错误: 不支持的算法 "${algorithm}"`, 'error')
    addOutput('支持的算法: md5, sha1, sha256, sha512, all', 'info')
  }
}

// 显示帮助信息
function showHelp() {
  addOutput('哈希计算工具命令:', 'info')
  addOutput('  hash [算法] [文本] - 计算指定算法的哈希值', 'info')
  addOutput('  hash all [文本]    - 计算所有算法的哈希值', 'info')
  addOutput('  支持的算法:', 'info')
  addOutput('    md5              - MD5 哈希', 'info')
  addOutput('    sha1             - SHA-1 哈希', 'info')
  addOutput('    sha256           - SHA-256 哈希', 'info')
  addOutput('    sha512           - SHA-512 哈希', 'info')
  addOutput('    all              - 所有算法', 'info')
  addOutput('  help              - 显示帮助信息', 'info')
  addOutput('  back/exit         - 返回主终端', 'info')
}

// 清空终端输出
function clearTerminal() {
  const output = document.getElementById('hash-output')
  if (output) {
    output.innerHTML = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('hash-output')
  if (output) {
    const div = document.createElement('div')
    div.className = type
    div.textContent = text
    output.appendChild(div)
  }
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const terminal = document.querySelector('.terminal-tool')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  })
}

// 历史记录导航 - 向上
function navigateHistoryUp() {
  if (commandHistory.value.length === 0) return
  
  if (historyIndex.value < commandHistory.value.length - 1) {
    historyIndex.value++
  }
  currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value]
}

// 历史记录导航 - 向下
function navigateHistoryDown() {
  if (commandHistory.value.length === 0) return
  
  if (historyIndex.value > 0) {
    historyIndex.value--
    currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value]
  } else {
    historyIndex.value = -1
    currentCommand.value = ''
  }
}

// 添加命令到历史记录
function addToHistory(command) {
  if (command && command.trim()) {
    commandHistory.value.push(command.trim())
    // 限制历史记录长度
    if (commandHistory.value.length > 50) {
      commandHistory.value.shift()
    }
    historyIndex.value = -1
  }
}

// 处理粘贴事件
function handlePaste(event) {
  // 获取粘贴的文本内容
  const pastedText = event.clipboardData.getData('text')
  if (pastedText) {
    // 将粘贴的文本添加到当前命令中
    currentCommand.value += pastedText
    // 阻止默认的粘贴行为，因为我们手动处理了
    event.preventDefault()
  }
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
  align-items: center;
  margin-bottom: 5px;
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
