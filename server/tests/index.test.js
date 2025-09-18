const request = require('supertest');
const app = require('../app.js').default;

describe('GET /api/clients', () => {
  it('should return clients', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('clients');
  });
});

describe('POST /api/clients', () => {
  it('should add a new client', async () => {
    const newClient = {
      name: "John Doe",
      address: "Storgatan 1",
      email: "john@example.com",
      phonenumber: "5555555555"
    };
    const res = await request(app).post('/api/clients').send(newClient);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("John Doe");
  });
});
