// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const quotesRoutes = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Halaman utama -> redirect ke /quotes
app.get('/', (req, res) => {
  res.redirect('/quotes');
});

// Routes fitur quotes
app.use('/', quotesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
