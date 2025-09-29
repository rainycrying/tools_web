<template>
  <div class="terminal-tool">
    <!-- 工具标题和说明 -->
    <div class="output">
      <div class="success">UUID Generator - UUID生成工具</div>
      <div class="info">UUID（Universally Unique Identifier）是一个 128 位的标识符</div>
      <div class="info">用法: uuid generate [数量] [选项]</div>
      <div class="info">选项: --version [版本号] (目前仅支持版本4)</div>
      <div class="info">示例: uuid generate 5 或 uuid generate 10 --version 4</div>
      <br>
    </div>
    
    <!-- 命令历史输出区域 -->
    <div id="uuid-output"></div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">uuid-tool:~$</span>
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
          placeholder="输入uuid命令..."
        />
        <span class="cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const currentCommand = ref('')
const commandInput = ref(null)
const router = useRouter()
const commandHistory = ref([])
const historyIndex = ref(-1)

// 执行命令
function executeCommand() {
  const command = currentCommand.value.trim()
  if (!command) return
  
  // 显示命令
  addOutput(`uuid-tool:~$ ${command}`)
  
  // 添加命令到历史记录
  addToHistory(command)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'generate':
      generateUUIDs(args)
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

// 生成UUID
function generateUUIDs(args) {
  // 默认参数
  let count = 5
  let version = 4

  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!isNaN(arg)) {
      count = parseInt(arg)
    } else if (arg === '--version' && i + 1 < args.length) {
      version = parseInt(args[++i])
    }
  }

  // 验证参数
  if (count < 1 || count > 100) {
    addOutput('错误: 数量必须在 1-100 之间', 'error')
    return
  }

  if (version !== 4) {
    addOutput('警告: 目前仅支持版本 4 UUID', 'warning')
    version = 4
  }

  const uuids = Array.from({ length: count }, () => crypto.randomUUID())

  // 显示结果
  addOutput(`生成了 ${count} 个 UUID (版本 ${version}):`, 'success')
  uuids.forEach((uuid, index) => {
    addOutput(`  ${index + 1}. ${uuid}`, 'info')
  })
  
  // 提供复制选项
  addOutput('提示: 点击UUID可复制到剪贴板', 'info')
  
  // 为每个UUID添加点击复制功能
  nextTick(() => {
    const output = document.getElementById('uuid-output')
    if (output) {
      const uuidElements = output.querySelectorAll('.info')
      uuidElements.forEach((element, index) => {
        if (element.textContent.includes(uuids[index])) {
          element.style.cursor = 'pointer'
          element.style.textDecoration = 'underline'
          element.onclick = () => {
            navigator.clipboard.writeText(uuids[index])
            addOutput(`已复制: ${uuids[index]}`, 'success')
          }
        }
      })
    }
  })
}

// 显示帮助信息
function showHelp() {
  addOutput('UUID生成器命令:', 'info')
  addOutput('  generate [数量] [选项] - 生成UUID', 'info')
  addOutput('  选项:', 'info')
  addOutput('    --version [版本号] - UUID版本 (目前仅支持版本4)', 'info')
  addOutput('  help                - 显示帮助信息', 'info')
  addOutput('  back/exit           - 返回主终端', 'info')
}

// 清空终端输出
function clearTerminal() {
  const output = document.getElementById('uuid-output')
  if (output) {
    output.innerHTML = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('uuid-output')
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

.info {
  cursor: pointer;
  text-decoration: underline;
}

.info:hover {
  color: #00cc00;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
