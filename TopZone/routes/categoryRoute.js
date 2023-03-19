const express = require('express');
const { createCategory, updateCategory ,deleteCategory} = require('../controller/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/' ,authMiddleware, isAdmin, createCategory);
router.post('/:id' ,authMiddleware, isAdmin, updateCategory);
router.post('/:id' ,authMiddleware, isAdmin, deleteCategory);

module.exports = router;

