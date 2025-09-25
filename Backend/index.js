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
<<<<<<< HEAD
app.use('/api', comunicadosRoutes);
=======
app.use('/api/reservas', reservaRoutes);
app.use('/api/reportes', reporteRoutes);
>>>>>>> e46d4866c5291ea312d56f1b1ee5e4bb646f054f

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
