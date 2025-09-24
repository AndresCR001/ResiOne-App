const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5050;

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión MongoDB
mongoose.connect("mongodb+srv://admin:admin123@resione.4uufzvb.mongodb.net/ResiOne?retryWrites=true&w=majority")
  .then(() => console.log('MongoDB conectado correctamente a ResiOne'))
  .catch(err => console.log('Error conectando a MongoDB', err));

// Modelo Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  celular: String,
  residencia: String,
  contraseña: String
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Endpoints
app.post('/api/registro', async (req, res) => {
  console.log("Registro recibido", req.body);
  const { nombre, correo, celular, residencia, contraseña } = req.body;
  if(!nombre || !correo || !contraseña) return res.status(400).json({ mensaje: 'Faltan datos' });
  try {
    const nuevoUsuario = new Usuario({ nombre, correo, celular, residencia, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    if (error.code === 11000) res.status(409).json({ mensaje: 'Correo ya registrado' });
    else res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.post('/api/login', async (req, res) => {
  console.log("Login recibido", req.body);
  const { correo, contraseña } = req.body;
  if(!correo || !contraseña) return res.status(400).json({ mensaje: 'Faltan datos' });
  try {
    const usuario = await Usuario.findOne({ correo });
    if(!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    if(usuario.contraseña !== contraseña) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        nombre: usuario.nombre,
        correo: usuario.correo,
        celular: usuario.celular || '',
        residencia: usuario.residencia || ''
      }
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
