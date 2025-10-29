const express = require('express');
const app = express();
app.use(express.json());

let cards = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.send('REST API for Playing Card Collection Using Express.js');
});

app.get('/cards', (req, res) => {
  res.json(cards);
});

app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).json({ message: 'Suit and value are required' });
  const card = { id: nextId++, suit, value };
  cards.push(card);
  res.status(201).json(card);
});

app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Card not found' });
  res.json(card);
});

app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Card not found' });
  cards.splice(index, 1);
  res.json({ message: 'Card deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
