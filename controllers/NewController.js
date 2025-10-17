const { New } = require('../models/NewModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const relationsUser = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
];

const relations = [
    { model: Category, attributes: ['id', 'nombre', 'descripcion'], as: 'categoria' },
    { model: State, attributes: ['id', 'nombre', 'abreviacion'], as: 'estado' },
    { model: User, attributes: ['id', 'perfil_id', 'nick', 'nombre'], as: 'usuario', include: relationsUser }
];

const get = (request, response) => {
    New.findAll({ include: relations })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error consultando las noticias');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    New.findByPk(id, { include: relations })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            } else {
                response.status(404).send('Recurso no encontrado');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar la noticia');
        });
};

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    New.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie);
        }
    ).catch(err => {
        response.status(500).send('Error al crear la noticia');
    });
};

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    New.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            if (numRowsUpdated[0] > 0) {
                response.status(200).send(`Registro actualizado`);
            } else {
                response.status(404).send('La noticia no fue encontrada para actualizar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({ where: { id: id } })
        .then(numRowsDeleted => {
            if (numRowsDeleted > 0) {
                response.status(200).send(`${numRowsDeleted} registro eliminado`);
            } else {
                response.status(404).send('La noticia no fue encontrada para eliminar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
};

module.exports = { get, getById, create, update, destroy };