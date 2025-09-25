const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = 5050;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', comunicadosRoutes);

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
