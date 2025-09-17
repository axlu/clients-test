import express from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Generate 20 fake clients
const generateClients = (count) => {
  const clients = [];
  for (let i = 0; i < count; i++) {
    clients.push({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      phonenumber: faker.phone.number(),
    });
  }
  return clients;
};

// In-memory storage for clients
const clients = generateClients(20);

// Route: Get all clients with pagination
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

// Route: Add a new client
app.post('/api/clients', (req, res) => {
  const { name, address, email, phonenumber } = req.body;

  if (!name || !address || !email || !phonenumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newClient = { name, address, email, phonenumber };
  clients.push(newClient);

  res.status(201).json(newClient);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export app for testing
export default app;
