// controllers/quotesController.js
const pool = require('../config/db');

// Ambil 9 quotes secara random dari database
async function getRandomQuotes(limit = 9) {
  const [rows] = await pool.query(
    'SELECT id, text, author, created_at FROM quotes ORDER BY RAND() LIMIT ?',
    [limit]
  );
  return rows;
}

// a. GET /api/quotes/  -> JSON 9 quotes random
exports.apiGetRandomQuotes = async (req, res) => {
  try {
    const quotes = await getRandomQuotes(9);
    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data quotes',
      error: err.message
    });
  }
};

// b. GET /quotes -> halaman web menampilkan quotes
exports.pageQuotes = async (req, res) => {
  try {
    const quotes = await getRandomQuotes(9);
    res.render('quotes', { quotes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan saat memuat halaman quotes.');
  }
};

exports.getRandomQuotes = getRandomQuotes;
