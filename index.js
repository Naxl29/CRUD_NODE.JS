'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./src/Database/conexion');
const path = require('path');

const app = express();
const port = 3000;

// Importar rutas de personas
const personaRoutes = require('./src/routes/personaRoutes');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'Public')));

// Rutas para personas
app.use('/api', personaRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'Public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
