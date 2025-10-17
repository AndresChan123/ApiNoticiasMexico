const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');

const validatorCategoryCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value) => {
            return Category.findOne({ where: { nombre: value } })
                .then((category) => {
                    if (category) {
                        return Promise.reject('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio')
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

const validatorCategoryUpdate = [
    check('nombre').optional().isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value) => {
            return Category.findOne({ where: { nombre: value } })
                .then((category) => {
                    if (category) {
                        return Promise.reject('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),
    check('descripcion').optional().isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

module.exports = {
    validatorCategoryCreate,
    validatorCategoryUpdate
};