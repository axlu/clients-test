const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Mock
let clients = [
  { id: 1, name: "Alice", address: "123 Main St", email: "alice@example.com", phonenumber: "1234567890" },
  { id: 2, name: "Bob", address: "456 Elm St", email: "bob@example.com", phonenumber: "0987654321" },
];

app.get('/api/clients', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedClients = clients.slice(startIndex, endIndex);

  res.json({
    total: clients.length,
    page,
    limit,
    clients: paginatedClients,
  });
});

app.post('/api/clients', (req, res) => {
  const client = req.body;
  client.id = clients.length + 1;
  clients.push(client);
  res.status(201).json(client);
});

describe('GET /api/clients', () => {
  it('should return all clients with default pagination', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('clients');
    expect(res.body.clients.length).toBeLessThanOrEqual(10);
    expect(res.body).toHaveProperty('total', clients.length);
  });

  it('should return paginated clients', async () => {
    const res = await request(app).get('/api/clients?page=1&limit=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.clients.length).toBe(1);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(1);
  });

  it('should handle out-of-range page', async () => {
    const res = await request(app).get('/api/clients?page=100&limit=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.clients.length).toBe(0);
  });
});

describe('POST /api/clients', () => {
  it('should add a new client', async () => {
    const newClient = {
      name: "Charlie",
      address: "789 Oak St",
      email: "charlie@example.com",
      phonenumber: "5555555555"
    };
    const res = await request(app).post('/api/clients').send(newClient);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe("Charlie");
  });
});