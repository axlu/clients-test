<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Type here...",
  },
  label: {
    type: String,
    default: "Input",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="input">
    <label class="input__label">
      <span
        :class="{ 'input__label-text--required': props.required }"
        class="input__label-text"
      >
        {{ props.label }}
      </span>
      <input
        type="text"
        class="input__field"
        :placeholder="props.placeholder"
        :required="props.required"
        :value="props.modelValue"
        @input="onInput"
      />
    </label>
  </div>
</template>
