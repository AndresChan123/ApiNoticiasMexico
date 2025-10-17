const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const relations = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
];

const get = (request, response) => {
    User.findAll({ include: relations })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error consultando los usuarios');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    User.findByPk(id, { include: relations })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            } else {
                response.status(404).send('Recurso no encontrado');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el usuario');
        });
};

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie);
        }
    ).catch(err => {
        response.status(500).send('Error al crear el usuario');
    });
};

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    User.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            if (numRowsUpdated[0] > 0) {
                response.status(200).send(`Registro actualizado`);
            } else {
                response.status(404).send('El usuario no fue encontrado para actualizar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    User.destroy({ where: { id: id } })
        .then(numRowsDeleted => {
            if (numRowsDeleted > 0) {
                response.status(200).send(`${numRowsDeleted} registro eliminado`);
            } else {
                response.status(404).send('El usuario no fue encontrado para eliminar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
};

module.exports = { get, getById, create, update, destroy };