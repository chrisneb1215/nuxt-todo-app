<template>
    <n-list v-show="tasks.length" :show-divider="false" clickable hoverable>
      <transition-group  mode="out-in" name="list">
        <n-list-item v-for="task in tasks" :key="`task-${task.id}`" class="task-item" @click="taskStore.toggleTaskStatus(task.id)">
          <template #prefix>
            <n-button :dashed="task.status == TaskStatus.PENDING"
                      :focusable="false" :type="task.status == TaskStatus.DONE ? 'success' : 'default'"
                      circle
                      size="small">
              <template #icon>
                <n-icon :color="task.status == TaskStatus.PENDING ? '#BABABA' : ''"><check-icon/></n-icon>
              </template>
            </n-button>

          </template>

          <template #suffix>
            <n-button circle
                      quaternary
                      size="small"
                      type="error"
            @click="taskStore.deleteTask(task.id)">
              <template #icon>
                <n-icon><trash-icon/></n-icon>
              </template>
            </n-button>

          </template>
          <n-text :delete="task.status == TaskStatus.DONE" :depth="task.status == TaskStatus.DONE ? 3 : 1">{{ task.name }}</n-text>
        </n-list-item>
      </transition-group>
    </n-list>

    <n-empty v-show="!tasks.length" class="empty-list" description="You have no active tasks" size="huge">
      <template #icon>
        <n-icon>
          <wind-icon />
        </n-icon>
      </template>
    </n-empty>
</template>

<script lang="ts" setup>
import {Check as CheckIcon, Wind as WindIcon, TrashAltRegular as TrashIcon} from '@vicons/fa'
import {Task, TaskStatus} from "~/types/entities/Task";

const taskStore = useTaskStore()

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    default: () => []
  }
})

const buttonType = {
  0: 'default',
  1: 'success'
}
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.empty-list {
  align-self: center;
  justify-self: center;
  right: 16px;
  left: 16px;
  position: absolute;
}

.n-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.n-list .n-list-item {
  transition: all 0.5s ease;
}

.n-list-item.task-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
