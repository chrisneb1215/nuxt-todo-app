<template>
  <n-space>
    <n-button v-for="fb in filterButtons"
              :key="`filter-button-${fb.label}`"
              size="small"
              :dashed="filter == fb.value"
              :focusable="false"
              :quaternary="filter !== fb.value"
              round
              :type="fb.type as Type"
              @click="setFilter(fb.value)">
      <template #icon>
        <n-badge :max="99" :value="taskStore[fb.key].length" show-zero :type='fb.type as "default" | "error" | "info" | "success" | "warning"'/>
      </template>
      {{ fb.label }}
    </n-button>
  </n-space>
</template>
<script setup lang="ts">
import {TaskStatus} from "~/types/entities/Task"
import {Type} from "naive-ui/es/button/src/interface"

const taskStore = useTaskStore()

const props = defineProps({
  filter: {
    default: null
  }
})

const filterButtons = [
  { key: 'getTasks', value: null, label: 'All', type: 'info'},
  { key: 'getPendingTasks', value: TaskStatus.PENDING, label: 'Pending', type: 'warning'},
  { key: 'getDoneTasks', value: TaskStatus.DONE, label: 'Done', type: 'success'},
]

const emit = defineEmits(['change'])

const setFilter = (val: TaskStatus | null) => {
  emit('change', val)
}
</script>
