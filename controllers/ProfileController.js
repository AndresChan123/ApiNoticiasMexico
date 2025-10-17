const { Profile } = require('../models/ProfileModel');

const get = (request, response) => {
    Profile.findAll()
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error consultando los perfiles');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    Profile.findByPk(id)
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            } else {
                response.status(404).send('Recurso no encontrado');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el perfil');
        });
};

const create = (request, response) => {
    Profile.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie);
        }
    ).catch(err => {
        response.status(500).send('Error al crear el perfil');
    });
};

const update = (request, response) => {
    const id = request.params.id;
    Profile.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            if (numRowsUpdated[0] > 0) {
                response.status(200).send(`Registro actualizado`);
            } else {
                response.status(404).send('El perfil no fue encontrado para actualizar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    Profile.destroy({ where: { id: id } })
        .then(numRowsDeleted => {
            if (numRowsDeleted > 0) {
                response.status(200).send(`${numRowsDeleted} registro eliminado`);
            } else {
                response.status(404).send('El perfil no fue encontrado para eliminar.');
            }
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
};

module.exports = { get, getById, create, update, destroy };