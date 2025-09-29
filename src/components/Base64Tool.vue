<template>
  <div class="terminal-tool">
    <!-- 工具标题和说明 -->
    <div class="output">
      <div class="success">Base64 Tool - 编码/解码工具</div>
      <div class="info">用法: base64 encode [文本] 或 base64 decode [Base64字符串]</div>
      <div class="info">示例: base64 encode hello 或 base64 decode aGVsbG8=</div>
      <br>
    </div>
    
    <!-- 命令历史输出区域 -->
    <div id="base64-output"></div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">base64-tool:~$</span>
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
          placeholder="输入base64命令..."
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
  
  // 添加到历史记录
  commandHistory.value.push(command)
  historyIndex.value = commandHistory.value.length
  
  // 显示命令
  addOutput(`base64-tool:~$ ${command}`)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'encode':
      if (args.length > 0) {
        const text = args.join(' ')
        try {
          const result = btoa(unescape(encodeURIComponent(text)))
          addOutput(`编码结果: ${result}`, 'success')
        } catch (e) {
          addOutput('编码失败', 'error')
        }
      } else {
        addOutput('错误: 请输入要编码的文本', 'error')
        addOutput('用法: base64 encode [文本]', 'info')
      }
      break
    case 'decode':
      if (args.length > 0) {
        const base64String = args.join(' ')
        try {
          const result = decodeURIComponent(escape(atob(base64String)))
          addOutput(`解码结果: ${result}`, 'success')
        } catch (e) {
          addOutput('解码失败: 无效的Base64输入', 'error')
        }
      } else {
        addOutput('错误: 请输入要解码的Base64字符串', 'error')
        addOutput('用法: base64 decode [Base64字符串]', 'info')
      }
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

// 显示帮助信息
function showHelp() {
  addOutput('Base64工具命令:', 'info')
  addOutput('  encode [文本]      - Base64编码文本', 'info')
  addOutput('  decode [Base64字符串] - Base64解码字符串', 'info')
  addOutput('  help              - 显示帮助信息', 'info')
  addOutput('  back/exit         - 返回主终端', 'info')
}

// 清空终端输出
function clearTerminal() {
  const output = document.getElementById('base64-output')
  if (output) {
    output.innerHTML = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('base64-output')
  if (output) {
    const div = document.createElement('div')
    div.className = type
    div.textContent = text
    output.appendChild(div)
  }
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
    const terminal = document.querySelector('.terminal-tool')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  })
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
