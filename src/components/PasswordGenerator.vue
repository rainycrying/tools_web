<template>
  <div class="terminal-tool">
    <!-- 工具标题和说明 -->
    <div class="output">
      <div class="success">Password Generator - 密码生成工具</div>
      <div class="info">用法: password generate [长度] [数量] [选项]</div>
      <div class="info">选项: --lowercase, --uppercase, --numbers, --special [字符], --exclude [字符]</div>
      <div class="info">示例: password generate 12 5 --lowercase --uppercase --numbers</div>
      <br>
    </div>
    
    <!-- 命令历史输出区域 -->
    <div id="password-output"></div>
    
    <!-- 命令行输入区域 -->
    <div class="command-line">
      <span class="prompt">password-tool:~$</span>
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
          placeholder="输入password命令..."
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
  addOutput(`password-tool:~$ ${command}`)
  
  // 处理命令
  const [cmd, ...args] = command.split(' ')
  
  switch (cmd.toLowerCase()) {
    case 'generate':
      generatePasswords(args)
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

// 生成密码
function generatePasswords(args) {
  // 默认参数
  let length = 12
  let count = 5
  let useLowercase = false
  let useUppercase = false
  let useNumbers = false
  let specialChars = ''
  let excludeChars = ''

  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!isNaN(arg)) {
      if (length === 12) {
        length = parseInt(arg)
      } else if (count === 5) {
        count = parseInt(arg)
      }
    } else if (arg === '--lowercase') {
      useLowercase = true
    } else if (arg === '--uppercase') {
      useUppercase = true
    } else if (arg === '--numbers') {
      useNumbers = true
    } else if (arg === '--special' && i + 1 < args.length) {
      specialChars = args[++i]
    } else if (arg === '--exclude' && i + 1 < args.length) {
      excludeChars = args[++i]
    }
  }

  // 如果没有指定字符类型，使用默认
  if (!useLowercase && !useUppercase && !useNumbers && !specialChars) {
    useLowercase = true
    useUppercase = true
    useNumbers = true
  }

  let chars = ''
  if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (useNumbers) chars += '0123456789'
  if (specialChars) chars += specialChars

  // 过滤排除字符
  if (excludeChars) {
    const excludeSet = new Set(excludeChars.split(''))
    chars = chars.split('').filter(c => !excludeSet.has(c)).join('')
  }

  if (!chars) {
    addOutput('错误: 请至少选择一种字符类型', 'error')
    return
  }

  const passwords = []
  for (let i = 0; i < count; i++) {
    let password = ''
    for (let j = 0; j < length; j++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    passwords.push(password)
  }

  // 显示结果
  addOutput(`生成了 ${count} 个密码 (长度: ${length}):`, 'success')
  passwords.forEach((pwd, index) => {
    addOutput(`  ${index + 1}. ${pwd}`, 'info')
  })
}

// 显示帮助信息
function showHelp() {
  addOutput('密码生成器命令:', 'info')
  addOutput('  generate [长度] [数量] [选项] - 生成密码', 'info')
  addOutput('  选项:', 'info')
  addOutput('    --lowercase        - 包含小写字母 a-z', 'info')
  addOutput('    --uppercase        - 包含大写字母 A-Z', 'info')
  addOutput('    --numbers          - 包含数字 0-9', 'info')
  addOutput('    --special [字符]   - 自定义特殊字符', 'info')
  addOutput('    --exclude [字符]   - 排除特定字符', 'info')
  addOutput('  help                - 显示帮助信息', 'info')
  addOutput('  back/exit           - 返回主终端', 'info')
}

// 清空终端输出
function clearTerminal() {
  const output = document.getElementById('password-output')
  if (output) {
    output.innerHTML = ''
  }
}

// 添加输出到终端
function addOutput(text, type = 'normal') {
  const output = document.getElementById('password-output')
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
