const express = require('express');
const router = express.Router();
const { crearComunicado, obtenerComunicados, actualizarComunicado, eliminarComunicado } = require('../controllers/comunicadoController');

router.post('/crear', crearComunicado);
router.get('/feed', obtenerComunicados);
router.put('/editar/:id', actualizarComunicado);
router.delete('/eliminar/:id', eliminarComunicado);

module.exports = router;