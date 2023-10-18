<template>
  <client-only>
        <n-card :segmented="{
      content: true,
    }" title=" " size="huge" content-style="padding: 16px;" header-style="padding: 16px;">
          <template #header-extra>
            <n-space>
              <n-button quaternary type="error" size="tiny" round>
                <template #icon>
                  <n-icon><trash-icon/></n-icon>
                </template>
                Clear Tasks
              </n-button>
            </n-space>
          </template>
          <task-list :tasks="tasks"/>
          <template #action>
            <n-input size="large" round placeholder="Add a task">
              <template #suffix>
                <n-button type="primary" circle>
                  <template #icon>
                    <n-icon><add-icon/></n-icon>
                  </template>
                </n-button>
              </template>
            </n-input>
          </template>
        </n-card>
  </client-only>
</template>

<script lang="ts" setup>
import {Plus as AddIcon, TrashAltRegular as TrashIcon} from "@vicons/fa"
import TaskList from "@/components/TasksList.vue"
import {Task, TaskStatus} from "~/types/Task";

const tasks = ref<Task[]>([
  { id: 1, name: 'Task #1', isDone: TaskStatus.PENDING },
  { id: 2, name: 'Task #2', isDone: TaskStatus.PENDING },
  { id: 2, name: 'Task #2', isDone: TaskStatus.PENDING },
])
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

#__nuxt {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.n-card {
  width: 100%;
  //min-width: 500px;
  max-width: 500px;
}
</style>
