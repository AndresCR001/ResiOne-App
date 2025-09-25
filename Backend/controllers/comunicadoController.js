const Comunicado = require('../models/Comunicado');

exports.crearComunicado = async (req, res) => {
  try {
    const comunicado = new Comunicado(req.body);
    const savedComunicado = await comunicado.save();
    res.status(201).json(savedComunicado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerComunicados = async (req, res) => {
  try {
    const comunicados = await Comunicado.find({ estado: 'activo' })
      .populate('autorId', 'nombre correo')
      .sort({ fechaPublicacion: -1 });
    res.json(comunicados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarComunicado = async (req, res) => {
  try {
    const comunicado = await Comunicado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comunicado) return res.status(404).json({ message: 'Comunicado no encontrado' });
    res.json(comunicado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarComunicado = async (req, res) => {
  try {
    const comunicado = await Comunicado.findByIdAndDelete(req.params.id);
    if (!comunicado) return res.status(404).json({ message: 'Comunicado no encontrado' });
    res.json({ message: 'Comunicado eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};