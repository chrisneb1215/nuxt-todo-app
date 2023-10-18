<template>
  <client-only>
        <n-card :segmented="{
      content: true,
    }" content-style="    padding: 16px;
    max-height: 600px;
    overflow-y: overlay; overflow-x: hidden; min-height: 200px; display: grid; position: relative; transition: height 0.3s;" header-style="padding: 16px;" size="huge">
          <template #header>
            <n-space>
              <n-button :dashed="filters.includes(TaskStatus.PENDING)" :focusable="false" :quaternary="!filters.includes(TaskStatus.PENDING)" round type="warning" @click="toggleArrayValue(TaskStatus.PENDING)">
                <template #icon>
                  <n-badge :max="99" :value="pendingTasks" show-zero type="warning"/>
                </template>
                Pending
              </n-button>
              <n-button :dashed="filters.includes(TaskStatus.DONE)" :focusable="false" :quaternary="!filters.includes(TaskStatus.DONE)" round type="success" @click="toggleArrayValue(TaskStatus.DONE)">
                <template #icon>
                  <n-badge :max="99" :value="taskStore.getDoneTasks.length" show-zero type="success"/>
                </template>
                Done
              </n-button>
<!--              <n-button :dashed="filters.length < 2" type="info" @click="filters = [TaskStatus.DONE, TaskStatus.PENDING]">-->
<!--                Show All-->
<!--              </n-button>-->

              <n-switch v-model:value="showAll" :checked-value="1" :unchecked-value="0" @update:value="handleToggleAll" />
            </n-space>
          </template>
          <template #header-extra>
              <n-button :focusable="false" quaternary round size="tiny" type="error" @click="handleDeleteAll">
                <template #icon>
                  <n-icon><trash-icon/></n-icon>
                </template>
                Delete All Tasks
              </n-button>
          </template>
          <task-list :tasks="filters.length ? taskStore.tasks.filter(item => filters.includes(item.status)) : taskStore.tasks"/>
          <template #action>
            <n-input v-model:value="newTask" placeholder="Add new todo" round size="large" @keydown="handleKeyEnter">
              <template #suffix>
                <n-button circle type="primary" @click="handleAddTask">
                  <template #icon>
                    <n-icon><add-icon/></n-icon>
                  </template>
                </n-button>
              </template>
            </n-input>
            <small class="text-9px text-gray:50">Hit <n-text code>Enter</n-text> to add task</small>
          </template>
        </n-card>
  </client-only>
</template>

<script lang="ts" setup>
import {Plus as AddIcon, TrashAltRegular as TrashIcon} from "@vicons/fa"
import TaskList from "~/components/TasksList.vue"
import {createDiscreteApi} from "naive-ui"
import {TaskStatus} from "~/types/entities/Task";

const { dialog } = createDiscreteApi(
    ['dialog']
)

const taskStore = useTaskStore()

// Initialize tasks from localStorage
onMounted(() => {
  taskStore.initTasks()
})

const newTask = ref('')

const showAll = ref(0)



const toggleArrayValue = (filter: any) => {
  filters.value = filters.value.includes(filter)
      ? filters.value.filter(el => el !== filter)
      : [...filters.value, filter]
}


const handleToggleAll = (value: boolean) => {
  if(value) {
    filters.value = [TaskStatus.DONE, TaskStatus.PENDING]
  }else {
    filters.value = [TaskStatus.PENDING]
  }
}
const filters = ref([])

watch(filters, async (newFilter) => {
  if (newFilter.length > 1) {
    showAll.value = 1
  }else {
    showAll.value = 0
  }
})

const handleAddTask = () => {
  if (newTask.value.trim() !== '') {
    taskStore.addTask(newTask.value)
    newTask.value = ''
  }
}
const handleDeleteAll = () => {
    dialog.warning({
      title: 'Confirm',
      content: 'Are you sure you want to delete all your tasks?',
      positiveText: 'Yes',
      negativeText: 'No',
      onPositiveClick: () => {
        taskStore.deleteAllTasks()
      },
    })
  }

const handleKeyEnter = (event: { keyCode: number }) => {
  if (event.keyCode === 13) {
    // Enter key was pressed
    handleAddTask()
  }
}

const pendingTasks = computed(() => {
  return taskStore.getPendingTasks.length
})
</script>

<style lang="scss">
html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  width: 100vw;
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
}

.n-input .n-input-wrapper {
  padding-right: 4px;
}

#__nuxt {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.n-card {
  width: 100%;
  max-width: 500px;
  max-height: 500px;

  > .n-card__action {
    padding: 16px;
  }
}
</style>
