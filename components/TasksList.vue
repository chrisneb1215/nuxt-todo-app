<template>
  <n-list hoverable clickable :show-divider="false">
    <n-list-item v-for="task in tasks" :key="`task-${task.id}`" class="task-item">
      <template #prefix>
        <n-button size="small" circle type="success">
          <template #icon>
            <n-icon><check-icon/></n-icon>
          </template>
        </n-button>

      </template>
      {{ task.name }}
    </n-list-item>
  </n-list>
</template>

<script lang="ts" setup>
import {Check as CheckIcon} from '@vicons/fa'
import {Task} from "@/types/Task";

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.n-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.n-list-item.task-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
