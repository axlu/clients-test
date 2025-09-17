import { ref } from "vue";
import type { Client } from "@/types/types";
import type { ClientsResponse } from "@/types/types";

export function useClients() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const clients = ref<ClientsResponse | null>(null);

  const addClient = async (client: Client) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const response = await fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      success.value = true;
      return await response.json();
    } catch (err: any) {
      error.value = err.message || "Unknown error";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchClients = async (page = 1, limit = 10) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const response = await fetch(
        `http://localhost:3000/api/clients?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      clients.value = await response.json();
      success.value = true;
    } catch (err: any) {
      error.value = err.message || "Unknown error";
      clients.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    clients,
    addClient,
    fetchClients,
  };
}
