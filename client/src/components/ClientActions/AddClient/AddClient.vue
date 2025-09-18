<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Client } from "@/types/types";
import Input from "@blocks/Input/Input.vue";
import Button from "@blocks/Button/Button.vue";
import { useClients } from "@/composables/useClients";

const { addClient } = useClients();

const newClientValues = ref<Client>({
  name: "",
  address: "",
  email: "",
  phonenumber: "",
});

const showErrors = ref(false);
const showSuccess = ref(false);

const onSubmit = async (event: Event) => {
  event.preventDefault();

  const allFieldsFilled = Object.values(newClientValues.value).every(
    (value) => value.trim() !== ""
  );

  if (!allFieldsFilled) {
    showErrors.value = true;
    return;
  }

  showErrors.value = false;

  const result = await addClient(newClientValues.value);
  if (result) {
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
    onClearForm();
  }
};

const onClearForm = () => {
  newClientValues.value = {
    name: "",
    address: "",
    email: "",
    phonenumber: "",
  };
};

watch(
  newClientValues,
  () => {
    // Would write more logic to keep "unfixed" errors visible
    // until they are "touched" or fixed
    showErrors.value = false;
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h2>Add Client</h2>

    <Input
      label="Name"
      placeholder="Enter name"
      :required="true"
      v-model="newClientValues.name"
    />

    <Input
      label="Address"
      placeholder="Enter address"
      :required="true"
      v-model="newClientValues.address"
    />

    <Input
      label="Email"
      placeholder="Enter email"
      :required="true"
      v-model="newClientValues.email"
    />

    <Input
      label="Phone Number"
      placeholder="Enter phone number"
      :required="true"
      v-model="newClientValues.phonenumber"
    />

    <div v-if="showErrors" class="box box--error mb-3">
      <p v-if="!newClientValues.name">- Name is required.</p>
      <p v-if="!newClientValues.address">- Address is required.</p>
      <p v-if="!newClientValues.email">- Email is required.</p>
      <p v-if="!newClientValues.phonenumber">- Phone Number is required.</p>
    </div>

    <div class="box mb-3" v-if="showSuccess">
      <p class="success-message">Client added successfully!</p>
    </div>

    <div class="flex gap">
      <Button type="primary" @click="onSubmit">Add Client</Button>
      <Button type="secondary" @click="onClearForm">Clear Form</Button>
    </div>
  </div>
</template>
