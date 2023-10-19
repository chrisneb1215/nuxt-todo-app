<template>
  <div class="fab-container" :class="{ expanded: showMessage }">
    <div class="message">
      <n-text>{{ message }}</n-text>
    </div>

    <n-button type="info" class="fab"  circle size="large" @click="toggleMessage">
      <template #icon>

        <transition name="icon-fade" mode="out-in">
          <n-icon v-if="!showMessage" key="plus">
            <InfoIcon  />
          </n-icon>
          <n-icon v-else key="times">
            <TimesIcon  />
          </n-icon>
        </transition>

      </template>


    </n-button>

  </div>
</template>

<script lang="ts" setup>
import {Info as InfoIcon, Times as TimesIcon} from "@vicons/fa"
const showMessage = ref<boolean>(true)

defineProps({
  message: {
    type: String,
    default: ''
  }
})

const toggleMessage = () => {
  showMessage.value = !showMessage.value
}
</script>

<style lang="scss" scoped>
.fab-container {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #2080f0;
  transition: all 0.3s ease;
  justify-content: flex-end;
  overflow: hidden;

  &.expanded .fab {
    background-color: #fff;
    color: #2080f0;
  }

  &.expanded, &.expanded .message {
    width: 480px;
    opacity: 1;
  }
}

.message {
  width: 0;
  opacity: 0;
  position: absolute;
  white-space: nowrap;
  transition: width 0.2s ease-in-out, opacity 0.2s ease-in;

  .n-text {
    color: #fff;
    padding: 0 16px;
  }
}
.fab {
  --n-icon-margin: 0 !important;
}

.icon-fade-enter-active, .icon-fade-leave-active {
  transition: all 0.2s ease-in;
}

.icon-fade-enter, .icon-fade-leave-to {
  transform: rotate(180deg);
}
</style>
