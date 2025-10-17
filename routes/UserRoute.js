const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt');
const router = express.Router();

router.get('/', authenticateAdmin, get);
router.get('/:id', authenticateAdmin, getById);
router.post('/', authenticateAdmin, validatorUserCreate, create);
router.put('/:id', authenticateAdmin, validatorUserUpdate, update);
router.delete('/:id', authenticateAdmin, destroy);

module.exports = router;