<template>
  <n-empty class="empty-list" :description="description" size="huge">
    <template #icon>
      <n-icon>
        <WindIcon />
      </n-icon>
    </template>
  </n-empty>
</template>

<script lang="ts" setup>
import {Wind as WindIcon} from '@vicons/fa'

defineProps({
  description: {
    type: String,
    default: 'You have no tasks'
  }
})
</script>
