<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="button"
    :class="`button--${props.type}`"
    :disabled="props.disabled"
  >
    <slot>Default button</slot>
  </button>
</template>
