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


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

//post

//put

//delete