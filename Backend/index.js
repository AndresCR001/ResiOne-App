const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

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
app.use('/api/reservas', reservaRoutes);
app.use('/api/reportes', reporteRoutes);

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
