// sql/seed.js
// Membuat tabel (jika belum ada) lalu mengisi data quotes contoh.
// Jalankan dengan: npm run seed

const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const quotes = [
  { text: 'Satu-satunya cara melakukan pekerjaan hebat adalah mencintai apa yang kamu kerjakan.', author: 'Steve Jobs' },
  { text: 'Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaanlah kunci kesuksesan.', author: 'Albert Schweitzer' },
  { text: 'Jangan menunggu. Waktu tidak akan pernah tepat.', author: 'Napoleon Hill' },
  { text: 'Masa depan milik mereka yang percaya pada keindahan mimpi mereka.', author: 'Eleanor Roosevelt' },
  { text: 'Hidup adalah 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponnya.', author: 'Charles R. Swindoll' },
  { text: 'Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.', author: 'Henry Ford' },
  { text: 'Percayalah kamu bisa, maka kamu sudah setengah jalan menuju sana.', author: 'Theodore Roosevelt' },
  { text: 'Cara terbaik untuk memprediksi masa depan adalah menciptakannya.', author: 'Peter Drucker' },
  { text: 'Jangan takut gagal. Takutlah menjadi orang yang tidak pernah mencoba.', author: 'Anonim' },
  { text: 'Kebahagiaan tidak bergantung pada apa yang kamu miliki atau siapa kamu, melainkan pada apa yang kamu pikirkan.', author: 'Buddha' },
  { text: 'Lakukan hari ini apa yang orang lain tidak mau, agar besok kamu bisa memiliki apa yang orang lain tidak bisa.', author: 'Anonim' },
  { text: 'Perjalanan seribu mil dimulai dengan satu langkah.', author: 'Lao Tzu' },
  { text: 'Kamu tidak pernah terlalu tua untuk menetapkan tujuan baru atau bermimpi lagi.', author: 'C.S. Lewis' },
  { text: 'Optimisme adalah keyakinan yang membawa pada pencapaian.', author: 'Helen Keller' },
  { text: 'Waktu terbaik untuk menanam pohon adalah 20 tahun lalu. Waktu terbaik kedua adalah sekarang.', author: 'Pepatah Cina' }
];

async function seed() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('Tabel quotes siap.');

    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM quotes');
    if (rows[0].total > 0) {
      console.log(`Tabel sudah berisi ${rows[0].total} data. Seed dilewati.`);
      process.exit(0);
    }

    for (const q of quotes) {
      await pool.query('INSERT INTO quotes (text, author) VALUES (?, ?)', [q.text, q.author]);
    }

    console.log(`Berhasil menambahkan ${quotes.length} quotes.`);
    process.exit(0);
  } catch (err) {
    console.error('Gagal seeding database:', err.message);
    process.exit(1);
  }
}

seed();
