const express = require('express');
const { createCategory, updateCategory ,deleteCategory, getaCategory, getallCategory} = require('../controller/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/' ,authMiddleware, isAdmin, createCategory);
router.get('/all-category' ,getallCategory);
router.get('/:id' ,getaCategory);
router.put('/:id' ,authMiddleware, isAdmin, updateCategory);
router.delete('/:id' ,authMiddleware, isAdmin, deleteCategory);

module.exports = router;

