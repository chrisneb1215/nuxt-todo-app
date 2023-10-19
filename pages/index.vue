<template>
  <client-only>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <n-grid x-gap="12" :cols="2">
        <n-gi style="display: flex; justify-content: start">
          <img src="~/assets/vue-logo.svg" width="24"/>
          <n-h2 style="margin: 0 6px; font-weight: 400">
            <n-text depth="3" type="default" >Vue.js <n-text type="success" strong >ToDo</n-text> List</n-text>
          </n-h2>
        </n-gi>
        <n-gi style="display: flex; justify-content: end; align-items: flex-end" >
          <n-button :focusable="false" quaternary size="tiny" type="error" @click="handleDeleteAll">
            <template #icon>
              <n-icon><trash-icon/></n-icon>
            </template>
            Delete All
          </n-button>
        </n-gi>
      </n-grid>

      <n-card
          class="todo-card"
          size="huge"
          :segmented="{content: true}">

        <template #header>
          <CardHeader :filter="filter" @change="handleFilterChange"/>
        </template>

        <template #header-extra>
          <n-button
              style="align-self: self-end" :focusable="false"
              quaternary size="tiny"
              type="default"
              @click="handleDeleteDone">
            Clear done tasks
          </n-button>
        </template>

        <TaskList :tasks="filteredTasks"/>

        <template #action>
          <TodoInput />
        </template>
      </n-card>
    </div>

    <FabMessage message="This application uses the browser's Local Storage to store data"/>

  </client-only>
</template>

<script lang="ts" setup>
import {TrashAltRegular as TrashIcon} from "@vicons/fa"
import {CardHeader, TaskList, TodoInput, FabMessage} from '~/components'
import {createDiscreteApi} from "naive-ui"
import {TaskStatus} from "~/types/entities/Task"

const taskStore = useTaskStore()


onMounted(() => {
  // Initialize tasks from localStorage
  taskStore.initTasks()
})

const filter = ref<TaskStatus | null>(null)

const handleFilterChange = (val: TaskStatus | null) => {
  filter.value = val
}

const filteredTasks = computed(() => {
  return filter.value !== null ? taskStore.tasks.filter(item => item.status == filter.value) : taskStore.tasks
})

const { dialog } = createDiscreteApi(
    ['dialog']
)

const handleDeleteDone = () => {
  dialog.warning({
    title: 'Confirm',
    showIcon: false,
    content: `Are you sure you want to clear (${taskStore.getDoneTasks.length}) DONE tasks?`,
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: () => {
      taskStore.deleteDoneTasks()
    },
  })
}

const handleDeleteAll = () => {
  dialog.warning({
    title: 'Confirm',
    content: 'Are you sure you want to delete all your tasks?',
    positiveText: 'Yes, Delete All',
    negativeText: 'No',
    onPositiveClick: () => {
      taskStore.deleteAllTasks()
      filter.value = null
    },
  })
}
</script>

<style lang="scss">
.n-input .n-input-wrapper {
  padding-right: 4px;
}

.n-card.todo-card {
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  border-radius: 8px;

  > .n-card__action {
    padding: 16px;
  }
    .n-card__content {
      padding: 16px;
      max-height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
      min-height: 200px;
      display: grid;
      position: relative;
      transition: height 0.3s;
    }

    .n-card-header {
      padding: 16px;
    }
}
</style>
