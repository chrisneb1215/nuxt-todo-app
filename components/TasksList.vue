<template>
    <n-list :show-divider="false" hoverable>
      <transition-group v-show="taskStore.tasks.length" name="list" class="task-item" tag="div">
        <template v-for="task in tasks" :key="`task-${task.id}`" >
          <n-list-item >
          <template #prefix>
            <n-button :dashed="task.status == TaskStatus.PENDING" @click="taskStore.toggleTaskStatus(task.id)"
                      :focusable="false" :type="task.status == TaskStatus.DONE ? 'success' : 'default'"
                      circle
                      size="small">
              <template #icon>
                <n-icon :color="task.status == TaskStatus.PENDING ? '#BABABA' : ''"><check-icon/></n-icon>
              </template>
            </n-button>
          </template>

          <template #suffix>
            <n-button circle class="delete-button"
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
        </template>

      </transition-group>
    </n-list>

    <EmptyPlaceholder v-show="!taskStore.tasks.length" />
</template>

<script lang="ts" setup>
import {Check as CheckIcon, TrashAltRegular as TrashIcon} from '@vicons/fa'
import {Task, TaskStatus} from "~/types/entities/Task";
import {EmptyPlaceholder} from "~/components";

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

.n-list .task-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.n-list .n-list-item {
  transition: all 0.5s ease;

  .delete-button {
    opacity: 0;
    transition: all 0.5s ease;
  }

  &:hover {
    .delete-button {
      opacity: 1;
    }
  }
}

.task-item .n-list-item {
  --n-border-radius: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
