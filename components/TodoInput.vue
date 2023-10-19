<template>
  <n-input v-model:value="newTask" placeholder="Add new todo" round size="large" @keydown="handleKeyEnter">
    <template #suffix>
      <n-button circle type="primary" @click="handleAddTask">
        <template #icon>
          <n-icon><AddIcon/></n-icon>
        </template>
      </n-button>
    </template>
  </n-input>
  <small class="text-9px text-gray:50" style="color: grey; margin-left: 16px;">Hit <n-text code>Enter</n-text>  or click <n-text code>+</n-text> button to add a new todo</small>
</template>

<script lang="ts" setup>
import {Plus as AddIcon} from "@vicons/fa"

const newTask = ref('')
const taskStore = useTaskStore()

const handleAddTask = () => {
  if (newTask.value.trim() !== '') {
    taskStore.addTask(newTask.value)
    newTask.value = ''
  }
}

const handleKeyEnter = (event: { keyCode: number }) => {
  if (event.keyCode === 13) {
    // Enter key was pressed
    handleAddTask()
  }
}
</script>
