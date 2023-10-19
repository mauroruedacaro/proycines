// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { dni, nombres, apellidos, fechaNacimiento, rol, telefono, correo, contraseña, nombreUsuario } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ dni });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear un nuevo usuario
    const user = new User({
        dni,
        nombres,
        apellidos,
        fechaNacimiento,
        rol,
        telefono,
        correo,
        contraseña: hashedPassword,
        nombreUsuario,
        });

    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;

//COnfiguración de rutas

app.use('/api/auth', require('./routes/auth'));
