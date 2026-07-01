# Daily Inspiration

Fitur "Daily Inspiration" untuk portal berbasis Node.js + Express + MySQL.
Menampilkan 9 kutipan motivasi random setiap kali halaman dibuka.

## Struktur Project

```
├── config/db.js           # koneksi MySQL (pakai env variables)
├── controllers/quotesController.js
├── routes/quotes.js
├── views/quotes.ejs        # halaman /quotes
├── public/css/style.css
├── sql/schema.sql          # struktur tabel quotes
├── sql/seed.js             # isi data contoh
├── server.js
└── railway.json
```

## Endpoint

| Method | Path            | Keterangan                                   |
|--------|-----------------|-----------------------------------------------|
| GET    | `/api/quotes/`  | JSON berisi 9 kutipan random                  |
| GET    | `/quotes`       | Halaman web menampilkan 9 kutipan random      |

Contoh response `/api/quotes/`:
```json
{
  "success": true,
  "count": 9,
  "data": [
    { "id": 3, "text": "...", "author": "...", "created_at": "..." }
  ]
}
```

## Menjalankan di Lokal

1. Install dependencies:
   ```
   npm install
   ```
2. Siapkan database MySQL lokal, lalu salin `.env.example` menjadi `.env` dan isi kredensial:
   ```
   cp .env.example .env
   ```
3. Buat tabel + isi data contoh:
   ```
   npm run seed
   ```
4. Jalankan server:
   ```
   npm start
   ```
   Buka `http://localhost:3000/quotes`

## Deploy ke Railway

### 1. Buat project & push kode
- Buat repo GitHub baru, push seluruh folder ini ke repo tersebut.
- Di [railway.app](https://railway.app), klik **New Project** → **Deploy from GitHub repo** → pilih repo Anda.

### 2. Tambahkan database MySQL
- Di dalam project Railway, klik **+ New** → **Database** → **Add MySQL**.
- Railway otomatis membuat instance MySQL dan menyediakan environment variables berikut ke service lain di project yang sama:
  - `MYSQL_URL`
  - `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`

  Kode `config/db.js` sudah otomatis membaca variabel ini — **tidak perlu setting manual**.

### 3. Buat tabel di database Railway
Ada 2 cara:

**Cara A — via Railway CLI (disarankan):**
```
npm i -g @railway/cli
railway login
railway link          # pilih project Anda
railway run npm run seed
```
Perintah `railway run` menjalankan script `seed.js` dengan environment variables Railway, sehingga otomatis connect ke database Railway dan mengisi data.

**Cara B — via Railway MySQL Query tab:**
- Buka service MySQL di dashboard Railway → tab **Data** / **Query**.
- Copy-paste isi `sql/schema.sql` lalu jalankan.
- Insert data manual atau jalankan `railway run npm run seed` seperti Cara A.

### 4. Set variable PORT (opsional)
Railway otomatis menyuntikkan `PORT`; `server.js` sudah membaca `process.env.PORT` sehingga tidak perlu diatur manual.

### 5. Deploy
- Railway otomatis build & deploy setiap kali Anda push ke branch utama (Nixpacks mendeteksi Node.js otomatis dari `package.json`).
- Setelah deploy selesai, buka **Settings → Networking → Generate Domain** untuk mendapatkan URL publik.
- Akses `https://<domain-anda>.up.railway.app/quotes`.

### Catatan penting
- Jangan commit file `.env` ke git (sudah ada di `.gitignore`).
- Semua kredensial database di production diambil dari environment variables Railway, bukan hardcode di kode — sesuai ketentuan soal.
