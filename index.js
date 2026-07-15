import express from 'express'
import pg from 'pg'
const express = require('express');
const {Pool} = require('pg');
const app = express();
const port = 3000;


app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'IsnaHabibah123',
    port: 5432,
});

app.get('/api/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata');

        res.status(200).json({
            status: 'success',
            pesan: 'Berhasil mengambil data biodata',
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Terjadi kesalahan pada server atau database' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

//post

app.post('/api/biodata', async (req, res) => {
    const { nama, nim, kelas } = req.body;

    // Validasi input awal
    if (!nama || !nim || !kelas) {
        return res.status(400).json({
            status: 'gagal',
            pesan: 'Nama, NIM, dan kelas wajib diisi'
        });
    }

//put

//delete