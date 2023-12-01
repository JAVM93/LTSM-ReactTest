const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint para actualizar el perfil del usuario
router.post('/api/users/:userId/update-profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    // Verificar si el usuario está autenticado
    if (!req.user || req.user._id !== userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    // Actualizar los datos del usuario en la base de datos
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
