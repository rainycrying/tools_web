<template>
  <div class="terminal-tool">
    <!-- 工具标题和说明 -->
    <div class="output">
      <div class="success">JSON Tool - JSON处理工具</div>
      <div class="info">支持功能: 格式化, 压缩, 验证, 转译, 去转译</div>
      <div class="info">用法: json [操作] [JSON字符串]</div>
      <div class="info">操作: format, compress, validate, escape, unescape</div>
      <div class="info">示例: json format '{"name":"John","age":30}'</div>
      <br>
    </div>
    
    <!-- 命令历史输出区域 -->
    <div id="json-output"></div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">json-tool:~$</span>
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
          placeholder="输入json命令..."
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
  addOutput(`json-tool:~$ ${command}`)
  
  // 添加命令到历史记录
  addToHistory(command)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'json':
      processJson(args)
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

// 处理JSON
function processJson(args) {
  if (args.length < 2) {
    addOutput('错误: 用法: json [操作] [JSON字符串]', 'error')
    return
  }

  const operation = args[0].toLowerCase()
  const jsonString = args.slice(1).join(' ')

  if (!jsonString) {
    addOutput('错误: 请输入JSON字符串', 'error')
    return
  }

  try {
    switch (operation) {
      case 'format':
        const objFormat = JSON.parse(jsonString)
        const formatted = JSON.stringify(objFormat, null, 2)
        addOutput('格式化结果:', 'success')
        addOutput(formatted, 'info')
        break
        
      case 'compress':
        const objCompress = JSON.parse(jsonString)
        const compressed = JSON.stringify(objCompress)
        addOutput('压缩结果:', 'success')
        addOutput(compressed, 'info')
        break
        
      case 'validate':
        JSON.parse(jsonString)
        addOutput('✅ 有效的JSON', 'success')
        break
        
      case 'escape':
        const escaped = JSON.stringify(jsonString).replace(/^"|"$/g, '')
        addOutput('转译结果:', 'success')
        addOutput(escaped, 'info')
        break
        
      case 'unescape':
        const unescaped = JSON.parse('"' + jsonString + '"')
        addOutput('去转译结果:', 'success')
        addOutput(unescaped, 'info')
        break
        
      default:
        addOutput(`错误: 不支持的操作 "${operation}"`, 'error')
        addOutput('支持的操作: format, compress, validate, escape, unescape', 'info')
    }
  } catch (e) {
    addOutput(`❌ 错误: ${e.message}`, 'error')
  }
}

// 显示帮助信息
function showHelp() {
  addOutput('JSON处理工具命令:', 'info')
  addOutput('  json [操作] [JSON字符串] - 处理JSON', 'info')
  addOutput('  支持的操作:', 'info')
  addOutput('    format    - 格式化JSON', 'info')
  addOutput('    compress  - 压缩JSON', 'info')
  addOutput('    validate  - 验证JSON', 'info')
  addOutput('    escape    - 转译JSON字符串', 'info')
  addOutput('    unescape  - 去转译JSON字符串', 'info')
  addOutput('  help       - 显示帮助信息', 'info')
  addOutput('  back/exit  - 返回主终端', 'info')
}

// 清空终端输出
function clearTerminal() {
  const output = document.getElementById('json-output')
  if (output) {
    output.innerHTML = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('json-output')
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
