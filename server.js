const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));
app.get('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'app.js')));

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET 
app.get('/api/expenses', (req, res) => {
  res.status(200).json(readData());
});

// GET 
app.get('/api/expenses/:id', (req, res) => {
  const expense = readData().find(e => e.id === Number(req.params.id));
  if (!expense) return res.status(404).json({ error: 'Expense not found' });
  res.status(200).json(expense);
});

// POST 
app.post('/api/expenses', (req, res) => {
  const { description, category, amount, date } = req.body;

  if (!description || !category || !date || amount === undefined) {
    return res.status(400).json({ error: 'description, category, amount and date are required' });
  }
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a number greater than 0' });
  }

  const data = readData();
  const id = data.length ? Math.max(...data.map(e => e.id)) + 1 : 1;
  const expense = { id, description: String(description).trim(), category: String(category).trim(), amount, date };

  data.push(expense);
  writeData(data);
  res.status(201).json(expense);
});

// DELETE 
app.delete('/api/expenses/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(e => e.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Expense not found' });

  const [removed] = data.splice(index, 1);
  writeData(data);
  res.status(200).json({ message: 'Expense deleted', expense: removed });
});

app.listen(PORT, () => console.log(`Expense Tracker running at http://localhost:${PORT}`));
