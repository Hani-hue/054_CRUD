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

//get
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

    if (!nama || !nim || !kelas) {
        return res.status(400).json({
            status: 'gagal',
            pesan: 'Nama, NIM, dan kelas wajib diisi'
        });
    }

    try {
        const result = await pool.query(
            'INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *',
            [nama, nim, kelas]
        );

        res.status(201).json({
            status: 'success',
            pesan: 'Berhasil menambahkan data biodata',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        // kode 23505 = unique violation (nim duplikat)
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'gagal',
                pesan: 'NIM sudah terdaftar'
            });
        }
        res.status(500).json({ error: 'Terjadi kesalahan pada server atau database' });
    }
});

//put
app.put('/api/biodata/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, nim, kelas } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({
            status: 'gagal',
            pesan: 'Nama, NIM, dan kelas wajib diisi'
        });
    }

    try {
        const result = await pool.query(
            'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *',
            [nama, nim, kelas, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'gagal',
                pesan: `Data dengan id ${id} tidak ditemukan`
            });
        }

        res.status(200).json({
            status: 'success',
            pesan: 'Berhasil mengupdate data biodata',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'gagal',
                pesan: 'NIM sudah terdaftar'
            });
        }
        res.status(500).json({ error: 'Terjadi kesalahan pada server atau database' });
    }
});
//delete