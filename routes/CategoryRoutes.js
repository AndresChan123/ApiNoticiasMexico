const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/CategoryController');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt');
const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', authenticateAdmin, validatorCategoryCreate, create);
router.put('/:id', authenticateAdmin, validatorCategoryUpdate, update);
router.delete('/:id', authenticateAdmin, destroy);

module.exports = router;