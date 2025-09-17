<script setup lang="ts">
import { defineProps } from "vue";
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
