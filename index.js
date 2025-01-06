const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const response = require('./response');

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Ini adalah APP Perpustakaan');
});

// Get all users
app.get('/user', (req, res) => {
  db.query('SELECT * FROM user', (err, result) => {
    if (err) {
      return response(400, err, "Gagal mendapatkan data user", res);
    }
    response(200, result, "Data semua user", res);
  });
});

// Get all borrowings
app.get('/peminjaman', (req, res) => {
  const query = `
    SELECT 
      user.*, 
      peminjaman.*, 
      buku.* 
    FROM 
      peminjaman
    JOIN 
      user ON peminjaman.id_user = user.id_user
    JOIN 
      buku ON peminjaman.id_buku = buku.id_buku;
  `;
  db.query(query, (err, result) => {
    if (err) {
      return response(400, err, "Gagal mendapatkan data peminjaman", res);
    }
    response(200, result, "Data semua peminjaman", res);
  });
});

// Get borrowings not yet returned
app.get('/peminjaman/belum-dikembalikan', (req, res) => {
  const query = `
    SELECT 
      user.nama_user, 
      peminjaman.id_peminjaman, 
      peminjaman.tanggal_dipinjam, 
      buku.nama_buku 
    FROM 
      peminjaman
    JOIN 
      user ON peminjaman.id_user = user.id_user
    JOIN 
      buku ON peminjaman.id_buku = buku.id_buku
    WHERE 
      peminjaman.tanggal_dikembalikan IS NULL;
  `;
  db.query(query, (err, result) => {
    if (err) {
      return response(400, err, "Gagal mendapatkan data peminjaman yang belum dikembalikan", res);
    }
    response(200, result, "Data peminjaman yang belum dikembalikan berhasil diambil", res);
  });
});

// Borrow a book
app.post('/meminjam', (req, res) => {
  const { id_user, id_buku, tanggal_dipinjam } = req.body;

  const query = `INSERT INTO peminjaman (id_user, id_buku, tanggal_dipinjam) VALUES (?, ?, ?)`;
  db.query(query, [id_user, id_buku, tanggal_dipinjam], (err, result) => {
    if (err) {
      return response(400, err, "Gagal meminjam buku", res);
    }
    response(200, result, "Buku berhasil dipinjam", res);
  });
});

// Update borrowing as returned
app.put('/dikembalikan', (req, res) => {
  const { nama_user, id_peminjaman, tanggal_dikembalikan } = req.body;

  if (nama_user !== "admin") {
    return response(403, null, "Hanya admin yang diizinkan untuk mengupdate peminjaman", res);
  }

  const query = `
    UPDATE peminjaman
    SET tanggal_dikembalikan = ?
    WHERE id_peminjaman = ?
  `;

  db.query(query, [tanggal_dikembalikan, id_peminjaman], (err, result) => {
    if (err) {
      return response(400, err, "Gagal memperbarui data peminjaman", res);
    }

    if (result.affectedRows === 0) {
      return response(404, null, "Peminjaman dengan ID tersebut tidak ditemukan", res);
    }

    response(200, result, "Data peminjaman berhasil diperbarui", res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
