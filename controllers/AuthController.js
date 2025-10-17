const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
        attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick']
    }).then(usuario => {
        if (usuario) {
            const token = jwt.sign({ usuario }, 'mi_llave_secreta', { expiresIn: '24h' });
            response.status(200).json({ token: token });
        } else {
            response.status(401).json({ message: "Credenciales incorrectas o usuario inactivo" });
        }
    }).catch(err => {
        response.status(500).send('Error al consultar el dato');
    });
};

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    
    request.body.perfil_id = 2; // Perfil de "Contribuidor" por defecto
    request.body.activo = true;

    User.create(request.body).then(
        newEntitie => {
            // No se devuelve la contraseña en la respuesta
            const userResponse = { ...newEntitie.toJSON() };
            delete userResponse.contraseña;
            response.status(201).json(userResponse);
        }
    ).catch(err => {
        console.log(err);
        response.status(500).send('Error al crear el usuario');
    });
};

module.exports = {
    login,
    register
};