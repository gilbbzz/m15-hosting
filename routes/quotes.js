// routes/quotes.js
const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

// GET /api/quotes/  -> JSON 9 quotes random
router.get('/api/quotes/', quotesController.apiGetRandomQuotes);

// GET /quotes -> halaman HTML
router.get('/quotes', quotesController.pageQuotes);

module.exports = router;
