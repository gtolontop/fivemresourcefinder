const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/api/auth/discord', (req, res) => {
  req.session.user = { username: 'DiscordUser', roles: ['admin'] };
  res.redirect('http://localhost:5173/admin');
});

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user && req.session.user.roles.includes('admin')) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

app.get('/api/resources', (req, res) => {
  const resourcesDir = path.join(__dirname, 'resources');
  fs.readdir(resourcesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading resources directory' });
    }
    const resources = [];
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(resourcesDir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        try {
          const json = JSON.parse(data);
          resources.push(json);
        } catch (e) {
          console.error(`Error parsing JSON from file ${file}:`, e);
        }
      }
    });
    res.json(resources);
  });
});

app.get('/api/admin/data', isAuthenticated, (req, res) => {
  res.json({ message: 'This is secured admin data.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
