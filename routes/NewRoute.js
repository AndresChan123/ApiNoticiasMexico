const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/NewController');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { authenticateAny } = require('../middlewares/jwt');
const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', authenticateAny, validatorNewCreate, create);
router.put('/:id', authenticateAny, validatorNewUpdate, update);
router.delete('/:id', authenticateAny, destroy);

module.exports = router;