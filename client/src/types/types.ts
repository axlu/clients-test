export interface Client {
  name: string;
  address: string;
  email: string;
  phonenumber: string;
}

export interface ClientsResponse {
  clients: Client[];
  total: number;
  page: number;
  limit: number;
}
