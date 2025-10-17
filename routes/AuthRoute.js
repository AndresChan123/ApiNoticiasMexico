const express = require('express');
const { login, register } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const router = express.Router();

router.post('/login', validatorLogin, login);
router.post('/registro', validatorRegister, register);

module.exports = router;