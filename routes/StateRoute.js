const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/StateController');
const { validatorStateRequire, validatorStateOptional } = require('../validators/StateValidator');
const { authenticateAdmin } = require('../middlewares/jwt');
const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', authenticateAdmin, validatorStateRequire, create);
router.put('/:id', authenticateAdmin, validatorStateOptional, update);
router.delete('/:id', authenticateAdmin, destroy);

module.exports = router;