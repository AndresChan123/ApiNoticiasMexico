const express = require('express');
const { get, getById } = require('../controllers/ProfileController');
const router = express.Router();

router.get('/', get);
router.get('/:id', getById);

module.exports = router;