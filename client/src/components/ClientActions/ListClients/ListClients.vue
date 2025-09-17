<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useClients } from "@/composables/useClients";
import Button from "@blocks/Button/Button.vue";

const { fetchClients, clients } = useClients();

const page = ref(1);
const limit = ref(5);

const nextPage = () => {
  if (clients.value && page.value * limit.value < clients.value.total) {
    page.value++;
    fetchClients(page.value, limit.value);
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchClients(page.value, limit.value);
  }
};

onMounted(() => {
  fetchClients(page.value, limit.value);
});
</script>

<template>
  <div>
    <h2>All Clients</h2>
    <ul v-if="clients && clients.clients.length" class="clients-list">
      <li
        v-for="client in clients.clients"
        :key="client.phonenumber"
        class="clients-list__item"
      >
        <div class="mb-3">
          <p>Name: {{ client.name }}</p>
          <p>Address: {{ client.address }}</p>
          <p>Email: {{ client.email }}</p>
          <p>Phone Number: {{ client.phonenumber }}</p>
        </div>
      </li>
    </ul>

    <div class="pagination mb-2">
      <Button @click="prevPage" type="primary">Previous</Button>
      <span>
        Page {{ page }} of {{ clients ? Math.ceil(clients.total / limit) : 1 }}
      </span>
      <Button @click="nextPage" type="primary"> Next </Button>
    </div>
  </div>
</template>
