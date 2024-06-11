const express = require('express');
const {create,getCategories,getCategory} = require('../controllers/category.controller');

const router = express.Router();

router.get('/', getCategories );
router.post('/create', create );
router.get('/:id', getCategory );

module.exports = router;