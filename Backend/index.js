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
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  telefono: {
    type: String,
    required: true,
    match: /^\d{8}$/
  },
  identificacion: {
    type: String,
    required: true,
    match: /^\d{9}$/,
    unique: true
  },
  contraseña: {
    type: String,
    required: true,
    match: /^[A-Za-z]{6}\d{4}\.$/
  },
  apartamento: {
    type: String,
    required: true
  },
  habitantes: {
    type: Number,
    required: true,
    min: 1
  },
  esAdministrador: {
    type: Boolean,
    default: false
  },
  codigoEmpleado: {
    type: String,
    required: function () { return this.esAdministrador; },
    match: /^[A-Za-z]{4}\d{2}$/
  }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);



// Validaciones auxiliares
function validarTelefono(telefono) {
  return /^\d{8}$/.test(telefono);
}
function validarApartamento(apto) {
  // Aquí una validación sencilla: al menos 1 carácter, puede ajustarse
  return typeof apto === 'string' && apto.trim().length >= 1;
}
function validarHabitantes(hab) {
  // Debe ser entero > 0
  const num = Number(hab);
  return Number.isInteger(num) && num > 0;
}



// Endpoints
app.post('/api/registro', async (req, res) => {
  console.log("Registro recibido", req.body);
  const {
    nombre, correo, telefono, identificacion,
    contraseña, apartamento, habitantes,
    esAdministrador, codigoEmpleado
  } = req.body;

  // Validaciones personalizadas
  if (!nombre || !correo || !telefono || !identificacion ||
      !contraseña || !apartamento || !habitantes ||
      (esAdministrador && !codigoEmpleado)) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoUsuario = new Usuario({
      nombre, correo, telefono, identificacion,
      contraseña, apartamento, habitantes,
      esAdministrador: !!esAdministrador,
      codigoEmpleado: esAdministrador ? codigoEmpleado : undefined
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Correo o identificación ya registrados' });
    }
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


app.post('/api/login', async (req, res) => {
  console.log("Login recibido", req.body);
  const { correo, contraseña, celular, residencia } = req.body;
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
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
        apartamento: usuario.apartamento,
        habitantes: usuario.habitantes,
        esAdministrador: usuario.esAdministrador,
        codigoEmpleado: usuario.codigoEmpleado
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para editar perfil (solo campos permitidos)
app.put('/api/editar', async (req, res) => {
  const { correo, telefono, apartamento, habitantes } = req.body;

  // Validar que correo venga para identificar al usuario
  if (!correo) {
    return res.status(400).json({ mensaje: 'Correo es requerido para identificar al usuario' });
  }

  // Validaciones de los campos que pueden cambiar
  if (telefono && !validarTelefono(telefono)) {
    return res.status(400).json({ mensaje: 'Teléfono inválido: debe tener 8 dígitos' });
  }
  if (apartamento && !validarApartamento(apartamento)) {
    return res.status(400).json({ mensaje: 'Apartamento inválido' });
  }
  if (habitantes && !validarHabitantes(habitantes)) {
    return res.status(400).json({ mensaje: 'Habitantes inválido: debe ser un número entero mayor que 0' });
  }

  try {
    // Solo actualizamos los campos permitidos
    const datosAActualizar = {};
    if (telefono !== undefined) datosAActualizar.telefono = telefono;
    if (apartamento !== undefined) datosAActualizar.apartamento = apartamento;
    if (habitantes !== undefined) datosAActualizar.habitantes = habitantes;

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo },      // criterio
      datosAActualizar, 
      { new: true, runValidators: true } // runValidators para que aplique validaciones del schema
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Retornar los datos actualizados (o lo que desees exponer)
    const usuarioPublico = {
      nombre: usuarioActualizado.nombre,
      correo: usuarioActualizado.correo,
      telefono: usuarioActualizado.telefono,
      identificacion: usuarioActualizado.identificacion,
      apartamento: usuarioActualizado.apartamento,
      habitantes: usuarioActualizado.habitantes,
      esAdministrador: usuarioActualizado.esAdministrador,
      codigoEmpleado: usuarioActualizado.codigoEmpleado
    };

    return res.json({
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarioPublico
    });

  } catch (error) {
    console.error('Error al editar perfil:', error);
    return res.status(500).json({ mensaje: 'Error interno al actualizar el perfil' });
  }
});


// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
