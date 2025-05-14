const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: 1, name: 'Ashik', email: 'ashik@gmail.com', password: '1234', coins: 100, role: 'user' },
  { id: 2, name: 'Admin', email: 'admin@gmail.com', password: 'admin', coins: 0, role: 'admin' }
];

let games = [
  { id: 1, name: 'Slot Game', cost: 10, winChance: 0.1 }
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid login' });
  }
});

app.post('/play-game', (req, res) => {
  const { userId, gameId } = req.body;
  const user = users.find(u => u.id === userId);
  const game = games.find(g => g.id === gameId);

  if (user.coins < game.cost) {
    return res.json({ success: false, message: 'Not enough coins' });
  }

  user.coins -= game.cost;
  const win = Math.random() < game.winChance;
  if (win) {
    user.coins += game.cost * 2;
    res.json({ success: true, result: 'win', coins: user.coins });
  } else {
    res.json({ success: true, result: 'lose', coins: user.coins });
  }
});

app.post('/admin/add-coins', (req, res) => {
  const { email, coins } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    user.coins += coins;
    res.json({ success: true, message: 'Coins added', coins: user.coins });
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
