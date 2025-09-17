const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

describe('GET /api/hello', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello World');
  });
});